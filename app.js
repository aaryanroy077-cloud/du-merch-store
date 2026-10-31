// Delhi University Merch Store - Main Application Logic
// Minimalist Editorial Architecture (Inspired by Zara / H&M)

const STORE_CONFIG = {
  brandName: "University Merch",
  brandSubtitle: "Original DU Apparel",
  whatsappNumber: "919876543210", // <--- UPDATE WITH YOUR REAL NUMBER!
  instagramHandle: "@universitymerch.in",
  deliveryCampuses: "Express delivery across North Campus, South Campus, and Pan-India",
  promoCodes: {
    "DU2026": { discountType: "flat", value: 100, minOrder: 500, desc: "₹100 Off on orders above ₹500" },
    "FESTVIBES": { discountType: "percent", value: 15, minOrder: 1000, desc: "15% Fest Season Discount" },
    "FREESHIP": { discountType: "shipping", value: 0, minOrder: 0, desc: "Free Campus Delivery" }
  }
};

// Application State
let appState = {
  activeTab: "all",
  activeCampusFilter: "all",
  selectedCollegeId: "all",
  searchQuery: "",
  collegeSearchQuery: "",
  cart: [],
  appliedPromo: null
};

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  initCollegeDropdowns();
  initCollegeDirectory();
  initSocietyQuoteForm();
  renderProducts();
  updateCartUI();
  setupEventListeners();
  renderReviews();
});

// ==========================================
// 📦 LOCAL STORAGE
// ==========================================
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("du_merch_cart");
    if (saved) appState.cart = JSON.parse(saved);
  } catch (e) {
    appState.cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem("du_merch_cart", JSON.stringify(appState.cart));
  } catch (e) {}
}

// ==========================================
// 🎓 ALL COLLEGES DIRECTORY (CLICKABLE ICONS)
// ==========================================
function initCollegeDropdowns() {
  const quoteCollegeSelect = document.getElementById("quoteCollegeSelect");
  if (quoteCollegeSelect && typeof DU_COLLEGES !== "undefined") {
    quoteCollegeSelect.innerHTML = `<option value="">Select your College...</option>`;
    DU_COLLEGES.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.name;
      opt.textContent = `${c.name} (${c.campus})`;
      quoteCollegeSelect.appendChild(opt);
    });
  }
}

function filterCollegeDirectoryByCampus(campus) {
  appState.activeCampusFilter = campus;
  document.querySelectorAll(".campus-tab-btn").forEach(btn => {
    if (btn.dataset.campus === campus) {
      btn.className = "campus-tab-btn px-4 py-2 text-xs font-bold bg-black text-white rounded-full transition-all";
    } else {
      btn.className = "campus-tab-btn px-4 py-2 text-xs font-medium text-neutral-600 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-full transition-all";
    }
  });
  renderCollegeDirectory();
}

function initCollegeDirectory() {
  const searchInput = document.getElementById("collegeDirectorySearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      appState.collegeSearchQuery = e.target.value.toLowerCase().trim();
      renderCollegeDirectory();
    });
  }
  renderCollegeDirectory();
}

