# Schema Markup — Giant Hoodies

**Audit Date:** 2026-02-16

## Current State

| Schema | Location | Status |
|--------|----------|--------|
| **Product** | `sections/product-main.liquid:25-45` | Basic — name, url, image, description, brand, offers. Missing aggregateRating, sku, multiple images |
| **Organization** | `sections/header.liquid:264-274` | Basic — name, logo, url. Missing sameAs, contactPoint |
| **Article** | `sections/main-blog-post.liquid` | Uses Shopify's `structured_data` filter. Acceptable as-is |

**Not present at all:** FAQPage, BreadcrumbList, WebSite, CollectionPage/ItemList

---

## 1. Add AggregateRating to Product Schema

**Priority:** Critical
**Impact:** Star ratings in Google search results — the single biggest visual differentiator for e-commerce SERPs.
**File:** `sections/product-main.liquid:25-45`

Judge.me stores review data in Shopify metafields and does NOT inject its own JSON-LD, so there's no duplication risk.

**Current:**
```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": {{ product.title | json }},
  "url": "{{ shop.url }}{{ product.url }}",
  "image": [{{ product.featured_image | image_url: width: 1200 | json }}],
  "description": {{ product.description | strip_html | truncate: 500 | json }},
  "brand": {
    "@type": "Brand",
    "name": {{ shop.name | json }}
  },
  "offers": {
    "@type": "Offer",
    "url": "{{ shop.url }}{{ product.url }}",
    "priceCurrency": {{ cart.currency.iso_code | json }},
    "price": {{ selected_variant.price | divided_by: 100.0 }},
    "availability": "https://schema.org/{% if selected_variant.available %}InStock{% else %}OutOfStock{% endif %}"
  }
}
</script>
```

**Replace with:**
```liquid
{%- liquid
  assign rating_value = product.metafields.reviews.rating.value.rating
  assign rating_max = product.metafields.reviews.rating.value.scale_max
  assign review_count = product.metafields.reviews.rating_count
-%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": {{ product.title | json }},
  "url": "{{ shop.url }}{{ product.url }}",
  "image": [
    {%- for image in product.images -%}
      {{ image | image_url: width: 1200 | json }}{% unless forloop.last %},{% endunless %}
    {%- endfor -%}
  ],
  "description": {{ product.description | strip_html | truncate: 500 | json }},
  "sku": {{ selected_variant.sku | json }},
  "brand": {
    "@type": "Brand",
    "name": {{ shop.name | json }}
  },
  {%- if rating_value != blank and review_count != blank and review_count > 0 %}
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": {{ rating_value }},
    "bestRating": {{ rating_max | default: 5 }},
    "ratingCount": {{ review_count }}
  },
  {%- endif %}
  "offers": {
    "@type": "Offer",
    "url": "{{ shop.url }}{{ product.url }}",
    "priceCurrency": {{ cart.currency.iso_code | json }},
    "price": {{ selected_variant.price | divided_by: 100.0 }},
    "availability": "https://schema.org/{% if selected_variant.available %}InStock{% else %}OutOfStock{% endif %}"
  }
}
</script>
```

**What changed:**
- Added `aggregateRating` block using Judge.me metafields (`product.metafields.reviews.rating.value.rating`, `.scale_max`, `product.metafields.reviews.rating_count`)
- Conditional: only renders if review data exists and count > 0
- Added `sku` from `selected_variant.sku`
- Changed `image` from single featured image to loop of all product images

---

## 2. Add FAQPage Schema to Product Pages

**Priority:** Critical
**Impact:** FAQ rich results in Google — expandable Q&A boxes that take up extra SERP real estate.
**File:** `sections/product-main.liquid` (append after the Product schema block)

The hoodie product template (`templates/product.hoodie.json`) has 8 FAQ accordion items. The FAQ section is a generic `section` type with accordion blocks, so the questions and answers are defined in the JSON template, not in a dedicated Liquid section.

**Approach:** Since the FAQ content is hardcoded in the template JSON (not dynamically generated from Shopify data), the cleanest approach is to add FAQPage schema as a separate `<script>` block in the FAQ section itself. However, since the FAQ uses a generic `section` type with nested accordion blocks, there's no dedicated Liquid file to edit.

**Best implementation:** Add a new snippet that reads the FAQ accordion blocks and generates FAQPage schema. Call it from the product template.

**Create:** `snippets/faq-schema.liquid`

