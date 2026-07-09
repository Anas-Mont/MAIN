import { put, list } from '@vercel/blob';

export const DATA_PATH = 'data/thumbnails.json';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Vercel Blob's list() API is only *eventually consistent* — right after a
// write, a list() call (even from a different request a few seconds later)
// can still return the pre-write snapshot. Since DATA_PATH never changes
// (addRandomSuffix: false), we remember the real blob URL in module scope
// once we learn it. Serverless functions get reused ("warm") between nearby
// requests, so this lets an upload immediately followed by a page load read
// the fresh file directly instead of racing list()'s consistency window.
let cachedUrl = null;

async function fetchJson(url) {
  const res = await fetch(`${url}?t=${Date.now()}`, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) ? data : null;
}

export async function readThumbnails(retries = 4) {
  // Fast path: we already know the direct URL from a recent write on this
  // warm instance — skip list() and its consistency lag entirely.
  if (cachedUrl) {
    try {
      const data = await fetchJson(cachedUrl);
      if (data) return data;
    } catch (_) { /* fall through to the list()-based path below */ }
  }

  let lastError;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const { blobs } = await list({ prefix: DATA_PATH, limit: 10 });
      const match = blobs.find((b) => b.pathname === DATA_PATH);

      if (!match) {
        if (attempt < retries - 1) {
          await sleep(350 * (attempt + 1));
          continue;
        }
        return [];
      }

      cachedUrl = match.url;
      const data = await fetchJson(match.url);
      if (data === null) {
        if (attempt < retries - 1) {
          await sleep(350 * (attempt + 1));
          continue;
        }
        return [];
      }

      return data;
    } catch (err) {
      lastError = err;
      if (attempt < retries - 1) {
        await sleep(400 * (attempt + 1));
      }
    }
  }

  if (lastError) throw lastError;
  return [];
}

export async function writeThumbnails(data) {
  const blob = await put(DATA_PATH, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
  // Remember the URL immediately so the very next read (e.g. the admin
  // panel re-fetching the list, or the main site loading a moment later)
  // doesn't have to go through list()'s eventual-consistency window.
  cachedUrl = blob.url;
  return blob;
}
