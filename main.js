// Mohammed Anas — Digital Jungle Portfolio
// Extracted from inline <script> blocks — combined, in original execution order

    // ─── Thumbnail Data ───
    // Anything uploaded through admin.html gets fetched from /api/thumbnails
    // and merged in front of this list automatically — no code edits needed.
    let thumbnailData = [
      { src: 'client-work-social-thumbnail.jpg', title: 'Client Work 2', category: 'social' },
      { src: 'roblox-gaming-thumbnail-2.webp', title: 'Roblox', category: 'gaming' },
      { src: 'msi-claw-8-tech-review.jpg', title: 'MSI Claw Review', category: 'tech' },
      { src: 'gaming-series-part-1-thumbnail.png', title: 'Gaming Series Pt.1', category: 'gaming' },
      { src: 'cycle-sample-social-thumbnail.jpg', title: 'Cycle Sample', category: 'social' },
      { src: 'roblox-gaming-thumbnail.webp', title: 'Roblox', category: 'gaming' },
      { src: 'claude-ai-fail-tech-thumbnail.jpg', title: 'Claude AI Fail', category: 'tech' },
      { src: 'farlight-84-gaming-thumbnail.png', title: 'Farlight 84', category: 'gaming' },
      { src: 'flat-lay-style-tech-thumbnail.jpg', title: 'Flat Lay Style', category: 'tech' },
      { src: 'qbz-new-skin-gaming-thumbnail.png', title: 'QBZ New Skin', category: 'gaming' },
      { src: 'zero-stash-gaming-thumbnail.png', title: 'Zero Stash', category: 'gaming' },
      { src: 'eternal-qbz-gaming-thumbnail.png', title: 'Eternal QBZ', category: 'gaming' },
      { src: 'new-gun-skin-gaming-thumbnail.jpg', title: 'New Gun Skin', category: 'gaming' },
      { src: 'gun-skin-collection-gaming-thumbnail.png', title: 'Gun Skin Collection', category: 'gaming' },
      { src: 'm1887-skin-gaming-thumbnail.jpg', title: 'M1887 Skin', category: 'gaming' },
      { src: 'kar98-highlight-gaming-thumbnail.png', title: 'Kar98 Highlight', category: 'gaming' },
      { src: 'uzi-special-gaming-thumbnail.jpg', title: 'Uzi Special', category: 'gaming' },
      { src: 'practice-mode-gaming-thumbnail.png', title: 'Practice Mode', category: 'gaming' },
      { src: 'gameplay-capture-gaming-thumbnail.png', title: 'Gameplay Capture', category: 'gaming' },
      { src: 'intel-arc-b580-tech-review.jpg', title: 'Intel Arc B580', category: 'tech' },
      { src: 'keyboard-review-tech-thumbnail.jpg', title: 'Keyboard Review', category: 'tech' },
      { src: 'chromebook-vs-laptop-tech-thumbnail.jpg', title: 'Chromebook vs Laptop', category: 'tech' },
      { src: 'huawei-matebook-14-tech-thumbnail.jpg', title: 'Huawei MateBook 14', category: 'tech' },
      { src: 'speaker-review-tech-thumbnail.jpg', title: 'Speaker Review', category: 'tech' },
      { src: 'product-showcase-tech-thumbnail.jpg', title: 'Product Showcase', category: 'tech' },
      { src: 'flat-design-tech-thumbnail.jpg', title: 'Flat Design', category: 'tech' },
      { src: 'thumbnail-prompt-tech-thumbnail.jpg', title: 'Thumbnail Prompt', category: 'tech' },
      { src: 'worth-every-penny-social-thumbnail.jpg', title: 'Worth Every Penny', category: 'social' },
      { src: 'traveling-gears-social-thumbnail.jpg', title: 'Traveling Gears', category: 'social' },
      { src: 'samcux-sample-social-thumbnail.jpg', title: 'Samcux Sample', category: 'social' },
      { src: 'audio-social-thumbnail.jpg', title: 'Audio Thumbnail', category: 'social' },
      { src: 'client-work-talha-social-thumbnail.jpg', title: 'Client Work — Talha', category: 'social' },
      { src: 'client-redesign-2-social-thumbnail.jpg', title: 'Client Redesign', category: 'social' },
      { src: 'client-work-4-social-thumbnail.jpg', title: 'Client Work 4', category: 'social' },
      { src: 'client-work-5-social-thumbnail.jpg', title: 'Client Work 5', category: 'social' },
      { src: 'client-work-10-social-thumbnail.jpg', title: 'Client Work 10', category: 'social' },
      { src: 'client-work-11-social-thumbnail.jpg', title: 'Client Work 11', category: 'social' },
      { src: 'design-concept-social-thumbnail.png', title: 'Design Concept', category: 'social' },
      { src: 'fresh-design-social-thumbnail.jpg', title: 'Fresh Design', category: 'social' },
      { src: 'glassy-style-social-thumbnail.jpg', title: 'Glassy Style', category: 'social' },

      // Added — newly confirmed files already in the project folder
      { src: 'gaming-moment-thumbnail.png', title: 'Gaming Moment', category: 'gaming' },
      { src: 'talha-project-gaming-thumbnail.png', title: 'Talha Project', category: 'gaming' },
      { src: 'main-thumbnail-gaming.png', title: 'Main Thumbnail', category: 'gaming' },
      { src: 'main-series-4-gaming-thumbnail.png', title: 'Main Series 4', category: 'gaming' },
    ];

    // ─── Reviews Data ───
    const reviewsData = [
      {
        name: 'Billy YT',
        role: 'YouTube Creator',
        stars: 5,
        text: 'Mohammed Anas is incredibly talented with Photoshop thumbnails. Quick bug fixes and lightning-fast response times. My go-to designer for all YouTube thumbnails!'
      },
      {
        name: 'Raza',
        role: 'Eco-friendly Business',
        stars: 5,
        text: 'The nature-inspired dark theme Mohammed Anas created matched our brand essence perfectly. Absolutely stunning work with incredible attention to detail.'
      },
      {
        name: 'Ahmed Khan',
        role: 'YouTube Creator',
        stars: 5,
        text: 'After Mohammed Anas designed our thumbnails, we saw a 45% increase in channel CTR. The designs are eye-catching and professional. Highly recommended!'
      },
      {
        name: 'Ali',
        role: 'YouTube Creator',
        stars: 5,
        text: 'Clean, bold thumbnail designs that made my channel stand out. Mohammed Anas delivered exactly what I needed — professional work with fast turnaround.'
      }
    ];

    // ─── State ───
    let currentCategory = 'all';

    // Safe wrapper around gtag — some visitors block Google Analytics itself
    // (same ad-blocker category that blocked the thumbnails earlier), so this
    // never throws if gtag isn't there.
    function trackEvent(name, params = {}) {
      if (typeof gtag === 'function') {
        gtag('event', name, params);
      }
    }
    let visibleCount = 16;
    let lightboxImages = [];
    let lightboxIndex = 0;
    let currentZoom = 1;
    let panX = 0;
    let panY = 0;

    const DESKTOP_PER_PAGE = 16;
    const MOBILE_PER_PAGE = 10;
    const MOBILE_BREAKPOINT = 768;

    function getPerPage() {
      return window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_PER_PAGE : DESKTOP_PER_PAGE;
    }

    function resetVisibleCount() {
      visibleCount = getPerPage();
    }

    // ─── Mobile-Friendly Virtual History State Overlay Stack ───
    const overlayStack = [];

    function openOverlay(closeCallback) {
      overlayStack.push(closeCallback);
      window.history.pushState({ overlayIndex: overlayStack.length }, "");
    }

    function closeOverlayDirectly(closeCallback) {
      const idx = overlayStack.indexOf(closeCallback);
      if (idx !== -1) {
        overlayStack.splice(idx, 1);
        window.history.back();
        closeCallback(false);
      }
    }

    window.addEventListener('popstate', (event) => {
      if (overlayStack.length > 0) {
        const closeCallback = overlayStack.pop();
        if (closeCallback) {
          closeCallback(false); // Close UI directly, do not navigate back again
        }
      }
    });

    // Close functions for lightbox and modals
    const lightboxCloseCallback = (shouldGoBack) => {
      const lightbox = document.getElementById('lightbox');
      if (lightbox) lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    const modalCloseCallback = (shouldGoBack) => {
      const modal = document.getElementById('contactModal');
      if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
      document.body.style.overflow = '';
    };

    document.addEventListener('DOMContentLoaded', () => {
      // Render immediately with the local thumbnail set — nothing on the page
      // (including the cursor, nav, filters) should ever wait on a network call.
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
      initSeeThumbnails();
      initSocialOrbit();
      initBeforeAfter();

      window.addEventListener('resize', debounce(() => {
        const perPage = getPerPage();
        if (visibleCount < perPage) visibleCount = perPage;
        renderGallery();
      }, 200));

      // Pull in anything uploaded via admin.html — always newest-first.
      // This runs independently in the background; slow or failed networks
      // no longer block the rest of the page from being usable.
      // The ?t= cache-buster forces phones/incognito to always ask the
      // server fresh instead of reusing a stale cached response.
      (async () => {
        try {
          const res = await fetch('/api/thumbnails?t=' + Date.now(), { cache: 'no-store' });
          if (res.ok) {
            const uploaded = await res.json();
            if (Array.isArray(uploaded) && uploaded.length) {
              // Blob storage URLs go through our own /api/image proxy — many
              // ad blockers block *.public.blob.vercel-storage.com wholesale
              // (it's a shared domain some spam projects have abused), which
              // would otherwise silently break thumbnails for real visitors.
              const proxied = uploaded.map(t => {
                const rewrite = (src) => (src && src.includes('.public.blob.vercel-storage.com/'))
                  ? '/api/image?url=' + encodeURIComponent(src)
                  : src;
                return { ...t, src: rewrite(t.src), beforeSrc: rewrite(t.beforeSrc) };
              });

              thumbnailData = [...proxied, ...thumbnailData];

              // Keep the first 5 rows (4 columns × 5 rows = 20) in stable order so
              // recent uploads are never shuffled away from the top. Only the
              // thumbnails after that get randomized, for variety on repeat visits.
              const PINNED_COUNT = 20;
              const pinned = thumbnailData.slice(0, PINNED_COUNT);
              const rest = thumbnailData.slice(PINNED_COUNT);
              for (let i = rest.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [rest[i], rest[j]] = [rest[j], rest[i]];
              }
              thumbnailData = [...pinned, ...rest];

              resetVisibleCount();
              renderGallery();
            }
          }
        } catch (_) { /* offline or not deployed yet — ignore */ }
      })();
    });

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
      }, 260);
    }

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

        // The first couple of rows are visible the instant the page loads —
        // loading them "lazy" (deprioritized, discovery delayed until the
        // browser gets around to it) is the opposite of what a fast grid
        // should do. Only thumbnails actually below the fold get lazy-loaded.
        const isAboveFold = index < 8;
        const loadingAttr = isAboveFold ? 'eager' : 'lazy';
        const priorityAttr = isAboveFold ? 'fetchpriority="high"' : '';

        item.innerHTML = `
              <img src="${thumb.src}" alt="${thumb.title}" loading="${loadingAttr}" ${priorityAttr} decoding="async" />
              <div class="item-overlay">
                <div>
                  <span class="overlay-cat">${thumb.category}</span>
                  <div class="overlay-text">${thumb.title}</div>
                </div>
              </div>
            `;

        // Resilient loading: a failed image (blob storage propagation lag, a
        // burst of simultaneous requests on page load, a network hiccup)
        // should never sit there broken for a visitor or client to see.
        // Retry with increasing backoff — most transient failures clear up
        // within a couple seconds — and only drop the card as a last resort.
        let imgEl = item.querySelector('img');
        const RETRY_DELAYS = [600, 1200, 2200]; // ms — 3 retries before giving up
        let attempt = 0;
        let settled = false;

        function retryOrRemove() {
          if (settled) return;
          if (attempt < RETRY_DELAYS.length) {
            const delay = RETRY_DELAYS[attempt];
            attempt++;
            setTimeout(() => {
              if (settled) return;
              const sep = thumb.src.includes('?') ? '&' : '?';
              imgEl.src = thumb.src + sep + 'retry=' + Date.now();
            }, delay);
          } else {
            settled = true;
            showRetryCard();
          }
        }

        function showRetryCard() {
          item.classList.add('gallery-item-failed');
          item.innerHTML = `
                <button type="button" class="retry-card-btn" aria-label="Retry loading this thumbnail">
                  <span class="retry-icon">↻</span>
                  <span>Tap to retry</span>
                </button>
              `;
          item.querySelector('.retry-card-btn').addEventListener('click', evt => {
            evt.stopPropagation();
            item.classList.remove('gallery-item-failed');
            item.innerHTML = `
                  <img src="${thumb.src}" alt="${thumb.title}" loading="eager" decoding="async" />
                  <div class="item-overlay">
                    <div>
                      <span class="overlay-cat">${thumb.category}</span>
                      <div class="overlay-text">${thumb.title}</div>
                    </div>
                  </div>
                `;
            settled = false;
            attempt = 0;
            imgEl = item.querySelector('img');
            imgEl.addEventListener('load', () => { settled = true; });
            imgEl.addEventListener('error', retryOrRemove);
            setTimeout(() => {
              if (!settled && (!imgEl.complete || imgEl.naturalWidth === 0)) retryOrRemove();
            }, 5000);
          });
        }

        imgEl.addEventListener('load', () => { settled = true; });
        imgEl.addEventListener('error', retryOrRemove);

        // Backstop: a hung request (slow serverless response, a connection
        // that never cleanly fires 'error') would otherwise sit there empty
        // forever, since nothing ever triggers a retry. Force a check.
        setTimeout(() => {
          if (!settled && (!imgEl.complete || imgEl.naturalWidth === 0)) {
            retryOrRemove();
          }
        }, 5000);

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
          trackEvent('portfolio_filter', { category: currentCategory });
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

    function initLightbox() {
      const lightbox = document.getElementById('lightbox');
      if (!lightbox) return;

      const closeBtn = lightbox.querySelector('.lightbox-close');
      const prevBtn = lightbox.querySelector('.lightbox-prev');
      const nextBtn = lightbox.querySelector('.lightbox-next');
      const zoomInBtn = lightbox.querySelector('.zoom-in');
      const zoomOutBtn = lightbox.querySelector('.zoom-out');
      const zoomResetBtn = lightbox.querySelector('.zoom-reset');
      const imgWrap = lightbox.querySelector('.lightbox-img-wrap');
      const img = document.getElementById('lightboxImg');

      closeBtn?.addEventListener('click', closeLightbox);
      prevBtn?.addEventListener('click', () => navigateLightbox(-1));
      nextBtn?.addEventListener('click', () => navigateLightbox(1));
      zoomInBtn?.addEventListener('click', () => zoomLightbox(0.25, 0, 0, true));
      zoomOutBtn?.addEventListener('click', () => zoomLightbox(-0.25, 0, 0, true));
      zoomResetBtn?.addEventListener('click', () => {
        currentZoom = 1; panX = 0; panY = 0;
        applyZoom(true);
      });

      lightbox.addEventListener('click', e => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-img-wrap')) {
          closeLightbox();
        }
      });

      document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && currentZoom <= 1.01) navigateLightbox(-1);
        if (e.key === 'ArrowRight' && currentZoom <= 1.01) navigateLightbox(1);
        if (e.key === '+' || e.key === '=') zoomLightbox(0.25, 0, 0, true);
        if (e.key === '-') zoomLightbox(-0.25, 0, 0, true);
      });

      // Wheel zoom, Photoshop-style: zooms toward the cursor position instead
      // of always snapping back to dead center.
      let wheelRect = null;
      imgWrap?.addEventListener('mouseenter', () => { wheelRect = imgWrap.getBoundingClientRect(); });
      window.addEventListener('resize', () => { wheelRect = null; });
      imgWrap?.addEventListener('wheel', e => {
        e.preventDefault();
        const rect = wheelRect || (wheelRect = imgWrap.getBoundingClientRect());
        const cx = e.clientX - (rect.left + rect.width / 2);
        const cy = e.clientY - (rect.top + rect.height / 2);
        zoomLightbox(e.deltaY > 0 ? -0.15 : 0.15, cx, cy, false);
      }, { passive: false });

      // ── Drag-to-pan (mouse + single-finger touch, via Pointer Events) ──
      let isDragging = false;
      let dragStartX = 0, dragStartY = 0;
      let panStartX = 0, panStartY = 0;
      let pendingPan = null;
      let panRafId = null;

      function writePan() {
        panRafId = null;
        if (!pendingPan) return;
        panX = pendingPan.x;
        panY = pendingPan.y;
        pendingPan = null;
        if (img) img.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${currentZoom})`;
      }

      function queuePan(x, y) {
        pendingPan = { x, y };
        if (!panRafId) panRafId = requestAnimationFrame(writePan);
      }

      img?.addEventListener('pointerdown', e => {
        if (currentZoom <= 1.01) return; // nothing to pan when not zoomed in
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        panStartX = panX;
        panStartY = panY;
        imgWrap.classList.add('dragging');
        img.setPointerCapture?.(e.pointerId);
      });

      img?.addEventListener('pointermove', e => {
        if (!isDragging) return;
        const { maxX, maxY } = computeMaxPan(img);
        const nx = Math.max(-maxX, Math.min(maxX, panStartX + (e.clientX - dragStartX)));
        const ny = Math.max(-maxY, Math.min(maxY, panStartY + (e.clientY - dragStartY)));
        queuePan(nx, ny);
      });

      const endDrag = () => { isDragging = false; imgWrap?.classList.remove('dragging'); };
      img?.addEventListener('pointerup', endDrag);
      img?.addEventListener('pointercancel', endDrag);

      // ── Pinch-to-zoom (two-finger touch) ──
      let pinchStartDist = 0;
      let pinchStartZoom = 1;
      const touchDist = (touches) => Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY
      );

      imgWrap?.addEventListener('touchstart', e => {
        if (e.touches.length === 2) {
          isDragging = false; // hand off from single-finger pan to pinch
          pinchStartDist = touchDist(e.touches);
          pinchStartZoom = currentZoom;
        } else if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
        }
      }, { passive: true });

      imgWrap?.addEventListener('touchmove', e => {
        if (e.touches.length === 2) {
          e.preventDefault();
          const ratio = touchDist(e.touches) / pinchStartDist;
          currentZoom = Math.min(Math.max(pinchStartZoom * ratio, 0.5), 4);
          clampPan();
          applyZoom(false);
        }
      }, { passive: false });

      // Touch swipe to navigate — only when not zoomed in (otherwise a swipe
      // should pan the image instead of changing images).
      let touchStartX = 0;
      imgWrap?.addEventListener('touchend', e => {
        if (currentZoom > 1.01 || e.changedTouches.length !== 1) return;
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) navigateLightbox(diff > 0 ? 1 : -1);
      }, { passive: true });
    }

    function computeMaxPan(img) {
      if (!img) return { maxX: 0, maxY: 0 };
      // offsetWidth/Height reflect the image's un-transformed layout size
      // (CSS transforms don't affect these), so this is the image's
      // already-fitted size at zoom 1 — scaling that tells us exactly how
      // far the image can pan before its edge would clear the frame.
      const maxX = Math.max(0, (img.offsetWidth * currentZoom - img.offsetWidth) / 2);
      const maxY = Math.max(0, (img.offsetHeight * currentZoom - img.offsetHeight) / 2);
      return { maxX, maxY };
    }

    function clampPan() {
      const img = document.getElementById('lightboxImg');
      const { maxX, maxY } = computeMaxPan(img);
      panX = Math.max(-maxX, Math.min(maxX, panX));
      panY = Math.max(-maxY, Math.min(maxY, panY));
    }

    function openLightbox(index) {
      const lightbox = document.getElementById('lightbox');
      if (!lightbox || !lightboxImages.length) return;
      lightboxIndex = index;
      currentZoom = 1;
      panX = 0;
      panY = 0;
      updateLightboxImage();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Register with the history stack overlay manager
      openOverlay(lightboxCloseCallback);
    }

    function closeLightbox() {
      closeOverlayDirectly(lightboxCloseCallback);
    }

    function navigateLightbox(dir) {
      lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
      currentZoom = 1;
      panX = 0;
      panY = 0;
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
      applyZoom(false);
    }

    // zoomLightbox(delta, cx, cy, smooth) — cx/cy are the zoom-focus point in
    // pixels relative to the image's own center (0,0 = dead center). Passing
    // the cursor's offset from center there is what makes zooming feel like
    // Photoshop: the point under the cursor stays put instead of the whole
    // image snapping back to center on every scroll.
    function zoomLightbox(delta, cx = 0, cy = 0, smooth = true) {
      const oldZoom = currentZoom;
      const newZoom = Math.min(Math.max(currentZoom + delta, 0.5), 4);
      if (newZoom === oldZoom) return;

      const ratio = newZoom / oldZoom;
      panX = cx - (cx - panX) * ratio;
      panY = cy - (cy - panY) * ratio;
      currentZoom = newZoom;
      clampPan();
      applyZoom(smooth);
    }

    function applyZoom(smooth) {
      const img = document.getElementById('lightboxImg');
      const imgWrap = document.querySelector('.lightbox-img-wrap');
      const zoomLevel = document.getElementById('zoomLevel');
      if (img) {
        imgWrap?.classList.toggle('zoomed', currentZoom > 1.01);
        img.classList.toggle('smooth-zoom', !!smooth);
        img.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${currentZoom})`;
      }
      if (zoomLevel) zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
    }

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
        trackEvent('review_submit', { stars });

        form.reset();
        document.querySelectorAll('.star-rating-input .star').forEach(s => s.classList.remove('active'));
        renderReviews();
        showToast('Thank you for your review!', 'success');
      });
    }

    function initContactModal() {
      const modal = document.getElementById('contactModal');
      if (!modal) return;

      const backdrop = modal.querySelector('.contact-modal-backdrop');
      const closeBtn = modal.querySelector('.contact-modal-close');
      const form = document.getElementById('modalContactForm');

      // Enhanced modal opening logic to support package auto-selection and glowing attention
      const open = (prefillSubject = '', prefillPackage = '') => {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (prefillSubject) {
          const subject = document.getElementById('modalContactSubject');
          if (subject) subject.value = prefillSubject;
        }

        const serviceSelect = document.getElementById('modalContactService');
        if (prefillPackage) {
          if (serviceSelect) {
            serviceSelect.value = prefillPackage;
          }
        } else {
          // Reset select box if opened standardly
          if (serviceSelect) {
            serviceSelect.selectedIndex = 0;
          }
        }

        setTimeout(() => document.getElementById('modalContactName')?.focus(), 300);

        // Register overlay closure callback with state manager
        openOverlay(modalCloseCallback);
      };

      const close = () => {
        closeOverlayDirectly(modalCloseCallback);
      };

      document.querySelectorAll('.open-contact-modal').forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          trackEvent('contact_modal_open', { link_text: btn.textContent.trim() });
          open('', '');
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
          const service = document.getElementById('modalContactService')?.value;
          const subject = document.getElementById('modalContactSubject')?.value.trim();
          const message = document.getElementById('modalContactMessage')?.value.trim();

          if (!name || !email || !service || !subject || !message) {
            showToast('Please fill in all fields', 'error');
            return;
          }

          sendContactEmail({ name, email, service, subject, message });
          form.reset();
          close();
        });
      }

      window.openContactModal = open;
    }

    function sendContactEmail({ name, email, service, subject, message }) {
      const packageLabel = getServiceLabel(service);
      trackEvent('contact_form_submit', {
        service_package: service || 'unspecified',
        service_label: packageLabel,
      });
      const bodyText = `Name: ${name}\nEmail: ${email}\nSelected Package/Budget: ${packageLabel}\n\nMessage:\n${message}`;
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

    function getServiceLabel(val) {
      switch(val) {
        case 'single': return 'Single Custom Thumbnail ($15)';
        case 'bulk-5': return 'Bulk Pack of 5 ($65)';
        case 'bulk-10': return 'Bulk Pack of 10 ($120)';
        case 'custom': return 'Long-term Creator Partnership';
        default: return 'General Request / Unspecified';
      }
    }

    function initSocialOrbit() {
      const stage = document.getElementById('orbitStage');
      const track = document.getElementById('orbitTrack');
      if (!stage) return;

      const icons = Array.from(stage.querySelectorAll('.orbit-icon'));
      if (!icons.length) return;

      const COUNT = icons.length;
      const STEP_DEG = 360 / COUNT;
      const MIN_SCALE = 0.55, MAX_SCALE = 1.18;
      const SCALE_MID = (MAX_SCALE + MIN_SCALE) / 2;
      const SCALE_AMP = (MAX_SCALE - MIN_SCALE) / 2;
      const MIN_OPACITY = 0.82, MAX_OPACITY = 1;
      const OPACITY_MID = (MAX_OPACITY + MIN_OPACITY) / 2;
      const OPACITY_AMP = (MAX_OPACITY - MIN_OPACITY) / 2;
      const DRAG_SENSITIVITY = 0.32; // degrees rotated per pixel of drag
      const CLICK_THRESHOLD = 6; // px of movement before a press counts as a drag, not a click
      const FRICTION = 0.975; // momentum decay per ~16.7ms frame — higher = longer glide
      const MOMENTUM_MIN = 0.002; // deg/ms — below this, momentum is considered settled
      const MOMENTUM_CAP = 0.65; // deg/ms — caps an unrealistically fast flick
      const VELOCITY_WINDOW_MS = 100; // how far back we look to read release speed
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const AUTO_SPEED = reduceMotion ? 0 : 0.0055; // deg/ms ambient drift (~5deg/s, full loop ~65s)

      let centerX = 0, centerY = 0, radiusX = 0, radiusY = 0, iconBase = 60;
      let baseAngle = 0;
      let momentumVelocity = 0;
      let isDragging = false, dragStartX = 0, dragStartAngle = 0, lastX = 0, dragDistance = 0;
      let moveSamples = [];
      let justDragged = false;
      let keyboardFocused = false;
      let rafId = null, lastFrameTime = 0;
      let sectionVisible = true;

      function measure() {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        centerX = w / 2;
        centerY = h / 2;

        iconBase = Math.max(40, Math.min(88, h * 0.30));
        const maxIconHalf = (iconBase * MAX_SCALE) / 2; // largest icon sits at the front (top/bottom axis)
        const midIconHalf = (iconBase * SCALE_MID) / 2;  // side icons sit at mid-scale (left/right axis)

        // Radius is derived FROM the icon's own footprint, so the largest icon
        // is mathematically guaranteed to stay inside the stage at any breakpoint.
        radiusY = Math.max(0, (h / 2) - maxIconHalf) * 0.94;
        radiusX = Math.max(0, (w / 2) - midIconHalf) * 0.96;

        if (track) {
          track.style.width = (radiusX * 2) + 'px';
          track.style.height = (radiusY * 2) + 'px';
          track.style.left = centerX + 'px';
          track.style.top = centerY + 'px';
          track.style.transform = 'translate(-50%, -50%)';
        }
      }

      function render() {
        const rad = baseAngle * Math.PI / 180;
        for (let i = 0; i < COUNT; i++) {
          const theta = rad + (i * STEP_DEG * Math.PI / 180);
          const cosT = Math.cos(theta);
          const sinT = Math.sin(theta);
          const x = centerX + radiusX * sinT;
          const y = centerY + radiusY * cosT;
          const scale = SCALE_MID + SCALE_AMP * cosT;
          const size = iconBase * scale;

          const el = icons[i];
          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          el.style.width = size + 'px';
          el.style.height = size + 'px';
          el.style.fontSize = Math.round(size * 0.42) + 'px';
          el.style.opacity = OPACITY_MID + OPACITY_AMP * cosT;
          el.style.zIndex = Math.round(500 + 500 * cosT);
        }
      }

      function tick(now) {
        const dt = lastFrameTime ? Math.min(48, now - lastFrameTime) : 16;
        lastFrameTime = now;

        if (!isDragging && !keyboardFocused) {
          if (Math.abs(momentumVelocity) > MOMENTUM_MIN) {
            baseAngle += momentumVelocity * dt;
            momentumVelocity *= Math.pow(FRICTION, dt / 16.67);
          } else if (!document.body.classList.contains('menu-open')) {
            momentumVelocity = 0;
            baseAngle -= AUTO_SPEED * dt;
          }
        }

        render();
        rafId = sectionVisible ? requestAnimationFrame(tick) : null;
      }

      function startLoop() {
        if (rafId == null) {
          lastFrameTime = 0;
          rafId = requestAnimationFrame(tick);
        }
      }

      function onPointerDown(e) {
        if (e.button !== undefined && e.button !== 0) return;
        isDragging = true;
        dragDistance = 0;
        justDragged = false;
        dragStartX = e.clientX;
        lastX = e.clientX;
        dragStartAngle = baseAngle;
        momentumVelocity = 0;
        moveSamples = [{ t: performance.now(), x: e.clientX }];
        stage.classList.add('dragging');
        // Track on window (not via setPointerCapture) so movement is caught even if the
        // pointer leaves the stage mid-drag, while leaving native click targeting untouched.
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
      }

      function onPointerMove(e) {
        if (!isDragging) return;
        const now = performance.now();
        baseAngle = dragStartAngle + (e.clientX - dragStartX) * DRAG_SENSITIVITY;
        dragDistance += Math.abs(e.clientX - lastX);
        lastX = e.clientX;

        moveSamples.push({ t: now, x: e.clientX });
        while (moveSamples.length > 2 && now - moveSamples[0].t > VELOCITY_WINDOW_MS) {
          moveSamples.shift();
        }
      }

      function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;
        stage.classList.remove('dragging');
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
        if (dragDistance > CLICK_THRESHOLD) justDragged = true;

        // Read speed from the last ~100ms of motion, not just the final frame — this is what
        // makes a real flick (drag, then speed up right as you let go) carry through correctly.
        if (moveSamples.length >= 2) {
          const first = moveSamples[0];
          const last = moveSamples[moveSamples.length - 1];
          const dt = Math.max(1, last.t - first.t);
          const dx = last.x - first.x;
          momentumVelocity = Math.max(-MOMENTUM_CAP, Math.min(MOMENTUM_CAP, (dx * DRAG_SENSITIVITY) / dt));
        } else {
          momentumVelocity = 0;
        }
      }

      stage.addEventListener('pointerdown', onPointerDown);
      stage.addEventListener('dragstart', e => e.preventDefault());

      stage.addEventListener('click', e => {
        if (justDragged) {
          e.preventDefault();
          justDragged = false;
        }
      });

      stage.addEventListener('focusin', () => { keyboardFocused = true; });
      stage.addEventListener('focusout', () => { keyboardFocused = false; });

      window.addEventListener('resize', debounce(measure, 200));

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            sectionVisible = entry.isIntersecting;
            if (sectionVisible) {
              measure(); // re-measure in case content-visibility:auto kept this at 0 until now
              startLoop();
            }
          });
        }, { threshold: 0.01 });
        io.observe(stage);
      }

      measure();
      stage.classList.add('orbit-ready');
      render();
      requestAnimationFrame(() => { if (track) track.classList.add('orbit-track-visible'); });
      startLoop();
    }

    function initBeforeAfter() {
      const card = document.getElementById('baCard');
      const handle = document.getElementById('baHandle');
      const beforeLayer = document.getElementById('baBefore');
      if (!card || !handle || !beforeLayer) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion;

      let pos = 50;
      let isDragging = false;
      let cachedRect = null;
      let pendingPos = null;
      let posRafId = null;
      let pendingTilt = null;
      let tiltRafId = null;

      function writePos() {
        posRafId = null;
        if (pendingPos == null) return;
        pos = pendingPos;
        pendingPos = null;
        card.style.setProperty('--ba-pos', pos + '%');
        handle.setAttribute('aria-valuenow', String(Math.round(pos)));
      }

      function setPos(p) {
        pendingPos = Math.max(0, Math.min(100, p));
        if (!posRafId) posRafId = requestAnimationFrame(writePos);
      }

      // setPosImmediate skips the rAF batch — used for keyboard nav and initial paint,
      // where there's no rapid-fire event stream to throttle.
      function setPosImmediate(p) {
        pos = Math.max(0, Math.min(100, p));
        card.style.setProperty('--ba-pos', pos + '%');
        handle.setAttribute('aria-valuenow', String(Math.round(pos)));
      }

      function posFromClientX(clientX) {
        const rect = cachedRect || card.getBoundingClientRect();
        return ((clientX - rect.left) / rect.width) * 100;
      }

      let hasTrackedDrag = false;
      function onPointerDown(e) {
        if (e.button !== undefined && e.button !== 0) return;
        isDragging = true;
        cachedRect = card.getBoundingClientRect(); // measure once per drag, not per move
        card.classList.add('ba-dragging');
        card.classList.remove('ba-tilt-resetting');
        card.style.transform = ''; // flatten immediately — keeps drag math undistorted by any tilt
        setPosImmediate(posFromClientX(e.clientX));
        if (!hasTrackedDrag) { hasTrackedDrag = true; trackEvent('before_after_engage'); }
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
      }

      function onPointerMove(e) {
        if (!isDragging) return;
        setPos(posFromClientX(e.clientX));
      }

      function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;
        cachedRect = null;
        card.classList.remove('ba-dragging');
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
      }

      card.addEventListener('pointerdown', onPointerDown);
      card.addEventListener('dragstart', e => e.preventDefault());

      handle.addEventListener('keydown', e => {
        const step = e.shiftKey ? 12 : 5;
        if (e.key === 'ArrowLeft') { setPosImmediate(pos - step); e.preventDefault(); }
        else if (e.key === 'ArrowRight') { setPosImmediate(pos + step); e.preventDefault(); }
        else if (e.key === 'Home') { setPosImmediate(0); e.preventDefault(); }
        else if (e.key === 'End') { setPosImmediate(100); e.preventDefault(); }
      });

      function writeTilt() {
        tiltRafId = null;
        if (!pendingTilt) return;
        const { rotateX, rotateY } = pendingTilt;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      if (canTilt) {
        let tiltRect = null;
        card.addEventListener('mouseenter', () => { tiltRect = card.getBoundingClientRect(); });
        card.addEventListener('mousemove', e => {
          if (isDragging) return;
          card.classList.remove('ba-tilt-resetting');
          const rect = tiltRect || (tiltRect = card.getBoundingClientRect());
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          pendingTilt = {
            rotateY: (px - 0.5) * 14, // deg
            rotateX: (0.5 - py) * 10, // deg
          };
          if (!tiltRafId) tiltRafId = requestAnimationFrame(writeTilt);
        });
        card.addEventListener('mouseleave', () => {
          tiltRect = null;
          card.classList.add('ba-tilt-resetting');
          card.style.transform = '';
        });
      }

      setPosImmediate(50);

      // One-time nudge shortly after load, hinting that the handle is draggable
      if (!reduceMotion) {
        setTimeout(() => {
          if (isDragging) return;
          setPosImmediate(58);
          setTimeout(() => { if (!isDragging) setPosImmediate(50); }, 550);
        }, 1400);
      }
    }

    function initContactForm() {
      const form = document.getElementById('contactForm');
      if (!form) return;

      form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value.trim();
        const email = document.getElementById('contactEmail')?.value.trim();
        const service = document.getElementById('contactService')?.value;
        const subject = document.getElementById('contactSubject')?.value.trim();
        const message = document.getElementById('contactMessage')?.value.trim();

        if (!name || !email || !service || !subject || !message) { showToast('Please fill in all fields', 'error'); return; }

        sendContactEmail({ name, email, service, subject, message });
        form.reset();
      });
    }

    window.copyEmail = function (text, btn) {
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied';
        setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = orig; }, 2000);
      }).catch(() => showToast('Failed to copy', 'error'));
    };

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

