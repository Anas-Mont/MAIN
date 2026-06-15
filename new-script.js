/* ============================================
   ANAS — Thumbnail Specialist Portfolio
   BOLD EDITORIAL THEME — JavaScript
   ============================================ */

// ─── Thumbnail Data ───
const thumbnailData = [
  { src: 'Roblox.webp',                    title: 'Roblox Gaming',         category: 'gaming' },
  { src: 'part 1 thumbnail 2.png',          title: 'Gaming Series Pt.1',    category: 'gaming' },
  { src: 'Part 1 thumbnail 3.png',          title: 'Gaming Series Pt.2',    category: 'gaming' },
  { src: 'FARLIGHT copy_compressed.png',    title: 'Farlight 84',           category: 'gaming' },
  { src: 'QBZ new copy_compressed.png',     title: 'QBZ New Skin',          category: 'gaming' },
  { src: 'ZERO STASH 1_compressed.png',     title: 'Zero Stash',            category: 'gaming' },
  { src: 'enternal QBZ copy_compressed.png',title: 'Eternal QBZ',           category: 'gaming' },
  { src: 'new gun 2 copy.jpg',              title: 'New Gun Skin',          category: 'gaming' },
  { src: 'new gun skin 3 copy_compressed.png', title: 'Gun Skin Collection', category: 'gaming' },
  { src: 'm1887 skin copy.jpg',             title: 'M1887 Skin',            category: 'gaming' },
  { src: 'kar981 copy.png',                 title: 'Kar98 Highlight',       category: 'gaming' },
  { src: 'uzi copy.jpg',                    title: 'Uzi Special',           category: 'gaming' },
  { src: 'practice copy_compressed.png',    title: 'Practice Mode',         category: 'gaming' },
  { src: 'vlcsnap-2025-02-07-22h28m37s077 copy.png', title: 'Gameplay Capture', category: 'gaming' },
  { src: 'Intel - Arc B580.jpg',            title: 'Intel Arc B580',        category: 'tech' },
  { src: 'MSI Claw 8.jpg',                  title: 'MSI Claw Review',       category: 'tech' },
  { src: 'Keyboard.jpg',                    title: 'Keyboard Review',       category: 'tech' },
  { src: 'chromebook vs laptop copy.jpg',   title: 'Chromebook vs Laptop',  category: 'tech' },
  { src: 'huawei matebook 14 copy.jpg',     title: 'Huawei MateBook 14',    category: 'tech' },
  { src: 'speaker.jpg',                     title: 'Speaker Review',        category: 'tech' },
  { src: 'shoes.jpg',                       title: 'Product Showcase',      category: 'tech' },
  { src: 'claude fail copy.jpg',            title: 'Claude AI Fail',        category: 'tech' },
  { src: 'flat lay style copy.jpg',         title: 'Flat Lay Style',        category: 'tech' },
  { src: 'flat one copy.jpg',               title: 'Flat Design',           category: 'tech' },
  { src: 'thumbnail prompt copy.jpg',       title: 'Thumbnail Prompt',      category: 'tech' },
  { src: 'Worth Every Penny.jpg',           title: 'Worth Every Penny',     category: 'social' },
  { src: 'Traveling Gears copy.jpg',        title: 'Traveling Gears',       category: 'social' },
  { src: 'Cycle sample  1022 copy.jpg',     title: 'Cycle Sample',          category: 'social' },
  { src: 'Samcux sample 1321 copy.jpg',     title: 'Samcux Sample',         category: 'social' },
  { src: 'new one audio-Recovered copy.jpg',title: 'Audio Thumbnail',       category: 'social' },
  { src: 'talha copy_compressed.jpg',       title: 'Client Work — Talha',   category: 'social' },
  { src: 'client 2.jpg',                    title: 'Client Work 2',         category: 'social' },
  { src: 'client 7 copy.jpg',               title: 'Client Work 7',         category: 'social' },
  { src: 'new client.jpg',                  title: 'New Client Design',     category: 'social' },
  { src: 'new client 2 copy.jpg',           title: 'Client Redesign',       category: 'social' },
  { src: 'new client 4 copy.jpg',           title: 'Client Work 4',         category: 'social' },
  { src: 'new client 5 copy.jpg',           title: 'Client Work 5',         category: 'social' },
  { src: 'new client 10 copy.jpg',          title: 'Client Work 10',        category: 'social' },
  { src: 'new client 11 22 copy.jpg',       title: 'Client Work 11',        category: 'social' },
  { src: 'new 10 copy_compressed.png',      title: 'Design Concept',        category: 'social' },
  { src: 'new 1.jpg',                       title: 'Fresh Design',          category: 'social' },
  { src: 'Untitled-galssy copy.jpg',        title: 'Glassy Style',          category: 'social' },
];

