// Thumbnail arrays organized by category
let gamingThumbnails = [
    "part 1 thumbnail 2.png",
    "new 1.jpg",
    "practice copy_compressed.png",
    "talha copy_compressed.jpg",
    "m1887 skin copy.jpg",
    "kar981 copy.png",
    "enternal QBZ copy_compressed.png",
    "QBZ new copy_compressed.png",
    "ZERO STASH 1_compressed.png",
    "new 10 copy_compressed.png",
    "FARLIGHT copy_compressed.png",
    "hahahahahaha.png",
    "new gun 2 copy.jpg",
    "uzi copy.jpg",
    "talha.png",
    "Untitled-1.png",

    "vlcsnap-2025-02-07-22h28m37s077 copy.png",
    "main1.png",
    "first .png",
    "new2.png",
    "main4 copy.png",
    
];

// Social Media Thumbnails - Add your social thumbnails here
let socialThumbnails = [
    // Example format - add your social media thumbnail filenames here:
    // "social1.png",
    // "social2.jpg",
    "Worth Every Penny.jpg",
    "shoes.jpg",
    "GMKtec NucBox K15.jpg",
    "Traveling Gears copy.jpg",
    "new one audio-Recovered copy.jpg",
    "new client 10 copy.jpg",
    "claude fail copy.jpg",
    "thumbnail prompt copy.jpg",
    "comeback copy.jpg",
    "Untitled-galssy copy.jpg",
    "client 7 copy.jpg",
    "new client.jpg",
    
];

// Tech Thumbnails - Add your tech thumbnails here
let techThumbnails = [
    // Example format - add your tech thumbnail filenames here:
    // "tech1.png",
    // "tech2.jpg",
    "Intel - Arc B580.jpg",
    "flat one copy.jpg",
    "flat lay style copy.jpg",
    "Keyboard.jpg",
    "speaker.jpg",
    "MSI Claw 8.jpg",
    "Cycle sample  1022 copy.jpg",
    "Samcux sample 1321 copy.jpg",
    "client 2.jpg",
    "new client 5 copy.jpg",
    "huawei matebook 14 copy.jpg",
    "chromebook vs laptop copy.jpg",
    "new client 2 copy.jpg",
    "new client 4 copy.jpg",
    "new client 11 22 copy.jpg",
];

// Function to mix arrays in round-robin fashion (gaming, tech, social, gaming, tech, social...)
function mixThumbnails() {
    const mixed = [];
    const maxLength = Math.max(
        gamingThumbnails.length,
        socialThumbnails.length,
        techThumbnails.length
    );
    
    for (let i = 0; i < maxLength; i++) {
        // Add gaming thumbnail if available
        if (i < gamingThumbnails.length) {
            mixed.push(gamingThumbnails[i]);
        }
        // Add tech thumbnail if available
        if (i < techThumbnails.length) {
            mixed.push(techThumbnails[i]);
        }
        // Add social thumbnail if available
        if (i < socialThumbnails.length) {
            mixed.push(socialThumbnails[i]);
        }
    }
    
    return mixed;
}

// All Thumbnails - Mix of all categories (gaming, tech, social rotation)
let allThumbnails = mixThumbnails();

let currentThumbnailsDisplayed = {
    all: 0,
    gaming: 0,
    social: 0,
    tech: 0
};
let currentLightboxCategory = 'all';
let thumbnailGridInteractionsBound = false;
let thumbHoldTimer = null;
let thumbHoldItem = null;

const THUMBNAIL_GRID_IDS = {
    all: 'allGrid',
    gaming: 'gamingGrid',
    social: 'socialGrid',
    tech: 'techGrid'
};

function getThumbnailListForCategory(category) {
    const lists = {
        all: allThumbnails,
        gaming: gamingThumbnails,
        social: socialThumbnails,
        tech: techThumbnails
    };
    return lists[category] || [];
}

const MOBILE_THUMBNAILS_PER_PAGE = window.MOBILE_THUMBNAILS_PER_PAGE || 15;

function getViewportWidth() {
    return Math.round(window.visualViewport?.width || window.innerWidth || document.documentElement.clientWidth);
}

function isSingleColumnThumbnailLayout() {
    return window.matchMedia('(max-width: 768px)').matches
        || window.matchMedia('(hover: none) and (pointer: coarse)').matches
        || getViewportWidth() <= 768;
}

function getThumbnailGridLayout() {
    if (isSingleColumnThumbnailLayout()) {
        return { cols: 1, rows: MOBILE_THUMBNAILS_PER_PAGE };
    }
    const width = getViewportWidth();
    if (width <= 1023) return { cols: 2, rows: 2 };
    if (width <= 1399) return { cols: 3, rows: 3 };
    return { cols: 4, rows: 4 };
}

function getThumbnailsPerPage() {
    if (isSingleColumnThumbnailLayout()) {
        return MOBILE_THUMBNAILS_PER_PAGE;
    }
    const { cols, rows } = getThumbnailGridLayout();
    return cols * rows;
}

function preloadThumbnail(src) {
    if (!src) return;
    const existing = document.querySelector(`link[rel="preload"][as="image"][href="${CSS.escape(src)}"]`);
    if (existing) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
}

function preloadThumbnailBatch(sources) {
    sources.filter(Boolean).forEach(preloadThumbnail);
}

let dominantColorQueue = [];
let dominantColorQueueActive = false;

function scheduleDominantColor(img, item) {
    dominantColorQueue.push({ img, item });
    if (!dominantColorQueueActive) {
        processDominantColorQueue();
    }
}

