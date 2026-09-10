"use strict";
const { clearSessionCookie } = require("../lib/auth");

module.exports = async function (req, res) {
  clearSessionCookie(res);
  res.status(200).json({ ok: true });
};
