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
- [x] Volume pricing banner (green, sticky below header)
- [x] Color swatches on product cards (20px desktop, 14px mobile, max 10/5 with "+N more")
- [x] Pagination dots inside card gallery
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
- [ ] Additional product templates (kids-hoodie, shirt, blanket) — deferred to post-build

### Phase 5: Cart Drawer -- NOT STARTED
- [ ] Drawer slides from right
- [ ] Opens on Add to Cart
- [ ] Upsell messages by hoodie count
- [ ] Shipping progress bar
- [ ] Savings display

### Key Architecture Decisions
- Volume pricing is **informational only** on PDP -- actual discounts applied via Shopify automatic discounts at cart level
- Swatch colors managed via **settings textarea** (editable in Shopify admin) with hardcoded fallback in swatch-color.liquid
- Compare-at price has **+$20 fallback** when not set on a product (temporary for testing — TODO: remove before launch, search `TEMP_COMPARE_AT_FALLBACK`)
- CSS uses **overflow-x: clip** (not hidden) on .content-for-layout to avoid breaking sticky positioning on collection page
- Header shadow is in **base.css** (global) not in section stylesheet
- Button styles use `.gh-button` class system in base.css; product-main migrated from section-scoped `.btn-primary`