```liquid
{%- comment -%}
  FAQPage schema for product page FAQ accordions.
  Usage: {% render 'faq-schema', faqs: faq_items %}
  Where faq_items is an array of objects with .question and .answer properties.
{%- endcomment -%}

{%- if faqs != blank and faqs.size > 0 -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {%- for faq in faqs -%}
    {
      "@type": "Question",
      "name": {{ faq.question | json }},
      "acceptedAnswer": {
        "@type": "Answer",
        "text": {{ faq.answer | strip_html | json }}
      }
    }{% unless forloop.last %},{% endunless %}
    {%- endfor -%}
  ]
}
</script>
{%- endif -%}
```

**Alternative (simpler, hardcoded):** Since the FAQ accordion blocks are nested inside a generic section and there's no clean way to pass them to a snippet automatically, the most practical approach is to hardcode the FAQPage schema directly in `sections/product-main.liquid` after the Product schema. The FAQ content rarely changes.

**Add to `sections/product-main.liquid` after the Product schema `</script>` tag:**

```liquid
{%- comment -%} FAQPage schema — hardcoded from product FAQ accordion {%- endcomment -%}
{%- if template.suffix == 'hoodie' -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Will it fit me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you want to feel like you're wrapped in a cozy blanket, yes. Our hoodies are intentionally oversized with custom cut and sew measurements, not fitted clothing. Customers from size XS to 3XL love the fit. It's giant on purpose."
      }
    },
    {
      "@type": "Question",
      "name": "What does the fabric feel like?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Super soft, lightweight sponge fleece — the kind you never want to take off. It's plush and cozy without being heavy or bulky. Our customers describe it as \"wearing a hug.\" Once you feel it, you'll get it."
      }
    },
    {
      "@type": "Question",
      "name": "How do I wash my Giant Hoodie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With love! Our sponge fleece is super soft but delicate. Tie little knots in the drawstring ends so they don't pull out, wash alone or with soft clothes only, cold water on the gentle cycle, and always air dry — no dryer. Treat it right and you'll stay in love for years."
      }
    },
    {
      "@type": "Question",
      "name": "How fast will I get my order?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Really, really fast. Most orders ship same or next business day and arrive in 3-4 days within the US. Every hoodie is printed and packed by hand at our facility in Northwest Arkansas. We include a handwritten thank-you card in every box."
      }
    },
    {
      "@type": "Question",
      "name": "Can I wear it in summer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Our sponge fleece is lightweight and breathable — not heavy or bulky at all. Customers wear them year-round: in blasting AC, on summer movie nights, and even outside in warm weather. It's cozy without the sweat."
      }
    },
    {
      "@type": "Question",
      "name": "What if I don't love it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We're confident you will, but we've got you covered. Our 30-day \"Best Hoodie Ever\" Guarantee means if something isn't right, just reach out and we'll make it right. Less than 1% of our orders are returned. The average apparel brand sees 21%."
      }
    },
    {
      "@type": "Question",
      "name": "Do I save more if I buy multiple?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Buy 2 hoodies and save $20 on each. Buy 3 or more and save $32 on each — that's as low as $39 per hoodie. The more you buy, the more you save. Mix and match any designs."
      }
    },
    {
      "@type": "Question",
      "name": "Where are you located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every single hoodie is printed and packed by hand at our facility in Fayetteville, Arkansas, in the USA. We're a small team of 5 who genuinely love what we do — and we put a handwritten thank-you card in every order."
      }
    }
  ]
}
</script>
{%- endif -%}
```

**Note:** The `template.suffix == 'hoodie'` check ensures this only renders on hoodie product pages that have the FAQ section. If other product templates get FAQs later, add their suffix or remove the conditional.

---

## 3. Add BreadcrumbList Schema

**Priority:** High
**Impact:** Breadcrumb rich results in Google, plus helps Google understand site hierarchy.
**File:** `snippets/meta-tags.liquid` (or create `snippets/breadcrumb-schema.liquid` and render from `layout/theme.liquid`)

**Create:** `snippets/breadcrumb-schema.liquid`

