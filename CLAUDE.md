# CLAUDE.md — Pawza Pets Project Guide

## Project Overview

Pawza Pets is a single-page React e-commerce site for a fictional dog supplement brand. It is a pure frontend marketing/storefront site with:
- A sticky navigation bar with cart drawer
- Hero section, product grid, benefits/ingredients, testimonials, FAQ, and footer
- Cart state (add, increment, decrement, remove) with subscribe & save pricing
- Scroll-triggered animated counters
- Mobile-responsive layout

There is no backend, no router, no database, and no test suite. The entire UI is in `src/App.jsx`.

---

## Running the Project

```bash
npm install       # install dependencies (first time only)
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
npm run lint      # run ESLint
```

---

## Code Style Conventions

### Colors
All brand colors are module-level constants at the top of `App.jsx`. **Never use raw hex strings for brand colors** — always reference the constants:
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

### Styling
- All component styles use **inline `style` props** — do not introduce CSS classes for visual styling.
- Media query overrides that cannot be expressed inline are injected via a `<style>` tag inside `PawzaWebsite`. Use `!important` only in that block when overriding inline styles.
- Do not introduce a CSS-in-JS library or CSS modules unless explicitly asked.

### Component Structure
- Small, focused components at the top of `App.jsx` (e.g., `PawzaLogo`, `Stars`, `Counter`, `FaqItem`, `ProductCard`, `Cart`).
- The root `PawzaWebsite` component owns all state and renders all page sections.
- Keep page sections as inline JSX inside `PawzaWebsite` rather than splitting them into separate component files unless a section becomes complex enough to warrant it.

### Data
- Content (products, testimonials, FAQs) lives as module-level `const` arrays in `App.jsx`.
- Product objects have this shape: `{ id, name, price, description, benefits[], ingredients, color, icon, badge, hasImage }`.
- Do not add new fields to the product schema without removing or implementing the old unused ones first (`hasImage`, `ingredients` are currently dead).

### Hover Effects
- Use `onMouseEnter`/`onMouseLeave` with `e.currentTarget` (not `e.target`) when the element has children, to avoid the handler firing on child nodes.

### State Updates
- Cart state mutations should use functional updates or spread copies — never mutate state directly.
- Avoid index-as-key (`key={i}`) for list items that can be reordered or removed; prefer stable IDs.

### Fonts
- Fonts (Playfair Display, DM Sans) are loaded from Google Fonts. The `@import` in the injected `<style>` tag is a known performance issue — do not add more fonts this way. If adding fonts, use `<link>` tags in `index.html`.

---

## Mistakes & Anti-Patterns to Avoid

1. **Don't declare state you don't use.** `addedAnimation` is currently an unused state variable that causes an ESLint error. Either implement the animation or remove the state.

2. **Don't use `e.target` in hover handlers on elements with children.** Use `e.currentTarget` to reliably target the element you attached the handler to.

3. **Don't hardcode colors as hex strings** inside component JSX. The badge color logic has one instance of this (`"#d4883a"`) — it should reference `product.color`.

4. **Don't leave dead fields in the data schema.** `hasImage` serves no purpose since all products have `hasImage: false`. `ingredients` is defined on every product but never rendered.

5. **Don't use index as `key` in dynamic lists** (cart items). Use a stable identifier.

6. **Don't add non-interactive `<div>` elements that look interactive** without keyboard support and ARIA roles. The subscribe frequency pills are currently display-only despite looking like buttons.

7. **Don't leave scaffold files.** `src/App.css`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, and `public/icons.svg` are Vite template leftovers and should be deleted.

---

## Verification

After every change, run the following in order:

### 1. Lint check (must pass with zero errors)
```bash
npm run lint
```

### 2. Production build (must succeed)
```bash
npm run build
```

### 3. Visual browser check
```bash
npm run dev
# Open http://localhost:5173
```

**Browser checklist:**
- [ ] Page loads without console errors
- [ ] Navigation links scroll to correct sections
- [ ] "Add to Cart" opens the cart drawer and increments the badge count
- [ ] Subscribe & Save toggle changes the price on the product card and shows the discount in the cart
- [ ] Quantity − button removes the item when qty reaches 1
- [ ] Cart overlay click closes the drawer
- [ ] Mobile menu appears at ≤ 768px viewport width
- [ ] Stats counter animates when scrolled into view
- [ ] FAQ items expand and collapse on click
