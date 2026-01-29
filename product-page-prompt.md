# Task: Build Product Page for Giant Hoodies

Build a high-converting product page template using Hollow Socks PDP as the CRO reference, styled with Giant Hoodies brand specs, and using copy from the copy-spec.

**CRO Reference:** https://hollowsocks.com/products/boot-performance-alpaca-socks

---

## Implementation Status (Updated 2026-01-28)

### Completed Components

| Component | Status | Notes |
|-----------|--------|-------|
| Image Gallery | Done | Hero + thumbnail row (no mobile swipe yet, static thumbnails) |
| Product Title | Done | Fraunces heading, responsive sizing |
| Price Display | Done | Current price, struck-through compare-at, terracotta "Save $XX" pill badge |
| Value Prop Bullets | Done | 3 checkmark benefits below price |
| Color Swatches | Done | 42px circles, 62 colors mapped via settings textarea + hardcoded fallback |
| Volume Pricing Tiers | Done | Horizontal flexbox layout (Hollow Socks style), ribbon badges, total price + compare-at + "Save $XX" |
| Add to Cart Button | Done | Pill-shaped espresso button with dynamic price |
| Stats Bar | Done | Star reviews, happy customers, 30-day guarantee icons |
| Accordions | Done | 5 sections: What's a Giant Hoodie?, How Do They Fit?, Fabric & Care, Shipping, 30-Day Guarantee |
| Trust Bar | Done | Free shipping, guarantee, made in USA |
| Mobile Sticky ATC | Done | Shows on scroll, hides when main ATC visible |
| Social Proof Section | Done | "As Seen On" press mentions (separate section) |
| Testimonials Section | Done | 4 customer quotes in 2-col grid (separate section) |
| Product Recommendations | Done | "You Might Also Love" carousel (separate section) |
| Back-in-Stock Form | Done | Email notification for sold-out variants |
| Global Header Shadow | Done | Moved to base.css, applies sitewide |

### Key Deviations from Original Spec

1. **Quantity selector** -- Changed from interactive "pack" buttons (1/2/3+) to static informational "Buy More, Save More" volume pricing tiers. Quantity is always 1; discounts apply automatically via Shopify's cart-level automatic discounts.
2. **Volume pricing layout** -- Horizontal flexbox rows (left: qty label + % off pill + per-each price, right: total price + struck compare-at + Save $XX) with ribbon badges ("Most Popular", "Best Value") at top-right of tier 2 and 3.
3. **Volume heading** -- Uses decorative side lines on desktop (flexbox ::before/::after), clean centered text on mobile. Text: "Buy More, Save More! Mix & Match Any Designs and Colors!"
4. **Swatch sizing** -- Increased from 36px to 42px for easier tapping. Gap increased to 10px. 7 swatches fit per row on 390px mobile.
5. **Gallery** -- Hero image + horizontal thumbnail row below (always visible). No mobile swipe/dots yet.
6. **Compare-at fallback** -- If compare_at_price is blank/nil/0, falls back to price + $20 as temporary placeholder.
7. **Savings math** -- Always calculated from compare-at price. Tier 2: (compare_at x 2) - (tier_2_price x 2). Tier 3: (compare_at x 3) - (tier_3_price x 3). Tier 3 displays "Save $XX or more!"
8. **CSS overflow** -- Uses overflow-x: clip (not hidden) on .content-for-layout to prevent viewport expansion without breaking sticky positioning on other pages.
9. **Bottom note** -- "Deal applies sitewide to any hoodies you add to cart!" centered below tiers.

### Files Modified/Created

| File | Purpose |
|------|---------|
| `sections/product-main.liquid` | Main product section (~1212 lines: HTML, CSS, schema) |
| `assets/product-page.js` | Client-side JS: gallery, swatches, price, ATC (~490 lines) |
| `snippets/product-gallery.liquid` | Hero image + thumbnail row with placeholder SVGs |
| `snippets/product-swatches.liquid` | Circular swatch buttons with light-swatch detection |
| `snippets/swatch-color.liquid` | Color lookup: settings textarea then hardcoded fallback |
| `templates/product.json` | Template: product-main, social-proof, testimonials, recommendations |
| `sections/product-social-proof.liquid` | "As Seen On" press mentions section |
| `sections/product-testimonials.liquid` | Customer quotes in 2-col grid |
| `assets/base.css` | Added global header drop shadow |

