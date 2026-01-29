# Giant Hoodies — Master Briefing for Claude Code

## What You're Building

Build a NEW Shopify store theme for Giant Hoodies (gianthoodies.com) using the Fabric theme as a base. The owner is Matt.

**This is a fresh build. Do NOT reference, copy from, or look at any existing Giant Hoodies themes.**

**Naming convention:**
- VS Code folder: `gh-fabric-horizon`
- GitHub repo: `gh-fabric-horizon`
- Shopify theme: `gh-fabric-horizon`

**Store URL:** giant-hoodies.myshopify.com

---

## Reference Specs

Read these. They contain all the details.

| File | Contains | Status |
|------|----------|--------|
| `giant-hoodies-visual-spec.md` | Colors, typography, components, CSS | ✅ Current |
| `giant-hoodies-copy-spec.md` | Headlines, FAQs, all messaging | ✅ Current |
| `giant-hoodies-pricing-strategy.md` | Volume pricing, cart upsells, admin controls | ✅ Current |
| `MATT-SHOPIFY-ADMIN-SETUP.md` | What Matt does in Shopify Admin (not your job) | ✅ Current |

---

## ❌ DO NOT DO THESE

### Reference Old Themes — NEVER
Do not look at, copy from, or reference any existing Giant Hoodies themes. Start fresh with stock Fabric.

### Old Free Gift System — DEAD
Any references to tote bags, mystery shirts, $115 thresholds, $190 thresholds, `tiered-gifts.js`, or `free-tier-cart.liquid` are from an OLD system that no longer exists. Ignore completely.

### Fake Urgency — NEVER
- ❌ No countdown timers
- ❌ No "X people viewing this"
- ❌ No "Y sold in last 24 hours"
- ✅ Only real low-stock warnings when inventory < threshold

### Invented Copy — NEVER
All headlines and messaging come from `giant-hoodies-copy-spec.md`. Don't make up new copy.

### Invented Design — NEVER
All colors, typography, and components come from `giant-hoodies-visual-spec.md`. Don't deviate.

### Hardcoded Prices — NEVER
Never hardcode dollar amounts. Always use Shopify's Liquid variables for prices and compare-at prices.

---

## The Pricing System: Volume Discounts

| Qty | Price Each | Savings |
|-----|------------|---------|
| 1 hoodie | $55 | Save $20 |
| 2 hoodies | $45 each | Save $60 total |
| 3+ hoodies | $39 each | Save $108+ total |

**Critical: Savings Calculation**

Savings must ALWAYS be calculated from the **compare-at price**, not the current selling price. Shopify's default behavior shows savings from the selling price — override this.

```liquid
{% assign savings = product.compare_at_price | minus: product.price %}
```

For cart totals:
```liquid
{% assign total_savings = 0 %}
{% for item in cart.items %}
  {% if item.variant.compare_at_price %}
    {% assign item_savings = item.variant.compare_at_price | minus: item.final_price | times: item.quantity %}
    {% assign total_savings = total_savings | plus: item_savings %}
  {% endif %}
{% endfor %}
```

**What you build:**
- Display savings from compare-at price (NOT from current price — override Shopify default)
- Cart upsell MESSAGES based on hoodie count
- Shipping progress bar (use `settings.free_shipping_threshold`)
- Quantity selector with dynamic price preview

