# CKB website — notes for Claude

Chaithanya Kala Bharathi. Plain HTML / CSS / JS, no build step; hosted on Vercel. See PROJECT.md / DEPLOY.md where present.

## Git
- Branch `main`, GitHub `shareef-arham/chaithanya-kala-bharathi` (remote `origin`).
- **After every commit, push to GitHub straight away** (`git push origin HEAD`) — the owner asked for this; no need to ask first.
- This repo has no git identity of its own. Commit with the author its history uses:
  `git -c user.name="shareefatp-arham" -c user.email="shareefatp@gmail.com" commit ...`

## Publishing
- The owner publishes by double-clicking **`deploy.bat`** (it hides `.git` during the upload, then runs `vercel deploy --prod`). Tell them when a change needs it; afterwards check https://www.ckbndl.org.
- Live content (`data/*.json`, `uploads/`) is stored in **Vercel Blob**, not in the files `deploy.bat` sends. It is normally edited in the live admin panel. To publish a content file from this computer, first check the live copy has not been edited since (fetch `https://www.ckbndl.org/data/<file>` and compare), then **ask**, then run `node scripts/push-files.js data/<file>`.

## Working on it
- Run locally with `py server.py 8000` (http://localhost:8000); check changes there before committing.
- When `assets/css/style.css` changes, bump its `?v=` number on **every** page that links it, so browsers load the new version.
- The Gallery: 12 cards per page, newest first by a `date` (YYYY-MM); programme / partner films appear there only together with their report (never annual reports).
