# Master Implementation Plan — Giant Hoodies

**How to use this document:** Start at #1 and work down. When you stop, note where you are. Next time you sit down, pick up where you left off. Every item is independent enough to be a stopping point. Section headers are just for scanning — the numbered list is your single path through.

Each item references the source document where full details, rationale, and exact copy/code live. Open that doc when you're ready to work on the item.

---

### Overview

55 items, one sequential list, top to bottom.

- **#0-4** — Do next: hero subheadline, risk reducer, value props reorder, collection description, collection meta descriptions.
- **#5-9** — Quick fixes (social profiles, tier pricing, typo, title tags, banned copy). Under 15 minutes total, massive impact.
- **#10-16** — Schema markup. One coding session, all the JSON-LD. Starts the clock on rich results in Google.
- **#17-21** — Homepage copy. Above-the-fold and high-visibility sections.
- **#22-23** — Homepage structure. Mid-page CTAs, bottom section.
- **#24-26** — Product page. Review stars near ATC, description placement, mobile sticky savings.
- **#27-28** — Collection page. Trust bar, infinite scroll.
- **#29-30** — SEO meta content. Homepage meta description, remaining copy.
- **#31-35** — Existing 54 collection SEO (batched by ~15 collections).
- **#36-38** — New themed, persona, and gift collections.
- **#39-51** — Blog posts, individually listed in impact order.
- **#52-55** — Ongoing maintenance.

Every item references its source doc so you can open a new tab with the full details. Each item has a time estimate. You start at #0, work as far as you can, and pick up exactly where you left off next time.

---

### Do Next

These changes have the highest immediate impact. Do them before anything else.

- [x] **0. Fix hero subheadline** — ~10 min
  `templates/index.json` → hero section. Replace "Prices just dropped. This is your sign to get cozy." — it's ambiguous (is this a sale?), unproven, and temporary-sounding for what is actually everyday pricing. Replace with a specific, evergreen value prop.
  *Source: Copy Edit, Issues #2 + #13; Page CRO, Homepage Quick Win A*

- [x] **1. Add risk reducer below hero CTA** — ~10 min
  `templates/index.json` → hero section. The "Shop All Hoodies" button stands alone with no reassurance. Add a line below it: "Free shipping $75+ · 30-Day Guarantee · Made in USA"
  *Source: Copy Edit, Issue #18; Page CRO, Homepage Quick Win B*

- [x] **2. Move value props section higher on homepage** — ~20 min
  `templates/index.json` → reorder sections. The 4 value prop cards (8oz Sponge Fleece, Hand-Printed USA, 200+ Designs, etc.) are buried at position 7 below two product grids. Cold Meta traffic needs to understand *what this is* before browsing products. Move to after stats bar/press logos.
  *Source: Page CRO, Homepage Quick Win C*

- [x] **3. Write main collection description** — ~15 min
  Done. Pasted into Shopify Admin → Collections → Hoodies. Visible description, SEO title ("Oversized Hoodies - Up to 52% Off - Giant Hoodies"), and meta description all updated.
  *Source: Page CRO, Collection Quick Win A; SEO Audit, Issue #3*

- [x] **4. Write meta descriptions for top 10 collections** — ~45 min
  Done. All 10 collections updated in Shopify Admin with visible description, SEO title (keyword + "Up to 52% Off" + brand), and meta description (~155 chars each). Collections: hoodies, best-sellers, kids-giant-hoodies, funny, animals, cats, dogs, christmas, latest-products, limited-releases.
  *Source: SEO Audit, Issue #3*

---

### Quick Fixes

These are broken, turned off, or embarrassing. Each takes minutes and has outsized impact.

