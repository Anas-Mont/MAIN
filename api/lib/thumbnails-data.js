import { put, list } from '@vercel/blob';

export const DATA_PATH = 'data/thumbnails.json';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function readThumbnails(retries = 4) {
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

      const res = await fetch(`${match.url}?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
        },
      });

      if (!res.ok) {
        if (attempt < retries - 1) {
          await sleep(350 * (attempt + 1));
          continue;
        }
        return [];
      }

      const data = await res.json();
      return Array.isArray(data) ? data : [];
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
  await put(DATA_PATH, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}