function processDominantColorQueue() {
    if (!dominantColorQueue.length) {
        dominantColorQueueActive = false;
        return;
    }
    dominantColorQueueActive = true;
    const run = () => {
        const next = dominantColorQueue.shift();
        if (!next) {
            dominantColorQueueActive = false;
            return;
        }
        try {
            const { hex, rgb } = extractDominantColor(next.img);
            if (hex && rgb) {
                next.item.style.setProperty('--glow', hex);
                next.item.style.setProperty('--glow-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
            }
        } catch (_) {}
        if ('requestIdleCallback' in window) {
            requestIdleCallback(run, { timeout: 2000 });
        } else {
            setTimeout(run, 16);
        }
    };
    if ('requestIdleCallback' in window) {
        requestIdleCallback(run, { timeout: 2500 });
    } else {
        setTimeout(run, 120);
    }
}

function markThumbnailLoaded(img, item) {
    if (img.classList.contains('is-loaded')) return;
    const imageWrap = item.querySelector('.thumbnail-image');
    img.classList.remove('is-loading');
    img.classList.add('is-loaded');
    item.classList.remove('thumbnail-loading');
    if (imageWrap) imageWrap.classList.remove('is-loading');
    item.classList.add('thumbnail-visible');
    scheduleDominantColor(img, item);
}

function createThumbnailPlaceholder(thumbnailSrc, index, category) {
    const thumbnailItem = document.createElement('div');
    thumbnailItem.classList.add('thumbnail-item', 'thumbnail-loading');
    thumbnailItem.dataset.index = String(index);
    thumbnailItem.dataset.category = category;

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('thumbnail-image', 'is-loading');

    const img = document.createElement('img');
    img.className = 'thumbnail-img is-loading';
    img.alt = `${category} Thumbnail ${index + 1}`;
    img.decoding = 'async';
    img.loading = 'eager';
    if ('fetchPriority' in img) {
        img.fetchPriority = index < 6 ? 'high' : 'auto';
    }

    const reveal = () => markThumbnailLoaded(img, thumbnailItem);
    img.onload = reveal;
    img.onerror = reveal;

    imageWrap.appendChild(img);
    thumbnailItem.appendChild(imageWrap);
    img.src = thumbnailSrc;

    if (img.complete) {
        reveal();
    }

    return { item: thumbnailItem, img, src: thumbnailSrc };
}

function setupThumbnailGridInteractions() {
    if (thumbnailGridInteractionsBound) return;
    thumbnailGridInteractionsBound = true;

    document.addEventListener('click', (e) => {
        const item = e.target.closest('.thumbnail-item');
        if (!item || !item.closest('.thumbnail-grid')) return;

        const img = item.querySelector('img.thumbnail-img');
        if (!img || !img.classList.contains('is-loaded')) return;

        const category = item.dataset.category || 'all';
        const resolvedIndex = parseInt(item.dataset.index, 10) || 0;
        currentLightboxCategory = category;
        clickedThumbnailElement = item;
        scrollPositionBeforeLightbox = window.pageYOffset || document.documentElement.scrollTop;
        openLightbox(img.getAttribute('src'), img.getAttribute('alt') || 'Preview', resolvedIndex);
    });

    const clearThumbHold = () => {
        if (thumbHoldTimer) {
            clearTimeout(thumbHoldTimer);
            thumbHoldTimer = null;
        }
        if (thumbHoldItem) {
            thumbHoldItem.classList.remove('holding');
            thumbHoldItem = null;
        }
    };

    const startThumbHold = (e) => {
        const item = e.target.closest('.thumbnail-item');
        if (!item || !item.closest('.thumbnail-grid')) return;
        clearThumbHold();
        thumbHoldItem = item;
        thumbHoldTimer = setTimeout(() => item.classList.add('holding'), 120);
    };

    document.addEventListener('mousedown', startThumbHold);
    document.addEventListener('touchstart', startThumbHold, { passive: true });
    document.addEventListener('mouseup', clearThumbHold);
    document.addEventListener('mouseleave', clearThumbHold, true);
    document.addEventListener('touchend', clearThumbHold, { passive: true });
    document.addEventListener('touchcancel', clearThumbHold, { passive: true });
}

// Load Thumbnails — placeholders first, images row-by-row (YouTube-style)
function loadThumbnails(category = 'all') {
    const thumbnailList = getThumbnailListForCategory(category);
    const thumbnailGrid = document.getElementById(THUMBNAIL_GRID_IDS[category]);
    const showMoreContainer = document.getElementById('showMoreContainer');

    if (!thumbnailGrid || !thumbnailList) {
        return;
    }

    let thumbnailsToLoad = getThumbnailsPerPage();
    if (isSingleColumnThumbnailLayout()) {
        thumbnailsToLoad = MOBILE_THUMBNAILS_PER_PAGE;
    }
    const currentIndex = currentThumbnailsDisplayed[category] || 0;
    const remainingThumbnails = thumbnailList.length - currentIndex;
    const numToAdd = Math.min(thumbnailsToLoad, remainingThumbnails);

    if (thumbnailList.length > 0) {
        const comingSoonCard = thumbnailGrid.querySelector('.coming-soon-card');
        if (comingSoonCard) {
            comingSoonCard.remove();
        }
    }

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < numToAdd; i++) {
        const thumbnailSrc = thumbnailList[currentIndex + i];
        const entry = createThumbnailPlaceholder(thumbnailSrc, currentIndex + i, category);
        fragment.appendChild(entry.item);
    }
    thumbnailGrid.appendChild(fragment);

    currentThumbnailsDisplayed[category] = currentIndex + numToAdd;

    const activeButton = document.querySelector('.category-btn.active');
    const activeCategory = activeButton ? activeButton.getAttribute('data-category') : 'all';

    if (activeCategory === category) {
        if (currentThumbnailsDisplayed[category] >= thumbnailList.length) {
            if (showMoreContainer) showMoreContainer.style.display = 'none';
        } else if (showMoreContainer) {
            showMoreContainer.style.display = 'block';
        }
    }

    const showMoreButton = document.getElementById('showMoreThumbnails');
    if (showMoreButton) {
        showMoreButton.textContent = 'Show More';
    }
}

function ensureCategoryThumbnailsLoaded(category) {
    if ((currentThumbnailsDisplayed[category] || 0) === 0) {
        loadThumbnails(category);
    }
}

// Update Show More button visibility
function updateShowMoreButtonVisibility() {
    const showMoreContainer = document.getElementById('showMoreContainer');
    if (!showMoreContainer) return;
    
    const activeButton = document.querySelector('.category-btn.active');
    const category = activeButton ? activeButton.getAttribute('data-category') : 'all';
    
    const thumbnailLists = {
        all: allThumbnails,
        gaming: gamingThumbnails,
        social: socialThumbnails,
        tech: techThumbnails
    };
    
    const thumbnailList = thumbnailLists[category] || [];
    const currentIndex = currentThumbnailsDisplayed[category] || 0;
    
    if (currentIndex >= thumbnailList.length) {
        showMoreContainer.style.display = 'none';
    } else {
        showMoreContainer.style.display = 'block';
    }
}

