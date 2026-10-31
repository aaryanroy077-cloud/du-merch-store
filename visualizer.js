// ==========================================
// 🎽 UNIVERSITY MERCH (ORIGINAL) - CUSTOM MOCKUP STUDIO
// 2D Live Interactive Apparel Studio for Single Personalized Orders
// Supports distinct silhouettes: T-Shirt, Heavyweight Hoodie, Varsity Jacket
// ==========================================

const VISUALIZER_STATE = {
  collegeId: "srcc",
  collegeName: "Shri Ram College of Commerce",
  collegeShort: "SRCC",
  societyName: "COMMERCE SOC",
  societySubtitle: "NORTH CAMPUS",
  playerName: "AARYAN",
  playerNumber: "07",
  apparelType: "hoodie", // "hoodie", "tee", "varsity"
  selectedSize: "L",
  baseColor: "#18181b",  // Stealth Black
  accentColor: "#f59e0b", // Athletic Gold
  textColor: "#ffffff",
  pattern: "clean", // "clean", "sash", "stripes", "fade"
  isFlipped: false, // false = front, true = back
  quantity: 1 // Single personalized order!
};

const BASE_COLORS = [
  { name: "Stealth Black", hex: "#18181b", textHex: "#ffffff" },
  { name: "DU Maroon", hex: "#800020", textHex: "#ffffff" },
  { name: "Royal Navy", hex: "#0f2b46", textHex: "#ffffff" },
  { name: "Forest Green", hex: "#064e3b", textHex: "#ffffff" },
  { name: "Oxford Blue", hex: "#1d4ed8", textHex: "#ffffff" },
  { name: "Regal Purple", hex: "#581c87", textHex: "#ffffff" },
  { name: "Crimson Red", hex: "#b91c1c", textHex: "#ffffff" },
  { name: "Crisp White", hex: "#f8fafc", textHex: "#0f172a" },
  { name: "Heather Grey", hex: "#64748b", textHex: "#ffffff" }
];

const ACCENT_COLORS = [
  { name: "Athletic Gold", hex: "#f59e0b" },
  { name: "Pure White", hex: "#ffffff" },
  { name: "Jet Black", hex: "#0f172a" },
  { name: "Crimson Red", hex: "#dc2626" },
  { name: "Sky Cyan", hex: "#06b6d4" },
  { name: "Neon Lime", hex: "#84cc16" },
  { name: "Rose Pink", hex: "#f43f5e" }
];

const APPAREL_PRICES = {
  "tee": { name: "Boxy Heavyweight Tee (240 GSM)", price: 649, original: 999 },
  "hoodie": { name: "Heavyweight Fleece Hoodie (380 GSM)", price: 1299, original: 1899 },
  "varsity": { name: "Classic Collegiate Varsity Jacket", price: 1599, original: 2499 }
};

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initVisualizerControls();
  renderJerseyMockup();
});

function initVisualizerControls() {
  // Populate college dropdown
  const colSelect = document.getElementById("visCollegeSelect");
  if (colSelect && typeof DU_COLLEGES !== "undefined") {
    colSelect.innerHTML = "";
    DU_COLLEGES.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = `${c.shortName} - ${c.name} (${c.campus})`;
      if (c.id === VISUALIZER_STATE.collegeId) opt.selected = true;
      colSelect.appendChild(opt);
    });

    colSelect.addEventListener("change", (e) => {
      const col = DU_COLLEGES.find(c => c.id === e.target.value);
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
        renderJerseyMockup();
      }
    });
  }

  // Inputs
  const socInput = document.getElementById("visSocietyInput");
  if (socInput) {
    socInput.addEventListener("input", (e) => {
      VISUALIZER_STATE.societyName = e.target.value.toUpperCase() || "SOCIETY";
      renderJerseyMockup();
    });
  }

  const subInput = document.getElementById("visSubtitleInput");
  if (subInput) {
    subInput.addEventListener("input", (e) => {
      VISUALIZER_STATE.societySubtitle = e.target.value.toUpperCase() || "EST. DELHI";
      renderJerseyMockup();
    });
  }

  const nameInput = document.getElementById("visPlayerNameInput");
  if (nameInput) {
    nameInput.addEventListener("input", (e) => {
      VISUALIZER_STATE.playerName = e.target.value.toUpperCase() || "PLAYER";
      renderJerseyMockup();
    });
  }

  const numInput = document.getElementById("visPlayerNumberInput");
  if (numInput) {
    numInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
      VISUALIZER_STATE.playerNumber = val || "07";
      e.target.value = val;
      renderJerseyMockup();
    });
  }

  // Base Color Swatches
  const baseSwatches = document.getElementById("visBaseSwatches");
  if (baseSwatches) {
    baseSwatches.innerHTML = BASE_COLORS.map(c => `
      <button 
        type="button" 
        onclick="setVisualizerBaseColor('${c.hex}', '${c.textHex}', this)" 
        class="swatch-btn w-7 h-7 rounded-full border border-neutral-300 shadow-sm flex items-center justify-center ${VISUALIZER_STATE.baseColor === c.hex ? 'active' : ''}" 
        style="background-color: ${c.hex};" 
        title="${c.name}"
      >
        ${VISUALIZER_STATE.baseColor === c.hex ? '<span class="text-[9px] text-white font-bold">✓</span>' : ''}
      </button>
    `).join('');
  }

  // Accent Color Swatches
  const accentSwatches = document.getElementById("visAccentSwatches");
  if (accentSwatches) {
    accentSwatches.innerHTML = ACCENT_COLORS.map(c => `
      <button 
        type="button" 
        onclick="setVisualizerAccentColor('${c.hex}', this)" 
        class="swatch-btn w-7 h-7 rounded-full border border-neutral-300 shadow-sm flex items-center justify-center ${VISUALIZER_STATE.accentColor === c.hex ? 'active' : ''}" 
        style="background-color: ${c.hex};" 
        title="${c.name}"
      >
        ${VISUALIZER_STATE.accentColor === c.hex ? '<span class="text-[9px] text-white font-bold">✓</span>' : ''}
      </button>
    `).join('');
  }

  updatePricingUI();
}

