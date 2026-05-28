// =============================================
// ALORA BOUTIQUE – APP.JS
// E-Commerce Application Logic
// =============================================

// ──────────────────────────────────────────
// CART STATE
// ──────────────────────────────────────────
let cart = [];

function saveCart() {
  localStorage.setItem('alora_cart', JSON.stringify(cart));
}

function loadCart() {
  try {
    const stored = localStorage.getItem('alora_cart');
    if (stored) cart = JSON.parse(stored);
  } catch(e) {
    cart = [];
  }
}

function addToCart(productId, size, qty = 1) {
  const product = getProductById(productId);
  if (!product) return;
  if (!size) {
    showToast('Please select a size', '📏');
    return false;
  }
  const existing = cart.find(i => i.productId === productId && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, size, qty, name: product.name, price: product.price, image: product.images[0] });
  }
  saveCart();
  updateCartUI();
  showToast(`${product.name} added to cart`, '✓');
  return true;
}

function removeFromCart(productId, size) {
  cart = cart.filter(i => !(i.productId === productId && i.size === size));
  saveCart();
  updateCartUI();
}

function updateCartQty(productId, size, delta) {
  const item = cart.find(i => i.productId === productId && i.size === size);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

// ──────────────────────────────────────────
// CART UI
// ──────────────────────────────────────────
function updateCartUI() {
  updateCartBadge();
  renderCartItems();
  renderCartFooter();
  renderOrderSummary();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  if (count > 0) badge.classList.add('visible');
  else badge.classList.remove('visible');
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24"><path d="M17 18c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0-3l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4H5.21l-.94-2H1v2h2l3.6 8.59L4.25 14C3.47 14 2.83 14.34 2.37 14.91 2 15.37 1.8 15.95 1.8 16.5c0 1.38 1.12 2.5 2.5 2.5h15v-2H5.16c-.14 0-.25-.11-.25-.25z"/></svg>
        <p>Your cart is empty</p>
        <button class="btn-primary" onclick="closeCart(); navigateTo('home')">Start Shopping</button>
      </div>`;
    return;
  }
  container.innerHTML = cart.map(item => {
    const product = getProductById(item.productId);
    return `
      <div class="cart-item" data-pid="${item.productId}" data-size="${item.size}">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-size">Size: ${item.size}</p>
          <div class="cart-item-controls">
            <div class="cart-qty-btns">
              <button class="cart-qty-btn" onclick="updateCartQty(${item.productId}, '${item.size}', -1)">−</button>
              <span class="cart-qty-num">${item.qty}</span>
              <button class="cart-qty-btn" onclick="updateCartQty(${item.productId}, '${item.size}', 1)">+</button>
            </div>
            <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
          </div>
        </div>
        <button class="cart-remove-btn" onclick="removeFromCart(${item.productId}, '${item.size}')" title="Remove">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
      </div>`;
  }).join('');
}

function renderCartFooter() {
  const footer = document.getElementById('cart-footer');
  if (!footer) return;
  const total = getCartTotal();
  const freeShipRemaining = Math.max(0, 999 - total);
  footer.innerHTML = `
    <div class="cart-subtotal-row">
      <span class="cart-subtotal-label">Subtotal (${getCartCount()} items)</span>
      <span class="cart-subtotal-value">₹${total.toLocaleString('en-IN')}</span>
    </div>
    ${freeShipRemaining > 0 
      ? `<p class="cart-free-ship">Add ₹${freeShipRemaining.toLocaleString('en-IN')} more for free shipping</p>`
      : `<p class="cart-free-ship">✓ You qualify for free shipping!</p>`
    }
    <button class="cart-checkout-btn" onclick="goToCheckout()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
      Proceed to Checkout
    </button>`;
}

// ──────────────────────────────────────────
// CART DRAWER OPEN/CLOSE
// ──────────────────────────────────────────
function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
  document.body.style.overflow = '';
}

// ──────────────────────────────────────────
// ROUTING / VIEW MANAGEMENT
// ──────────────────────────────────────────
let currentView = 'home';
let currentProductId = null;

function navigateTo(view, params = {}) {
  currentView = view;

  const homeView = document.getElementById('view-home');
  const detailView = document.getElementById('view-detail');
  const checkoutView = document.getElementById('view-checkout');
  const homeNav = document.getElementById('nav-home-links');

  [homeView, detailView, checkoutView].forEach(v => v && v.classList.remove('active'));

  closeCart();
  document.body.style.overflow = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (view === 'home') {
    homeView.classList.add('active');
    homeNav && (homeNav.style.display = '');
    history.pushState({}, '', window.location.pathname);
  } else if (view === 'product') {
    detailView.classList.add('active');
    homeNav && (homeNav.style.display = 'none');
    renderProductDetail(params.id);
    currentProductId = params.id;
    history.pushState({ view: 'product', id: params.id }, '', '#product-' + params.id);
  } else if (view === 'checkout') {
    checkoutView.classList.add('active');
    homeNav && (homeNav.style.display = 'none');
    renderCheckout();
    history.pushState({ view: 'checkout' }, '', '#checkout');
  }

  // Re-observe scroll animations
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.active), .zoom-in:not(.active)').forEach(el => {
      scrollObserver.observe(el);
    });
  }, 50);
}

function goToCheckout() {
  closeCart();
  setTimeout(() => navigateTo('checkout'), 300);
}

// ──────────────────────────────────────────
// PRODUCT LISTING
// ──────────────────────────────────────────
let activeFilter = 'all';

function renderProductsGrid(filterCat) {
  activeFilter = filterCat || 'all';
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const list = getProductsByCategory(activeFilter);

  grid.innerHTML = list.map((p, i) => {
    const delay = i % 3 === 0 ? '' : i % 3 === 1 ? 'reveal-delay-1' : 'reveal-delay-2';
    const savings = Math.round((1 - p.price / p.originalPrice) * 100);
    const badgeClass = p.badge === 'New' ? 'badge-new' : p.badge === 'Popular' || p.badge === 'Festive' ? 'badge-sale' : '';
    return `
      <article class="product-card reveal ${delay}" onclick="navigateTo('product', { id: ${p.id} })" tabindex="0" role="button" aria-label="View ${p.name}">
        <div class="product-img-wrap">
          ${p.badge ? `<span class="product-badge ${badgeClass}">${p.badge}</span>` : ''}
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
          <button class="product-overlay-btn" onclick="event.stopPropagation(); navigateTo('product', { id: ${p.id} })">View Product</button>
        </div>
        <div class="product-info">
          <p class="product-cat">${p.categoryLabel}</p>
          <p class="product-name">${p.name}</p>
          <p style="font-size:0.9rem; color:var(--mid); margin-bottom:8px; line-height:1.5;">${p.shortDescription}</p>
          <div class="product-price-row">
            <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
            <span class="product-price-original">₹${p.originalPrice.toLocaleString('en-IN')}</span>
            <span class="product-price-save">${savings}% off</span>
          </div>
        </div>
      </article>`;
  }).join('');

  // Observe new elements
  grid.querySelectorAll('.reveal').forEach(el => scrollObserver.observe(el));
}

// ──────────────────────────────────────────
// PRODUCT DETAIL RENDERER
// ──────────────────────────────────────────
let selectedSize = null;
let selectedQty = 1;

function renderProductDetail(id) {
  const p = getProductById(id);
  if (!p) { navigateTo('home'); return; }

  selectedSize = null;
  selectedQty = 1;

  const container = document.getElementById('product-detail-content');
  if (!container) return;

  const savings = Math.round((1 - p.price / p.originalPrice) * 100);
  const stockStatus = p.stock > 10 ? { label: 'In Stock', cls: '' }
    : p.stock > 0 ? { label: `Only ${p.stock} left!`, cls: 'low' }
    : { label: 'Out of Stock', cls: 'out' };

  const starsHTML = (rating, size = 16) => {
    let html = '<div class="stars">';
    for (let i = 1; i <= 5; i++) {
      html += `<svg class="star ${i > Math.round(rating) ? 'empty' : ''}" style="width:${size}px;height:${size}px" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    }
    html += '</div>';
    return html;
  };

  container.innerHTML = `
    <!-- Breadcrumb -->
    <div class="detail-back-bar">
      <div class="detail-breadcrumb">
        <a onclick="navigateTo('home')">Home</a>
        <span class="sep">›</span>
        <a onclick="navigateTo('home'); setTimeout(()=>document.getElementById('products').scrollIntoView({behavior:'smooth'}),400)">Collection</a>
        <span class="sep">›</span>
        <span>${p.name}</span>
      </div>
    </div>

    <div class="detail-grid">
      <!-- Gallery -->
      <div class="detail-gallery">
        <div class="gallery-main">
          <img id="gallery-main-img" src="${p.images[0]}" alt="${p.name}">
        </div>
        <div class="gallery-thumbs">
          ${p.images.map((img, i) => `
            <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="switchGalleryImg(${i}, this)" data-index="${i}">
              <img src="${img}" alt="${p.name} view ${i+1}" loading="lazy">
            </div>`).join('')}
        </div>
      </div>

      <!-- Info Panel -->
      <div class="detail-info">
        <p class="detail-cat">${p.categoryLabel}</p>
        <h1 class="detail-title">${p.name}</h1>

        <div class="rating-row">
          ${starsHTML(p.rating)}
          <span class="rating-count"><a href="#reviews-section">${p.rating} (${p.reviewCount} reviews)</a></span>
        </div>

        <div class="detail-price-block">
          <div class="detail-price-row">
            <span class="detail-price">₹${p.price.toLocaleString('en-IN')}</span>
            <span class="detail-original-price">₹${p.originalPrice.toLocaleString('en-IN')}</span>
            <span class="detail-savings">${savings}% off</span>
          </div>
          <div class="stock-badge">
            <span class="stock-dot ${stockStatus.cls}"></span>
            ${stockStatus.label}
          </div>
        </div>

        <!-- Sizes -->
        <div class="size-section">
          <div class="size-label">
            Select Size <span>Size Guide ↗</span>
          </div>
          <div class="size-chips">
            ${p.sizes.map(s => `
              <button class="size-chip ${p.availableSizes.includes(s) ? '' : 'unavailable'}"
                onclick="${p.availableSizes.includes(s) ? `selectSize('${s}', this)` : ''}"
                ${p.availableSizes.includes(s) ? '' : 'disabled'}>${s}</button>
            `).join('')}
          </div>
          <p id="size-error" style="color:var(--error);font-size:0.82rem;margin-top:0.5rem;display:none;">Please select a size to continue</p>
        </div>

        <!-- Quantity -->
        <div class="qty-section">
          <p class="qty-label">Quantity</p>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(-1)">−</button>
            <span class="qty-display" id="qty-display">1</span>
            <button class="qty-btn" onclick="changeQty(1)">+</button>
          </div>
        </div>

        <!-- CTA -->
        <div class="detail-cta">
          <div class="cta-row">
            <button class="btn-primary" onclick="handleAddToCart(${p.id})">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 8.59L5.25 16c-.16.28-.25.61-.25.96C5 18.1 6.1 19 7 19h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/></svg>
              Add to Cart
            </button>
            <button class="btn-accent" onclick="handleBuyNow(${p.id})">
              Buy Now
            </button>
          </div>
        </div>

        <!-- WhatsApp CTA -->
        <a href="https://wa.me/917907312845?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(p.name)}" 
           target="_blank" class="btn-ghost" style="margin-bottom:2rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Ask on WhatsApp
        </a>

        <!-- Accordions -->
        <div class="accordions">
          ${buildAccordion('Product Description', p.description.replace(/\n/g, '<br>'))}
          ${buildAccordion('Shipping & Returns', `
            <ul>
              <li>${p.shipping}</li>
              <li>Easy 7-day returns for unused items with tags intact.</li>
              <li>Custom orders are not eligible for returns.</li>
            </ul>`)}
          ${buildAccordion('Fabric & Care', `
            <ul>
              <li><strong>Fabric:</strong> ${p.fabric}</li>
              <li>${p.care}</li>
            </ul>`)}
        </div>
      </div>
    </div>`;

  // Reviews section
  renderReviews(p);

  // Related products
  renderRelatedProducts(p);
}

