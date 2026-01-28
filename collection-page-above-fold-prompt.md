# Task: Rebuild Collection Page Above-the-Fold

Rebuild the top section of `/collections/hoodies` to match the Hollow Socks layout structure, using Giant Hoodies brand styling and copy.

**Reference:** See attached `hollow-socks-collection.png`

---

## What We're Building (Top to Bottom)

| # | Component | Hollow Has | We'll Have |
|---|-----------|------------|------------|
| 1 | **Hero Banner** | Warehouse sale promo with background image | Promotional banner (admin-controlled) |
| 2 | **Filter Buttons** | "FILTER:" + category pills | Same layout, our categories |
| 3 | **Collection Description** | Product value prop paragraph | Giant Hoodies value prop |
| 4 | **Section Header** | "EVERYDAY" | "GIANT HOODIES" |
| 5 | **Feature Cards** | 2 benefit cards with product imagery | 2 benefit cards (optional Phase 2) |

---

## Component 1: Hero Banner

### Layout (Copy from Hollow)
- Full-width, edge-to-edge
- Background image with dark overlay for text legibility
- Text left-aligned, vertically centered
- Mobile: ~200px height
- Desktop: ~300px height

### Content Structure
```
[Small label tag]     ← "WAREHOUSE SALE" style pill/badge
[Large headline]      ← Main promo message
[Accent headline]     ← Secondary line (different color)
[Subheadline]         ← Supporting text
```

### Giant Hoodies Styling

**Background overlay:**
```css
background: linear-gradient(90deg, rgba(61, 48, 40, 0.85) 0%, rgba(61, 48, 40, 0.4) 100%);
```

**Small label (pill badge):**
```css
background: var(--color-terracotta);  /* #c4704b */
color: white;
font-family: var(--font-body);  /* DM Sans */
font-size: 0.7rem;
font-weight: 600;
letter-spacing: 0.1em;
text-transform: uppercase;
padding: 6px 14px;
border-radius: 9999px;
display: inline-block;
margin-bottom: 12px;
```

**Large headline:**
```css
font-family: var(--font-heading);  /* Fraunces */
font-size: 2rem;  /* mobile */
font-size: 3rem;  /* desktop */
font-weight: 600;
color: var(--color-cream);  /* #faf7f4 */
line-height: 1.1;
```

**Accent line:**
```css
color: var(--color-terracotta);  /* #c4704b */
/* Same font specs as large headline */
```

**Subheadline:**
```css
font-family: var(--font-body);
font-size: 0.95rem;
font-weight: 500;
color: var(--color-cream);
margin-top: 8px;
letter-spacing: 0.05em;
text-transform: uppercase;
```

### Default Copy (Admin-Editable)

**When `settings.pricing_mode == 'tiered'`:**
- Label: "COZY SAVINGS"
- Headline: "BUY MORE"
- Accent: "SAVE MORE"
- Subheadline: "2 FOR $45 EACH · 3+ FOR $39 EACH"

**When `settings.pricing_mode == 'flat'`:**
- Pull from `settings.collection_banner_label`
- Pull from `settings.collection_banner_headline`
- Pull from `settings.collection_banner_accent`
- Pull from `settings.collection_banner_subheadline`

### Admin Settings to Add

```json
{
  "type": "header",
  "content": "Collection Banner"
},
{
  "type": "image_picker",
  "id": "collection_banner_image",
  "label": "Banner Background Image"
},
{
  "type": "text",
  "id": "collection_banner_label",
  "label": "Banner Label (small pill)",
  "default": "COZY SAVINGS"
},
{
  "type": "text",
  "id": "collection_banner_headline",
  "label": "Banner Headline",
  "default": "BUY MORE"
},
{
  "type": "text",
  "id": "collection_banner_accent",
  "label": "Banner Accent Line",
  "default": "SAVE MORE"
},
{
  "type": "text",
  "id": "collection_banner_subheadline",
  "label": "Banner Subheadline",
  "default": "2 FOR $45 EACH · 3+ FOR $39 EACH"
}
```