// ─── Reviews Data ───
const reviewsData = [
  {
    name: 'Billy YT',
    role: 'YouTube Creator',
    stars: 5,
    text: 'Anas is incredibly talented with Photoshop thumbnails. Quick bug fixes and lightning-fast response times. My go-to designer for all YouTube thumbnails!'
  },
  {
    name: 'Raza',
    role: 'Eco-friendly Business',
    stars: 5,
    text: 'The nature-inspired dark theme Anas created matched our brand essence perfectly. Absolutely stunning work with incredible attention to detail.'
  },
  {
    name: 'Ahmed Khan',
    role: 'YouTube Creator',
    stars: 5,
    text: 'After Anas designed our thumbnails, we saw a 45% increase in channel CTR. The designs are eye-catching and professional. Highly recommended!'
  },
  {
    name: 'Ali',
    role: 'YouTube Creator',
    stars: 5,
    text: 'Clean, bold thumbnail designs that made my channel stand out. Anas delivered exactly what I needed — professional work with fast turnaround.'
  }
];

// ─── State ───
let currentCategory = 'all';
let visibleCount = 16;
let lightboxImages = [];
let lightboxIndex = 0;
let currentZoom = 1;

const DESKTOP_PER_PAGE = 16;
const MOBILE_PER_PAGE = 10;
const MOBILE_BREAKPOINT = 768;

function getPerPage() {
  return window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_PER_PAGE : DESKTOP_PER_PAGE;
}

function resetVisibleCount() {
  visibleCount = getPerPage();
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  // Randomize thumbnails for a mixed gallery
  for (let i = thumbnailData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [thumbnailData[i], thumbnailData[j]] = [thumbnailData[j], thumbnailData[i]];
  }

  resetVisibleCount();
  initNavbar();
  initMobileNav();
  renderGallery();
  renderReviews();
  initGalleryFilters();
  initStarRating();
  initContactForm();
  initContactModal();
  initReviewForm();
  initScrollReveal();
  initSmoothScroll();
  initLightbox();
  initBrushCursor();
  initOfferCountdown();
  initSeeThumbnails();

  window.addEventListener('resize', debounce(() => {
    const perPage = getPerPage();
    if (visibleCount < perPage) visibleCount = perPage;
    renderGallery();
  }, 200));
});

// ═══════════════════════════════════════════
//  Navigation
// ═══════════════════════════════════════════
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let ticking = false;
  let lastScrolled = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== lastScrolled) {
        navbar.classList.toggle('scrolled', scrolled);
        lastScrolled = scrolled;
      }
      updateActiveLink();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  let currentId = '';

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      currentId = section.getAttribute('id');
    }
  });

  if (!currentId) return;

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
  });
}

function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.mobile-overlay');
  const navbar = document.querySelector('.navbar');

  if (!hamburger || !navLinks) return;

  const close = () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    if (navbar) navbar.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  };

  const open = () => {
    hamburger.classList.add('active');
    navLinks.classList.add('open');
    if (overlay) overlay.classList.add('active');
    if (navbar) navbar.classList.add('menu-open');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  };

  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    navLinks.classList.contains('open') ? close() : open();
  });

  if (overlay) overlay.addEventListener('click', close);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) close();
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) close();
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id === '#' || link.classList.contains('open-contact-modal')) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ═══════════════════════════════════════════
//  Zoom to Gallery
// ═══════════════════════════════════════════
function initSeeThumbnails() {
  const btn = document.getElementById('seeThumbnailsBtn');
  if (btn) btn.addEventListener('click', e => { e.preventDefault(); zoomToGallery(); });
}

