# SEO Audit — Giant Hoodies (gianthoodies.com)

**Audit Date:** 2026-02-16

## Overall Assessment

The site's **technical foundation is strong** — fast loading, good JS/CSS delivery, proper canonical tags, working sitemap. But there are significant **on-page SEO gaps** that are leaving traffic on the table: missing structured data for reviews, no breadcrumbs, bloated title tags, and 54 collection pages that likely lack unique SEO content.

---

## Critical Issues (Fix First)

### 1. Product page titles are way too long

- **Current:** `Blank Giant Hoodie - Giant Hoodies – Giant Hoodies | Your New Favorite Oversized Hoodie`
- **Problem:** Google truncates around 60 characters. This is ~80+ characters and repeats the brand name. The tagline in `shop.name` is the full "Giant Hoodies | Your New Favorite Oversized Hoodie" — so every page title appends that entire string.
- **Fix:** Change `shop.name` in Shopify Admin to just "Giant Hoodies" (not the full tagline). The title template in `meta-tags.liquid:104-109` appends `shop.name` automatically. Or override the title template to use a shorter brand suffix.
- **Impact:** HIGH — affects every single page on the site.

### 2. Missing AggregateRating in Product schema

- **Current:** Product pages show "2,400+ 5-Star Reviews" and have Judge.me widget, but the JSON-LD Product schema has NO `aggregateRating` property.
- **What you're losing:** Star ratings in Google search results. This is the single biggest visual differentiator in search results for e-commerce.
- **Fix:** Add `aggregateRating` to the Product schema in `sections/product-main.liquid`. Judge.me may inject its own schema — need to check and avoid duplication.
- **Impact:** HIGH — star ratings in SERPs dramatically increase click-through rate.

### 3. Missing or empty meta descriptions

- **Current:** `meta-tags.liquid:116-121` only renders a meta description if `page_description` exists. If descriptions haven't been written in Shopify Admin for homepage, collections, and products, they're blank.
- **Problem:** Google will auto-generate snippets from page content, which are usually bad.
- **Fix:** Write meta descriptions for at minimum: homepage, top 10 collections, top 20 products. Prioritize pages with the most impressions in Search Console.
- **Impact:** HIGH — controls what people see in search results.

### 4. No FAQPage schema on product pages

- **Current:** Product pages have 5 FAQ accordions (sizing, fabric, washing, shipping, guarantee) but zero FAQPage schema.
- **What you're losing:** FAQ rich results in Google — those expandable Q&A boxes that take up extra space in search results.
- **Fix:** Add FAQPage JSON-LD schema to `sections/product-main.liquid` pulling from the FAQ accordion content.
- **Impact:** HIGH — FAQ rich results are one of the easiest rich snippet wins for e-commerce.

---

## High Priority Issues

### 5. No breadcrumbs (visual or schema)

- No breadcrumb navigation anywhere on the site.
- Missing `BreadcrumbList` schema markup.
- **Fix:** Add breadcrumb snippet rendered on product and collection pages. Include BreadcrumbList JSON-LD.
- **Impact:** MEDIUM-HIGH — helps Google understand site hierarchy, can appear in search results.

### 6. 54 collection pages likely missing unique SEO content

- The sitemap shows 54 collections (cats, dogs, animals, funny, retro, space, holidays, etc.) — this is great!
- But these likely have default/empty descriptions and generic titles.
- **Fix:** Directly connects to the programmatic SEO plan. Write unique title + meta description + collection description for each.
- **Impact:** HIGH — 54 pages that could each rank for a distinct keyword.

### 7. No CollectionPage schema

- Collection pages have zero structured data.
- **Fix:** Add `CollectionPage` or `ItemList` schema to collection template.
- **Impact:** MEDIUM.

### 8. Missing `twitter:image` meta tag

- OG image is set, but `twitter:image` is missing from `meta-tags.liquid`.
- **Fix:** Add `<meta name="twitter:image" content="https:{{ page_image | image_url }}">` alongside the OG image tags.
- **Impact:** LOW-MEDIUM — affects how links look when shared on Twitter/X.

---

## Good Stuff (No Action Needed)

| Element | Status | Notes |
|---------|--------|-------|
| **Page speed / Core Web Vitals** | Excellent | All JS deferred/modular, fonts use `font-display: swap`, critical fonts preloaded, images lazy-loaded with eager loading for above-fold |
| **Canonical tags** | Working | Every page gets `{{ canonical_url }}` |
| **robots.txt** | Standard Shopify | Properly blocks checkout, admin, cart. Sitemap referenced |
| **XML sitemap** | Working | 4 sub-sitemaps (products, pages, collections, blogs) |
| **Open Graph tags** | Complete | Title, description, image, type, price/currency for products |
| **HTTPS** | Yes | Enforced site-wide |
| **Mobile responsive** | Yes | Viewport meta set, responsive design throughout |
| **Product schema (basic)** | Present | Product name, URL, image, description, brand, price, availability |
| **Heading structure** | Mostly good | Single H1 per page (product, homepage). Minor: collection pages have conditional duplicate H1 in code but only one renders |
| **Image alt text** | Good pattern | Product images fall back to product title. Main images covered |
| **Font loading** | Optimized | Preloaded, swap strategy, no render blocking |

---

## Existing Collections (54 in sitemap)

These are already indexed and represent a huge SEO opportunity if optimized with unique content:

| Category | Collections |
|----------|-------------|
| **Product type** | hoodies, kids-giant-hoodies, blankets, shirts, sweatshirts, joggers, accessories, other-clothing |
| **Merchandising** | best-sellers, latest-products, limited-releases, recommended, retail-favorites, all-products, mystery-boxes |
| **Theme — Animals** | animals, cats, dogs |
| **Theme — Style** | funny, sarcasm, positivity, mental-health, retro, pop-culture, zodiac, bleach-dye, full-color-prints, blank-hoodies, embroidered-heart-limited-drop |
| **Theme — Lifestyle** | home-life, family, food, tacos, travel, work, earth, space, swifties |
| **Theme — Seasonal** | holidays, christmas, halloween, valentines-day, thanksgiving, new-years, st-patricks-day, hanukkah, kwanzaa, may-the-fourth, spring, summer, back-to-school |
| **Theme — Persona** | for-her, for-him |
| **Other** | customize-your-own |

---

## Prioritized Action Plan

### Week 1: Quick Wins
1. Change `shop.name` in Shopify Admin → just "Giant Hoodies" (fixes all title tags)
2. Write meta descriptions for homepage + top 10 collections
3. Add `twitter:image` to `meta-tags.liquid`

### Week 2: Schema Markup
4. Add FAQPage schema to product pages
5. Add AggregateRating to Product schema (coordinate with Judge.me)
6. Add BreadcrumbList schema

### Week 3-4: Collection SEO (overlaps with pSEO plan)
7. Write unique descriptions for all 54 existing collections
8. Add SEO titles for all collections
9. Add CollectionPage/ItemList schema to collection template

### Ongoing
10. Write meta descriptions for all products (batch 20 at a time)
11. Audit image alt text across all sections
12. Monitor Search Console for indexation issues

---

## Connection to Other Plans

- **Collection optimization (#6, #7, #8, #9)** → directly feeds into the **programmatic SEO** plan. The 54 collections already exist — they just need SEO content.
- **FAQPage schema (#4)** → can also be done via the **schema-markup** skill.
- **Meta descriptions (#2, #10)** → can use the **copywriting** skill to batch-write these.