### Known Issues / Future Work

- Mobile gallery swipe + pagination dots not implemented (using thumbnails for now)
- Reviews app integration placeholder (no app installed yet)
- Product templates for other types (kids-hoodie, shirt, blanket) not yet created
- Zoom on hover not implemented
- "Only one accordion open at a time" behavior not implemented (all can be open)

### Bugs Fixed During Build

1. formatMoney() -- Shopify money_format had spaces that broke regex; fixed with normalization
2. Swatch colors all gray -- assign found_color was stripping # chars; fixed parsing
3. Volume pricing math -- Was using (current - tier), corrected to (compare_at x qty) - (tier x qty)
4. Mobile viewport overflow (3 iterations) -- Root cause: .content-for-layout needed overflow constraint
5. Sticky pricing banner on collection page broken -- overflow-x: hidden changed to overflow-x: clip
6. Git push rejected -- Shopify theme editor changes needed git pull --rebase

---

## Above-the-Fold Structure

Copy Hollow's information hierarchy — this order is intentional for conversion:

```
┌─────────────────────────────────────────────────────────────┐
│ [IMAGE GALLERY]              │  PRODUCT TITLE               │
│                              │  ★★★★★ (reviews)             │
│  ┌─────┐ ┌─────┐ ┌─────┐    │                              │
│  │thumb│ │thumb│ │thumb│    │  $55  $75  SAVE $20          │
│  └─────┘ └─────┘ └─────┘    │                              │
│                              │  • Intentionally oversized   │
│  [Main image with            │  • Super-soft sponge fleece  │
│   swipe/dots on mobile]      │  • Printed by hand in USA    │
│                              │                              │
│                              │  COLOR                       │
│                              │  ○ ○ ○ ○ ○ +15              │
│                              │                              │
│                              │  QUANTITY          PRICE     │
│                              │  [1] [2] [3+]      $55 each  │
│                              │                              │
│                              │  [ ADD TO CART - $55 ]       │
│                              │                              │
│                              │  ✓ Free shipping $75+        │
│                              │  ✓ 30-Day Guarantee          │
│                              │  ✓ Made in USA               │
└─────────────────────────────────────────────────────────────┘
```

---

## Component 1: Image Gallery

### Mobile Layout
- Full-width swipeable gallery
- Pagination dots at bottom (inside image)
- Aspect ratio: 1:1 or 4:5

### Desktop Layout
- Thumbnails on left (vertical stack) OR below main image
- Main image on right (larger)
- Click thumbnail to change main image
- Optional: zoom on hover

### Styling
```css
.product-gallery {
  position: relative;
}

.product-gallery__main {
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-lg, 16px);
  overflow: hidden;
}

.product-gallery__main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-gallery__thumbs {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  overflow-x: auto;
}

.product-gallery__thumb {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-sm, 8px);
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  flex-shrink: 0;
}

.product-gallery__thumb--active {
  border-color: var(--color-espresso, #3d3028);
}

/* Mobile: dots instead of thumbs */
@media (max-width: 767px) {
  .product-gallery__thumbs {
    display: none;
  }
  
  .product-gallery__dots {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
  }
  
  .product-gallery__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: none;
  }
  
  .product-gallery__dot--active {
    background: white;
  }
}

@media (min-width: 768px) {
  .product-gallery__dots {
    display: none;
  }
}
```

---

## Component 2: Product Info

### 2a. Title
```css
.product__title {
  font-family: var(--font-heading, 'Fraunces', serif);
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-espresso, #3d3028);
  margin: 0 0 8px 0;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .product__title {
    font-size: 2.25rem;
  }
}
```

### 2b. Reviews (placeholder for Shopify reviews app)
```liquid
<div class="product__reviews">
  {%- comment -%} Replace with your reviews app snippet {%- endcomment -%}
  <div class="product__reviews-placeholder" data-reviews-badge></div>
</div>
```

```css
.product__reviews {
  margin-bottom: 16px;
}
```

### 2c. Price Display

**CRITICAL:** Savings always calculated from compare-at price.

```liquid
<div class="product__price-row">
  <span class="product__price">{{ product.price | money }}</span>
  
  {%- if product.compare_at_price > product.price -%}
    <span class="product__compare-price">{{ product.compare_at_price | money }}</span>
    
    {%- assign savings = product.compare_at_price | minus: product.price -%}
    <span class="product__savings-badge">Save {{ savings | money }}</span>
  {%- endif -%}
</div>
```