function zoomToGallery() {
  const portfolio = document.getElementById('portfolio');
  const portal = document.getElementById('galleryZoomPortal');
  if (!portfolio) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    portfolio.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  document.body.classList.add('gallery-zooming');

  if (portal) {
    portal.classList.remove('active');
    requestAnimationFrame(() => portal.classList.add('active'));
  }

  setTimeout(() => {
    const top = portfolio.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: 'auto' });
    portfolio.classList.remove('portfolio-reveal');
    void portfolio.offsetWidth;
    portfolio.classList.add('portfolio-reveal');

    document.body.classList.remove('gallery-zooming');
    if (portal) portal.classList.remove('active');

    setTimeout(() => portfolio.classList.remove('portfolio-reveal'), 800);
  }, 620);
}

// ═══════════════════════════════════════════
//  Gallery
// ═══════════════════════════════════════════
function getFilteredThumbs() {
  if (currentCategory === 'all') return thumbnailData;
  return thumbnailData.filter(t => t.category === currentCategory);
}

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const filtered = getFilteredThumbs();
  const toShow = filtered.slice(0, visibleCount);
  const fragment = document.createDocumentFragment();

  grid.innerHTML = '';
  lightboxImages = [];

  toShow.forEach((thumb, index) => {
    lightboxImages.push({ src: thumb.src, title: thumb.title });

    const item = document.createElement('div');
    item.className = 'gallery-item reveal visible';
    item.setAttribute('data-index', index);

    item.innerHTML = `
      <img src="${thumb.src}" alt="${thumb.title}" fetchpriority="high" />
      <div class="item-overlay">
        <div>
          <span class="overlay-cat">${thumb.category}</span>
          <div class="overlay-text">${thumb.title}</div>
        </div>
      </div>
    `;

    item.addEventListener('click', () => openLightbox(index));
    fragment.appendChild(item);
  });

  grid.appendChild(fragment);

  const showMoreWrap = document.getElementById('showMoreWrap');
  if (showMoreWrap) {
    showMoreWrap.style.display = visibleCount >= filtered.length ? 'none' : 'block';
  }
}

function initGalleryFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const showMoreBtn = document.getElementById('showMoreBtn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      resetVisibleCount();
      renderGallery();
    });
  });

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      visibleCount += getPerPage();
      renderGallery();
    });
  }
}

// ═══════════════════════════════════════════
//  Lightbox
// ═══════════════════════════════════════════
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const zoomInBtn = lightbox.querySelector('.zoom-in');
  const zoomOutBtn = lightbox.querySelector('.zoom-out');
  const zoomResetBtn = lightbox.querySelector('.zoom-reset');

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => navigateLightbox(-1));
  nextBtn?.addEventListener('click', () => navigateLightbox(1));
  zoomInBtn?.addEventListener('click', () => zoomLightbox(0.25));
  zoomOutBtn?.addEventListener('click', () => zoomLightbox(-0.25));
  zoomResetBtn?.addEventListener('click', () => { currentZoom = 1; applyZoom(); });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-img-wrap')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === '+' || e.key === '=') zoomLightbox(0.25);
    if (e.key === '-') zoomLightbox(-0.25);
  });

  const imgWrap = lightbox.querySelector('.lightbox-img-wrap');
  imgWrap?.addEventListener('wheel', e => {
    e.preventDefault();
    zoomLightbox(e.deltaY > 0 ? -0.15 : 0.15);
  }, { passive: false });

  // Touch swipe
  let touchStartX = 0;
  imgWrap?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  imgWrap?.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigateLightbox(diff > 0 ? 1 : -1);
  }, { passive: true });
}

