"use strict";
/* Admin-only: issues a short-lived Blob upload token so the browser can send
 * the file bytes straight to Blob storage, bypassing this function entirely.
 * Needed because Vercel Functions cap a request body at 4.5 MB and several
 * of APARD's report PDFs are already bigger than that. See
 * https://vercel.com/docs/vercel-blob/client-upload */
const { handleUpload } = require("@vercel/blob/client");
const { requireAuth } = require("../lib/auth");

module.exports = async function (req, res) {
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async function (pathname) {
        requireAuth(req);
        if (!/^uploads\/[\w.\- ]+$/.test(pathname)) {
          throw new Error("Files can only be uploaded into uploads/");
        }
        return {
          /* The admin file pickers offer .mp4 and .webm, and api/media serves
             video by redirecting to the Blob CDN — so video has to be allowed
             here too, or picking one fails with an unhelpful error. */
          allowedContentTypes: ["application/pdf", "image/png", "image/jpeg", "image/webp", "image/svg+xml",
            "video/mp4", "video/webm", "video/quicktime"],
          addRandomSuffix: false,
          allowOverwrite: true, // re-uploading with the same file name replaces it, as admin.html implies
        };
      },
      onUploadCompleted: async function ({ blob }) {
        console.log("upload completed:", blob.pathname);
      },
    });
    res.status(200).json(jsonResponse);
  } catch (err) {
    res.status(400).json({ error: String((err && err.message) || err) });
  }
};