---

## Component 2: Filter Buttons

### Layout (Copy from Hollow exactly)
- "FILTER:" label centered above
- Horizontal row of pill buttons
- Mobile: horizontally scrollable, no wrap
- Desktop: centered, wraps if needed
- ~12px gap between buttons

### Categories (in order)

| Label | URL |
|-------|-----|
| Best Sellers | `/collections/best-sellers` |
| New Arrivals | `/collections/latest-products` |
| Animals | `/collections/animals?filter.p.product_type=Hoodie` |
| Funny | `/collections/funny?filter.p.product_type=Hoodie` |
| Holidays | `/collections/holidays?filter.p.product_type=Hoodie` |
| Blanks | `/collections/blank-hoodies` |
| Custom | `/collections/customize-your-own` |

### Styling

**"FILTER:" label:**
```css
font-family: var(--font-body);
font-size: 0.75rem;
font-weight: 700;
letter-spacing: 0.1em;
text-transform: uppercase;
color: var(--color-espresso);
text-align: center;
margin-bottom: 16px;
```

**Inactive button:**
```css
background: transparent;
color: var(--color-espresso);
border: 2px solid var(--color-espresso);
padding: 12px 24px;
border-radius: 9999px;
font-family: var(--font-body);
font-size: 0.95rem;
font-weight: 600;
white-space: nowrap;
text-decoration: none;
transition: background-color 150ms ease;
```

**Inactive hover:**
```css
background: var(--color-sand);
```

**Active button:**
```css
background: var(--color-espresso);
color: var(--color-cream);
border: 2px solid var(--color-espresso);
```

### Active State Logic
- Match `{{ request.path }}` against filter URLs
- Default "Best Sellers" active when on `/collections/hoodies`

---

## Component 3: Collection Description

### Layout (Copy from Hollow)
- Centered text block
- Max-width ~700px
- Padding: 32px horizontal, 24px vertical
- Sits between filter buttons and section header

### Giant Hoodies Copy

```
Giant Hoodies are intentionally oversized, made with super-soft 
sponge fleece, and printed by hand right here in the USA. They're 
as soft as cashmere, cozy as your favorite blanket, and designed 
to wrap you in comfort wherever life takes you.
```

### Styling

```css
.collection-description {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px 20px 32px;
  text-align: center;
}

.collection-description p {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-warm-gray);  /* #5a4a3d */
}
```

---

## Component 4: Section Header

### Layout (Copy from Hollow)
- Centered
- Large, bold, all caps
- Generous whitespace above and below

### Copy
Use the collection title, or default to "GIANT HOODIES"

```liquid
{{ collection.title | upcase | default: 'GIANT HOODIES' }}
```

### Styling

```css
.collection-section-header {
  text-align: center;
  padding: 16px 20px 32px;
}

.collection-section-header h2 {
  font-family: var(--font-heading);
  font-size: 1.75rem;  /* mobile */
  font-weight: 600;
  color: var(--color-espresso);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0;
}

@media (min-width: 768px) {
  .collection-section-header h2 {
    font-size: 2.25rem;
  }
}
```

---

## Component 5: Feature Cards (Optional — Phase 2)

Hollow shows two horizontal cards with product benefits. We can add these later if desired.

**Potential Giant Hoodies version:**

| Card 1 | Card 2 |
|--------|--------|
| "COZY IN ANY WEATHER" | "OVERSIZED ON PURPOSE" |
| "Warmth Without the Bulk" | "One Size Fits Most" |
| - Super soft sponge fleece | - Wearable blanket fit |
| - Lightweight but warm | - Giant on everyone |
| [Product image] | [Product image] |

**Skip for now** — focus on components 1-4 first.

---

## File Structure

Create ONE section file that contains all components:

```
sections/collection-header-full.liquid
```

This section replaces the default collection header and includes:
1. Hero banner
2. Filter buttons
3. Collection description
4. Section header

