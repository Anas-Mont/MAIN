import { put, list } from '@vercel/blob';

const DATA_PATH = 'data/thumbnails.json';
const MAX_BYTES = 4 * 1024 * 1024; // stay under Vercel's 4.5MB request body limit

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

  const { password, title, category, imageBase64, contentType } = req.body || {};

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  if (!title || !category || !imageBase64) {
    return res.status(400).json({ error: 'Missing title, category, or image' });
  }

  try {
    const base64 = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    const buffer = Buffer.from(base64, 'base64');

    if (buffer.length > MAX_BYTES) {
      return res.status(413).json({ error: 'Image is too large even after compression. Try a smaller image.' });
    }
    if (buffer.length < 500) {
      return res.status(400).json({ error: 'That image looks corrupt or empty. Try a different file.' });
    }

    const ext = ((contentType || 'image/jpeg').split('/')[1] || 'jpg').replace('jpeg', 'jpg');
    const filename = `thumbs/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: contentType || 'image/jpeg',
      addRandomSuffix: true,
    });

    const data = await readData();
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      src: blob.url,
      title: String(title).slice(0, 120),
      category: String(category).toLowerCase().trim(),
      createdAt: Date.now(),
    };
    data.unshift(entry);
    await writeData(data);

    return res.status(200).json({ ok: true, entry, data });
  } catch (err) {
    console.error('POST /api/upload failed:', err);
    return res.status(500).json({ error: 'Upload failed. Try again.' });
  }
}