```css
.product__price-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.product__price {
  font-family: var(--font-body);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-espresso, #3d3028);
}

.product__compare-price {
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--color-warm-gray, #5a4a3d);
  text-decoration: line-through;
}

.product__savings-badge {
  display: inline-block;
  background: var(--color-terracotta, #c4704b);
  color: white;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 9999px;
}
```

### 2d. Value Prop Bullets (KEY CRO ELEMENT)

These go right below price, above variant selectors. Hollow does this — it works.

```liquid
<ul class="product__benefits">
  <li>Intentionally oversized — it's a wearable blanket</li>
  <li>Super-soft sponge fleece</li>
  <li>Printed by hand in the USA</li>
</ul>
```

```css
.product__benefits {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

.product__benefits li {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-warm-gray, #5a4a3d);
  padding-left: 20px;
  position: relative;
  margin-bottom: 6px;
  line-height: 1.4;
}

.product__benefits li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--color-terracotta, #c4704b);
  font-weight: 600;
}
```

---

## Component 3: Variant Selectors

### 3a. Color Swatches

```liquid
{%- assign color_option = product.options_by_name['Color'] -%}
{%- if color_option -%}
  <div class="product__option">
    <label class="product__option-label">
      Color: <span class="product__option-value" data-selected-color>{{ product.selected_or_first_available_variant.option1 }}</span>
    </label>
    
    <div class="product__swatches">
      {%- for value in color_option.values -%}
        {%- assign variant_for_color = product.variants | where: "option1", value | first -%}
        <button 
          type="button"
          class="product__swatch{% if product.selected_or_first_available_variant.option1 == value %} product__swatch--active{% endif %}{% unless variant_for_color.available %} product__swatch--unavailable{% endunless %}"
          data-color="{{ value }}"
          data-variant-id="{{ variant_for_color.id }}"
          title="{{ value }}"
          aria-label="Select {{ value }}"
          style="background-color: {% render 'swatch-color', swatch_name: value | handleize %};"
        >
          <span class="visually-hidden">{{ value }}</span>
        </button>
      {%- endfor -%}
    </div>
  </div>
{%- endif -%}
```

```css
.product__option {
  margin-bottom: 20px;
}

.product__option-label {
  display: block;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-espresso, #3d3028);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 10px;
}

.product__option-value {
  font-weight: 400;
  text-transform: none;
}

.product__swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.product__swatch {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border-color 150ms ease, transform 150ms ease;
  position: relative;
}

.product__swatch:hover {
  transform: scale(1.1);
}

.product__swatch--active {
  border-color: var(--color-espresso, #3d3028);
}

.product__swatch--unavailable {
  opacity: 0.4;
}

.product__swatch--unavailable::after {
  content: "";
  position: absolute;
  top: 50%;
  left: -2px;
  right: -2px;
  height: 2px;
  background: var(--color-espresso, #3d3028);
  transform: rotate(-45deg);
}

/* Light swatch border */
.product__swatch--light {
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15);
}
```

---

## Component 4: Quantity Selector with Volume Pricing (KEY CRO ELEMENT)

This is inspired by Hollow's "Pack" selector. Shows the deal clearly.

```liquid
<div class="product__quantity-selector">
  <label class="product__option-label">Quantity</label>
  
  <div class="product__quantity-options">
    {%- comment -%} 1 Hoodie {%- endcomment -%}
    <button 
      type="button" 
      class="product__qty-btn product__qty-btn--active" 
      data-quantity="1"
    >
      <span class="product__qty-number">1</span>
      <span class="product__qty-price">$55</span>
      <span class="product__qty-note">Save $20</span>
    </button>
    
    {%- comment -%} 2 Hoodies {%- endcomment -%}
    <button 
      type="button" 
      class="product__qty-btn" 
      data-quantity="2"
    >
      <span class="product__qty-number">2</span>
      <span class="product__qty-price">$45 each</span>
      <span class="product__qty-note">Save $60 total</span>
      <span class="product__qty-badge">Most Popular</span>
    </button>
    
    {%- comment -%} 3+ Hoodies {%- endcomment -%}
    <button 
      type="button" 
      class="product__qty-btn" 
      data-quantity="3"
    >
      <span class="product__qty-number">3+</span>
      <span class="product__qty-price">$39 each</span>
      <span class="product__qty-note">Best Value</span>
    </button>
  </div>
  
  {%- comment -%} Hidden actual quantity input {%- endcomment -%}
  <input type="hidden" name="quantity" value="1" data-quantity-input>
</div>
```