The product grid remains separate (existing section).

---

## Full Section Template

```liquid
{%- comment -%}
  Collection Header Full
  Includes: Hero banner, filter buttons, description, section title
  Layout reference: Hollow Socks collection page
{%- endcomment -%}

{%- liquid
  assign current_path = request.path
  assign pricing_mode = settings.pricing_mode | default: 'tiered'
-%}

<div class="collection-header-full">
  
  {%- comment -%} ========== HERO BANNER ========== {%- endcomment -%}
  <div class="collection-banner" {% if section.settings.collection_banner_image %}style="background-image: url('{{ section.settings.collection_banner_image | image_url: width: 1600 }}')"{% endif %}>
    <div class="collection-banner__overlay">
      <div class="collection-banner__content">
        
        {%- if pricing_mode == 'tiered' -%}
          <span class="collection-banner__label">Cozy Savings</span>
          <h1 class="collection-banner__headline">
            Buy More<br>
            <span class="collection-banner__accent">Save More</span>
          </h1>
          <p class="collection-banner__subheadline">2 for $45 each · 3+ for $39 each</p>
        {%- else -%}
          {% if section.settings.collection_banner_label != blank %}
            <span class="collection-banner__label">{{ section.settings.collection_banner_label }}</span>
          {% endif %}
          <h1 class="collection-banner__headline">
            {{ section.settings.collection_banner_headline | default: 'Shop Hoodies' }}<br>
            {% if section.settings.collection_banner_accent != blank %}
              <span class="collection-banner__accent">{{ section.settings.collection_banner_accent }}</span>
            {% endif %}
          </h1>
          {% if section.settings.collection_banner_subheadline != blank %}
            <p class="collection-banner__subheadline">{{ section.settings.collection_banner_subheadline }}</p>
          {% endif %}
        {%- endif -%}
        
      </div>
    </div>
  </div>

  {%- comment -%} ========== FILTER BUTTONS ========== {%- endcomment -%}
  <nav class="filter-buttons" aria-label="Collection filters">
    <p class="filter-buttons__label">Filter:</p>
    
    <div class="filter-buttons__list">
      {%- assign filters = "Best Sellers|/collections/best-sellers,New Arrivals|/collections/latest-products,Animals|/collections/animals?filter.p.product_type=Hoodie,Funny|/collections/funny?filter.p.product_type=Hoodie,Holidays|/collections/holidays?filter.p.product_type=Hoodie,Blanks|/collections/blank-hoodies,Custom|/collections/customize-your-own" | split: "," -%}
      
      {%- for filter in filters -%}
        {%- assign parts = filter | split: "|" -%}
        {%- assign label = parts[0] -%}
        {%- assign url = parts[1] -%}
        {%- assign url_path = url | split: "?" | first -%}
        
        {%- assign is_active = false -%}
        {%- if current_path == url_path -%}
          {%- assign is_active = true -%}
        {%- endif -%}
        
        {%- comment -%} Default Best Sellers on main hoodies collection {%- endcomment -%}
        {%- if current_path == '/collections/hoodies' and label == 'Best Sellers' -%}
          {%- assign is_active = true -%}
        {%- endif -%}
        
        <a 
          href="{{ url }}"
          class="filter-buttons__btn{% if is_active %} filter-buttons__btn--active{% endif %}"
          {% if is_active %}aria-current="page"{% endif %}
        >
          {{- label -}}
        </a>
      {%- endfor -%}
    </div>
  </nav>

  {%- comment -%} ========== COLLECTION DESCRIPTION ========== {%- endcomment -%}
  <div class="collection-description">
    <p>{{ section.settings.collection_description | default: "Giant Hoodies are intentionally oversized, made with super-soft sponge fleece, and printed by hand right here in the USA. They're as soft as cashmere, cozy as your favorite blanket, and designed to wrap you in comfort wherever life takes you." }}</p>
  </div>

  {%- comment -%} ========== SECTION HEADER ========== {%- endcomment -%}
  <div class="collection-section-header">
    <h2>{{ collection.title | upcase | default: 'GIANT HOODIES' }}</h2>
  </div>

</div>

<style>
  /* ========== HERO BANNER ========== */
  .collection-banner {
    position: relative;
    width: 100%;
    min-height: 200px;
    background-color: var(--color-espresso, #3d3028);
    background-size: cover;
    background-position: center;
  }
  
  @media (min-width: 768px) {
    .collection-banner {
      min-height: 280px;
    }
  }
  
  .collection-banner__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(61, 48, 40, 0.9) 0%, rgba(61, 48, 40, 0.5) 60%, rgba(61, 48, 40, 0.3) 100%);
    display: flex;
    align-items: center;
  }
  
  .collection-banner__content {
    padding: 24px 20px;
    max-width: 600px;
  }
  
  @media (min-width: 768px) {
    .collection-banner__content {
      padding: 40px 48px;
    }
  }
  
  .collection-banner__label {
    display: inline-block;
    background: var(--color-terracotta, #c4704b);
    color: white;
    font-family: var(--font-body, 'DM Sans', sans-serif);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 9999px;
    margin-bottom: 12px;
  }
  
  .collection-banner__headline {
    font-family: var(--font-heading, 'Fraunces', Georgia, serif);
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-cream, #faf7f4);
    line-height: 1.1;
    margin: 0 0 8px 0;
    text-transform: uppercase;
  }
  
  @media (min-width: 768px) {
    .collection-banner__headline {
      font-size: 3rem;
    }
  }
  
  .collection-banner__accent {
    color: var(--color-terracotta, #c4704b);
  }
  
  .collection-banner__subheadline {
    font-family: var(--font-body, 'DM Sans', sans-serif);
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--color-cream, #faf7f4);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin: 12px 0 0 0;
    opacity: 0.9;
  }
  
  /* ========== FILTER BUTTONS ========== */
  .filter-buttons {
    padding: 28px 16px 20px;
    background: var(--color-cream, #faf7f4);
  }
  
  .filter-buttons__label {
    text-align: center;
    font-family: var(--font-body, 'DM Sans', sans-serif);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-espresso, #3d3028);
    margin: 0 0 16px 0;
  }
  
  .filter-buttons__list {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 4px 4px 8px;
  }
  
  .filter-buttons__list::-webkit-scrollbar {
    display: none;
  }
  
  @media (min-width: 768px) {
    .filter-buttons__list {
      flex-wrap: wrap;
      justify-content: center;
      overflow-x: visible;
      max-width: 900px;
      margin: 0 auto;
      gap: 12px;
    }
  }
  
  .filter-buttons__btn {
    flex-shrink: 0;
    padding: 12px 24px;
    font-family: var(--font-body, 'DM Sans', sans-serif);
    font-size: 0.95rem;
    font-weight: 600;
    text-decoration: none;
    border-radius: 9999px;
    border: 2px solid var(--color-espresso, #3d3028);
    background: transparent;
    color: var(--color-espresso, #3d3028);
    white-space: nowrap;
    transition: background-color 150ms ease, color 150ms ease;
  }
  
  .filter-buttons__btn:hover {
    background: var(--color-sand, #e8d5c4);
  }
  
  .filter-buttons__btn--active,
  .filter-buttons__btn--active:hover {
    background: var(--color-espresso, #3d3028);
    color: var(--color-cream, #faf7f4);
  }
  
  /* ========== COLLECTION DESCRIPTION ========== */
  .collection-description {
    max-width: 720px;
    margin: 0 auto;
    padding: 8px 24px 24px;
    text-align: center;
    background: var(--color-cream, #faf7f4);
  }
  
  .collection-description p {
    font-family: var(--font-body, 'DM Sans', sans-serif);
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-warm-gray, #5a4a3d);
    margin: 0;
  }
  
  /* ========== SECTION HEADER ========== */
  .collection-section-header {
    text-align: center;
    padding: 24px 20px 32px;
    background: var(--color-cream, #faf7f4);
  }
  
  .collection-section-header h2 {
    font-family: var(--font-heading, 'Fraunces', Georgia, serif);
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--color-espresso, #3d3028);
    letter-spacing: 0.05em;
    margin: 0;
  }
  
  @media (min-width: 768px) {
    .collection-section-header h2 {
      font-size: 2.25rem;
    }
  }
</style>

{% schema %}
{
  "name": "Collection Header Full",
  "tag": "section",
  "class": "collection-header-full-section",
  "settings": [
    {
      "type": "header",
      "content": "Hero Banner"
    },
    {
      "type": "image_picker",
      "id": "collection_banner_image",
      "label": "Background Image",
      "info": "Recommended: 1600x600px. Will have dark overlay applied."
    },
    {
      "type": "text",
      "id": "collection_banner_label",
      "label": "Label (small pill)",
      "default": "Cozy Savings",
      "info": "Used in Flat pricing mode"
    },
    {
      "type": "text",
      "id": "collection_banner_headline",
      "label": "Headline",
      "default": "Shop Hoodies",
      "info": "Used in Flat pricing mode"
    },
    {
      "type": "text",
      "id": "collection_banner_accent",
      "label": "Accent Line",
      "default": "Save Big",
      "info": "Used in Flat pricing mode. Displays in terracotta."
    },
    {
      "type": "text",
      "id": "collection_banner_subheadline",
      "label": "Subheadline",
      "info": "Used in Flat pricing mode"
    },
    {
      "type": "header",
      "content": "Collection Description"
    },
    {
      "type": "textarea",
      "id": "collection_description",
      "label": "Description Text",
      "default": "Giant Hoodies are intentionally oversized, made with super-soft sponge fleece, and printed by hand right here in the USA. They're as soft as cashmere, cozy as your favorite blanket, and designed to wrap you in comfort wherever life takes you."
    }
  ],
  "presets": [
    {
      "name": "Collection Header Full"
    }
  ]
}
{% endschema %}
```

