# Pawza Pets

A single-page e-commerce marketing site for Pawza Pets, a fictional premium dog supplement brand.

## Tech Stack

- **React 19** + **Vite 8** — UI and build tooling
- **Inline styles** — all component styling via the `style` prop
- **Google Fonts** — Playfair Display (headings) + DM Sans (body)
- No router, no state management library, no test framework

## Project Structure

```
src/
├── main.jsx      # React root mount
├── index.css     # Global reset, keyframe animations, responsive media queries
└── App.jsx       # Entire application — all components and page sections
```

## Running Locally

```bash
npm install
npm run dev       # http://localhost:5173
```

## Other Commands

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build
npm run lint      # ESLint check
```

## Page Sections

1. Fixed navigation with cart drawer
2. Hero with animated stats counters
3. Product grid (3 products) with subscribe & save toggle
4. Benefits + key ingredients panel
5. Customer testimonials
6. Subscribe & Save CTA with frequency selector
7. FAQ accordion
8. Footer
