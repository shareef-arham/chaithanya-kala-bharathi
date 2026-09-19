/* Set a new admin password for the LIVE site, without logging in - for when the
 * password is forgotten. You type the new password here, twice, hidden. Only its
 * scrypt hash is stored, in Blob at auth/password.json - the same place the admin
 * panel's Change Password button writes to - so it works straight away, no redeploy.
 * The password itself is never saved, shown or sent anywhere.
 *
 * Double-click "SET ADMIN PASSWORD.bat", or run:  node scripts/set-password.js
 * Needs the Blob token in .env.production.local or .env.local (as push-files.js does). */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

function loadEnvFile(file) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+)="?(.*?)"?$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

/* read a line from the keyboard without showing what is typed */
function askHidden(prompt) {
  return new Promise(function (resolve) {
    const stdin = process.stdin;
    process.stdout.write(prompt);
    let value = "";
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    function onData(ch) {
      const code = ch.charCodeAt(0);
      if (ch === "\r" || ch === "\n" || code === 4) {
        stdin.setRawMode(false); stdin.pause(); stdin.removeListener("data", onData);
        process.stdout.write("\n");
        resolve(value);
      } else if (code === 3) {
        process.stdout.write("\nCancelled - nothing was changed.\n"); process.exit(1);
      } else if (code === 8 || code === 127) {
        if (value) { value = value.slice(0, -1); process.stdout.write("\b \b"); }
      } else {
        value += ch; process.stdout.write("*");
      }
    }
    stdin.on("data", onData);
  });
}

(async function () {
  if (!process.env.BLOB_READ_WRITE_TOKEN) loadEnvFile(".env.production.local");
  if (!process.env.BLOB_READ_WRITE_TOKEN) loadEnvFile(".env.local");
  if (!process.env.BLOB_READ_WRITE_TOKEN || /SENSITIVE|\*/.test(process.env.BLOB_READ_WRITE_TOKEN)) {
    console.error("The storage key (BLOB_READ_WRITE_TOKEN) in .env.production.local is missing or still hidden (shows * or [SENSITIVE]).");
    console.error("Vercel keeps it hidden. Copy it from Vercel: project ckb > Storage > your Blob store >");
    console.error(".env.local tab, and paste the BLOB_READ_WRITE_TOKEN line into .env.production.local.");
    process.exit(1);
  }
  if (!process.stdin.isTTY) {
    console.error("Please run this in a window where you can type (double-click SET ADMIN PASSWORD.bat).");
    process.exit(1);
  }
  const { hashPassword, setPasswordHash, checkPassword } = require("../lib/auth");

  console.log("Set a new admin password for the live CKB (Chaithanya Kala Bharathi) website.\n");
  const first = await askHidden("New password: ");
  if (first.length < 8) { console.error("The password must be at least 8 characters. Nothing was changed."); process.exit(1); }
  const second = await askHidden("Type it again: ");
  if (first !== second) { console.error("The two entries don't match. Nothing was changed."); process.exit(1); }

  console.log("\nSaving...");
  await setPasswordHash(hashPassword(first));
  /* read it back from the live store and try the new password against it */
  if (!(await checkPassword(first))) {
    console.error("Saved, but the live site does not accept it yet. Wait a minute and run this again.");
    process.exit(1);
  }
  console.log("Checked: the live site accepts the new password.");
  console.log("\nDone. Log in at https://ckb-delta.vercel.app/admin.html with the new password.");
})().catch(function (e) {
  console.error("Failed:", (e && e.message) || e);
  process.exit(1);
});
