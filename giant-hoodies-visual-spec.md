# Giant Hoodies — Visual Design Spec

## Brand Overview

### Personality
- **Vibe:** Cozy, relaxed, homey, playful, fun, casual
- **Feel:** Like your favorite worn-in sweatshirt, not a museum piece
- **Visual world:** Anywhere comfort matters — couch with coffee, movie night, work from home, laundry day, cabin weekend

### Customer Profile (Priority Order)
1. **Comfort Seeker** — Always cold, prioritizes cozy, doesn't care about trends
2. **Nester** — Invests in home comfort, quality over quantity
3. **Treat-Yourself Buyer** — Impulsive, wants to feel good, responds to deals
4. **Gifter** — Buys for others, loves making people smile
5. **Practical Parent** — Needs easy, durable, good value

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Terracotta | `#c4704b` | 196, 112, 75 | Primary accent, CTAs on dark backgrounds, promo badges, announcement bar |
| Espresso | `#3d3028` | 61, 48, 40 | Primary buttons, text, dark backgrounds |
| Cream | `#faf7f4` | 250, 247, 244 | Page backgrounds, light sections |
| Sand | `#e8d5c4` | 232, 213, 196 | Secondary backgrounds, soft buttons, cards |

### Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Gold | `#c9a962` | 201, 169, 98 | Accents, special badges (optional) |
| Warm Gray | `#5a4a3d` | 90, 74, 61 | Secondary text, muted elements |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success | `#7a9c6d` | Success messages, in-stock indicators |
| Warning | `#d4a574` | Low stock warnings |
| Error | `#c45c4b` | Error messages, out of stock |

### CSS Variables

```css
:root {
  /* Primary */
  --color-terracotta: #c4704b;
  --color-espresso: #3d3028;
  --color-cream: #faf7f4;
  --color-sand: #e8d5c4;
  
  /* Secondary */
  --color-gold: #c9a962;
  --color-warm-gray: #5a4a3d;
  
  /* Semantic */
  --color-success: #7a9c6d;
  --color-warning: #d4a574;
  --color-error: #c45c4b;
  
  /* Text */
  --color-text-primary: #3d3028;
  --color-text-secondary: #5a4a3d;
  --color-text-muted: #8a7a6d;
  --color-text-inverse: #faf7f4;
}
```

---

## Typography

### Font Families

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| Headings | Fraunces | 400, 600 | Georgia, serif |
| Body | DM Sans | 400, 500, 600, 700 | system-ui, sans-serif |

### Google Fonts Import

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Font | Size (Mobile) | Size (Desktop) | Weight | Line Height |
|---------|------|---------------|----------------|--------|-------------|
| H1 | Fraunces | 2rem | 3rem | 600 | 1.2 |
| H2 | Fraunces | 1.5rem | 2rem | 600 | 1.3 |
| H3 | Fraunces | 1.25rem | 1.5rem | 600 | 1.3 |
| H4 | Fraunces | 1.1rem | 1.25rem | 600 | 1.4 |
| Body | DM Sans | 1rem | 1rem | 400 | 1.6 |
| Body Small | DM Sans | 0.875rem | 0.875rem | 400 | 1.5 |
| Caption | DM Sans | 0.75rem | 0.75rem | 500 | 1.4 |
| Button | DM Sans | 0.95rem | 1rem | 600 | 1 |

### CSS Variables

```css
:root {
  --font-heading: 'Fraunces', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  --text-4xl: 3rem;
}
```

---

## Spacing & Layout