function buildAccordion(title, content) {
  return `
    <div class="accordion-item">
      <div class="accordion-header" onclick="toggleAccordion(this)">
        <span>${title}</span>
        <div class="accordion-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </div>
      </div>
      <div class="accordion-body">
        <p>${content}</p>
      </div>
    </div>`;
}

function toggleAccordion(header) {
  const item = header.parentElement;
  const body = item.querySelector('.accordion-body');
  const isOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.accordion-item.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.accordion-body').classList.remove('open');
  });
  if (!isOpen) {
    item.classList.add('open');
    body.classList.add('open');
  }
}

function switchGalleryImg(index, thumbEl) {
  const p = getProductById(currentProductId);
  if (!p) return;
  const mainImg = document.getElementById('gallery-main-img');
  if (mainImg) {
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = p.images[index];
      mainImg.style.opacity = '1';
    }, 200);
  }
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}

function selectSize(size, el) {
  selectedSize = size;
  document.querySelectorAll('.size-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  const err = document.getElementById('size-error');
  if (err) err.style.display = 'none';
}

function changeQty(delta) {
  selectedQty = Math.max(1, selectedQty + delta);
  const display = document.getElementById('qty-display');
  if (display) display.textContent = selectedQty;
}

function handleAddToCart(id) {
  if (!selectedSize) {
    const err = document.getElementById('size-error');
    if (err) { err.style.display = 'block'; }
    // Scroll to size section
    document.querySelector('.size-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  const added = addToCart(id, selectedSize, selectedQty);
  if (added) setTimeout(openCart, 400);
}

function handleBuyNow(id) {
  if (!selectedSize) {
    const err = document.getElementById('size-error');
    if (err) err.style.display = 'block';
    document.querySelector('.size-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  addToCart(id, selectedSize, selectedQty);
  goToCheckout();
}

// ──────────────────────────────────────────
// REVIEWS SECTION
// ──────────────────────────────────────────
function renderReviews(p) {
  const sec = document.getElementById('reviews-section');
  if (!sec) return;

  const starsHTML = (rating) => {
    let html = '<div class="stars">';
    for (let i = 1; i <= 5; i++) {
      html += `<svg class="star ${i > Math.round(rating) ? 'empty' : ''}" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    }
    return html + '</div>';
  };

  // Fake bar distribution based on rating
  const bars = [
    { star: 5, pct: 70 },
    { star: 4, pct: 20 },
    { star: 3, pct: 6 },
    { star: 2, pct: 3 },
    { star: 1, pct: 1 },
  ];

  sec.innerHTML = `
    <div class="reviews-section" id="reviews-section-inner">
      <div class="reveal">
        <p class="section-tag">What customers say</p>
        <h2>Customer <em>Reviews</em></h2>
      </div>
      <div class="reviews-grid">
        <div class="reviews-summary">
          <div class="review-avg">${p.rating}</div>
          <div class="review-avg-stars">${starsHTML(p.rating)}</div>
          <p class="review-total">Based on ${p.reviewCount} reviews</p>
          <div class="review-bars">
            ${bars.map(b => `
              <div class="review-bar-row">
                <span class="review-bar-label">${b.star}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <div class="review-bar-track"><div class="review-bar-fill" style="width:${b.pct}%"></div></div>
                <span class="review-bar-count" style="color:var(--mid);font-size:0.75rem;">${Math.round(p.reviewCount * b.pct / 100)}</span>
              </div>`).join('')}
          </div>
        </div>
        <div class="review-list">
          ${p.reviews.map(r => `
            <div class="review-card">
              <div class="review-header">
                ${starsHTML(r.rating)}
                <span class="review-author">${r.author}</span>
                <span class="review-date">${r.date}</span>
              </div>
              <p class="review-text">${r.text}</p>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

// ──────────────────────────────────────────
// RELATED PRODUCTS
// ──────────────────────────────────────────
function renderRelatedProducts(p) {
  const sec = document.getElementById('related-section');
  if (!sec) return;
  const related = getRelatedProducts(p, 3);

  sec.innerHTML = `
    <div class="related-section">
      <div class="reveal">
        <p class="section-tag">You might also love</p>
        <h2>Related <em>Styles</em></h2>
      </div>
      <div class="related-grid">
        ${related.map((rp, i) => {
          const savings = Math.round((1 - rp.price / rp.originalPrice) * 100);
          const delay = i === 0 ? '' : i === 1 ? 'reveal-delay-1' : 'reveal-delay-2';
          return `
            <article class="product-card reveal ${delay}" onclick="navigateTo('product', { id: ${rp.id} })">
              <div class="product-img-wrap">
                ${rp.badge ? `<span class="product-badge">${rp.badge}</span>` : ''}
                <img src="${rp.images[0]}" alt="${rp.name}" loading="lazy">
                <button class="product-overlay-btn" onclick="event.stopPropagation(); navigateTo('product', { id: ${rp.id} })">View Product</button>
              </div>
              <div class="product-info">
                <p class="product-cat">${rp.categoryLabel}</p>
                <p class="product-name">${rp.name}</p>
                <div class="product-price-row">
                  <span class="product-price">₹${rp.price.toLocaleString('en-IN')}</span>
                  <span class="product-price-original">₹${rp.originalPrice.toLocaleString('en-IN')}</span>
                  <span class="product-price-save">${savings}% off</span>
                </div>
              </div>
            </article>`;
        }).join('')}
      </div>
    </div>`;

  sec.querySelectorAll('.reveal').forEach(el => scrollObserver.observe(el));
}

// ──────────────────────────────────────────
// CHECKOUT RENDERER
// ──────────────────────────────────────────
let selectedPayment = 'upi';

function renderCheckout() {
  renderOrderSummary();
  // Reset payment selection
  selectedPayment = 'upi';
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.method === 'upi');
  });
  document.querySelectorAll('.card-fields').forEach(f => f.classList.remove('visible'));
}

function renderOrderSummary() {
  const container = document.getElementById('order-summary-items');
  const totals = document.getElementById('order-summary-totals');
  if (!container || !totals) return;

  const subtotal = getCartTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const grand = subtotal + shipping + tax;

  if (cart.length === 0) {
    container.innerHTML = '<p style="color:var(--light);font-size:0.9rem;text-align:center;padding:1rem 0;">No items in cart</p>';
    totals.innerHTML = '';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="order-item">
      <div class="order-item-img">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <span class="order-item-qty-badge">${item.qty}</span>
      </div>
      <div class="order-item-info">
        <p class="order-item-name">${item.name}</p>
        <p class="order-item-size">Size: ${item.size}</p>
      </div>
      <span class="order-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
    </div>`).join('');

  totals.innerHTML = `
    <div class="order-totals">
      <div class="order-total-row">
        <span>Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span>
      </div>
      <div class="order-total-row">
        <span>Shipping</span>
        <span>${shipping === 0 ? '<span style="color:var(--accent)">Free</span>' : '₹' + shipping}</span>
      </div>
      <div class="order-total-row">
        <span>Tax (5% GST)</span><span>₹${tax.toLocaleString('en-IN')}</span>
      </div>
      <div class="order-total-row grand">
        <span>Total</span><span>₹${grand.toLocaleString('en-IN')}</span>
      </div>
    </div>`;
}

function selectPayment(method, el) {
  selectedPayment = method;
  document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
  el.classList.add('selected');
  document.querySelectorAll('.card-fields').forEach(f => f.classList.remove('visible'));
  if (method === 'card') {
    document.getElementById('card-fields')?.classList.add('visible');
  }
}

function handlePlaceOrder(e) {
  e.preventDefault();
  const form = document.getElementById('checkout-form');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  if (cart.length === 0) {
    showToast('Your cart is empty!', '🛒');
    return;
  }
  // Generate fake order ID
  const orderId = 'ALR' + Date.now().toString().slice(-6);
  document.getElementById('order-id-display').textContent = '#' + orderId;

  // Open success modal
  const overlay = document.getElementById('success-overlay');
  overlay.classList.add('open');

  // Clear cart
  cart = [];
  saveCart();
  updateCartUI();
}

function closeSuccessModal() {
  document.getElementById('success-overlay').classList.remove('open');
  navigateTo('home');
}

// ──────────────────────────────────────────
// TOAST NOTIFICATION
// ──────────────────────────────────────────
function showToast(message, icon = '✓') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;
  container.appendChild(toast);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

// ──────────────────────────────────────────
// SCROLL ANIMATION OBSERVER
// ──────────────────────────────────────────
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

// ──────────────────────────────────────────
// CAROUSEL (HORIZONTAL PRODUCTS)
// ──────────────────────────────────────────
function scrollCarousel(dir) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  // Scroll by one card width + gap
  const card = grid.querySelector('.product-card');
  const cardWidth = card ? card.offsetWidth + 28 : 320; // 28 ≈ gap
  grid.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
}

function updateCarouselState() {
  const grid = document.getElementById('products-grid');
  const prev = document.getElementById('carousel-prev');
  const next = document.getElementById('carousel-next');
  const dotsEl = document.getElementById('carousel-dots');
  if (!grid) return;

  const cards = grid.querySelectorAll('.product-card');
  const total = cards.length;
  if (total === 0) return;

  // Arrow disabled states
  if (prev) prev.disabled = grid.scrollLeft <= 4;
  if (next) next.disabled = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 4;

  // Update dots
  if (dotsEl && total > 0) {
    // Figure out which card is most visible
    const scrollPos = grid.scrollLeft;
    const card = cards[0];
    const cardW = card.offsetWidth + 28;
    const activeIndex = Math.round(scrollPos / cardW);

    dotsEl.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === activeIndex ? ' active' : '');
      dot.setAttribute('aria-label', `Go to product ${i + 1}`);
      dot.addEventListener('click', () => {
        grid.scrollTo({ left: i * cardW, behavior: 'smooth' });
      });
      dotsEl.appendChild(dot);
    });
  }
}

function initCarousel() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  // Scroll listener for arrow / dot state
  grid.addEventListener('scroll', updateCarouselState, { passive: true });

  // Drag to scroll (mouse)
  let isDown = false, startX = 0, scrollStart = 0;
  grid.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - grid.offsetLeft;
    scrollStart = grid.scrollLeft;
    grid.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', () => {
    isDown = false;
    grid.style.cursor = 'grab';
  });
  grid.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - grid.offsetLeft;
    grid.scrollLeft = scrollStart - (x - startX);
  });

  // Initial state
  updateCarouselState();
}

