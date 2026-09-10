"use strict";
/* Public, no auth: serves data/<name>.json for every page on the site.
 * Reads Blob first (the live, edited copy); if Blob doesn't have that file
 * yet, falls back to the copy bundled at seed/data/ so nothing breaks before
 * the first edit / before Blob is seeded.
 *
 * The fallback copy lives at seed/data/, NOT data/ — Vercel serves an exact
 * static-file match before it ever considers a rewrite, so if data/<name>
 * were still shipped at that same public path, requests to /data/<name>
 * would hit that static file directly and never reach this function (which
 * is exactly what happened until this was caught: live edits went into
 * Blob correctly but the site kept showing the stale bundled snapshot).
 * data/ and uploads/ are excluded from the Vercel deployment for this
 * reason (see .vercelignore) — they still exist locally for start.bat. */
const fs = require("fs");
const path = require("path");
const { readBuffer } = require("../../lib/blob");

module.exports = async function (req, res) {
  const name = String(req.query.name || "");
  if (!/^[\w.-]+\.json$/.test(name)) { res.status(400).json({ error: "Invalid name" }); return; }

  const fromBlob = await readBuffer("data/" + name);
  if (fromBlob) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=300");
    res.status(200).send(fromBlob.buffer);
    return;
  }

  try {
    const local = fs.readFileSync(path.join(process.cwd(), "seed", "data", name), "utf8");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=300");
    res.status(200).send(local);
  } catch (e) {
    res.status(404).json({ error: "Not found" });
  }
};
