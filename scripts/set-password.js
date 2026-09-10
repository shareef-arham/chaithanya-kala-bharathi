/* Set the CKB admin password.
 *
 *   node scripts/set-password.js "your new password"
 *
 * Hashes the password with scrypt and writes only the hash to Blob at
 * auth/password.json — the same place the admin panel's own "Change
 * Password" button writes to. Two consequences worth knowing:
 *
 *   - It takes effect immediately. No redeploy, unlike the
 *     ADMIN_PASSWORD_HASH environment variable, which is only a bootstrap
 *     value and is ignored once auth/password.json exists.
 *   - Nothing is copied through the clipboard, which is where the
 *     env-var route tends to go wrong on Windows.
 *
 * The password itself is never stored or transmitted — only salt:hash.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");

function loadEnv(file) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+)="?(.*?)"?$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

(async () => {
  const password = process.argv.slice(2).join(" ").trim();
  if (!password) {
    console.error('Usage: node scripts/set-password.js "your new password"');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Use at least 8 characters.");
    process.exit(1);
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) loadEnv(".env.production.local");
  if (!process.env.BLOB_READ_WRITE_TOKEN) loadEnv(".env.local");
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("No BLOB_READ_WRITE_TOKEN. Run: vercel env pull .env.production.local --environment production");
    process.exit(1);
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");

  const { put } = require("@vercel/blob");
  await put(
    "auth/password.json",
    JSON.stringify({ hash: salt + ":" + hash, updatedAt: new Date().toISOString() }),
    { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" }
  );

  console.log("Password set. It works on the live site straight away — no redeploy.");
  console.log("Log in at /admin.html with the password you just typed.");
})().catch((e) => {
  console.error("Failed:", (e && e.message) || e);
  process.exit(1);
});