function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || !lightboxImages.length) return;
  lightboxIndex = index;
  currentZoom = 1;
  updateLightboxImage();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  currentZoom = 1;
  updateLightboxImage();
}

function updateLightboxImage() {
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  if (!img) return;
  const data = lightboxImages[lightboxIndex];
  img.style.opacity = '0';
  img.onload = () => { img.style.opacity = '1'; };
  img.src = data.src;
  img.alt = data.title;
  img.style.filter = 'none';
  if (caption) caption.textContent = data.title;
  applyZoom();
}

function zoomLightbox(delta) {
  currentZoom = Math.min(Math.max(currentZoom + delta, 0.5), 4);
  applyZoom();
}

function applyZoom() {
  const img = document.getElementById('lightboxImg');
  const zoomLevel = document.getElementById('zoomLevel');
  if (img) img.style.transform = `scale(${currentZoom})`;
  if (zoomLevel) zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
}

// ═══════════════════════════════════════════
//  Reviews
// ═══════════════════════════════════════════
function renderReviews() {
  const list = document.getElementById('reviewsList');
  if (!list) return;

  const stored = JSON.parse(localStorage.getItem('portfolio_reviews') || '[]');
  const allReviews = [...reviewsData, ...stored];

  list.innerHTML = allReviews.map(r => `
    <div class="review-card reveal visible">
      <div class="review-header">
        <div class="review-avatar">${r.name.charAt(0)}</div>
        <div class="review-info">
          <h4>${escapeHTML(r.name)}</h4>
          <span>${escapeHTML(r.role || 'Client')}</span>
        </div>
      </div>
      <div class="review-stars">
        ${'<i class="fas fa-star"></i>'.repeat(r.stars)}${'<i class="far fa-star"></i>'.repeat(5 - r.stars)}
      </div>
      <p class="review-text">${escapeHTML(r.text)}</p>
    </div>
  `).join('');

  initScrollReveal();
}

function initStarRating() {
  const stars = document.querySelectorAll('.star-rating-input .star');
  let selectedRating = 0;

  stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.rating);
      stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.rating) <= val));
    });
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.rating);
      stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.rating) <= selectedRating));
    });
  });

  document.querySelector('.star-rating-input')?.addEventListener('mouseleave', () => {
    stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.rating) <= selectedRating));
  });

  window.getSelectedRating = () => selectedRating;
}

function initReviewForm() {
  const form = document.getElementById('reviewForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('reviewerName')?.value.trim();
    const text = document.getElementById('reviewText')?.value.trim();
    const stars = window.getSelectedRating?.() || 5;

    if (!name || !text) { showToast('Please fill in all fields', 'error'); return; }

    const stored = JSON.parse(localStorage.getItem('portfolio_reviews') || '[]');
    stored.push({ name, text, stars, role: 'Client' });
    localStorage.setItem('portfolio_reviews', JSON.stringify(stored));

    form.reset();
    document.querySelectorAll('.star-rating-input .star').forEach(s => s.classList.remove('active'));
    renderReviews();
    showToast('Thank you for your review!', 'success');
  });
}

// ═══════════════════════════════════════════
//  Contact Modal
// ═══════════════════════════════════════════
function initContactModal() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;

  const backdrop = modal.querySelector('.contact-modal-backdrop');
  const closeBtn = modal.querySelector('.contact-modal-close');
  const form = document.getElementById('modalContactForm');

  const open = (prefillSubject = '') => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (prefillSubject) {
      const subject = document.getElementById('modalContactSubject');
      if (subject) subject.value = prefillSubject;
    }
    setTimeout(() => document.getElementById('modalContactName')?.focus(), 300);
  };

  const close = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.open-contact-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const isOffer = isOfferActive() && (btn.closest('.offer-card') || btn.textContent.includes('Claim'));
      open(isOffer ? 'June Offer — $15 Thumbnail' : '');
    });
  });

  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) close();
  });

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('modalContactName')?.value.trim();
      const email = document.getElementById('modalContactEmail')?.value.trim();
      const subject = document.getElementById('modalContactSubject')?.value.trim();
      const message = document.getElementById('modalContactMessage')?.value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill in all fields', 'error');
        return;
      }

      sendContactEmail({ name, email, subject, message });
      form.reset();
      close();
    });
  }

  window.openContactModal = open;
}