---

## Implementation Steps

1. **Create the section file** at `sections/collection-header-full.liquid`

2. **Update the collection template** (`templates/collection.json` or `templates/collection.hoodies.json`):
   - Remove or hide the default collection banner/header section
   - Add `collection-header-full` section at the top
   - Keep the existing product grid section below it

3. **Verify CSS variables exist** in your theme's base CSS:
   ```css
   :root {
     --color-terracotta: #c4704b;
     --color-espresso: #3d3028;
     --color-cream: #faf7f4;
     --color-sand: #e8d5c4;
     --color-warm-gray: #5a4a3d;
     --font-heading: 'Fraunces', Georgia, serif;
     --font-body: 'DM Sans', system-ui, sans-serif;
   }
   ```

4. **Test on mobile and desktop**

---

## Test Checklist

### Hero Banner
- [ ] Displays with background image (or solid espresso if no image)
- [ ] Tiered mode shows "Buy More / Save More" copy
- [ ] Flat mode pulls from section settings
- [ ] Text readable over image (overlay working)
- [ ] Responsive sizing (shorter on mobile)

### Filter Buttons
- [ ] All 7 buttons display
- [ ] Mobile: horizontal scroll, no wrap
- [ ] Desktop: centered, wraps to 2 rows
- [ ] Active state highlights correct filter
- [ ] Links navigate to correct collections

### Description
- [ ] Centered, readable paragraph
- [ ] Correct font and color

### Section Header
- [ ] Shows collection title in caps
- [ ] Correct heading font (Fraunces)

### Overall
- [ ] Cream background throughout
- [ ] Consistent spacing between components
- [ ] No horizontal overflow on mobile
- [ ] Matches Hollow Socks layout proportions

---

## Do NOT

- Add countdown timers or fake urgency
- Hardcode prices (use settings or Liquid)
- Change the filter button order without asking
- Add the feature cards (Phase 2 — skip for now)
- Use any colors outside the brand palette
