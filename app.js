// Delhi University Merch Store - Main Application Logic
// For questions or customizations: easily edit this file!

// ==========================================
// 📱 CONFIGURATION: SET YOUR WHATSAPP NUMBER HERE!
// Replace with your 10-digit WhatsApp phone number with 91 country code
// ==========================================
const STORE_CONFIG = {
  brandName: "University Merch",
  whatsappNumber: "919876543210", // <--- UPDATE THIS TO YOUR REAL NUMBER!
  instagramHandle: "@du.merch.official",
  deliveryCampuses: "North Campus, South Campus, and Pan-India Delivery",
  promoCodes: {
    "DU2026": { discountType: "flat", value: 100, minOrder: 500, desc: "₹100 Off on orders above ₹500" },
    "FESTVIBES": { discountType: "percent", value: 15, minOrder: 1000, desc: "15% Fest Season Discount" },
    "FREESHIP": { discountType: "shipping", value: 0, minOrder: 0, desc: "Free Campus Delivery" }
  }
};

// ==========================================
// 🛒 APPLICATION STATE
// ==========================================
let appState = {
  activeTab: "all",
  activeCampus: "all",
  selectedCollegeId: "all",
  searchQuery: "",
  cart: [],
  appliedPromo: null,
  activeProductModal: null
};

// ==========================================
// 🚀 INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  initCollegeDropdowns();
  initCollegePills();
  initSocietyQuoteForm();
  renderProducts();
  updateCartUI();
  setupEventListeners();
  renderReviews();
});

// ==========================================
// 📦 LOCAL STORAGE (Cart Persistence)
// ==========================================
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("du_merch_cart");
    if (saved) {
      appState.cart = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Could not load cart", e);
    appState.cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem("du_merch_cart", JSON.stringify(appState.cart));
  } catch (e) {
    console.error("Could not save cart", e);
  }
}

// ==========================================
// 🏫 COLLEGE LIST & DROPDOWNS
// ==========================================
function initCollegeDropdowns() {
  const navSelect = document.getElementById("navCollegeSelect");
  const quoteCollegeSelect = document.getElementById("quoteCollegeSelect");

  if (navSelect) {
    navSelect.innerHTML = `<option value="all">🎓 All DU Colleges (${DU_COLLEGES.length})</option>`;
    DU_COLLEGES.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = `${c.shortName} (${c.campus})`;
      navSelect.appendChild(opt);
    });

    navSelect.addEventListener("change", (e) => {
      appState.selectedCollegeId = e.target.value;
      if (e.target.value !== "all") {
        appState.activeTab = "college";
      }
      renderProducts();
    });
  }

  if (quoteCollegeSelect) {
    quoteCollegeSelect.innerHTML = `<option value="">Select your College...</option>`;
    DU_COLLEGES.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.name;
      opt.textContent = `${c.name} (${c.campus})`;
      quoteCollegeSelect.appendChild(opt);
    });
  }
}

function initCollegePills() {
  const container = document.getElementById("collegePillsContainer");
  if (!container) return;

  container.innerHTML = `
    <button onclick="filterByCollege('all')" class="college-pill px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${appState.selectedCollegeId === 'all' ? 'bg-amber-500 text-white border-amber-600 shadow' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}">
      ✨ All Colleges
    </button>
  `;

  DU_COLLEGES.forEach(c => {
    const isSelected = appState.selectedCollegeId === c.id;
    const btn = document.createElement("button");
    btn.onclick = () => filterByCollege(c.id);
    btn.className = `college-pill px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
      isSelected 
        ? 'bg-slate-900 text-white border-slate-900 shadow' 
        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
    }`;
    btn.innerHTML = `<span class="inline-block w-2 h-2 rounded-full mr-1.5" style="background-color: ${c.color}"></span>${c.shortName}`;
    container.appendChild(btn);
  });
}

function filterByCollege(collegeId) {
  appState.selectedCollegeId = collegeId;
  const navSelect = document.getElementById("navCollegeSelect");
  if (navSelect) navSelect.value = collegeId;

  if (collegeId === "all") {
    appState.activeTab = "all";
  } else {
    appState.activeTab = "college";
  }
  initCollegePills();
  renderProducts();
}