function sendContactEmail({ name, email, subject, message }) {
  const bodyText = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  if (isMobile) {
    const mailto = `mailto:cyberatt009@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailto;
  } else {
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=cyberatt009@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    window.open(gmail, '_blank');
  }

  showToast('Opening email to send your message...', 'success');
}

// ═══════════════════════════════════════════
//  Offer Countdown
// ═══════════════════════════════════════════
function getOfferEndDate() {
  return new Date(new Date().getFullYear(), 5, 30, 23, 59, 59);
}

function isOfferActive() {
  return Date.now() < getOfferEndDate().getTime();
}

function showOfferExpired() {
  const section = document.querySelector('.offer-section');
  const active = document.getElementById('offerActive');
  const unavailable = document.getElementById('offerUnavailable');
  const header = document.getElementById('offerSectionHeader');
  const navOffer = document.querySelector('.nav-links a[href="#offer"]');

  if (active) active.hidden = true;
  if (unavailable) {
    unavailable.hidden = false;
    unavailable.classList.add('visible');
  }
  if (section) section.classList.add('offer-expired');
  if (header) header.hidden = true;
  if (navOffer) navOffer.textContent = 'Offer';
}

function initOfferCountdown() {
  const timer = document.getElementById('countdownTimer');
  const countdownWrap = document.getElementById('offerCountdown');
  if (!timer) return;

  const endDate = getOfferEndDate();

  const update = () => {
    if (!isOfferActive()) {
      showOfferExpired();
      return;
    }

    const diff = endDate - Date.now();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    timer.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
  };

  if (!isOfferActive()) {
    showOfferExpired();
    if (countdownWrap) countdownWrap.style.display = 'none';
    return;
  }

  update();
  setInterval(update, 1000);
}

// ═══════════════════════════════════════════
//  Brush Cursor
// ═══════════════════════════════════════════
function initBrushCursor() {
  const cursor = document.getElementById('brushCursor');
  if (!cursor || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let x = -100;
  let y = -100;
  let rafId = null;
  let visible = false;

  const move = () => {
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    cursor.style.willChange = 'transform';
    rafId = null;
  };

  const idleCursor = () => {
    cursor.style.willChange = 'auto';
  };

  const show = () => {
    if (!visible) {
      visible = true;
      cursor.classList.add('visible');
    }
  };

  document.addEventListener('mousemove', e => {
    x = e.clientX;
    y = e.clientY;
    show();
    if (!rafId) rafId = requestAnimationFrame(move);
    clearTimeout(initBrushCursor._idle);
    initBrushCursor._idle = setTimeout(idleCursor, 120);
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', () => {
    visible = false;
    cursor.classList.remove('visible');
  });

  document.documentElement.addEventListener('mouseenter', show);

  const interactive = 'a, button, .gallery-item, .filter-btn, input, textarea, .star, .open-contact-modal, .hamburger';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactive)) cursor.classList.add('hovering');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactive)) cursor.classList.remove('hovering');
  });

  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
}

// ═══════════════════════════════════════════
//  Contact Form (page section)
// ═══════════════════════════════════════════
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const subject = document.getElementById('contactSubject')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !subject || !message) { showToast('Please fill in all fields', 'error'); return; }

    sendContactEmail({ name, email, subject, message });
    form.reset();
  });
}

// Copy email
window.copyEmail = function(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Copied';
    setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = orig; }, 2000);
  }).catch(() => showToast('Failed to copy', 'error'));
};

// ═══════════════════════════════════════════
//  Scroll Reveal
// ═══════════════════════════════════════════
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

// ═══════════════════════════════════════════
//  Utility
// ═══════════════════════════════════════════
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i> ${message}`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