function updatePricingUI() {
  const info = APPAREL_PRICES[VISUALIZER_STATE.apparelType] || APPAREL_PRICES["hoodie"];
  const priceEl = document.getElementById("visSinglePrice");
  const origEl = document.getElementById("visOriginalPrice");
  const titleEl = document.getElementById("visApparelTitle");

  if (priceEl) priceEl.textContent = `₹${info.price}`;
  if (origEl) origEl.textContent = `₹${info.original}`;
  if (titleEl) titleEl.textContent = info.name;
}

function setVisualizerBaseColor(hex, textHex, btn) {
  VISUALIZER_STATE.baseColor = hex;
  VISUALIZER_STATE.textColor = textHex || "#ffffff";
  document.querySelectorAll("#visBaseSwatches .swatch-btn").forEach(b => {
    b.classList.remove("active");
    b.innerHTML = "";
  });
  if (btn) {
    btn.classList.add("active");
    btn.innerHTML = '<span class="text-[9px] text-white font-bold">✓</span>';
  }
  renderJerseyMockup();
}

function setVisualizerAccentColor(hex, btn) {
  VISUALIZER_STATE.accentColor = hex;
  document.querySelectorAll("#visAccentSwatches .swatch-btn").forEach(b => {
    b.classList.remove("active");
    b.innerHTML = "";
  });
  if (btn) {
    btn.classList.add("active");
    btn.innerHTML = '<span class="text-[9px] text-white font-bold">✓</span>';
  }
  renderJerseyMockup();
}

function setVisualizerApparelType(type) {
  VISUALIZER_STATE.apparelType = type;
  document.querySelectorAll(".apparel-type-btn").forEach(btn => {
    if (btn.dataset.type === type) {
      btn.className = "apparel-type-btn px-4 py-2.5 rounded-xl text-xs font-black bg-white text-black shadow-md border-2 border-white transition-all text-center";
    } else {
      btn.className = "apparel-type-btn px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 bg-neutral-900 border border-neutral-800 hover:text-white transition-all text-center";
    }
  });

  updatePricingUI();
  renderJerseyMockup();
}

function setVisualizerSize(size, btn) {
  VISUALIZER_STATE.selectedSize = size;
  document.querySelectorAll(".size-btn").forEach(b => {
    b.className = "size-btn w-9 h-9 rounded-lg text-xs font-bold bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-600 transition-all";
  });
  if (btn) {
    btn.className = "size-btn w-9 h-9 rounded-lg text-xs font-black bg-white text-black border border-white shadow-sm transition-all";
  }
}

function setVisualizerPattern(pattern) {
  VISUALIZER_STATE.pattern = pattern;
  document.querySelectorAll(".pattern-btn").forEach(btn => {
    if (btn.dataset.pattern === pattern) {
      btn.className = "pattern-btn px-3 py-1.5 text-xs font-bold bg-white text-black rounded-lg shadow-sm";
    } else {
      btn.className = "pattern-btn px-3 py-1.5 text-xs font-semibold text-neutral-400 bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-800";
    }
  });
  renderJerseyMockup();
}

