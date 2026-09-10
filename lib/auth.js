/* Server-side auth for the live admin panel.
 * A password (scrypt-hashed, never stored in plain text) unlocks an
 * httpOnly, signed session cookie. Nothing here ever runs in the browser —
 * that's the whole point: the browser can't read or forge these secrets. */
"use strict";
const crypto = require("crypto");

const COOKIE_NAME = "ckb_admin";
const SESSION_MS = 8 * 60 * 60 * 1000; // 8 hours

function b64url(buf) {
  return Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64url(s) {
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function secret() {
  const s = process.env.ADMIN_TOKEN_SECRET;
  if (!s) throw new Error("ADMIN_TOKEN_SECRET is not set");
  return s;
}

function sign(payloadObj) {
  const payload = b64url(JSON.stringify(payloadObj));
  const sig = crypto.createHmac("sha256", secret()).update(payload).digest();
  return payload + "." + b64url(sig);
}

function verify(token) {
  if (!token || typeof token !== "string" || token.indexOf(".") < 0) return null;
  const [payload, sig] = token.split(".");
  const expected = b64url(crypto.createHmac("sha256", secret()).update(payload).digest());
  const a = Buffer.from(sig || "");
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  let obj;
  try { obj = JSON.parse(fromB64url(payload).toString("utf8")); } catch (e) { return null; }
  if (!obj || typeof obj.exp !== "number" || obj.exp < Date.now()) return null;
  return obj;
}

function parseCookies(req) {
  const header = (req.headers && req.headers.cookie) || "";
  const out = {};
  header.split(";").forEach(function (part) {
    const i = part.indexOf("=");
    if (i < 0) return;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  });
  return out;
}

function isAuthed(req) {
  const cookies = parseCookies(req);
  return !!verify(cookies[COOKIE_NAME]);
}

function requireAuth(req) {
  if (!isAuthed(req)) {
    const err = new Error("Not authenticated");
    err.statusCode = 401;
    throw err;
  }
}

function setSessionCookie(res) {
  const token = sign({ exp: Date.now() + SESSION_MS });
  res.setHeader(
    "Set-Cookie",
    COOKIE_NAME + "=" + token + "; Path=/; Max-Age=" + Math.floor(SESSION_MS / 1000) +
      "; HttpOnly; Secure; SameSite=Strict"
  );
}

function clearSessionCookie(res) {
  res.setHeader("Set-Cookie", COOKIE_NAME + "=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict");
}

/* ---- password hashing (scrypt, salted) ----
 * The current hash lives in Blob (auth/password.json) so it can be changed
 * from the admin panel with no redeploy — env vars only take effect on a
 * new deployment, which isn't what you want for "I just changed my
 * password". ADMIN_PASSWORD_HASH (the env var) is only the bootstrap value,
 * used until the first time someone changes the password. */
function hashPassword(plain) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(plain, salt, 64).toString("hex");
  return salt + ":" + hash;
}

async function currentPasswordHash() {
  const { readJSON } = require("./blob");
  const stored = await readJSON("auth/password.json").catch(function () { return null; });
  if (stored && stored.hash) return stored.hash;
  return process.env.ADMIN_PASSWORD_HASH || "";
}

async function setPasswordHash(hashStr) {
  const { writeJSON } = require("./blob");
  await writeJSON("auth/password.json", { hash: hashStr, updatedAt: new Date().toISOString() });
}

async function checkPassword(plain) {
  const stored = await currentPasswordHash();
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;
  const candidate = crypto.scryptSync(String(plain || ""), salt, 64);
  const expected = Buffer.from(hashHex, "hex");
  return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
}

module.exports = {
  COOKIE_NAME, isAuthed, requireAuth, setSessionCookie, clearSessionCookie,
  hashPassword, checkPassword, setPasswordHash,
};
