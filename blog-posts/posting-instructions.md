# Blog Post Publishing Instructions

## Writing a New Post

Create a new markdown file in `blog-posts/` following the naming convention: `##-short-name.md` (e.g., `13-your-topic.md`).

Every post needs these sections:

### Metadata Block

```
## Shopify Settings (copy these into the blog post editor)

**Blog:** The Hoodie Blog
**Title:** Your Post Title Here
**URL handle:** `your-url-handle`
**Excerpt:** A 1-2 sentence summary of the post.
**Featured image:** Description of what image to use (added manually in Shopify).
**Featured image alt text:** Descriptive alt text with relevant keywords
**Author:** Matt
**Tags:** tag one, tag two, tag three

### SEO Settings (bottom of Shopify blog post editor)

**SEO title:** Your SEO Title (under 60 characters)
**SEO description:** Your meta description (under 160 characters).
```

### Article Body

Write the article content in markdown below the metadata block.

### HTML Version

At the bottom of the file, include the Shopify-ready HTML inside a fenced code block:

````
## HTML Version (for Shopify HTML editor)

```html
<p>Your HTML content here...</p>
```
````

The script reads the HTML from this code block — not the markdown body.

## Publishing

### First Time Only (already done)

The Shopify "Blog Publisher" app is set up and the access token is saved locally in `.shopify-token`. You don't need to do this again unless the token is revoked.

### Publishing New Posts

From the project root:

```bash
# 1. Preview — confirm the new post parses correctly
node publish-blog-posts.mjs --dry-run

# 2. Create as draft in Shopify
node publish-blog-posts.mjs --draft

# 3. Or publish live immediately
node publish-blog-posts.mjs
```

The script automatically skips posts that already exist in Shopify (matched by URL handle), so it's safe to re-run.

### After Publishing

1. Go to **Shopify Admin > Online Store > Blog posts > The Hoodie Blog**
2. Add a featured image to the new post (the markdown file has image suggestions)
3. Add any in-body images at the placements noted in the markdown file
4. Review the content, tags, and SEO fields
5. If you used `--draft`, publish the post when ready

## Troubleshooting

**"No access token found" error:**
The `.shopify-token` file may be missing. Re-run the setup:
```bash
SHOPIFY_CLIENT_ID=your_client_id SHOPIFY_CLIENT_SECRET=your_secret node publish-blog-posts.mjs --setup
```
Find your Client ID and Secret in the Shopify Dev Dashboard > Blog Publisher > Settings.

**Post already exists:**
The script skips duplicates by URL handle. If you need to update an existing post, edit it directly in Shopify Admin.

**API rate limit:**
The script waits 500ms between requests and backs off automatically if rate-limited. No action needed.
