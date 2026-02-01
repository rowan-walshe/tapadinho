# Tapadinho Nature and Pool - Property Marketing Website

A bilingual (PT/EN) single-page React + TailwindCSS marketing site for a Portuguese countryside Airbnb/Booking.com property. Hosted on GitHub Pages at `demo.walshe.io`.

## Property Information

**Name:** Tapadinho Nature and Pool (Casa do Tapadinho)  
**Location:** Casal da Renda, Paraíso, Castelo de Paiva, Portugal  
**Rating:** 9.6/10 (Exceptional) on Booking.com  
**License:** 54824/AL  
**Capacity:** 2 bedrooms, up to 5 guests  
**Highlights:** Private pool, native forest, pet-friendly, 1 hour from Porto

## Project Status

**Current Phase:** v1 Implementation Complete — Ready for Review  
**Last Updated:** 2026-02-01

---

## v1 Features

### Core Setup

- [x] Scaffold project with Vite + React + TailwindCSS + pnpm
- [x] Configure TypeScript
- [x] Set up GitHub Actions deployment to `gh-pages` branch
- [x] Configure custom domain (`demo.walshe.io`) with CNAME file
- [x] Create Makefile with dev, build, format, optimize targets

### Media Pipeline

- [x] Create media optimization script (`scripts/optimize-media.sh`)
- [x] Optimize drone video → WebM + MP4 fallback (~15s)
- [x] Optimize 20 images → WebP + responsive srcsets (640/1024/1920px)

### Internationalization

- [x] Set up `react-i18next` for i18n
- [x] Create translation files (`src/locales/en.json`, `src/locales/pt.json`)
- [x] Add language toggle in header
- [x] Store language preference in localStorage

### Page Sections (Components)

- [x] `Header` — Navigation + language toggle
- [x] `Hero` — Full-viewport drone video (muted autoplay, poster fallback)
- [x] `About` — Property & area description (bilingual)
- [x] `Gallery` — Lightbox carousel organized by area
- [x] `Reviews` — Curated testimonials (placeholder content for now)
- [x] `FAQ` — Accordion component
- [x] `Location` — Placeholder stylised map image
- [x] `Calendar` — Placeholder section with "Check Availability" Airbnb link
- [x] `Footer` — Contact info, Airbnb link, copyright

### Content & Data

- [x] Property details documented (`property_info/property_details.md`)
- [x] Real reviews collected from Booking.com (`property_info/reviews.json`)
- [x] DeepL translation script for reviews (`scripts/translate_reviews.py`)
- [x] Reviews translated to EN, ES, NL, DE, FR

---

## v1.1 Features (Planned)

- [ ] iCal integration for availability calendar
  - Fetch Airbnb iCal export at build-time or via edge function
  - Render custom calendar with free/booked states
  - Clicking date range opens Airbnb pre-filled with those dates
- [ ] Create stylised map assets
  - Property floorplan/layout (zoomed in)
  - Local area with POIs - shops, restaurants, cafes, tourist spots (zoomed out)

---

## Future Versions (Ideas)

- [ ] High-quality hero video (full production quality)
- [ ] Additional language support (dropdown based on visitor nationalities)
- [ ] Visitor information section (directions, check-in/out, emergency contacts)
- [ ] Analytics integration

---

## Technical Details

### Stack

- **Framework:** React + TypeScript
- **Styling:** TailwindCSS
- **Build Tool:** Vite
- **Package Manager:** pnpm
- **Hosting:** GitHub Pages
- **Domain:** demo.walshe.io (DNS via Cloudflare)

### Available Media Assets

Located in `./temporary_media/`:

| Category | Files |
|----------|-------|
| Bathroom | `bathroom-1.jpg` |
| Bedroom 1 | `bedroom_1-1.jpg`, `bedroom_1-2.jpg` |
| Bedroom 2 | `bedroom_2-1.jpg` |
| Front | `front-door.jpg` |
| Interior | `interior-1.jpg`, `interior-2.jpg` |
| Kitchen | `kitchen-1.jpg`, `kitchen-2.jpg` |
| Living Room | `living_room-1.jpg`, `living_room-2.jpg` |
| Nature | `nature-1.jpg` through `nature-5.jpg` |
| Patio | `patio-1.jpg`, `patio-2.jpg` |
| Pool | `pool-1.jpg`, `pool-2.jpg` |
| Video | `property_drone_shot.mp4` |

---

## Open Questions

- [x] ~~**Property display name**~~ — Confirmed: "Tapadinho Nature and Pool" (Casa do Tapadinho)
- [x] ~~**Review content**~~ — Real reviews collected and translated from Booking.com
- [x] ~~**Restore translation files**~~ — Restored with updated property info and real reviews
- [ ] **Airbnb listing URL** — Still need the actual URL for booking links

---

## Deployment Notes

### GitHub Pages Setup

1. GitHub Actions workflow builds and deploys to `gh-pages` branch
2. `CNAME` file contains `demo.walshe.io`

### Cloudflare DNS Configuration

When ready to deploy, add these records in Cloudflare:

```
Type: CNAME
Name: demo
Target: <github-username>.github.io
Proxy status: DNS only (grey cloud) or Proxied (orange cloud)
```

*Note: If using apex domain, use A records pointing to GitHub's IPs instead.*

---

## Changelog

### 2026-02-01
- Initial plan created
- Decided on bilingual PT/EN for v1
- Calendar iCal integration moved to v1.1
- Stylised maps will use placeholder for v1
- v1 implementation completed (all components built)
- Property name confirmed: "Tapadinho Nature and Pool"
- Property details documented from Booking.com listing
- Real guest reviews collected and translated via DeepL API (EN, ES, NL, DE, FR)
- Translation script added (`scripts/translate_reviews.py`)
- **Issue:** Translation locale files (`src/locales/*.json`) deleted — need restoration
- Translation files restored with real property info (Tapadinho) and guest reviews
- Updated Header and Footer components with correct property name
