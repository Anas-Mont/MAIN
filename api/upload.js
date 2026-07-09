import { put } from '@vercel/blob';
import { readThumbnails, writeThumbnails } from './lib/thumbnails-data.js';

const MAX_BYTES = 4 * 1024 * 1024; // stay under Vercel's 4.5MB request body limit

async function uploadImage(base64, contentType) {
  const raw = base64.includes(',') ? base64.split(',')[1] : base64;
  const buffer = Buffer.from(raw, 'base64');

  if (buffer.length > MAX_BYTES) {
    throw Object.assign(new Error('Image is too large even after compression. Try a smaller image.'), { status: 413 });
  }
  if (buffer.length < 500) {
    throw Object.assign(new Error('That image looks corrupt or empty. Try a different file.'), { status: 400 });
  }

  const ext = ((contentType || 'image/jpeg').split('/')[1] || 'jpg').replace('jpeg', 'jpg');
  const filename = `thumbs/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const blob = await put(filename, buffer, {
    access: 'public',
    contentType: contentType || 'image/jpeg',
    addRandomSuffix: true,
  });

  return blob.url;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    password,
    title,
    category,
    imageBase64,
    contentType,
    beforeImageBase64,
    beforeContentType,
  } = req.body || {};

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  if (!title || !category || !imageBase64) {
    return res.status(400).json({ error: 'Missing title, category, or image' });
  }

  try {
    const src = await uploadImage(imageBase64, contentType);
    let beforeSrc = null;

    if (beforeImageBase64) {
      beforeSrc = await uploadImage(beforeImageBase64, beforeContentType || contentType);
    }

    const data = await readThumbnails(3);
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      src,
      title: String(title).slice(0, 120),
      category: String(category).toLowerCase().trim(),
      createdAt: Date.now(),
    };
    if (beforeSrc) entry.beforeSrc = beforeSrc;

    data.unshift(entry);
    await writeThumbnails(data);

    return res.status(200).json({ ok: true, entry, data });
  } catch (err) {
    console.error('POST /api/upload failed:', err);
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || 'Upload failed. Try again.' });
  }
}
