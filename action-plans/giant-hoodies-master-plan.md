# Master Implementation Plan — Giant Hoodies

**How to use this document:** Start at #1 and work down. When you stop, note where you are. Next time you sit down, pick up where you left off. Every item is independent enough to be a stopping point. Section headers are just for scanning — the numbered list is your single path through.

Each item references the source document where full details, rationale, and exact copy/code live. Open that doc when you're ready to work on the item.

---

### Overview

55 items, one sequential list, top to bottom.

- **#1-4** — Quick fixes (tier pricing is OFF, typo, bloated title tags, banned copy). Under 15 minutes total, massive impact.
- **#5-11** — Schema markup. One coding session, all the JSON-LD. Starts the clock on rich results in Google.
- **#12-18** — Homepage copy. Everything visitors see first from Meta ads.
- **#19-21** — Homepage structure. Section reordering, mid-page CTAs.
- **#22-24** — Product page. Review stars near ATC, description placement, mobile sticky savings.
- **#25-30** — Collection page + SEO meta content. Trust bar, infinite scroll, meta descriptions.
- **#31-35** — Existing 54 collection SEO (batched by ~15 collections).
- **#36-38** — New themed, persona, and gift collections.
- **#39-51** — Blog posts, individually listed in impact order.
- **#52-55** — Ongoing maintenance.

Every item references its source doc so you can open a new tab with the full details. Each item has a time estimate. You start at #1, work as far as you can, and pick up exactly where you left off next time.

---

### Quick Fixes

These are broken, turned off, or embarrassing. Each takes minutes and has outsized impact.