### Spacing Scale

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
}
```

### Container

```css
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-6);
  }
}
```

### Product Grids

**Mobile (< 768px):**
- 2 columns
- Edge-to-edge (no container padding on grid)
- 3px gap between cards
- Product info overlaid on image with gradient

**Desktop (≥ 768px):**
- 4 columns
- Container with padding
- 20px gap between cards
- Product info overlaid on image with gradient

```css
.product-grid {
  display: grid;
  gap: 3px;
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .product-grid {
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## Border Radius

### Scale

| Size | Value | Usage |
|------|-------|-------|
| Small | 8px | Small elements, inputs |
| Medium | 12px | Cards, modals |
| Large | 16px | Large cards, sections |
| XL | 20px | Product cards, major containers |
| Full | 50px / 9999px | Buttons, pills, badges |

### CSS Variables

```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;
}
```

---

## Shadows

### Style: Soft & Diffused

All shadows use warm-tinted color for cohesion with brand.

| Level | Value | Usage |
|-------|-------|-------|
| Small | `0 2px 8px rgba(61, 48, 40, 0.06)` | Subtle lift, buttons |
| Medium | `0 6px 20px rgba(61, 48, 40, 0.08)` | Cards, dropdowns |
| Large | `0 10px 40px rgba(61, 48, 40, 0.1)` | Modals, drawers |
| XL | `0 20px 60px rgba(61, 48, 40, 0.12)` | Hero elements |

### CSS Variables

```css
:root {
  --shadow-sm: 0 2px 8px rgba(61, 48, 40, 0.06);
  --shadow-md: 0 6px 20px rgba(61, 48, 40, 0.08);
  --shadow-lg: 0 10px 40px rgba(61, 48, 40, 0.1);
  --shadow-xl: 0 20px 60px rgba(61, 48, 40, 0.12);
}
```

---

## Animations

### Timing

| Speed | Duration | Usage |
|-------|----------|-------|
| Fast | 150ms | Micro-interactions, hovers |
| Normal | 250ms | Most transitions |
| Slow | 350ms | Drawers, modals, page transitions |

### Easing

```css
:root {
  --ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Common Transitions

```css
/* Default transition */
.transition {
  transition: all 250ms var(--ease-out);
}

/* Button hover */
.btn {
  transition: background-color 150ms var(--ease-out), 
              transform 150ms var(--ease-out);
}

.btn:hover {
  transform: translateY(-1px);
}

/* Drawer slide */
.drawer {
  transition: transform 350ms var(--ease-out);
}
```

---

## Buttons

### Primary Dark (Espresso)

**Use for:** Add to Cart, Checkout, Quick Add, form submissions

```css
.btn-primary {
  background: var(--color-espresso);
  color: var(--color-cream);
  padding: 14px 28px;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 150ms var(--ease-out),
              transform 150ms var(--ease-out);
}

.btn-primary:hover {
  background: #5a4a3d;
  transform: translateY(-1px);
}
```

### Primary Warm (Terracotta)

**Use for:** Hero CTAs, Browse/Shop buttons, Email signup, Upsells, buttons on dark backgrounds

```css
.btn-primary-warm {
  background: var(--color-terracotta);
  color: white;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 150ms var(--ease-out),
              transform 150ms var(--ease-out);
}

.btn-primary-warm:hover {
  background: #a85a3a;
  transform: translateY(-1px);
}
```

### Secondary Outline

**Use for:** Continue Shopping, secondary CTAs, Cancel/Back actions

```css
.btn-secondary {
  background: transparent;
  color: var(--color-espresso);
  padding: 14px 28px;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  border: 2px solid var(--color-espresso);
  cursor: pointer;
  transition: all 150ms var(--ease-out);
}

.btn-secondary:hover {
  background: var(--color-espresso);
  color: var(--color-cream);
}
```

### Secondary Soft

**Use for:** View All, filters, tertiary actions, gentle nudges

```css
.btn-soft {
  background: var(--color-sand);
  color: var(--color-espresso);
  padding: 14px 28px;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 150ms var(--ease-out);
}

.btn-soft:hover {
  background: #d4c4b0;
}
```

### Button Usage Quick Reference

| Context | Button Style |
|---------|--------------|
| Add to Cart | Primary Dark |
| Checkout | Primary Dark |
| Quick Add (product cards) | Primary Dark |
| Hero CTA ("Shop All") | Primary Dark (on light BG) or Primary Warm (on dark BG) |
| Browse / Explore | Primary Warm |
| Email Signup | Primary Warm |
| Upsell blocks | Primary Warm |
| Continue Shopping | Secondary Outline |
| View Details | Secondary Outline |
| View All | Secondary Soft |
| Filters | Secondary Soft |

---

## Product Cards

### Layout: Gradient Overlay

Product info sits on the image with a gradient overlay. Used for both mobile and desktop.

```css
.product-card {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: white;
  box-shadow: var(--shadow-md);
}

.product-card__image {
  aspect-ratio: 0.85;
  width: 100%;
  object-fit: cover;
}

.product-card__info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px 12px 12px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  color: white;
}

.product-card__title {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-card__price {
  font-size: 0.9rem;
  font-weight: 700;
}

.product-card__price-compare {
  font-weight: 400;
  opacity: 0.7;
  text-decoration: line-through;
  margin-left: 6px;
  font-size: 0.8rem;
}
```

### Promo Badges

Pill style, positioned top-left of card.

```css
.product-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 1;
}

.product-badge--bestseller {
  background: var(--color-terracotta);
  color: white;
}

.product-badge--new {
  background: var(--color-espresso);
  color: var(--color-cream);
}

.product-badge--sale {
  background: var(--color-terracotta);
  color: white;
}

.product-badge--low-stock {
  background: var(--color-warning);
  color: var(--color-espresso);
}
```

---

## Trust Badges

### Style: Duotone

Icons have a warm background with terracotta icon color.

```css
.trust-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--color-text-primary);
}

