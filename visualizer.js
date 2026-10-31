// ==========================================
// 🎽 DU MERCH CO. - LIVE 2D SOCIETY JERSEY VISUALIZER STUDIO
// Modular script for Partner B (Divyansh) & custom apparel engine
// ==========================================

const VISUALIZER_STATE = {
  collegeId: "hindu",
  collegeName: "Hindu College",
  collegeShort: "HINDU",
  societyName: "IBTIDA",
  societySubtitle: "DRAMATICS SOCIETY",
  playerName: "DIVYANSH",
  playerNumber: "07",
  apparelType: "jersey", // "jersey", "hoodie", "tee", "varsity"
  baseColor: "#0f2b46",  // Default Navy
  accentColor: "#f59e0b", // Default Gold
  textColor: "#ffffff",
  pattern: "sash", // "clean", "sash", "stripes", "fade"
  isFlipped: false, // false = front, true = back
  quantity: 30
};

const BASE_COLORS = [
  { name: "DU Maroon", hex: "#800020", textHex: "#ffffff" },
  { name: "Royal Navy", hex: "#0f2b46", textHex: "#ffffff" },
  { name: "Stealth Black", hex: "#18181b", textHex: "#ffffff" },
  { name: "Forest Green", hex: "#064e3b", textHex: "#ffffff" },
  { name: "Oxford Blue", hex: "#1d4ed8", textHex: "#ffffff" },
  { name: "Regal Purple", hex: "#581c87", textHex: "#ffffff" },
  { name: "Crimson Red", hex: "#b91c1c", textHex: "#ffffff" },
  { name: "Crisp White", hex: "#f8fafc", textHex: "#0f172a" }
];

