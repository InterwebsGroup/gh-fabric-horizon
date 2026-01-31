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

## Current Progress (Updated 2026-01-30)

### Phase 1: Sitewide Dependencies -- DONE ✅
- [x] CSS variables (colors, fonts) defined in theme-styles-variables, gh-collection-styles, base.css
- [x] Design tokens consolidated and centralized (session 6 audit)
- [x] Google Fonts (Fraunces + DM Sans) loaded via theme settings
- [x] Header drop shadow added globally (base.css)
- [x] Header sticky (using Fabric default sticky-always)
- [x] Header menu mouse-intent detection (prevents accidental submenu triggers)
- [x] Footer customization (espresso bg, cream text, Fraunces headings, payment icons, divider)
- [x] Footer newsletter signup ("Join the Hoodie Fam" + email capture with "Subscribe & Save 10%")
- [x] Footer menu columns (Shop, Customer Care, About Us, Connect) — menus need Shopify Admin navigation setup
- [x] Footer social links cleaned up (removed YouTube/X)
- [x] Global button styles (4 types in base.css: primary-dark, primary-warm, secondary-outline, secondary-soft)
- [x] Cart drawer fully customized (upsell messages, shipping progress, save pills, country-aware shipping)
- [x] Password page optimized with section-narrow class

### Phase 2: Homepage -- DONE ✅
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
- [x] FAQs updated with customer-driven questions in brand voice
- [x] Section spacing normalized to consistent 60px rhythm
- [x] Audit: performance, code quality, admin editability (session 6)

### Phase 3: Collection Page -- DONE ✅
- [x] Collection header with hero banner, filter buttons, description
- [x] Product grid: 4-col desktop, 2-col mobile, info below image
- [x] Volume pricing banner (green, sticky below header, uses `settings.free_shipping_threshold`)
- [x] Color swatches on product cards (20px desktop, 14px mobile, max 10/5 with "+N more")
- [x] Pagination dots inside card gallery (hidden in side-scroller sections, shown in grids)
- [x] Filtering and sorting (grid density and product type filter removed as unnecessary)
- [x] Sort label font size reduced

### Phase 4: Product Page -- DONE ✅
- [x] Image gallery (hero + thumbnails)
- [x] Price display with savings from compare-at (uses Shopify compare_at_price)
- [x] Color swatches (42px, 62 colors mapped)
- [x] Volume pricing tiers (Hollow Socks-inspired layout)
- [x] Add to Cart button with dynamic price
- [x] Stats bar (reviews, customers, guarantee)
- [x] Trust bar (editable items via section settings)
- [x] FAQ accordions (5 sections, full-width on desktop)
- [x] Mobile sticky ATC
- [x] Social proof section
- [x] Testimonials section
- [x] Product recommendations
- [x] Back-in-stock email form (Klaviyo integration)
- [x] Mobile gallery swipe/dots
- [x] Desktop gallery redesign: 2×2 grid with lightbox (replaces single tall hero)
- [x] Selling-points strip (terracotta background), trust bar, press logos in info column
- [x] Desktop layout: accordions full-width below both columns
- [x] Offer banner (image_picker setting, placeholder SVG when empty)
- [x] Audit: cart event bug fix, deferred JS, lazy-loaded logos, code cleanup (session 6)
- [ ] Additional product templates (kids-hoodie, shirt, blanket) — deferred to final day

