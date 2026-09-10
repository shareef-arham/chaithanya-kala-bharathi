"use strict";
/* Admin-only: changes the live admin password. Writes the new hash to Blob
 * (auth/password.json) so it takes effect immediately — no redeploy, unlike
 * changing the ADMIN_PASSWORD_HASH environment variable. */
const { requireAuth, checkPassword, hashPassword, setPasswordHash } = require("../lib/auth");

function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

module.exports = async function (req, res) {
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  try {
    requireAuth(req);
  } catch (e) {
    res.status(e.statusCode || 401).json({ ok: false, error: "Not authenticated" });
    return;
  }

  const body = req.body || {};
  const currentPassword = body.currentPassword;
  const newPassword = body.newPassword;

  if (!currentPassword || !newPassword) {
    res.status(400).json({ ok: false, error: "Enter your current password and a new one." });
    return;
  }
  if (String(newPassword).length < 8) {
    res.status(400).json({ ok: false, error: "New password must be at least 8 characters." });
    return;
  }

  await delay(350); // same brute-force speed bump as login
  const ok = await checkPassword(currentPassword);
  if (!ok) {
    res.status(401).json({ ok: false, error: "Current password is incorrect." });
    return;
  }

  try {
    await setPasswordHash(hashPassword(String(newPassword)));
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: String((e && e.message) || e) });
  }
};