// Event Listener for Show More Button
function setupShowMoreButton() {
    const showMoreButton = document.getElementById('showMoreThumbnails');
    if (showMoreButton) {
        showMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Show More button clicked!');
            
            // Get the currently active category
            const activeButton = document.querySelector('.category-btn.active');
            const category = activeButton ? activeButton.getAttribute('data-category') : 'all';
            
            loadThumbnails(category);
        });
    }
}

// Category Filter Functionality
function setupCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categorySections = document.querySelectorAll('.category-section');

    // Initially show only all section (active by default)
    categorySections.forEach(section => {
        const sectionCategory = section.getAttribute('data-category');
        if (sectionCategory !== 'all') {
            section.classList.add('hidden');
        }
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide sections
            categorySections.forEach(section => {
                const sectionCategory = section.getAttribute('data-category');
                
                if (sectionCategory === category) {
                    section.classList.remove('hidden');
                    section.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    section.style.animation = 'fadeOut 0.3s ease-out';
                    setTimeout(() => {
                        section.classList.add('hidden');
                    }, 300);
                }
            });
            
            ensureCategoryThumbnailsLoaded(category);
            updateShowMoreButtonVisibility();

            // Scroll to top of gallery
            const thumbnailsSection = document.getElementById('thumbnails');
            if (thumbnailsSection) {
                thumbnailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Global Variables
let selectedRating = 0;
let lightboxIndex = 0;
let isModalOpen = false;
let currentZoom = 1;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragOffsetX = 0;
let dragOffsetY = 0;
let lightboxStatePushed = false;
let clickedThumbnailElement = null;
let scrollPositionBeforeLightbox = 0;
let reviews = [
    {
        name: "Billy YT",
        rating: 5,
        text: "HI IM BILLY, VIDEO GAMES CONTENT CREATOR ON YOUTUBE. I HAVE BEEN WORKING WITH ANAS FROM LAST MONTH AND HE IS A GREAT DESIGNER WITH NEXT LEVEL OF SKILL IN PHOTOSHOP AND OTHER SOFTWARES. I LOVE HIS WORK AND DESIGNS, AND THATS WHY I HIRED HIM FOR MY THUMBNAIL DESIGN WORK. HE MAKE ALL THUMNBAILS FOR MY YOUTUBE VIDEO AND IF THERE'S ANY PROBLEM IN THUMBNAIL HE FIX IT QUICKLY AND HIS RESPOND TIME IS GREAT, HE COMES AT TIME AND WORK PREFECT. SO IF YOUR LOOKING FOR ANY THUMNBAIL DESIGNER FOR YOUR YOUTUBE CHANNEL OR OTHER STUFF I WOULD RECOMMEND YOU TO GIVE ANAS A CHANCE. THANK YOU SO MUCH ANAS FOR YOUR AWESOME WORK!❤️",
        date: "2025-08-09"
    },
    {
        name: "Raza",
        rating: 5,
        text: "Outstanding work! The website design perfectly captured our brand essence. The nature-inspired theme was exactly what we needed for our eco-friendly business.",
        date: "2025-01-15"
    },
    {
        name: "Ahmed Khan",
        rating: 5,
        text: "Best thumbnail designer I've worked with! My YouTube channel's CTR increased by 45% after using his designs. Highly recommended!",
        date: "2025-01-10"
    },
    {
        name: "Ali",
        rating: 4,
        text: "Great developer with excellent communication skills. Delivered the project on time and the glassmorphism effects look amazing.",
        date: "2025-01-05"
    }
];

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function hasFinePointer() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function onScrollRAF(callback) {
    let ticking = false;
    return function handleScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            callback();
            ticking = false;
        });
    };
}

let scrollEffectsBound = false;

function setupScrollEffects() {
    if (scrollEffectsBound) return;
    scrollEffectsBound = true;

    const navbar = document.querySelector('.navbar');
    const parallaxElements = document.querySelectorAll('.floating-card');
    let lastNavbarScrolled = null;

    const updateOnScroll = onScrollRAF(() => {
        const scrolled = window.scrollY;

        if (navbar) {
            const isScrolled = scrolled > 100;
            if (isScrolled !== lastNavbarScrolled) {
                navbar.classList.toggle('navbar-scrolled', isScrolled);
                lastNavbarScrolled = isScrolled;
            }
        }

        if (!prefersReducedMotion() && parallaxElements.length) {
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
            });
        }
    });

    window.addEventListener('scroll', updateOnScroll, { passive: true });
    updateOnScroll();
}

// Initialize Website
function initializeWebsite() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    setupScrollEffects();

    if (prefersReducedMotion()) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const card = entry.target;
            card.classList.add('glass-card-visible');
            if (card.classList.contains('service-card')) {
                card.style.animationDelay = `${Math.random() * 0.5}s`;
                card.classList.add('nature-entrance');
            }
            obs.unobserve(card);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.glass-card:not(.thumbnail-item)').forEach((card, index) => {
        card.classList.add('glass-card-enter');
        card.style.setProperty('--enter-delay', `${Math.min(index * 0.08, 0.8)}s`);
        observer.observe(card);
    });
}

// Create Nature Effects
function createNatureEffects() {
    addNatureSoundEffects();

    if (prefersReducedMotion()) return;

    createFloatingParticles();

    if (hasFinePointer()) {
        createCursorTrail();
    }
}

function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'nature-particles';
    particleContainer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(particleContainer);

    const maxParticles = 8;
    setInterval(() => {
        if (document.hidden || document.body.classList.contains('modal-open')) return;
        if (particleContainer.childElementCount >= maxParticles) return;
        if (Math.random() < 0.22) {
            createParticle(particleContainer);
        }
    }, 3500);
}

function createParticle(container) {
    const particle = document.createElement('div');
    const symbols = ['🍃', '🌿', '✨', '🌱'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    particle.textContent = symbol;
    particle.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: 100%;
        font-size: ${Math.random() * 10 + 15}px;
        opacity: 0.7;
        animation: floatUp ${Math.random() * 10 + 15}s linear forwards;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 20000);
}