### Phase 5: Cart (Drawer + Page) -- DONE ✅
- [x] Drawer slides from right (Fabric default)
- [x] Opens on Add to Cart (Fabric default)
- [x] Upsell messages by hoodie count (gh-cart-extras.liquid)
- [x] Shipping progress bar (gh-cart-extras.liquid, US-only)
- [x] Per-item SAVE pill (terracotta, matches product card style) — `cart-products.liquid`
- [x] Total SAVE pill on TOTAL row (crossed-out compare-at + actual total + pill) — `cart-summary.liquid`
- [x] Country-aware shipping: US flat rate / US free / International "Calculated at Checkout" — `cart-summary.liquid`
- [x] Checkout "or" divider between SECURE CHECKOUT and accelerated payment buttons — `cart-summary.liquid`
- [x] Cart badge terracotta color — `header-actions.liquid`
- [x] Inline shipping progress bar on shipping row (Shipping [==bar==] $4.95) — `cart-summary.liquid`
- [x] Shipping message ("You're $X away from free shipping") relocated to above shipping row — `cart-summary.liquid`
- [x] Cart total includes shipping cost — `cart-summary.liquid`
- [x] Shipping savings when free: strikethrough price, FREE label, SAVE pill, included in total savings — `cart-summary.liquid`
- [x] Hoodie counting logic simplified (session 7)
- [x] Audit: bug fixes, duplication removal, performance improvements (session 6)
- [ ] Hide PayPal/Google Pay, make Apple Pay first — **Matt: Shopify Admin > Settings > Payments**

### Theme-Wide Audits -- DONE ✅ (2026-01-30, session 6)
- [x] Homepage audit (performance, code quality, admin editability)
- [x] Product page audit (cart event bug, deferred JS, lazy-load logos)
- [x] Cart drawer audit (bug fixes, duplication, performance)
- [x] JS audit (bug fixes, dead code removal, memory leak prevention)
- [x] CSS cleanup (design tokens, !important removal, calc() fixes)
- [x] Design token consolidation and tier pricing centralization

### Bugs Fixed (2026-01-29)
- Fixed press logos scrolling on desktop (should be static) and resetting on mobile (should be infinite seamless marquee)
- Fixed mobile press logos not reaching screen edges (negative margin breakout from parent padding)
- Fixed pagination dots showing in side-scroller product card sections (should only show in grids)
- Fixed orphaned Judge.me medals section in `templates/index.json` causing Shopify import validation error
- Fixed volume pricing banner hardcoded "$75" — now uses `settings.free_shipping_threshold`
- Fixed mobile double-tap on product cards (two rounds: `quick-add.liquid` hover opacity + `base.css` slideshow arrow animation — both wrapped in `@media (hover: hover)`)
- Fixed float imprecision in shipping cost calculation (`4.95 * 100 = 494.999...` → added `| round`)

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

### Changes Made (2026-01-29, session 3)

**Guarantee standardization:**
- Fixed conflicting guarantee durations across theme — all references now say **30 days** consistently
- Changed `90-Day` → `30-Day` in: `templates/index.json` (stats bar data), `sections/stats-bar.liquid` (schema default), `MASTER-BRIEFING.md`
- No 14-day references found; all other files were already correct at 30 days

**Feature guarantee section spacing:**
- Added `margin-top: 40px; margin-bottom: 40px` to `.feature-guarantee` for separation from adjacent homepage sections

**Product page — selling points & trust bar restructure:**
- Moved selling-points strip from below ATC button to directly above trust bar (consolidated trust/social proof block)
- Trust bar forced to single line on all breakpoints (`flex-wrap: nowrap`, `white-space: nowrap`, `font-size: 0.75rem`, `gap: 12px`)
- Trust bar items now **editable in theme editor** — 3 text fields under "Trust Bar" heading (defaults: "Free shipping $75+", "30-Day Guarantee", "Made in USA")
- Selling-points strip background changed from espresso (`--color-espresso`) to terracotta (`--color-terracotta`) with `!important` to override color scheme specificity

**Offer banner (new feature):**
- Added `image_picker` setting under "Offer Banner" heading in GH Product Main section
- Renders above selling-points strip, full-width in info column, `border-radius: 8px`
- Shows Shopify `lifestyle-1` placeholder SVG when no image uploaded (cream bg, dashed border)
- Inspired by Hollow Socks product page sale banner

