# Codebase Research

## Project Overview

Pawza Pets is a single-page e-commerce marketing site for a fictional dog supplement brand. It is a pure frontend React app with no backend, no routing, no state management library, and no test suite. The entire UI lives in one file.

---

## Project Structure

```
First-Repo1/
├── index.html              # Entry HTML; sets page title
├── vite.config.js          # Minimal Vite config (plugin-react only)
├── eslint.config.js        # ESLint 9 flat config
├── package.json            # Scripts: dev, build, lint, preview
├── public/
│   ├── favicon.svg         # Default Vite favicon (not Pawza branded)
│   └── icons.svg           # Default Vite icon sprite (unused by app)
├── src/
│   ├── main.jsx            # React root mount; imports index.css
│   ├── index.css           # Minimal global reset (margin/padding/box-sizing)
│   ├── App.css             # Leftover Vite scaffold CSS — NOT imported by App.jsx
│   ├── App.jsx             # Entire application (~850 lines)
│   └── assets/
│       ├── hero.png        # Unused asset (referenced by old scaffold App.jsx)
│       ├── react.svg       # Unused Vite scaffold asset
│       └── vite.svg        # Unused Vite scaffold asset
```

---

## Frameworks & Tools

| Tool | Version | Role |
|---|---|---|
| React | 19.2 | UI library |
| Vite | 8.0 | Dev server + build tool |
| @vitejs/plugin-react | 6.0 | Babel-based JSX transform |
| ESLint | 9.x | Linting (flat config) |
| eslint-plugin-react-hooks | 7.x | Hooks rules |
| eslint-plugin-react-refresh | 0.5 | HMR safety rules |

No TypeScript, no CSS modules, no component library, no router, no test framework.

---

## Key Patterns in App.jsx

### Color System
Nine color constants are defined at the top of the file and referenced throughout:
```js
const TEAL = "#1a7a6d";
const TEAL_DARK = "#145f55";
const TEAL_LIGHT = "#e6f5f2";
const CREAM = "#faf6ef";
const CREAM_DARK = "#f0e9dc";
const CORAL = "#e85d4a";
const TEXT_DARK = "#1a2e2a";
const TEXT_MED = "#4a6560";
const TEXT_LIGHT = "#7a9590";
```

### Data / Content
All content (products, testimonials, FAQs) is hardcoded as module-level `const` arrays. No external data fetching.

### Styling Approach
All styling is **inline styles via the `style` prop**. No CSS classes are used for visual styling — only for responsive overrides that need media queries. Those responsive rules are injected via a `<style>` tag rendered inside the root `<div>` in `PawzaWebsite`. CSS variables are not used.

### Responsive Strategy
The layout uses a hybrid approach: inline `display: "grid"` / `display: "flex"` for structure, and className-based overrides (`products-grid`, `hero-grid`, `footer-grid`, etc.) that are targeted by the injected `<style>` block at `@media (max-width: 768px)`. The `!important` flag is required because inline styles take precedence.

### Component Breakdown
| Component | Lines (approx) | Responsibility |
|---|---|---|
| `PawzaLogo` | 116–129 | SVG logo, accepts `height` and `color` |
| `Stars` | 131–137 | Renders N gold star spans |
| `Counter` | 139–173 | Scroll-triggered animated number counter using `IntersectionObserver` |
| `Cart` | 175–395 | Slide-in drawer; quantity controls; checkout button |
| `ProductCard` | 397–580 | Card with image area, benefits chips, subscription toggle, add-to-cart |
| `FaqItem` | 582–629 | Accordion item with CSS max-height animation |
| `PawzaWebsite` | 631–end | Root component; holds all state; renders all page sections |

### State Management
All state lives in `PawzaWebsite`:
- `cart` — array of `{ ...product, qty, subscription }`
- `cartOpen` — boolean
- `scrolled` — boolean (drives nav appearance)
- `mobileMenu` — boolean
- `addedAnimation` — product id or null (**currently unused**)

Cart mutation uses index-based array operations (spread + index reassignment).

### Hover Effects
Hover states are implemented with `onMouseEnter`/`onMouseLeave` handlers that mutate `e.target.style` or `e.currentTarget.style` directly. This is a non-React pattern that bypasses the virtual DOM.

### Font Loading
Google Fonts (Playfair Display + DM Sans) are loaded via `@import` inside the injected `<style>` tag. This is a render-blocking approach.

---

## Inconsistencies & Issues

### 1. Unused state variable — `addedAnimation` (lint error)
`addedAnimation` is set in `addToCart` but never read anywhere. The animation it was intended to trigger (e.g., a visual "Added!" flash) was never implemented. ESLint flags this as an error.

### 2. Leftover scaffold files
`src/App.css`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, and `public/icons.svg` are all Vite scaffold leftovers. `App.css` is not imported by the current `App.jsx`. None of these assets are used.

### 3. `hasImage` field is vestigial
All three products have `hasImage: false`. The field was originally used to conditionally render a `<img>` tag for product 1. The image path (`/mnt/user-data/uploads/IMG_5130.png`) was an upload path that doesn't exist in the repo. The `hasImage` check was removed when the component was cleaned up but the field remains in the data, creating dead schema weight.

### 4. `ingredients` field is never displayed
Each product object has a detailed `ingredients` string. It is never rendered anywhere in the UI — not on the product card, not in a modal, not in a tooltip.

### 5. `products` data color for "New" badge is hardcoded twice
The "New" badge color `#d4883a` is both the product's `.color` value and hardcoded again in the badge color logic: `product.badge === "New" ? "#d4883a" : TEAL`. It should use `product.color` instead for consistency.

### 6. `App.css` is still imported in… nothing
`App.css` exists and contains Vite scaffold styles. `main.jsx` does not import it, `App.jsx` does not import it. It is a dead file.

### 7. Hover handlers use `e.target` vs `e.currentTarget` inconsistently
Some hover handlers use `e.target` (which may refer to a child element, not the button itself) and others correctly use `e.currentTarget`. This can cause bugs when the mouse moves over child nodes inside a button.

### 8. Cart uses array index as key
`cart.map((item, i) => <div key={i} ...>)` — index-as-key is an anti-pattern when items can be added/removed and will cause incorrect reconciliation if cart items are ever reordered.

### 9. Font loading is render-blocking
`@import` inside a `<style>` tag inside JSX is the worst-performing way to load web fonts. It should be a `<link rel="preconnect">` + `<link rel="stylesheet">` in `index.html`.

### 10. No `aria` labels or semantic structure for accessibility
The nav uses `<button>` correctly but the cart close button has no `aria-label`. The FAQ accordion has no `aria-expanded`. The mobile menu has no `role="navigation"`. The subscribe & save frequency pills are `<div>` elements acting as radio buttons with no keyboard support.

### 11. Subscribe & Save frequency selector has no state
The three frequency pills ("Every 30 Days", etc.) render as static `<div>` elements with no click handler and no selected state. Clicking them does nothing.

### 12. `README.md` is the default Vite scaffold template
It references `@vitejs/plugin-react` setup details and has nothing to do with Pawza Pets.
