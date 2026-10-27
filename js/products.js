/**
 * Shobha Tissue Manufacturing - Products Data
 * --------------------------------------------
 * Contains catalog items matching the visiting card.
 * To add, edit, or remove products, simply modify the array below.
 */

const PRODUCTS_DATA = [
  {
    id: "soft-tissue",
    name: "Shobha Soft Tissue",
    category: "Soft Tissues",
    tagline: "Gentle, Skin-Friendly & Highly Absorbent",
    image: "assets/images/soft-tissue.svg",
    externalImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=80",
    description: "Carefully manufactured for everyday face, hand, and personal hygiene. Smooth soft texture designed to be gentle on skin while offering reliable absorption.",
    confirmedPacks: ["40 Pulls", "50 Pulls", "100 Pulls"],
    features: [
      "Soft and smooth texture",
      "Hygienic and skin safe",
      "Available in 40, 50, & 100 count packs",
      "Ideal for homes, cars, offices, and clinics",
      "Easy dispensing box / pack format"
    ],
    applications: "Homes, Personal Care, Corporate Offices, Clinics & Hospitality",
    badge: "Popular Everyday Choice"
  },
  {
    id: "hard-tissue",
    name: "Shobha Hard Tissue",
    category: "Hard Tissues",
    tagline: "Durable, High-Absorbency Commercial Napkins",
    image: "assets/images/hard-tissue.svg",
    externalImage: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=700&q=80",
    description: "Engineered for high tear-resistance and robust liquid absorption. Designed for dining, food-service counters, workplaces, and commercial cleaning needs.",
    confirmedPacks: ["40 Pulls", "50 Pulls", "100 Pulls"],
    features: [
      "Sturdy texture with high wet strength",
      "Superior liquid absorption capacity",
      "Available in 40, 50, & 100 count options",
      "Economical for high-volume commercial use",
      "Lint-free and hygienic performance"
    ],
    applications: "Restaurants, Cafes, Workstations, Canteens & Catering",
    badge: "High Durability"
  },
  {
    id: "custom-printed-tissue",
    name: "Custom Name & Logo Printed Tissue",
    category: "Custom Branding",
    tagline: "Custom Brand Printing for Cafes, Hotels & Events",
    image: "assets/images/custom-printed.svg",
    externalImage: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80",
    description: "Elevate your enterprise branding with your logo and business name crisply printed on quality tissue paper packs. Direct manufacturer setup for businesses.",
    confirmedPacks: ["Custom MOQ on Enquiry"],
    features: [
      "Custom business logo & name printing",
      "Sharp, food-safe branded prints",
      "Choose between soft or hard tissue base",
      "Custom pack sizes and fold formats",
      "Direct consultation with manufacturer"
    ],
    applications: "Hotels, Fine Dining, Banquet Halls, Brand Promotions & Corporate Events",
    badge: "Branding Feature"
  },
  {
    id: "bulk-wholesale-orders",
    name: "Bulk & Commercial Wholesale Supply",
    category: "Bulk Orders",
    tagline: "Direct Manufacturer Supply for Retailers & Distributors",
    image: "assets/images/bulk-supply.svg",
    externalImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80",
    description: "Cost-effective, dependable bulk supply for retail shops, regional wholesalers, institutional buyers, and large commercial facilities across Bhopal & nearby areas.",
    confirmedPacks: ["Master Cartons / Custom Quantities"],
    features: [
      "Competitive direct-from-factory pricing",
      "Consistent supply scheduling",
      "Mixed soft & hard tissue consignments",
      "Secure corrugated carton packaging",
      "Transparent order tracking & personal communication"
    ],
    applications: "Wholesale Dealers, Supermarkets, Facilities Management & Institutions",
    badge: "Wholesale Available"
  }
];

if (typeof window !== "undefined") {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
}
