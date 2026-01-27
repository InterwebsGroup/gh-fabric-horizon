# Giant Hoodies — Pricing, Offer & Funnel Strategy

## Overview

This document defines the complete pricing structure, upsell system, and cart behavior for Giant Hoodies. All features should be configurable via Shopify theme settings.

---

## Announcement Bar

Controlled by pricing mode toggle — automatically switches based on Tiered vs Flat.

### Settings

| Setting | Type | Default |
|---------|------|---------|
| `announcement_tiered` | Text (editable in settings + section) | "Buy 2 hoodies, save $60. Buy 3+, save $108. Free shipping at $75!" |
| `announcement_flat` | Text (editable in settings + section) | "" (blank — owner fills in for sales) |

### Behavior

```
if pricing_mode == 'tiered':
  show announcement_tiered
else:
  show announcement_flat (if not blank)
```

### Design
- Background: Primary brand color (terracotta #c4704b)
- Text: White
- Optional: Link to collection page
- Dismissible: No (always visible)

---

## Product Page Behavior

### Add to Cart Action

**On "Add to Cart" click:** Open cart drawer (slide out from right)

Do NOT redirect to cart page or stay on page with toast. The drawer:
- Shows upsell messaging immediately
- Allows customer to continue browsing for different designs/colors
- Keeps purchase momentum

**"Continue Shopping" / Close behavior:** Closes drawer, keeps customer on current page. Do NOT redirect to collection or elsewhere. Customer may want to add a different variant (color) of the same product.

### Quantity Selector

Price updates dynamically as quantity changes:

| Qty Selected | Display |
|--------------|---------|
| 1 | "$55" |
| 2 | "$90 ($45 each)" |
| 3 | "$117 ($39 each)" |
| 4+ | "$[total] ($39 each)" |

**Important context:** Most customers buy 1 of a specific design/color, then add different designs for their 2nd and 3rd hoodies. The quantity selector handles same-product multiples, but the primary upsell path is:

1. Add 1 hoodie → Cart drawer opens
2. See "Add a 2nd hoodie" message
3. Continue browsing → Add different design
4. See "Add a 3rd hoodie for $27" message
5. Repeat

### Mobile Sticky Add to Cart

On mobile (< 768px), show sticky bar at bottom of screen when main Add to Cart button scrolls out of view:

```
┌─────────────────────────────────────────────┐
│  $55 (Save $20)        [ Add to Cart ]      │
└─────────────────────────────────────────────┘
```

- Fixed to bottom of viewport
- Shows current price + savings
- Add to Cart button opens cart drawer
- Appears on scroll (when main CTA not visible)
- Does not cover important content

---

## Trust Badges & Social Proof

### Product Page Layout (Top to Bottom)

```
[Product Images]

[Title]
[Price: $55  ($75 struck)  "Save $20"]

[Trust Bar]
✓ Free shipping $75+  ·  ✓ 30-Day Guarantee  ·  ✓ Made in USA

[Variant Selectors: Color, etc.]

[Quantity Selector]

[ Add to Cart Button ]

[Volume Pricing Callout]
Buy more, save more:
• 2 for $45 each — Save $60
• 3+ for $39 each — Save $108+

[Secondary Trust: "225,000+ happy customers" + star rating]

[Product Description]
```

### Trust Bar Icons (Above Variants)

Small, inline, not overwhelming:
```
✓ Free shipping $75+  ·  ✓ 30-Day Guarantee  ·  ✓ Made in USA
```

### Social Proof (Below Volume Pricing)

```
★★★★★ 4.9 · 225,000+ happy customers
```

Links to reviews section on scroll or separate reviews page.

---

## Urgency & Scarcity

### Rules

- **No fake urgency.** No "X people viewing" or "Y bought in last hour" counters.
- **No countdown timers** unless there's a real deadline.
- **Low stock only when real.** If inventory < threshold, show warning.

### Low Stock Display

Only show when variant inventory falls below threshold (configurable, default: 10):

```
⚠️ Only [X] left in [Color]
```

### Settings

| Setting | Type | Default |
|---------|------|---------|
| `low_stock_enabled` | Checkbox | true |
| `low_stock_threshold` | Number | 10 |
| `low_stock_message` | Text | "Only [qty] left in [variant]" |

### Behavior

```
if variant.inventory_quantity <= low_stock_threshold:
  show low_stock_message
else:
  hide
```

Do not show for inventory-not-tracked products.

---

## Collection & Search Page Display

### Pricing Display

Show single-unit price with deal hint:

```
[Product Card]
$55
Buy 2+, save up to 48%
```

Do NOT show "From $39" — can feel like bait-and-switch, especially to older audience. Be honest about single-unit price while signaling the deal exists.

### Tiered vs Flat Mode

| Mode | Price Display | Subtext |
|------|---------------|---------|
| Tiered | $55 | "Buy 2+, save up to 48%" |
| Flat | $55 | (none, or sale badge if running promo) |

---

## Cart Page (/cart)

Cart page should mirror cart drawer functionality exactly:

- Same upsell messaging (hoodie count-based)
- Same shipping progress bar
- Same savings display (calculated from $75 compare-at)
- Same discount code field (when enabled)
- Responds to Tiered/Flat toggle same as drawer

If customer navigates directly to `/cart`, experience should be identical to drawer.

---

## Out of Stock Handling

### Display

When a variant has zero inventory:

```
[Color selector with "Navy" selected but sold out]

[ Sold Out ]  ← Disabled button, grayed out

📧 Notify me when back in stock
[Email input] [Submit]
```

### Settings

| Setting | Type | Default |
|---------|------|---------|
| `back_in_stock_enabled` | Checkbox | true |
| `back_in_stock_button_text` | Text | "Notify Me" |
| `back_in_stock_placeholder` | Text | "Enter your email" |
| `back_in_stock_success_msg` | Text | "We'll email you when it's back!" |

### Klaviyo Integration (Implementation Note)

Email submissions should be pushed to a Klaviyo list for back-in-stock automation. This is a future integration — for now, collect emails via Shopify's native back-in-stock or a simple form that can be connected later.

**Data to capture:**
- Email address
- Product ID
- Variant ID
- Timestamp

---

## Discount Code Blocking (Shopify Function)

### Problem

User has thousands of active discount codes. When `allow_discount_codes = false`, need to block ALL codes at checkout — not just hide the field.

### Solution: Shopify Function

Create a Shopify Function (discount validation) that checks the toggle and rejects codes when disabled.

### Logic

```javascript
// Pseudocode for Shopify Function
export function run(input) {
  const blockCodes = input.shop.metafield('settings', 'block_discount_codes');
  
  if (blockCodes === 'true') {
    return {
      discountApplicationStrategy: "REJECT_ALL",
      errors: [{
        message: input.shop.metafield('settings', 'discount_blocked_message') 
          || "Discount codes cannot be combined with our current promotion."
      }]
    };
  }
  
  // Otherwise, allow normal discount processing
  return { discountApplicationStrategy: "ACCEPT" };
}
```

### Settings (Metafields or Theme Settings)

| Setting | Type | Default |
|---------|------|---------|
| `block_discount_codes` | Checkbox | false |
| `discount_blocked_message` | Text | "Discount codes cannot be combined with our current promotion." |

### Behavior

| `block_discount_codes` | Code Entered | Result |
|------------------------|--------------|--------|
| false | Any code | Normal Shopify behavior (applies if valid) |
| true | Any code | Rejected with custom error message |

### Where Error Appears

- Cart drawer (if code field shown)
- Cart page (if code field shown)  
- Checkout (always has field — function blocks there too)

### Admin UX

When you want to run tiered pricing without codes:
1. Toggle `block_discount_codes` = true
2. All codes fail with your custom message
3. No need to deactivate thousands of codes

When you want codes to work:
1. Toggle `block_discount_codes` = false
2. Codes work normally

---

## Tier Eligibility: Collection-Based

### Logic

Instead of requiring a tag on every hoodie, use collection membership:

```
tier_eligible = 
  (product in tier_eligible_collections)
  AND NOT (product tagged with tier_exclude_tag)
```

### Settings

| Setting | Type | Default |
|---------|------|---------|
| `tier_eligible_collections` | Collection picker (multi-select) | "Giant Hoodies", "Kids Giant Hoodies" |
| `tier_exclude_tag` | Text | "not-tier-eligible" |

### Why This Is Better

- New hoodies automatically get tier pricing when added to collection
- No need to remember to tag every product
- Only tag exceptions (Mystery Messups, special items)
- Can add future collections without code changes

### Example

| Product | In Collection | Has Exclude Tag | Tier Eligible? |
|---------|---------------|-----------------|----------------|
| Navy Blank Hoodie | Giant Hoodies | No | ✓ Yes |
| Kids Dino Hoodie | Kids Giant Hoodies | No | ✓ Yes |
| Mystery Messup | Giant Hoodies | `not-tier-eligible` | ✗ No |
| Giant Shirt | (none) | No | ✗ No |
| Gift Card | (none) | No | ✗ No |

---

## Pricing Structure

### Hoodies (Adult + Kids)

Kids hoodies count toward volume pricing tiers.

| Quantity | Price Each | Total | Compare-At | Savings |
|----------|------------|-------|------------|---------|
| 1 | $55 | $55 | $75 | Save $20 |
| 2 | $45 | $90 | $150 | Save $60 |
| 3 | $39 | $117 | $225 | Save $108 |
| 4 | $39 | $156 | $300 | Save $144 |
| 5 | $39 | $195 | $375 | Save $180 |
| 6+ | $39 | $39 × qty | $75 × qty | Save $36 × qty |

**Rules:**
- Compare-at price is always $75 per hoodie
- Volume pricing applies to combined adult + kids hoodie count
- $39/each is the floor — applies to 3 or more hoodies
- "Customize Your Own" hoodies are +$10 (product-level pricing, not theme)

### Other Products (Flat Pricing)

These do NOT participate in volume discounts:

| Product | Price | Compare-At |
|---------|-------|------------|
| Giant Shirt | $28 | — |
| Giant Blanket | $65 | $75 |
| Socks | $15 | — |
| Accessories | Varies | — |
| Mystery Messups | Varies, EXCLUDED from all tier logic |

---

## Savings Calculation

**Critical Rule:** All savings displayed anywhere on the site must be calculated from the **compare-at price ($75)**, NOT the current or sale price. Shopify's default behavior calculates savings from the pre-discount price — override this everywhere.

**Formula:**
```
savings = (compare_at_price × quantity) − actual_price_paid
```

**Examples:**

| Scenario | Shopify Default (WRONG) | Correct |
|----------|-------------------------|---------|
| 1 hoodie at $55 | — | Save $20 |
| 2 hoodies at $45ea ($90) | Save $20 | Save $60 |
| 3 hoodies at $39ea ($117) | Save $48 | Save $108 |
| 2 hoodies + 20% code ($72) | Save $18 | Save $78 |

**Where this applies:**
- Product page price badge
- Product page volume pricing callout
- Cart line items
- Cart drawer savings summary
- Any "You're saving $X" messaging

**Implementation:**
```javascript
// For tier-eligible products (in tier collections, not excluded)
const tierCollectionIds = settings.tier_eligible_collections;
const excludeTag = settings.tier_exclude_tag;

const tierEligibleItems = cart.items.filter(item => {
  const inTierCollection = item.product.collections.some(c => tierCollectionIds.includes(c.id));
  const hasExcludeTag = item.product.tags.includes(excludeTag);
  return inTierCollection && !hasExcludeTag;
});

const compareAtTotal = tierEligibleItems.reduce((sum, item) => {
  return sum + (75 * item.quantity); // Always $75 compare-at for hoodies
}, 0);

const actualTotal = tierEligibleItems.reduce((sum, item) => {
  return sum + (item.final_line_price / 100); // Actual price paid
}, 0);

const savings = compareAtTotal - actualTotal;
```

---

## Shipping

| Cart Total | Shipping Cost |
|------------|---------------|
| Under $75 | $4.95 |
| $75 or more | FREE |

**Rules:**
- Threshold is dollar-based, all products count
- International: calculated at checkout

**Why $75:** 
- 1 hoodie ($55) + 1 shirt ($28) = $83 → FREE shipping
- 2 hoodies ($90) → FREE shipping
- Creates two paths to free shipping: cross-sell or volume

---

## Admin Controls

All settings live in Theme Settings → "Pricing & Offers"

### Toggle: Pricing Mode

| Setting | `pricing_mode` |
|---------|----------------|
| Options | `tiered` / `flat` |
| Default | `tiered` |

**Tiered mode:**
- 1 hoodie: $55
- 2 hoodies: $45 each
- 3+ hoodies: $39 each
- Volume upsell messages active

**Flat mode:**
- All hoodies: $55
- No volume breaks
- Sale-specific messaging shown instead

### Toggle: Discount Code Stacking

| Setting | `allow_discount_codes` |
|---------|------------------------|
| Options | `true` / `false` |
| Default | `false` |

When `false`, hide or disable discount code field (useful when running tiered pricing and not wanting code abuse).

### Toggle: Cart Upsell

| Setting | `cart_upsell_enabled` |
|---------|----------------------|
| Options | `true` / `false` |
| Default | `true` |

---

## Cart Upsell System

### Hoodie Count Logic

The system counts products that are tier-eligible (in tier collections, not excluded):

```javascript
// Pseudocode
const tierCollectionIds = settings.tier_eligible_collections;
const excludeTag = settings.tier_exclude_tag; // "not-tier-eligible"

hoodie_count = cart.items
  .filter(item => {
    const inTierCollection = item.product.collections.some(c => tierCollectionIds.includes(c.id));
    const hasExcludeTag = item.product.tags.includes(excludeTag);
    return inTierCollection && !hasExcludeTag;
  })
  .reduce((sum, item) => sum + item.quantity, 0);
```

### Upsell Messages by Hoodie Count

| Hoodies | Message (Editable in Admin) |
|---------|----------------------------|
| 0 | `upsell_0_hoodies`: "Add a Giant Hoodie to your cart!" |
| 1 | `upsell_1_hoodie`: "Add a 2nd hoodie — save $20 + FREE shipping!" |
| 2 | `upsell_2_hoodies`: "Add a 3rd hoodie for just $27 more!" |
| 3+ | `upsell_3_plus`: "You're getting our best price! 🎉" |

### Flat Mode Override

When `pricing_mode == 'flat'`:
- Show `upsell_flat_mode` message instead: "Sale prices applied!"
- Or hide upsell section entirely (configurable)

### Shipping Progress

Always show when cart total < free shipping threshold:

```
remaining = free_shipping_threshold - cart_total

if remaining > 0:
  show: "Add $[remaining] more for FREE shipping!"
  show progress bar: (cart_total / threshold) * 100%
else:
  show: "✓ FREE shipping unlocked!"
```

---

## Product Page Display

### Tiered Mode

```html
<div class="price-wrapper">
  <span class="price-compare">$75</span>
  <span class="price-current">$55</span>
  <span class="price-badge">Save $20</span>
</div>

<div class="volume-pricing">
  <p><strong>Buy more, save more:</strong></p>
  <ul>
    <li>1 for $55 <span class="dim">(Save $20)</span></li>
    <li>2 for $45 each <span class="dim">(Save $60)</span></li>
    <li>3+ for $39 each <span class="dim">(Save $108+)</span></li>
  </ul>
</div>
```

### Flat Mode

```html
<div class="price-wrapper">
  <span class="price-compare">$75</span>
  <span class="price-current">$55</span>
  <span class="price-badge">Save $20</span>
</div>

<!-- No volume pricing callout -->
```

---

## Cart Drawer Display

### Example: 2 Hoodies in Cart (Tiered Mode)

```
┌─────────────────────────────────────────────┐
│ Your Cart                                   │
├─────────────────────────────────────────────┤
│ [img] Giant Hoodie - Navy                   │
│       $45 each ($75)                        │
│       Qty: [−] 1 [+]                        │
│                                             │
│ [img] Giant Hoodie - Forest                 │
│       $45 each ($75)                        │
│       Qty: [−] 1 [+]                        │
├─────────────────────────────────────────────┤
│ 💡 Add a 3rd hoodie for just $27 more!      │
│    [Browse Hoodies →]                       │
├─────────────────────────────────────────────┤
│ Subtotal                             $90.00 │
│ Shipping                               FREE │
│ ──────────────────────────────────────────  │
│ You're saving $60 on this order!            │
├─────────────────────────────────────────────┤
│         [ Checkout — $90.00 ]               │
└─────────────────────────────────────────────┘
```

### Dynamic Elements

1. **Line item price** — Shows tier price ($45), not $55
2. **Compare-at** — Struck through $75
3. **Upsell message** — Based on hoodie count
4. **Shipping** — $4.95 or FREE based on $75 threshold
5. **Total savings** — ($75 × qty) − actual total

---

## Settings Schema

Add to `config/settings_schema.json`:

```json
{
  "name": "Pricing & Offers",
  "settings": [
    {
      "type": "header",
      "content": "Pricing Mode"
    },
    {
      "type": "select",
      "id": "pricing_mode",
      "label": "Pricing Mode",
      "options": [
        { "value": "tiered", "label": "Tiered Pricing" },
        { "value": "flat", "label": "Flat Pricing (Sale Mode)" }
      ],
      "default": "tiered",
      "info": "Tiered: 1 for $55, 2 for $45ea, 3+ for $39ea. Flat: All hoodies $55."
    },
    {
      "type": "header",
      "content": "Tier Eligible Products"
    },
    {
      "type": "collection_list",
      "id": "tier_eligible_collections",
      "label": "Collections eligible for tier pricing",
      "info": "Products in these collections get volume pricing"
    },
    {
      "type": "text",
      "id": "tier_exclude_tag",
      "label": "Exclude tag",
      "default": "not-tier-eligible",
      "info": "Products with this tag are excluded from tier pricing"
    },
    {
      "type": "header",
      "content": "Discount Codes"
    },
    {
      "type": "checkbox",
      "id": "block_discount_codes",
      "label": "Block all discount codes",
      "default": false,
      "info": "When enabled, all discount codes are rejected site-wide"
    },
    {
      "type": "text",
      "id": "discount_blocked_message",
      "label": "Blocked code error message",
      "default": "Discount codes cannot be combined with our current promotion."
    },
    {
      "type": "header",
      "content": "Announcement Bar"
    },
    {
      "type": "text",
      "id": "announcement_tiered",
      "label": "Announcement (Tiered mode)",
      "default": "Buy 2 hoodies, save $60. Buy 3+, save $108. Free shipping at $75!"
    },
    {
      "type": "text",
      "id": "announcement_flat",
      "label": "Announcement (Flat/Sale mode)",
      "default": "",
      "info": "Leave blank to hide. Fill in for sales."
    },
    {
      "type": "header",
      "content": "Shipping"
    },
    {
      "type": "number",
      "id": "free_shipping_threshold",
      "label": "Free shipping threshold ($)",
      "default": 75
    },
    {
      "type": "text",
      "id": "shipping_cost",
      "label": "Shipping cost under threshold",
      "default": "4.95"
    },
    {
      "type": "header",
      "content": "Cart Upsell"
    },
    {
      "type": "checkbox",
      "id": "cart_upsell_enabled",
      "label": "Enable cart upsell messages",
      "default": true
    },
    {
      "type": "text",
      "id": "upsell_0_hoodies",
      "label": "0 hoodies message",
      "default": "Add a Giant Hoodie to your cart!"
    },
    {
      "type": "text",
      "id": "upsell_1_hoodie",
      "label": "1 hoodie message",
      "default": "Add a 2nd hoodie — save $20 + FREE shipping!"
    },
    {
      "type": "text",
      "id": "upsell_2_hoodies",
      "label": "2 hoodies message",
      "default": "Add a 3rd hoodie for just $27 more!"
    },
    {
      "type": "text",
      "id": "upsell_3_plus",
      "label": "3+ hoodies message",
      "default": "You're getting our best price! 🎉"
    },
    {
      "type": "text",
      "id": "upsell_flat_mode",
      "label": "Flat mode message",
      "default": "Sale prices applied!"
    },
    {
      "type": "header",
      "content": "Shipping Messages"
    },
    {
      "type": "text",
      "id": "shipping_progress_msg",
      "label": "Shipping progress message",
      "default": "Add [amount] more for FREE shipping!",
      "info": "[amount] replaced with dollars needed"
    },
    {
      "type": "text",
      "id": "shipping_free_msg",
      "label": "Free shipping unlocked message",
      "default": "✓ FREE shipping unlocked!"
    },
    {
      "type": "checkbox",
      "id": "show_shipping_progress_bar",
      "label": "Show shipping progress bar",
      "default": true
    },
    {
      "type": "header",
      "content": "Low Stock Warning"
    },
    {
      "type": "checkbox",
      "id": "low_stock_enabled",
      "label": "Show low stock warnings",
      "default": true
    },
    {
      "type": "number",
      "id": "low_stock_threshold",
      "label": "Low stock threshold",
      "default": 10,
      "info": "Show warning when inventory falls below this number"
    },
    {
      "type": "text",
      "id": "low_stock_message",
      "label": "Low stock message",
      "default": "Only [qty] left in [variant]",
      "info": "[qty] and [variant] replaced dynamically"
    },
    {
      "type": "header",
      "content": "Back in Stock Notifications"
    },
    {
      "type": "checkbox",
      "id": "back_in_stock_enabled",
      "label": "Show back-in-stock email signup",
      "default": true,
      "info": "Shows email capture on sold-out variants"
    },
    {
      "type": "text",
      "id": "back_in_stock_button_text",
      "label": "Submit button text",
      "default": "Notify Me"
    },
    {
      "type": "text",
      "id": "back_in_stock_placeholder",
      "label": "Email placeholder",
      "default": "Enter your email"
    },
    {
      "type": "text",
      "id": "back_in_stock_success_msg",
      "label": "Success message",
      "default": "We'll email you when it's back!"
    }
  ]
}
```

---

## Automatic Discount Setup

Create in Shopify Admin → Discounts → Create automatic discount:

### Discount 1: "2 Hoodies"

- **Type:** Automatic, Amount off products
- **Value:** Fixed price $45 per item
- **Applies to:** Products in "Giant Hoodies" and "Kids Giant Hoodies" collections, EXCLUDING products tagged `not-tier-eligible`
- **Minimum quantity:** 2
- **Combinations:** Can combine with other discounts (your call)

### Discount 2: "3+ Hoodies"

- **Type:** Automatic, Amount off products
- **Value:** Fixed price $39 per item
- **Applies to:** Products in "Giant Hoodies" and "Kids Giant Hoodies" collections, EXCLUDING products tagged `not-tier-eligible`
- **Minimum quantity:** 3
- **Priority:** Higher than "2 Hoodies" discount

**Important:** 3+ discount must take precedence. Shopify applies highest-priority automatic discount when multiple qualify.

---

## Product Eligibility

### Collection-Based (Recommended)

Tier pricing applies to products in specified collections, minus exclusions:

```
tier_eligible = 
  (product in tier_eligible_collections)
  AND NOT (product tagged "not-tier-eligible")
```

**Default collections:** "Giant Hoodies", "Kids Giant Hoodies"

### Tags

| Tag | Use |
|-----|-----|
| `not-tier-eligible` | Exclude specific products from volume pricing (Mystery Messups, etc.) |

### Examples

| Product | In Tier Collection | Has Exclude Tag | Gets Volume Pricing? |
|---------|-------------------|-----------------|---------------------|
| Navy Blank Hoodie | ✓ Giant Hoodies | No | ✓ Yes |
| Kids Dino Hoodie | ✓ Kids Giant Hoodies | No | ✓ Yes |
| Mystery Messup | ✓ Giant Hoodies | `not-tier-eligible` | ✗ No |
| Giant Shirt | ✗ | No | ✗ No |
| Giant Blanket | ✗ | No | ✗ No |

---

## Sale Campaigns

### When Running a Sale:

1. **Toggle to Flat mode** (if disabling volume pricing)
2. **Create sale discount** (automatic or code-based)
3. **Update upsell messages** in theme settings if needed
4. **Enable/disable discount codes** as appropriate

### Historical Sale Types (Reference)

- Buy 2 Get 1 Free
- Buy 1 Get 1 Half Off
- % Off Flat Discount
- % Off Tiered Discount
- Flash Sale (limited time)
- 2+ Hoodies $40ea
- $50 Off Any 3 Items
- 2 for $99
- Family Pack $100 Off
- Free Gift with Sale
- $99 Mystery Box
- First 100 Orders at $45ea

Most of these can run WITH tiered pricing using a discount code. Use Flat mode only when you want to disable volume breaks entirely.

---

## Testing Checklist

### Tiered Pricing
- [ ] 1 hoodie = $55, shows "Save $20"
- [ ] 2 hoodies = $90 ($45 ea), shows "Save $60"
- [ ] 3 hoodies = $117 ($39 ea), shows "Save $108"
- [ ] 4+ hoodies = $39 each
- [ ] Kids hoodies count toward tiers
- [ ] Products in tier collections get volume pricing
- [ ] Products tagged `not-tier-eligible` excluded
- [ ] Products NOT in tier collections don't get volume pricing

### Flat Pricing
- [ ] Toggle to Flat mode works
- [ ] All hoodies show $55
- [ ] Volume messaging hidden
- [ ] Flat mode upsell message shows

### Savings Display
- [ ] All savings calculated from $75 compare-at (not current price)
- [ ] Savings correct on product page
- [ ] Savings correct in cart drawer
- [ ] Savings correct on cart page
- [ ] Savings correct with discount codes applied

### Collection/Search Pages
- [ ] Shows "$55" as price (not "From $39")
- [ ] Shows "Buy 2+, save up to 48%" subtext in tiered mode
- [ ] Subtext hidden in flat mode

### Shipping
- [ ] Under $75: shows $4.95
- [ ] $75+: shows FREE
- [ ] Progress bar calculates correctly
- [ ] Messages update in real-time

### Cart Upsell (Drawer)
- [ ] 0 hoodies: default message
- [ ] 1 hoodie: "add 2nd" message
- [ ] 2 hoodies: "add 3rd for $27" message
- [ ] 3+ hoodies: celebration message
- [ ] All messages editable in admin

### Cart Page (/cart)
- [ ] Same upsell messaging as drawer
- [ ] Same shipping progress bar
- [ ] Same savings display
- [ ] Responds to tiered/flat toggle
- [ ] Discount code field present

### Announcement Bar
- [ ] Shows tiered message when pricing_mode = tiered
- [ ] Shows flat message when pricing_mode = flat
- [ ] Hides if flat message is blank
- [ ] Editable in both settings and section

### Product Page
- [ ] Add to Cart opens cart drawer (not redirect)
- [ ] Drawer close keeps customer on same page
- [ ] Quantity selector updates price dynamically
- [ ] Trust badges display correctly
- [ ] Volume pricing callout visible (tiered mode)
- [ ] Volume pricing callout hidden (flat mode)
- [ ] Low stock warning shows when inventory < threshold
- [ ] Low stock warning hides when inventory >= threshold

### Out of Stock
- [ ] Sold out variants show "Sold Out" button (disabled)
- [ ] Back-in-stock email form shows (when enabled)
- [ ] Email form hidden when toggle disabled
- [ ] Success message shows on submit
- [ ] Email captured with product/variant ID

### Discount Code Blocking (Shopify Function)
- [ ] When `block_discount_codes` = false, codes work normally
- [ ] When `block_discount_codes` = true, ALL codes rejected
- [ ] Custom error message displays
- [ ] Error message is editable
- [ ] Blocking works in cart drawer
- [ ] Blocking works on cart page
- [ ] Blocking works at checkout

### Mobile
- [ ] Sticky Add to Cart appears on scroll
- [ ] Sticky bar shows correct price
- [ ] Sticky bar opens cart drawer on tap
- [ ] All elements usable on small screens

### Admin
- [ ] Pricing mode toggle saves/works
- [ ] Tier collection picker works
- [ ] Exclude tag field editable
- [ ] Discount code blocking toggle works
- [ ] All text fields editable
- [ ] Shipping threshold editable
- [ ] Low stock threshold editable
- [ ] Back-in-stock toggle works

---

## Summary

| Element | Value |
|---------|-------|
| Compare-at | $75 |
| 1 hoodie | $55 |
| 2 hoodies | $45 each ($90) |
| 3+ hoodies | $39 each |
| Tier eligibility | Collection-based + exclude tag |
| Free shipping | $75+ |
| Under threshold | $4.95 |
| Free gifts | None |
| Savings calculation | Always from $75 compare-at |
| Collection page price | "$55 · Buy 2+, save up to 48%" |
| Add to Cart | Opens cart drawer, stays on page |
| Cart page | Mirrors drawer functionality |
| Mobile | Sticky Add to Cart bar |
| Low stock | Shows when < 10 units (real inventory only) |
| Out of stock | "Sold Out" + optional email capture |
| Urgency tactics | None (no fake scarcity) |
| Announcement bar | Toggles with pricing mode |
| Discount code blocking | Shopify Function, editable error message |
| Admin toggles | Tiered/Flat, Code blocking, Upsell, Low stock, Back-in-stock |
| Implementation | Shopify automatic discounts + theme + Shopify Function |
