"use strict";
const { checkPassword, setSessionCookie } = require("../lib/auth");

/* A fixed delay on every attempt (success or failure) blunts brute-forcing
 * without needing any stateful rate-limit bookkeeping across invocations. */
function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

module.exports = async function (req, res) {
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }
  await delay(350);
  const password = req.body && req.body.password;
  if (!password || !(await checkPassword(password))) {
    res.status(401).json({ ok: false, error: "Invalid password" });
    return;
  }
  setSessionCookie(res);
  res.status(200).json({ ok: true });
};
