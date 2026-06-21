import { put, list, del } from '@vercel/blob';

const DATA_PATH = 'data/thumbnails.json';

async function readData() {
  const { blobs } = await list({ prefix: DATA_PATH, limit: 10 });
  const match = blobs.find((b) => b.pathname === DATA_PATH);
  if (!match) return [];
  // Vercel Blob's CDN can take up to ~60s to propagate an overwrite. A
  // unique query param forces a fresh fetch instead of a stale cached one.
  const res = await fetch(`${match.url}?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function writeData(data) {
  await put(DATA_PATH, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60, // 60s is Vercel Blob's documented minimum
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password, id } = req.body || {};

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  try {
    const data = await readData();
    const target = data.find((t) => t.id === id);
    const remaining = data.filter((t) => t.id !== id);
    await writeData(remaining);

    if (target && target.src && target.src.includes('blob.vercel-storage.com')) {
      try {
        await del(target.src);
      } catch (e) {
        console.error('Failed to delete blob image (data was still removed):', e);
      }
    }

    return res.status(200).json({ ok: true, data: remaining });
  } catch (err) {
    console.error('POST /api/delete failed:', err);
    return res.status(500).json({ error: 'Delete failed. Try again.' });
  }
}