function addNatureSoundEffects() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) saturate(1.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1)';
        });
        
        button.addEventListener('click', function() {
            createRippleEffect(this);
        });
    });
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(34, 139, 34, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';
    
    // Only set relative positioning if the element is currently static,
    // so we don't break absolutely positioned controls (e.g., lightbox buttons)
    const currentPosition = window.getComputedStyle(element).position;
    if (currentPosition === 'static') {
    element.style.position = 'relative';
    }
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function createCursorTrail() {
    let trail = [];
    let lastSpawn = 0;

    document.addEventListener('mousemove', (e) => {
        if (document.body.classList.contains('modal-open')) return;

        const now = performance.now();
        if (now - lastSpawn < 90) return;
        lastSpawn = now;

        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(34, 139, 34, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: trailFade 1s ease-out forwards;
            will-change: opacity, transform;
        `;

        document.body.appendChild(dot);
        trail.push(dot);

        if (trail.length > 6) {
            const oldDot = trail.shift();
            oldDot.remove();
        }

        setTimeout(() => dot.remove(), 1000);
    }, { passive: true });
}

// Setup Event Listeners
function setupEventListeners() {
    // (Consolidated in the single setupEventListeners defined later in the file)
}

function createStarBurst(star) {
    const burst = document.createElement('div');
    burst.textContent = '✨';
    burst.style.cssText = `
        position: absolute;
        font-size: 1.5rem;
        pointer-events: none;
        animation: starBurst 0.8s ease-out forwards;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    `;
    
    star.style.position = 'relative';
    star.appendChild(burst);
    
    setTimeout(() => {
        if (burst.parentNode) {
            burst.parentNode.removeChild(burst);
        }
    }, 800);
}

// Enhanced Form Handlers
// (Duplicate handleContactSubmit removed; using the single definition later in the file)

function handleReviewSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('reviewerName').value;
    const text = document.getElementById('reviewText').value;

    // Validation
    if (!name || !text) {
        showNatureNotification('Please share your thoughts with us! 🌿', 'error');
        return;
    }

    if (selectedRating === 0) {
        showNatureNotification('Please rate your experience with stars! ⭐', 'error');
        return;
    }

    // Add new review
    const newReview = {
        name: name,
        rating: selectedRating,
        text: text,
        date: new Date().toISOString().split('T')[0]
    };

    reviews.unshift(newReview);
    loadReviews();
    
    // Reset form with animation
    const form = document.getElementById('reviewForm');
    form.style.animation = 'pulse 0.5s ease-in-out';
    form.reset();
    selectedRating = 0;
    updateStarRating();
    
    setTimeout(() => {
        form.style.animation = '';
    }, 500);
    
    showNatureNotification('Thank you for sharing your experience! 🌺', 'success');
    
    console.log('Review submitted:', newReview);
}

// Enhanced Notification System
// (Duplicate showNatureNotification removed; using the single definition later in the file)

// Enhanced Keyboard Navigation
function handleKeyboardNavigation(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeSignupModal();
    }
    
    // Navigate sections with arrow keys (when not in input)
    if (!e.target.matches('input, textarea')) {
        const sections = ['home', 'about', 'services', 'thumbnails', 'reviews', 'contact'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            scrollToSection(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            scrollToSection(sections[currentIndex - 1]);
        }
    }
    
    // Nature-themed easter egg
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        triggerNatureEasterEgg();
    }
}

function triggerNatureEasterEgg() {
    const body = document.body;
    body.style.animation = 'natureGlow 2s ease-in-out';
    
    // Create multiple particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createParticle(document.querySelector('.nature-particles'));
        }, i * 100);
    }
    
    showNatureNotification('You discovered the nature secret! 🌟🌿✨', 'success');
    
    setTimeout(() => {
        body.style.animation = '';
    }, 2000);
}

// Rest of the existing functions with enhancements...
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Add nature-themed scroll indicator
        createScrollIndicator();
    }
}

function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.textContent = '🌿';
    indicator.style.cssText = `
        position: fixed;
        right: 30px;
        top: 50%;
        font-size: 2rem;
        animation: scrollPulse 1s ease-in-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }, 1000);
}

// Load and Display Reviews (enhanced)
function loadReviews() {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;

    reviewsList.innerHTML = '';

    reviews.forEach((review, index) => {
        const reviewElement = createReviewElement(review);
        reviewElement.style.animationDelay = `${index * 0.1}s`;
        reviewsList.appendChild(reviewElement);
    });
}

function createReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review-item glass-card';
    reviewDiv.style.animation = 'fadeInUp 0.6s ease-out forwards';
    
    const stars = '⭐'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    reviewDiv.innerHTML = `
        <div class="review-header">
            <span class="reviewer-name">${escapeHtml(review.name)}</span>
            <span class="review-stars">${stars}</span>
        </div>
        <p class="review-text">${escapeHtml(review.text)}</p>
        <small class="review-date">${formatDate(review.date)}</small>
    `;
    
    return reviewDiv;
}

// Star Rating Functions (enhanced)
function updateStarRating() {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < selectedRating) {
            star.classList.add('active');
            star.style.transform = 'scale(1.1)';
        } else {
            star.classList.remove('active');
            star.style.transform = 'scale(1)';
        }
    });
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#fbbf24';
            star.style.transform = 'scale(1.1)';
        } else {
            star.style.color = 'rgba(251, 191, 36, 0.3)';
            star.style.transform = 'scale(1)';
        }
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = 'home';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    
    return currentSection;
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
    
    @keyframes trailFade {
        to { opacity: 0; transform: scale(0); }
    }
    
    @keyframes starBurst {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes scrollPulse {
        0%, 100% { transform: translateY(0); opacity: 1; }
        50% { transform: translateY(-10px); opacity: 0.7; }
    }
    
    @keyframes natureGlow {
        0%, 100% { filter: brightness(1) hue-rotate(0deg); }
        50% { filter: brightness(1.2) hue-rotate(30deg); }
    }
    
    @keyframes modalFadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes modalFadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
    
    .nature-entrance {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-icon {
        font-size: 1.2rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;

document.head.appendChild(style);

// Console message for developers (enhanced)
console.log(`
🌿 Nature-Inspired Portfolio Website Loaded Successfully! 🌿
👨‍💻 Built with HTML, CSS, and JavaScript
✨ Features: Dark nature glassmorphism, Contact forms, Reviews, Signup
🌱 Enhanced with: Particle effects, Cursor trails, Nature animations
📱 Fully responsive and interactive
🎨 Created by a passionate developer who loves nature

Want to hire me? Use the contact form! 🌟
Try Ctrl+N for a nature surprise! 🍃
`);

// (Removed invalid export of undefined functions to avoid runtime errors)



// New Interactive Elements

// Floating Action Button for Quick Contact
function createFloatingActionButton() {
    const fab = document.createElement('div');
    fab.className = 'floating-action-btn';
    fab.innerHTML = `
        <div class="fab-main">
            <i class="fas fa-plus"></i>
        </div>
        <div class="fab-options">
            <div class="fab-option" data-action="email">
                <i class="fas fa-envelope"></i>
                <span class="fab-tooltip">Email</span>
            </div>
            <div class="fab-option" data-action="whatsapp">
                <i class="fab fa-whatsapp"></i>
                <span class="fab-tooltip">WhatsApp</span>
            </div>
            <div class="fab-option" data-action="call">
                <i class="fas fa-phone"></i>
                <span class="fab-tooltip">Call</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(fab);
    
    // FAB functionality
    const fabMain = fab.querySelector('.fab-main');
    const fabOptions = fab.querySelector('.fab-options');
    let isOpen = false;
    
    fabMain.addEventListener('click', () => {
        isOpen = !isOpen;
        fab.classList.toggle('open', isOpen);
        fabMain.querySelector('i').style.transform = isOpen ? 'rotate(45deg)' : 'rotate(0deg)';
    });
    
    // FAB option actions
    fab.querySelectorAll('.fab-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const action = e.currentTarget.dataset.action;
            handleFabAction(action);
        });
    });
}

function handleFabAction(action) {
    switch(action) {
        case 'email':
            window.location.href = 'mailto:cyberatt009@gmail.com';
            break;
        case 'whatsapp':
            window.open('https://wa.me/923001234567', '_blank');
            break;
        case 'call':
            window.location.href = 'tel:+923001234567';
            break;
    }
    showNatureNotification(`Opening ${action} for quick contact! 🌿`, 'success');
}

// Interactive Skill Bars
function createInteractiveSkillBars() {
    const skillsData = [
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'React', level: 85 },
        { name: 'Node.js', level: 80 },
        { name: 'Photoshop', level: 92 },
        { name: 'UI/UX Design', level: 88 }
    ];
    
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'skills-container glass-card';
    skillsContainer.innerHTML = '<h3>Technical Skills</h3>';
    
    skillsData.forEach((skill, index) => {
        const skillBar = document.createElement('div');
        skillBar.className = 'skill-bar';
        skillBar.innerHTML = `
            <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percentage">${skill.level}%</span>
            </div>
            <div class="skill-progress">
                <div class="skill-fill" data-level="${skill.level}"></div>
            </div>
        `;
        skillsContainer.appendChild(skillBar);
        
        // Animate skill bar on scroll
        setTimeout(() => {
            const skillFill = skillBar.querySelector('.skill-fill');
            skillFill.style.width = skill.level + '%';
        }, index * 200);
    });
    
    aboutSection.appendChild(skillsContainer);
}

// Enhanced Scroll Animations
function createScrollAnimations() {
    if (prefersReducedMotion()) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const target = entry.target;
            target.classList.add('animate-in');

            if (target.classList.contains('skill-bar')) {
                const skillFill = target.querySelector('.skill-fill');
                const level = skillFill?.dataset.level;
                if (skillFill && level) {
                    requestAnimationFrame(() => {
                        skillFill.style.width = `${level}%`;
                    });
                }
            }

            obs.unobserve(target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.skill-bar').forEach(el => observer.observe(el));
}

// Interactive Background Particles
function enhanceBackgroundParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer || !hasFinePointer() || prefersReducedMotion()) return;

    const particles = particlesContainer.querySelectorAll('.particle');
    if (!particles.length) return;

    let mouseX = 0;
    let mouseY = 0;
    let pending = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (pending || document.body.classList.contains('modal-open')) return;
        pending = true;
        requestAnimationFrame(() => {
            particles.forEach((particle) => {
                const rect = particle.getBoundingClientRect();
                const particleX = rect.left + rect.width / 2;
                const particleY = rect.top + rect.height / 2;
                const dx = mouseX - particleX;
                const dy = mouseY - particleY;
                const distance = Math.hypot(dx, dy);

                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    const angle = Math.atan2(dy, dx);
                    particle.style.transform = `translate3d(${Math.cos(angle) * force * 20}px, ${Math.sin(angle) * force * 20}px, 0)`;
                } else {
                    particle.style.transform = 'translate3d(0, 0, 0)';
                }
            });
            pending = false;
        });
    }, { passive: true });
}

// Typing Animation for Hero Text
function createTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Add blinking cursor
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '|';
            heroTitle.appendChild(cursor);
        }
    };
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// Initialize all new interactive elements
function initializeInteractiveElements() {
    createScrollAnimations();
    enhanceBackgroundParticles();
    createTypingAnimation();
}

// Update the main initialization
// (DOMContentLoaded handler consolidated at bottom of file)

// Copy to Clipboard Functionality
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(function() {
        // Show success feedback
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = '#4ade80';
        
        // Show nature-themed notification
        showNatureNotification(`Copied: ${text}`, 'success');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.style.color = '';
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy: ', err);
        showNatureNotification('Failed to copy to clipboard', 'error');
    });
}

// Extract dominant color from an image using a small canvas sample
function extractDominantColor(img) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return { hex: null, rgb: null };
    // Sample down to 32x32 for speed
    const sampleSize = 48;
    canvas.width = sampleSize;
    canvas.height = sampleSize;
    try {
        context.drawImage(img, 0, 0, sampleSize, sampleSize);
    } catch (e) {
        return { hex: null, rgb: null };
    }
    const data = context.getImageData(0, 0, sampleSize, sampleSize).data;
    // Build a simple histogram emphasizing saturated colors
    const buckets = new Map(); // key: r,g,b -> count
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        if (a < 128) continue;
        // Convert to HSV to weigh saturation/value
        const { s, v } = rgbToHsv(r, g, b);
        // Skip near-gray or too dark pixels
        if (s < 0.25 || v < 0.2) continue;
        // Quantize to reduce noise
        const qr = Math.round(r / 16) * 16;
        const qg = Math.round(g / 16) * 16;
        const qb = Math.round(b / 16) * 16;
        const key = `${qr},${qg},${qb}`;
        const weight = 1 + s * 1.5 + v * 0.5; // prioritize vibrant bright colors
        buckets.set(key, (buckets.get(key) || 0) + weight);
    }
    if (buckets.size === 0) {
        // fallback to average if no vibrant colors found
        let ar = 0, ag = 0, ab = 0, c = 0;
        for (let i = 0; i < data.length; i += 4) {
            const a = data[i + 3];
            if (a < 128) continue;
            ar += data[i]; ag += data[i + 1]; ab += data[i + 2]; c++;
        }
        if (!c) return { hex: null, rgb: null };
        ar = Math.round(ar / c); ag = Math.round(ag / c); ab = Math.round(ab / c);
        const hex = `#${toHex(ar)}${toHex(ag)}${toHex(ab)}`;
        return { hex, rgb: { r: ar, g: ag, b: ab } };
    }
    // Pick the most frequent bucket
    let bestKey = null, bestVal = -1;
    for (const [key, val] of buckets.entries()) {
        if (val > bestVal) { bestVal = val; bestKey = key; }
    }
    const [br, bg, bb] = bestKey.split(',').map(n => parseInt(n, 10));
    const hex = `#${toHex(br)}${toHex(bg)}${toHex(bb)}`;
    return { hex, rgb: { r: br, g: bg, b: bb } };
}

function toHex(v) {
    const s = v.toString(16);
    return s.length === 1 ? '0' + s : s;
}

function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    if (d !== 0) {
        if (max === r) h = ((g - b) / d) % 6;
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h *= 60;
        if (h < 0) h += 360;
    }
    const s = max === 0 ? 0 : d / max;
    const v = max;
    return { h, s, v };
}

// Lightbox state
// Variables are already declared at the top of the file

function lockScroll() {
    if (isModalOpen) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
        document.body.style.paddingRight = scrollbarWidth + 'px';
    }
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    isModalOpen = true;
}

function unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.body.classList.remove('modal-open');
    isModalOpen = false;
}

function openLightbox(src, caption, index) {
    lightboxIndex = index;
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImage');
    const cap = document.getElementById('lightboxCaption');
    if (!modal || !img || !cap) return;
    
    // Reset zoom and position
    currentZoom = 1;
    dragOffsetX = 0;
    dragOffsetY = 0;
    updateImageTransform();
    updateZoomLevel();
    
    img.src = src;
    cap.textContent = caption;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    lockScroll();
    
    // Push state for mobile back button
    if (!lightboxStatePushed) {
        history.pushState({ lightbox: true }, '');
        lightboxStatePushed = true;
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }
    unlockScroll();
    lightboxStatePushed = false;
    
    // Scroll back to clicked thumbnail
    if (clickedThumbnailElement) {
        setTimeout(() => {
            clickedThumbnailElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            clickedThumbnailElement = null;
        }, 100);
    } else if (scrollPositionBeforeLightbox > 0) {
        // Fallback: scroll to saved position
        setTimeout(() => {
            window.scrollTo({ top: scrollPositionBeforeLightbox, behavior: 'smooth' });
            scrollPositionBeforeLightbox = 0;
        }, 100);
    }
}

function showLightboxAt(index) {
    const list = getThumbnailListForCategory(currentLightboxCategory);
    if (!list.length) return;
    if (index < 0) index = list.length - 1;
    if (index >= list.length) index = 0;
    lightboxIndex = index;
    const src = list[index];
    
    // Reset zoom when changing images
    currentZoom = 1;
    dragOffsetX = 0;
    dragOffsetY = 0;
    updateImageTransform();
    updateZoomLevel();
    
    openLightbox(src, `Thumbnail ${index + 1}`, index);
}

