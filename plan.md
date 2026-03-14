# Plan

## What the Current Code Does Well

- **Complete page structure.** All major sections are present: nav, hero, stats bar, product grid, benefits/ingredients, testimonials, subscribe CTA, FAQ, footer.
- **Solid cart mechanics.** Add, increment, decrement, remove, subscription pricing toggle, and subtotal calculation all work correctly.
- **Visual polish.** The color system is consistent, hover transitions are smooth, the animated counter with `IntersectionObserver` is a nice touch.
- **Responsive breakpoints.** The hybrid inline/className approach works — the grid collapses correctly at 768px.
- **Self-contained.** No external dependencies beyond React itself; easy to understand and modify.

---

## What Still Needs to Be Built or Fixed

### Bugs / Lint Errors
- [ ] **`addedAnimation` unused variable** — ESLint error. The "added to cart" feedback animation was never implemented. Either add the visual feedback or remove the dead state.

### Dead Code to Remove
- [ ] Remove `src/App.css` (not imported, Vite scaffold leftover)
- [ ] Remove `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg` (unused assets)
- [ ] Remove `public/icons.svg` (Vite scaffold, unused)
- [ ] Remove `hasImage` field from all product objects (always `false`, branch was removed)
- [ ] Remove `ingredients` field from product objects OR implement it in the UI

### Functionality Gaps
- [ ] **Subscribe frequency selector** — The "Every 30/60/90 Days" pills in the CTA section have no state and no interaction. They should behave like a radio group with a selected state.
- [ ] **Ingredients display** — Each product has a detailed ingredients string that is never shown to the user. Consider a product detail modal or an expandable section on the card.
- [ ] **Checkout flow** — The "Checkout" button in the cart does nothing. At minimum it should link somewhere or show a placeholder message.
- [ ] **Company/Support footer links** — "About Us", "Our Story", "Quality Promise", "Contact", "Shipping Policy", "Returns", "Privacy Policy" are all dead buttons with no destinations.

### Accessibility Gaps
- [ ] Cart close button needs `aria-label="Close cart"`
- [ ] FAQ accordion buttons need `aria-expanded={open}`
- [ ] Mobile menu button needs `aria-label` and `aria-expanded`
- [ ] Subscribe frequency pills need to be `<button>` elements with keyboard support
- [ ] Nav has no `<nav>` landmark role (currently uses `<nav>` element — correct — but the mobile menu div does not)

### Performance
- [ ] Move Google Fonts loading from the injected `<style>` `@import` into `<link rel="preconnect">` + `<link rel="stylesheet">` tags in `index.html`
- [ ] The `<style>` tag is re-rendered on every re-render of `PawzaWebsite` (it's inside the JSX return). Move global styles to `index.css`.

### Code Quality
- [ ] Replace `e.target` with `e.currentTarget` in hover handlers where the element has children (nav cart button, checkout button)
- [ ] Replace index-as-key (`key={i}`) in the cart item list with a stable key (e.g., `${item.id}-${item.subscription}`)
- [ ] Replace the hardcoded `"#d4883a"` in the badge color logic with `product.color`
- [ ] Update `README.md` to describe the Pawza project instead of the Vite scaffold

### Nice-to-Have / Future Features
- [ ] Product detail / ingredient modal
- [ ] Toast notification when item is added to cart (this is what `addedAnimation` was meant for)
- [ ] Image support for products (the `hasImage` field suggests this was planned)
- [ ] Real favicon (currently using the default Vite SVG)

---

## Prioritized Next Steps

### Priority 1 — Fix the lint error and remove dead code (low risk, high value)
1. Remove the `addedAnimation` state and its `setTimeout` call, OR implement the add-to-cart toast
2. Delete unused scaffold files: `App.css`, `hero.png`, `react.svg`, `vite.svg`, `icons.svg`
3. Remove the `hasImage` field from product data

### Priority 2 — Fix correctness issues (medium risk)
4. Replace `key={i}` in cart with `key={\`${item.id}-${item.subscription}\`}`
5. Replace `e.target` with `e.currentTarget` in hover handlers on elements with children
6. Replace the hardcoded `"#d4883a"` badge color with `product.color`

### Priority 3 — Implement missing interactions
7. Add state and selected styling to the subscribe frequency pills
8. Either display the `ingredients` field in the UI or remove it from the data

### Priority 4 — Accessibility baseline
9. Add `aria-label` to the cart close button
10. Add `aria-expanded` to FAQ accordion buttons
11. Add `aria-label` / `aria-expanded` to the mobile menu button

### Priority 5 — Performance & structure
12. Move font `<link>` tags to `index.html`
13. Move the injected `<style>` block's global/animation rules to `index.css`
14. Update `README.md`
