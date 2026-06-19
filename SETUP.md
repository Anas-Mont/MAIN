# Thumbnail Uploader — Setup (one-time, ~5 minutes)

This adds a private `/admin.html` page where you upload a thumbnail, type a
title, pick a category, and hit a button. It goes live on the site in a few
seconds — no editing `index.html`, no touching the `thumbnailData` array, no
manual file uploads to the repo ever again.

## What's new in this folder
- `admin.html` — the upload/manage page (not linked anywhere on the public site)
- `api/upload.js` — handles uploads (password-checked)
- `api/delete.js` — handles removing a thumbnail (password-checked)
- `api/thumbnails.js` — public read endpoint the homepage calls to fetch uploads
- `package.json` — adds the `@vercel/blob` dependency these functions need
- `index.html` — one small change: it now fetches `/api/thumbnails` on load and
  merges anything you've uploaded in front of the original baked-in list

## One-time setup

### 1. Push these files to your GitHub repo
Same repo Vercel already deploys from. If you already have a `package.json`,
just add `"@vercel/blob": "^2.4.1"` to its `dependencies` instead of
replacing the whole file.

### 2. Turn on Vercel Blob storage
In the Vercel dashboard → your project → **Storage** tab → **Create Database**
→ **Blob** → Connect it to this project. This automatically adds a
`BLOB_READ_WRITE_TOKEN` environment variable for you — you don't type this
in yourself.

### 3. Set your admin password
Vercel dashboard → your project → **Settings** → **Environment Variables**
→ add:
- Key: `ADMIN_PASSWORD`
- Value: pick something only you know
- Apply to: Production (and Preview if you want to test there too)

### 4. Redeploy
Either push a commit (Vercel auto-deploys) or hit **Redeploy** in the
dashboard so the new environment variable and dependency take effect.

### 5. Use it
Go to `https://main-phi-smoky.vercel.app/admin.html`, enter your password,
drop in a thumbnail, fill in the title/category, and upload. Check the
homepage — it's already there.

## Notes
- The password check happens on the server (in `api/upload.js` /
  `api/delete.js`), so even though `admin.html` isn't linked from
  anywhere, it's genuinely protected — not just hidden.
- Images are auto-resized to max 1280px wide and compressed to JPEG
  before upload, so you don't need to manually compress files anymore.
- The "Manage" list on `/admin.html` only shows thumbnails added through
  this tool. The original set baked into `index.html` isn't tracked there —
  if you ever need to remove one of those, it's the same manual edit as
  before (rare, since this is just for new daily uploads going forward).
- Free Vercel Blob storage covers this kind of use comfortably; if you
  ever delete old thumbnails through the admin page, their files are
  removed from storage too, so it won't quietly grow forever.