function setupLightboxControls() {
    const modal = document.getElementById('lightboxModal');
    if (!modal) return;
    const btnClose = modal.querySelector('.lightbox-close');
    const btnPrev = modal.querySelector('.lightbox-prev');
    const btnNext = modal.querySelector('.lightbox-next');
    const stop = (e) => { e.stopPropagation(); };
    btnClose && btnClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
    btnPrev && btnPrev.addEventListener('click', (e) => { e.stopPropagation(); showLightboxAt(lightboxIndex - 1); });
    btnNext && btnNext.addEventListener('click', (e) => { e.stopPropagation(); showLightboxAt(lightboxIndex + 1); });
    // Prevent backdrop close on touchstart on controls
    btnClose && btnClose.addEventListener('touchstart', stop, { passive: true });
    btnPrev && btnPrev.addEventListener('touchstart', stop, { passive: true });
    btnNext && btnNext.addEventListener('touchstart', stop, { passive: true });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        const isOpen = modal.classList.contains('open');
        if (!isOpen) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showLightboxAt(lightboxIndex - 1);
        if (e.key === 'ArrowRight') showLightboxAt(lightboxIndex + 1);
        
        // Zoom keyboard shortcuts
        if (e.key === '+' || e.key === '=') {
            e.preventDefault();
            zoomIn();
        }
        if (e.key === '-') {
            e.preventDefault();
            zoomOut();
        }
        if (e.key === '0') {
            e.preventDefault();
            resetZoom();
        }
    });
}

// Zoom functionality
let zoomToggleState = false; // Track if toggled to 50%

function setupZoomControls() {
    const modal = document.getElementById('lightboxModal');
    if (!modal) return;
    
    const zoomInBtn = modal.querySelector('.zoom-in');
    const zoomOutBtn = modal.querySelector('.zoom-out');
    const zoomResetBtn = modal.querySelector('.zoom-reset');
    const img = modal.querySelector('#lightboxImage');
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            zoomIn();
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            zoomOut();
        });
    }
    
    if (zoomResetBtn) {
        zoomResetBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            resetZoom();
        });
    }
    
    // Desktop click-to-zoom toggle - Better experience
    if (img) {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            // Only toggle if not dragging
            if (!isDragging) {
                if (currentZoom <= 1) {
                    // Zoom to 150%
                    currentZoom = 1.5;
                    zoomToggleState = true;
                    updateImageTransform();
                    updateZoomLevel();
                } else {
                    // Reset to 100%
                    currentZoom = 1;
                    dragOffsetX = 0;
                    dragOffsetY = 0;
                    zoomToggleState = false;
                    updateImageTransform();
                    updateZoomLevel();
                }
            }
        }, false);
    
        // Mouse wheel zoom
        img.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
        });
        
        // Show zoom info on hover
        img.addEventListener('mouseenter', () => {
            const zoomInfo = document.getElementById('zoomLevel')?.parentElement;
            if (zoomInfo) {
                zoomInfo.classList.remove('hidden');
            }
        });
        
        img.addEventListener('mouseleave', () => {
            const zoomInfo = document.getElementById('zoomLevel')?.parentElement;
            if (zoomInfo) {
                zoomInfo.classList.add('hidden');
            }
        });
        
        // Touch gestures for mobile
        let initialDistance = 0;
        let initialZoom = 1;
        
        img.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                initialDistance = getDistance(e.touches[0], e.touches[1]);
                initialZoom = currentZoom;
            }
        });
        
        img.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const currentDistance = getDistance(e.touches[0], e.touches[1]);
                const scale = currentDistance / initialDistance;
                currentZoom = Math.max(0.5, Math.min(5, initialZoom * scale));
                updateImageTransform();
                updateZoomLevel();
            }
        });
        
        // Drag functionality
        img.addEventListener('mousedown', startDrag);
        img.addEventListener('touchstart', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
    }
}

function getDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function startDrag(e) {
    if (currentZoom <= 1) return;
    
    isDragging = true;
    const img = document.getElementById('lightboxImage');
    if (img) img.classList.add('dragging');
    
    const touch = e.touches ? e.touches[0] : e;
    dragStartX = touch.clientX - dragOffsetX;
    dragStartY = touch.clientY - dragOffsetY;
    
    e.preventDefault();
}

function drag(e) {
    if (!isDragging) return;
    
    const touch = e.touches ? e.touches[0] : e;
    dragOffsetX = touch.clientX - dragStartX;
    dragOffsetY = touch.clientY - dragStartY;
    
    updateImageTransform();
    e.preventDefault();
}

function endDrag() {
    isDragging = false;
}

function zoomIn() {
    currentZoom = Math.min(5, currentZoom + 0.25);
    updateImageTransform();
    updateZoomLevel();
}

function zoomOut() {
    currentZoom = Math.max(0.5, currentZoom - 0.25);
    updateImageTransform();
    updateZoomLevel();
}

function resetZoom() {
    currentZoom = 1;
    dragOffsetX = 0;
    dragOffsetY = 0;
    zoomToggleState = false;
    updateImageTransform();
    updateZoomLevel();
}

function updateImageTransform() {
    const img = document.getElementById('lightboxImage');
    if (!img) return;
    
    img.style.transform = `scale(${currentZoom}) translate(${dragOffsetX / currentZoom}px, ${dragOffsetY / currentZoom}px)`;
    
    // Add zoomed class for cursor styling
    if (currentZoom > 1) {
        img.classList.add('zoomed');
    } else {
        img.classList.remove('zoomed');
    }
}

function updateZoomLevel() {
    const zoomLevel = document.getElementById('zoomLevel');
    if (zoomLevel) {
        zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
        
        // Show zoom info and hide after delay
        zoomLevel.parentElement.classList.remove('hidden');
        clearTimeout(window.zoomInfoTimeout);
        window.zoomInfoTimeout = setTimeout(() => {
            if (zoomLevel.parentElement) {
                zoomLevel.parentElement.classList.add('hidden');
            }
        }, 2000);
    }
}