```css
.product__quantity-selector {
  margin-bottom: 24px;
}

.product__quantity-options {
  display: flex;
  gap: 10px;
}

.product__qty-btn {
  flex: 1;
  padding: 14px 12px;
  border: 2px solid var(--color-sand, #e8d5c4);
  border-radius: var(--radius-md, 12px);
  background: white;
  cursor: pointer;
  text-align: center;
  transition: border-color 150ms ease, background-color 150ms ease;
  position: relative;
}

.product__qty-btn:hover {
  border-color: var(--color-espresso, #3d3028);
}

.product__qty-btn--active {
  border-color: var(--color-espresso, #3d3028);
  background: var(--color-cream, #faf7f4);
}

.product__qty-number {
  display: block;
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-espresso, #3d3028);
}

.product__qty-price {
  display: block;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-espresso, #3d3028);
  margin-top: 4px;
}

.product__qty-note {
  display: block;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-terracotta, #c4704b);
  font-weight: 600;
  margin-top: 2px;
}

.product__qty-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-terracotta, #c4704b);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 9999px;
  white-space: nowrap;
}
```

**JavaScript needed:** When quantity buttons are clicked:
1. Update hidden quantity input
2. Update active state
3. Optionally update displayed price in ATC button

---

## Component 5: Add to Cart Button

```liquid
<button 
  type="submit" 
  class="product__add-to-cart btn-primary"
  {% unless product.available %}disabled{% endunless %}
>
  {%- if product.available -%}
    Add to Cart — <span data-cart-price>{{ product.price | money }}</span>
  {%- else -%}
    Sold Out
  {%- endif -%}
</button>
```

```css
.product__add-to-cart {
  width: 100%;
  padding: 18px 32px;
  font-size: 1.1rem;
  margin-bottom: 16px;
}

/* Use Primary Dark button style from visual spec */
.btn-primary {
  background: var(--color-espresso, #3d3028);
  color: var(--color-cream, #faf7f4);
  border: none;
  border-radius: var(--radius-full, 9999px);
  font-family: var(--font-body);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 150ms ease, transform 150ms ease;
}

.btn-primary:hover {
  background: #5a4a3d;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  background: var(--color-sand, #e8d5c4);
  color: var(--color-warm-gray, #5a4a3d);
  cursor: not-allowed;
  transform: none;
}
```

---

## Component 6: Trust Badges (KEY CRO ELEMENT)

Immediately below Add to Cart button. Hollow does this.

```liquid
<div class="product__trust-bar">
  <div class="product__trust-item">
    <span class="product__trust-icon">✓</span>
    <span>Free shipping ${{ settings.free_shipping_threshold }}+</span>
  </div>
  <div class="product__trust-item">
    <span class="product__trust-icon">↩</span>
    <span>30-Day Guarantee</span>
  </div>
  <div class="product__trust-item">
    <span class="product__trust-icon">🇺🇸</span>
    <span>Made in USA</span>
  </div>
</div>
```

```css
.product__trust-bar {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 16px 0;
  border-top: 1px solid var(--color-sand, #e8d5c4);
  border-bottom: 1px solid var(--color-sand, #e8d5c4);
  margin-bottom: 24px;
}

.product__trust-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-warm-gray, #5a4a3d);
}

.product__trust-icon {
  font-size: 1rem;
}
```

---

## Component 7: Product Description Accordions

Hollow uses accordions for details. Copy this pattern.

