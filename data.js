// Delhi University Merch Store - Data Directory
// Colleges, Common Merch, College Specific Items, and Society Jersey Options

const DU_COLLEGES = [
  {
    id: "du-central",
    name: "Delhi University (Central)",
    campus: "Central",
    shortName: "DU Central",
    slug: "du-central",
    badge: "Est. 1922",
    color: "#800020", // Maroon
    textColor: "#ffffff",
    slogan: "Nishtha Dhriti Satyam (Dedication, Steadfastness and Truth)"
  },
  {
    id: "srcc",
    name: "Shri Ram College of Commerce",
    campus: "North Campus",
    shortName: "SRCC",
    slug: "srcc",
    badge: "North Campus Legend",
    color: "#6b1426",
    textColor: "#ffffff",
    slogan: "Character is Supreme"
  },
  {
    id: "hindu",
    name: "Hindu College",
    campus: "North Campus",
    shortName: "Hindu",
    slug: "hindu",
    badge: "Est. 1899",
    color: "#0f2b46",
    textColor: "#ffffff",
    slogan: "Steered by the Past, Moulding the Future"
  },
  {
    id: "stephens",
    name: "St. Stephen's College",
    campus: "North Campus",
    shortName: "Stephen's",
    slug: "stephens",
    badge: "Heritage 1881",
    color: "#1a365d",
    textColor: "#ffffff",
    slogan: "Ad Dei Gloriam"
  },
  {
    id: "hansraj",
    name: "Hansraj College",
    campus: "North Campus",
    shortName: "Hansraj",
    slug: "hansraj",
    badge: "Lovers Point Vibe",
    color: "#1e3a2f",
    textColor: "#ffffff",
    slogan: "Faith, Knowledge, Truth"
  },
  {
    id: "miranda",
    name: "Miranda House",
    campus: "North Campus",
    shortName: "Miranda",
    slug: "miranda-house",
    badge: "NIRF #1",
    color: "#5b1d40",
    textColor: "#ffffff",
    slogan: "Swadhyayanna Pramaditavyam"
  },
  {
    id: "lsr",
    name: "Lady Shri Ram College",
    campus: "South Campus",
    shortName: "LSR",
    slug: "lsr",
    badge: "Lajpat Nagar Pride",
    color: "#0d402b",
    textColor: "#ffffff",
    slogan: "That Which Liberates is Knowledge"
  },
  {
    id: "venky",
    name: "Sri Venkateswara College",
    campus: "South Campus",
    shortName: "Venky",
    slug: "venky",
    badge: "South Campus Hub",
    color: "#1b2a4a",
    textColor: "#ffffff",
    slogan: "Satyam Shivam Sundaram"
  },
  {
    id: "kmc",
    name: "Kirori Mal College",
    campus: "North Campus",
    shortName: "KMC",
    slug: "kmc",
    badge: "The Stage & Ashoka Lawn",
    color: "#3b1e54",
    textColor: "#ffffff",
    slogan: "Live to Learn"
  },
  {
    id: "ramjas",
    name: "Ramjas College",
    campus: "North Campus",
    shortName: "Ramjas",
    slug: "ramjas",
    badge: "Est. 1917",
    color: "#7a1a1a",
    textColor: "#ffffff",
    slogan: "Knowledge is Power"
  },
  {
    id: "khalsa",
    name: "SGTB Khalsa College",
    campus: "North Campus",
    shortName: "Khalsa",
    slug: "khalsa",
    badge: "Sports Powerhouse",
    color: "#0a2a4a",
    textColor: "#ffffff",
    slogan: "Deh Shiva Bar Mohe Ehe"
  },
  {
    id: "gargi",
    name: "Gargi College",
    campus: "South Campus",
    shortName: "Gargi",
    slug: "gargi",
    badge: "South Campus Icon",
    color: "#004d40",
    textColor: "#ffffff",
    slogan: "Enlightenment through Knowledge"
  },
  {
    id: "jmc",
    name: "Jesus and Mary College",
    campus: "South Campus",
    shortName: "JMC",
    slug: "jmc",
    badge: "Chanakyapuri Campus",
    color: "#1565c0",
    textColor: "#ffffff",
    slogan: "Thou Art the Light"
  },
  {
    id: "arsd",
    name: "Atma Ram Sanatan Dharma College",
    campus: "South Campus",
    shortName: "ARSD",
    slug: "arsd",
    badge: "Dhaula Kuan Pride",
    color: "#1f2937",
    textColor: "#ffffff",
    slogan: "Tejasvi Navadhitamastu"
  }
];

