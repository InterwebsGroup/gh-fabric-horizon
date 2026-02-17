# Page CRO Audit — Giant Hoodies

**Audit Date:** 2026-02-16

## Traffic Context (Critical for All Recommendations)

- **New customers**: Almost exclusively Meta ads → cold traffic that's seen a specific ad creative. They land expecting to see what the ad showed them.
- **Existing customers**: Email and SMS via Klaviyo → warm traffic, already know the brand.

This means the site needs to do two jobs simultaneously:
1. **Convert cold Meta ad traffic** — fast trust-building, message match, clear path to purchase
2. **Convert warm returning traffic** — easy navigation, new products, volume pricing incentive

---

## Homepage CRO

**Current section order:**
1. Hero ("Your New Favorite Oversized Hoodie" / "Prices just dropped. This is your sign to get cozy.")
2. Stats bar (225K+ customers, 4.9★, 30-day guarantee)
3. Press logos (Oprah, GMA, Forbes, etc.)
4. Best Sellers grid (8 products)
5. Category tiles (6 tiles)
6. Shop Kids grid (4 products)
7. Value props (4 cards)
8. Feature: Oversized
9. Feature: Trendy
10. Feature: Guarantee
11. Comparison table (vs Oodie)
12. Testimonials
13. Newsletter
14. Reviews
15. FAQs

**Plus:** Volume pricing banner at top of every page ("Buy 2 hoodies, save $XX. Buy 3+, save $XX+.")

### Quick Wins

**A. Hero subheadline is vague and temporary-sounding**
- Current: "Prices just dropped. This is your sign to get cozy."
- Problem: "Prices just dropped" sounds like a sale that will end, but it's the everyday pricing. Creates false urgency or confusion.
- **Recommendation:** Match the ad messaging. If Meta ads show the product + price, the landing page should reinforce that immediately.
- Alternatives:
  - "The softest, coziest hoodie you'll ever own. Starting at $39."
  - "225,000+ happy customers. 7,000+ designs. One perfect level of cozy."
  - "Like wearing a hug. Seriously."

**B. Hero CTA is generic**
- Current: "Shop All Hoodies"
- Problem: For cold Meta ad traffic, "Shop All" means browsing 7,000+ products with no guidance. That's overwhelming.
- **Recommendation:** Add a secondary CTA or change primary:
  - "Shop Best Sellers" (curated, less overwhelming)
  - Keep "Shop All Hoodies" as secondary, add "Shop Best Sellers" as primary

**C. Value props section is buried at position 7**
- The 4 value prop cards (8oz Sponge Fleece, Hand-Printed USA, 200+ Designs, Wearable Blanket) are below two product grids and category tiles.
- **Problem:** Cold Meta traffic needs to understand *what this is* before browsing products. They saw an ad, clicked, but haven't bought in.
- **Recommendation:** Move value props UP — either directly after the stats bar/press logos, or integrate key value props into the hero section itself.

### High-Impact Changes

**D. Homepage is very long — 15 sections**
- For Meta ad traffic, long pages can work BUT only if the path to purchase is clear at every scroll point.
- **Issue:** There are product grids at positions 4, 5, and 6 but no CTA reinforcement between them. Someone scrolling through Best Sellers who doesn't find what they want may bounce before hitting the trust-building sections below.
- **Recommendation:** Add a "Shop by Category" or "Find Your Perfect Hoodie" CTA between major sections. Make it easy to enter the funnel at any point.

**E. Comparison table (vs Oodie) placement**
- Currently at position 11, very far down.
- If people are coming from Meta ads, they may already know Oodie. This comparison is a conversion weapon.
- **Test idea:** Move the comparison table higher (after Best Sellers or after value props).

**F. No visible "what is this?" explanation above the fold**
- The hero says "Your New Favorite Oversized Hoodie" but doesn't explain the core concept: it's a wearable blanket, not a regular hoodie.
- Cold traffic from Meta may get this from the ad creative, but anyone arriving from a share or organic needs it immediately.
- **Recommendation:** Add a one-liner in the hero or immediately below: "It's a wearable blanket. One size. Giant on purpose."

