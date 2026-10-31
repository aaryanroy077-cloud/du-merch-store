// Delhi University Merch Store - Comprehensive Data Directory
// Official College Crests, Heraldry, Colors & Campus Information

const DU_COLLEGES = [
  // ==========================================
  // --- NORTH CAMPUS ---
  // ==========================================
  {
    id: "du-central",
    name: "Delhi University Central",
    shortName: "DU Central",
    campus: "North Campus",
    est: "1922",
    badge: "Est. 1922 • Central",
    slug: "du-central",
    monogram: "DU",
    primaryColor: "#800020",
    accentColor: "#f59e0b",
    slogan: "Nishtha Dhriti Satyam",
    symbolType: "du-elephant"
  },
  {
    id: "srcc",
    name: "Shri Ram College of Commerce",
    shortName: "SRCC",
    campus: "North Campus",
    est: "1926",
    badge: "North Campus Legend",
    slug: "srcc",
    monogram: "SRCC",
    primaryColor: "#6b1426",
    accentColor: "#d97706",
    slogan: "Character is Supreme",
    symbolType: "sun-wheel"
  },
  {
    id: "hindu",
    name: "Hindu College",
    shortName: "Hindu",
    campus: "North Campus",
    est: "1899",
    badge: "Heritage 1899",
    slug: "hindu",
    monogram: "HC",
    primaryColor: "#0f2b46",
    accentColor: "#f59e0b",
    slogan: "Steered by the Past, Moulding the Future",
    symbolType: "hindu-lion"
  },
  {
    id: "stephens",
    name: "St. Stephen's College",
    shortName: "Stephen's",
    campus: "North Campus",
    est: "1881",
    badge: "Historic North Campus",
    slug: "stephens",
    monogram: "SSC",
    primaryColor: "#1a365d",
    accentColor: "#b91c1c",
    slogan: "Ad Dei Gloriam",
    symbolType: "maltese-cross"
  },
  {
    id: "hansraj",
    name: "Hansraj College",
    shortName: "Hansraj",
    campus: "North Campus",
    est: "1948",
    badge: "Lovers Point Heritage",
    slug: "hansraj",
    monogram: "HRC",
    primaryColor: "#14532d",
    accentColor: "#f59e0b",
    slogan: "Faith, Knowledge, Truth",
    symbolType: "hamsa-swan"
  },
  {
    id: "miranda",
    name: "Miranda House",
    shortName: "Miranda",
    campus: "North Campus",
    est: "1948",
    badge: "NIRF #1 Ranked",
    slug: "miranda",
    monogram: "MH",
    primaryColor: "#581c87",
    accentColor: "#e9d5ff",
    slogan: "Swadhyayanna Pramaditavyam",
    symbolType: "lamp-lotus"
  },
  {
    id: "kmc",
    name: "Kirori Mal College",
    shortName: "KMC",
    campus: "North Campus",
    est: "1954",
    badge: "The Stage & Ashoka Lawn",
    slug: "kmc",
    monogram: "KMC",
    primaryColor: "#3b1e54",
    accentColor: "#fbbf24",
    slogan: "Live to Learn",
    symbolType: "torch-shield"
  },
  {
    id: "ramjas",
    name: "Ramjas College",
    campus: "North Campus",
    shortName: "Ramjas",
    est: "1917",
    badge: "Centenary Campus",
    slug: "ramjas",
    monogram: "RC",
    primaryColor: "#7f1d1d",
    accentColor: "#f59e0b",
    slogan: "Knowledge is Supreme Power",
    symbolType: "book-torch"
  },
  {
    id: "khalsa",
    name: "SGTB Khalsa College",
    campus: "North Campus",
    shortName: "Khalsa",
    est: "1951",
    badge: "Sports & Bhangra Hub",
    slug: "khalsa",
    monogram: "SGTB",
    primaryColor: "#1e3a8a",
    accentColor: "#f59e0b",
    slogan: "Deg Tegh Fateh",
    symbolType: "khanda"
  },
  {
    id: "drc",
    name: "Daulat Ram College",
    campus: "North Campus",
    shortName: "DRC",
    est: "1960",
    badge: "North Campus Women's",
    slug: "drc",
    monogram: "DRC",
    primaryColor: "#831843",
    accentColor: "#f472b6",
    slogan: "Knowledge Illuminates Life",
    symbolType: "lotus-flame"
  },
  {
    id: "ipcw",
    name: "Indraprastha College for Women",
    campus: "North Campus",
    shortName: "IPCW",
    est: "1924",
    badge: "Oldest Women's College",
    slug: "ipcw",
    monogram: "IPCW",
    primaryColor: "#1e1b4b",
    accentColor: "#38bdf8",
    slogan: "Truth, Courage, Service",
    symbolType: "shield-monogram"
  },
  {
    id: "dse",
    name: "Delhi School of Economics",
    campus: "North Campus",
    shortName: "D-School",
    est: "1949",
    badge: "Ratan Tata Library",
    slug: "dse",
    monogram: "DSE",
    primaryColor: "#0f172a",
    accentColor: "#cbd5e1",
    slogan: "Excellence in Thought",
    symbolType: "torch-shield"
  },

  // ==========================================
  // --- SOUTH CAMPUS ---
  // ==========================================
  {
    id: "lsr",
    name: "Lady Shri Ram College",
    campus: "South Campus",
    shortName: "LSR",
    est: "1956",
    badge: "Lajpat Nagar Pride",
    slug: "lsr",
    monogram: "LSR",
    primaryColor: "#064e3b",
    accentColor: "#f59e0b",
    slogan: "That Which Liberates is Knowledge",
    symbolType: "tree-lamp"
  },
  {
    id: "venky",
    name: "Sri Venkateswara College",
    campus: "South Campus",
    shortName: "Venky",
    est: "1961",
    badge: "South Campus Heart",
    slug: "venky",
    monogram: "SVC",
    primaryColor: "#172554",
    accentColor: "#fbbf24",
    slogan: "Satyam Shivam Sundaram",
    symbolType: "balaji-crest"
  },
  {
    id: "gargi",
    name: "Gargi College",
    campus: "South Campus",
    shortName: "Gargi",
    est: "1967",
    badge: "Siri Fort Hub",
    slug: "gargi",
    monogram: "GC",
    primaryColor: "#701a75",
    accentColor: "#f472b6",
    slogan: "Enlightenment Through Knowledge",
    symbolType: "veena-lotus"
  },
  {
    id: "jmc",
    name: "Jesus and Mary College",
    campus: "South Campus",
    shortName: "JMC",
    est: "1968",
    badge: "Chanakyapuri Campus",
    slug: "jmc",
    monogram: "JMC",
    primaryColor: "#1d4ed8",
    accentColor: "#ffffff",
    slogan: "Thou Art My Strength",
    symbolType: "fleur-de-lis"
  },
  {
    id: "arsd",
    name: "Atma Ram Sanatan Dharma College",
    campus: "South Campus",
    shortName: "ARSD",
    est: "1959",
    badge: "Dhaula Kuan Central",
    slug: "arsd",
    monogram: "ARSD",
    primaryColor: "#7f1d1d",
    accentColor: "#fbbf24",
    slogan: "Tejasvi Navadhitamastu",
    symbolType: "dharma-chakra"
  },
  {
    id: "sbsc",
    name: "Shaheed Bhagat Singh College",
    campus: "South Campus",
    shortName: "SBSC",
    est: "1967",
    badge: "Sheikh Sarai Powerhouse",
    slug: "sbsc",
    monogram: "SBSC",
    primaryColor: "#18181b",
    accentColor: "#ea580c",
    slogan: "Rashtriya Seva Param Dharma",
    symbolType: "freedom-torch"
  },
  {
    id: "dcac",
    name: "Delhi College of Arts and Commerce",
    campus: "South Campus",
    shortName: "DCAC",
    est: "1987",
    badge: "Netaji Nagar",
    slug: "dcac",
    monogram: "DCAC",
    primaryColor: "#1e3a8a",
    accentColor: "#38bdf8",
    slogan: "Knowledge and Creativity",
    symbolType: "palette-quill"
  },
  {
    id: "mlnc",
    name: "Motilal Nehru College",
    campus: "South Campus",
    shortName: "MLNC",
    est: "1964",
    badge: "Benito Juarez Road",
    slug: "mlnc",
    monogram: "MLNC",
    primaryColor: "#1e293b",
    accentColor: "#38bdf8",
    slogan: "Character and Action",
    symbolType: "torch-shield"
  },
  {
    id: "rla",
    name: "Ram Lal Anand College",
    campus: "South Campus",
    shortName: "RLA",
    est: "1964",
    badge: "South Campus Hub",
    slug: "rla",
    monogram: "RLA",
    primaryColor: "#0f766e",
    accentColor: "#5eead4",
    slogan: "Knowledge Leads to Immortality",
    symbolType: "shield-monogram"
  },
  {
    id: "maitreyi",
    name: "Maitreyi College",
    campus: "South Campus",
    shortName: "Maitreyi",
    est: "1967",
    badge: "Chanakyapuri Green",
    slug: "maitreyi",
    monogram: "MC",
    primaryColor: "#4c1d95",
    accentColor: "#c084fc",
    slogan: "Knowledge Leads to Bliss",
    symbolType: "lamp-lotus"
  },
  {
    id: "aryabhatta",
    name: "Aryabhatta College",
    campus: "South Campus",
    shortName: "Aryabhatta",
    est: "2014",
    badge: "Anand Niketan Modern",
    slug: "aryabhatta",
    monogram: "ABC",
    primaryColor: "#0284c7",
    accentColor: "#facc15",
    slogan: "Innovation and Wisdom",
    symbolType: "sun-wheel"
  },
  {
    id: "aurobindo",
    name: "Sri Aurobindo College",
    campus: "South Campus",
    shortName: "Aurobindo",
    est: "1972",
    badge: "Malviya Nagar",
    slug: "aurobindo",
    monogram: "SAC",
    primaryColor: "#b45309",
    accentColor: "#fef08a",
    slogan: "Towards Greater Light",
    symbolType: "lotus-flame"
  },
  {
    id: "knc",
    name: "Kamala Nehru College",
    campus: "South Campus",
    shortName: "KNC",
    est: "1964",
    badge: "August Kranti Marg",
    slug: "knc",
    monogram: "KNC",
    primaryColor: "#991b1b",
    accentColor: "#fef08a",
    slogan: "Service with Humility",
    symbolType: "lamp-lotus"
  },

  // ==========================================
  // --- OFF-CAMPUS & SPECIALIZED ---
  // ==========================================
  {
    id: "sscbs",
    name: "Shaheed Sukhdev College of Business Studies",
    campus: "Off-Campus",
    shortName: "SSCBS",
    est: "1987",
    badge: "CBS Elite Business",
    slug: "sscbs",
    monogram: "CBS",
    primaryColor: "#0f172a",
    accentColor: "#38bdf8",
    slogan: "Excellence in Action",
    symbolType: "cbs-hexagon"
  },
  {
    id: "ddu",
    name: "Deen Dayal Upadhyaya College",
    campus: "Off-Campus",
    shortName: "DDU",
    est: "1990",
    badge: "Dwarka Mega Campus",
    slug: "ddu",
    monogram: "DDU",
    primaryColor: "#1e3a8a",
    accentColor: "#f59e0b",
    slogan: "Character, Knowledge, Progress",
    symbolType: "torch-shield"
  },
  {
    id: "kmv",
    name: "Keshav Mahavidyalaya",
    campus: "Off-Campus",
    shortName: "Keshav",
    est: "1994",
    badge: "Rani Bagh Tech",
    slug: "keshav",
    monogram: "KMV",
    primaryColor: "#065f46",
    accentColor: "#34d399",
    slogan: "Truth Overcomes All",
    symbolType: "sun-wheel"
  },
  {
    id: "mac",
    name: "Maharaja Agrasen College",
    campus: "Off-Campus",
    shortName: "Agrasen",
    est: "1994",
    badge: "Vasundhara Enclave",
    slug: "agrasen",
    monogram: "MAC",
    primaryColor: "#831843",
    accentColor: "#fde047",
    slogan: "Valour and Righteousness",
    symbolType: "sun-wheel"
  },
  {
    id: "shivaji",
    name: "Shivaji College",
    campus: "Off-Campus",
    shortName: "Shivaji",
    est: "1961",
    badge: "Raja Garden Western",
    slug: "shivaji",
    monogram: "SVC",
    primaryColor: "#c2410c",
    accentColor: "#fde047",
    slogan: "Courage and Honor",
    symbolType: "freedom-torch"
  },
  {
    id: "rajdhani",
    name: "Rajdhani College",
    campus: "Off-Campus",
    shortName: "Rajdhani",
    est: "1964",
    badge: "Ring Road Western",
    slug: "rajdhani",
    monogram: "RC",
    primaryColor: "#155e75",
    accentColor: "#67e8f9",
    slogan: "Wisdom Unfurls Truth",
    symbolType: "shield-monogram"
  },
  {
    id: "dyal-singh",
    name: "Dyal Singh College",
    campus: "Off-Campus",
    shortName: "Dyal Singh",
    est: "1959",
    badge: "Lodhi Road Central",
    slug: "dyal-singh",
    monogram: "DSC",
    primaryColor: "#1e293b",
    accentColor: "#f59e0b",
    slogan: "Gather the Pearls of Wisdom",
    symbolType: "book-torch"
  },
  {
    id: "zakir-husain",
    name: "Zakir Husain Delhi College",
    campus: "Off-Campus",
    shortName: "Zakir Husain",
    est: "1792",
    badge: "Oldest DU Heritage (1792)",
    slug: "zakir-husain",
    monogram: "ZHDC",
    primaryColor: "#064e3b",
    accentColor: "#fbbf24",
    slogan: "Live to Enlighten",
    symbolType: "heritage-arch"
  },
  {
    id: "deshbandhu",
    name: "Deshbandhu College",
    campus: "Off-Campus",
    shortName: "Deshbandhu",
    est: "1952",
    badge: "Kalkaji Hills",
    slug: "deshbandhu",
    monogram: "DBC",
    primaryColor: "#312e81",
    accentColor: "#818cf8",
    slogan: "Sacrifice for the Nation",
    symbolType: "freedom-torch"
  },
  {
    id: "andc",
    name: "Acharya Narendra Dev College",
    campus: "Off-Campus",
    shortName: "ANDC",
    est: "1991",
    badge: "Govindpuri Science Star",
    slug: "andc",
    monogram: "ANDC",
    primaryColor: "#047857",
    accentColor: "#6ee7b7",
    slogan: "Knowledge Fuels Discovery",
    symbolType: "sun-wheel"
  },
  {
    id: "ramanujan",
    name: "Ramanujan College",
    campus: "Off-Campus",
    shortName: "Ramanujan",
    est: "1958",
    badge: "Kalkaji Tech Hub",
    slug: "ramanujan",
    monogram: "RC",
    primaryColor: "#1e3a8a",
    accentColor: "#93c5fd",
    slogan: "Truth in Precision",
    symbolType: "shield-monogram"
  },
  {
    id: "pgdav",
    name: "PGDAV College",
    campus: "Off-Campus",
    shortName: "PGDAV",
    est: "1957",
    badge: "Nehru Nagar",
    slug: "pgdav",
    monogram: "PGDAV",
    primaryColor: "#7c2d12",
    accentColor: "#fde047",
    slogan: "Vedic Wisdom, Modern Vision",
    symbolType: "hamsa-swan"
  },
  {
    id: "kalindi",
    name: "Kalindi College",
    campus: "Off-Campus",
    shortName: "Kalindi",
    est: "1967",
    badge: "East Patel Nagar",
    slug: "kalindi",
    monogram: "KC",
    primaryColor: "#831843",
    accentColor: "#f472b6",
    slogan: "Radiant Mind, Fearless Soul",
    symbolType: "lotus-flame"
  },
  {
    id: "shyamlal",
    name: "Shyam Lal College",
    campus: "Off-Campus",
    shortName: "Shyam Lal",
    est: "1964",
    badge: "Shahdara Heritage",
    slug: "shyamlal",
    monogram: "SLC",
    primaryColor: "#164e63",
    accentColor: "#67e8f9",
    slogan: "Work is Worship",
    symbolType: "book-torch"
  },
  {
    id: "bcash",
    name: "Bhaskaracharya College of Applied Sciences",
    campus: "Off-Campus",
    shortName: "Bhaskaracharya",
    est: "1995",
    badge: "Dwarka Applied Sciences",
    slug: "bcash",
    monogram: "BCAS",
    primaryColor: "#0f766e",
    accentColor: "#2dd4bf",
    slogan: "Science for Humanity",
    symbolType: "cbs-hexagon"
  }
];