```liquid
<div class="product__accordions">
  
  {%- comment -%} What's a Giant Hoodie? {%- endcomment -%}
  <details class="product__accordion" open>
    <summary class="product__accordion-header">
      <span>What's a Giant Hoodie?</span>
      <span class="product__accordion-icon">+</span>
    </summary>
    <div class="product__accordion-content">
      <p>Imagine slipping into your new favorite hoodie after a long day. Wrap yourself in a cozy hug, sink into the plush fabric, and forget about the stresses of today.</p>
      <p>Giant Hoodies are intentionally oversized — similar to a 3XL — but designed as a wearable blanket, not fitted clothing. One size fits most, and that's the whole point.</p>
    </div>
  </details>
  
  {%- comment -%} Sizing & Fit {%- endcomment -%}
  <details class="product__accordion">
    <summary class="product__accordion-header">
      <span>How Do They Fit?</span>
      <span class="product__accordion-icon">+</span>
    </summary>
    <div class="product__accordion-content">
      <p><strong>One size fits most — and that's the whole point.</strong></p>
      <p>Our hoodies are intentionally oversized, similar to a 3XL, designed to wrap you in cozy comfort like a wearable blanket. Whether you're petite or plus-size, you'll be covered.</p>
      <p>Will it fit me? If you want to feel wrapped in a cozy blanket, yes.</p>
    </div>
  </details>
  
  {%- comment -%} Fabric & Care {%- endcomment -%}
  <details class="product__accordion">
    <summary class="product__accordion-header">
      <span>Fabric & Care</span>
      <span class="product__accordion-icon">+</span>
    </summary>
    <div class="product__accordion-content">
      <p><strong>The fabric:</strong> Super soft, lightweight sponge fleece — the kind you want to live in. It's plush, cozy, and feels like a hug.</p>
      <p><strong>Care instructions:</strong></p>
      <ul>
        <li>Tie little knots in the string ends (so they don't pull out)</li>
        <li>Wash alone or with soft clothes only</li>
        <li>Cold water, gentle/delicate cycle</li>
        <li>ALWAYS air dry — no dryer!</li>
      </ul>
    </div>
  </details>
  
  {%- comment -%} Shipping {%- endcomment -%}
  <details class="product__accordion">
    <summary class="product__accordion-header">
      <span>Shipping</span>
      <span class="product__accordion-icon">+</span>
    </summary>
    <div class="product__accordion-content">
      <p>Really, really fast. Most orders ship same or next business day and arrive in 2-3 days within the US.</p>
      <p>All orders are printed and packed by hand at our facility in Northwest Arkansas.</p>
      <p><strong>Free shipping on all US orders over ${{ settings.free_shipping_threshold }}!</strong></p>
    </div>
  </details>
  
  {%- comment -%} Returns & Guarantee {%- endcomment -%}
  <details class="product__accordion">
    <summary class="product__accordion-header">
      <span>30-Day Guarantee</span>
      <span class="product__accordion-icon">+</span>
    </summary>
    <div class="product__accordion-content">
      <p>We're confident you'll love your Giant Hoodie, but we've got you covered if something isn't right.</p>
      <p>Our 30-day "Best Hoodie Ever" Guarantee means if you're not happy, just reach out and we'll make it right.</p>
      <p><em>Fun fact: less than 1% of orders are returned — the average apparel brand sees 21%!</em></p>
    </div>
  </details>
  
</div>
```

```css
.product__accordions {
  margin-top: 24px;
}

.product__accordion {
  border-bottom: 1px solid var(--color-sand, #e8d5c4);
}

.product__accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-espresso, #3d3028);
  list-style: none;
}

.product__accordion-header::-webkit-details-marker {
  display: none;
}

.product__accordion-icon {
  font-size: 1.25rem;
  font-weight: 400;
  transition: transform 200ms ease;
}

.product__accordion[open] .product__accordion-icon {
  transform: rotate(45deg);
}

.product__accordion-content {
  padding: 0 0 20px 0;
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-warm-gray, #5a4a3d);
}

.product__accordion-content p {
  margin: 0 0 12px 0;
}

.product__accordion-content ul {
  margin: 12px 0;
  padding-left: 20px;
}

.product__accordion-content li {
  margin-bottom: 6px;
}
```

---

## Component 8: Mobile Sticky Add to Cart

Appears when main ATC button scrolls out of view.

```liquid
<div class="product__sticky-atc" data-sticky-atc>
  <div class="product__sticky-info">
    <span class="product__sticky-price">{{ product.price | money }}</span>
    {%- if product.compare_at_price > product.price -%}
      <span class="product__sticky-savings">Save {{ product.compare_at_price | minus: product.price | money }}</span>
    {%- endif -%}
  </div>
  <button type="button" class="product__sticky-btn btn-primary" data-sticky-atc-btn>
    Add to Cart
  </button>
</div>
```

