import { del } from '@vercel/blob';
import { readThumbnails, writeThumbnails } from './lib/thumbnails-data.js';

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
    const data = await readThumbnails(3);
    const target = data.find((t) => t.id === id);
    const remaining = data.filter((t) => t.id !== id);
    await writeThumbnails(remaining);

    const blobUrls = [target?.src, target?.beforeSrc].filter(
      (url) => url && url.includes('blob.vercel-storage.com')
    );

    for (const url of blobUrls) {
      try {
        await del(url);
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