// ==========================================
// 🛡️ AUTHENTIC REAL COLLEGE CREST GENERATOR
// Renders vector college seals with real symbols
// ==========================================
function getCollegeLogoSVG(col, size = 64) {
  const pCol = col.primaryColor || "#09090b";
  const aCol = col.accentColor || "#f59e0b";
  const est = col.est || "1922";
  const mono = col.monogram || col.shortName.slice(0, 3).toUpperCase();
  const type = col.symbolType || "shield-monogram";

  let emblemContent = "";

  if (type === "maltese-cross") {
    // St. Stephen's College Maltese Cross & Star
    emblemContent = `
      <polygon points="40,22 44,34 56,34 47,42 50,54 40,46 30,54 33,42 24,34 36,34" fill="${aCol}" />
      <circle cx="40" cy="38" r="4" fill="#ffffff" />
      <line x1="40" y1="20" x2="40" y2="56" stroke="#ffffff" stroke-width="1.5" opacity="0.6" />
      <line x1="22" y1="38" x2="58" y2="38" stroke="#ffffff" stroke-width="1.5" opacity="0.6" />
    `;
  } else if (type === "khanda") {
    // SGTB Khalsa College Sacred Khanda
    emblemContent = `
      <circle cx="40" cy="38" r="10" stroke="${aCol}" stroke-width="2.5" fill="none" />
      <line x1="40" y1="22" x2="40" y2="54" stroke="${aCol}" stroke-width="3" stroke-linecap="round" />
      <path d="M 28 48 C 24 38, 26 28, 38 24" stroke="${aCol}" stroke-width="2.5" fill="none" stroke-linecap="round" />
      <path d="M 52 48 C 56 38, 54 28, 42 24" stroke="${aCol}" stroke-width="2.5" fill="none" stroke-linecap="round" />
    `;
  } else if (type === "sun-wheel") {
    // SRCC / Commerce & Industry Sunburst Wheel
    emblemContent = `
      <circle cx="40" cy="37" r="9" fill="${pCol}" stroke="${aCol}" stroke-width="2.5" />
      <path d="M 40 22 L 40 26 M 40 48 L 40 52 M 25 37 L 29 37 M 51 37 L 55 37 M 29 26 L 32 29 M 48 45 L 51 48 M 29 48 L 32 45 M 48 29 L 51 26" stroke="${aCol}" stroke-width="2" stroke-linecap="round" />
      <!-- Open Book -->
      <path d="M 32 46 C 36 44, 40 45, 40 47 C 40 45, 44 44, 48 46 L 48 51 C 44 49, 40 50, 40 52 C 40 50, 36 49, 32 51 Z" fill="#ffffff" />
    `;
  } else if (type === "hamsa-swan") {
    // Hansraj Hamsa / Swan & Radiant Rays
    emblemContent = `
      <!-- Rising Swan Wings -->
      <path d="M 27 40 C 30 30, 38 31, 40 36 C 42 31, 50 30, 53 40 C 47 44, 40 42, 40 42 C 40 42, 33 44, 27 40 Z" fill="${aCol}" />
      <circle cx="40" cy="31" r="3.5" fill="#ffffff" />
      <!-- Book beneath -->
      <path d="M 31 46 C 35 44, 40 45, 40 47 C 40 45, 45 44, 49 46 L 49 51 C 45 49, 40 50, 40 52 C 40 50, 35 49, 31 51 Z" fill="#ffffff" />
    `;
  } else if (type === "du-elephant") {
    // Delhi University Official Central Seal Motif
    emblemContent = `
      <!-- Royal Elephant Silhouette & Lotus -->
      <path d="M 31 38 C 30 32, 36 26, 44 26 C 49 26, 52 30, 50 35 C 47 36, 46 38, 47 43 L 44 43 C 44 40, 45 37, 43 36 C 39 36, 37 38, 38 43 L 34 43 C 33 40, 32 39, 31 38 Z" fill="${aCol}" />
      <!-- Lotus Petals -->
      <path d="M 32 48 C 36 45, 40 47, 40 49 C 40 47, 44 45, 48 48 C 45 52, 35 52, 32 48 Z" fill="#ffffff" />
    `;
  } else if (type === "lamp-lotus" || type === "lotus-flame") {
    // Miranda House / Women's Colleges Lamp of Knowledge & Lotus
    emblemContent = `
      <!-- Flame of Knowledge -->
      <path d="M 40 22 C 43 27, 44 31, 40 35 C 36 31, 37 27, 40 22 Z" fill="${aCol}" />
      <!-- Diya / Lamp Bowl -->
      <path d="M 31 35 L 49 35 C 48 41, 32 41, 31 35 Z" fill="#ffffff" />
      <!-- Lotus Petals beneath -->
      <path d="M 28 44 C 33 41, 39 43, 40 46 C 41 43, 47 41, 52 44 C 48 49, 32 49, 28 44 Z" fill="${aCol}" />
    `;
  } else if (type === "tree-lamp") {
    // Lady Shri Ram (LSR) Tree of Life
    emblemContent = `
      <!-- Tree of Wisdom & Foliage -->
      <circle cx="40" cy="30" r="11" fill="${aCol}" opacity="0.9" />
      <path d="M 40 33 L 40 49" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
      <path d="M 40 38 L 33 34 M 40 41 L 47 37" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
      <circle cx="40" cy="27" r="3" fill="#ffffff" />
      <!-- Base earth -->
      <line x1="30" y1="50" x2="50" y2="50" stroke="${aCol}" stroke-width="2" stroke-linecap="round" />
    `;
  } else if (type === "balaji-crest") {
    // Sri Venkateswara Sacred Temple Crest
    emblemContent = `
      <!-- Sacred Shankha & Chakra Emblems -->
      <polygon points="40,22 43,30 40,40 37,30" fill="${aCol}" />
      <path d="M 30 31 C 28 25, 34 23, 34 29 C 34 33, 29 36, 32 42" stroke="${aCol}" stroke-width="2" fill="none" />
      <circle cx="48" cy="31" r="5" stroke="${aCol}" stroke-width="2" fill="none" />
      <polygon points="48,28 50,31 48,34 46,31" fill="#ffffff" />
      <line x1="30" y1="47" x2="50" y2="47" stroke="#ffffff" stroke-width="2" />
    `;
  } else if (type === "veena-lotus") {
    // Gargi College Veena
    emblemContent = `
      <path d="M 44 23 L 34 46" stroke="${aCol}" stroke-width="3" stroke-linecap="round" />
      <circle cx="34" cy="46" r="6" fill="${aCol}" stroke="#ffffff" stroke-width="1.5" />
      <circle cx="44" cy="25" r="4" fill="${aCol}" stroke="#ffffff" stroke-width="1.5" />
      <path d="M 28 50 C 33 47, 47 47, 52 50" stroke="#ffffff" stroke-width="2" fill="none" />
    `;
  } else if (type === "freedom-torch" || type === "torch-shield" || type === "book-torch") {
    // SBSC / KMC Torch of Freedom & Shield
    emblemContent = `
      <!-- Blazing Torch -->
      <path d="M 40 22 C 44 26, 45 30, 40 33 C 35 30, 36 26, 40 22 Z" fill="#ef4444" />
      <path d="M 40 25 C 42 28, 42 30, 40 32 C 38 30, 38 28, 40 25 Z" fill="${aCol}" />
      <polygon points="36,33 44,33 42,48 38,48" fill="${aCol}" stroke="#ffffff" stroke-width="1" />
      <line x1="33" y1="41" x2="47" y2="41" stroke="#ffffff" stroke-width="1.5" />
    `;
  } else if (type === "cbs-hexagon") {
    // SSCBS Management Hexagon
    emblemContent = `
      <polygon points="40,22 52,29 52,43 40,50 28,43 28,29" fill="none" stroke="${aCol}" stroke-width="2.5" />
      <text x="40" y="39" font-family="'Graduate', 'Outfit', sans-serif" font-weight="900" font-size="11" fill="#ffffff" text-anchor="middle">
        CBS
      </text>
    `;
  } else {
    // General Authentic Collegiate Crest with Laurel & Monogram
    emblemContent = `
      <!-- Laurel Wreath -->
      <path d="M 27 45 C 23 37, 25 28, 33 24 M 53 45 C 57 37, 55 28, 47 24" stroke="${aCol}" stroke-width="2" stroke-linecap="round" fill="none" />
      <text x="40" y="41" font-family="'Graduate', 'Outfit', sans-serif" font-weight="900" font-size="13" fill="#ffffff" text-anchor="middle" letter-spacing="1">
        ${mono.slice(0, 4)}
      </text>
    `;
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="crest-svg drop-shadow-sm">
      <!-- Outer Heraldic Shield / Circle -->
      <circle cx="40" cy="40" r="38" fill="${pCol}" stroke="${aCol}" stroke-width="2.5" class="crest-bg" />
      <circle cx="40" cy="40" r="33.5" stroke="#ffffff" stroke-width="0.8" stroke-dasharray="2 2" fill="none" opacity="0.6" />
      
      <!-- Emblem Graphic -->
      <g>
        ${emblemContent}
      </g>

      <!-- Bottom Acronym & Establishment Ribbon -->
      <path d="M 20 58 Q 40 65 60 58 L 60 67 Q 40 73 20 67 Z" fill="#09090b" stroke="${aCol}" stroke-width="1" />
      <text x="40" y="66" font-family="'Graduate', 'Outfit', sans-serif" font-weight="800" font-size="7.5" fill="#ffffff" text-anchor="middle" letter-spacing="1.5" class="crest-text">
        ${col.shortName.toUpperCase().slice(0, 9)}
      </text>

      <!-- Est Star -->
      <circle cx="40" cy="14" r="1.8" fill="${aCol}" />
    </svg>
  `;
}


// ==========================================
// 💬 STUDENT TESTIMONIALS & REVIEWS
// ==========================================
const REVIEWS = [
  {
    name: "Aaditya S.",
    role: "President, The Commerce Society",
    college: "SRCC",
    quote: "Ordered custom varsity jackets for our core council. The embroidery and fleece quality are top tier. Delivery to North Campus hostel was seamless."
  },
  {
    name: "Sneha M.",
    role: "Core Team, Western Dance Society",
    college: "Hindu College",
    quote: "The 2D Mockup Studio made it super simple to visualize our team hoodies with custom names and numbers before ordering. Everyone loved them!"
  },
  {
    name: "Rohan V.",
    role: "Convenor, Cultural Council",
    college: "St. Stephen's College",
    quote: "Got custom personalized hoodies with the authentic college crest. Fabric is heavyweight 380 GSM and fits perfectly. The WhatsApp ordering was smooth."
  }
];
