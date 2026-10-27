/**
 * Shobha Tissue Manufacturing - Main Application Logic
 * -----------------------------------------------------
 * Handles navigation, carousel, catalog filtering, FAQ accordion,
 * form validation, EmailJS submission, and responsive interactivity.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initProductsCatalog();
  initGalleryCarousel();
  initVideoShowcase();
  initFaqAccordion();
  initEnquiryForm();
  initBackToTop();
  initDynamicYear();
  initLazyFallbacks();
});

/* ==========================================================================
   1. Navigation & Header
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky header on scroll
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close menu when clicking link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Close when clicking outside menu
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  // Active navigation highlight based on scroll position
  const sections = document.querySelectorAll("section[id]");
  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };
  window.addEventListener("scroll", updateActiveNavLink, { passive: true });
}

/* ==========================================================================
   2. Products Catalog & Filtering
   ========================================================================== */
function initProductsCatalog() {
  const container = document.getElementById("products-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!container || !window.PRODUCTS_DATA) return;

  function renderProducts(categoryFilter = "all") {
    container.innerHTML = "";

    const filtered =
      categoryFilter === "all"
        ? window.PRODUCTS_DATA
        : window.PRODUCTS_DATA.filter((p) => {
            if (categoryFilter === "soft") return p.category === "Soft Tissues";
            if (categoryFilter === "hard") return p.category === "Hard Tissues";
            if (categoryFilter === "custom-bulk")
              return p.category === "Custom Branding" || p.category === "Bulk Orders";
            return true;
          });

    filtered.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.setAttribute("data-product-id", product.id);

      const packsHtml = product.confirmedPacks
        .map((pack) => `<span class="pack-badge">${pack}</span>`)
        .join("");

      const featuresHtml = product.features
        .map(
          (feat) => `
          <li>
            <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>${feat}</span>
          </li>`
        )
        .join("");

      card.innerHTML = `
        <div class="product-image-wrap">
          <span class="product-badge">${product.badge}</span>
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="product-image"
            loading="lazy"
            onerror="this.onerror=null; this.src='${product.image}';"
          />
        </div>
        <div class="product-content">
          <span class="product-category">${product.category}</span>
          <h3 class="product-title">${product.name}</h3>
          <p class="product-tagline">${product.tagline}</p>
          <p class="product-description">${product.description}</p>
          
          <div class="product-packs">
            <span class="packs-label">Available Pack Sizes:</span>
            <div class="packs-list">${packsHtml}</div>
          </div>

          <div class="product-applications">
            <strong>Ideal For:</strong> ${product.applications}
          </div>

          <ul class="product-features-list">
            ${featuresHtml}
          </ul>

          <div class="product-actions">
            <button type="button" class="btn btn-primary btn-enquire" data-product-name="${product.name}" data-enquiry-type="Product Information">
              Enquire Now
            </button>
            <button type="button" class="btn btn-outline btn-quote" data-product-name="${product.name}" data-enquiry-type="Bulk Order">
              Request a Quote
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // Attach click listeners to Enquire buttons
    attachProductActionListeners();
  }

  // Filter tab click handlers
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderProducts(filter);
    });
  });

  // Initial render
  renderProducts("all");
}

function attachProductActionListeners() {
  const enquiryButtons = document.querySelectorAll(".btn-enquire, .btn-quote");
  const enquirySection = document.getElementById("enquiry");
  const productSelect = document.getElementById("enquiry-product");
  const typeSelect = document.getElementById("enquiry-type");

  enquiryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productName = btn.getAttribute("data-product-name");
      const enquiryType = btn.getAttribute("data-enquiry-type");

      // Match product select option
      if (productSelect) {
        for (let i = 0; i < productSelect.options.length; i++) {
          if (productSelect.options[i].text.includes(productName) || productSelect.options[i].value.includes(productName)) {
            productSelect.selectedIndex = i;
            break;
          }
        }
      }

      // Match enquiry type
      if (typeSelect && enquiryType) {
        for (let i = 0; i < typeSelect.options.length; i++) {
          if (typeSelect.options[i].value === enquiryType) {
            typeSelect.selectedIndex = i;
            break;
          }
        }
      }

      // Smooth scroll to form
      if (enquirySection) {
        enquirySection.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const nameInput = document.getElementById("enquiry-name");
          if (nameInput) nameInput.focus();
        }, 600);
      }
    });
  });
}

/* ==========================================================================
   3. Image Carousel & Gallery
   ========================================================================== */
function initGalleryCarousel() {
  const carouselTrack = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dotsContainer = document.getElementById("carousel-dots");

  if (!carouselTrack || !window.SITE_CONFIG || !window.SITE_CONFIG.galleryImages) return;

  const images = window.SITE_CONFIG.galleryImages;
  let currentIndex = 0;
  let autoplayTimer = null;
  let isHovered = false;

  // Build slides
  carouselTrack.innerHTML = "";
  dotsContainer.innerHTML = "";

  images.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = `carousel-slide ${index === 0 ? "active" : ""}`;
    slide.setAttribute("data-index", index);

    slide.innerHTML = `
      <div class="carousel-image-container">
        <img 
          src="${item.imageUrl}" 
          alt="${item.alt}" 
          class="carousel-img"
          loading="lazy"
          onerror="this.onerror=null; this.src='${item.fallbackUrl}';"
        />
        <div class="carousel-caption">
          <span class="carousel-category">${item.category}</span>
          <h4 class="carousel-title">${item.title}</h4>
          <p class="carousel-desc">${item.description}</p>
        </div>
      </div>
    `;

    carouselTrack.appendChild(slide);

    // Build indicator dot
    const dot = document.createElement("button");
    dot.className = `carousel-dot ${index === 0 ? "active" : ""}`;
    dot.setAttribute("type", "button");
    dot.setAttribute("aria-label", `Go to slide ${index + 1}: ${item.title}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const slides = carouselTrack.querySelectorAll(".carousel-slide");
  const dots = dotsContainer.querySelectorAll(".carousel-dot");

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = images.length - 1;
    } else if (index >= images.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    slides.forEach((s, i) => {
      s.classList.toggle("active", i === currentIndex);
    });

    dots.forEach((d, i) => {
      d.classList.toggle("active", i === currentIndex);
      d.setAttribute("aria-current", i === currentIndex ? "true" : "false");
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Keyboard navigation when carousel in focus
  const carouselSection = document.querySelector(".carousel-wrapper");
  if (carouselSection) {
    carouselSection.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    });
  }

  // Touch Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carouselTrack.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  carouselTrack.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }

  // Autoplay with pause on hover/focus
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 5500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  const carouselCard = document.querySelector(".carousel-container");
  if (carouselCard) {
    carouselCard.addEventListener("mouseenter", () => {
      isHovered = true;
    });
    carouselCard.addEventListener("mouseleave", () => {
      isHovered = false;
    });
    carouselCard.addEventListener("focusin", () => {
      isHovered = true;
    });
    carouselCard.addEventListener("focusout", () => {
      isHovered = false;
    });
  }

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion) {
    startAutoplay();
  }
}

/* ==========================================================================
   4. Video Showcase Section
   ========================================================================== */
function initVideoShowcase() {
  const container = document.getElementById("video-display-area");
  if (!container || !window.SITE_CONFIG) return;

  const videoConfig = window.SITE_CONFIG.videoShowcase;

  if (videoConfig && videoConfig.hasActiveVideo && videoConfig.videoUrl) {
    // If user provided a video URL (e.g. YouTube or MP4)
    if (videoConfig.videoUrl.includes("youtube.com") || videoConfig.videoUrl.includes("youtu.be")) {
      container.innerHTML = `
        <div class="video-responsive-wrapper">
          <iframe 
            src="${videoConfig.videoUrl}" 
            title="${videoConfig.title}" 
            frameborder="0" 
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
        <div class="video-info">
          <h4>${videoConfig.title}</h4>
          <p>${videoConfig.description}</p>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="video-responsive-wrapper">
          <video controls preload="metadata" poster="assets/images/soft-tissue.svg">
            <source src="${videoConfig.videoUrl}" type="video/mp4">
            Your browser does not support HTML5 video.
          </video>
        </div>
        <div class="video-info">
          <h4>${videoConfig.title}</h4>
          <p>${videoConfig.description}</p>
        </div>
      `;
    }
  } else {
    // Clean, honest placeholder as requested
    container.innerHTML = `
      <div class="video-placeholder-card">
        <div class="placeholder-icon-wrap">
          <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
        <span class="placeholder-pill">Video Showcase Coming Soon</span>
        <h3 class="placeholder-title">See Our Tissue Manufacturing &amp; Packaging</h3>
        <p class="placeholder-text">
          ${videoConfig.comingSoonMessage}
        </p>
        <div class="placeholder-actions">
          <a href="tel:${window.SITE_CONFIG.business.phoneClean}" class="btn btn-primary">
            Call Manufacturer: ${window.SITE_CONFIG.business.phone}
          </a>
          <a href="${window.SITE_CONFIG.socialMedia.whatsapp}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    `;
  }
}

/* ==========================================================================
   5. Frequently Asked Questions (Accordion)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-question");
    const content = item.querySelector(".faq-answer");

    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // Close other open FAQ items for cleaner reading
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("active");
          const otherTrigger = other.querySelector(".faq-question");
          const otherContent = other.querySelector(".faq-answer");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (!isExpanded) {
        item.classList.add("active");
        trigger.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        item.classList.remove("active");
        trigger.setAttribute("aria-expanded", "false");
        content.style.maxHeight = null;
      }
    });

    // Keyboard support: Enter or Space
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        trigger.click();
      }
    });
  });
}

/* ==========================================================================
   6. Customer Enquiry Form & EmailJS Integration
   ========================================================================== */
function initEnquiryForm() {
  const form = document.getElementById("enquiry-form");
  const submitBtn = document.getElementById("enquiry-submit-btn");
  const formFeedback = document.getElementById("form-feedback");

  if (!form) return;

  // Initialize EmailJS SDK if available and valid public key exists
  const emailjsConfig = window.SITE_CONFIG.emailjs;
  let isEmailJsSdkReady = false;

  if (typeof emailjs !== "undefined" && emailjsConfig.isConfigured()) {
    try {
      emailjs.init(emailjsConfig.publicKey);
      isEmailJsSdkReady = true;
    } catch (err) {
      console.warn("EmailJS initialization notice:", err);
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Spam honeypot check
    const honeypot = form.querySelector('input[name="_honey"]');
    if (honeypot && honeypot.value.trim() !== "") {
      // Quietly abort spam bots
      return;
    }

    // Clear previous feedback
    clearFeedback();

    // Extract values
    const name = form.elements["full_name"]?.value.trim() || "";
    const company = form.elements["company_name"]?.value.trim() || "";
    const phone = form.elements["phone"]?.value.trim() || "";
    const email = form.elements["email"]?.value.trim() || "";
    const product = form.elements["product_select"]?.value || "";
    const quantity = form.elements["quantity"]?.value.trim() || "";
    const enquiryType = form.elements["enquiry_type"]?.value || "";
    const message = form.elements["message"]?.value.trim() || "";

    // Form Validation
    const validationErrors = [];

    if (name.length < 2) {
      validationErrors.push("Please enter your full name.");
      markFieldError("enquiry-name");
    }

    // Indian 10-digit mobile phone validation (optional +91 or 0 prefix)
    const phoneDigits = phone.replace(/\D/g, "");
    const cleanIndianPhone = phoneDigits.startsWith("91") && phoneDigits.length === 12
      ? phoneDigits.slice(2)
      : phoneDigits.startsWith("0") && phoneDigits.length === 11
      ? phoneDigits.slice(1)
      : phoneDigits;

    const isIndianPhoneValid = /^[6-9]\d{9}$/.test(cleanIndianPhone);

    if (!isIndianPhoneValid) {
      validationErrors.push("Please provide a valid 10-digit Indian mobile number (e.g., 9589362599).");
      markFieldError("enquiry-phone");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      validationErrors.push("Please enter a valid email address.");
      markFieldError("enquiry-email");
    }

    if (!product) {
      validationErrors.push("Please select a product category.");
      markFieldError("enquiry-product");
    }

    if (!enquiryType) {
      validationErrors.push("Please select an enquiry type.");
      markFieldError("enquiry-type");
    }

    if (message.length < 5) {
      validationErrors.push("Please write a short message with your requirements.");
      markFieldError("enquiry-message");
    }

    if (validationErrors.length > 0) {
      showFeedback(
        "error",
        "Please correct the highlighted fields:",
        validationErrors
      );
      return;
    }

    // Prepare template params
    const templateParams = {
      from_name: name,
      company_name: company || "Not specified (Individual)",
      phone: phone,
      email: email,
      product: product,
      quantity: quantity || "Not specified / To be discussed",
      enquiry_type: enquiryType,
      message: message,
      submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      to_business_name: window.SITE_CONFIG.business.name
    };

    // UI state: submitting
    setFormSubmitting(true);

    // If EmailJS credentials have been configured
    if (emailjsConfig.isConfigured() && typeof emailjs !== "undefined") {
      try {
        const response = await emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          templateParams
        );

        if (response.status === 200 || response.text === "OK") {
          showFeedback(
            "success",
            "Thank you! Your enquiry has been sent directly to Shobha Tissue Manufacturing.",
            [
              "Our team will review your requirements and contact you at " + phone + " shortly.",
              "For immediate assistance, you may also reach us directly at " + window.SITE_CONFIG.business.phone + "."
            ]
          );
          form.reset();
        } else {
          throw new Error("EmailJS response error: " + response.text);
        }
      } catch (error) {
        console.error("Enquiry submission error:", error);
        showEmailFallbackDialog(name, phone, product, enquiryType, message);
      } finally {
        setFormSubmitting(false);
      }
    } else {
      // Honest, helpful setup fallback: EmailJS keys not configured yet
      // Provide instant one-click direct WhatsApp or Call dispatch so zero leads are lost!
      setFormSubmitting(false);
      showEmailFallbackDialog(name, phone, product, enquiryType, message);
    }
  });

  function setFormSubmitting(isSubmitting) {
    if (submitBtn) {
      submitBtn.disabled = isSubmitting;
      submitBtn.classList.toggle("loading", isSubmitting);
      submitBtn.innerHTML = isSubmitting
        ? `<span class="btn-spinner"></span> Sending Enquiry...`
        : `Send Enquiry to Shobha`;
    }
  }

  function markFieldError(fieldId) {
    const el = document.getElementById(fieldId);
    if (el) {
      el.classList.add("input-error");
      el.addEventListener(
        "input",
        () => el.classList.remove("input-error"),
        { once: true }
      );
    }
  }

  function clearFeedback() {
    if (formFeedback) {
      formFeedback.className = "form-feedback-box";
      formFeedback.innerHTML = "";
      formFeedback.style.display = "none";
    }
    const errorInputs = form.querySelectorAll(".input-error");
    errorInputs.forEach((i) => i.classList.remove("input-error"));
  }

  function showFeedback(type, title, list = []) {
    if (!formFeedback) return;
    formFeedback.className = `form-feedback-box feedback-${type}`;
    formFeedback.style.display = "block";

    const listHtml = list.length > 0
      ? `<ul>${list.map((item) => `<li>${item}</li>`).join("")}</ul>`
      : "";

    formFeedback.innerHTML = `
      <div class="feedback-header">
        <svg class="feedback-icon" viewBox="0 0 20 20" fill="currentColor">
          ${
            type === "success"
              ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>'
              : '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>'
          }
        </svg>
        <strong>${title}</strong>
      </div>
      ${listHtml}
    `;

    formFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function showEmailFallbackDialog(name, phone, product, enquiryType, message) {
    if (!formFeedback) return;

    // Compose pre-filled WhatsApp message
    const waText = encodeURIComponent(
      `Hello Shobha Tissue Manufacturing,\n` +
      `I am sending an enquiry:\n` +
      `• Name: ${name}\n` +
      `• Phone: ${phone}\n` +
      `• Product: ${product}\n` +
      `• Type: ${enquiryType}\n` +
      `• Requirements: ${message}`
    );

    const waLink = `https://wa.me/${window.SITE_CONFIG.business.whatsapp}?text=${waText}`;
    const telLink = `tel:${window.SITE_CONFIG.business.phoneClean}`;

    formFeedback.className = "form-feedback-box feedback-notice";
    formFeedback.style.display = "block";
    formFeedback.innerHTML = `
      <div class="feedback-header">
        <strong>Direct Enquiry Dispatch</strong>
      </div>
      <p>
        Your enquiry details are ready! To ensure you receive an immediate response, please connect directly with the business owner:
      </p>
      <div class="fallback-cta-buttons">
        <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp-direct">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.274.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/>
          </svg>
          Send via WhatsApp Now
        </a>
        <a href="${telLink}" class="btn btn-primary">
          Call Now: ${window.SITE_CONFIG.business.phone}
        </a>
      </div>
      <p class="config-note">
        <small><strong>Website Administrator Note:</strong> To enable direct email delivery to your inbox, add your free EmailJS Service ID and Public Key inside <code>js/config.js</code>.</small>
      </p>
    `;

    formFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

/* ==========================================================================
   7. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener(
    "scroll",
    () => {
      if (window.pageYOffset > 380) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    },
    { passive: true }
  );

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ==========================================================================
   8. Dynamic Year in Footer
   ========================================================================== */
function initDynamicYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   9. Safe Image Error Fallbacks
   ========================================================================== */
function initLazyFallbacks() {
  const allImages = document.querySelectorAll("img");
  allImages.forEach((img) => {
    img.addEventListener("error", function () {
      if (!this.getAttribute("data-failed")) {
        this.setAttribute("data-failed", "true");
        // Fallback to local SVG if remote URL fails
        this.src = "assets/images/soft-tissue.svg";
      }
    });
  });
}
