"""
CKB — local dev server.

Serves the static site AND backs the admin panel, with no cloud account:

  * /data/<name>.json        GET  -> reads data/<name>.json
  * /api/data/<name>.json     POST -> saves data/<name>.json (+ timestamped .bak)
  * /api/upload               POST -> saves an uploaded file into ./uploads/
  * /pdf/<file>  /media/<file> GET -> serves ./uploads/<file>
  * /api/filelist             GET  -> lists ./uploads/ as JSON for the admin Files tab

Usage:  py server.py            (http://localhost:8000)
        py server.py 3000       (custom port)

On the live Vercel deploy there is no server: data/ and uploads/ ship as static
files and /pdf|/media are rewritten to /uploads (see vercel.json). Editing there
is done locally then redeployed. This file is excluded from the deploy.
"""
import http.server, urllib.parse, sys, os, json, shutil, mimetypes
from datetime import datetime, timezone

BASE = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE, "data")
UPLOAD_DIR = os.path.join(BASE, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)


class Handler(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        if self.path.startswith("/pdf/"):
            self._serve_upload(self.path[5:], "application/pdf")
        elif self.path.startswith("/media/"):
            self._serve_upload(self.path[7:], None)
        elif self.path.startswith("/api/filelist"):
            self._list_uploads()
        else:
            super().do_GET()

    def do_POST(self):
        if self.path.startswith("/api/data/"):
            self._save_data()
        elif self.path == "/api/upload":
            self._save_upload()
        elif self.path == "/api/login" or self.path == "/api/logout":
            # The local copy has no password — you're already sitting at your
            # own computer. This just satisfies admin.html's login screen,
            # which uses the same request on the live site to check a real
            # password. See lib/auth.js and api/login.js for that side.
            length = int(self.headers.get("Content-Length", 0))
            if length:
                self.rfile.read(length)
            self._json({"ok": True})
        else:
            self.send_error(404, "Not found")

    def do_OPTIONS(self):
        self.send_response(200); self._cors(); self.end_headers()

    # ---- serve an uploaded file ----
    def _serve_upload(self, raw, force_ct):
        name = urllib.parse.unquote(raw.split("?")[0]).lstrip("/")
        if "/" in name or "\\" in name or name.startswith("."):
            self.send_error(400, "Bad file name"); return
        local = os.path.join(UPLOAD_DIR, name)
        if not os.path.isfile(local):
            self.send_error(404, "Not in uploads/: %s" % name); return
        ct = force_ct or mimetypes.guess_type(local)[0] or "application/octet-stream"
        data = open(local, "rb").read()
        self.send_response(200)
        self.send_header("Content-Type", ct)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "public, max-age=3600")
        self._cors(); self.end_headers()
        self.wfile.write(data)

    # ---- save a JSON data file ----
    def _save_data(self):
        name = self.path[len("/api/data/"):].split("?")[0]
        if not name.endswith(".json") or "/" in name or "\\" in name:
            self.send_error(400, "Invalid data file name"); return
        filepath = os.path.join(DATA_DIR, name)
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)
        try:
            parsed = json.loads(body)
        except json.JSONDecodeError as e:
            self.send_error(400, "Invalid JSON: %s" % e); return
        if os.path.exists(filepath):
            bak = filepath + "." + datetime.now().strftime("%Y%m%d-%H%M%S") + ".bak"
            shutil.copy2(filepath, bak)
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(parsed, f, ensure_ascii=False, indent=2)
        self._json({"ok": True, "file": name})

    # ---- save an uploaded file ----
    def _save_upload(self):
        ct = self.headers.get("Content-Type", "")
        if "multipart/form-data" not in ct:
            self.send_error(400, "Expected multipart/form-data"); return
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length)
        boundary = ct.split("boundary=")[1].strip()
        parts = self._parse_multipart(body, boundary)
        file_data = parts.get("file", {}).get("data")
        key = parts.get("key", {}).get("data", b"").decode("utf-8").strip()
        if not file_data or not key:
            self.send_error(400, "Missing file or name"); return
        key = os.path.basename(key)
        with open(os.path.join(UPLOAD_DIR, key), "wb") as f:
            f.write(file_data)
        self._json({"ok": True, "key": key, "url": "/pdf/" + urllib.parse.quote(key)})

    # ---- list uploads/ ----
    def _list_uploads(self):
        rows = []
        for n in sorted(os.listdir(UPLOAD_DIR)):
            p = os.path.join(UPLOAD_DIR, n)
            if not os.path.isfile(p):
                continue
            st = os.stat(p)
            rows.append({
                "key": n, "size": st.st_size,
                "modified": datetime.fromtimestamp(st.st_mtime, timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            })
        self._json({"files": rows})

    # ---- helpers ----
    def _json(self, obj, status=200):
        data = json.dumps(obj).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self._cors(); self.end_headers()
        self.wfile.write(data)

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _parse_multipart(self, body, boundary):
        parts = {}
        sep = ("--" + boundary).encode()
        for chunk in body.split(sep)[1:]:
            if chunk.strip() == b"--" or not chunk.strip():
                continue
            he = chunk.find(b"\r\n\r\n")
            if he < 0:
                continue
            headers_str = chunk[2:he].decode("utf-8", "replace")
            data = chunk[he + 4:]
            if data.endswith(b"\r\n"):
                data = data[:-2]
            name = ""
            for line in headers_str.split("\r\n"):
                if 'name="' in line:
                    name = line.split('name="')[1].split('"')[0]
            if name:
                parts[name] = {"data": data}
        return parts

    def log_message(self, fmt, *args):
        msg = str(args[0]) if args else ""
        if msg.startswith(("POST /api/", "GET /api/")):
            super().log_message(fmt, *args)


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
os.chdir(BASE)
print("\n  CKB is live at   http://localhost:%d/index.html" % port)
print("  Admin panel at     http://localhost:%d/admin.html" % port)
print("  Uploads land in    ./uploads/")
print("  Keep this window open. Close it to stop.\n")
http.server.ThreadingHTTPServer(("", port), Handler).serve_forever()