// ──────────────────────────────────────────
// INITIALIZATION
// ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Load persisted cart
  loadCart();

  // Initial product grid
  renderProductsGrid('all');
  // Init carousel after grid is populated
  initCarousel();
  updateCarouselState();

  // Observe scroll animations
  document.querySelectorAll('.reveal, .zoom-in').forEach(el => scrollObserver.observe(el));

  // Trigger hero animations immediately
  document.querySelectorAll('#view-home .reveal, #view-home .zoom-in').forEach(el => {
    el.classList.add('active');
  });

  // Nav scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav && nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile hamburger
  document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
    document.getElementById('hamburger').classList.toggle('open');
  });

  // Category filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderProductsGrid(this.dataset.cat);
      // Reset scroll to start and re-init carousel dots
      const grid = document.getElementById('products-grid');
      if (grid) grid.scrollLeft = 0;
      setTimeout(updateCarouselState, 50);
    });
  });

  // Cart overlay click to close
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);

  // Update badge and cart UI
  updateCartUI();

  // Handle browser back
  window.addEventListener('popstate', (e) => {
    if (!e.state || e.state.view === undefined) navigateTo('home');
    else if (e.state.view === 'product') navigateTo('product', { id: e.state.id });
    else if (e.state.view === 'checkout') navigateTo('checkout');
  });
});