function toggleJerseyFlip() {
  VISUALIZER_STATE.isFlipped = !VISUALIZER_STATE.isFlipped;
  const card = document.getElementById("jersey3dCard");
  const flipBtnText = document.getElementById("visFlipBtnText");
  const viewBadge = document.getElementById("visViewBadge");

  if (card) {
    if (VISUALIZER_STATE.isFlipped) {
      card.classList.add("is-flipped");
      if (flipBtnText) flipBtnText.textContent = "Show Front View 🔄";
      if (viewBadge) viewBadge.textContent = "BACK VIEW (Custom Name & Number)";
    } else {
      card.classList.remove("is-flipped");
      if (flipBtnText) flipBtnText.textContent = "Show Back View 🔄";
      if (viewBadge) viewBadge.textContent = "FRONT VIEW (Crest & Society)";
    }
  }
}

// ==========================================
// 🎨 SVG APPAREL GENERATOR (DISTINCT SILHOUETTES)
// 1. T-Shirt (Short Sleeves)
// 2. Heavyweight Hoodie (Long Sleeves, 3D Hood, Drawstrings, Kangaroo Pocket)
// 3. Varsity Jacket (Contrasting Long Sleeves, Striped Ribs, Snap Buttons, Slant Pockets)
// ==========================================
function generateJerseySVG(isBack) {
  const base = VISUALIZER_STATE.baseColor;
  const accent = VISUALIZER_STATE.accentColor;
  const text = VISUALIZER_STATE.textColor;
  const type = VISUALIZER_STATE.apparelType; // "tee", "hoodie", "varsity"
  const pattern = VISUALIZER_STATE.pattern;

  // Sourced College
  const currentCollege = (typeof DU_COLLEGES !== "undefined") ? 
    (DU_COLLEGES.find(c => c.id === VISUALIZER_STATE.collegeId) || DU_COLLEGES[0]) : 
    { shortName: "SRCC", name: "Shri Ram College of Commerce", est: "1926" };

  // Sleeves for varsity jacket are contrasting cream/off-white leather
  const varsitySleeveColor = "#f1f5f9";
  const sleeveColor = type === "varsity" ? varsitySleeveColor : base;

  // Patterns
  let patternSVG = "";
  if (pattern === "sash") {
    patternSVG = `
      <polygon points="50,90 130,65 440,480 360,505" fill="${accent}" opacity="0.85" />
      <polygon points="35,120 55,110 380,505 360,510" fill="${accent}" opacity="0.4" />
    `;
  } else if (pattern === "stripes") {
    patternSVG = `
      <rect x="225" y="60" width="18" height="460" fill="${accent}" opacity="0.9" />
      <rect x="257" y="60" width="18" height="460" fill="${accent}" opacity="0.9" />
      <rect x="180" y="70" width="8" height="450" fill="${accent}" opacity="0.4" />
      <rect x="312" y="70" width="8" height="450" fill="${accent}" opacity="0.4" />
    `;
  } else if (pattern === "fade") {
    patternSVG = `
      <rect x="100" y="60" width="300" height="460" fill="url(#sublimationGrad)" opacity="0.6" />
    `;
  }

  // Generate Apparel-specific SVGs
  let apparelSVGContent = "";

  if (type === "tee") {
    // ------------------------------------------
    // 👕 1. T-SHIRT (Short Sleeves & Crewneck)
    // ------------------------------------------
    apparelSVGContent = `
      <!-- T-Shirt Sleeves -->
      <g id="tshirt-sleeves">
        <!-- Left Short Sleeve -->
        <path d="M 115 80 L 15 195 L 68 232 L 120 185 Z" fill="${base}" />
        <path d="M 115 80 L 15 195 L 68 232 L 120 185 Z" fill="url(#sleeveShadeLeft)" />
        <path d="M 15 195 L 26 182 L 78 219 L 68 232 Z" fill="${accent}" />
        
        <!-- Right Short Sleeve -->
        <path d="M 385 80 L 485 195 L 432 232 L 380 185 Z" fill="${base}" />
        <path d="M 385 80 L 485 195 L 432 232 L 380 185 Z" fill="url(#sleeveShadeRight)" />
        <path d="M 485 195 L 474 182 L 422 219 L 432 232 Z" fill="${accent}" />
      </g>

      <!-- Main Torso -->
      <g id="tshirt-body">
        <path d="M 175 52 L 115 80 L 120 185 L 110 510 C 180 522, 320 522, 390 510 L 380 185 L 385 80 L 325 52 Z" fill="${base}" />
        
        <!-- Torso pattern inside clip -->
        <g clip-path="url(#tshirtTorsoClip)">
          ${patternSVG}
        </g>

        <!-- Torso Shading -->
        <path d="M 175 52 L 115 80 L 120 185 L 110 510 C 180 522, 320 522, 390 510 L 380 185 L 385 80 L 325 52 Z" fill="url(#bodyShade)" />
        
        <!-- Bottom Hem -->
        <path d="M 110 500 C 180 512, 320 512, 390 500 L 390 510 C 320 522, 180 522, 110 510 Z" fill="${accent}" />
      </g>

      <!-- Crewneck Collar -->
      <g id="tshirt-collar">
        <path d="M 175 52 C 210 75, 290 75, 325 52 C 290 62, 210 62, 175 52 Z" fill="#09090b" opacity="0.6" />
        ${isBack ? `
          <path d="M 175 52 C 215 62, 285 62, 325 52 L 328 58 C 285 70, 215 70, 172 58 Z" fill="${accent}" />
        ` : `
          <path d="M 175 52 C 210 88, 290 88, 325 52 L 321 46 C 285 78, 215 78, 179 46 Z" fill="${accent}" stroke="#000000" stroke-width="0.5" />
        `}
      </g>
    `;

  } else if (type === "hoodie") {
    // ------------------------------------------
    // 🧥 2. HEAVYWEIGHT HOODIE (Long Sleeves, 3D Hood, Kangaroo Pocket)
    // ------------------------------------------
    apparelSVGContent = `
      <!-- Hoodie Full Long Sleeves (Extending to bottom hem level) -->
      <g id="hoodie-long-sleeves">
        <!-- Left Long Sleeve -->
        <path d="M 120 78 L 22 210 L -12 390 L 38 406 L 68 255 L 125 185 Z" fill="${base}" />
        <path d="M 120 78 L 22 210 L -12 390 L 38 406 L 68 255 L 125 185 Z" fill="url(#sleeveShadeLeft)" />
        <!-- Left Ribbed Wrist Cuff -->
        <path d="M -12 390 L -18 418 L 32 434 L 38 406 Z" fill="${accent}" />
        <line x1="-8" y1="395" x2="34" y2="411" stroke="#000000" stroke-width="1.5" opacity="0.4" />
        <line x1="-14" y1="407" x2="28" y2="423" stroke="#000000" stroke-width="1.5" opacity="0.4" />

        <!-- Right Long Sleeve -->
        <path d="M 380 78 L 478 210 L 512 390 L 462 406 L 432 255 L 375 185 Z" fill="${base}" />
        <path d="M 380 78 L 478 210 L 512 390 L 462 406 L 432 255 L 375 185 Z" fill="url(#sleeveShadeRight)" />
        <!-- Right Ribbed Wrist Cuff -->
        <path d="M 512 390 L 518 418 L 468 434 L 462 406 Z" fill="${accent}" />
        <line x1="508" y1="395" x2="466" y2="411" stroke="#000000" stroke-width="1.5" opacity="0.4" />
        <line x1="514" y1="407" x2="472" y2="423" stroke="#000000" stroke-width="1.5" opacity="0.4" />
      </g>

      <!-- Main Torso (Heavyweight Boxy Silhouette) -->
      <g id="hoodie-body">
        <path d="M 170 55 L 120 78 L 125 185 L 105 470 L 395 470 L 375 185 L 380 78 L 330 55 Z" fill="${base}" />
        
        <g clip-path="url(#hoodieTorsoClip)">
          ${patternSVG}
        </g>

        <!-- Torso Shading & Fleece Texture -->
        <path d="M 170 55 L 120 78 L 125 185 L 105 470 L 395 470 L 375 185 L 380 78 L 330 55 Z" fill="url(#bodyShade)" />

        <!-- Wide Ribbed Waistband Hem -->
        <rect x="105" y="470" width="290" height="42" fill="${base}" stroke="${accent}" stroke-width="1.5" />
        <line x1="105" y1="484" x2="395" y2="484" stroke="${accent}" stroke-width="1" opacity="0.5" />
        <line x1="105" y1="498" x2="395" y2="498" stroke="${accent}" stroke-width="1" opacity="0.5" />
      </g>

      <!-- Kangaroo Pouch Pocket (Front View Only) -->
      ${!isBack ? `
        <g id="kangaroo-pocket">
          <!-- Pocket Base -->
          <path d="M 148 340 L 352 340 L 382 468 L 118 468 Z" fill="${base}" stroke="${accent}" stroke-width="2" opacity="0.95" />
          <path d="M 148 340 L 352 340 L 382 468 L 118 468 Z" fill="url(#bodyShade)" />
          <!-- Pocket Side Hand Entries (Curved) -->
          <path d="M 148 340 C 135 380, 125 430, 118 468" stroke="${accent}" stroke-width="3" stroke-linecap="round" fill="none" />
          <path d="M 352 340 C 365 380, 375 430, 382 468" stroke="${accent}" stroke-width="3" stroke-linecap="round" fill="none" />
          <!-- Top Seam -->
          <line x1="148" y1="340" x2="352" y2="340" stroke="#000000" stroke-width="2" opacity="0.3" />
        </g>
      ` : ''}

      <!-- 3D Hood Structure -->
      <g id="hoodie-hood">
        ${!isBack ? `
          <!-- Front Hood Contour & Drape around neck -->
          <path d="M 155 70 C 150 18, 205 10, 250 10 C 295 10, 350 18, 345 70 C 320 40, 180 40, 155 70 Z" fill="${base}" stroke="${accent}" stroke-width="2" />
          <!-- Inner Cowl Shadow -->
          <ellipse cx="250" cy="56" rx="60" ry="22" fill="#09090b" opacity="0.8" />
          <path d="M 195 56 C 220 82, 280 82, 305 56" stroke="${accent}" stroke-width="2.5" fill="none" />

          <!-- Realistic Drawstrings with Metal Aglets -->
          <!-- Left String -->
          <path d="M 226 72 Q 220 150 216 230" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" fill="none" />
          <rect x="213" y="230" width="6" height="15" rx="2" fill="${accent}" stroke="#000000" stroke-width="0.8" />
          <!-- Right String -->
          <path d="M 274 72 Q 280 150 284 230" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" fill="none" />
          <rect x="281" y="230" width="6" height="15" rx="2" fill="${accent}" stroke="#000000" stroke-width="0.8" />
        ` : `
          <!-- Back View: Hood draped down over upper back -->
          <path d="M 160 52 C 190 42, 310 42, 340 52 C 320 120, 250 155, 250 155 C 250 155, 180 120, 160 52 Z" fill="${base}" stroke="${accent}" stroke-width="2.5" />
          <!-- Center Hood Seam -->
          <line x1="250" y1="46" x2="250" y2="155" stroke="${accent}" stroke-width="2" stroke-dasharray="3 3" />
        `}
      </g>
    `;

  } else if (type === "varsity") {
    // ------------------------------------------
    // 🥼 3. VARSITY JACKET (Contrasting Long Sleeves, Striped Ribs, Snap Buttons)
    // ------------------------------------------
    apparelSVGContent = `
      <!-- Contrasting Leather Long Sleeves -->
      <g id="varsity-sleeves">
        <!-- Left Sleeve -->
        <path d="M 122 75 L 22 210 L -12 390 L 38 406 L 68 255 L 125 185 Z" fill="${sleeveColor}" />
        <path d="M 122 75 L 22 210 L -12 390 L 38 406 L 68 255 L 125 185 Z" fill="url(#sleeveShadeLeft)" />
        <!-- Striped Ribbed Cuff -->
        <path d="M -12 390 L -18 418 L 32 434 L 38 406 Z" fill="${base}" />
        <line x1="-10" y1="398" x2="34" y2="414" stroke="${accent}" stroke-width="3" />
        <line x1="-14" y1="408" x2="30" y2="424" stroke="#ffffff" stroke-width="2" />

        <!-- Right Sleeve -->
        <path d="M 378 75 L 478 210 L 512 390 L 462 406 L 432 255 L 375 185 Z" fill="${sleeveColor}" />
        <path d="M 378 75 L 478 210 L 512 390 L 462 406 L 432 255 L 375 185 Z" fill="url(#sleeveShadeRight)" />
        <!-- Striped Ribbed Cuff -->
        <path d="M 512 390 L 518 418 L 468 434 L 462 406 Z" fill="${base}" />
        <line x1="510" y1="398" x2="466" y2="414" stroke="${accent}" stroke-width="3" />
        <line x1="514" y1="408" x2="470" y2="424" stroke="#ffffff" stroke-width="2" />
      </g>

      <!-- Heavy Meltons Wool Torso -->
      <g id="varsity-body">
        <path d="M 175 52 L 122 75 L 125 185 L 110 472 L 390 472 L 375 185 L 378 75 L 325 52 Z" fill="${base}" />
        
        <g clip-path="url(#varsityTorsoClip)">
          ${patternSVG}
        </g>

        <!-- Shading -->
        <path d="M 175 52 L 122 75 L 125 185 L 110 472 L 390 472 L 375 185 L 378 75 L 325 52 Z" fill="url(#bodyShade)" />

        <!-- Slanted Leather Welt Pockets (Front View) -->
        ${!isBack ? `
          <g id="varsity-pockets">
            <!-- Left Pocket -->
            <polygon points="140,360 185,395 180,405 135,370" fill="${sleeveColor}" stroke="${accent}" stroke-width="1.5" />
            <!-- Right Pocket -->
            <polygon points="360,360 315,395 320,405 365,370" fill="${sleeveColor}" stroke="${accent}" stroke-width="1.5" />
          </g>
        ` : ''}

        <!-- Striped Bottom Ribbed Hem -->
        <rect x="110" y="472" width="280" height="40" fill="${base}" stroke="${accent}" stroke-width="1.5" />
        <line x1="110" y1="485" x2="390" y2="485" stroke="${accent}" stroke-width="3" />
        <line x1="110" y1="497" x2="390" y2="497" stroke="#ffffff" stroke-width="2" />
      </g>

      <!-- Center Snap Button Placket (Front View Only) -->
      ${!isBack ? `
        <g id="varsity-snap-placket">
          <!-- Center Placket Seam -->
          <line x1="250" y1="78" x2="250" y2="472" stroke="#ffffff" stroke-width="2" stroke-dasharray="4 4" opacity="0.4" />
          <!-- 6 Metallic Snap Buttons -->
          <circle cx="250" cy="115" r="5.5" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
          <circle cx="250" cy="175" r="5.5" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
          <circle cx="250" cy="235" r="5.5" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
          <circle cx="250" cy="295" r="5.5" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
          <circle cx="250" cy="355" r="5.5" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
          <circle cx="250" cy="415" r="5.5" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
        </g>
      ` : ''}

      <!-- Striped Baseball Knit Collar -->
      <g id="varsity-collar">
        <path d="M 175 52 C 210 75, 290 75, 325 52 C 300 40, 200 40, 175 52 Z" fill="${base}" stroke="${accent}" stroke-width="1.5" />
        <path d="M 185 52 C 215 70, 285 70, 315 52" stroke="${accent}" stroke-width="2.5" fill="none" />
        <path d="M 195 52 C 220 64, 280 64, 305 52" stroke="#ffffff" stroke-width="1.5" fill="none" />
      </g>
    `;
  }

  // ------------------------------------------
  // 🔤 GRAPHICS & EMBROIDERY (Princetown Font)
  // ------------------------------------------
  let graphicsSVG = "";

  if (!isBack) {
    // === FRONT VIEW ===
    const isVarsity = type === "varsity";
    const societyY = (type === "hoodie") ? 275 : (isVarsity ? 260 : 270);

    graphicsSVG = `
      <!-- Left Chest: Real Authentic DU College Emblem -->
      <g transform="translate(155, 140)">
        <circle cx="0" cy="0" r="26" fill="${base}" stroke="${accent}" stroke-width="2.5" filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.5))" />
        <circle cx="0" cy="0" r="21" fill="none" stroke="#ffffff" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.7" />
        <text x="0" y="-3" font-family="'Graduate', 'Outfit', sans-serif" font-weight="900" font-size="12" fill="${accent}" text-anchor="middle">
          ${VISUALIZER_STATE.collegeShort.slice(0, 5)}
        </text>
        <text x="0" y="9" font-family="'Graduate', sans-serif" font-weight="800" font-size="7" fill="#ffffff" text-anchor="middle" letter-spacing="1">
          EST. ${currentCollege.est || '1922'}
        </text>
      </g>

      <!-- Right Chest: University Merch (Original) Insignia -->
      <g transform="translate(345, 140)">
        <circle cx="0" cy="0" r="14" fill="${accent}" opacity="0.25" />
        <path d="M 0,-7 L 2,-2 L 7,-2 L 3,1 L 5,6 L 0,3 L -5,6 L -3,1 L -7,-2 L -2,-2 Z" fill="${accent}" />
        <text x="0" y="15" font-family="'Graduate', sans-serif" font-weight="800" font-size="6.5" fill="${text}" text-anchor="middle" letter-spacing="1">
          ORIGINAL
        </text>
      </g>

      <!-- Center Chest: Society & College Name (Princetown Collegiate Font) -->
      <g transform="translate(250, ${societyY})">
        <!-- Arched College Header -->
        <text x="0" y="-35" font-family="'Graduate', 'Outfit', sans-serif" font-weight="900" font-size="14" fill="${accent}" text-anchor="middle" letter-spacing="3">
          ${VISUALIZER_STATE.collegeName.toUpperCase().slice(0, 24)}
        </text>

        <!-- Society Name in Bold Princetown Slab Serif -->
        <text x="0" y="0" font-family="'Graduate', 'Outfit', sans-serif" font-weight="900" font-size="28" fill="${text}" stroke="#000000" stroke-width="1.5" text-anchor="middle" letter-spacing="2">
          ${VISUALIZER_STATE.societyName}
        </text>

        <!-- Subtitle Ribbon -->
        <rect x="-85" y="10" width="170" height="18" rx="4" fill="#09090b" stroke="${accent}" stroke-width="1" opacity="0.9" />
        <text x="0" y="22" font-family="'Graduate', sans-serif" font-weight="800" font-size="8.5" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">
          ${VISUALIZER_STATE.societySubtitle}
        </text>
      </g>
    `;
  } else {
    // === BACK VIEW ===
    const nameY = (type === "hoodie") ? 180 : 160;
    const numberY = (type === "hoodie") ? 335 : 315;

    graphicsSVG = `
      <!-- Upper Back: College Monogram -->
      <g transform="translate(250, 115)">
        <text x="0" y="0" font-family="'Graduate', 'Outfit', sans-serif" font-weight="900" font-size="13" fill="${accent}" text-anchor="middle" letter-spacing="4">
          ★ ${VISUALIZER_STATE.collegeShort} ★
        </text>
      </g>

      <!-- Player Name in Classic Collegiate Princetown Letters -->
      <text x="250" y="${nameY}" font-family="'Graduate', 'Outfit', sans-serif" font-weight="900" font-size="34" fill="${text}" stroke="#000000" stroke-width="1.5" text-anchor="middle" letter-spacing="4">
        ${VISUALIZER_STATE.playerName}
      </text>

      <!-- Large Bold Back Number with 3D Drop Shadow / Outline -->
      <g transform="translate(250, ${numberY})">
        <!-- Drop Shadow Number -->
        <text x="4" y="4" font-family="'Graduate', 'Teko', sans-serif" font-weight="900" font-size="140" fill="#000000" opacity="0.6" text-anchor="middle">
          ${VISUALIZER_STATE.playerNumber}
        </text>
        <!-- Accent Base Number -->
        <text x="0" y="0" font-family="'Graduate', 'Teko', sans-serif" font-weight="900" font-size="140" fill="${accent}" stroke="#ffffff" stroke-width="2.5" text-anchor="middle">
          ${VISUALIZER_STATE.playerNumber}
        </text>
      </g>

      <!-- Lower Back Tag -->
      <text x="250" y="455" font-family="'Graduate', sans-serif" font-weight="800" font-size="9" fill="${text}" text-anchor="middle" letter-spacing="2" opacity="0.75">
        UNIVERSITY MERCH • 1 OF 1 CUSTOM
      </text>
    `;
  }

  return `
    <svg viewBox="0 0 500 560" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-2xl">
      <defs>
        <!-- Dynamic Gradients -->
        <linearGradient id="bodyShade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
          <stop offset="40%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.35"/>
        </linearGradient>

        <linearGradient id="sleeveShadeLeft" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.08"/>
        </linearGradient>

        <linearGradient id="sleeveShadeRight" x1="100%" y1="0%" x2="0%" y2="50%">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.08"/>
        </linearGradient>

        <linearGradient id="sublimationGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.8"/>
          <stop offset="50%" stop-color="${accent}" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="${base}" stop-opacity="0"/>
        </linearGradient>

        <!-- Clip Paths -->
        <clipPath id="tshirtTorsoClip">
          <path d="M 175 52 L 115 80 L 120 185 L 110 510 C 180 522, 320 522, 390 510 L 380 185 L 385 80 L 325 52 Z" />
        </clipPath>

        <clipPath id="hoodieTorsoClip">
          <path d="M 170 55 L 120 78 L 125 185 L 105 470 L 395 470 L 375 185 L 380 78 L 330 55 Z" />
        </clipPath>

        <clipPath id="varsityTorsoClip">
          <path d="M 175 52 L 122 75 L 125 185 L 110 472 L 390 472 L 375 185 L 378 75 L 325 52 Z" />
        </clipPath>
      </defs>

      <!-- Garment Silhouette -->
      ${apparelSVGContent}

      <!-- Graphics & Lettering -->
      ${graphicsSVG}
    </svg>
  `;
}