.trust-badge__icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-sand);
  color: var(--color-terracotta);
  border-radius: 50%;
  font-size: 0.9rem;
}

/* Trust bar layout */
.trust-bar {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 12px 0;
}
```

### Trust Messages

- ✓ Free shipping $75+
- ↩ 30-Day Returns
- 🇺🇸 Made in USA
- ★ 225k+ Customers

---

## Header

### Behavior: Sticky on Scroll Up

- Visible on page load
- Hides when scrolling down (to maximize product viewing)
- Reappears when scrolling up (quick access to nav)

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: white;
  box-shadow: var(--shadow-sm);
  transition: transform 350ms var(--ease-out);
}

.header--hidden {
  transform: translateY(-100%);
}
```

### Structure

```
┌─────────────────────────────────────────────┐
│ [Announcement Bar - Terracotta BG]          │
├─────────────────────────────────────────────┤
│ [≡]  [Logo]                    [🔍] [Cart]  │
└─────────────────────────────────────────────┘
```

---

## Mobile Menu

### Style: Slide-in Drawer

Slides in from right with overlay. Smooth animation.

```css
.menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  transition: opacity 300ms var(--ease-out),
              visibility 300ms var(--ease-out);
  z-index: 200;
}

.menu-overlay--active {
  opacity: 1;
  visibility: visible;
}

.menu-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  max-width: 400px;
  background: white;
  transform: translateX(100%);
  transition: transform 350ms var(--ease-out);
  z-index: 201;
  padding: 60px 24px 24px;
  overflow-y: auto;
}

.menu-drawer--active {
  transform: translateX(0);
}

.menu-drawer__close {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 1.5rem;
  color: var(--color-espresso);
  background: none;
  border: none;
  cursor: pointer;
}

.menu-drawer__link {
  display: block;
  padding: 16px 0;
  font-size: 1.1rem;
  color: var(--color-espresso);
  text-decoration: none;
  border-bottom: 1px solid var(--color-sand);
}
```

---

## Product Page Gallery

### Style: Swipeable Horizontal (Mobile)

Swipe left/right to see more images. Dots indicate position.

```css
.gallery {
  position: relative;
  overflow: hidden;
}

.gallery__track {
  display: flex;
  transition: transform 300ms var(--ease-out);
}

.gallery__slide {
  flex: 0 0 100%;
  aspect-ratio: 1;
}

.gallery__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery__dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.gallery__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: background 150ms;
}

.gallery__dot--active {
  background: white;
}
```

