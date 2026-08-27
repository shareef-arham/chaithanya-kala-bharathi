# 📘 Chaithanya Kala Bharathi (CKB) — Comprehensive Project & Developer Guide

> **Official NGO Website**: Chaithanya Kala Bharathi (CKB)  
> **Headquarters**: Nandyal, Andhra Pradesh, India (Est. 1992)  
> **Framework**: Next.js (App Router) + React + Vanilla CSS Modules  
> **Deployment Target**: Vercel  
> **Source Directory**: `C:\Users\Support\.gemini\antigravity-ide\scratch\chaithanya-kala-bharathi`

---

## 📑 Table of Contents
1. [Project Overview & NGO Profile](#1-project-overview--ngo-profile)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Complete Directory & File Structure](#3-complete-directory--file-structure)
4. [Master CKB Data Reference](#4-master-ckb-data-reference)
5. [How to Open & Run in Any IDE](#5-how-to-open--run-in-any-ide)
6. [How to Customize Content & Styling](#6-how-to-customize-content--styling)
7. [Managing PDF Reports & Media Assets](#7-managing-pdf-reports--media-assets)
8. [Connecting Forms to Email / Backend](#8-connecting-forms-to-email--backend)
9. [Deploying to Vercel (CLI & GitHub)](#9-deploying-to-vercel-cli--github)
10. [Troubleshooting & FAQs](#10-troubleshooting--faqs)

---

## 1. Project Overview & NGO Profile

**Chaithanya Kala Bharathi (CKB)** is an established non-governmental organization founded in **1992** in Nandyal, Andhra Pradesh. The organization is dedicated to the socio-economic advancement of vulnerable communities, tribal groups, Dalits, women, children, and persons with disabilities.

### Core Interventions:
- **School & Education**: *Badi Bata* ("Back to School") drives, anti-child labour advocacy, school kits distribution, sports, "No Stick" child-friendly schools, ChildLine 1098 awareness, and HIV-affected children support.
- **Mother & Child Care**: Breastfeeding week promotion, pre/post-natal mothers meetings, *Saamuhika Seemanthalu & Anna Prasana*, *Healthy Baby Meets* with Anganwadi (ICDS) workers, institutional delivery advocacy to reduce MMR/IMR.
- **Health & Nutrition**: Pediatric dental & eye checkups in fluoride-affected villages, Iron Folic Acid tablet distribution for adolescent girls, and nutrition cooking demonstrations.
- **Economic Empowerment**: Women's tailoring and handicraft training, legal rights awareness, Farmer Producer Organisations (FPO), and pool & sale (MSP) market linkages.

---

## 2. Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14+ (App Router)** | Zero-config SSR/SSG, fast static rendering, built-in SEO routing. |
| **Language** | **JavaScript (ES6+) / React** | Modern React components with server & client components (`'use client'`). |
| **Styling** | **Vanilla CSS & CSS Modules** | Zero external UI dependencies; fast, lightweight, and fully customized design tokens. |
| **Typography** | **Google Fonts (Outfit & Inter)** | Modern aesthetic loaded via Google Fonts CDN in global CSS. |
| **Documents** | **PDF Embed & Direct S3 Archive** | Interactive in-browser PDF viewing of authenticated CKB reports. |
| **Hosting** | **Vercel** | Edge network deployment, automatic SSL/HTTPS, custom domain mapping. |

---

## 3. Complete Directory & File Structure

```
chaithanya-kala-bharathi/
├── app/
│   ├── layout.js              # Root layout (Metadata, OpenGraph SEO, Navbar, Footer)
│   ├── globals.css            # Global CSS variables, design tokens, animations, reset
│   ├── page.js                # Home Page (Hero, Live Stats, Mission, Program previews)
│   ├── page.module.css        # Home page styles
│   ├── about/
│   │   ├── page.js            # About Us (Story, Legal Status, Vision/Mission, Leadership)
│   │   └── about.module.css
│   ├── programs/
│   │   ├── page.js            # Programs Page (4 Core Pillars, Detailed Intervention Cards)
│   │   └── programs.module.css
│   ├── gallery/
│   │   ├── page.js            # Gallery Page (Embedded Viewer for ourgallery.pdf, Category Tabs)
│   │   └── gallery.module.css
│   ├── get-involved/
│   │   ├── page.js            # Volunteer Page (Roles, Interactive Volunteer Application Form)
│   │   └── get-involved.module.css
│   ├── donate/
│   │   ├── page.js            # Donate Page (Impact Tiers, SBI & Syndicate Indian A/Cs, FCRA A/C)
│   │   └── donate.module.css
│   ├── reports/
│   │   ├── page.js            # Reports Page (DynamicReport.pdf Viewer, Certificates, Audits)
│   │   └── reports.module.css
│   └── contact/
│       ├── page.js            # Contact Page (Office Address, Phone, Email, Message Form, FAQs)
│       └── contact.module.css
├── components/
│   ├── Navbar.js              # Responsive glassmorphic sticky top navigation + Mobile menu
│   ├── Navbar.module.css
│   ├── Footer.js              # Multi-column footer with address, links & legal status
│   └── Footer.module.css
├── public/
│   ├── hero-education.jpg     # AI-generated high-res classroom & education photo
│   ├── programs-community.jpg # Women empowerment & vocational tailoring photo
│   ├── gallery-volunteer.jpg  # Community distribution & field volunteer photo
│   ├── about-team.jpg         # NGO team & community center photo
│   ├── donate-impact.jpg      # Children learning center & library impact photo
│   ├── ourgallery.pdf         # Master Photo Gallery document from ckbndl.org/OurGallery
│   └── reports/               # Authentic PDF documents from ckbndl.org:
│       ├── DynamicReport.pdf  # Master dynamic report from ckbndl.org/DynamicReport
│       ├── OurSupporters.pdf  # Partner and donor organizations directory
│       ├── SchoolEducation.pdf# Education & Badi Bata field report
│       ├── HealthNutrition.pdf# Health & Fluorosis checkups report
│       ├── CommunityWelfare.pdf# Maternal & Infant care report
│       ├── EconomicEmpowerment.pdf # Women livelihood & FPO report
│       ├── OrganizationProfile.pdf # 30+ year institutional dossier
│       ├── VisionMission.pdf  # Vision & Mission charter
│       ├── BoardMembers.pdf   # Governing body directory
│       ├── Registration.pdf   # Society Registration Certificate (1992)
│       ├── 12A.pdf            # Income Tax Section 12A Certificate
│       ├── 80G.pdf            # Income Tax Section 80G Exemption Certificate
│       ├── FCRA.pdf           # Ministry of Home Affairs FCRA Certificate
│       ├── CSR.pdf            # MCA CSR-1 Registration Certificate
│       ├── UniqueID.pdf       # NITI Aayog NGO Darpan Certificate
│       └── PAN.pdf            # Tax Identification PAN Verification
├── next.config.mjs            # Next.js build configuration
├── package.json               # Node dependencies & project scripts
├── jsconfig.json              # Path aliases (`@/*`)
├── README.md                  # Quick start guide
└── PROJECT_GUIDE.md           # This comprehensive developer reference
```

---

## 4. Master CKB Data Reference

Use these authentic details whenever updating text or adding new sections:

### 🏛️ Organizational Profile
- **Full Legal Name**: Chaithanya Kala Bharathi (CKB)
- **Year Established**: 1992
- **Chief Functionary / Executive Secretary**: Mr. V. Vijaya Bhaskar
- **Official Address**:
  `D.No. 29/178-22H, S.B.I. Colony, Opp. Ramalayam Temple, Nandyal - 518 501, Andhra Pradesh, India`
- **Phone / Mobile**: `+91 9440464877`
- **Official Email**: `ckb_ndl@yahoo.com`
- **Official Website URL**: `https://www.ckbndl.org`

### 💳 Bank Account Details (for Donations)

#### 1. Indian Donations — State Bank of India (SBI)
- **Account Name**: `CHAITHANYA KALA BHARATHI`
- **Account Number**: `30861193442`
- **Bank Name**: State Bank of India
- **Branch**: Main Branch, Nandyal (Kurnool / Nandyal Dist., AP)
- **IFSC Code**: `SBIN000883`

#### 2. Indian Donations — Syndicate Bank
- **Account Name**: `CHAITHANYA KALA BHARATHI`
- **Account Number**: `3374-22000-75141`
- **Bank Name**: Syndicate Bank
- **Branch**: Main Branch, Nandyal
- **IFSC Code**: `SYNB0003374`

#### 3. Foreign Donations — FCRA Account (State Bank of India)
- **Account Name**: `CHAITHANYA KALA BHARATHI`
- **Bank Name**: State Bank of India
- **Account Number**: `40117327176`
- **Branch**: 11 Sansad Marg, New Delhi - 110 001
- **IFSC Code**: `SBIN0000691`
- **SWIFT Code**: `SBININBB104`

---

## 5. How to Open & Run in Any IDE

You can continue working on this project in **VS Code**, **Cursor**, **WebStorm**, or any standard code editor.

### Step 1: Open the Project Directory
- Open your IDE.
- Click **File ➔ Open Folder...**
- Select: `C:\Users\Support\.gemini\antigravity-ide\scratch\chaithanya-kala-bharathi`

### Step 2: Install Node Dependencies
Open a terminal in your IDE (`Ctrl + ~` in VS Code) and run:

```bash
npm install
```

### Step 3: Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser. The app features Hot Module Replacement (HMR) — any changes you make will reflect live immediately.

### Step 4: Run a Production Build Verification
To test if all static pages and routing compile with 0 errors:
```bash
npm run build
```

---

## 6. How to Customize Content & Styling

### Modifying Color Palette & Design Tokens
All global styles, fonts, colors, and border radii are defined in `app/globals.css`:

```css
:root {
  /* Primary Forest Green */
  --color-primary: #1B7A5A;
  --color-primary-light: #24996F;
  --color-primary-dark: #145E45;
  --color-primary-bg: #E8F5EF;

  /* Accent Amber */
  --color-secondary: #E8A838;
  --color-secondary-light: #F0C060;

  /* Typography */
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```
Changing any variable here will automatically cascade across all pages and components.

### Modifying Page Text
- **Home Page**: Edit `app/page.js`
- **About Us**: Edit `app/about/page.js`
- **Programs**: Edit `app/programs/page.js`
- **Gallery**: Edit `app/gallery/page.js`
- **Volunteer**: Edit `app/get-involved/page.js`
- **Donate**: Edit `app/donate/page.js`
- **Reports**: Edit `app/reports/page.js`
- **Contact Us**: Edit `app/contact/page.js`

---

## 7. Managing PDF Reports & Media Assets

### Adding or Updating Images
1. Save your `.jpg` or `.png` files inside `public/`.
2. Reference them anywhere in your code using `/your-image.jpg` (Next.js automatically serves files from `public/` at the root URL).

### Adding or Updating PDF Reports
1. Save your `.pdf` file inside `public/reports/`.
2. To link it in `app/reports/page.js` or `app/gallery/page.js`, add an entry to the `reportsData` or `certificates` array:
   ```javascript
   {
     title: 'Annual Audit Report 2025-26',
     file: '/reports/YourReportName.pdf',
     badge: 'Audited Financials',
     icon: '📈',
     description: 'Summary of fund utilization...',
     fileSize: '1.5 MB PDF',
   }
   ```

---

## 8. Connecting Forms to Email / Backend

The contact form in `app/contact/page.js` and volunteer form in `app/get-involved/page.js` currently provide an instant client-side success message.

### Recommended Free Email Integration Options:
1. **Formspree / Web3Forms**:
   - Add your endpoint URL to the `fetch` call inside `handleSubmit`:
   ```javascript
   const handleSubmit = async (e) => {
     e.preventDefault();
     await fetch('https://formspree.io/f/YOUR_FORM_ID', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData),
     });
     setSubmitted(true);
   };
   ```
2. **Next.js API Route (Resend / Nodemailer)**:
   - Create `app/api/contact/route.js` and use [Resend](https://resend.com) to send emails to `ckb_ndl@yahoo.com`.

---

## 9. Deploying to Vercel (CLI & GitHub)

### Method A: One-Command Deployment via Vercel CLI (Recommended)

1. Open PowerShell / Command Prompt in the project folder:
   ```powershell
   cd "C:\Users\Support\.gemini\antigravity-ide\scratch\chaithanya-kala-bharathi"
   ```
2. Run:
   ```powershell
   npx vercel
   ```
3. Follow the simple prompts:
   - Press `Enter` to log in via browser.
   - `Set up and deploy?`: Type `Y`
   - Select your scope and confirm project name `chaithanya-kala-bharathi`.
   - Accept default settings (`./` directory, default build command).
4. Vercel will build and output your live production URL:  
   `https://chaithanya-kala-bharathi.vercel.app`

### Method B: Deploy via GitHub

1. Initialize Git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Chaithanya Kala Bharathi NGO website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/chaithanya-kala-bharathi.git
   git push -u origin main
   ```
2. Open **[vercel.com](https://vercel.com)**, click **"Add New..." ➔ "Project"**.
3. Import the `chaithanya-kala-bharathi` repository and click **"Deploy"**.

### Mapping a Custom Domain (e.g. `www.ckbndl.org`)
1. In Vercel Project Settings, go to **Domains**.
2. Enter `www.ckbndl.org`.
3. Update your DNS records (CNAME `cname.vercel-dns.com` or A record `76.76.21.21`) at your domain registrar.

---

## 10. Troubleshooting & FAQs

### Q: PowerShell shows "scripts disabled on this system"
Run this command in PowerShell before running npm scripts:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Q: Port 3000 is already in use
Run on a different port:
```bash
npm run dev -- -p 3001
```

### Q: How do I test the mobile menu?
Resize your browser below `900px` width. The hamburger menu toggle will appear with an animated full-screen drawer.

---

*Document created for Chaithanya Kala Bharathi (CKB). All rights reserved.*
