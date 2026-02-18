# Judge.me Widget Upgrade

## Status: PAUSED — Ready to push and test

## What was done

1. **Created** `sections/judgeme-reviews.liquid` with the new Judge.me review widget Liquid code
2. **Updated 5 product JSON templates** to replace the old app block with the new section:
   - `templates/product.json`
   - `templates/product.hoodie.json`
   - `templates/product.blanket.json`
   - `templates/product.shirt.json`
   - `templates/product.messup.json`
   - In each: replaced the `_blocks` section (`176990038240a2df4c`) containing `shopify://apps/judge-me-reviews/blocks/review_widget/...` with a `judgeme-reviews` section reference
3. **Left untouched:** The star rating badge in `sections/product-main.liquid` (lines 227-232) — it links to `#judgeme_product_reviews` and works with the new widget

## What still needs to happen

1. **Push theme changes** to Shopify
2. **Click "Start Upgrade"** in Judge.me dashboard (~28 min for 929 products)
3. **Verify** reviews render correctly on a product page after upgrade completes

## Important note

Judge.me warns "page builder product pages aren't supported yet" — this theme uses OS 2.0 JSON templates (page builder style). The Liquid snippet approach we used should work around this limitation since it bypasses the app block system.

## Rollback if needed

To revert, restore the `176990038240a2df4c` sections in each JSON template with the original `_blocks` + `shopify://apps/judge-me-reviews/blocks/review_widget/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8` app block, and delete `sections/judgeme-reviews.liquid`. The git history has the original state.