// ==========================================
// 👕 PRODUCT RENDERING & FILTERING
// ==========================================
function setTab(tab) {
  appState.activeTab = tab;
  if (tab === "all") {
    appState.selectedCollegeId = "all";
    const navSelect = document.getElementById("navCollegeSelect");
    if (navSelect) navSelect.value = "all";
  }
  document.querySelectorAll(".tab-btn").forEach(btn => {
    if (btn.dataset.tab === tab) {
      btn.className = "tab-btn px-4 py-2 rounded-lg text-sm font-bold bg-[#800020] text-white shadow-sm transition-all";
    } else {
      btn.className = "tab-btn px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all";
    }
  });
  initCollegePills();
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById("productsGrid");
  const countSpan = document.getElementById("productsCount");
  if (!container) return;

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

    // Tab filter
    if (appState.activeTab === "common") {
      return p.category === "common";
    } else if (appState.activeTab === "college") {
      return p.category === "college";
    } else if (appState.activeTab === "society") {
      return p.category === "society";
    } else if (appState.activeTab === "north") {
      return p.campus === "North Campus";
    } else if (appState.activeTab === "south") {
      return p.campus === "South Campus";
    }

    return true;
  });

  if (countSpan) {
    countSpan.textContent = `${filtered.length} products found`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
        <div class="text-5xl mb-3">🔍</div>
        <h3 class="text-xl font-bold text-slate-800">No merchandise found</h3>
        <p class="text-sm text-slate-500 mt-1 max-w-md mx-auto">
          We are adding more DU colleges and designs daily! Want your college or society added?
        </p>
        <button onclick="openSocietyQuoteModal()" class="mt-4 px-5 py-2.5 rounded-xl bg-[#800020] text-white text-sm font-semibold hover:bg-[#580016] transition-all">
          Request Custom Society Merch
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const isSociety = p.category === "society";
    const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

    return `
      <div class="product-card bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between group">
        <div>
          <!-- Product Image & Badges -->
          <div class="relative w-full h-64 bg-slate-100 overflow-hidden">
            <img 
              src="${p.image}" 
              alt="${p.title}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            
            <!-- Campus / College Badge -->
            <div class="absolute top-3 left-3 flex flex-col gap-1.5">
              <span class="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-sm">
                ${p.collegeName}
              </span>
              ${p.badge ? `
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isSociety ? 'bg-amber-500 text-white' : 'bg-[#800020] text-white'
                }">
                  ${p.badge}
                </span>
              ` : ''}
            </div>

            <!-- Discount pill -->
            ${discount > 0 && !isSociety ? `
              <div class="absolute top-3 right-3 px-2 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow">
                ${discount}% OFF
              </div>
            ` : ''}
          </div>

          <!-- Product Details -->
          <div class="p-5">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>${p.type}</span>
              <span class="font-medium text-slate-600">${p.campus}</span>
            </div>
            
            <h3 class="text-base font-bold text-slate-900 group-hover:text-[#800020] transition-colors line-clamp-1">
              ${p.title}
            </h3>

            <p class="text-xs text-slate-500 mt-1.5 line-clamp-2">
              ${p.description}
            </p>

            <div class="mt-2 text-[11px] text-slate-400 font-medium">
              🧵 ${p.fabric}
            </div>

            <!-- Size Selector (For standard retail merch) -->
            ${!isSociety ? `
              <div class="mt-4 pt-3 border-t border-slate-100">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-xs font-semibold text-slate-700">Select Size:</span>
                  <span class="text-[11px] text-slate-400">Standard Fit</span>
                </div>
                <div class="flex gap-1.5" id="size-group-${p.id}">
                  ${['S', 'M', 'L', 'XL', 'XXL'].map((sz, idx) => `
                    <button 
                      type="button"
                      onclick="selectProductSize('${p.id}', '${sz}')"
                      id="size-btn-${p.id}-${sz}"
                      class="size-pill-${p.id} flex-1 py-1 text-xs font-bold rounded-lg border transition-all ${
                        idx === 1 
                          ? 'border-slate-900 bg-slate-900 text-white shadow-sm' 
                          : 'border-slate-200 text-slate-700 hover:border-slate-400'
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

        <!-- Pricing & Action Button -->
        <div class="p-5 pt-0">
          <div class="flex items-baseline gap-2 mb-3">
            <span class="text-xl font-black text-slate-900">
              ${isSociety ? `Starts ₹${p.price}` : `₹${p.price}`}
            </span>
            <span class="text-xs text-slate-400 line-through">
              ₹${p.originalPrice}
            </span>
            ${isSociety ? `
              <span class="text-[11px] font-semibold text-amber-600 ml-auto">
                Bulk Society Rate
              </span>
            ` : ''}
          </div>

          ${isSociety ? `
            <button 
              onclick="prefillSocietyQuote('${p.title}', '${p.type}')"
              class="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm"
            >
              <span>💬</span>
              <span>Get WhatsApp Bulk Quote</span>
            </button>
          ` : `
            <button 
              onclick="addToCart('${p.id}')"
              class="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 text-white bg-[#800020] hover:bg-[#580016] transition-all shadow-sm"
            >
              <span>🛍️</span>
              <span>Add to Shopping Bag</span>
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
    btn.className = `size-pill-${productId} flex-1 py-1 text-xs font-bold rounded-lg border transition-all border-slate-200 text-slate-700 hover:border-slate-400`;
  });
  const activeBtn = document.getElementById(`size-btn-${productId}-${size}`);
  if (activeBtn) {
    activeBtn.className = `size-pill-${productId} flex-1 py-1 text-xs font-bold rounded-lg border transition-all border-slate-900 bg-slate-900 text-white shadow-sm`;
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
  showToast(`Added ${product.title} (${chosenSize}) to your bag!`);
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

  // Calculate pricing
  const subtotal = appState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  let discountAmount = 0;

  if (appState.appliedPromo) {
    const promo = STORE_CONFIG.promoCodes[appState.appliedPromo];
    if (promo && subtotal >= promo.minOrder) {
      if (promo.discountType === "flat") {
        discountAmount = promo.value;
      } else if (promo.discountType === "percent") {
        discountAmount = Math.round((subtotal * promo.value) / 100);
      }
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal}`;
  if (cartDiscountEl) cartDiscountEl.textContent = discountAmount > 0 ? `-₹${discountAmount}` : `₹0`;
  if (cartTotalEl) cartTotalEl.textContent = `₹${finalTotal}`;

  cartItemsList.innerHTML = appState.cart.map(item => `
    <div class="flex items-center gap-3 py-3 border-b border-slate-100">
      <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded-xl border border-slate-200" />
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-slate-900 truncate">${item.title}</h4>
        <div class="text-[11px] text-slate-500 mt-0.5">
          <span>${item.collegeName}</span> • <span class="font-semibold text-slate-700">Size: ${item.size}</span>
        </div>
        <div class="text-xs font-extrabold text-[#800020] mt-1">₹${item.price}</div>
      </div>
      <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
        <button onclick="updateCartItemQuantity('${item.cartItemId}', -1)" class="px-2 py-1 text-xs text-slate-600 hover:bg-slate-200 font-bold">-</button>
        <span class="px-2 py-1 text-xs font-bold text-slate-900">${item.quantity}</span>
        <button onclick="updateCartItemQuantity('${item.cartItemId}', 1)" class="px-2 py-1 text-xs text-slate-600 hover:bg-slate-200 font-bold">+</button>
      </div>
      <button onclick="removeCartItem('${item.cartItemId}')" class="text-slate-400 hover:text-red-500 text-sm p-1" title="Remove">✕</button>
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
    showToast(`Coupon ${code} applied successfully! 🎉`);
  } else {
    showToast("Invalid Promo Code. Try 'DU2026' or 'FESTVIBES' 🏷️");
  }
}

