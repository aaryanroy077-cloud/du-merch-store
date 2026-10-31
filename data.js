// Delhi University Merch Store - Comprehensive Data Directory
// Minimalist Editorial Design System (Zara / H&M Inspired)

const DU_COLLEGES = [
  // --- NORTH CAMPUS ---
  {
    id: "du-central",
    name: "Delhi University Central",
    shortName: "DU Central",
    campus: "North Campus",
    est: "1922",
    badge: "Official Campus",
    slug: "du-central",
    monogram: "DU",
    slogan: "Nishtha Dhriti Satyam"
  },
  {
    id: "srcc",
    name: "Shri Ram College of Commerce",
    shortName: "SRCC",
    campus: "North Campus",
    est: "1926",
    badge: "North Campus Legend",
    slug: "srcc",
    monogram: "SR",
    slogan: "Character is Supreme"
  },
  {
    id: "hindu",
    name: "Hindu College",
    shortName: "Hindu",
    campus: "North Campus",
    est: "1899",
    badge: "Heritage Institution",
    slug: "hindu",
    monogram: "HC",
    slogan: "Steered by the Past, Moulding the Future"
  },
  {
    id: "stephens",
    name: "St. Stephen's College",
    shortName: "Stephen's",
    campus: "North Campus",
    est: "1881",
    badge: "Historic North Campus",
    slug: "stephens",
    monogram: "SS",
    slogan: "Ad Dei Gloriam"
  },
  {
    id: "hansraj",
    name: "Hansraj College",
    shortName: "Hansraj",
    campus: "North Campus",
    est: "1948",
    badge: "LP Vibes & Heritage",
    slug: "hansraj",
    monogram: "HR",
    slogan: "Faith, Knowledge, Truth"
  },
  {
    id: "miranda",
    name: "Miranda House",
    shortName: "Miranda",
    campus: "North Campus",
    est: "1948",
    badge: "NIRF Top Ranked",
    slug: "miranda",
    monogram: "MH",
    slogan: "Swadhyayanna Pramaditavyam"
  },
  {
    id: "kmc",
    name: "Kirori Mal College",
    shortName: "KMC",
    campus: "North Campus",
    est: "1954",
    badge: "Ashoka Lawn & Theatre",
    slug: "kmc",
    monogram: "KM",
    slogan: "Live to Learn"
  },
  {
    id: "ramjas",
    name: "Ramjas College",
    campus: "North Campus",
    shortName: "Ramjas",
    est: "1917",
    badge: "Centenary Heritage",
    slug: "ramjas",
    monogram: "RC",
    slogan: "Knowledge is Power"
  },
  {
    id: "khalsa",
    name: "SGTB Khalsa College",
    campus: "North Campus",
    shortName: "Khalsa",
    est: "1951",
    badge: "Sports Hub",
    slug: "khalsa",
    monogram: "KC",
    slogan: "Deh Shiva Bar Mohe Ehe"
  },
  {
    id: "daulatram",
    name: "Daulat Ram College",
    campus: "North Campus",
    shortName: "DRC",
    est: "1960",
    badge: "North Campus Pride",
    slug: "daulatram",
    monogram: "DR",
    slogan: "Excellence in Action"
  },
  {
    id: "ipcw",
    name: "Indraprastha College for Women",
    campus: "North Campus",
    shortName: "IPCW",
    est: "1924",
    badge: "Heritage Campus",
    slug: "ipcw",
    monogram: "IP",
    slogan: "Truth, Knowledge, Service"
  },
  {
    id: "dse",
    name: "Delhi School of Economics",
    campus: "North Campus",
    shortName: "D-School",
    est: "1949",
    badge: "DSE Academic Hub",
    slug: "dse",
    monogram: "DS",
    slogan: "Excellence in Economics"
  },

  // --- SOUTH CAMPUS ---
  {
    id: "lsr",
    name: "Lady Shri Ram College",
    campus: "South Campus",
    shortName: "LSR",
    est: "1956",
    badge: "Lajpat Nagar Pride",
    slug: "lsr",
    monogram: "LR",
    slogan: "That Which Liberates is Knowledge"
  },
  {
    id: "venky",
    name: "Sri Venkateswara College",
    campus: "South Campus",
    shortName: "Venky",
    est: "1961",
    badge: "Satya Niketan Heart",
    slug: "venky",
    monogram: "SV",
    slogan: "Satyam Shivam Sundaram"
  },
  {
    id: "gargi",
    name: "Gargi College",
    campus: "South Campus",
    shortName: "Gargi",
    est: "1967",
    badge: "South Campus Icon",
    slug: "gargi",
    monogram: "GC",
    slogan: "Enlightenment through Knowledge"
  },
  {
    id: "jmc",
    name: "Jesus and Mary College",
    campus: "South Campus",
    shortName: "JMC",
    est: "1968",
    badge: "Chanakyapuri Campus",
    slug: "jmc",
    monogram: "JM",
    slogan: "Thou Art the Light"
  },
  {
    id: "arsd",
    name: "Atma Ram Sanatan Dharma College",
    campus: "South Campus",
    shortName: "ARSD",
    est: "1959",
    badge: "Dhaula Kuan Campus",
    slug: "arsd",
    monogram: "AR",
    slogan: "Tejasvi Navadhitamastu"
  },
  {
    id: "sbsc",
    name: "Shaheed Bhagat Singh College",
    campus: "South Campus",
    shortName: "SBSC",
    est: "1967",
    badge: "Sheikh Sarai Hub",
    slug: "sbsc",
    monogram: "SB",
    slogan: "Rashtrahit Sarvopari"
  },
  {
    id: "dcac",
    name: "Delhi College of Arts & Commerce",
    campus: "South Campus",
    shortName: "DCAC",
    est: "1987",
    badge: "Netaji Nagar",
    slug: "dcac",
    monogram: "DC",
    slogan: "Knowledge is Immortality"
  },
  {
    id: "motilal",
    name: "Motilal Nehru College",
    campus: "South Campus",
    shortName: "MLNC",
    est: "1964",
    badge: "Benito Juarez Road",
    slug: "motilal",
    monogram: "MN",
    slogan: "Dedication and Virtue"
  },
  {
    id: "ramlal",
    name: "Ram Lal Anand College",
    campus: "South Campus",
    shortName: "RLA",
    est: "1964",
    badge: "South Campus South Pole",
    slug: "ramlal",
    monogram: "RL",
    slogan: "Knowledge with Discipline"
  },
  {
    id: "maitreyi",
    name: "Maitreyi College",
    campus: "South Campus",
    shortName: "Maitreyi",
    est: "1967",
    badge: "Chanakyapuri Pride",
    slug: "maitreyi",
    monogram: "MC",
    slogan: "Purity and Wisdom"
  },
  {
    id: "aryabhatta",
    name: "Aryabhatta College",
    campus: "South Campus",
    shortName: "Aryabhatta",
    est: "1973",
    badge: "South Campus Hub",
    slug: "aryabhatta",
    monogram: "AC",
    slogan: "Striving for Truth"
  },
  {
    id: "aurobindo",
    name: "Sri Aurobindo College",
    campus: "South Campus",
    shortName: "Aurobindo",
    est: "1972",
    badge: "Malviya Nagar",
    slug: "aurobindo",
    monogram: "SA",
    slogan: "All Life is Yoga"
  },

  // --- OFF-CAMPUS / EAST / WEST / CENTRAL ---
  {
    id: "sscbs",
    name: "Shaheed Sukhdev College of Business Studies",
    campus: "Off-Campus",
    shortName: "SSCBS",
    est: "1987",
    badge: "Rohini Business School",
    slug: "sscbs",
    monogram: "SS",
    slogan: "Knowledge and Action"
  },
  {
    id: "ddu",
    name: "Deen Dayal Upadhyaya College",
    campus: "Off-Campus",
    shortName: "DDU",
    est: "1990",
    badge: "Dwarka Campus",
    slug: "ddu",
    monogram: "DD",
    slogan: "Character and Intellect"
  },
  {
    id: "keshav",
    name: "Keshav Mahavidyalaya",
    campus: "Off-Campus",
    shortName: "Keshav",
    est: "1994",
    badge: "Rani Bagh",
    slug: "keshav",
    monogram: "KM",
    slogan: "Excellence in Education"
  },
  {
    id: "agrasen",
    name: "Maharaja Agrasen College",
    campus: "Off-Campus",
    shortName: "Agrasen",
    est: "1994",
    badge: "Vasundhara Enclave",
    slug: "agrasen",
    monogram: "MA",
    slogan: "Equality and Progress"
  },
  {
    id: "shivaji",
    name: "Shivaji College",
    campus: "Off-Campus",
    shortName: "Shivaji",
    est: "1961",
    badge: "Raja Garden Hub",
    slug: "shivaji",
    monogram: "SC",
    slogan: "Bravery and Wisdom"
  },
  {
    id: "rajdhani",
    name: "Rajdhani College",
    campus: "Off-Campus",
    shortName: "Rajdhani",
    est: "1964",
    badge: "Raja Garden",
    slug: "rajdhani",
    monogram: "RC",
    slogan: "Wisdom through Learning"
  },
  {
    id: "dyalsingh",
    name: "Dyal Singh College",
    campus: "Off-Campus",
    shortName: "Dyal Singh",
    est: "1959",
    badge: "Lodhi Road",
    slug: "dyalsingh",
    monogram: "DS",
    slogan: "Light of Truth"
  },
  {
    id: "zakir",
    name: "Zakir Husain Delhi College",
    campus: "Off-Campus",
    shortName: "Zakir Husain",
    est: "1792",
    badge: "Oldest DU College",
    slug: "zakir",
    monogram: "ZH",
    slogan: "Live by Truth"
  },
  {
    id: "deshbandhu",
    name: "Deshbandhu College",
    campus: "Off-Campus",
    shortName: "Deshbandhu",
    est: "1952",
    badge: "Kalkaji Campus",
    slug: "deshbandhu",
    monogram: "DB",
    slogan: "Love for the Nation"
  },
  {
    id: "andc",
    name: "Acharya Narendra Dev College",
    campus: "Off-Campus",
    shortName: "ANDC",
    est: "1991",
    badge: "Govindpuri Science Hub",
    slug: "andc",
    monogram: "AN",
    slogan: "Innovation in Science"
  },
  {
    id: "ramanujan",
    name: "Ramanujan College",
    campus: "Off-Campus",
    shortName: "Ramanujan",
    est: "1958",
    badge: "Kalkaji Heritage",
    slug: "ramanujan",
    monogram: "RJ",
    slogan: "Discovering Numbers & Truth"
  },
  {
    id: "pgdav",
    name: "PGDAV College",
    campus: "Off-Campus",
    shortName: "PGDAV",
    est: "1957",
    badge: "Nehru Nagar",
    slug: "pgdav",
    monogram: "PG",
    slogan: "Righteous Action"
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
    slogan: "Self-Reliance through Knowledge"
  },
  {
    id: "knc",
    name: "Kamala Nehru College",
    campus: "South Campus",
    shortName: "KNC",
    est: "1964",
    badge: "August Kranti Marg",
    slug: "knc",
    monogram: "KN",
    slogan: "Liberty, Truth, Service"
  },
  {
    id: "shyamlal",
    name: "Shyam Lal College",
    campus: "Off-Campus",
    shortName: "Shyam Lal",
    est: "1964",
    badge: "Shahdara Campus",
    slug: "shyamlal",
    monogram: "SL",
    slogan: "Perseverance and Dedication"
  },
  {
    id: "bhaskaracharya",
    name: "Bhaskaracharya College of Applied Sciences",
    campus: "Off-Campus",
    shortName: "BCAS",
    est: "1995",
    badge: "Dwarka Science Hub",
    slug: "bhaskaracharya",
    monogram: "BC",
    slogan: "Applied Sciences Pioneer"
  }
];