// ─── Disqus Thread Deferred Script Loading ───
    var disqus_shortname = 'thumbnailportfolio';
    window.DISQUS_PUBLIC_API_KEY = window.DISQUS_PUBLIC_API_KEY || 'VrPcBUfszCtJbD3t5qctKcZ4XT9LQYUCTagFhRA5D1jdw6XEFwRLDKTVxEsYqWJp';

    var disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = window.location.pathname;
      this.page.title = document.title;
      this.callbacks = this.callbacks || {};
      this.callbacks.onReady = [function () {
        try {
          var dl = document.getElementById('disqus-loading');
          var dt = document.getElementById('disqus_thread');
          if (dl) dl.style.display = 'none';
          if (dt) dt.style.display = 'block';
        } catch (_) { }
      }];
      this.callbacks.onNewComment = [function (comment) {
        try {
          var isReply = !!comment.parent;
          var message = isReply ? 'Someone replied to a comment!' : 'New comment posted!';
          if (window.commentNotifications && typeof window.commentNotifications.showNotification === 'function') {
            window.commentNotifications.showNotification(message, isReply ? 'reply' : 'comment');
          } else if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Comments', { body: message, icon: 'digital-jungle-logo.png' });
          }
        } catch (_) { }
      }];
    };

    function loadDisqus() {
      var dt = document.getElementById('disqus_thread');
      var dl = document.getElementById('disqus-loading');
      var df = document.getElementById('disqus-fallback');
      if (!dt || !dl || !df) return;

      dl.style.display = 'flex';
      df.style.display = 'none';
      dt.style.display = 'none';

      try {
        if (window.DISQUS) {
          window.DISQUS.reset({
            reload: true, config: function () {
              this.page.url = window.location.href;
              this.page.identifier = window.location.pathname;
              this.page.title = document.title;
            }
          });
          dl.style.display = 'none';
          dt.style.display = 'block';
          return;
        }

        var existing = document.getElementById('dsq-embed-s');
        if (existing && existing.parentElement) existing.parentElement.removeChild(existing);

        var s = document.createElement('script');
        s.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
        s.id = 'dsq-embed-s';
        s.setAttribute('data-timestamp', +new Date());
        s.async = true;
        s.onload = function () { dl.style.display = 'none'; dt.style.display = 'block'; toggleCommentActions(true); };
        s.onerror = function () { dl.style.display = 'none'; df.style.display = 'block'; toggleCommentActions(false); };
        (document.head || document.body).appendChild(s);

        setTimeout(function () {
          if (dl.style.display !== 'none') { dl.style.display = 'none'; df.style.display = 'block'; toggleCommentActions(false); }
        }, 8000);
      } catch (e) { dl.style.display = 'none'; df.style.display = 'block'; toggleCommentActions(false); }
    }

    function toggleCommentActions(show) {
      var actions = document.querySelector('.comment-actions');
      if (actions) actions.style.display = show ? '' : 'none';
    }

    document.addEventListener('DOMContentLoaded', function () { setTimeout(loadDisqus, 1000); });
    window.addEventListener('load', function () {
      var dl = document.getElementById('disqus-loading');
      if (dl && dl.style.display !== 'none') loadDisqus();
    });