```liquid
{%- comment -%}
  BreadcrumbList JSON-LD schema.
  Renders on product and collection pages.
{%- endcomment -%}

{%- if request.page_type == 'product' or request.page_type == 'collection' -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "{{ shop.url }}"
    }
    {%- if request.page_type == 'collection' -%}
    ,{
      "@type": "ListItem",
      "position": 2,
      "name": {{ collection.title | json }},
      "item": "{{ shop.url }}{{ collection.url }}"
    }
    {%- elsif request.page_type == 'product' -%}
    {%- if product.collections.size > 0 -%}
    {%- assign primary_collection = product.collections | first -%}
    ,{
      "@type": "ListItem",
      "position": 2,
      "name": {{ primary_collection.title | json }},
      "item": "{{ shop.url }}{{ primary_collection.url }}"
    }
    {%- endif -%}
    ,{
      "@type": "ListItem",
      "position": {% if product.collections.size > 0 %}3{% else %}2{% endif %},
      "name": {{ product.title | json }},
      "item": "{{ shop.url }}{{ product.url }}"
    }
    {%- endif -%}
  ]
}
</script>
{%- endif -%}
```

**Render from `layout/theme.liquid`** inside `<head>`, after `{% render 'meta-tags' %}`:

```liquid
{% render 'breadcrumb-schema' %}
```

---

## 4. Add WebSite Schema with SearchAction

**Priority:** Medium
**Impact:** Enables sitelinks search box in Google when your brand is searched.
**File:** `snippets/meta-tags.liquid` (append at end) or `layout/theme.liquid`

**Add to `snippets/meta-tags.liquid` at the bottom, only on homepage:**

```liquid
{%- if request.page_type == 'index' -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": {{ shop.name | json }},
  "url": "{{ shop.url }}",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "{{ shop.url }}/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
{%- endif -%}
```

---

## 5. Enhance Organization Schema

**Priority:** Medium
**Impact:** Richer knowledge panel in Google, better brand entity understanding.
**File:** `sections/header.liquid:264-274`

**Current:**
```liquid
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": {{ shop.name | json }},
    {% if settings.logo %}
      "logo": {{ settings.logo | image_url: width: 500 | prepend: "https:" | json }},
    {% endif %}
    "url": {{ request.origin | append: page.url | json }}
  }
</script>
```

**Replace with:**
```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": {{ shop.name | json }},
  {%- if settings.logo -%}
  "logo": {{ settings.logo | image_url: width: 500 | prepend: "https:" | json }},
  {%- endif -%}
  "url": "{{ shop.url }}",
  "sameAs": [
    {%- if settings.social_facebook_link != blank -%}{{ settings.social_facebook_link | json }},{%- endif -%}
    {%- if settings.social_instagram_link != blank -%}{{ settings.social_instagram_link | json }},{%- endif -%}
    {%- if settings.social_twitter_link != blank -%}{{ settings.social_twitter_link | json }},{%- endif -%}
    {%- if settings.social_tiktok_link != blank -%}{{ settings.social_tiktok_link | json }},{%- endif -%}
    {%- if settings.social_youtube_link != blank -%}{{ settings.social_youtube_link | json }},{%- endif -%}
    {%- if settings.social_pinterest_link != blank -%}{{ settings.social_pinterest_link | json }}{%- endif -%}
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "{{ shop.email }}"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Fayetteville",
    "addressRegion": "AR",
    "addressCountry": "US"
  }
}
</script>
```

**What changed:**
- Fixed `url` to use `shop.url` (was incorrectly using `request.origin | append: page.url` which changes per page)
- Added `sameAs` array pulling from Shopify's built-in social link settings
- Added `contactPoint` with store email
- Added `address` for Fayetteville, AR

**Prerequisite:** Social profile URLs need to be set in Shopify Admin > Settings > Brand > Social media accounts (or theme settings). Currently no social links are configured in `settings_data.json`. The `sameAs` array handles blank values gracefully — it just won't render empty entries.

**Note on trailing commas:** The `sameAs` array has a trailing comma issue when some social links are blank and others aren't. A cleaner approach uses a Liquid array:

```liquid
{%- liquid
  assign social_links = ''
  if settings.social_facebook_link != blank
    assign social_links = social_links | append: settings.social_facebook_link | append: '||'
  endif
  if settings.social_instagram_link != blank
    assign social_links = social_links | append: settings.social_instagram_link | append: '||'
  endif
  if settings.social_twitter_link != blank
    assign social_links = social_links | append: settings.social_twitter_link | append: '||'
  endif
  if settings.social_tiktok_link != blank
    assign social_links = social_links | append: settings.social_tiktok_link | append: '||'
  endif
  if settings.social_youtube_link != blank
    assign social_links = social_links | append: settings.social_youtube_link | append: '||'
  endif
  if settings.social_pinterest_link != blank
    assign social_links = social_links | append: settings.social_pinterest_link | append: '||'
  endif
  assign social_links_array = social_links | split: '||'
-%}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": {{ shop.name | json }},
  {%- if settings.logo -%}
  "logo": {{ settings.logo | image_url: width: 500 | prepend: "https:" | json }},
  {%- endif -%}
  "url": "{{ shop.url }}",
  {%- if social_links_array.size > 0 -%}
  "sameAs": [
    {%- for link in social_links_array -%}
      {{ link | json }}{% unless forloop.last %},{% endunless %}
    {%- endfor -%}
  ],
  {%- endif -%}
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "{{ shop.email }}"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Fayetteville",
    "addressRegion": "AR",
    "addressCountry": "US"
  }
}
</script>
```

