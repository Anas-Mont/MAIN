import { readThumbnails } from './lib/thumbnails-data.js';

// Public, read-only. The main site calls this on every page load to get
// the list of thumbnails that have been uploaded through admin.html.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');

  try {
    const data = await readThumbnails(4);
    return res.status(200).json(data);
  } catch (err) {
    console.error('GET /api/thumbnails failed:', err);
    // Fail soft — the live site should never break because this call failed.
    return res.status(200).json([]);
  }
}
