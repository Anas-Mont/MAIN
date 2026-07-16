// Proxies Vercel Blob images through our own domain. Ad blockers commonly
// block *.public.blob.vercel-storage.com wholesale (it's a shared domain
// abused by spam projects in the past), which breaks thumbnails for a real
// share of visitors — anyone running uBlock Origin, Brave Shields, etc.
// Serving images from main-phi-smoky.vercel.app/api/image instead means
// ad blockers never see a URL pattern they'd recognize and block.
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || typeof url !== 'string' || !url.includes('.public.blob.vercel-storage.com/')) {
    return res.status(400).json({ error: 'Invalid image URL' });
  }

  try {
    const upstream = await fetch(url);
    if (!upstream.ok) {
      return res.status(upstream.status).end();
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await upstream.arrayBuffer());

    res.setHeader('Content-Type', contentType);
    // Blob URLs are immutable (each upload gets a unique random-suffixed
    // filename), so this is safe to cache aggressively and forever.
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.status(200).send(buffer);
  } catch (err) {
    console.error('GET /api/image failed:', err);
    return res.status(502).json({ error: 'Failed to fetch image' });
  }
}