**What Shopify Admin handles (Matt's job, not yours):**
- Setting compare-at prices on products
- Creating automatic discounts

---

## Build Order — Follow the Funnel

Build in this order. Test after each phase before moving on.

### Phase 1: Sitewide Dependencies

**What to build:**
1. `config/settings_data.json` — Colors, fonts, button styles
2. CSS variables in `theme.liquid` or base CSS
3. Google Fonts loading (Fraunces + DM Sans)
4. Header (logo, nav, announcement bar)
5. Footer (espresso background, links, payment icons)
6. Global button styles (4 types)
7. Configure cart to use drawer (not page)

**Design specs:**
- Colors: Terracotta `#c4704b`, Espresso `#3d3028`, Cream `#faf7f4`, Sand `#e8d5c4`
- Fonts: Fraunces (headings), DM Sans (body)
- Buttons: 50px radius (pill shape)
- Header: Sticky on scroll UP, hides on scroll DOWN
- Footer: Espresso background, cream text

**Announcement bar (tiered mode):**
> "Buy 2 hoodies, save $60. Buy 3+, save $108+. Free shipping at ${{ settings.free_shipping_threshold }}!"

**✓ Test checkpoint:**
- [ ] Navigate around — everything looks branded (not stock Fabric)
- [ ] Fonts load correctly
- [ ] Colors match spec
- [ ] Header sticks on scroll up, hides on scroll down
- [ ] Footer has espresso background

---

### Phase 2: Homepage (Top to Bottom)

**What to build:**
1. Hero section
2. Social proof bar (press logos)
3. "What's a Giant Hoodie?" value props (4 items)
4. Best Sellers product grid
5. Feature block: Oversized
6. Feature block: Trendy
7. Feature block: Guarantee
8. Comparison table (Giant Hoodies vs Oodie)
9. Social proof / testimonials
10. Newsletter signup ("Join the Hoodie Fam")

**Get copy from:** `giant-hoodies-copy-spec.md`

**Hero headline options:**
- "Your New Favorite Oversized Hoodie"
- "Wrap Yourself in a Cozy Hug"
- "The Comfiest Hoodie You'll Ever Own"

**✓ Test checkpoint:**
- [ ] Homepage renders fully (no 404)
- [ ] All sections appear in correct order
- [ ] Copy matches spec
- [ ] Can click through to collection page

---

### Phase 3: Collection Page

**What to build:**
1. Collection header/banner
2. Product grid with gradient overlay cards
3. Filtering (by color)
4. Sorting

**Product card specs:**
- Gradient overlay style (info ON the image, not below)
- Mobile: 2 columns, edge-to-edge, 3px gap
- Desktop: 4 columns, 20px gap
- Border radius: 16-20px

**✓ Test checkpoint:**
- [ ] /collections/giant-hoodies loads
- [ ] Product cards have gradient overlay
- [ ] Mobile grid is 2-col with 3px gap
- [ ] Can click through to product page

---

### Phase 4: Product Page

**What to build:**
1. Image gallery (swipeable on mobile)
2. Price display with savings from compare-at
3. Trust bar: "✓ Free shipping ${{ settings.free_shipping_threshold }}+ · ✓ 30-Day Guarantee · ✓ Made in USA"
4. Variant selectors (color swatches)
5. Quantity selector with dynamic price preview
6. Add to Cart button (Primary Dark style)
7. Volume pricing callout
8. Mobile sticky Add to Cart (appears on scroll)
9. FAQ accordions (from copy-spec.md)
10. Product recommendations

**Price display logic:**
```liquid
<span class="price">{{ product.price | money }}</span>
{% if product.compare_at_price > product.price %}
  <span class="compare-at">{{ product.compare_at_price | money }}</span>
  <span class="savings">Save {{ product.compare_at_price | minus: product.price | money }}</span>
{% endif %}
```

**FAQ content from copy-spec.md:**
- "How do the hoodies fit?"
- "What's the fabric like?"
- "How do I wash my hoodie?"
- "How fast is shipping?"
- "What if I don't love it?"

**Product templates needed:**
- `product.json` (default)
- `product.hoodie.json`
- `product.kids-hoodie.json`
- `product.shirt.json`
- `product.blanket.json`

**✓ Test checkpoint:**
- [ ] Product page renders (no 404)
- [ ] Price shows current price, struck compare-at, and savings
- [ ] Savings calculated from compare-at (not current price)
- [ ] Trust badges appear
- [ ] FAQ accordions work
- [ ] Add to Cart button is visible

---

### Phase 5: Cart Drawer

**What to build:**
1. Drawer slides from right
2. Opens automatically on Add to Cart (NO redirect to cart page)
3. Upsell message based on hoodie count
4. Shipping progress bar (dynamic threshold from settings)
5. Savings display (from compare-at prices)
6. Checkout button
7. Continue Shopping button (closes drawer)

**Upsell messages by hoodie count:**

| Count | Message |
|-------|---------|
| 0 | "Add a Giant Hoodie to your cart!" |
| 1 | "Add a 2nd hoodie — save $20 more + FREE shipping!" |
| 2 | "Add a 3rd hoodie for just $27 more!" |
| 3+ | "You're getting our best price! 🎉" |

**Hoodie count logic:**
Only count products in "Giant Hoodies" or "Kids Giant Hoodies" collections, excluding products tagged `not-tier-eligible`.

**Shipping progress:**
```liquid
{% assign threshold = settings.free_shipping_threshold | times: 100 %}
{% assign remaining = threshold | minus: cart.total_price %}

{% if remaining > 0 %}
  <p>Add {{ remaining | money }} more for FREE shipping!</p>
{% else %}
  <p>🎉 You've unlocked FREE shipping!</p>
{% endif %}
```

**✓ Test checkpoint:**
- [ ] Add to Cart opens drawer (not redirect)
- [ ] Upsell message shows correctly
- [ ] Shipping progress is accurate
- [ ] Adding 2nd hoodie changes upsell message
- [ ] Can complete checkout

---

## Admin Controls to Build

Add to `config/settings_schema.json`:

```json
{
  "name": "Giant Hoodies Settings",
  "settings": [
    {
      "type": "select",
      "id": "pricing_mode",
      "label": "Pricing Mode",
      "options": [
        { "value": "tiered", "label": "Tiered (volume discounts)" },
        { "value": "flat", "label": "Flat (for sales)" }
      ],
      "default": "tiered"
    },
    {
      "type": "text",
      "id": "announcement_tiered",
      "label": "Announcement Bar (Tiered Mode)",
      "default": "Buy 2 hoodies, save $60. Buy 3+, save $108+. Free shipping at $75!"
    },
    {
      "type": "text",
      "id": "announcement_flat",
      "label": "Announcement Bar (Flat Mode)"
    },
    {
      "type": "text",
      "id": "upsell_0",
      "label": "Cart Upsell: 0 hoodies",
      "default": "Add a Giant Hoodie to your cart!"
    },
    {
      "type": "text",
      "id": "upsell_1",
      "label": "Cart Upsell: 1 hoodie",
      "default": "Add a 2nd hoodie — save $20 more + FREE shipping!"
    },
    {
      "type": "text",
      "id": "upsell_2",
      "label": "Cart Upsell: 2 hoodies",
      "default": "Add a 3rd hoodie for just $27 more!"
    },
    {
      "type": "text",
      "id": "upsell_3plus",
      "label": "Cart Upsell: 3+ hoodies",
      "default": "You're getting our best price! 🎉"
    },
    {
      "type": "number",
      "id": "free_shipping_threshold",
      "label": "Free Shipping Threshold",
      "default": 75
    },
    {
      "type": "number",
      "id": "low_stock_threshold",
      "label": "Low Stock Warning Threshold",
      "default": 10
    }
  ]
}
```

---

## Quick Design Reference

### Colors
| Name | Hex | Use |
|------|-----|-----|
| Terracotta | `#c4704b` | Primary accent, warm CTAs, announcement bar |
| Espresso | `#3d3028` | Text, dark buttons (Add to Cart), footer |
| Cream | `#faf7f4` | Page backgrounds |
| Sand | `#e8d5c4` | Secondary backgrounds, soft buttons |

### Typography
- Headings: Fraunces (serif)
- Body: DM Sans (sans-serif)

### Shapes
- Buttons: 50px radius (pill)
- Cards: 16-20px radius
- Shadows: Soft, warm-tinted `rgba(61, 48, 40, 0.08)`

### Buttons (4 types)
| Type | Style | Use |
|------|-------|-----|
| Primary Dark | Espresso fill, cream text | Add to Cart, Checkout |
| Primary Warm | Terracotta fill, white text | Hero CTA, Browse |
| Secondary Outline | Espresso border, transparent | Continue Shopping |
| Secondary Soft | Sand fill, espresso text | View All, filters |

---

## GitHub Setup

**New repo:** `gh-fabric-horizon`
**Branch:** `main`

1. Start with fresh Fabric theme from Shopify
2. Push to new GitHub repo
3. Connect Shopify to GitHub
4. All changes via GitHub — auto-syncs to Shopify

**Note:** `settings_data.json` may not sync from GitHub. If settings don't appear in Shopify, manually add the file in Shopify's code editor.

---

## When In Doubt

1. Check the spec files — answer is probably there
2. Ask Matt — don't guess on business decisions
3. Don't invent features — implement what's documented
4. Test after each phase — don't build everything then debug
5. Never hardcode prices — always use Liquid variables

---

## Summary

**Fresh start:** New folder, new repo, new theme. Don't look at old code.

**Build order:**
1. Sitewide (settings, header, footer)
2. Homepage (top to bottom)
3. Collection page
4. Product page
5. Cart drawer

**Test after each phase before moving on.**

**Savings always from compare-at price, never hardcoded.**

**All copy from copy-spec.md. All design from visual-spec.md.**

Go build.

---

## Current Progress (Updated 2026-01-29)

### Phase 1: Sitewide Dependencies -- MOSTLY DONE
- [x] CSS variables (colors, fonts) defined in theme-styles-variables, gh-collection-styles, base.css
- [x] Google Fonts (Fraunces + DM Sans) loaded via theme settings
- [x] Header drop shadow added globally (base.css)
- [x] Header sticky (using Fabric default sticky-always)
- [x] Footer customization (espresso bg, cream text, Fraunces headings, payment icons, divider)
- [x] Global button styles (4 types in base.css: primary-dark, primary-warm, secondary-outline, secondary-soft)
- [ ] Cart drawer customization (using Fabric default)

### Phase 2: Homepage -- DONE
- [x] Hero section (Fabric default, customized with GH copy/styling, image via Shopify admin)
- [x] Stats bar (custom section: 225,000+ customers, 4.9★, 30-day guarantee)
- [x] Press logos bar (custom section: Oprah, GMA, Forbes, Cosmopolitan, Kelly & Mark, The View)
  - Desktop: static centered row (no scrolling), `gap: 40px`, duplicates hidden
  - Mobile: infinite seamless marquee (CSS animation, `margin-right` instead of `gap` for perfect `-50%` loop), edge-to-edge via negative margins
- [x] Best Sellers product grid (Fabric product-list, 8 products configured)
- [x] Category tiles (custom section: 6 tiles — Hoodies, Kids, Blankets, Shirts, Best Sellers, New)
- [x] Shop Kids product grid (Fabric product-list, 4 products configured)
- [x] Value props (custom section: 4 cards — 8oz Sponge Fleece, Hand-Printed USA, 200+ Designs, Wearable Blanket)
- [x] Feature block: Oversized (custom section: 6-photo grid "One Size. Every Body." — images configured)
- [x] Feature block: Trendy (custom section: 5-photo lifestyle collage "Your Hoodie for Everything" — images configured)
- [x] Feature block: Guarantee (custom section: <1% return rate, 3-step process, 30-day badge)
- [x] Comparison table (custom section: Giant Hoodies vs Oodie, 7 rows + price)
- [x] Testimonials (custom section: 4 quotes on dark background "What the Hoodie Fam Says")
- [x] Newsletter signup (custom section: "Join the Hoodie Fam" with 10% discount incentive)
- [x] Reviews section (JudgeMe stats + 6 customer review cards)

### Phase 3: Collection Page -- DONE
- [x] Collection header with hero banner, filter buttons, description
- [x] Product grid: 4-col desktop, 2-col mobile, info below image
- [x] Volume pricing banner (green, sticky below header, uses `settings.free_shipping_threshold`)
- [x] Color swatches on product cards (20px desktop, 14px mobile, max 10/5 with "+N more")
- [x] Pagination dots inside card gallery (hidden in side-scroller sections, shown in grids)
- [x] Filtering and sorting

### Phase 4: Product Page -- DONE
- [x] Image gallery (hero + thumbnails)
- [x] Price display with savings from compare-at (uses Shopify compare_at_price)
- [x] Color swatches (42px, 62 colors mapped)
- [x] Volume pricing tiers (Hollow Socks-inspired layout)
- [x] Add to Cart button with dynamic price
- [x] Stats bar (reviews, customers, guarantee)
- [x] Trust bar
- [x] FAQ accordions (5 sections)
- [x] Mobile sticky ATC
- [x] Social proof section
- [x] Testimonials section
- [x] Product recommendations
- [x] Back-in-stock email form
- [x] Mobile gallery swipe/dots
- [x] Desktop gallery redesign: 2×2 grid with lightbox (replaces single tall hero)
- [x] Desktop layout: selling-points, trust-bar, press-logos moved under gallery (left column)
- [x] Desktop layout: accordions full-width below both columns
- [ ] Additional product templates (kids-hoodie, shirt, blanket) — deferred to post-build

### Phase 5: Cart (Drawer + Page) -- IN PROGRESS
- [x] Drawer slides from right (Fabric default)
- [x] Opens on Add to Cart (Fabric default)
- [x] Upsell messages by hoodie count (gh-cart-extras.liquid)
- [x] Shipping progress bar (gh-cart-extras.liquid, US-only)
- [x] Per-item SAVE pill (terracotta, matches product card style) — `cart-products.liquid`
- [x] Total SAVE pill on TOTAL row (crossed-out compare-at + actual total + pill) — `cart-summary.liquid`
- [x] Country-aware shipping: US flat rate / US free / International "Calculated at Checkout" — `cart-summary.liquid`
- [x] Checkout "or" divider between SECURE CHECKOUT and accelerated payment buttons — `cart-summary.liquid`
- [ ] Hide PayPal/Google Pay, make Apple Pay first — **Must be done in Shopify Admin > Settings > Payments** (closed shadow DOM prevents CSS targeting)
- [ ] Final visual QA and polish

### Bugs Fixed (2026-01-29)
- Fixed press logos scrolling on desktop (should be static) and resetting on mobile (should be infinite seamless marquee)
- Fixed mobile press logos not reaching screen edges (negative margin breakout from parent padding)
- Fixed pagination dots showing in side-scroller product card sections (should only show in grids)
- Fixed orphaned Judge.me medals section in `templates/index.json` causing Shopify import validation error
- Fixed volume pricing banner hardcoded "$75" — now uses `settings.free_shipping_threshold`

### Changes Made (2026-01-29, session 2)

**Product card styling unification:**
- Extracted shared product card styles from `gh-collection-styles.liquid` into `gh-product-card-styles.liquid`
- Added dual selectors (`.product-grid` + `.resource-list`) so cards render consistently everywhere
- Added `{% render 'gh-product-card-styles' %}` to `product-list.liquid` and `product-recommendations.liquid`

**Press logos consolidation:**
- Replaced PDP "As Seen On" text section with shared `press-logos-bar.liquid` snippet (same as homepage)
- Moved press logos to inline in `product-main.liquid` (under trust bar) — Shopify can't render sections inside sections
- Centralized logo images in `config/settings_schema.json` (theme-level settings, editable once for all instances)
- `sections/press-logos.liquid` is a thin wrapper that renders the snippet

**JudgeMe medals fix:**
- Added CSS overrides in `reviews.liquid` to force `flex-wrap: wrap` and `overflow: visible` on all breakpoints
- Mobile: full viewport width with negative margin breakout

**Desktop product gallery redesign:**
- Replaced single tall hero (aspect-ratio 1/1.25) with 2×2 grid of 1:1 images
- Position 1 = variant image (locked, only swatch changes update it)
- Positions 2–4 = first 3 static gallery images from section settings
- Thumbnails below = remaining images (slots 4–6 on desktop, all on mobile)
- Click any image opens lightbox overlay (no hero swapping)
- Mobile layout unchanged (single hero + all thumbnails)
- Files: `snippets/product-gallery.liquid`, `assets/product-page.js`, `sections/product-main.liquid`

**Desktop layout restructure:**
- Selling-points strip, trust bar, and press logos moved from right info column to under the gallery in the left column (new `product-main__below-gallery` wrapper)
- Info column spans both grid rows (`grid-row: 1 / 3`) to keep sticky behavior
- Accordions moved outside the 2-column grid, render full width with page-width centering
- Mobile stacking order unchanged: gallery → info → social proof → accordions

---

### TODOs — Before Launch
- [ ] **Remove +$20 compare-at price fallback** — Search for `TEMP_COMPARE_AT_FALLBACK` in `cart-products.liquid` and `cart-summary.liquid`. Also in `product-page.js` (`updatePriceDisplay` function, line ~197). This adds a fake $20 savings when no compare-at price is set on a product. Must be removed once all products have real compare-at prices set in Shopify Admin.
- [ ] **Shopify Admin: Configure accelerated checkout buttons** — Hide PayPal and Google Pay, prioritize Apple Pay. Go to Settings > Payments in Shopify Admin.
- [ ] **Additional product templates** — `product.kids-hoodie.json`, `product.shirt.json`, `product.blanket.json` (deferred to post-build)
- [ ] **Final QA pass** — Test all cart flows (US below threshold, US above threshold, international customer)

### TODOs — Visual QA (next session)
- [ ] **Test desktop gallery redesign** — Verify 2×2 grid renders correctly, lightbox opens/closes, swatch changes update position 1 only
- [ ] **Test gallery on mobile** — Verify single hero + all thumbnails, lightbox works, swatch changes update hero
- [ ] **Test below-gallery layout** — Verify selling-points/trust/press appear under gallery on desktop, after info on mobile
- [ ] **Test full-width accordions** — Verify accordions span full page width on desktop, proper padding and centering
- [ ] **Test sticky info column** — Verify right column (title/price/ATC) still sticks correctly with the new grid-row spanning
- [ ] **General desktop/mobile responsive check** — All breakpoints (768px, 1024px) transition cleanly

---

### Key Architecture Decisions
- Volume pricing is **informational only** on PDP -- actual discounts applied via Shopify automatic discounts at cart level
- Swatch colors managed via **settings textarea** (editable in Shopify admin) with hardcoded fallback in swatch-color.liquid
- Compare-at price has **+$20 fallback** when not set on a product (temporary for testing — TODO: remove before launch, search `TEMP_COMPARE_AT_FALLBACK`)
- CSS uses **overflow-x: clip** (not hidden) on .content-for-layout to avoid breaking sticky positioning on collection page
- Header shadow is in **base.css** (global) not in section stylesheet
- Button styles use `.gh-button` class system in base.css; product-main migrated from section-scoped `.btn-primary`
- Country detection uses **`localization.country.iso_code`** (Shopify built-in, globally available in Liquid, defaults to primary market = US)
- Free shipping threshold is a **global theme setting** (`settings.free_shipping_threshold`, default 75) — used in volume pricing banner, cart summary, shipping progress bar, product page trust bar
- Shipping flat rate stored in **`settings.shipping_cost`** (default "4.95")
- Shopify accelerated checkout buttons use **closed shadow DOM** — individual buttons cannot be hidden/reordered via CSS, must use Shopify Admin
- Press logos marquee uses **`margin-right` instead of CSS `gap`** on mobile — `gap` creates n-1 gaps which breaks the -50% translateX loop; `margin-right` ensures each item contributes equal space
- Cart save pills use **`.gh-cart-save-pill`** class (terracotta bg, white text, pill shape) matching the product card `.price-savings` styling
- Product gallery uses **two separate hero img elements** (`data-gallery-hero` for desktop grid, `data-gallery-hero-mobile` for mobile) — both synced by `__ghGalleryUpdateVariant()` on swatch change. Avoids CSS complexity of moving a single element between layouts.
- Desktop gallery grid uses **`grid-row: 1 / 3`** on the info column so it spans both the gallery row and below-gallery row, keeping `position: sticky` working correctly
- Accordions sit **outside `.product-main__grid`** — they're a direct child of `.product-main` section, rendered full width with their own `max-width` and `padding-inline` matching the grid
- Lightbox uses **`data-lightbox-trigger`** attribute on any clickable image element — grid items, mobile hero, and thumbnails all share the same trigger mechanism

### Key Files Reference
| File | Purpose |
|------|---------|
| `snippets/cart-products.liquid` | Cart line items (both drawer + page), per-item SAVE pill |
| `snippets/cart-summary.liquid` | Cart totals, shipping row, total SAVE pill, checkout buttons |
| `snippets/gh-cart-extras.liquid` | Upsell banner + shipping progress bar (US-only) |
| `snippets/press-logos-bar.liquid` | Shared press logos bar (desktop static, mobile marquee) |
| `snippets/gh-product-card-styles.liquid` | Universal product card styling (dots, swatches, image lock) |
| `snippets/gh-collection-styles.liquid` | Collection-specific styles (filter bar, spacing, grid gaps) — renders `gh-product-card-styles` |
| `snippets/product-gallery.liquid` | Product page image gallery (desktop 2×2 grid + mobile hero + lightbox) |
| `sections/product-main.liquid` | Product page layout (2-col grid, gallery CSS, info column, accordions, all component CSS) |
| `sections/press-logos.liquid` | Press logos section wrapper (padding, color scheme) |
| `sections/volume-pricing-banner.liquid` | Collection page volume pricing sticky banner |
| `sections/reviews.liquid` | Reviews section (JudgeMe medals + customer review cards) |
| `assets/product-page.js` | Product page JS (gallery variant sync, lightbox, swatches, sticky ATC, AJAX cart) |
| `assets/base.css` | Global styles, GH brand overrides, save pill CSS |
| `config/settings_schema.json` | Theme settings (shipping threshold, pricing mode, upsell messages, press logos) |
| `templates/index.json` | Homepage template (section order + settings) |
| `templates/product.json` | Product page template (product-main, testimonials, recommendations) |