function renderCollegeDirectory() {
  const container = document.getElementById("collegeIconsGrid");
  const countEl = document.getElementById("collegesCountBadge");
  if (!container || typeof DU_COLLEGES === "undefined") return;

  let filtered = DU_COLLEGES.filter(c => {
    // Campus filter
    if (appState.activeCampusFilter !== "all" && c.campus !== appState.activeCampusFilter) {
      return false;
    }
    // Search query
    if (appState.collegeSearchQuery) {
      const q = appState.collegeSearchQuery;
      const match = c.name.toLowerCase().includes(q) || 
                    c.shortName.toLowerCase().includes(q) || 
                    c.campus.toLowerCase().includes(q) ||
                    c.monogram.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  if (countEl) {
    countEl.textContent = `${filtered.length} Colleges Available`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-neutral-400">
        <p class="text-xs uppercase tracking-widest">No college matching "${appState.collegeSearchQuery}"</p>
        <button onclick="appState.collegeSearchQuery=''; document.getElementById('collegeDirectorySearch').value=''; renderCollegeDirectory();" class="mt-2 text-xs font-bold text-black underline">
          Reset Search
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(c => {
    const isActive = appState.selectedCollegeId === c.id;
    return `
      <button 
        type="button" 
        onclick="selectCollege('${c.id}')" 
        class="college-icon-tile p-4 rounded-2xl flex flex-col items-center justify-between text-center group cursor-pointer ${isActive ? 'is-active' : ''}"
        title="View ${c.name} Collection"
      >
        <!-- College Logo / Crest Icon -->
        <div class="w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
          ${getCollegeLogoSVG(c, 56)}
        </div>

        <!-- College Acronym & Name -->
        <div class="w-full">
          <div class="font-extrabold text-sm tracking-tight leading-snug group-hover:underline">
            ${c.shortName}
          </div>
          <div class="text-[11px] text-neutral-400 font-normal truncate mt-0.5" title="${c.name}">
            ${c.name}
          </div>
        </div>

        <!-- Campus Pill -->
        <div class="mt-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
          isActive 
            ? 'bg-neutral-800 text-white' 
            : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200'
        }">
          ${c.campus.replace(" Campus", "")}
        </div>
      </button>
    `;
  }).join('');
}

function selectCollege(collegeId) {
  appState.selectedCollegeId = collegeId;
  renderCollegeDirectory();

  // 🚀 Start 2D Custom Mockup Studio with selected College!
  if (typeof VISUALIZER_STATE !== "undefined") {
    const col = DU_COLLEGES.find(c => c.id === collegeId) || DU_COLLEGES[0];
    if (col) {
      VISUALIZER_STATE.collegeId = col.id;
      VISUALIZER_STATE.collegeName = col.name;
      VISUALIZER_STATE.collegeShort = col.shortName.toUpperCase();
      
      if (col.primaryColor && col.primaryColor !== "#09090b") {
        VISUALIZER_STATE.baseColor = col.primaryColor;
      }
      if (col.accentColor) {
        VISUALIZER_STATE.accentColor = col.accentColor;
      }

      const colSelect = document.getElementById("visCollegeSelect");
      if (colSelect) colSelect.value = col.id;

      if (typeof initVisualizerControls === "function") {
        initVisualizerControls();
      }
      if (typeof renderJerseyMockup === "function") {
        renderJerseyMockup();
      }

      // Smoothly scroll down straight to the Custom Mockup Studio
      const studio = document.getElementById("mockupStudioSection") || document.getElementById("jerseyStudioSection");
      if (studio) {
        studio.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (typeof showToast === "function") {
        showToast(`✨ Loaded ${col.name} in Mockup Studio!`);
      }
    }
  }
}

// ==========================================
// 👕 MINIMALIST PRODUCT CATALOG
// ==========================================
function setTab(tab) {
  appState.activeTab = tab;
  document.querySelectorAll(".tab-btn").forEach(btn => {
    if (btn.dataset.tab === tab) {
      btn.className = "tab-btn px-4 py-2 text-xs font-bold bg-black text-white rounded-full transition-all";
    } else {
      btn.className = "tab-btn px-4 py-2 text-xs font-medium text-neutral-600 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-full transition-all";
    }
  });
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById("productsGrid");
  const countSpan = document.getElementById("productsCount");
  if (!container || typeof PRODUCTS === "undefined") return;

  let filtered = PRODUCTS.filter(p => {
    // Search query
    if (appState.searchQuery) {
      const q = appState.searchQuery.toLowerCase();
      const match = p.title.toLowerCase().includes(q) ||
                    p.collegeName.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.type.toLowerCase().includes(q);
      if (!match) return false;
    }

    // College selector
    if (appState.selectedCollegeId !== "all") {
      if (p.collegeId !== appState.selectedCollegeId && p.category !== "society") {
        return false;
      }
    }

    // Category Tabs
    if (appState.activeTab === "common") return p.category === "common";
    if (appState.activeTab === "college") return p.category === "college";
    if (appState.activeTab === "society") return p.category === "society";
    if (appState.activeTab === "north") return p.campus === "North Campus";
    if (appState.activeTab === "south") return p.campus === "South Campus";

    return true;
  });

  if (countSpan) {
    const selCol = DU_COLLEGES.find(c => c.id === appState.selectedCollegeId);
    if (selCol) {
      countSpan.innerHTML = `Showing <strong class="text-black">${filtered.length} items</strong> for <strong>${selCol.name}</strong> • <button onclick="selectCollege('all')" class="underline hover:text-black ml-1">Clear Filter</button>`;
    } else {
      countSpan.textContent = `${filtered.length} pieces available`;
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-20 text-center bg-neutral-50 rounded-2xl border border-neutral-200">
        <p class="text-xs uppercase tracking-widest text-neutral-400">No items found for this selection</p>
        <p class="text-sm font-medium text-neutral-700 mt-1 max-w-sm mx-auto">
          Want a custom piece designed for your college or society?
        </p>
        <button onclick="openSocietyQuoteModal()" class="mt-4 px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-all">
          Request Custom Society Drop
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const isSociety = p.category === "society";

    return `
      <div class="product-minimal-card flex flex-col justify-between group">
        <div>
          <!-- Clean Photography Box -->
          <div class="relative aspect-[3/4] w-full bg-neutral-100 overflow-hidden rounded-xl border border-neutral-200">
            <img 
              src="${p.image}" 
              alt="${p.title}" 
              class="product-img w-full h-full object-cover"
              loading="lazy"
            />

            <!-- Editorial Tag -->
            <div class="absolute top-3 left-3 flex flex-col gap-1 items-start">
              <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-black/80 text-white backdrop-blur-xs rounded">
                ${p.collegeName}
              </span>
              ${p.badge ? `
                <span class="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-white text-black border border-neutral-200 rounded">
                  ${p.badge}
                </span>
              ` : ''}
            </div>
          </div>

          <!-- Editorial Details -->
          <div class="pt-4 pb-2">
            <div class="text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
              ${p.type} • ${p.campus}
            </div>
            
            <h3 class="text-sm font-bold text-neutral-900 group-hover:text-black line-clamp-1">
              ${p.title}
            </h3>

            <p class="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
              ${p.description}
            </p>

            <!-- Size Selector for Retail -->
            ${!isSociety ? `
              <div class="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span class="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Size:</span>
                <div class="flex gap-1" id="size-group-${p.id}">
                  ${['S', 'M', 'L', 'XL'].map((sz, idx) => `
                    <button 
                      type="button"
                      onclick="selectProductSize('${p.id}', '${sz}')"
                      id="size-btn-${p.id}-${sz}"
                      class="size-pill-${p.id} w-7 h-7 text-[11px] font-bold rounded-md border flex items-center justify-center transition-all ${
                        idx === 1 
                          ? 'border-black bg-black text-white' 
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                      }"
                    >
                      ${sz}
                    </button>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Pricing & Button -->
        <div class="pt-2">
          <div class="flex items-baseline justify-between mb-3">
            <div class="flex items-baseline gap-2">
              <span class="text-base font-extrabold text-black">
                ₹${p.price.toLocaleString("en-IN")}
              </span>
              <span class="text-xs text-neutral-400 line-through">
                ₹${p.originalPrice.toLocaleString("en-IN")}
              </span>
            </div>
            ${isSociety ? `
              <span class="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                Bulk Quote
              </span>
            ` : ''}
          </div>

          ${isSociety ? `
            <button 
              onclick="prefillSocietyQuote('${p.title}', '${p.type}')"
              class="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider btn-minimal-black text-center"
            >
              Get Society WhatsApp Quote 💬
            </button>
          ` : `
            <button 
              onclick="addToCart('${p.id}')"
              class="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider btn-minimal-black text-center"
            >
              Add to Bag 🛍️
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');
}

// Track selected size for each product card
const productSelectedSizes = {};
function selectProductSize(productId, size) {
  productSelectedSizes[productId] = size;
  document.querySelectorAll(`.size-pill-${productId}`).forEach(btn => {
    btn.className = `size-pill-${productId} w-7 h-7 text-[11px] font-bold rounded-md border flex items-center justify-center transition-all border-neutral-200 text-neutral-700 hover:border-neutral-400`;
  });
  const activeBtn = document.getElementById(`size-btn-${productId}-${size}`);
  if (activeBtn) {
    activeBtn.className = `size-pill-${productId} w-7 h-7 text-[11px] font-bold rounded-md border flex items-center justify-center transition-all border-black bg-black text-white`;
  }
}

// ==========================================
// 🛍️ CART MANAGEMENT
// ==========================================
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const chosenSize = productSelectedSizes[productId] || "M";
  const cartItemId = `${productId}-${chosenSize}`;
  const existingItem = appState.cart.find(item => item.cartItemId === cartItemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    appState.cart.push({
      cartItemId: cartItemId,
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      collegeName: product.collegeName,
      size: chosenSize,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`Added ${product.title} (${chosenSize}) to bag`);
  openCartDrawer();
}

function updateCartItemQuantity(cartItemId, delta) {
  const item = appState.cart.find(i => i.cartItemId === cartItemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    appState.cart = appState.cart.filter(i => i.cartItemId !== cartItemId);
  }

  saveCartToStorage();
  updateCartUI();
}

function removeCartItem(cartItemId) {
  appState.cart = appState.cart.filter(i => i.cartItemId !== cartItemId);
  saveCartToStorage();
  updateCartUI();
  showToast("Item removed from bag");
}

function updateCartUI() {
  const countBadges = document.querySelectorAll(".cart-count-badge");
  const totalQuantity = appState.cart.reduce((sum, item) => sum + item.quantity, 0);

  countBadges.forEach(badge => {
    badge.textContent = totalQuantity;
    badge.style.display = totalQuantity > 0 ? "inline-flex" : "none";
  });

  const cartItemsList = document.getElementById("cartItemsList");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartDiscountEl = document.getElementById("cartDiscount");
  const cartTotalEl = document.getElementById("cartTotal");
  const emptyCartState = document.getElementById("emptyCartState");
  const cartFooter = document.getElementById("cartFooter");

  if (!cartItemsList) return;

  if (appState.cart.length === 0) {
    cartItemsList.innerHTML = "";
    if (emptyCartState) emptyCartState.classList.remove("hidden");
    if (cartFooter) cartFooter.classList.add("hidden");
    return;
  }

  if (emptyCartState) emptyCartState.classList.add("hidden");
  if (cartFooter) cartFooter.classList.remove("hidden");

  const subtotal = appState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  let discountAmount = 0;

  if (appState.appliedPromo) {
    const promo = STORE_CONFIG.promoCodes[appState.appliedPromo];
    if (promo && subtotal >= promo.minOrder) {
      discountAmount = promo.discountType === "flat" ? promo.value : Math.round((subtotal * promo.value) / 100);
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
  if (cartDiscountEl) cartDiscountEl.textContent = discountAmount > 0 ? `-₹${discountAmount.toLocaleString("en-IN")}` : `₹0`;
  if (cartTotalEl) cartTotalEl.textContent = `₹${finalTotal.toLocaleString("en-IN")}`;

  cartItemsList.innerHTML = appState.cart.map(item => `
    <div class="flex items-center gap-3 py-3 border-b border-neutral-100">
      <img src="${item.image}" alt="${item.title}" class="w-14 h-18 object-cover rounded-md border border-neutral-200" />
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-neutral-900 truncate">${item.title}</h4>
        <div class="text-[11px] text-neutral-400 mt-0.5">
          <span>${item.collegeName}</span> • <span class="font-semibold text-black">${item.size}</span>
        </div>
        <div class="text-xs font-bold text-black mt-1">₹${item.price.toLocaleString("en-IN")}</div>
      </div>
      <div class="flex items-center border border-neutral-200 rounded-md overflow-hidden bg-neutral-50">
        <button onclick="updateCartItemQuantity('${item.cartItemId}', -1)" class="px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-200 font-bold">-</button>
        <span class="px-2 py-1 text-xs font-bold text-neutral-900">${item.quantity}</span>
        <button onclick="updateCartItemQuantity('${item.cartItemId}', 1)" class="px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-200 font-bold">+</button>
      </div>
      <button onclick="removeCartItem('${item.cartItemId}')" class="text-neutral-400 hover:text-black text-sm p-1">✕</button>
    </div>
  `).join('');
}

function applyPromoCode() {
  const input = document.getElementById("promoCodeInput");
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (STORE_CONFIG.promoCodes[code]) {
    appState.appliedPromo = code;
    updateCartUI();
    showToast(`Code ${code} applied`);
  } else {
    showToast("Invalid code. Try 'DU2026'");
  }
}

// WhatsApp Checkout
function checkoutViaWhatsApp() {
  if (appState.cart.length === 0) {
    showToast("Bag is empty");
    return;
  }

  const subtotal = appState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  let discountAmount = 0;
  if (appState.appliedPromo) {
    const promo = STORE_CONFIG.promoCodes[appState.appliedPromo];
    if (promo) {
      discountAmount = promo.discountType === "flat" ? promo.value : Math.round((subtotal * promo.value) / 100);
    }
  }
  const total = Math.max(0, subtotal - discountAmount);

  let message = `*🎓 NEW ORDER - ${STORE_CONFIG.brandName.toUpperCase()} (ORIGINAL)*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Items:*\n`;

  appState.cart.forEach((item, idx) => {
    message += `${idx + 1}. *${item.title}*\n`;
    message += `   • Size: ${item.size} | Qty: ${item.quantity}\n`;
    message += `   • Price: ₹${item.price * item.quantity}\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Total Amount:* ₹${total}\n\n`;
  message += `*Student Details:*\n`;
  message += `• Name: [Name]\n`;
  message += `• DU College / Campus: [College / Hostel]\n`;
  message += `• Phone: [Phone]\n`;
  message += `• Mode: UPI / GPay / COD\n\n`;
  message += `_Please confirm my order and share delivery schedule!_`;

  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Society Quote Engine
function initSocietyQuoteForm() {
  const societyTypeSelect = document.getElementById("quoteSocietyType");
  if (societyTypeSelect && typeof SOCIETY_TYPES !== "undefined") {
    societyTypeSelect.innerHTML = `<option value="">Select Domain...</option>`;
    SOCIETY_TYPES.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      societyTypeSelect.appendChild(opt);
    });
  }

  const qtyInput = document.getElementById("quoteQuantity");
  if (qtyInput) qtyInput.addEventListener("input", updateQuoteEstimator);
  const apparelInput = document.getElementById("quoteApparelType");
  if (apparelInput) apparelInput.addEventListener("change", updateQuoteEstimator);
  updateQuoteEstimator();
}

function updateQuoteEstimator() {
  const qtyInput = document.getElementById("quoteQuantity");
  const apparelSelect = document.getElementById("quoteApparelType");
  const estRateEl = document.getElementById("estimatedRatePerPiece");
  const discountPillEl = document.getElementById("bulkDiscountPill");

  if (!qtyInput || !estRateEl) return;

  const qty = parseInt(qtyInput.value) || 25;
  const apparel = apparelSelect ? apparelSelect.value : "jersey";

  let baseRate = 449;
  if (apparel === "jersey") baseRate = 449;
  else if (apparel === "hoodie") baseRate = 899;
  else if (apparel === "cotton-tee") baseRate = 299;
  else if (apparel === "varsity") baseRate = 1499;

  let discountPercent = 0;
  if (qty >= 100) discountPercent = 25;
  else if (qty >= 50) discountPercent = 18;
  else if (qty >= 30) discountPercent = 10;

  const finalRate = Math.round(baseRate * (1 - (discountPercent / 100)));
  estRateEl.textContent = `₹${finalRate}/pc`;
  if (discountPillEl) {
    discountPillEl.textContent = discountPercent > 0 
      ? `${discountPercent}% Bulk Tier Applied` 
      : `Order 30+ for 10% off, 50+ for 18% off`;
  }
}

function prefillSocietyQuote(title, type) {
  openSocietyQuoteModal();
  const apparelSelect = document.getElementById("quoteApparelType");
  if (apparelSelect) {
    if (type.includes("Jersey")) apparelSelect.value = "jersey";
    else if (type.includes("Hoodie")) apparelSelect.value = "hoodie";
    else if (type.includes("T-Shirt")) apparelSelect.value = "cotton-tee";
    else if (type.includes("Jacket")) apparelSelect.value = "varsity";
  }
  updateQuoteEstimator();
}

function submitSocietyQuoteToWhatsApp(e) {
  if (e) e.preventDefault();

  const college = document.getElementById("quoteCollegeSelect")?.value || "Delhi University";
  const societyName = document.getElementById("quoteSocietyName")?.value || "Society Team";
  const societyType = document.getElementById("quoteSocietyType")?.value || "College Society";
  const apparelType = document.getElementById("quoteApparelType")?.selectedOptions[0]?.text || "Custom Sublimation Jersey";
  const quantity = document.getElementById("quoteQuantity")?.value || "25";
  const customNotes = document.getElementById("quoteNotes")?.value || "Custom logos and back names/numbers required.";
  const deadline = document.getElementById("quoteDeadline")?.value || "Fest Season";

  let message = `*⚡ NEW CUSTOM SOCIETY QUOTE REQUEST*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Brand:* UNIVERSITY MERCH (ORIGINAL)\n`;
  message += `*College:* ${college}\n`;
  message += `*Society / Club:* ${societyName}\n`;
  message += `*Society Domain:* ${societyType}\n`;
  message += `*Apparel Required:* ${apparelType}\n`;
  message += `*Quantity:* ${quantity} Pieces\n`;
  message += `*Delivery Deadline:* ${deadline}\n`;
  message += `*Notes:*\n${customNotes}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `_Hi Team! Please share digital mockups, sizing kit, and bulk quote._`;

  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  closeSocietyQuoteModal();
  showToast("Opening WhatsApp with quote details");
}

// UI Modals & Helpers
function openCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  if (drawer) drawer.classList.remove("hidden");
}
function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  if (drawer) drawer.classList.add("hidden");
}

function openSocietyQuoteModal() {
  const modal = document.getElementById("societyQuoteModal");
  if (modal) modal.classList.remove("hidden");
}
function closeSocietyQuoteModal() {
  const modal = document.getElementById("societyQuoteModal");
  if (modal) modal.classList.add("hidden");
}

function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const toastMsg = document.getElementById("toastMessage");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove("translate-y-24", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.add("translate-y-24", "opacity-0");
    toast.classList.remove("translate-y-0", "opacity-100");
  }, 3000);
}

function renderReviews() {
  const container = document.getElementById("reviewsContainer");
  if (!container || typeof REVIEWS === "undefined") return;

  container.innerHTML = REVIEWS.map(r => `
    <div class="p-6 rounded-2xl border border-neutral-200 bg-white flex flex-col justify-between">
      <div>
        <div class="text-xs text-neutral-400 font-bold mb-3 tracking-widest uppercase">Verified Order</div>
        <p class="text-xs text-neutral-700 leading-relaxed italic">"${r.quote}"</p>
      </div>
      <div class="mt-4 pt-4 border-t border-neutral-100">
        <div class="text-xs font-bold text-black">${r.name}</div>
        <div class="text-[11px] text-neutral-400 mt-0.5">${r.role} • <strong>${r.college}</strong></div>
      </div>
    </div>
  `).join('');
}

function setupEventListeners() {
  const searchInput = document.getElementById("globalSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      appState.collegeSearchQuery = e.target.value.toLowerCase().trim();
      const dirInput = document.getElementById("collegeDirectorySearch");
      if (dirInput) dirInput.value = e.target.value;
      renderCollegeDirectory();
    });
  }
}
