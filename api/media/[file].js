"use strict";
/* Public, no auth: serves uploads/<file> (PDFs, images) from Blob.
 * Video and other big media are redirected to the Blob CDN URL instead of
 * being buffered through the function — that keeps us under the function
 * response-size limit and lets the browser do range requests (seeking). */
const { head } = require("@vercel/blob");
const { readBuffer } = require("../../lib/blob");

module.exports = async function (req, res) {
  const file = String(req.query.file || "");
  if (!file || file.indexOf("/") >= 0 || file.indexOf("\\") >= 0 || file.charAt(0) === ".") {
    res.status(400).send("Bad file name");
    return;
  }

  if (/\.(mp4|webm|mov|m4v)$/i.test(file)) {
    try {
      const meta = await head("uploads/" + file);
      if (meta && meta.url) {
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.redirect(302, meta.url);
        return;
      }
    } catch (e) {}
    res.status(404).send("Not found: " + file);
    return;
  }

  const found = await readBuffer("uploads/" + file);
  if (!found) { res.status(404).send("Not found: " + file); return; }

  res.setHeader("Content-Type", found.contentType || "application/octet-stream");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).send(found.buffer);
};