// Helper to generate a minimal editorial vector logo for each college
function getCollegeLogoSVG(col, size = 64) {
  const isDark = false;
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" stroke="#18181b" stroke-width="2" fill="#ffffff" />
      <circle cx="40" cy="40" r="33" stroke="#e4e4e7" stroke-width="1" stroke-dasharray="2 2" fill="none" />
      <text x="40" y="38" font-family="'Outfit', 'Inter', sans-serif" font-weight="900" font-size="20" fill="#09090b" text-anchor="middle" letter-spacing="1">
        ${col.monogram}
      </text>
      <text x="40" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="7.5" fill="#71717a" text-anchor="middle" letter-spacing="1.5">
        EST. ${col.est}
      </text>
      <path d="M 32 58 L 48 58" stroke="#09090b" stroke-width="1" />
    </svg>
  `;
}

const PRODUCTS = [
  // --- 1. MINIMALIST ESSENTIALS & DU HERITAGE ---
  {
    id: "du-hoodie-classic",
    title: "University Heritage Heavyweight Hoodie",
    category: "common",
    campus: "North Campus",
    collegeId: "du-central",
    collegeName: "Delhi University",
    price: 1199,
    originalPrice: 1799,
    badge: "Bestseller",
    type: "Hoodie",
    fabric: "380 GSM Organic Heavyweight Fleece",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    description: "Architectural minimal cut hoodie crafted in premium 380 GSM fleece with high-density embroidered arched collegiate lettering."
  },
  {
    id: "du-north-campus-tee",
    title: "Vishwavidyalaya Metro Minimalist Boxy Tee",
    category: "common",
    campus: "North Campus",
    collegeId: "du-central",
    collegeName: "Delhi University",
    price: 649,
    originalPrice: 999,
    badge: "Essential",
    type: "T-Shirt",
    fabric: "240 GSM Pure Combed Cotton",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    description: "Drop-shoulder relaxed aesthetic tee celebrating the North Campus student lifestyle with high-definition graphic prints."
  },
  {
    id: "du-south-campus-tee",
    title: "Satya Niketan Streetwear Heavyweight Tee",
    category: "common",
    campus: "South Campus",
    collegeId: "venky",
    collegeName: "South Campus Collective",
    price: 649,
    originalPrice: 999,
    badge: "Trending",
    type: "T-Shirt",
    fabric: "240 GSM Pure Combed Cotton",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    description: "Relaxed silhouette streetwear tee commemorating South Campus cafe culture and collegiate aesthetics."
  },
  {
    id: "du-canvas-tote",
    title: "Minimal Raw Cotton Tote Bag",
    category: "common",
    campus: "North Campus",
    collegeId: "du-central",
    collegeName: "Delhi University",
    price: 349,
    originalPrice: 599,
    badge: "Campus Essential",
    type: "Accessories",
    fabric: "16oz Natural Unbleached Canvas with Inner Zipper",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    description: "Minimalist structured canvas tote designed for everyday books, laptops, and student daily carry."
  },
  {
    id: "du-varsity-cap",
    title: "Original Washed Cotton Chino Cap",
    category: "common",
    campus: "North Campus",
    collegeId: "du-central",
    collegeName: "Delhi University",
    price: 449,
    originalPrice: 799,
    badge: "New",
    type: "Accessories",
    fabric: "100% Cotton Chino Twill",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
    description: "Minimal arched embroidery with vintage bronze closure strap. Clean aesthetic profile."
  },

  // --- 2. COLLEGE SPECIFIC RELEASES ---
  {
    id: "srcc-varsity-jacket",
    title: "SRCC 'Crossroads' Monogram Bomber Jacket",
    category: "college",
    campus: "North Campus",
    collegeId: "srcc",
    collegeName: "Shri Ram College of Commerce",
    price: 1899,
    originalPrice: 2799,
    badge: "Iconic",
    type: "Jacket",
    fabric: "Woolen Torso with Vegan Leather Sleeves",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    description: "The definitive varsity letterman with chenille SRCC monogram patch and premium striped cuffs."
  },
  {
    id: "hindu-crewneck-1899",
    title: "Hindu College '1899' Tailored Crewneck",
    category: "college",
    campus: "North Campus",
    collegeId: "hindu",
    collegeName: "Hindu College",
    price: 1099,
    originalPrice: 1599,
    badge: "Heritage",
    type: "Sweatshirt",
    fabric: "350 GSM Loopknit French Terry",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    description: "Clean black minimal crewneck with tonal embroidered Hindu College establishment crest."
  },
  {
    id: "stephens-oxford-hoodie",
    title: "St. Stephen's College Heritage Oxford Hoodie",
    category: "college",
    campus: "North Campus",
    collegeId: "stephens",
    collegeName: "St. Stephen's College",
    price: 1299,
    originalPrice: 1899,
    badge: "Classic",
    type: "Hoodie",
    fabric: "380 GSM Brushed Cotton Fleece",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
    description: "Deep navy hoodie with royal crest, embroidered Latin motto, and double-layered warm hood."
  },
  {
    id: "hansraj-lovers-point-tee",
    title: "Hansraj 'Lovers Point' Minimalist Boxy Tee",
    category: "college",
    campus: "North Campus",
    collegeId: "hansraj",
    collegeName: "Hansraj College",
    price: 649,
    originalPrice: 949,
    badge: "Popular",
    type: "T-Shirt",
    fabric: "240 GSM Bio-Washed Cotton",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    description: "Drop-shoulder silhouette celebrating Lovers Point vibes in a clean architectural layout."
  },
  {
    id: "miranda-elvira-hoodie",
    title: "Miranda House 'Elvira' Minimalist Hoodie",
    category: "college",
    campus: "North Campus",
    collegeId: "miranda",
    collegeName: "Miranda House",
    price: 1199,
    originalPrice: 1699,
    badge: "Top Rated",
    type: "Hoodie",
    fabric: "360 GSM Soft Touch Peach Fleece",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    description: "Minimal botanical monogram embroidery with high-density gold crest. Premium relaxed silhouette."
  },
  {
    id: "lsr-tarang-crewneck",
    title: "LSR 'Tarang' Monochromatic Sweatshirt",
    category: "college",
    campus: "South Campus",
    collegeId: "lsr",
    collegeName: "Lady Shri Ram College",
    price: 1099,
    originalPrice: 1599,
    badge: "Editorial",
    type: "Sweatshirt",
    fabric: "340 GSM Ring-Spun Cotton",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
    description: "Clean typography with subtle college coat of arms embroidery. Elegant and understated."
  },
  {
    id: "venky-acid-wash-tee",
    title: "Sri Venkateswara 'Venky' Vintage Washed Tee",
    category: "college",
    campus: "South Campus",
    collegeId: "venky",
    collegeName: "Sri Venkateswara College",
    price: 749,
    originalPrice: 1099,
    badge: "Streetwear",
    type: "T-Shirt",
    fabric: "260 GSM Heavyweight Terry",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    description: "Vintage charcoal wash finish with minimal back typographic signature. Relaxed boxy drape."
  },
  {
    id: "kmc-the-stage-hoodie",
    title: "Kirori Mal 'The Players' Stage Hoodie",
    category: "college",
    campus: "North Campus",
    collegeId: "kmc",
    collegeName: "Kirori Mal College",
    price: 1149,
    originalPrice: 1649,
    badge: "Fest Drop",
    type: "Hoodie",
    fabric: "380 GSM Cotton Fleece",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
    description: "Heavyweight fleece hoodie celebrating KMC's theater and performing arts heritage."
  },
  {
    id: "sscbs-business-hoodie",
    title: "SSCBS 'CBS' Executive Heavy Hoodie",
    category: "college",
    campus: "Off-Campus",
    collegeId: "sscbs",
    collegeName: "Shaheed Sukhdev (SSCBS)",
    price: 1199,
    originalPrice: 1699,
    badge: "New Release",
    type: "Hoodie",
    fabric: "380 GSM Brushed Cotton",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    description: "Minimalist corporate-meets-streetwear aesthetic for Delhi's premier management college."
  },
  {
    id: "gargi-aesthetic-crewneck",
    title: "Gargi College 'Reverie' Minimal Crewneck",
    category: "college",
    campus: "South Campus",
    collegeId: "gargi",
    collegeName: "Gargi College",
    price: 1099,
    originalPrice: 1599,
    badge: "Trending",
    type: "Sweatshirt",
    fabric: "350 GSM Loopknit Cotton",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    description: "Clean aesthetic ivory sweatshirt with fine embroidered crest and subtle collegiate lettering."
  },

  // --- 3. SOCIETY CUSTOM JERSEY TEMPLATES ---
  {
    id: "society-sublimation-jersey",
    title: "Pro Sublimation Society & Sports Jersey",
    category: "society",
    campus: "All Campuses",
    collegeId: "all",
    collegeName: "Custom for Any DU Society",
    price: 399,
    originalPrice: 699,
    badge: "Bulk Order: WhatsApp Quote",
    type: "Custom Jersey",
    fabric: "180 GSM Birdseye Dri-Fit Micro-Polyester",
    image: "https://images.unsplash.com/photo-1577210897949-1f56f9435024?auto=format&fit=crop&w=800&q=80",
    description: "Full-bleed customized 4K sublimation. Add custom names, jersey numbers, society crest, sponsor logos, and sleeves patterns. Min order: 15 pcs."
  },
  {
    id: "society-executive-hoodie",
    title: "Society Core Team & Council Embroidered Hoodie",
    category: "society",
    campus: "All Campuses",
    collegeId: "all",
    collegeName: "Custom for Any DU Society",
    price: 799,
    originalPrice: 1299,
    badge: "Bulk Order: WhatsApp Quote",
    type: "Custom Hoodie",
    fabric: "380 GSM Heavy Combed Cotton Fleece",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    description: "Designed for Society Presidents, General Secretaries & Core Teams. Front crest embroidery, sleeve designation, and back typography."
  },
  {
    id: "society-fest-volunteer-tee",
    title: "Annual Fest Core & Volunteer Screen-Printed Tees",
    category: "society",
    campus: "All Campuses",
    collegeId: "all",
    collegeName: "Custom for Any DU Society",
    price: 249,
    originalPrice: 450,
    badge: "Bulk Order: WhatsApp Quote",
    type: "Custom T-Shirt",
    fabric: "190-220 GSM 100% Cotton",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    description: "Economical bulk tees for cultural fests (Crossroads, Mecca, Renaissance, Tarang, Nexus). Includes sponsor logos on back."
  },
  {
    id: "society-varsity-bomber",
    title: "Society Premium Letterman Varsity Jacket",
    category: "society",
    campus: "All Campuses",
    collegeId: "all",
    collegeName: "Custom for Any DU Society",
    price: 1399,
    originalPrice: 2200,
    badge: "Bulk Order: WhatsApp Quote",
    type: "Custom Jacket",
    fabric: "Woolen Torso + PU Leather Sleeves with Ribbed Collars",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    description: "The ultimate flex for society farewells and council members. Heavy chenille patches with individual name initials."
  }
];

const SOCIETY_TYPES = [
  "Dramatics Society (DramSoc / Street Play)",
  "Western Dance Society (WDS)",
  "Indian / Folk Dance Society",
  "Music Society (Western / Classical / Band)",
  "Debating Society (DebSoc / English / Hindi)",
  "Commerce & Economics Association",
  "Enactus / Social Impact Cell",
  "Placement Cell & Internship Cell",
  "Sports Team (Football, Cricket, Basketball, Badminton)",
  "Fashion Society",
  "Photography & Film Society",
  "Department Council (Eco, B.Com, Pol Science, English, etc.)",
  "Annual Fest Organizing Committee (Core Team)"
];

const REVIEWS = [
  {
    name: "Aarav Sharma",
    role: "President, The Players (Dramatics), KMC",
    college: "Kirori Mal College",
    quote: "We ordered 45 custom sublimation jerseys for our street play production. The Dri-fit quality was top notch and delivered in 4 days before our fest!",
    rating: 5
  },
  {
    name: "Ananya Deshmukh",
    role: "Core Team, Crossroads Fest",
    college: "SRCC",
    quote: "Got the official SRCC varsity hoodies and volunteer tees. The embroidery finish was insane and every senior wanted one. Super easy WhatsApp coordination.",
    rating: 5
  },
  {
    name: "Rohan Vats",
    role: "Captain, Football Team",
    college: "St. Stephen's College",
    quote: "The personalized jerseys with names and numbers came out crisp. Antigravity team even sent a digital mockup in 2 hours over WhatsApp. 10/10.",
    rating: 5
  }
];
