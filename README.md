# Bremma Sri Kundalini Sivayoga Aalayam

Official website for the temple in Gunong Rapat, Ipoh, Malaysia. Includes the 2027 International 18 Siddhas Conference registration and sacred book ordering for *Mukthikku Mulam* and *Siddha Kappiyam*.

🌐 **Live site:** _(add your URL once deployed)_

## Files in this repository

### Active (root)

| File | Purpose |
|------|---------|
| `index.html` | **The entire website.** Single self-contained file. All pages (Home, Temple, Books, Conference, Register, Contact), all images, all CSS, all JavaScript — embedded inside. Open in a browser, it works. |
| `Code.gs` | Google Apps Script that handles form submissions. Writes to Google Sheets and uploads receipts to Google Drive. Deploys **separately** in your Google account, not as part of the website. |
| `README.md` | This file. |
| `.gitignore` | Files Git should ignore. |
| `LICENSE` | Project license. |

### Archive (`/old`)

Earlier iterations of the site (back when it was split into multiple HTML files). Kept for reference. **You don't need these to run the site** — `index.html` contains everything.

## Features

- **Single HTML file** — no build step, no folder structure, drop it anywhere
- **English ⇄ Tamil toggle** that persists across navigation (saved in localStorage)
- **Tab navigation** between Home, Temple, Books, Conference, Register, Contact
- **Cream/saffron sacred manuscript aesthetic** with a rotating mandala on the home page and an auto-scrolling sanctum photo gallery
- **Conference registration form** with country dropdown, phone validation, receipt upload, and auto-generated **Member ID** (`SSRM-YYYYMMDD-XXXX`)
- **Book ordering** for *Mukthikku Mulam* and *Siddha Kappiyam* with quantity steppers, live total, WhatsApp confirmation
- **Maybank QR payment** embedded inline
- **Submissions auto-saved** to Google Sheets (separate tabs for registrations and book orders)
- **Receipt files** auto-uploaded to Google Drive, named with Member ID for easy lookup

## Deployment

### Option A: GitHub Pages (free)

1. Push this repo to GitHub
2. Repo Settings → Pages
3. Source: **Deploy from a branch**, branch `main`, folder `/` (root)
4. Save — site goes live at `https://<your-username>.github.io/<repo-name>/`
5. *(Optional)* Add a custom domain in the same settings page

### Option B: Netlify (free, drag-and-drop)

1. Go to https://app.netlify.com/drop
2. Drag `index.html` onto the page
3. Get an instant URL like `https://your-name.netlify.app`
4. Customize the site name in Site Settings

### Option C: Cloudflare Pages

1. https://pages.cloudflare.com → connect your GitHub repo
2. Build settings: leave empty (no build needed)
3. Output directory: `/`
4. Deploy

## Google Apps Script setup (required for form submissions)

The website talks to a Google Apps Script that writes form data to your Sheet and uploads receipts to your Drive. Without it, the forms can't submit.

1. **Create a Google Sheet** (any name — the script auto-creates the right tabs)
2. **Copy the Sheet ID** from its URL — the long string between `/d/` and `/edit`:
   ```
   https://docs.google.com/spreadsheets/d/THIS_PART/edit
   ```
3. **Create a folder in Google Drive** for receipts. Copy its ID from the URL:
   ```
   https://drive.google.com/drive/folders/THIS_PART
   ```
4. **Open https://script.google.com** → New Project
5. **Paste the contents of `Code.gs`** from this repo
6. **Edit the first two lines** — replace `SHEET_ID` and `FOLDER_ID` with your values
7. **Save** (💾 icon)
8. **Deploy** → New Deployment → Type: Web App
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click Deploy
9. **Authorize the script** — click through "Advanced → Go to [project] (unsafe) → Allow"
10. **Copy the Web App URL** (looks like `https://script.google.com/macros/s/.../exec`)
11. **In `index.html`**, find the line near the top of the `<script>` block:
    ```javascript
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/.../exec";
    ```
    Replace with your URL.
12. Commit and redeploy.

### After updating Code.gs later

Always **redeploy** (Deploy → Manage deployments → ✏️ → New version → Deploy). Just saving isn't enough — the web app endpoint serves the deployed version.

## Things to customize before launch

In `index.html`, search-and-replace these placeholders:

| Find | Replace with |
|------|--------------|
| `60165434809` | Temple WhatsApp number (no +, no spaces). Currently set to +60 16-543 4809. |
| `+60 16-543 4809` | Display version of the WhatsApp number |
| `info@ssrm.my` | Real temple email |
| `+60 5-XXX XXXX` | Real temple landline |

## Tech notes

- **Single-file architecture:** every image is base64-encoded inline, so the site has zero external dependencies (other than Google Fonts, which loads from a CDN).
- **No build step:** plain HTML/CSS/JS. Open `index.html` in any browser to develop.
- **No backend on this side:** form submissions go directly to your Apps Script.
- **Languages:** English and Tamil, toggled via a CSS class on `<body>`.

## Credits

- Temple lineage: **Bremma Sri Kundalini Siddhar Sami Mahaguru** (founder, 1959–2016)
- Current spiritual head: **Bremma Gnana Siddhar Swami — Dr. Ratna Ganapathi**
- Author of *Mukthikku Mulam* and *Siddha Kappiyam*: Dr. Ratna Ganapathi
- Site built 2026

---

*Bremma Sri Kundalini Sivayoga Aalayam · Gunong Rapat, Ipoh, Perak, Malaysia · Est. 1985*
