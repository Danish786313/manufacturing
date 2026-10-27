/**
 * Shobha Tissue Manufacturing - Website Configuration
 * ----------------------------------------------------
 * All business details, contact information, social links,
 * EmailJS credentials, and gallery data are centrally managed here.
 * Non-technical owners can easily edit the values below.
 */

const SITE_CONFIG = {
  // Business Branding & Identity (Extracted directly from visiting card)
  business: {
    name: "Shobha Tissue Manufacturing",
    shortName: "Shobha",
    tagline: "Softness for a Cleaner Tomorrow",
    description: "Quality tissue products for everyday personal, commercial, and wholesale needs. Direct from the manufacturer in Bhopal, Madhya Pradesh.",
    established: "Small-scale Manufacturer",
    
    // Verified Contact Details from visiting card
    phone: "+91 95893 62599",
    phoneClean: "9589362599",
    whatsapp: "919589362599",
    whatsappDisplay: "+91 95893 62599",
    whatsappDefaultMessage: "Hello Shobha Tissue Manufacturing, I would like to enquire about your tissue products.",
    
    // Configurable email - replace with your active business inbox
    email: "contact@shobhatissue.com", // [ACTION REQUIRED]: Update with your verified business email
    isEmailVerified: false, // Set to true once verified
    
    // Verified Address from visiting card
    address: {
      plot: "Plot no. 4, Gram Maholi, Bhanpur",
      landmark: "Opposite HM Higher Secondary School",
      city: "Bhopal",
      state: "Madhya Pradesh",
      pincode: "462010",
      country: "India",
      fullAddress: "Plot no. 4, Gram Maholi, Bhanpur, Opposite HM Higher Secondary School, Bhopal, Madhya Pradesh, India - 462010"
    },
    
    // Business Working Hours (Subject to business confirmation)
    workingHours: "Monday to Saturday: 9:00 AM - 7:30 PM (Sunday by Enquiry)",
    
    // Map Query / Coordinates for Bhanpur, Bhopal, MP 462010
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.846548777134!2d77.42436!3d23.28509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c683b5e406437%3A0x7d6b38c234a9b5f4!2sBhanpur%2C%20Bhopal%2C%20Madhya%20Pradesh%20462010!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=Plot+no.+4+Gram+Maholi+Bhanpur+Bhopal+Madhya+Pradesh+462010"
  },

  // EmailJS Integration Settings (Free tier ready: 200 emails/month free)
  // Learn more & create your free account: https://www.emailjs.com/
  emailjs: {
    // [ACTION REQUIRED]: Insert your EmailJS public credentials here
    serviceId: "service_shobha",      // Replace with your EmailJS Service ID (e.g., service_xxxxxxx)
    templateId: "template_enquiry",   // Replace with your EmailJS Template ID (e.g., template_xxxxxxx)
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY", // Replace with your EmailJS Public Key (e.g., user_xxxxxxxxxxxx)
    
    // Helper check to determine if real keys are configured
    isConfigured: function () {
      return (
        this.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY" &&
        this.serviceId !== "service_shobha" &&
        this.publicKey.length > 5
      );
    }
  },

  // Social Media Profiles (Update with your live URLs or leave as placeholder)
  socialMedia: {
    whatsapp: "https://wa.me/919589362599?text=Hello%20Shobha%20Tissue,%20I%20am%20interested%20in%20your%20tissue%20products.",
    facebook: "#",  // e.g. "https://facebook.com/shobhatissue"
    instagram: "#", // e.g. "https://instagram.com/shobhatissue"
    youtube: "#",   // e.g. "https://youtube.com/@shobhatissue"
    linkedin: "#"   // e.g. "https://linkedin.com/company/shobha-tissue"
  },

  // Video Showcase Configuration
  videoShowcase: {
    // Set to true once you have uploaded your product or factory tour video
    hasActiveVideo: false,
    
    // You can use a YouTube embed URL (e.g. "https://www.youtube.com/embed/YOUR_VIDEO_ID") or MP4 URL
    videoUrl: "",
    title: "Inside Shobha Tissue Manufacturing",
    description: "Discover our production process, hygienic packaging, and tissue paper quality standards.",
    comingSoonMessage: "Our manufacturing and product showcase videos are coming soon! Contact us directly to request product samples or visit our Bhopal facility."
  },

  // Product Gallery & Carousel Data
  // Images support royalty-free photography + local fallback SVGs
  galleryImages: [
    {
      id: "gal-1",
      title: "Soft Tissue Dispenser Boxes",
      category: "Soft Tissue",
      description: "Hygienic, gentle daily tissue pulls available in 40, 50, and 100 counts.",
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
      fallbackUrl: "assets/images/soft-tissue.svg",
      alt: "Shobha Soft Tissue Box Pack"
    },
    {
      id: "gal-2",
      title: "Durable Hard Tissue Napkins",
      category: "Hard Tissue",
      description: "High absorbency, robust folded tissues engineered for food-service and workplaces.",
      imageUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80",
      fallbackUrl: "assets/images/hard-tissue.svg",
      alt: "Shobha Hard Folded Tissue Napkins"
    },
    {
      id: "gal-3",
      title: "Custom Printed Logo Tissue Packs",
      category: "Custom Branding",
      description: "Custom name and business logo printed on tissue packs for branding.",
      imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
      fallbackUrl: "assets/images/custom-printed.svg",
      alt: "Custom Printed Tissue Paper with Company Logo"
    },
    {
      id: "gal-4",
      title: "Commercial Bulk Wholesale Supply",
      category: "Bulk Supply",
      description: "Direct manufacturer supply in secure carton bundles for retail and commercial buyers.",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      fallbackUrl: "assets/images/bulk-supply.svg",
      alt: "Bulk Tissue Cartons Ready for Commercial Dispatch"
    },
    {
      id: "gal-5",
      title: "Verified Visiting Card & Genuine Manufacturing",
      category: "About Us",
      description: "Direct manufacturer credentials from Plot 4, Bhanpur, Bhopal.",
      imageUrl: "assets/images/visiting-card.webp",
      fallbackUrl: "assets/images/visiting-card.webp",
      alt: "Shobha Tissue Manufacturing Official Visiting Card"
    }
  ]
};

// Make config globally accessible
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