### Test Ideas

- **Hero image**: Test lifestyle photo (person wearing it on couch) vs. product-only shot. Lifestyle may convert better for "I want that feeling" impulse buyers from Meta.
- **Stats bar**: Test moving it INTO the hero section (overlay) vs. below it. Immediate social proof within the hero could increase scroll engagement.
- **Product grid count**: Test showing 4 Best Sellers vs. 8. Less choice = faster decision for cold traffic.

---

## Collection Page CRO

**Current structure:**
1. Volume pricing banner (sticky)
2. Collection header with banner image, headline ("Shop Hoodies"), filter buttons (Best Sellers, New Items, Limited Drops)
3. Product grid (24 products per page, 4-col desktop / 2-col mobile)

**Product cards show:** Title, price (sale price first), color swatches

### Quick Wins

**A. Collection description is empty**
- `collection_banner_subheadline` is set to `""` — no description text.
- **Problem:** Missed SEO opportunity AND missed chance to reinforce value prop for cold traffic.
- **Recommendation:** Add a short description: "Intentionally oversized. Impossibly soft. Made in the USA. Starting at $39 when you buy 3+."

**B. No trust signals on collection page**
- Once someone leaves the homepage and lands on the collection page, all social proof disappears. No review count, no press logos, no guarantee mention.
- **Recommendation:** Add a slim trust bar below the collection header: "★ 4.9 stars · 225,000+ customers · 30-day guarantee · Made in USA"

**C. Filter buttons are limited**
- Only 3 filters: Best Sellers, New Items, Limited Drops
- With 7,000+ designs, browsing needs more guidance.
- **Recommendation:** Add theme-based filter buttons (Animals, Funny, Holidays, etc.) — these map directly to existing collections.

### High-Impact Changes

**D. No volume pricing context on product cards**
- Cards show the per-unit price but don't reinforce the multi-buy savings.
- The sticky volume pricing banner helps, but it's easy to ignore banners.
- **Recommendation:** Add a small "As low as $39" or "Buy 3+ save $108+" badge on product cards or near the price.

**E. 24 products per page with no infinite scroll**
- `enable_infinite_scroll` is set to `false`. After 24 products, users must click to page 2.
- **Problem:** Pagination kills momentum, especially on mobile. People don't click page 2.
- **Recommendation:** Enable infinite scroll, or increase products per page to 48-72 for mobile where scroll is natural.

### Test Ideas

- **Sort default**: Test "Best Selling" vs. "Newest" as default sort. Best selling shows proven winners to cold traffic.
- **Product card info**: Test adding a "SAVE $20" badge on each card vs. clean cards. Could increase urgency or could clutter.

---

## Product Page CRO

**Current structure:**
1. Image gallery (2×2 grid desktop / single hero mobile)
2. Product title + price ($55, ~~$75~~, Save $20)
3. Color swatches (62 colors, 42px)
4. Volume pricing tiers (Hollow Socks-inspired)
5. Add to Cart button with dynamic price
6. Selling-points strip (terracotta bg)
7. Trust bar (Free shipping $75+, 30-Day Guarantee, Made in USA)
8. Press logos
9. Stats bar (reviews, customers, guarantee)
10. Offer banner (image)
11. FAQ accordions (5)
12. Product description ("What is it?")
13. Judge.me reviews widget
14. Mobile sticky ATC

**`show_tier_pricing` is set to `false` in product.json.**

### Quick Wins

**A. Volume pricing tiers are TURNED OFF**
- `"show_tier_pricing": false` in `templates/product.json`
- This is arguably the strongest conversion lever on the entire site. "Buy 2, save $60. Buy 3+, save $108+" is a massive incentive.
- **Recommendation:** Turn this on immediately. This is a quick settings change.