function renderJerseyMockup() {
  const frontContainer = document.getElementById("jerseySvgFrontContainer");
  const backContainer = document.getElementById("jerseySvgBackContainer");

  if (frontContainer) {
    frontContainer.innerHTML = generateJerseySVG(false);
  }
  if (backContainer) {
    backContainer.innerHTML = generateJerseySVG(true);
  }
}

// ==========================================
// 💬 ORDER SINGLE PERSONALIZED PIECE (WHATSAPP)
// ==========================================
function orderSingleMockupPiece() {
  const info = APPAREL_PRICES[VISUALIZER_STATE.apparelType] || APPAREL_PRICES["hoodie"];
  
  let message = `*🔥 ORDER: 1-OF-1 PERSONALIZED DU APPAREL*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Apparel Style:* ${info.name}\n`;
  message += `*Size Selected:* ${VISUALIZER_STATE.selectedSize}\n`;
  message += `*DU College:* ${VISUALIZER_STATE.collegeName} (${VISUALIZER_STATE.collegeShort})\n`;
  message += `*Chest Society / Text:* ${VISUALIZER_STATE.societyName}\n`;
  message += `*Subtitle:* ${VISUALIZER_STATE.societySubtitle}\n`;
  message += `*Back Name:* ${VISUALIZER_STATE.playerName}\n`;
  message += `*Back Number:* ${VISUALIZER_STATE.playerNumber}\n`;
  message += `*Base Color:* ${VISUALIZER_STATE.baseColor}\n`;
  message += `*Accent Color:* ${VISUALIZER_STATE.accentColor}\n`;
  message += `*Price:* ₹${info.price} (Single Piece Custom Order)\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `_Hi University Merch! I designed this personalized piece in your Custom Mockup Studio and would like to confirm my order._`;

  const num = typeof STORE_CONFIG !== "undefined" ? STORE_CONFIG.whatsappNumber : "919876543210";
  const url = `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Legacy alias for compatibility
function submitMockupQuote() {
  orderSingleMockupPiece();
}

// ==========================================
// 📸 DOWNLOAD MOCKUP IMAGE (PNG EXPORT)
// ==========================================
function downloadMockupImage() {
  const activeSvgContainer = VISUALIZER_STATE.isFlipped ? 
    document.getElementById("jerseySvgBackContainer") : 
    document.getElementById("jerseySvgFrontContainer");

  if (!activeSvgContainer) return;
  const svgEl = activeSvgContainer.querySelector("svg");
  if (!svgEl) return;

  const svgData = new XMLSerializer().serializeToString(svgEl);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  
  canvas.width = 1000;
  canvas.height = 1120;

  const img = new Image();
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const grad = ctx.createRadialGradient(500, 500, 50, 500, 500, 600);
    grad.addColorStop(0, "rgba(245, 158, 11, 0.2)");
    grad.addColorStop(1, "rgba(9, 9, 11, 1)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header in Princetown / Collegiate font
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 30px 'Graduate', 'Outfit', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("UNIVERSITY MERCH (ORIGINAL)", 500, 60);

    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 20px 'Graduate', sans-serif";
    ctx.fillText(`${VISUALIZER_STATE.collegeName.toUpperCase()} • ${VISUALIZER_STATE.societyName}`, 500, 95);

    // Draw Mockup
    ctx.drawImage(img, 100, 120, 800, 896);

    // Footer Info
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(`Personalized 1-of-1 DU Apparel • Order on WhatsApp`, 500, 1060);

    ctx.fillStyle = "#71717a";
    ctx.font = "15px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(`View: ${VISUALIZER_STATE.isFlipped ? 'BACK' : 'FRONT'} | Size: ${VISUALIZER_STATE.selectedSize} | Style: ${VISUALIZER_STATE.apparelType.toUpperCase()}`, 500, 1090);

    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = `${VISUALIZER_STATE.collegeShort}-${VISUALIZER_STATE.societyName}-${VISUALIZER_STATE.apparelType}.png`;
    downloadLink.href = pngUrl;
    downloadLink.click();

    URL.revokeObjectURL(url);
    if (typeof showToast === "function") {
      showToast("Custom mockup image downloaded successfully!");
    }
  };

  img.src = url;
}
