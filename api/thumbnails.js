import { list } from '@vercel/blob';

const DATA_PATH = 'data/thumbnails.json';

// Public, read-only. The main site calls this on every page load to get
// the list of thumbnails that have been uploaded through admin.html.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  try {
    const { blobs } = await list({ prefix: DATA_PATH, limit: 10 });
    const match = blobs.find((b) => b.pathname === DATA_PATH);

    if (!match) {
      return res.status(200).json([]);
    }

    const fileRes = await fetch(`${match.url}?t=${Date.now()}`, { cache: 'no-store' });
    const data = fileRes.ok ? await fileRes.json() : [];
    return res.status(200).json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error('GET /api/thumbnails failed:', err);
    // Fail soft — the live site should never break because this call failed.
    return res.status(200).json([]);
  }
}
