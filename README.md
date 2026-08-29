# ✨ Glow & Grace — Luxury Cosmetics & Beauty Portfolio Engine

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Design](https://img.shields.io/badge/Design-Glassmorphism-c99365?style=for-the-badge)
![Status](https://img.shields.io/badge/Order_Tracking-Active-success?style=for-the-badge)

A client-side cosmetics brand portfolio, mini catalog, and comprehensive administrative portal. Designed with a luxury dark aesthetic, interactive dual-language (i18n) engine, integrated **Live Order Tracking**, and a complete **CRUD Admin Dashboard** powered entirely by Vanilla Web Standards.

---

## 💎 Core Highlights

### 🛍️ Client Experience (`index.html`)
* **Luxury Glassmorphism Aesthetic:** Warm gold accents, animated gradient blobs, parallax 3D card tilt, and ambient loading screens.
* **Dual-Language i18n Engine:** Seamless zero-reload toggle between **English 🇬🇧** and **বাংলা 🇧🇩** with full `localStorage` preference persistence.
* **Instant Order Tracking Modal:** Real-time customer order tracking via **Order ID** (e.g., `ORD-731902`) or **Contact Phone Number**.
* **Dynamic Product Catalog:** Real-time search, category filtering, discount indicators, and responsive quick-order triggers.
* **Direct Multi-Channel Dispatch:** Direct order form processing alongside one-click automated **WhatsApp Order** message generators.
* **Interactive Modules:** Expiring promotion countdown timers, lightbox masonry gallery, and touch-friendly testimonial carousels.

---

### ⚙️ Central Administrative Portal (`admin.html`)
* **Complete Order Pipeline:**
  * Real-time order capture with metric counters (Pending, Processing, Delivered, Cancelled).
  * In-place order status switching with color-coded feedback.
  * Comprehensive modal editor to adjust quantities, client names, phone numbers, prices, and shipping addresses.
  * Deep inspection views and single-click order record deletion.
* **Full CRUD Catalog Management:**
  * 💄 **Products:** Full control over English/Bengali descriptions, prices, badges, and URL-based image links.
  * 🗂️ **Categories:** Manage division cards, custom slug IDs, and collection covers.
  * 🏷️ **Special Offers:** Set live promotional banners, countdown timers, and discount tags.
  * 🖼️ **Visual Diary Gallery:** URL-based image curation with masonry height controls.
  * 💬 **Customer Reviews:** Add and moderate verified client reviews, avatars, and star ratings.
  * 🌐 **Brand & Contact Desk:** Synchronize corporate contact numbers, WhatsApp APIs, and brand stories across the storefront.
* **Robust Local State Engine:** Resilient, centralized `localStorage` pipeline that automatically loads demo fixtures if storage is empty.

---

## 📂 Project Architecture

```text
├── index.html        # Client-facing Luxury Storefront & Order Tracking Modal
├── style.css         # Design Tokens, Gold Glassmorphism, Layouts & Animations
├── script.js         # Client Controller, i18n Engine, Tracking Logic & State Sync
├── admin.html        # Complete Admin Management Dashboard Interface
├── admin.css         # Admin Dark Velvet Theme, Modals, & Data Tables
├── admin.js          # Admin CRUD Pipelines, Order Controller & Data Store
└── README.md         # Documentation & Deployment Guide