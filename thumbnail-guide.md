# Thumbnail Management Guide

## How to Add/Replace Thumbnails

### Method 1: Replace Placeholder Images
1. Save your thumbnail images in the `portfolio-website` folder
2. Name them: `thumbnail1.jpg`, `thumbnail2.jpg`, etc.
3. Open `index.html` in a text editor
4. Find the thumbnail sections (around line 256-308)
5. Replace the placeholder content with your image:

**Before:**
```html
<div class="placeholder-thumbnail">
    <i class="fas fa-image"></i>
    <span>Thumbnail 1</span>
</div>
```

**After:**
```html
<img src="thumbnail1.jpg" alt="Your Thumbnail Description" class="thumbnail-img">
```

### Method 2: Quick Text Update
To change the thumbnail labels:
1. Find `<span>Thumbnail 1</span>` in the HTML
2. Replace with your desired text: `<span>Gaming Thumbnail</span>`

### CSS for Images
Add this CSS to `style.css` if using actual images:

```css
.thumbnail-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
}
```

### Tips:
- Keep image files under 500KB for fast loading
- Use JPG or PNG format
- Recommended size: 1280x720px (16:9 ratio)
- Images will automatically resize to fit the cards

### Contact Integration
When someone clicks a thumbnail, they'll get a message to contact you for similar designs. The contact form will open their email client automatically.

