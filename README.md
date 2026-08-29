# 🩺 DoctorPro — Healthcare Management & Medical Practice Portal

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Design](https://img.shields.io/badge/UI%2FUX-Responsive-success?style=for-the-badge)
![Storage](https://img.shields.io/badge/Data-LocalStorage_Engine-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A client-side healthcare management solution and doctor portfolio platform. Built with modern web standards, **DoctorPro** provides an interface for patient-facing interactions alongside a local administration panel. It operates without third-party frameworks, backend dependencies, or build tools.

---

## ⚡ Core Capabilities

### 🌐 Patient-Facing Portal (`index.html`)
* **Clinical Overview:** Showcase doctor biographies, clinical specializations, service tiers, consulting hours, and hospital/chamber affiliations.
* **Responsive Architecture:** Built using CSS grid/flexbox layouts and dedicated media queries (`responsive.css`).
* **Interactive UI Layers:** Includes animated counters, appointment consultation forms, and modal interactions handled by `app.js`.
* **Dynamic Theme Toggle:** Native dark/light mode switching driven by `theme.js` with preference memory.
* **Multi-Language (i18n):** Client-side translation system powered by `language.js`.

---

### 🛠️ Administrative Dashboard (`admin.html`)
* **Local Data Management:** Powered by `storage.js` to manage doctor schedules, consultation fees, and service catalogs inside browser `localStorage`.
* **Preloaded Datasets:** Initializes with structured medical records via `default-data.js`[cite: 8].
* **Configuration Controls:** Update contact information, address details, and clinic hours in real time[cite: 8].
* **Zero Backend Footprint:** Fully functional offline and on static hosting environments[cite: 8].

---

## 📁 System Architecture & Directory Map

```text
doctorpro/
│
├── index.html                      # Patient-facing portal and landing page
├── admin.html                      # Central administrative control panel
├── README.md                       # Comprehensive documentation
│
├── assets/
│   ├── css/
│   │   ├── style.css               # Core styling and component design
│   │   ├── admin.css               # Dashboard layout and data controls
│   │   └── responsive.css          # Breakpoint-specific media queries
│   │
│   └── js/
│       ├── app.js                  # Frontend interactions and DOM controllers
│       ├── admin.js                # Dashboard CRUD handlers and dashboard state
│       ├── theme.js                # Dark/Light mode engine
│       ├── language.js             # Translation dictionaries and i18n controller
│       └── storage.js              # LocalStorage abstraction layer
│
└── data/
    └── default-data.js             # Initial mock data and schema configuration