- [x] **5. Add social profile URLs in Shopify Admin** — ~2 min
  Shopify Admin → Settings → Brand → Social media accounts. Add URLs for Facebook, Instagram, TikTok, and any other active profiles. This populates the `sameAs` array in the Organization schema (#15) so Google associates your social accounts with your brand.

- [x] **6. Turn on volume tier pricing on product page** — ~5 min
  Already live. `product.hoodie.json` (the template hoodies actually use) omits `show_tier_pricing`, so it defaults to `true` per the schema. The `product.json` default template has it `false`, but that's not used by hoodies.
  *Source: Page CRO, Product Quick Win A*

- [x] **7. Fix "with by" typo in bottom section** — ~2 min
  `templates/index.json` → bottom section text. Remove the extra word so it reads "...from Fayetteville, Arkansas by our incredible team of 5."
  *Source: Copy Edit, Issue #4*

- [x] **8. Shorten shop.name in title tags** — ~2 min
  Shopify Admin store name is locked (Shopify Capital balance). Fixed in theme code instead: `snippets/meta-tags.liquid` line 130 — hardcoded "Giant Hoodies" in the title tag suffix instead of `{{ shop.name }}`. Same result, no truncation.
  *Source: SEO Audit, Issue #1*

- [x] **9. Remove banned copy from slideshow slide 1** — ~5 min
  `templates/index.json` → slideshow section, slide 1. Replace "One size fits most, there's only one size! Maximum comfort, maximum relaxation." — the exact phrase is listed under Language to AVOID in the copy spec.
  Quick swap only. Full slideshow rewrite comes at #19.
  *Source: Copy Edit, Issue #1*

---

### Schema Markup

One-time code changes. Once deployed, they passively improve how the site appears in Google — star ratings, FAQ dropdowns, breadcrumb trails, search box. The sooner these go live, the sooner Google starts processing them (can take weeks to appear).

Full Liquid code for every item below is in the Schema Markup doc.

- [x] **10. Add AggregateRating to Product schema** — ~15 min
  `sections/product-main.liquid` → expand existing Product JSON-LD. Adds star ratings pulled from Judge.me metafields (`product.metafields.reviews.rating`). Also adds `sku` and all product images instead of just the featured image. Judge.me does not inject its own JSON-LD, so no duplication risk.
  *Source: Schema Markup, #1*

- [x] **11. Add FAQPage schema to product pages** — ~15 min
  `sections/product-main.liquid` → add a second `<script type="application/ld+json">` block after the Product schema. Pulls from the 8 FAQ accordion questions on the hoodie template. Enables expandable Q&A rich results in Google.
  *Source: Schema Markup, #2*

- [x] **12. Add twitter:image meta tag** — ~5 min
  Done. Added `twitter:image` meta tag after `twitter:description` in `snippets/meta-tags.liquid`.
  *Source: Schema Markup, #7*

- [x] **13. Add WebSite schema with SearchAction** — ~10 min
  Done. Added WebSite JSON-LD with SearchAction to `snippets/meta-tags.liquid`, homepage only.
  *Source: Schema Markup, #4*

- [x] **14. Add BreadcrumbList schema** — ~15 min
  Done. Created `snippets/breadcrumb-schema.liquid` and rendered from `layout/theme.liquid`. Outputs Home → Collection → Product breadcrumb trail.
  *Source: Schema Markup, #3*

- [x] **15. Enhance Organization schema** — ~15 min
  Done. Expanded Organization JSON-LD in `sections/header.liquid` with `sameAs` (social profiles), `contactPoint`, and `address` (Fayetteville, AR). Social links render dynamically — if none are set in Shopify Admin, the `sameAs` array is simply omitted.
  *Source: Schema Markup, #5*

- [x] **16. Add CollectionPage/ItemList schema** — ~15 min
  Create new `snippets/collection-schema.liquid` and render from `layout/theme.liquid` on collection pages. Lists first 12 products as an ItemList.
  *Source: Schema Markup, #6*

---

### Homepage Copy

The homepage is what every Meta ad visitor sees. These fixes affect above-the-fold and high-visibility sections. Full replacement copy for each is in the Copy Edit doc.

- [x] **17. Add "What's a Giant Hoodie?" as visible heading above slideshow** — ~10 min
  `templates/index.json` → slideshow section. The section is named "What's a Giant Hoodie?" in the editor but the question never appears on the page. Add it as a visible heading. This is exactly the question cold Meta ad traffic is asking themselves.
  *Source: Copy Edit, Issue #5*

- [x] **18. Change "Hear from Others!" to "What the Hoodie Fam Says"** — skipped
  Keeping "Hear from Others!" — it's better than the suggested "What the Hoodie Fam Says." Current copy works, no change needed.
  *Source: Copy Edit, Issue #8*

- [x] **19. Rewrite all 5 slideshow slides** — skipped
  Reviewed all 5 slides against suggested rewrites. Current copy is stronger. No changes needed.
  *Source: Copy Edit, Issues #6, #7, #10, #11, #16, #17 (Sweeps 2, 3, 5, 6)*

- [x] **20. Add CTA after comparison table** — ~10 min
  Done. Added a centered "Shop All Hoodies" button section (`cta_after_comparison`) in `templates/index.json` between the comparison table and reviews.
  *Source: Copy Edit, Issues #12 + #19*

- [x] **21. Fix collection page banner copy** — skipped
  Current banner copy is fine. No change needed.
  *Source: Copy Edit, Collection Page Copy section*

---

### Homepage Structure

These are section reordering and structural changes that affect how visitors flow through the page.

- [x] **22. Add mid-page CTAs between product grids** — ~20 min
  Done. Added two CTA sections in `templates/index.json`: "Shop by Category" after Best Sellers, "Find Your Perfect Hoodie" after New Drops.
  *Source: Page CRO, Homepage High-Impact D*

- [x] **23. Rewrite bottom section** — skipped
  Keeping current copy — it's better than the suggested replacement.
  *Source: Copy Edit, Issues #9 + #14*

---

### Product Page

These affect the product page where the actual purchase decision happens.

- [x] **24. Add review stars/summary near product title** — ~20 min
  `sections/product-main.liquid` or `templates/product.hoodie.json`. Add a compact Judge.me review summary (stars + count) near the product title or just above Add to Cart. Currently the social proof (stats bar, testimonials) is far below the ATC button — at the moment of decision, the customer doesn't see "4.9 stars."
  *Source: Page CRO, Product High-Impact E*

- [x] **25. Move product description above FAQs and reviews** — already done
  Product description is already above FAQs and reviews in the current template. No change needed.
  *Source: Page CRO, Product Quick Win C*

- [x] **26. Add savings messaging to mobile sticky ATC** — already done
  Already implemented. `sections/product-main.liquid` line 536-539 shows dynamic "Save {{ savings_amount | money }}" in the sticky ATC when a compare-at price exists.
  *Source: Page CRO, Product High-Impact F*

---

### Collection Page

These improve the page where visitors browse products after leaving the homepage.

- [x] **27. Add trust bar to collection page** — skipped
  Volume pricing banner already serves this role on collection pages. Sale messaging is stronger than social proof here.
  *Source: Page CRO, Collection Quick Win B*

- [x] **28. Enable infinite scroll or increase products per page** — skipped
  Keeping pagination. Better for SEO (paginated URLs get indexed), and with a large catalog, pages help customers remember where a design was.
  *Source: Page CRO, Collection High-Impact E*

---

### SEO Meta Content

Writing meta descriptions and collection page content. This is content that Google shows in search results and affects click-through rate.

- [x] **29. Write homepage meta description** — ~10 min
  Shopify Admin → Online Store → Preferences → Meta description. Currently may be blank — if so, Google auto-generates a snippet from page content. Write a compelling 150-160 character description with key selling points.
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

- [x] **36. Create themed collections** — N/A, not doing
  Shopify Admin → Collections → Create automated collections. Use product title/type conditions. Write unique description + SEO title + meta description for each. Minimum 6 products per collection.
  *Source: Programmatic SEO, Playbook 1*

  Priority order (data-backed first, then SEO plays):
  1. **zip-up-hoodies** — Highest priority. 7.8k sessions, 1,856 ATCs, 36 GSC clicks. Currently only a tag, not a collection.
  2. **tie-dye-hoodies** — 3.4k sessions across 3 products, 952 ATCs, 25-35% ATC rates.
  3. **heart-hoodies** — 3.7k sessions across Heart/Paw Heart/Cute Hearts, 1,265 ATCs.
  4. **polka-dot-hoodies** — 2.6k sessions, 484 ATCs. 9,799 GSC impressions but only 9 clicks = huge CTR opportunity.
  5. **dinosaur-hoodies** — Dino Dan alone: 1,230 sessions, 201 ATCs.
  6. **two-tone-hoodies** — Ocean + Smoke Two Tone combined: 1,790 sessions, 613 ATCs, ~34% ATC rate.
  7. **floral-hoodies** — SEO keyword play, no strong site data.
  8. **anime-hoodies** — SEO keyword play, no site data.
  9. **patriotic-hoodies** — SEO keyword play, fits Made in USA angle.

  Note: cats, dogs, funny, sarcasm, animals, travel, spring, christmas, blank-hoodies already exist. Music/butterfly/unicorn/space had weak or zero signal — skip unless products are added.

- [x] **37. Create persona collections** — N/A, not doing
  Shopify Admin → Collections → Manually curated. Each gets a tailored description speaking to that audience.
  *Source: Programmatic SEO, Playbook 2*

  Priority order (data-backed first, then SEO plays):
  1. **hoodies-for-dog-lovers** — Dog Mom (297 ATCs, 32%) + Puppy Love (272 ATCs, 31%). Dogs collection gets 1,288 sessions.
  2. **hoodies-for-cat-lovers** — Cat Mom (333 ATCs, 32%). Cats collection: 2,010 sessions.
  3. **hoodies-for-bookworms** — Rather Be Reading: 1,133 sessions, 309 ATCs, 27% ATC rate.
  4. **hoodies-for-gamers** — SEO keyword play, no site data.
  5. **hoodies-for-nurses** — SEO keyword play ("gifts for nurses" has volume).
  6. **hoodies-for-teachers** — SEO keyword play.
  7. **hoodies-for-couples** — SEO keyword play.

  Note: for-her, for-him, kids-giant-hoodies, mental-health, swifties, work already exist. Audience skews ~3:1 female, ages 25-64, nearly 100% US.

- [x] **38. Create gift collections** — N/A, not doing
  Shopify Admin → Collections → Manually curated. Gift intent = highest purchase intent. "One size fits most" removes sizing anxiety. Zero current organic visibility for gift keywords — biggest greenfield opportunity.
  *Source: Programmatic SEO, Playbook 3*

  Priority order:
  1. **valentines-gifts** — 1,722 GSC impressions already, 0.06% CTR. Heart products: 3.7k sessions, 1,265 ATCs.
  2. **gifts-under-50** — Evergreen. Blank Giant Hoodie ($39 at 3+) is the natural anchor.
  3. **birthday-gifts** — Evergreen. Customize Your Own (4,910 sessions, 926 ATCs) is the anchor.
  4. **christmas-gifts** — 1,533 GSC impressions, position 9. Year-round SEO value.
  5. **mothers-day-gifts** — Coming up May. Strong "for her" signal.
  6. **fathers-day-gifts** — Coming up June. Weaker signal but search volume exists.
  7. **college-gifts** — Late summer spike. No current data.
  8. **get-well-gifts** — Evergreen. Strong product-market fit, no current data.

---

### Blog Content

Net-new pages targeting high-value keywords. Each post is a significant effort but creates a permanent traffic asset. Posts are listed in impact order from the Content Strategy doc. Cross-link to relevant collection pages and products in every post.

- [x] **39. Set up blog in Shopify** — done
  Shopify Admin → Online Store → Blog posts → Create a blog. Name it "Journal" or "The Hoodie Fam." This just creates the container — then you write posts into it.
  *Source: Content Strategy, Practical Execution Plan*

- [x] **40. Write: "Best Oversized Hoodies [2026]: The Only Guide You Need"** — done
  Listicle format. Include Giant Hoodies naturally among competitors. High-volume keyword, establishes authority.
  Target keyword: "best oversized hoodies" · Buyer stage: Consideration
  *Source: Content Strategy, Topic #1*

- [x] **41. Write: "Giant Hoodies vs Oodie: Honest Comparison"** — done
  Expand from the comparison table already on the homepage. Captures competitor search traffic. Use real numbers (price, quality, return rates, shipping).
  Target keyword: "oodie alternative" / "giant hoodies vs oodie" · Buyer stage: Consideration
  *Source: Content Strategy, Topic #3*

- [x] **42. Write: "The Best Cozy Gifts for People Who Are Always Cold"** — done
  Gift intent = high conversion. Cross-link to gift collections (#38). Create one comprehensive post, spin out variants later if it works.
  Target keyword: "cozy gifts" / "gifts for people who are always cold" · Buyer stage: Decision
  *Source: Content Strategy, Topic #4*

- [x] **43. Write: "How to Style an Oversized Hoodie (Without Looking Like You Just Woke Up)"** — done
  Addresses the #1 objection: "Can I wear this in public?" Directly supports the "trendy" positioning that differentiates from competitors. Use lifestyle photos.
  Target keyword: "how to style oversized hoodie" · Buyer stage: Awareness
  *Source: Content Strategy, Topic #5*

- [x] **44. Write: "One Size Fits Most: Here's What That Actually Means"** — done
  FAQ data shows this is the top question. Photos of different body types wearing it would crush. Directly reduces pre-purchase anxiety.
  Target keyword: "oversized hoodie sizing" / "one size fits most hoodie" · Buyer stage: Consideration
  *Source: Content Strategy, Topic #6*

- [x] **45. Write: "How to Wash an Oversized Hoodie (So It Stays Soft Forever)"** — done
  Low competition, high utility, every customer needs this. Builds trust pre-purchase. FAQ answer already exists — expand into full post with visuals.
  Target keyword: "how to wash oversized hoodie" · Buyer stage: Post-purchase
  *Source: Content Strategy, Topic #7*

- [x] **46. Write: "What Is a Giant Hoodie? Everything You Need to Know"** — done
  Brand-defining pillar page. Covers what it is, who it's for, how it fits, how it's made. Hub page for internal linking — every other post links back to this one.
  Target keyword: "giant hoodie" / "what is a giant hoodie" · Buyer stage: Awareness
  *Source: Content Strategy, Topic #8*

- [x] **47. Write: "Wearable Blanket vs. Oversized Hoodie: What's the Difference?"** — done
  Category-defining post. Captures search traffic from both terms. Important: this post explains WHY an oversized hoodie is NOT a wearable blanket and positions Giant Hoodies firmly in the oversized hoodie category. Do not use "wearable blanket" as a descriptor for Giant Hoodies.
  Target keyword: "wearable blanket hoodie" / "blanket hoodie" · Buyer stage: Awareness
  *Source: Content Strategy, Topic #2*

- [x] **48. Write: "Made in USA: How We Print Every Hoodie by Hand in Arkansas"** — done
  Behind-the-scenes differentiator content. "Made in USA" has real search volume from conscious consumers. Use photos of the team, facility, process.
  Target keyword: "hoodies made in usa" · Buyer stage: Consideration
  *Source: Content Strategy, Topic #9*

- [x] **49. Write: "Best Oversized Hoodies for Kids"** — done
  You have a kids line. Capture that search. Parents searching = high intent.
  Target keyword: "oversized hoodies for kids" · Buyer stage: Consideration
  *Source: Content Strategy, Topic #10*

- [x] **50. Write: "Outfit Ideas with an Oversized Hoodie"** — done
  Seasonal refresh content — can publish quarterly with different angles. Lifestyle photos. Cross-link to style collections.
  Target keyword: "oversized hoodie outfit" · Buyer stage: Awareness
  *Source: Content Strategy, Topic #11*

- [x] **51. Write: "Why 225,000+ People Bought a Giant Hoodie (Real Customer Stories)"** — done
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

- [x] **54. Verify cart drawer upsell messages are working** — ~15 min
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
