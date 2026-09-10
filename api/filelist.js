"use strict";
/* Admin-only: lists everything under uploads/ in Blob, same shape the local
 * admin panel already expects from server.py's /api/filelist. */
const { requireAuth } = require("../lib/auth");
const { listPrefix } = require("../lib/blob");

module.exports = async function (req, res) {
  try {
    requireAuth(req);
  } catch (e) {
    res.status(e.statusCode || 401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const blobs = await listPrefix("uploads/");
    const files = blobs
      .filter(function (b) { return b.pathname !== "uploads/"; })
      .map(function (b) {
        return {
          key: b.pathname.replace(/^uploads\//, ""),
          size: b.size,
          modified: new Date(b.uploadedAt).toISOString(),
        };
      })
      .sort(function (a, b) { return a.key.localeCompare(b.key); });
    res.status(200).json({ files: files });
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e) });
  }
};
