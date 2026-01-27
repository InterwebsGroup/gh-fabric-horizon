# Giant Hoodies — Shopify Admin Setup

Everything YOU need to do in Shopify Admin. Claude Code handles the theme — this doc handles everything else.

---

## 1. Development Store Setup (If Testing Separately)

### Create Dev Store
1. Go to [partners.shopify.com](https://partners.shopify.com)
2. Sign up or log in
3. Click "Stores" → "Add store"
4. Select "Create development store"
5. Choose "Create a store to test and build"
6. Name it something like "giant-hoodies-dev"
7. Use same email as your main store for easy switching

### Add Test Products to Dev Store
You only need a few products to test the pricing logic:

| Product | Price | Compare-at | Collection | Notes |
|---------|-------|------------|------------|-------|
| Test Hoodie 1 | $55 | $75 | Giant Hoodies | Standard hoodie |
| Test Hoodie 2 | $55 | $75 | Giant Hoodies | Different color/design |
| Test Hoodie 3 | $55 | $75 | Giant Hoodies | Third for 3+ tier testing |
| Test Kids Hoodie | $55 | $75 | Kids Giant Hoodies | Test kids collection counts |
| Test Shirt | $28 | $35 | Shirts | Verify NOT affected by tier |
| Test Blanket | $65 | $85 | Blankets | Verify NOT affected by tier |
| Customize Hoodie | $65 | $85 | Giant Hoodies | +$10 premium test |

**Quick way:** Just duplicate one hoodie a few times in Shopify Admin.

---

## 2. Automatic Discounts Setup

### Where to Create
```
Shopify Admin → Discounts → Create discount → Automatic discount
```

### Discount 1: "2 Hoodies"

| Setting | Value |
|---------|-------|
| **Method** | Automatic |
| **Type** | Amount off products |
| **Discount value** | $10 off each item |
| **Applies to** | Specific collections |
| **Collections** | Giant Hoodies, Kids Giant Hoodies |
| **Minimum purchase requirements** | Minimum quantity of items: 2 |
| **Combinations** | ❌ Don't combine with other discounts |
| **Start date** | Set to future date (or pause immediately) |

**Why $10 off:** Base price is $55. At 2 hoodies, price should be $45 each. $55 - $10 = $45. ✓

---

### Discount 2: "3+ Hoodies"

| Setting | Value |
|---------|-------|
| **Method** | Automatic |
| **Type** | Amount off products |
| **Discount value** | $16 off each item |
| **Applies to** | Specific collections |
| **Collections** | Giant Hoodies, Kids Giant Hoodies |
| **Minimum purchase requirements** | Minimum quantity of items: 3 |
| **Combinations** | ❌ Don't combine with other discounts |
| **Start date** | Set to future date (or pause immediately) |

**Why $16 off:** Base price is $55. At 3+ hoodies, price should be $39 each. $55 - $16 = $39. ✓

---

### Discount Priority

Shopify applies the BEST discount for the customer automatically. But to be safe:

1. Go to **Discounts** page
2. Click "..." menu on "3+ Hoodies" discount
3. Select "Move to top" or ensure it's listed above "2 Hoodies"

Higher in the list = higher priority. The 3+ discount should take precedence.

---

### Discount Exclusions

If you have products that SHOULDN'T get tier pricing (within the Giant Hoodies collection):

1. Tag those products with `not-tier-eligible`
2. Edit each discount:
   - Under "Applies to" click "Browse" 
   - Select collections as normal
   - Then under "Exclude products" → add products tagged `not-tier-eligible`

**Likely exclusions:**
- Mystery Messups (already random pricing)
- Gift cards (if in hoodie collection for some reason)
- Any promotional items with fixed pricing

---

## 3. Product Setup (Live Store)

### Compare-At Prices

**CRITICAL:** Every hoodie needs compare-at price set to $75.

**Bulk edit method:**
1. Products → Select all hoodies (use collection filter)
2. Click "Bulk edit"
3. Add column "Compare at price"
4. Set all to $75.00
5. Save

**Why this matters:** The theme calculates savings from compare-at. If compare-at is blank or wrong, savings display will be broken.

| Product Type | Price | Compare-At |
|--------------|-------|------------|
| Standard Hoodie | $55 | $75 |
| Kids Hoodie | $55 | $75 |
| Customize Hoodie | $65 | $85 |
| Shirt | $28 | $35 (optional) |
| Blanket | $65 | $85 (optional) |

---

### Collections Check

Verify these collections exist and have the right products:

| Collection | Handle | Contains |
|------------|--------|----------|
| Giant Hoodies | `giant-hoodies` | All adult hoodies |
| Kids Giant Hoodies | `kids-giant-hoodies` | All kids hoodies |
| Best Sellers | `best-sellers` | Manually curated |
| New Arrivals | `latest-products` or `new-arrivals` | Auto by date or manual |

**To check handle:**
1. Go to collection
2. Look at URL: `admin/collections/[HANDLE]`
3. Or scroll to bottom of collection page → "Search engine listing" → URL handle

The theme code references these handles. If they're different, tell Claude Code.

---

## 4. Shipping Setup

### Shipping Rates
Verify your shipping profiles have:

| Condition | Rate |
|-----------|------|
| Orders under $75 | $4.95 |
| Orders $75+ | FREE ($0) |

**To check/edit:**
```
Settings → Shipping and delivery → Manage rates
```

Edit your shipping zones to add a rate based on order price:
- Condition: "Based on order price"
- Minimum: $0, Maximum: $74.99 → Rate: $4.95
- Minimum: $75, Maximum: (blank) → Rate: $0 (Free)

---

## 5. Cleanup Before Launch

### Old Discount Codes

You mentioned having thousands of old discount codes. Before launch:

1. Go to **Discounts**
2. Filter by "Code" (not Automatic)
3. Review which are still needed:
   - Influencer codes → KEEP (but they won't stack with auto discounts)
   - Old promos → DEACTIVATE or DELETE
   - B2G1 codes → DELETE (replaced by volume pricing)

**Bulk deactivate:**
1. Select multiple discounts
2. "Bulk actions" → "Deactivate"

### Old Free Gift Products

If you have products that were used as free gifts (tote bag, mystery shirt):
- Keep them if you still sell them
- Remove any special pricing/tags related to old tier system
- They're now just regular products

---

## 6. Theme Installation

### On Dev Store
1. Go to Online Store → Themes
2. "Add theme" → Visit Theme Store → Find Fabric (free)
3. Add to theme library
4. Do NOT publish yet

### On Live Store
Same process — add Fabric to library but don't publish. Claude Code works on the unpublished version.

### Give Claude Code Access

If using Shopify CLI, Claude Code needs a staff account or collaborator access with theme permissions.

Or, share the theme files directly if working outside CLI.

---

## 7. Pre-Launch Checklist

### Products
- [ ] All hoodies have compare-at price = $75
- [ ] Customize hoodies have compare-at = $85 (reflects +$10)
- [ ] Non-tier products have appropriate compare-at (or blank)
- [ ] Products to exclude are tagged `not-tier-eligible`

### Collections
- [ ] "Giant Hoodies" collection exists with correct handle
- [ ] "Kids Giant Hoodies" collection exists with correct handle
- [ ] All hoodies are in the appropriate collection

### Discounts
- [ ] "2 Hoodies" automatic discount created (paused)
- [ ] "3+ Hoodies" automatic discount created (paused)
- [ ] Priority set correctly (3+ above 2)
- [ ] Both apply to correct collections
- [ ] Both exclude `not-tier-eligible` products
- [ ] Old conflicting discount codes deactivated

### Shipping
- [ ] $4.95 rate for orders under $75
- [ ] FREE shipping for orders $75+

### Theme
- [ ] Fabric installed (unpublished)
- [ ] Claude Code has access
- [ ] Preview link works

---

## 8. Launch Day Checklist

In this order:

1. **Final preview test** — Walk through full purchase flow
2. **Publish theme** — Online Store → Themes → Fabric → Publish
3. **Activate discounts:**
   - Edit "2 Hoodies" → Set start date to NOW or "Active"
   - Edit "3+ Hoodies" → Set start date to NOW or "Active"
4. **Test live** — Make a real test purchase (refund yourself after)
5. **Monitor** — Watch for the first hour, check Shopify Analytics

---

## 9. Quick Reference: The Math

For when you need to double-check:

### Volume Pricing
| Qty | Price Each | You Pay | Compare-At Total | Savings |
|-----|------------|---------|------------------|---------|
| 1 | $55 | $55 | $75 | $20 |
| 2 | $45 | $90 | $150 | $60 |
| 3 | $39 | $117 | $225 | $108 |
| 4 | $39 | $156 | $300 | $144 |
| 5 | $39 | $195 | $375 | $180 |

### Discount Amounts
| Tier | Base Price | Target Price | Discount Amount |
|------|------------|--------------|-----------------|
| 1 hoodie | $55 | $55 | $0 (no discount) |
| 2 hoodies | $55 | $45 | $10 off each |
| 3+ hoodies | $55 | $39 | $16 off each |

### Shipping Threshold
- 1 hoodie ($55) → $20 away from free shipping
- 2 hoodies ($90) → FREE shipping ✓
- Hoodie + Shirt ($55 + $28 = $83) → FREE shipping ✓

---

## Questions?

If any of this is unclear or you hit a snag in Shopify Admin, ask me (Claude in this chat) and I'll clarify.

Claude Code handles the theme. You handle Shopify Admin. This doc is your playbook.
