# Quick Start

A 5-minute checklist to get the site running.

## 1. Update the placeholder values in `index.html`

Open `index.html` in any text editor and search-and-replace:

| Find | Replace with |
|------|--------------|
| `info@ssrm.my` | Real temple email |
| `+60 5-XXX XXXX` | Real temple landline phone |

The WhatsApp number `+60 16-543 4809` and the Apps Script URL are already configured.

## 2. Test locally

Double-click `index.html` → opens in your browser → click around all tabs → toggle EN/தமிழ் → try the registration form.

## 3. Deploy

Easiest: drag `index.html` onto https://app.netlify.com/drop → get a URL → done.

GitHub Pages: push this repo to GitHub → Settings → Pages → deploy from `main` branch → done.

## 4. Test form submissions

Submit a test registration → check:
- ✓ Member ID appears on screen
- ✓ A new row shows up in your Google Sheet
- ✓ The receipt file appears in your Drive folder

If any of these fail → see the Apps Script setup section in `README.md`.

## What people will see

- **Home** → temple intro, sacred verse, sanctum photo gallery
- **Temple** → founder biography, weekly classes, academy info
- **Books** → Mukthikku Mulam + Siddha Kappiyam, order form, RM 100 each
- **Conference** → 2027 conference details, countdown, registration link
- **Register** → conference registration form, RM 100, payment QR, receipt upload
- **Contact** → temple address, WhatsApp, donation QR

## Things to remember

- **Member IDs** are generated automatically: `SSRM-YYYYMMDD-XXXX` for conference, `SSRM-ORD-YYYYMMDD-XXXX` for book orders
- **Two tabs** appear in your Google Sheet: "Registrations" and "Book Orders"
- **Receipts** in Drive are named `<MemberID> - <Name> - <original-filename>` so you can find any submission quickly
- **Language toggle** persists across sessions via the user's browser localStorage