### Desktop Layout

Thumbnails on left, main image on right. Or keep swipeable for consistency.

---

## Announcement Bar

### Behavior

- Toggles content based on pricing mode (tiered vs flat)
- Background: Terracotta
- Text: White

```css
.announcement-bar {
  background: var(--color-terracotta);
  color: white;
  text-align: center;
  padding: 10px 16px;
  font-size: 0.9rem;
  font-weight: 600;
}

.announcement-bar a {
  color: white;
  text-decoration: underline;
}
```

---

## Cart Drawer

### Style

Matches mobile menu drawer behavior. Slides from right.

```css
.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 420px;
  background: white;
  transform: translateX(100%);
  transition: transform 350ms var(--ease-out);
  z-index: 201;
  display: flex;
  flex-direction: column;
}

.cart-drawer--active {
  transform: translateX(0);
}

.cart-drawer__header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-sand);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-drawer__items {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.cart-drawer__footer {
  padding: 20px;
  border-top: 1px solid var(--color-sand);
  background: var(--color-cream);
}
```

---

## Mobile Sticky Add to Cart

Appears when main Add to Cart button scrolls out of view.

```css
.sticky-atc {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 12px 16px;
  box-shadow: 0 -4px 20px rgba(61, 48, 40, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  z-index: 99;
  transform: translateY(100%);
  transition: transform 300ms var(--ease-out);
}

.sticky-atc--visible {
  transform: translateY(0);
}

.sticky-atc__price {
  font-weight: 700;
  font-size: 1.1rem;
}

.sticky-atc__price span {
  display: block;
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--color-text-muted);
}

.sticky-atc__button {
  flex: 1;
  max-width: 200px;
}
```

---

## Form Elements

### Text Input

```css
.input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid var(--color-sand);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-text-primary);
  background: white;
  transition: border-color 150ms;
}

.input:focus {
  outline: none;
  border-color: var(--color-terracotta);
}

.input::placeholder {
  color: var(--color-text-muted);
}
```

### Select

```css
.select {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid var(--color-sand);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-text-primary);
  background: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* dropdown arrow */
  background-repeat: no-repeat;
  background-position: right 16px center;
}
```

---

## Photography Guidelines

### Priority Order

1. **Lifestyle photos** — Real people in cozy moments
2. **UGC (User Generated Content)** — Customer photos
3. **Product shots** — Clean product on model or flat lay
4. **Detail shots** — Fabric texture, stitching, sizing

### Mood

- Warm lighting (golden hour, lamp light)
- Cozy settings (couch, bed, cabin, kitchen)
- Relaxed poses (not stiff or overly styled)
- Genuine expressions (smiling, laughing, cozy)

### Technical

- Consistent color grading (warm tones)
- High resolution for zoom functionality
- Square or 4:5 aspect ratio for product images
- Lifestyle can be wider (16:9 for hero)

---

## Summary Table

| Element | Value |
|---------|-------|
| Primary Font | Fraunces (headings) |
| Secondary Font | DM Sans (body) |
| Primary Color | Terracotta #c4704b |
| Dark Color | Espresso #3d3028 |
| Light Color | Cream #faf7f4 |
| Border Radius | 20px (cards), 50px (buttons) |
| Shadows | Soft & diffused |
| Animation | 250ms smooth |
| Mobile Grid | 2-col, edge-to-edge, 3px gap |
| Desktop Grid | 4-col, 20px gap |
| Product Cards | Gradient overlay |
| Header | Sticky on scroll up |
| Mobile Menu | Slide-in drawer |
| Gallery | Swipeable horizontal |
| Trust Icons | Duotone style |
| Promo Badges | Pill shape |

---

## Files Reference

This spec should be used alongside:
- `giant-hoodies-pricing-strategy.md` — Pricing, offers, upsell logic
- `giant-hoodies-rebuild-spec.md` — Technical implementation details

Together these three documents provide complete guidance for the site rebuild.