---

## 6. Add CollectionPage Schema

**Priority:** Medium
**Impact:** Helps Google understand collection pages as curated product lists.
**File:** Create `snippets/collection-schema.liquid`, render from the collection template.

**Create:** `snippets/collection-schema.liquid`

```liquid
{%- comment -%}
  CollectionPage + ItemList JSON-LD schema for collection pages.
{%- endcomment -%}

{%- if collection != blank -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": {{ collection.title | json }},
  "url": "{{ shop.url }}{{ collection.url }}",
  {%- if collection.description != blank -%}
  "description": {{ collection.description | strip_html | truncate: 500 | json }},
  {%- endif -%}
  {%- if collection.image -%}
  "image": {{ collection.image | image_url: width: 1200 | prepend: "https:" | json }},
  {%- endif -%}
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": {{ collection.products_count }},
    "itemListElement": [
      {%- for product in collection.products limit: 12 -%}
      {
        "@type": "ListItem",
        "position": {{ forloop.index }},
        "url": "{{ shop.url }}{{ product.url }}"
      }{% unless forloop.last %},{% endunless %}
      {%- endfor -%}
    ]
  }
}
</script>
{%- endif -%}
```

**Render:** Add to the collection template's main section or render from `layout/theme.liquid` conditionally:

```liquid
{%- if request.page_type == 'collection' -%}
  {% render 'collection-schema' %}
{%- endif -%}
```

**Note:** Limited to first 12 products to keep the schema payload reasonable. Google doesn't need every product listed here — they discover individual product pages through crawling.

---

## 7. Add twitter:image Meta Tag

**Priority:** Low
**Impact:** Controls how links look when shared on Twitter/X.
**File:** `snippets/meta-tags.liquid`

**Add after line 101** (after the `twitter:description` meta tag):

```liquid
{%- if page_image -%}
<meta
  name="twitter:image"
  content="https:{{ page_image | image_url }}"
>
{%- endif -%}
```

---

## Summary

| # | Schema | File | Priority | Rich Result |
|---|--------|------|----------|-------------|
| 1 | AggregateRating (Product) | `sections/product-main.liquid` | **Critical** | Star ratings in SERPs |
| 2 | FAQPage | `sections/product-main.liquid` | **Critical** | Expandable Q&A in SERPs |
| 3 | BreadcrumbList | New: `snippets/breadcrumb-schema.liquid` | **High** | Breadcrumb trail in SERPs |
| 4 | WebSite + SearchAction | `snippets/meta-tags.liquid` | **Medium** | Sitelinks search box |
| 5 | Organization (enhanced) | `sections/header.liquid` | **Medium** | Richer knowledge panel |
| 6 | CollectionPage + ItemList | New: `snippets/collection-schema.liquid` | **Medium** | Better collection indexing |
| 7 | twitter:image | `snippets/meta-tags.liquid` | **Low** | Better Twitter/X cards |

---

## Implementation Order

1. **AggregateRating** — highest ROI, single file edit
2. **FAQPage** — second highest ROI, single file edit
3. **twitter:image** — one line, do it while you're in meta-tags.liquid
4. **WebSite schema** — small addition to meta-tags.liquid
5. **BreadcrumbList** — new snippet + one render call
6. **Organization enhancement** — moderate edit, needs social links configured in Shopify Admin first
7. **CollectionPage** — new snippet + one render call

---

## Validation

After implementing, test with:
- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Schema.org Validator:** https://validator.schema.org/
- **Google Search Console:** Enhancements reports (FAQ, Product, Breadcrumb tabs appear after Google processes the markup)

Test at minimum:
- [ ] One product page (AggregateRating + FAQPage + BreadcrumbList)
- [ ] Homepage (WebSite + Organization)
- [ ] One collection page (CollectionPage + BreadcrumbList)