// ─── Comment Notification System ───
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').then(function (reg) {
        navigator.serviceWorker.addEventListener('message', function (e) {
          try {
            if (e && e.data && e.data.type === 'navigate' && e.data.url) {
              location.href = e.data.url;
              var section = document.getElementById('comments');
              if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } catch (_) { }
        });
      }).catch(function () { });
    }

    class CommentNotificationSystem {
      constructor() { this.lastKnownPostId = null; this.init(); }
      init() {
        this.createNotificationContainer();
        this.setupNotificationPermissionUI();
        this.setupManualButton();
        this.listenForDisqusEvents();
        this.startReplyChecking();
        this.startPollingForRemoteComments();
      }
      createNotificationContainer() {
        if (!document.getElementById('comment-notifications')) {
          var c = document.createElement('div');
          c.id = 'comment-notifications';
          c.className = 'comment-notifications';
          c.style.display = 'none';
          document.body.appendChild(c);
        }
      }
      getNotificationPermissionStatus() {
        if (!('Notification' in window)) return 'unsupported';
        return Notification.permission;
      }
      setupNotificationPermissionUI() {
        var btn = document.getElementById('enableCommentNotifications');
        var status = document.getElementById('notificationStatus');
        if (!btn || !status) return;
        var self = this;
        var update = function () {
          var perm = self.getNotificationPermissionStatus();
          if (perm === 'granted') { btn.disabled = true; btn.innerHTML = '<i class="fas fa-bell"></i> Enabled'; status.textContent = 'Notifications active.'; }
          else if (perm === 'denied') { btn.disabled = true; btn.innerHTML = '<i class="fas fa-bell-slash"></i> Blocked'; status.textContent = 'Enable from site settings.'; }
          else if (perm === 'unsupported') { btn.disabled = true; btn.innerHTML = '<i class="fas fa-bell-slash"></i> N/A'; status.textContent = ''; }
          else { btn.disabled = false; btn.innerHTML = '<i class="fas fa-bell"></i> Enable Notifications'; status.textContent = 'Click to enable.'; }
        };
        update();
        window.addEventListener('focus', update);
        document.addEventListener('visibilitychange', update);
        btn.addEventListener('click', async function () {
          if (!('Notification' in window)) return;
          try { var r = await Notification.requestPermission(); update(); if (r === 'granted') self.showNotification('Notifications enabled.', 'comment'); } catch (_) { update(); }
        });
      }
      setupManualButton() {
        var self = this;
        var b = document.getElementById('checkNewCommentsNow');
        if (b) b.addEventListener('click', function () { self.pollDisqusOnce && self.pollDisqusOnce(); });
      }
      listenForDisqusEvents() {
        var self = this;
        window.addEventListener('message', function (e) {
          var ok = typeof e.origin === 'string' && (e.origin.includes('disqus.com') || e.origin.includes('disquscdn.com'));
          if (!ok) return;
          var d = e.data || {};
          if (d.type === 'comment' || d.type === 'reply' || (typeof d === 'string' && /comment|reply/i.test(d))) {
            self.handleNewComment({ type: /reply/i.test(d?.type || d) ? 'reply' : 'comment' });
          }
        });
        var dt = document.getElementById('disqus_thread');
        if (dt) {
          new MutationObserver(function (m) { m.forEach(function (mu) { if (mu.type === 'childList') setTimeout(function () { self.checkForNewReplies(); }, 1000); }); }).observe(dt, { childList: true, subtree: true });
        }
      }
      startPollingForRemoteComments() {
        try {
          var key = window.DISQUS_PUBLIC_API_KEY || ''; if (!key) return;
          var forum = window.disqus_shortname || 'thumbnailportfolio';
          var ident = window.location.pathname;
          var self = this;
          var doPoll = function () {
            var cb = '__dsq_cb_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
            var url = 'https://disqus.com/api/3.0/threads/listPosts.json?forum=' + encodeURIComponent(forum) + '&thread:ident=' + encodeURIComponent(ident) + '&order=desc&limit=1&api_key=' + encodeURIComponent(key) + '&callback=' + cb;
            var s = document.createElement('script'); s.src = url; s.async = true;
            window[cb] = function (res) {
              try {
                var posts = res && res.response ? res.response : [];
                if (posts.length > 0) {
                  var id = posts[0].id || null;
                  if (!self.lastKnownPostId) self.lastKnownPostId = id;
                  else if (id && id !== self.lastKnownPostId) { self.lastKnownPostId = id; var isR = !!posts[0].parent; self.showNotification(isR ? 'New reply!' : 'New comment!', isR ? 'reply' : 'comment'); }
                }
              } catch (_) { } finally { try { delete window[cb]; } catch (_) { } if (s && s.parentNode) s.parentNode.removeChild(s); }
            };
            document.body.appendChild(s);
          };
          this.pollDisqusOnce = doPoll;
          setTimeout(doPoll, 5000);
          setInterval(doPoll, 20000);
        } catch (_) { }
      }
      handleNewComment(data) {
        try { if (document.visibilityState === 'visible' && document.hasFocus()) return; } catch (_) { }
        this.showNotification(data.type === 'reply' ? 'Someone replied!' : 'New comment!', data.type);
      }
      checkForNewReplies() {
        var dt = document.getElementById('disqus_thread'); if (!dt) return;
        var self = this;
        dt.querySelectorAll('.dsq-comment:not(.notified)').forEach(function (c) {
          c.classList.add('notified');
          var p = c.closest('.dsq-comment');
          self.showNotification(p && p !== c ? 'New reply!' : 'New comment!', p && p !== c ? 'reply' : 'comment');
        });
      }
      async showNotification(msg, type) {
        var k = type + ':' + msg; var now = Date.now();
        if (this._lastKey === k && now - (this._lastAt || 0) < 6000) return;
        this._lastKey = k; this._lastAt = now;
        if (await this.tryShowNative(msg)) return;
        this.indicateInNav();
        try { navigator.vibrate && navigator.vibrate(150); } catch (_) { }
      }
      async tryShowNative(msg) {
        try {
          if (!('Notification' in window) || Notification.permission !== 'granted') return false;
          var reg = await (navigator.serviceWorker && navigator.serviceWorker.getRegistration());
          var opts = { body: msg, icon: 'digital-jungle-logo.png', tag: 'disqus-comment', renotify: true, data: { url: location.origin + location.pathname + '#comments' } };
          if (reg && reg.showNotification) { await reg.showNotification('Comments', opts); return true; }
          new Notification('Comments', { body: msg, icon: 'digital-jungle-logo.png' }); return true;
        } catch (_) { return false; }
      }
      indicateInNav() {
        try {
          var link = document.querySelector('.nav-links a[href="#comments"]'); if (!link || link.querySelector('.comment-dot')) return;
          var dot = document.createElement('span'); dot.className = 'comment-dot'; link.appendChild(dot);
          setTimeout(function () { if (dot && dot.parentElement) dot.parentElement.removeChild(dot); }, 8000);
        } catch (_) { }
      }
      startReplyChecking() { var self = this; setInterval(function () { self.checkForNewReplies(); }, 30000); }
    }

    document.addEventListener('DOMContentLoaded', function () { setTimeout(function () { window.commentNotifications = new CommentNotificationSystem(); }, 3000); });
    setTimeout(function () { if (!window.commentNotifications) window.commentNotifications = new CommentNotificationSystem(); }, 8000);