// ==========================================
// 📱 WHATSAPP CHECKOUT FOR RETAIL MERCH
// ==========================================
function checkoutViaWhatsApp() {
  if (appState.cart.length === 0) {
    showToast("Your bag is empty!");
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

  let message = `*🎓 NEW ORDER - ${STORE_CONFIG.brandName.toUpperCase()}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Items Ordered:*\n`;

  appState.cart.forEach((item, idx) => {
    message += `${idx + 1}. *${item.title}*\n`;
    message += `   • Size: ${item.size} | Qty: ${item.quantity}\n`;
    message += `   • Price: ₹${item.price * item.quantity}\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Subtotal:* ₹${subtotal}\n`;
  if (discountAmount > 0) {
    message += `*Promo (${appState.appliedPromo}):* -₹${discountAmount}\n`;
  }
  message += `*Total Payable:* ₹${total}\n\n`;
  message += `*Delivery Details:*\n`;
  message += `• Name: [Student Name]\n`;
  message += `• DU College / Hostel: [Enter College or Hostel Name]\n`;
  message += `• Contact Number: [Enter Phone]\n`;
  message += `• Payment Mode: UPI (GPay / PhonePe / Paytm)\n\n`;
  message += `_Please confirm my order and send UPI QR code!_`;

  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ==========================================
// ⚡ SOCIETY CUSTOM JERSEY QUOTE ENGINE
// ==========================================
function initSocietyQuoteForm() {
  const societyTypeSelect = document.getElementById("quoteSocietyType");
  if (societyTypeSelect) {
    societyTypeSelect.innerHTML = `<option value="">Select Society Domain...</option>`;
    SOCIETY_TYPES.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      societyTypeSelect.appendChild(opt);
    });
  }

  // Live bulk discount estimator
  const qtyInput = document.getElementById("quoteQuantity");
  if (qtyInput) {
    qtyInput.addEventListener("input", updateQuoteEstimator);
  }
  const apparelInput = document.getElementById("quoteApparelType");
  if (apparelInput) {
    apparelInput.addEventListener("change", updateQuoteEstimator);
  }
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
  else discountPercent = 0;

  const finalRate = Math.round(baseRate * (1 - (discountPercent / 100)));

  estRateEl.textContent = `₹${finalRate}/pc`;
  if (discountPillEl) {
    discountPillEl.textContent = discountPercent > 0 
      ? `🔥 ${discountPercent}% Bulk Fest Discount Included!` 
      : `💡 Order 30+ pcs for 10% off, 50+ for 18% off!`;
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

  const college = document.getElementById("quoteCollegeSelect")?.value || "Delhi University College";
  const societyName = document.getElementById("quoteSocietyName")?.value || "Society / Team";
  const societyType = document.getElementById("quoteSocietyType")?.value || "Cultural Society";
  const apparelType = document.getElementById("quoteApparelType")?.selectedOptions[0]?.text || "Custom Sublimation Jersey";
  const quantity = document.getElementById("quoteQuantity")?.value || "25";
  const customNotes = document.getElementById("quoteNotes")?.value || "Custom logos and back names/numbers required.";
  const deadline = document.getElementById("quoteDeadline")?.value || "Fest Season";

  let message = `*⚡ NEW CUSTOM SOCIETY MERCH / JERSEY QUOTE REQUEST*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*College:* ${college}\n`;
  message += `*Society / Club:* ${societyName}\n`;
  message += `*Society Domain:* ${societyType}\n`;
  message += `*Apparel Required:* ${apparelType}\n`;
  message += `*Quantity:* ${quantity} Pieces\n`;
  message += `*Need Delivery By:* ${deadline}\n`;
  message += `*Customization Details:*\n${customNotes}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `_Hi Team! Please share digital mockups, fabric samples, and final bulk quotation for our society._`;

  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  closeSocietyQuoteModal();
  showToast("Opening WhatsApp with your society quote request! 🚀");
}

// ==========================================
// 🎨 UI HELPERS & MODALS
// ==========================================
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
  }, 3500);
}

function renderReviews() {
  const container = document.getElementById("reviewsContainer");
  if (!container) return;

  container.innerHTML = REVIEWS.map(r => `
    <div class="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
      <div>
        <div class="flex text-amber-400 text-sm mb-3">
          ${'★'.repeat(r.rating)}
        </div>
        <p class="text-sm text-slate-700 italic">"${r.quote}"</p>
      </div>
      <div class="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-[#800020] text-white flex items-center justify-center font-bold text-xs">
          ${r.name.split(' ').map(n=>n[0]).join('')}
        </div>
        <div>
          <div class="text-xs font-bold text-slate-900">${r.name}</div>
          <div class="text-[11px] text-slate-500">${r.role} • <span class="font-semibold text-[#800020]">${r.college}</span></div>
        </div>
      </div>
    </div>
  `).join('');
}

function setupEventListeners() {
  const searchInput = document.getElementById("globalSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      appState.searchQuery = e.target.value;
      renderProducts();
    });
  }
}