const PRODUCTS = [
  // --- 1. COMMON DU MERCH ---
  {
    id: "du-hoodie-classic",
    title: "The Classic Delhi University Heritage Hoodie",
    category: "common",
    campus: "Central",
    collegeId: "du-central",
    collegeName: "Delhi University",
    price: 1199,
    originalPrice: 1799,
    badge: "Bestseller",
    type: "Hoodie",
    fabric: "380 GSM Heavyweight Organic Fleece",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    description: "The timeless DU maroon hoodie with high-density gold embroidered varsity lettering and 1922 crest. Built for cold Delhi winters in North Campus."
  },
  {
    id: "du-north-campus-tee",
    title: "North Campus Retro Oversized Tee",
    category: "common",
    campus: "North Campus",
    collegeId: "du-central",
    collegeName: "Delhi University",
    price: 649,
    originalPrice: 999,
    badge: "Trending",
    type: "T-Shirt",
    fabric: "240 GSM Pure Combed Cotton",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    description: "Drop-shoulder aesthetic tee celebrating Vishwavidyalaya Metro, Tom Uncle Maggi, and North Campus tea stalls. Vintage wash finish."
  },
  {
    id: "du-south-campus-tee",
    title: "South Campus Satya Niketan Aesthetic Tee",
    category: "common",
    campus: "South Campus",
    collegeId: "du-central",
    collegeName: "Delhi University",
    price: 649,
    originalPrice: 999,
    badge: "Trending",
    type: "T-Shirt",
    fabric: "240 GSM Pure Combed Cotton",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    description: "Relaxed fit streetwear tee paying homage to Satya Niketan cafe hops and the vibrant South Campus energy."
  },
  {
    id: "du-canvas-tote",
    title: "DU Central Canvas Tote Bag (Waterproof)",
    category: "common",
    campus: "Central",
    collegeId: "du-central",
    collegeName: "Delhi University",
    price: 349,
    originalPrice: 599,
    badge: "Campus Essential",
    type: "Accessories",
    fabric: "16oz Heavyweight Natural Canvas with Inner Zipper",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    description: "Spacious aesthetic tote bag designed to hold your laptop, notebooks, and fest passes with water-resistant inner lining."
  },
  {
    id: "du-varsity-cap",
    title: "Delhi University Vintage Washed Dad Cap",
    category: "common",
    campus: "Central",
    collegeId: "du-central",
    collegeName: "Delhi University",
    price: 449,
    originalPrice: 799,
    badge: "New Drop",
    type: "Accessories",
    fabric: "100% Cotton Chino Twill",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
    description: "Embroidered arched 'DELHI UNIVERSITY' typography with adjustable brass buckle strap."
  },

  // --- 2. COLLEGE SPECIFIC MERCH ---
  {
    id: "srcc-varsity-jacket",
    title: "SRCC 'Crossroads' Varsity Letterman Jacket",
    category: "college",
    campus: "North Campus",
    collegeId: "srcc",
    collegeName: "Shri Ram College of Commerce",
    price: 1899,
    originalPrice: 2799,
    badge: "Exclusive",
    type: "Jacket",
    fabric: "Wool-blend Body with Vegan Leather Sleeves",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    description: "Iconic maroon and cream varsity jacket featuring chenille SRCC crest and Crossroads fest heritage detailing."
  },
  {
    id: "hindu-crewneck-1899",
    title: "Hindu College 'Virgin Tree & 1899' Heavy Crewneck",
    category: "college",
    campus: "North Campus",
    collegeId: "hindu",
    collegeName: "Hindu College",
    price: 1099,
    originalPrice: 1599,
    badge: "North Campus Star",
    type: "Sweatshirt",
    fabric: "350 GSM Fleece Cotton",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    description: "Navy blue premium crewneck with the golden Hindu College coat of arms. High-density flock print."
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
    description: "Deep navy hoodie with the royal crest, embroidered Latin motto, and double-layered warm hood."
  },
  {
    id: "hansraj-lovers-point-tee",
    title: "Hansraj College 'LP Vibes' Oversized Street Tee",
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
    description: "Forest green drop-shoulder tee celebrating the legendary Lovers Point (LP) chill sessions."
  },
  {
    id: "miranda-elvira-hoodie",
    title: "Miranda House 'Elvira' Botanical Hoodie",
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
    description: "Rich plum hoodie featuring subtle floral ivy embroidery around the cuffs and the Miranda House gold crest."
  },
  {
    id: "lsr-tarang-crewneck",
    title: "LSR 'Tarang' Minimalist Pastel Sweatshirt",
    category: "college",
    campus: "South Campus",
    collegeId: "lsr",
    collegeName: "Lady Shri Ram College",
    price: 1099,
    originalPrice: 1599,
    badge: "South Campus Best",
    type: "Sweatshirt",
    fabric: "340 GSM Ring-Spun Cotton",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
    description: "Bottle green sweatshirt with clean embroidered typography. Subtle, elegant, and perfect for winter classes."
  },
  {
    id: "venky-acid-wash-tee",
    title: "Sri Venkateswara 'Venky' Vintage Acid Wash Tee",
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
    description: "Washed charcoal street tee featuring Venky South Campus signature graphics and relaxed boxy cut."
  },
  {
    id: "kmc-the-stage-hoodie",
    title: "Kirori Mal College 'The Stage' Vintage Wash Hoodie",
    category: "college",
    campus: "North Campus",
    collegeId: "kmc",
    collegeName: "Kirori Mal College",
    price: 1149,
    originalPrice: 1649,
    badge: "Fest Ready",
    type: "Hoodie",
    fabric: "380 GSM Cotton Fleece",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
    description: "Royal purple hoodie honoring the legendary KMC dramatic society and North Campus performing arts scene."
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