```css
.product__sticky-atc {
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
  transition: transform 300ms ease;
}

.product__sticky-atc--visible {
  transform: translateY(0);
}

.product__sticky-info {
  display: flex;
  flex-direction: column;
}

.product__sticky-price {
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-espresso, #3d3028);
}

.product__sticky-savings {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-terracotta, #c4704b);
}

.product__sticky-btn {
  flex: 1;
  max-width: 200px;
  padding: 14px 24px;
}

/* Hide on desktop */
@media (min-width: 768px) {
  .product__sticky-atc {
    display: none;
  }
}
```

**JavaScript needed:**
```javascript
// Show/hide sticky ATC based on main ATC visibility
const mainATC = document.querySelector('.product__add-to-cart');
const stickyATC = document.querySelector('[data-sticky-atc]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      stickyATC.classList.remove('product__sticky-atc--visible');
    } else {
      stickyATC.classList.add('product__sticky-atc--visible');
    }
  });
}, { threshold: 0 });

observer.observe(mainATC);
```

---

## Component 9: Social Proof Section (Below Fold)

From copy-spec: "As Seen On" press mentions.

```liquid
<section class="product__social-proof">
  <p class="product__social-proof-label">As Seen On</p>
  <div class="product__press-logos">
    <span>Oprah's Favorite Things</span>
    <span>Good Morning America</span>
    <span>Forbes</span>
    <span>Cosmopolitan</span>
    <span>Kelly & Mark</span>
    <span>The View</span>
  </div>
</section>
```

```css
.product__social-proof {
  text-align: center;
  padding: 40px 20px;
  background: var(--color-cream, #faf7f4);
  margin-top: 40px;
}

.product__social-proof-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-warm-gray, #5a4a3d);
  margin: 0 0 20px 0;
}

.product__press-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px 32px;
}

.product__press-logos span {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-espresso, #3d3028);
}
```

**Note:** Replace text with actual logos when available.

---

## Component 10: Customer Testimonials (Below Fold)

From copy-spec customer quotes.

```liquid
<section class="product__testimonials">
  <h2 class="product__testimonials-title">What Customers Say</h2>
  
  <div class="product__testimonials-grid">
    <blockquote class="product__testimonial">
      <p>"It's like wearing a hug."</p>
      <cite>— Grace</cite>
    </blockquote>
    
    <blockquote class="product__testimonial">
      <p>"I wear mine EVERYWHERE — the gym, the gas station, the laundromat, on a plane, and I get so many compliments!"</p>
      <cite>— Andrea</cite>
    </blockquote>
    
    <blockquote class="product__testimonial">
      <p>"This is my third Giant Hoodie and I couldn't be more in love."</p>
      <cite>— Grace</cite>
    </blockquote>
    
    <blockquote class="product__testimonial">
      <p>"It's so big and comfy, I LIVE in it!"</p>
      <cite>— Customer</cite>
    </blockquote>
  </div>
</section>
```

```css
.product__testimonials {
  padding: 48px 20px;
}

.product__testimonials-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-espresso, #3d3028);
  text-align: center;
  margin: 0 0 32px 0;
}

.product__testimonials-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .product__testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.product__testimonial {
  background: var(--color-cream, #faf7f4);
  padding: 24px;
  border-radius: var(--radius-lg, 16px);
  margin: 0;
}

.product__testimonial p {
  font-family: var(--font-body);
  font-size: 1rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--color-espresso, #3d3028);
  margin: 0 0 12px 0;
}

.product__testimonial cite {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-style: normal;
  font-weight: 600;
  color: var(--color-warm-gray, #5a4a3d);
}
```

---

## Component 11: Product Recommendations (Below Fold)

```liquid
<section class="product__recommendations">
  <h2 class="product__recommendations-title">You Might Also Love</h2>
  
  {%- comment -%} Use Shopify's product recommendations API {%- endcomment -%}
  <div class="product__recommendations-grid" data-product-recommendations data-url="{{ routes.product_recommendations_url }}?product_id={{ product.id }}&limit=4">
    {%- comment -%} Populated via JavaScript or Shopify's recommendations {%- endcomment -%}
  </div>
</section>
```

Use the same product card component from the collection page.

---

