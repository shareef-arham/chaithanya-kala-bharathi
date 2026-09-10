/* Push NAMED files from disk into Vercel Blob, overwriting what is there.
 *
 * Use this instead of seed-blob.js when you want to publish one or two
 * things. seed-blob.js pushes *every* file in data/ and uploads/, so it
 * overwrites live content edited through the admin panel with whatever
 * happens to be on this computer — fine for a first seed, destructive
 * afterwards.
 *
 * Usage (from the project root):
 *   node scripts/push-files.js data/governance.json uploads/AR-2025-26.pdf
 *
 * The Blob token is read from .env.production.local automatically (pull it
 * with: vercel env pull .env.production.local --environment production),
 * or from BLOB_READ_WRITE_TOKEN if that is already set in the environment.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const { put } = require("@vercel/blob");

const ROOT = path.join(__dirname, "..");

function loadEnvFile(file) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+)="?(.*?)"?$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

function mime(file) {
  const ext = path.extname(file).toLowerCase();
  return { ".json": "application/json", ".pdf": "application/pdf", ".png": "image/png",
    ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml" }[ext]
    || "application/octet-stream";
}

(async () => {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error("Nothing to push. Name the files, e.g.:\n  node scripts/push-files.js uploads/AR-2025-26.pdf");
    process.exit(1);
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) loadEnvFile(".env.production.local");
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("No BLOB_READ_WRITE_TOKEN. Run: vercel env pull .env.production.local --environment production");
    process.exit(1);
  }

  /* Blob pathnames use forward slashes and mirror the folder layout, so a
   * Windows-style argument still lands in the right place. */
  const jobs = args.map(function (a) {
    const rel = a.replace(/\\/g, "/").replace(/^\.\//, "");
    const local = path.join(ROOT, rel);
    if (!fs.existsSync(local)) { console.error("No such file: " + rel); process.exit(1); }
    if (!/^(data|uploads)\//.test(rel)) { console.error("Only data/ and uploads/ are served from Blob: " + rel); process.exit(1); }
    return { rel: rel, local: local };
  });

  for (const job of jobs) {
    const body = fs.readFileSync(job.local);
    await put(job.rel, body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: mime(job.rel),
    });
    console.log("pushed " + job.rel + " (" + body.length + " bytes)");
  }
  console.log("Done. The live site picks these up within about 30 seconds.");
})().catch(function (e) {
  console.error("Failed:", (e && e.message) || e);
  process.exit(1);
});
