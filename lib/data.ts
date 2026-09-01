export const brand = {
  name: "Dwara",
  tagline: "Two cities. Two crafts. One family.",
  cta: "Experience Craft. Connect With Us.",
};

export const meghaWhatsApp = "918733073641";
export const enquiryWhatsApp = "917621806924";
export const notifyEmail = "billoreanuj24@gmail.com";

export function enquiryText(fields: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return `New Dwara enquiry\n\nName: ${fields.name}\nPhone: ${fields.phone}\nEmail: ${fields.email}\n\n${fields.message}`;
}

export const atelier = {
  address: "101, Tower 2, Pancham Imperia, Sama-Savli Road, Vadodara, Gujarat 391740",
  maps: "https://maps.google.com/?q=101+Tower+2+Pancham+Imperia+Sama-Savli+Road+Vadodara+Gujarat+391740",
  people: [
    { name: "Saraswati Verma", phone: "9427387519" },
    { name: "Sunita Katyayani", phone: "9409611154" },
    { name: "Megha Billore", phone: "8733073641" },
  ],
};

export function enquiryWhatsAppUrl(fields: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const text = enquiryText(fields);
  return `https://wa.me/${enquiryWhatsApp}?text=${encodeURIComponent(text)}`;
}

export function meghaChatUrl(preset?: string) {
  const text =
    preset ||
    "Hello Megha — I would like to enquire about a batik or smoking-craft piece from Dwara.";
  return `https://wa.me/${meghaWhatsApp}?text=${encodeURIComponent(text)}`;
}

export type Product = {
  id: string;
  title: string;
  place: string;
  craft: "batik" | "smoke";
  label: string;
  image: string;
  note: string;
};

export const batikProducts: Product[] = [
  {
    id: "saffron-suit",
    title: "Saffron Courtyard Suit",
    place: "Ujjain",
    craft: "batik",
    label: "Suit set",
    image: "/images/batik/saffron-suit.jpg",
    note: "Peach field, mustard bottom, star-flower dupatta — a three-piece wax-resist ensemble.",
  },
  {
    id: "crimson-suit",
    title: "Crimson Lotus Set",
    place: "Ujjain",
    craft: "batik",
    label: "Best seller",
    image: "/images/batik/crimson-suit.webp",
    note: "Tomato-red and ivory, lotus bursts, and a densely printed kurta panel.",
  },
  {
    id: "teal-night",
    title: "Teal Night Shawl",
    place: "Ujjain",
    craft: "batik",
    label: "Shawl",
    image: "/images/batik/teal-night.jpg",
    note: "Ink-black ground with teal crackle medallions and dotted paisley borders.",
  },
  {
    id: "maroon-crackle",
    title: "Maroon Crackle Dupatta",
    place: "Ujjain",
    craft: "batik",
    label: "Dupatta",
    image: "/images/batik/maroon-crackle.jpg",
    note: "Wax-veined orange panel framed by maroon mandala columns.",
  },
  {
    id: "burgundy-paisley",
    title: "Burgundy Paisley Field",
    place: "Ujjain",
    craft: "batik",
    label: "Shawl",
    image: "/images/batik/burgundy-paisley.jpg",
    note: "Dotted bandhani-style florals over burnt orange crackle.",
  },
  {
    id: "rose-floral",
    title: "Rose & Cream Panel",
    place: "Ujjain",
    craft: "batik",
    label: "Panel",
    image: "/images/batik/rose-floral.jpg",
    note: "Leaf motifs in cream and rose on a chocolate batik ground.",
  },
  {
    id: "bandhani",
    title: "Bandhani Sunburst",
    place: "Ujjain",
    craft: "batik",
    label: "Shawl",
    image: "/images/batik/bandhani-sunburst.jpg",
    note: "Deep red with yellow sunbursts and white dotted swirl work.",
  },
  {
    id: "chocolate",
    title: "Chocolate Amber Panel",
    place: "Ujjain",
    craft: "batik",
    label: "Limited",
    image: "/images/batik/chocolate-panel.jpg",
    note: "Fiery orange crackle window inside a brown floral lattice.",
  },
];

export const smokeProducts: Product[] = [
  {
    id: "dhoop-tower",
    title: "Dhoop Tower",
    place: "Mhow",
    craft: "smoke",
    label: "Incense",
    image: "",
    note: "Hand-turned teak tower that draws a slow, vertical ribbon of temple smoke.",
  },
  {
    id: "charred-tray",
    title: "Charred Teak Tray",
    place: "Mhow",
    craft: "smoke",
    label: "Wood",
    image: "",
    note: "Smoke-finished serving tray — grain darkened over coconut-shell heat.",
  },
  {
    id: "coil-holder",
    title: "Moon Coil Holder",
    place: "Mhow",
    craft: "smoke",
    label: "Ritual",
    image: "",
    note: "Brass-inlaid holder for incense coils used in evening aarti.",
  },
  {
    id: "lantern",
    title: "Night Smoke Lantern",
    place: "Mhow",
    craft: "smoke",
    label: "Light",
    image: "",
    note: "Pierced brass lantern that turns incense into a moving gold haze.",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Draw & wax",
    image: "/images/process/canting-wax.jpg",
    body: "Hot wax is drawn through a canting — a copper reservoir on a wooden handle — tracing flowers, leaves, and dotted cecek before any dye touches the cloth.",
  },
  {
    n: "02",
    title: "Stamp the field",
    image: "/images/process/block-stamp.jpg",
    body: "Carved wooden blocks press wax or dye in a staggered grid. Each strike is a human rhythm; no two rows sit exactly alike.",
  },
  {
    n: "03",
    title: "Workshop repeat",
    image: "/images/process/workshop-print.jpg",
    body: "On a long table, the printer walks the length of the cloth, building terracotta and orange motifs until the white field is fully spoken for.",
  },
  {
    n: "04",
    title: "Reveal",
    image: "/images/process/artisan-reveal.jpg",
    body: "Wax is cracked, dyed, and washed away. The artisan sits with the finished red-and-white cloth — the first time the family sees the crackle they invited.",
  },
];

export const instagramPosts = [
  { image: "/images/batik/crimson-suit.webp", caption: "Crimson lotus, still unstitched." },
  { image: "/images/process/canting-wax.jpg", caption: "Wax before colour. Always." },
  { image: "/images/batik/teal-night.jpg", caption: "Night ground, teal crackle." },
  { image: "/images/process/workshop-print.jpg", caption: "One block. A hundred breaths." },
  { image: "/images/batik/saffron-suit.jpg", caption: "Saffron courtyard, Ujjain light." },
  { image: "/images/batik/bandhani-sunburst.jpg", caption: "Sunbursts tied, then dyed." },
];

export const campaigns = [
  {
    title: "Wax to Wear",
    format: "15s reel + 3D scroll landing",
    idea: "Open on the canting spout. As the viewer scrolls, wax lines become the finished saffron suit. End frame: Experience Craft. Connect With Us.",
  },
  {
    title: "Two Cities, One Closet",
    format: "Carousel + WhatsApp enquiry",
    idea: "Left: Ujjain batik crackle. Right: Mhow smoke rising through teak. Split-screen that locks together on the last card.",
  },
  {
    title: "Crackle Close-up",
    format: "Cinematic 3D scrollytelling",
    idea: "Macro journey through a wax-veined orange panel — the same immersive pour-and-reveal language as a luxury product film, made of cloth.",
  },
];