**B. 62 color swatches may be overwhelming**
- 62 swatches at 42px each = a LOT of visual noise.
- **Problem:** Choice paralysis. People see 62 options and freeze.
- **Recommendation:** Show top 10-15 colors by default with a "View all 62 colors" toggle. Reduces overwhelm while keeping full selection accessible.

**C. Product description section is buried below FAQs and reviews**
- "What is it?" description is at the bottom after Judge.me reviews.
- **Problem:** For cold Meta traffic who land directly on a product page (likely from a product-specific ad), they need to understand what a Giant Hoodie IS before they'll buy.
- **Recommendation:** Move product description above or into the main product info column. Or add a brief "what this is" blurb in the info column itself.

### High-Impact Changes

**D. No urgency for Meta ad traffic**
- Cold traffic from paid ads has the shortest attention span. They need a reason to buy NOW vs. "I'll think about it."
- Rightly banned fake urgency (no fake countdown timers, no fake "X people viewing").
- **Real urgency options:**
  - Show actual low-stock warnings (already built, triggers at <10 inventory)
  - Emphasize the volume discount: "Add a 2nd hoodie and save $20 more"
  - Shipping speed: "Order by [time] for same-day shipping" (if true)

**E. Social proof is far from the Add to Cart button**
- Stats bar and testimonials are below the selling-points strip and trust bar.
- **Problem:** At the moment of decision (hovering over Add to Cart), the customer doesn't see "225,000+ happy customers" or "4.9 stars."
- **Recommendation:** Add a compact review summary (stars + count) directly near the product title or just above Add to Cart. Judge.me likely has a summary widget for this.

**F. Mobile sticky ATC doesn't show savings**
- The mobile sticky Add to Cart bar appears on scroll, but does it show the savings? ("Save $20" or "You're saving $60 with 2 hoodies")
- **Recommendation:** Include savings messaging in the sticky ATC bar. At the point of purchase, reinforcing the deal helps close.

### Test Ideas

- **Gallery layout**: Test 2×2 grid vs. single hero with thumbnails on desktop. The 2×2 shows more angles upfront but may reduce focus on the main product shot.
- **CTA button copy**: Test "Add to Cart" vs. "Add to Cart — Save $20" vs. "Get Yours — $55"
- **FAQ placement**: Test FAQs in the right column (alongside product info) vs. full-width below. Above-the-fold FAQ access could reduce bounce.

---

## Cross-Page Observations

### 1. Volume pricing banner is doing a lot of work
The global volume pricing banner at the top of every page is the primary way customers learn about the multi-buy savings. If this gets ignored (banner blindness), the entire pricing strategy loses its punch.
- **Recommendation:** Reinforce volume pricing at multiple touchpoints — collection cards, product page, cart drawer. Don't rely solely on the banner.

### 2. Cart drawer upsell is strong
The cart drawer's dynamic upsell messages ("Add a 2nd hoodie — save $20 more + FREE shipping!") are well-designed. This is one of the strongest conversion elements on the site.
- **Make sure this is actually working.** The upsell messages depend on hoodie counting logic — periodically verify the messages change correctly as items are added.

### 3. No exit intent or abandoned browse recovery on-site
- For cold Meta traffic that doesn't buy, there's no mechanism to capture them besides the newsletter popup.
- **Recommendation:** Consider a browse abandonment trigger — after 30s+ on a product page without adding to cart, show a subtle slide-in with the volume pricing deal or a testimonial.

---

## Prioritized Action Plan

### Do This Week (Settings Changes)
1. Turn on `show_tier_pricing: true` in product.json
2. Add collection description text
3. Test changing hero subheadline to something less sale-temporary

### Do Next (Code/Content Changes)
4. Add compact review stars near product title (Judge.me summary widget)
5. Move value props section higher on homepage
6. Add trust bar to collection page
7. Enable infinite scroll or increase products per page

### Test When Ready
8. Hero CTA: "Shop All Hoodies" vs. "Shop Best Sellers"
9. Color swatch count: all 62 vs. top 15 with toggle
10. Comparison table placement on homepage
11. Product card volume pricing badge