**Press logos fix (both homepage + PDP):**
- Homepage section switched from `page-width` to `full-width` (schema default + `index.json` config) — no more side padding
- Scroll animation now infinite seamless marquee on mobile (was glitching/resetting)
- Desktop: static centered row with duplicates hidden
- Mobile: edge-to-edge via negative margins, `margin-right` instead of `gap` for perfect `-50%` loop
- `nth-child` selectors updated to `6n+` pattern for both logo copies

**Cart cleanup:**
- Hidden "Taxes and shipping calculated at checkout" text in cart summary (`display: none` on `.tax-note` div in `cart-summary.liquid`)

---

### Changes Made (2026-01-29, session 4)

**Cart badge terracotta:**
- Added CSS override in `header-actions.liquid` to make the cart count circle terracotta (`--color-terracotta`) with white text, overriding the default `--color-primary-button-background`

**Mobile double-tap fix (two rounds):**
- Round 1: `snippets/quick-add.liquid` line 141 — the `:hover`/`:focus-within` rule changing quick-add button opacity was unguarded. On iOS, first tap synthesizes `:hover`, browser sees opacity change, requires second tap to follow link. Fixed by wrapping in `@media (hover: hover)`
- Round 2: `assets/base.css` line 3544 — the `:focus-within` rule on `slideshow-component` triggering `arrowsSlideIn` animation was the same class of bug. On iOS first tap triggered arrow animation, second tap followed the link. Fixed by wrapping in `@media (hover: hover)`

**Shipping progress bar inline on shipping row:**
- Moved progress bar from standalone component (`gh-cart-extras.liquid`) to inline within the shipping row in `cart-summary.liquid`
- Layout: `Shipping [==bar==] $4.95` on one flex line for all screen sizes
- CSS: `.gh-cart-shipping-row__bar` uses `flex: 1 1 0%`, 5px height, sand background, espresso fill (green when complete)
- Old standalone bar hidden: `.gh-shipping-progress { display: none; }` in base.css

**Shipping message relocated:**
- "You're $X away from free shipping" / "You've unlocked FREE shipping" message moved from top of cart (inside `gh-cart-extras`) to directly above the shipping row in `cart-summary.liquid`
- New class `.gh-cart-shipping-msg` (centered, uppercase, small text) with `--free` modifier (green)

**Cart total includes shipping:**
- `display_total = cart.total_price | plus: shipping_cost_cents` (only added when US and not free)
- Compare-at total always includes `full_shipping_cents` so savings reflect the full picture

**Shipping savings when free:**
- When free shipping met: shipping row shows `~~$4.95~~ FREE` with a `SAVE $4.95` pill
- `full_shipping_cents` always calculated (not just when not free) so it can be shown as savings
- Compare-at total always includes full shipping cost, making total SAVE pill include shipping discount
- CSS: `.gh-cart-shipping-row__was` (strikethrough), `.gh-cart-shipping-row__value--free` (green, inline-flex)

**Rounding fixes:**
- Added `| round` after `| times: 100` on shipping cost to fix float imprecision (4.95 * 100 → 494.999...)
- Changed "SAVED" text to "SAVE" on shipping pill

**Money format investigation:**
- Investigated persistent rounding to whole dollars on all `| money` output
- Root cause: `shop.money_format` (Shopify admin setting) is set to `${{amount_no_decimals}}`
- The `| money` Liquid filter and JS `formatMoney()` in `product-page.js` both respect this format string
- Fix: Change in Shopify Admin → Settings → General → Store currency → Change formatting from `${{amount_no_decimals}}` to `${{amount}}`
- Added to TODOs — Before Launch (to be done alongside compare-at price and dynamic checkout buttons)

---

### Changes Made (2026-01-30, session 5 — morning)