const ACCENT_COLORS = [
  { name: "Athletic Gold", hex: "#f59e0b" },
  { name: "Pure White", hex: "#ffffff" },
  { name: "Jet Black", hex: "#0f172a" },
  { name: "Crimson Red", hex: "#dc2626" },
  { name: "Sky Cyan", hex: "#06b6d4" },
  { name: "Neon Lime", hex: "#84cc16" }
];

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
      opt.textContent = `${c.shortName} (${c.campus})`;
      if (c.id === VISUALIZER_STATE.collegeId) opt.selected = true;
      colSelect.appendChild(opt);
    });

    colSelect.addEventListener("change", (e) => {
      const col = DU_COLLEGES.find(c => c.id === e.target.value);
      if (col) {
        VISUALIZER_STATE.collegeId = col.id;
        VISUALIZER_STATE.collegeName = col.name;
        VISUALIZER_STATE.collegeShort = col.shortName.toUpperCase();
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
      VISUALIZER_STATE.societySubtitle = e.target.value.toUpperCase() || "ANNUAL FEST 2026";
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
      VISUALIZER_STATE.playerNumber = val || "00";
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
        class="swatch-btn w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${VISUALIZER_STATE.baseColor === c.hex ? 'active' : ''}" 
        style="background-color: ${c.hex};" 
        title="${c.name}"
      >
        ${VISUALIZER_STATE.baseColor === c.hex ? '<span class="text-[10px] text-white">✓</span>' : ''}
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
        class="swatch-btn w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${VISUALIZER_STATE.accentColor === c.hex ? 'active' : ''}" 
        style="background-color: ${c.hex};" 
        title="${c.name}"
      >
        ${VISUALIZER_STATE.accentColor === c.hex ? '<span class="text-[10px] text-white">✓</span>' : ''}
      </button>
    `).join('');
  }

  // Quantity slider
  const qtySlider = document.getElementById("visQtySlider");
  const qtyDisplay = document.getElementById("visQtyDisplay");
  const estRate = document.getElementById("visEstimatedRate");
  if (qtySlider) {
    qtySlider.addEventListener("input", (e) => {
      const q = parseInt(e.target.value);
      VISUALIZER_STATE.quantity = q;
      if (qtyDisplay) qtyDisplay.textContent = `${q} Pieces`;
      
      // Calculate rate
      let rate = 449;
      if (VISUALIZER_STATE.apparelType === "hoodie") rate = 899;
      else if (VISUALIZER_STATE.apparelType === "tee") rate = 299;
      else if (VISUALIZER_STATE.apparelType === "varsity") rate = 1499;

      let discount = 0;
      if (q >= 100) discount = 0.25;
      else if (q >= 50) discount = 0.18;
      else if (q >= 30) discount = 0.10;

      const finalRate = Math.round(rate * (1 - discount));
      if (estRate) estRate.textContent = `₹${finalRate}/pc`;
    });
  }
}

function setVisualizerBaseColor(hex, textHex, btn) {
  VISUALIZER_STATE.baseColor = hex;
  VISUALIZER_STATE.textColor = textHex;
  document.querySelectorAll("#visBaseSwatches .swatch-btn").forEach(b => {
    b.classList.remove("active");
    b.innerHTML = "";
  });
  if (btn) {
    btn.classList.add("active");
    btn.innerHTML = '<span class="text-[10px] text-white">✓</span>';
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
    btn.innerHTML = '<span class="text-[10px] text-white">✓</span>';
  }
  renderJerseyMockup();
}

function setVisualizerApparelType(type) {
  VISUALIZER_STATE.apparelType = type;
  document.querySelectorAll(".apparel-type-btn").forEach(btn => {
    if (btn.dataset.type === type) {
      btn.className = "apparel-type-btn px-3 py-2 rounded-xl text-xs font-bold bg-white text-black shadow-sm transition-all text-center";
    } else {
      btn.className = "apparel-type-btn px-3 py-2 rounded-xl text-xs font-medium text-neutral-400 bg-neutral-800 border border-neutral-700 hover:text-white transition-all text-center";
    }
  });

  // Trigger quantity update to refresh prices
  const qtySlider = document.getElementById("visQtySlider");
  if (qtySlider) qtySlider.dispatchEvent(new Event("input"));

  renderJerseyMockup();
}

function setVisualizerPattern(pattern) {
  VISUALIZER_STATE.pattern = pattern;
  document.querySelectorAll(".pattern-btn").forEach(btn => {
    if (btn.dataset.pattern === pattern) {
      btn.className = "pattern-btn px-3 py-1.5 text-xs font-bold bg-white text-black rounded-lg shadow-sm";
    } else {
      btn.className = "pattern-btn px-3 py-1.5 text-xs font-semibold text-neutral-400 bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700";
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
      if (viewBadge) viewBadge.textContent = "BACK VIEW (Name & Number)";
    } else {
      card.classList.remove("is-flipped");
      if (flipBtnText) flipBtnText.textContent = "Show Back View 🔄";
      if (viewBadge) viewBadge.textContent = "FRONT VIEW (Crest & Society)";
    }
  }
}

// ==========================================
// 🎨 SVG JERSEY GENERATOR
// ==========================================
function generateJerseySVG(isBack) {
  const base = VISUALIZER_STATE.baseColor;
  const accent = VISUALIZER_STATE.accentColor;
  const text = VISUALIZER_STATE.textColor;
  const type = VISUALIZER_STATE.apparelType;
  const pattern = VISUALIZER_STATE.pattern;

  // Sleeves for varsity jacket are contrasting cream/white
  const sleeveColor = type === "varsity" ? "#f1f5f9" : base;

  // Patterns
  let patternSVG = "";
  if (pattern === "sash") {
    patternSVG = `
      <polygon points="40,90 120,65 440,490 360,515" fill="${accent}" opacity="0.85" />
      <polygon points="25,120 45,110 380,515 360,520" fill="${accent}" opacity="0.4" />
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

  // Hoodie specific elements
  let hoodieElements = "";
  if (type === "hoodie" && !isBack) {
    hoodieElements = `
      <!-- Kangaroo Pocket -->
      <path d="M 160 380 L 340 380 L 370 480 L 130 480 Z" fill="${base}" stroke="${accent}" stroke-width="2" opacity="0.95" />
      <path d="M 160 380 L 130 480" stroke="#000000" stroke-width="3" opacity="0.25" />
      <path d="M 340 380 L 370 480" stroke="#000000" stroke-width="3" opacity="0.25" />
      <!-- Drawstrings -->
      <path d="M 225 110 Q 220 180 215 220" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" />
      <circle cx="215" cy="225" r="4" fill="${accent}" />
      <path d="M 275 110 Q 280 180 285 220" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" />
      <circle cx="285" cy="225" r="4" fill="${accent}" />
    `;
  }

  // Varsity snap buttons
  let varsityElements = "";
  if (type === "varsity") {
    varsityElements = `
      <line x1="250" y1="80" x2="250" y2="515" stroke="#ffffff" stroke-width="3" stroke-dasharray="2 6" opacity="0.5" />
      ${!isBack ? `
        <circle cx="250" cy="140" r="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
        <circle cx="250" cy="200" r="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
        <circle cx="250" cy="260" r="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
        <circle cx="250" cy="320" r="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
        <circle cx="250" cy="380" r="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
        <circle cx="250" cy="440" r="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
      ` : ''}
    `;
  }

  return `
    <svg viewBox="0 0 500 560" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-2xl">
      <defs>
        <!-- Dynamic Gradients -->
        <linearGradient id="bodyShade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
          <stop offset="40%" stop-color="#000000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.3"/>
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

        <!-- Clip path to keep patterns strictly inside jersey torso -->
        <clipPath id="torsoClip">
          <path d="M 180 50 L 80 85 L 115 200 L 100 515 C 180 528, 320 528, 400 515 L 385 200 L 420 85 L 320 50 Z" />
        </clipPath>
      </defs>

      <!-- 1. SLEEVES (Drawn behind body) -->
      <!-- Left Sleeve -->
      <g>
        <path d="M 80 85 L 15 195 L 65 230 L 115 200 Z" fill="${sleeveColor}" />
        <path d="M 80 85 L 15 195 L 65 230 L 115 200 Z" fill="url(#sleeveShadeLeft)" />
        <!-- Cuff Trim -->
        <path d="M 15 195 L 25 180 L 75 215 L 65 230 Z" fill="${accent}" />
        ${type === "varsity" ? `
          <path d="M 28 175 L 34 167 L 84 202 L 78 210 Z" fill="${base}" />
        ` : ''}
      </g>

      <!-- Right Sleeve -->
      <g>
        <path d="M 420 85 L 485 195 L 435 230 L 385 200 Z" fill="${sleeveColor}" />
        <path d="M 420 85 L 485 195 L 435 230 L 385 200 Z" fill="url(#sleeveShadeRight)" />
        <!-- Cuff Trim -->
        <path d="M 485 195 L 475 180 L 425 215 L 435 230 Z" fill="${accent}" />
        ${type === "varsity" ? `
          <path d="M 472 175 L 466 167 L 416 202 L 422 210 Z" fill="${base}" />
        ` : ''}
      </g>

      <!-- 2. MAIN BODY / TORSO -->
      <g>
        <!-- Base Shape -->
        <path d="M 180 50 L 80 85 L 115 200 L 100 515 C 180 528, 320 528, 400 515 L 385 200 L 420 85 L 320 50 Z" fill="${base}" />

        <!-- Sublimation / Pattern Layer inside clip -->
        <g clip-path="url(#torsoClip)">
          ${patternSVG}
        </g>

        <!-- Torso Realistic Shading & Creases -->
        <path d="M 180 50 L 80 85 L 115 200 L 100 515 C 180 528, 320 528, 400 515 L 385 200 L 420 85 L 320 50 Z" fill="url(#bodyShade)" />
        
        <!-- Side Ventilation Panels -->
        <path d="M 115 200 L 100 515 L 112 513 L 125 205 Z" fill="${accent}" opacity="0.65" />
        <path d="M 385 200 L 400 515 L 388 513 L 375 205 Z" fill="${accent}" opacity="0.65" />

        <!-- Bottom Hem Trim -->
        <path d="M 100 505 C 180 518, 320 518, 400 505 L 400 515 C 320 528, 180 528, 100 515 Z" fill="${accent}" />
      </g>

      <!-- 3. COLLAR & NECKLINE -->
      <g>
        <!-- Inner Back Neck -->
        <path d="M 180 50 C 215 75, 285 75, 320 50 C 290 65, 210 65, 180 50 Z" fill="#0b1120" opacity="0.75" />
        
        ${isBack ? `
          <!-- Back Collar -->
          <path d="M 180 50 C 220 62, 280 62, 320 50 L 324 57 C 280 70, 220 70, 176 57 Z" fill="${accent}" />
        ` : `
          <!-- Front V-Neck / Crew Rib -->
          <path d="M 180 50 L 250 105 L 320 50 L 312 45 L 250 93 L 188 45 Z" fill="${accent}" />
          <!-- Inner collar line -->
          <polygon points="250,96 244,91 256,91" fill="#ffffff" />
        `}
      </g>

      <!-- 4. APPAREL SPECIFIC ADDITIONS -->
      ${hoodieElements}
      ${varsityElements}

      <!-- 5. GRAPHICS / TEXT / BRANDING -->
      ${!isBack ? `
        <!-- === FRONT VIEW GRAPHICS === -->
        
        <!-- Left Chest: DU College Crest Badge -->
        <g transform="translate(145, 150)">
          <!-- Gold Badge Ring -->
          <circle cx="0" cy="0" r="28" fill="${base}" stroke="${accent}" stroke-width="3" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.4))" />
          <circle cx="0" cy="0" r="23" fill="none" stroke="${accent}" stroke-width="1" stroke-dasharray="2 2" />
          <text x="0" y="-4" font-family="'Outfit', sans-serif" font-weight="900" font-size="12" fill="${accent}" text-anchor="middle">
            ${VISUALIZER_STATE.collegeShort.slice(0, 6)}
          </text>
          <text x="0" y="8" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="7" fill="#ffffff" text-anchor="middle" letter-spacing="1">
            EST. 1922
          </text>
          <polygon points="0,11 -4,15 4,15" fill="${accent}" />
        </g>

        <!-- Right Chest: DU Athletics Insignia -->
        <g transform="translate(355, 150)">
          <circle cx="0" cy="0" r="14" fill="${accent}" opacity="0.2" />
          <!-- Star & Brand Logo -->
          <path d="M 0,-8 L 2.5,-2.5 L 8,-2.5 L 3.5,1 L 5.5,7 L 0,3.5 L -5.5,7 L -3.5,1 L -8,-2.5 L -2.5,-2.5 Z" fill="${accent}" />
          <text x="0" y="16" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="6" fill="${text}" text-anchor="middle" letter-spacing="1">
            DU MERCH
          </text>
        </g>

        <!-- Center Front: Society Name -->
        <g transform="translate(250, 260)">
          <!-- Drop Shadow for typography -->
          <text 
            x="0" 
            y="2" 
            font-family="'Bebas Neue', sans-serif" 
            font-size="44" 
            font-weight="900" 
            letter-spacing="3" 
            fill="#000000" 
            opacity="0.45" 
            text-anchor="middle"
          >
            ${VISUALIZER_STATE.societyName}
          </text>
          <!-- Main text -->
          <text 
            x="0" 
            y="0" 
            font-family="'Bebas Neue', sans-serif" 
            font-size="44" 
            font-weight="900" 
            letter-spacing="3" 
            fill="${text}" 
            stroke="${accent}" 
            stroke-width="1" 
            text-anchor="middle"
          >
            ${VISUALIZER_STATE.societyName}
          </text>

          <!-- Society Subtitle / Domain Pill -->
          <rect x="-85" y="16" width="170" height="18" rx="9" fill="${accent}" />
          <text 
            x="0" 
            y="29" 
            font-family="'Plus Jakarta Sans', sans-serif" 
            font-weight="800" 
            font-size="8.5" 
            letter-spacing="1.5" 
            fill="#0f172a" 
            text-anchor="middle"
          >
            ${VISUALIZER_STATE.societySubtitle}
          </text>
        </g>

        <!-- Small Lower Front Player Number -->
        <g transform="translate(345, 335)">
          <text 
            x="0" 
            y="0" 
            font-family="'Teko', sans-serif" 
            font-size="34" 
            font-weight="700" 
            fill="${text}" 
            stroke="${accent}" 
            stroke-width="1" 
            text-anchor="middle" 
            opacity="0.8"
          >
            ${VISUALIZER_STATE.playerNumber}
          </text>
        </g>

      ` : `
        <!-- === BACK VIEW GRAPHICS === -->
        
        <!-- Top Arched College Name -->
        <g transform="translate(250, 130)">
          <text 
            x="0" 
            y="0" 
            font-family="'Bebas Neue', sans-serif" 
            font-size="24" 
            font-weight="700" 
            letter-spacing="4" 
            fill="${accent}" 
            text-anchor="middle"
          >
            ${VISUALIZER_STATE.collegeName.toUpperCase()}
          </text>
          <line x1="-70" y1="8" x2="70" y2="8" stroke="${accent}" stroke-width="1.5" opacity="0.6" />
        </g>

        <!-- Upper Player / Member Name -->
        <g transform="translate(250, 185)">
          <text 
            x="0" 
            y="3" 
            font-family="'Bebas Neue', sans-serif" 
            font-size="38" 
            font-weight="800" 
            letter-spacing="3" 
            fill="#000000" 
            opacity="0.4" 
            text-anchor="middle"
          >
            ${VISUALIZER_STATE.playerName}
          </text>
          <text 
            x="0" 
            y="0" 
            font-family="'Bebas Neue', sans-serif" 
            font-size="38" 
            font-weight="800" 
            letter-spacing="3" 
            fill="${text}" 
            text-anchor="middle"
          >
            ${VISUALIZER_STATE.playerName}
          </text>
        </g>

        <!-- Giant Player / Batch Number -->
        <g transform="translate(250, 340)">
          <!-- Outer Shadow -->
          <text 
            x="0" 
            y="8" 
            font-family="'Teko', sans-serif" 
            font-size="175" 
            font-weight="700" 
            fill="#000000" 
            opacity="0.45" 
            text-anchor="middle"
          >
            ${VISUALIZER_STATE.playerNumber}
          </text>
          <!-- Accent Stroke Outline -->
          <text 
            x="0" 
            y="0" 
            font-family="'Teko', sans-serif" 
            font-size="175" 
            font-weight="700" 
            fill="none" 
            stroke="${accent}" 
            stroke-width="10" 
            stroke-linejoin="round" 
            text-anchor="middle"
          >
            ${VISUALIZER_STATE.playerNumber}
          </text>
          <!-- Main Inner Number Fill -->
          <text 
            x="0" 
            y="0" 
            font-family="'Teko', sans-serif" 
            font-size="175" 
            font-weight="700" 
            fill="${text}" 
            text-anchor="middle"
          >
            ${VISUALIZER_STATE.playerNumber}
          </text>
        </g>

        <!-- Lower Society Motto -->
        <g transform="translate(250, 460)">
          <text 
            x="0" 
            y="0" 
            font-family="'Plus Jakarta Sans', sans-serif" 
            font-size="10" 
            font-weight="800" 
            letter-spacing="3" 
            fill="${accent}" 
            opacity="0.9" 
            text-anchor="middle"
          >
            • DELHI UNIVERSITY •
          </text>
        </g>
      `}
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
// 💬 SEND THIS EXACT MOCKUP TO WHATSAPP
// ==========================================
function orderVisualizerMockupOnWhatsApp() {
  const apparelName = VISUALIZER_STATE.apparelType === "jersey" ? "Pro Dri-Fit Sublimation Jersey" :
                      VISUALIZER_STATE.apparelType === "hoodie" ? "Heavy Fleece Society Hoodie" :
                      VISUALIZER_STATE.apparelType === "tee" ? "Streetwear Oversized Cotton Tee" : "Varsity Letterman Jacket";

  let message = `*⚡ NEW CUSTOM MOCKUP ORDER FROM 2D JERSEY STUDIO*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*DU College:* ${VISUALIZER_STATE.collegeName}\n`;
  message += `*Society / Club:* ${VISUALIZER_STATE.societyName} (${VISUALIZER_STATE.societySubtitle})\n`;
  message += `*Apparel Type:* ${apparelName}\n`;
  message += `*Base Color Scheme:* ${VISUALIZER_STATE.baseColor}\n`;
  message += `*Accent / Trim Color:* ${VISUALIZER_STATE.accentColor}\n`;
  message += `*Pattern Style:* ${VISUALIZER_STATE.pattern.toUpperCase()}\n`;
  message += `*Sample Back Name:* ${VISUALIZER_STATE.playerName}\n`;
  message += `*Sample Number:* ${VISUALIZER_STATE.playerNumber}\n`;
  message += `*Estimated Quantity:* ${VISUALIZER_STATE.quantity} Pieces\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `_Hi DU Merch Team! We created this exact society mockup on your visualizer and want to proceed with digital mockups, sizing samples, and final fest bulk quotation._`;

  const num = typeof STORE_CONFIG !== "undefined" ? STORE_CONFIG.whatsappNumber : "919876543210";
  const url = `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
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
  
  // High-res canvas (1000 x 1120)
  canvas.width = 1000;
  canvas.height = 1120;

  const img = new Image();
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    // Fill sleek background
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle gradient glow
    const grad = ctx.createRadialGradient(500, 500, 50, 500, 500, 600);
    grad.addColorStop(0, "rgba(128, 0, 32, 0.35)");
    grad.addColorStop(1, "rgba(15, 23, 42, 1)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Header
    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 28px 'Outfit', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("UNIVERSITY MERCH (ORIGINAL) • SOCIETY JERSEY STUDIO", 500, 60);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "20px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(`${VISUALIZER_STATE.collegeName.toUpperCase()} • ${VISUALIZER_STATE.societyName}`, 500, 95);

    // Draw Jersey Mockup
    ctx.drawImage(img, 100, 120, 800, 896);

    // Draw Footer Info
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(`Custom Society Apparel • Order via WhatsApp`, 500, 1060);

    ctx.fillStyle = "#64748b";
    ctx.font = "16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(`View: ${VISUALIZER_STATE.isFlipped ? 'BACK' : 'FRONT'} | Qty: ${VISUALIZER_STATE.quantity} pcs | du-merch-store`, 500, 1090);

    // Trigger Download
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = `${VISUALIZER_STATE.collegeShort}-${VISUALIZER_STATE.societyName}-Mockup.png`;
    downloadLink.href = pngUrl;
    downloadLink.click();

    URL.revokeObjectURL(url);
    if (typeof showToast === "function") {
      showToast("Mockup image downloaded! Share it in your society WhatsApp group 🚀");
    }
  };

  img.src = url;
}
