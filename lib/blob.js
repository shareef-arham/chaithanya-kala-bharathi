/* Thin helpers around Vercel Blob for the two things this site stores:
 *   data/<name>.json   -- content, one blob per JSON file
 *   uploads/<file>     -- PDFs and images
 * Every blob is written with addRandomSuffix:false so its pathname is
 * stable — writing again at the same pathname overwrites it in place. */
"use strict";
const { put, list, del, get } = require("@vercel/blob");

/* Read a blob's content by its pathname. Returns null if it doesn't exist.
 * useCache:false so a save is visible on the very next read (the HTTP layer
 * in front of this — api/content — applies its own short cache instead). */
async function readBuffer(pathname) {
  let result;
  try {
    result = await get(pathname, { access: "public", useCache: false });
  } catch (e) {
    return null;
  }
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const buf = Buffer.from(await new Response(result.stream).arrayBuffer());
  return { buffer: buf, contentType: result.blob.contentType, size: result.blob.size };
}

async function readJSON(pathname) {
  const r = await readBuffer(pathname);
  if (!r) return null;
  try { return JSON.parse(r.buffer.toString("utf8")); } catch (e) { return null; }
}

async function writeJSON(pathname, obj) {
  const body = JSON.stringify(obj, null, 2);
  return put(pathname, body, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

async function writeFile(pathname, buffer, contentType) {
  return put(pathname, buffer, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: contentType || "application/octet-stream",
  });
}

async function listPrefix(prefix) {
  const out = [];
  let cursor;
  for (;;) {
    const page = await list({ prefix: prefix, cursor: cursor, limit: 1000 });
    out.push.apply(out, page.blobs);
    if (!page.hasMore) break;
    cursor = page.cursor;
  }
  return out;
}

module.exports = { readBuffer, readJSON, writeJSON, writeFile, listPrefix, del };