**Footer completion:**
- Added newsletter signup to footer: "Join the Hoodie Fam" heading + "Get exclusive deals, new drops, and cozy content. No spam, just good stuff." body + email form with "Subscribe & Save 10%" button
- Newsletter renders as a full-width centered row above the 4 menu columns, separated by a subtle divider
- Set menu handles for empty columns: `customer-care`, `about`, `connect` — Matt needs to create these navigation menus in Shopify Admin
- Removed YouTube and X (Twitter) from footer social links (Giant Hoodies doesn't use them)
- Added CSS in `footer.liquid` for newsletter group layout: `grid-column: 1 / -1`, centered text, max-width 480px email form, opacity 0.7 body text
- Added CSS to ensure payment icons always span full width as the last child in the footer grid
- Files changed: `sections/footer.liquid` (CSS), `sections/footer-group.json` (config)

**Homepage spacing:**
- Added spacing to `feature-oversized` and `stats-bar` sections
- Updated homepage FAQs with customer-driven questions written in brand voice

---

### Changes Made (2026-01-30, session 6 — comprehensive audits)

**Homepage audit:**
- Performance improvements, code quality cleanup, admin editability enhancements
- Consolidated design tokens and centralized tier pricing settings in `settings_schema.json`
- Normalized all homepage section spacing to consistent 60px rhythm

**Product page audit:**
- Fixed cart event bug, deferred JS loading, lazy-loaded press logos
- General code cleanup and dead code removal

**Cart drawer audit:**
- Fixed bugs, removed code duplication, improved performance
- Restored cart drawer upsell banner and shipping progress bar (accidentally broken during audit)

**JS audit (theme-wide):**
- Fixed bugs across multiple JS files
- Removed dead code paths
- Fixed memory leak prevention

**CSS cleanup (theme-wide):**
- Migrated hardcoded values to design tokens
- Removed unnecessary `!important` overrides
- Fixed `calc()` expressions

**Volume pricing banner fix:**
- Moved `{% stylesheet %}` tag to root level (was nested incorrectly)
- Moved styles from section to `base.css` for proper cascade

---

### Changes Made (2026-01-30, session 7 — refinements & polish)

**Footer & i18n improvements:**
- Styling improvements across footer
- i18n locale updates for consistency

**Password page optimization:**
- Optimized password page layout
- Applied `section-narrow` class for proper width constraint

**Cart simplification:**
- Simplified cart hoodie counting logic (cleaner Liquid)

**Homepage copy & styling:**
- Updated hero line break positioning
- Adjusted eyebrow font size
- Updated guarantee copy for consistency

**Product page — new features:**
- Added product offer banner (`image_picker` setting, renders above selling-points)
- Added Klaviyo back-in-stock email form for out-of-stock variants
- Removed compare-at price fallbacks from collection filters

**Collection page cleanup:**
- Updated collection filter options
- Reduced sort label font size
- Removed grid density toggle (unnecessary complexity)
- Removed product type filter (not useful for this store)

**Header UX improvement:**
- Added mouse-intent detection to header menu dropdowns — prevents accidental submenu triggers when mouse moves diagonally across menu items

**Settings cleanup:**
- Removed invalid `default` from `upsell_cta_url` URL setting (Shopify URL settings don't support defaults)

**Product page layout:**
- Reverted layout: selling points, trust bar, press logos moved **back into info column** (right side) — previous below-gallery placement didn't work as well visually
- Changed selling-points strip background from espresso to terracotta

---

### Pre-Launch Code Audit (2026-01-31) -- DONE ✅

Comprehensive audit of the entire codebase (12 parallel agents, ~195 findings). 27 fixes applied across 4 phases:

**Phase 1 — Critical (commit `2ddfa80` + `217abbf`):**
- Fixed trailing space in `_media-without-appearance.liquid` schema (broke "contain" image mode)
- Fixed hardcoded "Giant Hoodies" in `404.liquid` → `shop.name`
- Fixed color option labels "colors" → "color" in `product.liquid`
- Fixed header announcements division-by-zero on speed=0
- Fixed `morph.js` missing querySelector on wrongNode
- Removed `blocking="render"` from view-transitions script (render-blocking)

**Phase 2 — High Priority (commit `a47e198`):**
- Fixed OG image HTTP → HTTPS in `meta-tags.liquid`
- Fixed `morph.js` wrongNode querySelector
- Fixed product inventory variant ID (`product.id` → `closest.product.id`)
- Fixed header logo hardcoded name → `shop.name`
- Fixed `section.liquid` custom_class XSS (added `| escape`)
- Fixed slideshow duplicate `<style>` tag
- Fixed `card-gallery.liquid` Liquid operator precedence + `aria-hidden`
- Fixed `media.js` postMessage wildcard origin → proper origin check
- Fixed multiple `<h1>` → `<h2>` on homepage
- Fixed product-main focus outline
- Fixed hero section `aria-label`

**Phase 3 — Medium Priority (commit `c201648`):**
- Added `| escape` to 21 unescaped settings across 4 GH sections (feature-guarantee, product-testimonials, stats-bar, comparison-table)
- Added `super.disconnectedCallback()` to `results-list.js`
- Added null guards to `gh-back-in-stock.js`
- Fixed Schema.org `@context` HTTP → HTTPS in `header.liquid`
- Fixed `formatMoney` string `.replace()` → regex `/g` in `utilities.js`
- Fixed missing `]` in header-menu.js selector (caused DOMException on "More" hover)
- Fixed slideshow `pause()` → `suspend()` in visibility handler

**Phase 4 — Final Review (commit `a3f265a`):**
- Fixed press-logos alt text mismatch (`Forbes` → `ABC News` for `ABC.svg`)
- Added `scope="col"` to comparison table `<th>` elements

**Remaining items reviewed and denied (not bugs or too risky):**
- innerHTML "XSS" vectors in collection-filter-ajax, localization, price-per-item → data from Shopify's own server, not user input
- Fabric base theme code quality items (event listener leaks, async patterns, CSS compat) → modifying upstream code risks breaking core
- Hardcoded English strings, missing locale keys → single-language store
- Design decisions (colors, spacing, autoplay, padding) → intentional choices
- False positives found: slideshow-slide duplicate attributes (doesn't exist), blog empty block_order (populated), cachePageSections early return bug (no bug)

---

### TODOs — REMAINING 🏁

#### Claude Code Tasks (code changes)
- [x] ~~**Remove +$20 compare-at price fallback**~~ — `TEMP_COMPARE_AT_FALLBACK` code removed from all source files (cart-products.liquid, cart-summary.liquid, product-page.js).
- [x] ~~**Dynamic pricing for comparison table & FAQ**~~ — Comparison table "our price" now reads from `blank-giant-hoodie` product via `pricing_product` setting. FAQ pricing answer uses new `gh-pricing-answer` block with dynamic tier calculations from theme settings.
- [ ] **Additional product templates** — `product.kids-hoodie.json`, `product.shirt.json`, `product.blanket.json`

#### Matt Tasks (Shopify Admin — no code)
- [ ] **Change money format** — Settings → General → Store currency → Change formatting from `${{amount_no_decimals}}` to `${{amount}}` (and same for "with currency" format). This is why all prices show as whole dollars.
- [x] ~~**Set compare-at prices on all products**~~ — Done.
- [ ] **Configure accelerated checkout buttons** — Settings → Payments → hide PayPal and Google Pay, prioritize Apple Pay.
- [ ] **Create footer navigation menus** — Online Store → Navigation:
  - `customer-care` — Contact Us, Shipping & Returns, FAQ, Track My Order
  - `about` — Our Story, Made in USA, Press, Hoodie Fam
  - `connect` — Contact Us, Instagram, TikTok, Facebook
  - The `footer` menu (Shop column) already exists
- [x] ~~**Update social media URLs**~~ — Done.
- [x] ~~**Upload offer banner image**~~ — Done.

#### Visual QA Checklist
- [ ] **Desktop gallery** — 2×2 grid renders correctly, lightbox opens/closes, swatch changes update position 1 only
- [ ] **Mobile gallery** — Single hero + all thumbnails, lightbox works, swatch changes update hero
- [ ] **Product page info column** — Selling-points (terracotta bg), trust bar, press logos all render correctly in info column
- [ ] **Full-width accordions** — Span full page width on desktop, proper padding and centering
- [ ] **Sticky info column** — Right column (title/price/ATC) sticks correctly on scroll
- [ ] **Trust bar on mobile** — All 3 items fit on one line without overflow (320px+)
- [ ] **Press logos homepage** — Full-width, smooth infinite scroll on mobile, static centered on desktop
- [ ] **Press logos product page** — Same behavior as homepage, edge-to-edge on mobile
- [ ] **Header menu dropdowns** — Mouse-intent detection prevents accidental submenu triggers
- [ ] **Collection page** — Sort/filter working, grid density removed, product type filter removed
- [ ] **Cart drawer** — Upsell messages, shipping progress bar, save pills, shipping total all correct
- [ ] **General responsive check** — All breakpoints (768px, 1024px) transition cleanly

---

### Key Architecture Decisions
- Volume pricing is **informational only** on PDP -- actual discounts applied via Shopify automatic discounts at cart level
- Swatch colors managed via **settings textarea** (editable in Shopify admin) with hardcoded fallback in swatch-color.liquid
- Compare-at price uses **`variant.compare_at_price` directly** — no fallback; prices come from Shopify product data
- Comparison table "our price" and FAQ pricing are **dynamically rendered** from `all_products['blank-giant-hoodie']` and theme tier pricing settings — no hardcoded dollar amounts in templates
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
- Desktop product page layout: **selling-points, trust bar, press logos in info column** (right side, with the product details) — previously tried below-gallery placement but reverted for better visual flow
- Accordions sit **outside `.product-main__grid`** — they're a direct child of `.product-main` section, rendered full width with their own `max-width` and `padding-inline` matching the grid
- Lightbox uses **`data-lightbox-trigger`** attribute on any clickable image element — grid items, mobile hero, and thumbnails all share the same trigger mechanism
- Offer banner uses **`image_picker` schema setting** (`offer_banner_image`) — Shopify's `image_picker` doesn't support a `default` value, so a placeholder SVG renders when empty
- Trust bar items are **editable via section settings** (`trust_item_1`, `trust_item_2`, `trust_item_3`) — icons (checkmark, return arrow, US flag SVG) are hardcoded per position
- Selling-points background uses **`!important`** to override the section color scheme's `background-color` which was winning the specificity battle in `{% stylesheet %}` blocks
- iOS double-tap caused by **unguarded `:hover`/`:focus-within`** CSS rules — any CSS that changes visual properties (opacity, animation) on hover/focus-within triggers iOS's two-tap behavior. Fix: wrap in `@media (hover: hover)` so touch devices skip these rules entirely
- Shipping progress bar is **rendered in two places**: the old standalone component in `gh-cart-extras.liquid` (now hidden via `display: none`) and the new inline version in `cart-summary.liquid` shipping row. Both use the same threshold/progress calculation
- Cart total **includes shipping cost** — `display_total = cart.total_price | plus: shipping_cost_cents`. Compare-at total always includes `full_shipping_cents` so savings display accounts for shipping discount when free
- Money format controlled by **`shop.money_format`** in Shopify Admin (Settings → General → Store currency). If set to `${{amount_no_decimals}}`, all `| money` output rounds to whole dollars. Must be `${{amount}}` for decimal prices

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
| `sections/feature-guarantee.liquid` | Homepage guarantee section (<1% return rate, 30-day badge) |
| `snippets/header-actions.liquid` | Header icons (cart, search), cart drawer wrapper, cart badge styling |
| `snippets/quick-add.liquid` | Quick-add button on product cards (hover-guarded for mobile) |
| `templates/product.json` | Product page template (product-main, testimonials, recommendations) |
| `assets/header-menu.js` | Header menu dropdown with mouse-intent detection |