- [ ] **0. Add social profile URLs in Shopify Admin** — ~2 min
  Shopify Admin → Settings → Brand → Social media accounts. Add URLs for Facebook, Instagram, TikTok, and any other active profiles. This populates the `sameAs` array in the Organization schema (#10) so Google associates your social accounts with your brand.

- [x] **1. Turn on volume tier pricing on product page** — ~5 min
  Already live. `product.hoodie.json` (the template hoodies actually use) omits `show_tier_pricing`, so it defaults to `true` per the schema. The `product.json` default template has it `false`, but that's not used by hoodies.
  *Source: Page CRO, Product Quick Win A*

- [x] **2. Fix "with by" typo in bottom section** — ~2 min
  `templates/index.json` → bottom section text. Remove the extra word so it reads "...from Fayetteville, Arkansas by our incredible team of 5."
  *Source: Copy Edit, Issue #4*

- [x] **3. Shorten shop.name in title tags** — ~2 min
  Shopify Admin store name is locked (Shopify Capital balance). Fixed in theme code instead: `snippets/meta-tags.liquid` line 130 — hardcoded "Giant Hoodies" in the title tag suffix instead of `{{ shop.name }}`. Same result, no truncation.
  *Source: SEO Audit, Issue #1*

- [x] **4. Remove banned copy from slideshow slide 1** — ~5 min
  `templates/index.json` → slideshow section, slide 1. Replace "One size fits most, there's only one size! Maximum comfort, maximum relaxation." — the exact phrase is listed under Language to AVOID in the copy spec.
  Quick swap only. Full slideshow rewrite comes at #16.
  *Source: Copy Edit, Issue #1*

---

### Schema Markup

One-time code changes. Once deployed, they passively improve how the site appears in Google — star ratings, FAQ dropdowns, breadcrumb trails, search box. The sooner these go live, the sooner Google starts processing them (can take weeks to appear).

Full Liquid code for every item below is in the Schema Markup doc.

- [x] **5. Add AggregateRating to Product schema** — ~15 min
  `sections/product-main.liquid` → expand existing Product JSON-LD. Adds star ratings pulled from Judge.me metafields (`product.metafields.reviews.rating`). Also adds `sku` and all product images instead of just the featured image. Judge.me does not inject its own JSON-LD, so no duplication risk.
  *Source: Schema Markup, #1*

- [x] **6. Add FAQPage schema to product pages** — ~15 min
  `sections/product-main.liquid` → add a second `<script type="application/ld+json">` block after the Product schema. Pulls from the 8 FAQ accordion questions on the hoodie template. Enables expandable Q&A rich results in Google.
  *Source: Schema Markup, #2*

- [x] **7. Add twitter:image meta tag** — ~5 min
  Done. Added `twitter:image` meta tag after `twitter:description` in `snippets/meta-tags.liquid`.
  *Source: Schema Markup, #7*

- [x] **8. Add WebSite schema with SearchAction** — ~10 min
  Done. Added WebSite JSON-LD with SearchAction to `snippets/meta-tags.liquid`, homepage only.
  *Source: Schema Markup, #4*

- [x] **9. Add BreadcrumbList schema** — ~15 min
  Done. Created `snippets/breadcrumb-schema.liquid` and rendered from `layout/theme.liquid`. Outputs Home → Collection → Product breadcrumb trail.
  *Source: Schema Markup, #3*

- [x] **10. Enhance Organization schema** — ~15 min
  Done. Expanded Organization JSON-LD in `sections/header.liquid` with `sameAs` (social profiles), `contactPoint`, and `address` (Fayetteville, AR). Social links render dynamically — if none are set in Shopify Admin, the `sameAs` array is simply omitted.
  *Source: Schema Markup, #5*

- [x] **11. Add CollectionPage/ItemList schema** — ~15 min
  Create new `snippets/collection-schema.liquid` and render from `layout/theme.liquid` on collection pages. Lists first 12 products as an ItemList.
  *Source: Schema Markup, #6*

---

### Homepage Copy

The homepage is what every Meta ad visitor sees. These fixes affect above-the-fold and high-visibility sections. Full replacement copy for each is in the Copy Edit doc.

- [ ] **12. Fix hero subheadline** — ~10 min
  `templates/index.json` → hero section. Replace "Prices just dropped. This is your sign to get cozy." — it's ambiguous (is this a sale?), unproven, and temporary-sounding for what is actually everyday pricing. Replace with a specific, evergreen value prop.
  *Source: Copy Edit, Issues #2 + #13; Page CRO, Homepage Quick Win A*

- [ ] **13. Add risk reducer below hero CTA** — ~10 min
  `templates/index.json` → hero section. The "Shop All Hoodies" button stands alone with no reassurance. Add a line below it: "Free shipping $75+ · 30-Day Guarantee · Made in USA"
  *Source: Copy Edit, Issue #18; Page CRO, Homepage Quick Win B*

- [x] **14. Add "What's a Giant Hoodie?" as visible heading above slideshow** — ~10 min
  `templates/index.json` → slideshow section. The section is named "What's a Giant Hoodie?" in the editor but the question never appears on the page. Add it as a visible heading. This is exactly the question cold Meta ad traffic is asking themselves.
  *Source: Copy Edit, Issue #5*

- [x] **15. Change "Hear from Others!" to "What the Hoodie Fam Says"** — skipped
  Keeping "Hear from Others!" — it's better than the suggested "What the Hoodie Fam Says." Current copy works, no change needed.
  *Source: Copy Edit, Issue #8*

- [x] **16. Rewrite all 5 slideshow slides** — skipped
  Reviewed all 5 slides against suggested rewrites. Current copy is stronger. No changes needed.
  *Source: Copy Edit, Issues #6, #7, #10, #11, #16, #17 (Sweeps 2, 3, 5, 6)*

- [x] **17. Add CTA after comparison table** — ~10 min
  Done. Added a centered "Shop All Hoodies" button section (`cta_after_comparison`) in `templates/index.json` between the comparison table and reviews.
  *Source: Copy Edit, Issues #12 + #19*

- [x] **18. Fix collection page banner copy** — skipped
  Current banner copy is fine. No change needed.
  *Source: Copy Edit, Collection Page Copy section*

---

### Homepage Structure

These are section reordering and structural changes that affect how visitors flow through the page.

- [ ] **19. Move value props section higher on homepage** — ~20 min
  `templates/index.json` → reorder sections. The 4 value prop cards (8oz Sponge Fleece, Hand-Printed USA, 200+ Designs, etc.) are buried at position 7 below two product grids. Cold Meta traffic needs to understand *what this is* before browsing products. Move to after stats bar/press logos.
  *Source: Page CRO, Homepage Quick Win C*

- [x] **20. Add mid-page CTAs between product grids** — ~20 min
  Done. Added two CTA sections in `templates/index.json`: "Shop by Category" after Best Sellers, "Find Your Perfect Hoodie" after New Drops.
  *Source: Page CRO, Homepage High-Impact D*

- [x] **21. Rewrite bottom section** — skipped
  Keeping current copy — it's better than the suggested replacement.
  *Source: Copy Edit, Issues #9 + #14*

---

### Product Page

These affect the product page where the actual purchase decision happens.

- [x] **22. Add review stars/summary near product title** — ~20 min
  `sections/product-main.liquid` or `templates/product.hoodie.json`. Add a compact Judge.me review summary (stars + count) near the product title or just above Add to Cart. Currently the social proof (stats bar, testimonials) is far below the ATC button — at the moment of decision, the customer doesn't see "4.9 stars."
  *Source: Page CRO, Product High-Impact E*

- [x] **23. Move product description above FAQs and reviews** — already done
  Product description is already above FAQs and reviews in the current template. No change needed.
  *Source: Page CRO, Product Quick Win C*

- [x] **24. Add savings messaging to mobile sticky ATC** — already done
  Already implemented. `sections/product-main.liquid` line 536-539 shows dynamic "Save {{ savings_amount | money }}" in the sticky ATC when a compare-at price exists.
  *Source: Page CRO, Product High-Impact F*

---

### Collection Page

These improve the page where visitors browse products after leaving the homepage.

- [ ] **25. Write main collection description** — ~15 min
  Shopify Admin → Collections → Hoodies → Description field. Currently empty. Write something like: "Intentionally oversized. Impossibly soft. Made in the USA. Starting at $39 when you buy 3+." This serves both visitors (context) and Google (indexable content).
  *Source: Page CRO, Collection Quick Win A; SEO Audit, Issue #3*

- [x] **26. Add trust bar to collection page** — skipped
  Volume pricing banner already serves this role on collection pages. Sale messaging is stronger than social proof here.
  *Source: Page CRO, Collection Quick Win B*

- [x] **27. Enable infinite scroll or increase products per page** — skipped
  Keeping pagination. Better for SEO (paginated URLs get indexed), and with a large catalog, pages help customers remember where a design was.
  *Source: Page CRO, Collection High-Impact E*

---

### SEO Meta Content

Writing meta descriptions and collection page content. This is content that Google shows in search results and affects click-through rate.

- [ ] **28. Write homepage meta description** — ~10 min
  Shopify Admin → Online Store → Preferences → Meta description. Currently may be blank — if so, Google auto-generates a snippet from page content. Write a compelling 150-160 character description with key selling points.
  *Source: SEO Audit, Issue #3*

- [ ] **29. Write meta descriptions for top 10 collections** — ~45 min
  Shopify Admin → each collection → SEO section. Prioritize the most-visited: hoodies, best-sellers, kids-giant-hoodies, funny, animals, cats, dogs, christmas, latest-products, limited-releases. 150-160 characters each with the collection's unique angle + a reason to click.
  *Source: SEO Audit, Issue #3*

- [x] **30. Fix remaining low-priority copy issues** — skipped
  Current copy is fine. No changes needed.
  *Source: Copy Edit, Issues #3, #15, #16*

---

### Existing Collection SEO

54 collection pages already exist and are already indexed by Google. They just need unique SEO content. This is the highest-ROI content work — each page targets a distinct keyword and the content is short (2-3 sentence description + meta title + meta description).

The Programmatic SEO doc has a description template and the full list of all 54 collections organized by category.

- [x] **31. Audit all 54 existing collections** — ~60 min
  Done. Audit checklist created in `giant-hoodies-collection-seo-content.md` → Task 31 section. Table lists all 54 collections with columns for SEO title, meta description, visible description, and collection image. Fill in Y/N for each as you go through Shopify Admin.
  *Source: Programmatic SEO, Phase 1; SEO Audit, Issue #6*

- [x] **32. Write SEO content for collections 1-10** — ~90 min
  Done. All content written in `giant-hoodies-collection-seo-content.md` → Task 32 section. Covers: hoodies, best-sellers, kids-giant-hoodies, funny, animals, cats, dogs, christmas, latest-products, limited-releases. Each has SEO title (under 60 chars with auto-appended suffix), meta description (145-160 chars), and 2-3 sentence visible description.
  *Source: Programmatic SEO, Phase 2; SEO Audit, Issues #6 + #8*

- [x] **33. Write SEO content for collections 11-20** — ~90 min
  Done. All content in `giant-hoodies-collection-seo-content.md` → Task 33 section. Covers: halloween, for-her, for-him, blankets, sarcasm, positivity, mental-health, retro, pop-culture, zodiac.

- [x] **34. Write SEO content for collections 21-35** — ~90 min
  Done. All content in `giant-hoodies-collection-seo-content.md` → Task 34 section. Covers: family, food, tacos, home-life, travel, work, earth, space, swifties, valentines-day, thanksgiving, shirts, sweatshirts, joggers, accessories.

- [x] **35. Write SEO content for collections 36-54** — ~90 min
  Done. All content in `giant-hoodies-collection-seo-content.md` → Task 35 section. Covers: bleach-dye, full-color-prints, blank-hoodies, embroidered-heart-limited-drop, holidays, new-years, st-patricks-day, hanukkah, kwanzaa, may-the-fourth, spring, summer, back-to-school, recommended, retail-favorites, all-products, mystery-boxes, other-clothing, customize-your-own.

---

### New Collections

Creating net-new collection pages that target keywords people are actually searching for. These build on the existing product catalog — automated collections pull in matching products automatically.

- [ ] **36. Create themed collections (top 10-15 by search volume)** — ~3 hrs
  Shopify Admin → Collections → Create automated collections. Use product title/type conditions. Write unique description + SEO title + meta description for each. Minimum 6 products per collection.
  *Source: Programmatic SEO, Playbook 1*

  **Klaviyo Data (200 Ordered Product events, Feb 15-17 2026):**
  Existing collections already cover: cats, dogs, funny, sarcasm, animals, travel, spring, christmas, blank-hoodies. The NEW themed collections below don't exist yet but have real purchase/browse signal:

  Priority order based on actual orders + views:
  1. **zip-up-hoodies** — 24 units ordered (2nd highest product). Currently only a tag, not a collection. Massive demand.
  2. **tie-dye-hoodies** — 7 units ordered (Cotton Candy Tie Dye=5, Purple Rose Tie Dye=2). No existing collection.
  3. **heart-hoodies** — 6 units across Heart (2), Hearts All Over (2), Paw Heart (2). Valentine's Day tag=6. No dedicated collection.
  4. **dinosaur-hoodies** — Reading Dino=3 orders. Dino Dan + Little Dino Embroidered also viewed. Kid + adult appeal.
  5. **polka-dot-hoodies** — 3 units ordered (Polka Dot Giant Hoodie).
  6. **butterfly-hoodies** — 2 units ordered (Butterfly Outline).
  7. **unicorn-hoodies** — 2 units ordered.
  8. **music-hoodies** — 2 units ordered (Music Notes).
  9. **floral-hoodies** — Daisy Flowers viewed; spring tag=4 orders. SEO doc recommends.
  10. **anime-hoodies** — No Klaviyo signal (collection doesn't exist to capture it), but SEO doc recommends for high search volume.
  11. **patriotic-hoodies** — No Klaviyo signal, but fits Made in USA angle per SEO doc.
  12. **space-hoodies** — Small signal (Space Ship=1 order, space tag=3).

  Top selling colors (for reference when curating): Heather Forest (19), Slate Blue (15), Black (12), Dark Gray (11), Heather Maroon (10), Teal (9), Heather Navy (9), Purple (8), Hot Pink (8).

  **Adzviser Data (GA4 + Search Console, Nov 20 2025 – Feb 17 2026):**

  *Search Console — queries relevant to themed collections (out of 1,000 top queries, 5,679 total clicks):*

  | Theme | GSC Clicks | GSC Impressions | Top Query (clicks) |
  |-------|-----------|----------------|-------------------|
  | zip / zip up | 36 | 4,944 | "oversized zip up hoodie" 14 clicks, 2,750 impr |
  | blanket | 76 | 11,042 | "giant blanket" 20 clicks, "giant hoodie blanket" 18 clicks |
  | polka dot | 9 | 9,799 | "polka dot hoodie" 5 clicks / 4,861 impr, "polka dot sweatshirt" 1 click / 4,478 impr |
  | tie dye | 3 | 111 | "tie dye oversized hoodie" 2 clicks, "oversized tie dye hoodie" 1 click |
  | cozy | 8 | 865 | "cozy oversized hoodie" 3 clicks |
  | cat | 6 | 502 | "cat mom hoodie" 2 clicks, "oversized cat hoodie" 2 clicks |
  | funny | 4 | 1,946 | "funny hoodies" 2 clicks / 1,337 impr |
  | christmas | 2 | 118 | "oversized christmas hoodie" 1 click / 104 impr |
  | kids | 2 | 115 | "oversized sweatshirt for kids" 1 click |
  | music | 1 | 241 | "music note hoodie" 1 click / 241 impr |
  | heart | 0 | 0 | No queries found |
  | dinosaur | 0 | 1 | 1 impression, no clicks |
  | butterfly | 0 | 0 | No queries found |
  | unicorn | 0 | 0 | No queries found |
  | anime | 0 | 0 | No queries found |
  | floral | 0 | 0 | No queries found |
  | patriotic | 0 | 0 | No queries found |
  | space | 0 | 0 | No queries found |

  *Search Console — collection landing pages with organic traffic:*

  | Collection | GSC Clicks | GSC Impressions | CTR | Avg Position |
  |-----------|-----------|----------------|-----|-------------|
  | /collections/hoodies | 353 | 81,607 | 0.43% | 8.5 |
  | /collections/shirts | 73 | 40,439 | 0.18% | 7.2 |
  | /collections/mystery-boxes | 32 | 1,850 | 1.73% | 11.0 |
  | /collections/kids-giant-hoodies | 30 | 20,757 | 0.14% | 7.9 |
  | /collections/best-sellers | 27 | 55,574 | 0.05% | 6.2 |
  | /collections/funny | 19 | 4,585 | 0.41% | 14.6 |
  | /collections/for-him | 10 | 1,183 | 0.85% | 10.6 |
  | /collections/food | 7 | 949 | 0.74% | 8.9 |
  | /collections/zodiac | 6 | 3,461 | 0.17% | 9.6 |
  | /collections/mental-health | 6 | 838 | 0.72% | 12.2 |
  | /collections/bleach-dye | 5 | 4,366 | 0.11% | 10.9 |
  | /collections/christmas | 5 | 1,533 | 0.33% | 9.0 |
  | /collections/for-her | 5 | 413 | 1.21% | 5.9 |
  | /collections/cats | 4 | 1,537 | 0.26% | 10.3 |
  | /collections/blank-hoodies | 3 | 5,875 | 0.05% | 14.0 |
  | /collections/valentines-day | 1 | 1,722 | 0.06% | 10.7 |

  *GA4 — collection page engagement (sessions + add-to-cart rate):*

  | Collection | Sessions | Engaged Sessions | Engagement Rate | Add-to-Carts |
  |-----------|----------|-----------------|----------------|-------------|
  | Best Sellers | 13,886 | 9,914 | 71.4% | 2 |
  | Zip Up Giant Hoodie | 7,842 | 4,948 | 63.1% | 1,856 |
  | New Arrivals | 6,021 | 3,537 | 58.7% | 7 |
  | Giant Shirts | 4,908 | 4,255 | 86.7% | 1 |
  | Giant Blanket | 4,247 | 3,700 | 87.1% | 890 |
  | Mystery Boxes | 2,719 | 1,691 | 62.2% | 1 |
  | Funny | 2,174 | 1,742 | 80.1% | 0 |
  | Cats | 2,010 | 1,501 | 74.7% | 1 |
  | Joggers | 1,798 | 1,613 | 89.7% | 511 |
  | Other Clothing | 1,727 | 1,644 | 95.2% | 0 |
  | Positivity | 1,688 | 1,236 | 73.2% | 1 |
  | Family | 1,443 | 1,040 | 72.1% | 0 |
  | Dogs | 1,288 | 794 | 61.6% | 0 |
  | Accessories | 1,226 | 1,149 | 93.7% | 8 |
  | Animals | 655 | 602 | 91.9% | 0 |
  | Food | 533 | 285 | 53.5% | 0 |
  | Retro | 411 | 382 | 92.9% | 0 |
  | Pop Culture | 335 | 309 | 92.2% | 0 |
  | Zodiac | 289 | 261 | 90.3% | 0 |
  | Travel | 147 | 144 | 98.0% | 0 |
  | Space | 116 | 109 | 94.0% | 0 |
  | Spring | 70 | 63 | 90.0% | 0 |
  | Christmas | 25 | 18 | 72.0% | 0 |

  *GA4 — top product pages by add-to-cart rate (relevant to themed collections, min 100 sessions):*

  | Product | Sessions | ATCs | ATC Rate |
  |---------|----------|------|---------|
  | Paw Heart Giant Hoodie | 1,738 | 744 | 42.8% |
  | Vibrant Earth Tie Dye | 647 | 227 | 35.1% |
  | Ocean Two Tone | 869 | 299 | 34.4% |
  | Smoke Two Tone | 921 | 314 | 34.1% |
  | Cotton Candy Tie Dye | 1,766 | 453 | 25.7% |
  | Cat Mom | 1,027 | 333 | 32.4% |
  | Dog Mom | 921 | 297 | 32.2% |
  | Heart Giant Hoodie | 933 | 300 | 32.2% |
  | Puppy Love | 878 | 272 | 31.0% |
  | It Is What It Is | 850 | 266 | 31.3% |
  | Cute Hearts | 1,038 | 221 | 21.3% |
  | Dino Dan | 1,230 | 201 | 16.3% |
  | Polka Dot | 2,575 | 484 | 18.8% |
  | Moon Phases | 975 | 226 | 23.2% |
  | Purple Rose Tie Dye | 951 | 272 | 28.6% |

  **Adzviser verdict on themed collection priority:**
  1. **zip-up-hoodies** — CONFIRMED #1. 7,842 GA4 sessions (2nd highest collection page), 1,856 ATCs, 36 GSC clicks with 4,944 impressions. Massive demand from every data source.
  2. **tie-dye-hoodies** — UPGRADED. Three tie-dye products combined: 3,364 sessions, 952 ATCs, ATC rates 25-35%. Strong product engagement despite no collection page existing.
  3. **heart-hoodies** — CONFIRMED. Heart (933 sessions, 300 ATCs, 32.2%), Paw Heart (1,738 sessions, 744 ATCs, 42.8%), Cute Hearts (1,038 sessions, 221 ATCs). Combined 3,709 sessions, 1,265 ATCs.
  4. **polka-dot-hoodies** — UPGRADED from #5. 2,575 sessions, 484 ATCs on the single product. 9,799 GSC impressions (huge!) but only 9 clicks = massive CTR opportunity with a dedicated collection.
  5. **dinosaur-hoodies** — CONFIRMED. Dino Dan alone: 1,230 sessions, 201 ATCs.
  6. **two-tone-hoodies** — NEW (not in Klaviyo list). Ocean Two Tone (869 sessions, 299 ATCs, 34.4%) + Smoke Two Tone (921 sessions, 314 ATCs, 34.1%). Combined 1,790 sessions, 613 ATCs. Consider adding.
  7. **cat-hoodies** — Already exists but gets 2,010 GA4 sessions. Cat Mom alone: 1,027 sessions, 333 ATCs (32.4%). 6 GSC clicks.
  8. **music-hoodies** — Weak. 1 GSC click, 241 impressions. Moon Phases (975 sessions, 226 ATCs) is related but not exactly "music."
  9. **anime/floral/butterfly/unicorn/patriotic/space** — Zero GSC signal. Pure SEO keyword plays with no current site data to validate.

- [ ] **37. Create persona collections (10-15)** — ~3 hrs
  Shopify Admin → Collections → Manually curated. Each gets a tailored description speaking to that audience.
  *Source: Programmatic SEO, Playbook 2*

  **Klaviyo Data (200 Ordered Product events, Feb 15-17 + 200 Viewed Collection events, Feb 16-17):**
  Existing persona collections: for-her (11 order tags, 4 collection views), for-him (3 order tags), kids-giant-hoodies (4 collection views). These already exist — focus on NEW ones.

  Priority order based on purchase + browsing signal:
  1. **hoodies-for-dog-lovers** — Dogs tag=5 orders, Puppy Love=3 orders, "Dogs Over People" shirt browsed. Strong cross-signal.
  2. **hoodies-for-cat-lovers** — Cats collection membership=75 on ordered products (inflated by Blank Hoodie being tagged into it, but shows the association exists). 2 collection views.
  3. **hoodies-for-swifties** — "swifties" collection already gets 2 views despite being niche. Consider expanding or featuring more prominently.
  4. **hoodies-for-mental-health** — "mental-health" collection browsed. Growing search interest in this niche.
  5. **hoodies-for-work** — "work" collection browsed (1 view), "Out of the Office" product viewed. Remote work persona.
  6. **hoodies-for-gamers** — No direct Klaviyo signal (no collection exists to capture it). SEO doc recommends for search volume.
  7. **hoodies-for-nurses** — No Klaviyo signal. SEO keyword play ("gifts for nurses" has volume).
  8. **hoodies-for-teachers** — No Klaviyo signal. SEO keyword play.
  9. **hoodies-for-couples** — No Klaviyo signal. SEO doc recommends.

  Note: Gamers, nurses, teachers, and couples have no Klaviyo signal because those collections don't exist yet to attract/capture that traffic. These are pure SEO plays based on search volume. Prioritize #1-5 (data-backed) first, then layer in #6-9 for search capture.

  **Adzviser Data (GA4 + Search Console, Nov 20 2025 – Feb 17 2026):**

  *Search Console — persona-related queries:*
  Only 1 persona query found in the top 1,000: "mental health hoodies" (2 clicks, 177 impressions, position 16.3). Zero queries for nurse, teacher, gamer, couple, dog lover, cat lover, swiftie, work, or remote. This confirms these are greenfield SEO opportunities — no existing organic visibility to build on.

  *GA4 — existing persona collection pages:*

  | Collection | Sessions | Engagement Rate | GSC Clicks | GSC Impressions |
  |-----------|----------|----------------|-----------|----------------|
  | Dogs | 1,288 | 61.6% | 0 | 284 |
  | Cats | 2,010 | 74.7% | 4 | 1,537 |
  | For Her | — | — | 5 | 413 |
  | For Him | — | — | 10 | 1,183 |
  | Kids | — | — | 30 | 20,757 |
  | Mental Health | — | — | 6 | 838 |
  | Swifties | — | — | 0 | 78 |
  | Work | — | — | 0 | 63 |

  *GA4 — product pages supporting persona collections (min 100 sessions):*

  | Product (Persona Signal) | Sessions | ATCs | ATC Rate |
  |-------------------------|----------|------|---------|
  | Dog Mom (dog lovers) | 921 | 297 | 32.2% |
  | Puppy Love (dog lovers) | 878 | 272 | 31.0% |
  | Cat Mom (cat lovers) | 1,027 | 333 | 32.4% |
  | Rather Be Reading (bookworms) | 1,133 | 309 | 27.3% |
  | Wheres My Coffee (work/relatable) | 3,171 | 735 | 23.2% |
  | Im Cold (relatable) | 2,403 | 579 | 24.1% |
  | Low Battery (work/relatable) | 483 | 195 | 40.4% |
  | Dino Dan (kids/parents) | 1,230 | 201 | 16.3% |
  | Blank Kid's Giant Hoodie (kids) | 150 | 77 | 51.3% |

  *GA4 — demographics (age/gender):*

  | Segment | Sessions | Conversions | Revenue | Conv Rate |
  |---------|----------|-------------|---------|-----------|
  | Female 25-34 | 3,387 | 163 | $14,126 | 4.81% |
  | Female 35-44 | 5,149 | 186 | $16,637 | 3.61% |
  | Female 45-54 | 4,062 | 168 | $14,462 | 4.14% |
  | Female 55-64 | 4,727 | 215 | $16,963 | 4.55% |
  | Female 65+ | 3,495 | 164 | $13,232 | 4.69% |
  | Female 18-24 | 850 | 30 | $2,933 | 3.53% |
  | Male 25-34 | 1,218 | 57 | $4,940 | 4.68% |
  | Male 35-44 | 1,692 | 73 | $6,524 | 4.31% |
  | Male 45-54 | 1,537 | 70 | $6,122 | 4.55% |
  | Male 55-64 | 1,430 | 66 | $5,637 | 4.62% |
  | Male 65+ | 683 | 33 | $2,637 | 4.83% |
  | Male 18-24 | 726 | 44 | $3,256 | 6.06% |
  | Unknown | 213,080 | 5,545 | $463,697 | 2.60% |

  Demographics insight: Female users outnumber male ~3:1 in sessions (21,670 vs 7,286 known). Highest conversion rate is Male 18-24 (6.06%) — possible gift buyers. Female 25-34 (4.81%) and Female 65+ (4.69%) also convert well. The audience skews heavily female, age 25-64.

  *GA4 — top US states by sessions + conversions:*

  | State | Sessions | Conversions | Revenue | Conv Rate |
  |-------|----------|-------------|---------|-----------|
  | California | 18,190 | 494 | $43,092 | 2.72% |
  | New York | 14,625 | 443 | $35,671 | 3.03% |
  | Texas | 14,052 | 343 | $31,361 | 2.44% |
  | North Carolina | 11,702 | 242 | $21,439 | 2.07% |
  | Ohio | 11,081 | 310 | $25,384 | 2.80% |
  | Pennsylvania | 10,653 | 296 | $23,914 | 2.78% |
  | Illinois | 9,621 | 319 | $26,990 | 3.32% |
  | Michigan | 9,182 | 248 | $19,282 | 2.70% |
  | Florida | 8,756 | 295 | $23,431 | 3.37% |
  | Virginia | 7,924 | 248 | $19,784 | 3.13% |

  Geographic insight: Nearly 100% US-based revenue. Top 10 states account for ~55% of all conversions. Broad geographic spread — no regional concentration that would warrant location-specific persona collections. International traffic (Ireland, Sweden, China) generates sessions but zero conversions, confirming US-only focus is correct.

  **Adzviser verdict on persona collection priority:**
  1. **hoodies-for-dog-lovers** — CONFIRMED. Dog Mom (297 ATCs, 32.2%) + Puppy Love (272 ATCs, 31.0%) = strong product engagement. Dogs collection gets 1,288 sessions.
  2. **hoodies-for-cat-lovers** — CONFIRMED. Cat Mom (333 ATCs, 32.4%) is the strongest single persona product. Cats collection: 2,010 sessions, 4 GSC clicks.
  3. **hoodies-for-bookworms** — NEW (not in Klaviyo list). Rather Be Reading: 1,133 sessions, 309 ATCs, 27.3% ATC rate. Strong engagement suggests a reading/book-lover persona collection.
  4. **hoodies-for-kids** — Already exists (kids-giant-hoodies) but gets 30 GSC clicks and 20,757 impressions. Blank Kid's Hoodie has 51.3% ATC rate. Expand/promote rather than create new.
  5. **hoodies-for-mental-health** — Confirmed. 6 GSC clicks, 838 impressions, 2 clicks for "mental health hoodies" query. Only persona with actual organic search signal.
  6. **hoodies-for-swifties** — Weak organic signal (78 GSC impressions, 0 clicks). Keep as-is, not a priority for expansion.
  7. **hoodies-for-gamers/nurses/teachers/couples** — Zero signal across all data sources. Pure SEO plays. Lowest priority.

- [ ] **38. Create gift collections (8-10)** — ~2 hrs
  Shopify Admin → Collections → Manually curated. Gift intent = highest purchase intent. "One size fits most" removes the sizing anxiety that kills apparel gifting.
  *Source: Programmatic SEO, Playbook 3*

  **Klaviyo Data (200 Ordered Product events, Feb 15-17 + 200 Viewed Collection events, Feb 16-17):**
  Gift intent doesn't show directly in purchase data (Klaviyo can't tell if someone bought for themselves vs as a gift). But seasonal/holiday signals indicate gifting behavior:

  Seasonal signals from orders + views:
  - Valentine's Day: 6 orders tagged valentines-day, holiday tag=6
  - Christmas: 2 collection views (and it's February — shows year-round interest)
  - Spring: 4 orders tagged spring, 2 collection views
  - St. Patrick's Day: 1 collection view (timely — March approaching)

  Recommended priority (combining Klaviyo seasonal signal + SEO search volume):
  1. **valentines-gifts** — 6 Valentine's orders in 2 days. Immediate seasonal relevance. Should already exist given timing.
  2. **birthday-gifts** — Evergreen. High search volume year-round. No seasonal dependency.
  3. **gifts-under-50** — Evergreen. Most hoodies are $55 ($39 at 3+). Price-point collections convert well.
  4. **christmas-gifts** — 2 views in off-season = strong year-round SEO value. Massive seasonal spike.
  5. **mothers-day-gifts** — Coming up (May). High search volume. Strong "for her" signal (11 order tags).
  6. **fathers-day-gifts** — Coming up (June). "For him" signal is weaker (3 tags) but search volume is there.
  7. **college-gifts** — Late summer spike. No Klaviyo signal currently.
  8. **get-well-gifts** — Evergreen. Cozy hoodie = perfect get-well gift. No Klaviyo signal but strong product-market fit.

  Note: The strongest Klaviyo signal for gifting is indirect — the dominance of Blank Giant Hoodie (53 units, 27% of all orders) suggests many buyers want a "safe" choice, which is classic gift-buying behavior.

  **Adzviser Data (GA4 + Search Console, Nov 20 2025 – Feb 17 2026):**

  *Search Console — gift-related queries:*
  Zero queries found for: gift, birthday, valentine, mother, father, college, get well. Only 3 christmas-adjacent queries appeared ("oversized christmas hoodie" 1 click / 104 impr, "oversize christmas hoodie" 1 click / 13 impr, "a christmas story hoodie" 0 clicks / 1 impr). The site has no organic visibility for gift intent. This is the biggest greenfield opportunity across all three collection types.

  *Search Console — seasonal/gift collection landing pages:*

  | Collection | GSC Clicks | GSC Impressions | Avg Position |
  |-----------|-----------|----------------|-------------|
  | /collections/valentines-day | 1 | 1,722 | 10.7 |
  | /collections/christmas | 5 | 1,533 | 9.0 |
  | /collections/holidays | 1 | 112 | 7.8 |

  Valentine's Day has 1,722 impressions but only 1 click (0.06% CTR) — the meta title/description likely doesn't signal gift intent. Christmas gets 1,533 impressions at position 9 — there's ranking potential.

  *GA4 — seasonal collection page engagement:*

  | Collection | Sessions | Engagement Rate |
  |-----------|----------|----------------|
  | Christmas | 25 | 72.0% |
  | Spring | 70 | 90.0% |
  | Summer | 78 | 96.2% |

  Seasonal collections have very low sessions because they're not actively promoted or linked. But engagement rates are high when people do find them, suggesting the content resonates.

  *GA4 — gift-adjacent product engagement:*

  | Product | Sessions | ATCs | ATC Rate | Gift Signal |
  |---------|----------|------|---------|-------------|
  | Blank Giant Hoodie | 19,616 | 4,661 | 23.8% | #1 "safe choice" = gift behavior |
  | Customize Your Own | 4,910 | 926 | 18.9% | Personalization = gift intent |
  | $99 Mystery Bundle | 2,132 | 537 | 25.2% | Bundle = gift intent |
  | Paw Heart | 1,738 | 744 | 42.8% | Heart design = Valentine's/gift |
  | Heart Giant Hoodie | 933 | 300 | 32.2% | Heart design = Valentine's/gift |
  | Cute Hearts | 1,038 | 221 | 21.3% | Heart design = Valentine's/gift |

  The Blank Giant Hoodie dominates with 19,616 sessions and 4,661 ATCs — by far the #1 product. Its high volume + "safe" nature strongly suggests gift-buying behavior. Combined heart products (3,709 sessions, 1,265 ATCs) validate Valentine's/love gift collections.

  *GA4 — demographic gift signals:*
  Male 18-24 has the highest conversion rate (6.06%) despite being a small segment (726 sessions). This is consistent with young men buying gifts (girlfriend/mom). Female 65+ also converts at 4.69% — likely grandparent gift-buying.

  **Adzviser verdict on gift collection priority:**
  1. **valentines-gifts** — CONFIRMED URGENT. 1,722 GSC impressions already exist but 0.06% CTR. Heart products combined: 3,709 sessions, 1,265 ATCs. Fix the existing valentine's collection meta + create a dedicated gifts version.
  2. **gifts-under-50** — CONFIRMED. Blank Giant Hoodie's dominance (19,616 sessions, $39 at 3+) makes this the easiest gift collection to populate. Price-point framing directly addresses gift-buyer anxiety.
  3. **birthday-gifts** — CONFIRMED. Zero organic visibility = greenfield. Evergreen keyword. Customize Your Own (4,910 sessions, 926 ATCs) is a natural birthday gift anchor product.
  4. **christmas-gifts** — CONFIRMED. Already getting 1,533 GSC impressions + 5 clicks at position 9. A dedicated gift collection (vs the existing seasonal collection) could capture more intent.
  5. **mothers-day-gifts** — SUPPORTED by demographics. Female audience is 3:1 over male, and "for her" signal is strong. Heart products + blank hoodie = easy curation.
  6. **fathers-day-gifts** — WEAKER. Male audience is smaller. "For him" GSC signal is 10 clicks (better than "for her" at 5 clicks). Worth creating for SEO.
  7. **college-gifts** — NO DATA. Zero signal anywhere. Pure SEO play for late summer.
  8. **get-well-gifts** — NO DATA. Zero signal. Product-market fit argument only.

  **Site-wide data context (last 90 days):** Total GA4 sessions: 431,615. Total revenue: $575,466. Total transactions: 6,012. Total ATCs: 30,910. Homepage accounts for 75.7% of organic clicks (6,100 of 8,057). Overall site organic CTR is 0.72% — low, confirming that collection-level SEO content (meta titles + descriptions from items 31-35) will meaningfully improve click-through.

---

### Blog Content

Net-new pages targeting high-value keywords. Each post is a significant effort but creates a permanent traffic asset. Posts are listed in impact order from the Content Strategy doc. Cross-link to relevant collection pages and products in every post.

- [ ] **39. Set up blog in Shopify** — ~15 min
  Shopify Admin → Online Store → Blog posts → Create a blog. Name it "Journal" or "The Hoodie Fam." This just creates the container — then you write posts into it.
  *Source: Content Strategy, Practical Execution Plan*

- [ ] **40. Write: "Best Oversized Hoodies [2026]: The Only Guide You Need"** — ~3-4 hrs
  Listicle format. Include Giant Hoodies naturally among competitors. High-volume keyword, establishes authority.
  Target keyword: "best oversized hoodies" · Buyer stage: Consideration
  *Source: Content Strategy, Topic #1*

- [ ] **41. Write: "Giant Hoodies vs Oodie: Honest Comparison"** — ~3-4 hrs
  Expand from the comparison table already on the homepage. Captures competitor search traffic. Use real numbers (price, quality, return rates, shipping).
  Target keyword: "oodie alternative" / "giant hoodies vs oodie" · Buyer stage: Consideration
  *Source: Content Strategy, Topic #3*

- [ ] **42. Write: "The Best Cozy Gifts for People Who Are Always Cold"** — ~3-4 hrs
  Gift intent = high conversion. Cross-link to gift collections (#38). Create one comprehensive post, spin out variants later if it works.
  Target keyword: "cozy gifts" / "gifts for people who are always cold" · Buyer stage: Decision
  *Source: Content Strategy, Topic #4*

- [ ] **43. Write: "How to Style an Oversized Hoodie (Without Looking Like You Just Woke Up)"** — ~3-4 hrs
  Addresses the #1 objection: "Can I wear this in public?" Directly supports the "trendy" positioning that differentiates from competitors. Use lifestyle photos.
  Target keyword: "how to style oversized hoodie" · Buyer stage: Awareness
  *Source: Content Strategy, Topic #5*

- [ ] **44. Write: "One Size Fits Most: Here's What That Actually Means"** — ~3-4 hrs
  FAQ data shows this is the top question. Photos of different body types wearing it would crush. Directly reduces pre-purchase anxiety.
  Target keyword: "oversized hoodie sizing" / "one size fits most hoodie" · Buyer stage: Consideration
  *Source: Content Strategy, Topic #6*

- [ ] **45. Write: "How to Wash an Oversized Hoodie (So It Stays Soft Forever)"** — ~2-3 hrs
  Low competition, high utility, every customer needs this. Builds trust pre-purchase. FAQ answer already exists — expand into full post with visuals.
  Target keyword: "how to wash oversized hoodie" · Buyer stage: Post-purchase
  *Source: Content Strategy, Topic #7*

- [ ] **46. Write: "What Is a Giant Hoodie? Everything You Need to Know"** — ~3-4 hrs
  Brand-defining pillar page. Covers what it is, who it's for, how it fits, how it's made. Hub page for internal linking — every other post links back to this one.
  Target keyword: "giant hoodie" / "what is a giant hoodie" · Buyer stage: Awareness
  *Source: Content Strategy, Topic #8*

- [ ] **47. Write: "Wearable Blanket vs. Oversized Hoodie: What's the Difference?"** — ~3-4 hrs
  Category-defining post. Captures search traffic from both terms. Important: this post explains WHY an oversized hoodie is NOT a wearable blanket and positions Giant Hoodies firmly in the oversized hoodie category. Do not use "wearable blanket" as a descriptor for Giant Hoodies.
  Target keyword: "wearable blanket hoodie" / "blanket hoodie" · Buyer stage: Awareness
  *Source: Content Strategy, Topic #2*

- [ ] **48. Write: "Made in USA: How We Print Every Hoodie by Hand in Arkansas"** — ~3-4 hrs
  Behind-the-scenes differentiator content. "Made in USA" has real search volume from conscious consumers. Use photos of the team, facility, process.
  Target keyword: "hoodies made in usa" · Buyer stage: Consideration
  *Source: Content Strategy, Topic #9*

- [ ] **49. Write: "Best Oversized Hoodies for Kids"** — ~3-4 hrs
  You have a kids line. Capture that search. Parents searching = high intent.
  Target keyword: "oversized hoodies for kids" · Buyer stage: Consideration
  *Source: Content Strategy, Topic #10*

- [ ] **50. Write: "Outfit Ideas with an Oversized Hoodie"** — ~3-4 hrs
  Seasonal refresh content — can publish quarterly with different angles. Lifestyle photos. Cross-link to style collections.
  Target keyword: "oversized hoodie outfit" · Buyer stage: Awareness
  *Source: Content Strategy, Topic #11*

- [ ] **51. Write: "Why 225,000+ People Bought a Giant Hoodie (Real Customer Stories)"** — ~3-4 hrs
  Social proof longform. Pull from best reviews. Great for people Googling you before buying.
  Target keyword: "giant hoodies reviews" · Buyer stage: Decision
  *Source: Content Strategy, Topic #12*

---

### Ongoing

No specific order — do these when you have spare time or as part of regular maintenance.

- [ ] **52. Write meta descriptions for all products (batch 20 at a time)** — ~45 min per batch
  Shopify Admin → each product → SEO section. Prioritize products with the most impressions in Search Console.
  *Source: SEO Audit, Issue #3*

- [x] **53. Audit image alt text across all sections** — ~60 min
  Done. Audited all sections, snippets, and blocks. Fixed missing alt text in 6 files: `snippets/link-featured-image.liquid` (4 menu images → collection/product title), `snippets/resource-image.liquid` (blog/collection card images → content title), `snippets/resource-card.liquid` (3 product/collection card images → resource title), `blocks/_slide.liquid` (slide images + video posters), `snippets/background-media.liquid` (decorative images → empty alt per WCAG), `snippets/video.liquid` (poster images → video alt text). Already good: hero.liquid, feature-oversized.liquid, feature-trendy.liquid, collection-header-full.liquid, logo.liquid, product-gallery.liquid, press-logos-bar.liquid, slideshow-controls.liquid.
  *Source: SEO Audit, Good Stuff table note*

- [ ] **54. Verify cart drawer upsell messages are working** — ~15 min
  Add 1 hoodie, check the upsell message. Add a 2nd, check again. Add a 3rd, check again. The dynamic messages depend on hoodie counting logic — make sure they change correctly.
  *Source: Page CRO, Cross-Page Observation #2*

- [ ] **55. Monitor Google Search Console** — ongoing
  After schema and SEO content changes go live, watch for: indexation rate of new/updated collections, rich result appearance (FAQ, stars, breadcrumbs), impressions and clicks per collection page, any crawl errors or manual actions.
  *Source: SEO Audit, Ongoing; Content Strategy, Measuring Success*

---

## Source Documents

All referenced throughout this plan:

| Short Name | File | What It Covers |
|------------|------|----------------|
| Copy Edit | `giant-hoodies-copy-edit.md` | 19 copy issues across homepage, 7 sweeps |
| Page CRO | `giant-hoodies-page-cro.md` | Homepage, collection, product page conversion |
| SEO Audit | `giant-hoodies-seo-audit.md` | Technical + on-page SEO issues |
| Schema Markup | `giant-hoodies-schema-markup.md` | JSON-LD code for all 7 schema types |
| Programmatic SEO | `giant-hoodies-programmatic-seo.md` | Collection page SEO strategy, 3 playbooks |
| Content Strategy | `giant-hoodies-content-strategy.md` | Blog content plan, 12 topics, 4 pillars |
| Copy Spec | `giant-hoodies-copy-spec.md` | Brand voice, approved copy, language to avoid |