// Enhanced Contact Form with Better Desktop Support
function handleContactSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    // Validation
    if (!name || !email || !subject || !message) {
        showNatureNotification('Please fill in all fields to connect with nature! 🌿', 'error');
        return;
    }
    if (!isValidEmail(email)) {
        showNatureNotification('Please enter a valid email address 📧', 'error');
        return;
    }

    const mailtoBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
    const mailtoLink = `mailto:cyberatt009@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
        // Mobile: direct mailto
        window.location.href = mailtoLink;
    } else {
        // Desktop: open Gmail compose in new tab
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=cyberatt009@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
        window.open(gmailLink, '_blank');
    }

    showNatureNotification('Opening your email client to send the message! 📧🌱', 'success');

    // Reset form with animation
    const form = document.getElementById('contactForm');
    form.style.animation = 'pulse 0.5s ease-in-out';
    form.reset();

    setTimeout(() => {
        form.style.animation = '';
    }, 500);
}

// Enhanced Nature Notification System (single source of truth)
function showNatureNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.nature-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `nature-notification ${type}`;
    
    let icon = '🌿';
    if (type === 'success') icon = '🌺';
    if (type === 'error') icon = '🍂';
    if (type === 'info') icon = '🌱';
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-text">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Update the setupEventListeners function to include new features (single source of truth)
function setupEventListeners() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Review form
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmit);
    }
    
    // Star rating
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-rating'));
            updateStarRating();
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
    });
    
    const starRating = document.querySelector('.star-rating');
    if (starRating) {
        starRating.addEventListener('mouseleave', function() {
            updateStarRating();
        });
    }
    
    setupThumbnailGridInteractions();
    setupLightboxControls();
    setupZoomControls(); // Add this line to initialize zoom controls
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Escape key functionality
        if (e.key === 'Escape') {
            // Close any open notifications
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                notification.remove();
            });
        }
    });
}

function setupThumbnailsNewBadge() {
    const badge = document.querySelector('.nav-thumbnails-new');
    if (!badge) return;

    const hideBadge = () => {
        if (badge.classList.contains('is-gone')) return;
        badge.classList.add('is-hiding');
        badge.addEventListener('animationend', () => badge.classList.add('is-gone'), { once: true });
    };

    setTimeout(hideBadge, 10000);
    badge.closest('.nav-thumbnails-highlight')?.addEventListener('click', hideBadge, { once: true });
}

function setupThumbnailsNavHighlight() {
    const link = document.querySelector('.nav-thumbnails-highlight');
    const section = document.getElementById('thumbnails');
    if (!link || !section) return;

    setupThumbnailsNewBadge();

    const settle = () => link.classList.add('settled');
    const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
            settle();
            observer.disconnect();
        }
    }, { threshold: 0.12 });

    observer.observe(section);
    link.addEventListener('click', settle, { once: true });
}

let galleryKickedOff = false;

function kickoffThumbnailGallery() {
    if (galleryKickedOff || !document.getElementById('allGrid')) return;
    galleryKickedOff = true;
    setupThumbnailGridInteractions();
    setupShowMoreButton();
    loadThumbnails('all');
    updateShowMoreButtonVisibility();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    kickoffThumbnailGallery();
    setupThumbnailsNavHighlight();

    initializeWebsite();
    loadReviews();
    setupEventListeners();
    setupActiveNavHighlight();

    const runDeferredEffects = () => {
        createNatureEffects();
        initializeInteractiveElements();
    };
    if ('requestIdleCallback' in window) {
        requestIdleCallback(runDeferredEffects, { timeout: 1500 });
    } else {
        setTimeout(runDeferredEffects, 200);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateShowMoreButtonVisibility, 150);
    }, { passive: true });
    // Create sticky mobile CTA without editing HTML directly
    createMobileCTA();
    createHireModal();
    bindHireButtons();
    // Setup category filter
    setupCategoryFilter();
    
    // Mobile back button support
    window.addEventListener('popstate', function(e) {
        const modal = document.getElementById('lightboxModal');
        if (modal && modal.classList.contains('open')) {
            // Close lightbox when back button is pressed
            closeLightbox();
            // Prevent default back navigation
            if (e.state && e.state.lightbox) {
                e.preventDefault();
            }
        }
    });
});

// Active nav link highlight
function setupActiveNavHighlight() {
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sectionIds = navLinks.map(l => l.getAttribute('href')).filter(Boolean).map(h => h.replace('#', ''));
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const updateActive = onScrollRAF(() => {
        let current = sections[0]?.id;
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) current = sec.id;
        });
        navLinks.forEach(link => {
            const id = link.getAttribute('href')?.replace('#', '');
            link.classList.toggle('active', id === current);
        });
    });

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
}

// Sticky Mobile CTA (injected via JS so no HTML change needed)
function createMobileCTA() {
    if (document.querySelector('.mobile-cta')) return;
    const cta = document.createElement('a');
    cta.className = 'mobile-cta';
    cta.href = '#hire';
    cta.setAttribute('aria-label', 'Hire Me');
    cta.innerHTML = '<i class="fas fa-briefcase"></i><span>Hire Me</span>';
    document.body.appendChild(cta);
    cta.addEventListener('click', function(e) {
        e.preventDefault();
        openHireModal();
    });
}

// Hire Me Modal (injected)
function createHireModal() {
    if (document.getElementById('hireModal')) return;
    const modal = document.createElement('div');
    modal.id = 'hireModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content glass-card" role="dialog" aria-modal="true">
            <span class="close" aria-label="Close">&times;</span>
            <h2>Send a Message</h2>
            <form id="hireForm" class="review-form">
                <div class="form-group">
                    <input type="text" id="hireName" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <input type="email" id="hireEmail" placeholder="Your Email" required>
                </div>
                <div class="form-group">
                    <input type="text" id="hireSubject" placeholder="Subject" value="Hire Inquiry" required>
                </div>
                <div class="form-group">
                    <textarea id="hireMessage" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" class="btn-primary">
                    <i class="fas fa-paper-plane"></i>
                    Send Message
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', closeHireModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeHireModal(); });
    const hireForm = modal.querySelector('#hireForm');
    hireForm.addEventListener('submit', handleHireSubmit);
}

function openHireModal() {
    const modal = document.getElementById('hireModal');
    if (!modal) return;
    modal.classList.add('open');
    lockScroll();
}

function closeHireModal() {
    const modal = document.getElementById('hireModal');
    if (!modal) return;
    modal.classList.remove('open');
    unlockScroll();
}

function bindHireButtons() {
    // Header Hire Me button (has class signup-btn)
    const headerHire = document.querySelector('.signup-btn');
    if (headerHire) {
        // capture phase to override any other click handlers
        headerHire.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openHireModal();
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }, true);
    }
}

function handleHireSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('hireName').value;
    const email = document.getElementById('hireEmail').value;
    const subject = document.getElementById('hireSubject').value;
    const message = document.getElementById('hireMessage').value;
    if (!name || !email || !subject || !message) {
        showNatureNotification('Please fill in all fields 🌿', 'error');
        return;
    }
    if (!isValidEmail(email)) {
        showNatureNotification('Please enter a valid email 📧', 'error');
        return;
    }
    const mailtoBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
    const mailtoLink = `mailto:cyberatt009@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
        window.location.href = mailtoLink;
    } else {
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=cyberatt009@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
        window.open(gmailLink, '_blank');
    }
    showNatureNotification('Opening your email client 📧🌱', 'success');
    closeHireModal();
    
    // Reset form
    document.getElementById('hireForm').reset();
}



// Enhanced Comments Section Functionality
function enhanceCommentsSection() {
    // Add smooth scrolling to comments section
    const commentLinks = document.querySelectorAll('a[href="#comments"]');
    commentLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const commentsSection = document.getElementById('comments');
            if (commentsSection) {
                commentsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add comment count indicator
    updateCommentCount();
    
    // Monitor Disqus loading
    monitorDisqusLoading();
}

// Update comment count (placeholder for now)
function updateCommentCount() {
    const commentLinks = document.querySelectorAll('a[href="#comments"]');
    commentLinks.forEach(link => {
        // If a count already exists, don't add another
        if (link.querySelector('.comment-count')) {
            return;
        }
        const countSpan = document.createElement('span');
        countSpan.className = 'comment-count';
        countSpan.textContent = '0';
        countSpan.style.cssText = `
            background: rgba(34, 139, 34, 0.8);
            color: white;
            border-radius: 50%;
            min-width: 20px;
            height: 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            margin-left: 5px;
            font-weight: bold;
            padding: 0 6px;
        `;
        link.appendChild(countSpan);
    });
}

// Monitor Disqus loading and handle errors gracefully
function monitorDisqusLoading() {
    let loadingTimeout = setTimeout(() => {
        const disqusLoading = document.getElementById('disqus-loading');
        const disqusFallback = document.getElementById('disqus-fallback');
        
        if (disqusLoading && disqusLoading.style.display !== 'none') {
            // If still loading after 10 seconds, show fallback
            disqusLoading.style.display = 'none';
            if (disqusFallback) {
                disqusFallback.style.display = 'block';
            }
        }
    }, 10000); // 10 second timeout

    // Clear timeout if Disqus loads successfully
    window.addEventListener('message', function(e) {
        if (e.data && e.data.type === 'disqus-ready') {
            clearTimeout(loadingTimeout);
        }
    });
}

// Initialize comments enhancement when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    enhanceCommentsSection();
});

// Grid exists at end of body — start loading immediately, no rAF delay
kickoffThumbnailGallery();

