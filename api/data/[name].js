"use strict";
/* Admin-only: saves data/<name>.json to Blob. Requires the session cookie
 * from api/login.js. Keeps a timestamped backup of whatever was there
 * before, the same safety net server.py's local admin has always had. */
const { requireAuth } = require("../../lib/auth");
const { readBuffer, writeJSON } = require("../../lib/blob");

module.exports = async function (req, res) {
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  try {
    requireAuth(req);
  } catch (e) {
    res.status(e.statusCode || 401).json({ ok: false, error: "Not authenticated" });
    return;
  }

  const name = String(req.query.name || "");
  if (!/^[\w.-]+\.json$/.test(name)) { res.status(400).json({ ok: false, error: "Invalid name" }); return; }

  let parsed;
  try {
    parsed = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (!parsed || typeof parsed !== "object") throw new Error("not an object");
  } catch (e) {
    res.status(400).json({ ok: false, error: "Invalid JSON" });
    return;
  }

  try {
    const existing = await readBuffer("data/" + name);
    if (existing) {
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      await writeJSON("backups/data/" + name.replace(/\.json$/, "") + "." + stamp + ".json", JSON.parse(existing.buffer.toString("utf8")));
    }
    await writeJSON("data/" + name, parsed);
    res.status(200).json({ ok: true, file: name });
  } catch (e) {
    res.status(500).json({ ok: false, error: String((e && e.message) || e) });
  }
};