## Full Page Layout (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│ [HEADER + ANNOUNCEMENT BAR]                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────────────┐    ┌──────────────────────────────┐ │
│   │                  │    │ Product Title                 │ │
│   │   IMAGE GALLERY  │    │ ★★★★★ (123 reviews)          │ │
│   │                  │    │                               │ │
│   │  [thumbs below]  │    │ $55  $75  SAVE $20           │ │
│   │                  │    │                               │ │
│   └──────────────────┘    │ ✓ Intentionally oversized    │ │
│                           │ ✓ Super-soft sponge fleece   │ │
│                           │ ✓ Printed by hand in USA     │ │
│                           │                               │ │
│                           │ COLOR: Purple                 │ │
│                           │ ○ ○ ○ ○ ○ ○ ○                │ │
│                           │                               │ │
│                           │ QUANTITY                      │ │
│                           │ [1 $55] [2 $45ea] [3+ $39ea] │ │
│                           │                               │ │
│                           │ [ ADD TO CART — $55 ]         │ │
│                           │                               │ │
│                           │ ✓ Free $75+ │ ↩ 30-Day │ 🇺🇸  │ │
│                           │                               │ │
│                           │ [ACCORDIONS]                  │ │
│                           │  > What's a Giant Hoodie?     │ │
│                           │  > How Do They Fit?           │ │
│                           │  > Fabric & Care              │ │
│                           │  > Shipping                   │ │
│                           │  > 30-Day Guarantee           │ │
│                           └──────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ [AS SEEN ON: Oprah's Favorite Things • GMA • Forbes...]    │
├─────────────────────────────────────────────────────────────┤
│ [CUSTOMER TESTIMONIALS]                                     │
├─────────────────────────────────────────────────────────────┤
│ [YOU MIGHT ALSO LOVE - 4 product cards]                    │
├─────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Files to Create

| File | Purpose |
|------|---------|
| `sections/product-main.liquid` | Main product section (gallery + info) |
| `sections/product-social-proof.liquid` | As Seen On section |
| `sections/product-testimonials.liquid` | Customer quotes |
| `sections/product-recommendations.liquid` | Related products |
| `snippets/product-gallery.liquid` | Image gallery component |
| `snippets/product-swatches.liquid` | Color swatch selector |
| `snippets/product-quantity-selector.liquid` | Volume pricing selector |
| `snippets/swatch-color.liquid` | Color name to hex mapping |
| `templates/product.hoodie.json` | Template for hoodies |
| `assets/product-page.js` | Gallery, swatch, quantity, sticky ATC logic |
| `assets/product-page.css` | All product page styles (or inline in section) |

---

## JavaScript Requirements

1. **Image Gallery:**
   - Click thumbnail → change main image
   - Mobile swipe support
   - Update pagination dots

2. **Color Swatches:**
   - Click swatch → update selected state
   - Update "Color: [name]" text
   - Update variant ID in form
   - Update price if variant has different price

3. **Quantity Selector:**
   - Click quantity button → update active state
   - Update hidden quantity input
   - Update ATC button price display (optional)

4. **Sticky ATC:**
   - IntersectionObserver on main ATC
   - Show/hide sticky bar based on visibility
   - Click triggers form submission

5. **Accordions:**
   - Native `<details>` handles open/close
   - Optional: only one open at a time

---

## Test Checklist

### Above Fold
- [ ] Gallery displays all product images
- [ ] Thumbnails work on desktop
- [ ] Swipe works on mobile
- [ ] Price displays correctly with savings from compare-at
- [ ] Value prop bullets display
- [ ] Color swatches display and are clickable
- [ ] Quantity selector shows volume pricing tiers
- [ ] ATC button works and opens cart drawer
- [ ] Trust badges display below ATC

### Accordions
- [ ] All 5 accordion sections present
- [ ] Open/close animation works
- [ ] First accordion open by default

### Below Fold
- [ ] Social proof section displays
- [ ] Testimonials display
- [ ] Product recommendations load

### Mobile
- [ ] Sticky ATC appears on scroll
- [ ] Sticky ATC button works
- [ ] Gallery dots work
- [ ] Everything readable and tappable

### Pricing Logic
- [ ] Savings calculated from compare-at (NEVER hardcoded)
- [ ] Volume pricing displays correctly
- [ ] Prices update when variant changes

---

## Do NOT

- Hardcode any prices — always use Liquid variables
- Add countdown timers or fake urgency
- Add "X people viewing" or "Y sold today" — no fake scarcity
- Skip the trust badges — they're critical for conversion
- Make up new copy — use copy-spec.md
- Use colors outside the brand palette
- Add Quick View — not in scope
- Skip mobile sticky ATC — it's critical for mobile conversion
