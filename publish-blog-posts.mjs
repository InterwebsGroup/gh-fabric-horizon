#!/usr/bin/env node

/**
 * Publishes blog posts from markdown files to Shopify via the Admin API.
 *
 * First-time setup (run once to get an access token):
 *   SHOPIFY_CLIENT_ID=xxxx SHOPIFY_CLIENT_SECRET=xxxx node publish-blog-posts.mjs --setup
 *
 * Then publish:
 *   SHOPIFY_ACCESS_TOKEN=shpat_xxxx node publish-blog-posts.mjs [--dry-run] [--draft]
 *
 * Flags:
 *   --setup    Run OAuth flow to get an access token (one-time)
 *   --dry-run  Preview what would happen without calling the API
 *   --draft    Create articles as drafts instead of publishing immediately
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createServer } from "node:http";
import { URL } from "node:url";
import { exec } from "node:child_process";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SHOP = "giant-hoodies.myshopify.com";
const API_VERSION = "2024-01";
const BLOG_TITLE = "The Hoodie Blog";
const POSTS_DIR = join(import.meta.dirname, "blog-posts");
const TOKEN_FILE = join(import.meta.dirname, ".shopify-token");
const DELAY_MS = 500;
const OAUTH_PORT = 3456;
const REDIRECT_URI = `http://localhost:${OAUTH_PORT}/callback`;
const SCOPES = "read_content,write_content";

const SETUP = process.argv.includes("--setup");
const DRY_RUN = process.argv.includes("--dry-run");
const DRAFT = process.argv.includes("--draft");

// ---------------------------------------------------------------------------
// OAuth setup flow
// ---------------------------------------------------------------------------

async function setup() {
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("Error: SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET are required for --setup.");
    console.error("Find these in Dev Dashboard > Blog Publisher > Settings.");
    process.exit(1);
  }

  console.log("\n🔑 Shopify OAuth Setup\n");
  console.log("Starting local server for OAuth callback...");

  const token = await new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      const url = new URL(req.url, `http://localhost:${OAUTH_PORT}`);

      if (url.pathname === "/callback") {
        const code = url.searchParams.get("code");

        if (!code) {
          res.writeHead(400, { "Content-Type": "text/html" });
          res.end("<h1>Error: No authorization code received.</h1>");
          reject(new Error("No authorization code"));
          server.close();
          return;
        }

        // Exchange code for access token
        try {
          const tokenRes = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              client_id: clientId,
              client_secret: clientSecret,
              code,
            }),
          });

          if (!tokenRes.ok) {
            const body = await tokenRes.text();
            throw new Error(`Token exchange failed (${tokenRes.status}): ${body}`);
          }

          const data = await tokenRes.json();
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("<h1>✅ Success! You can close this tab.</h1><p>Access token saved. Return to your terminal.</p>");
          resolve(data.access_token);
        } catch (err) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end(`<h1>Error</h1><p>${err.message}</p>`);
          reject(err);
        }

        server.close();
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    server.listen(OAUTH_PORT, () => {
      const authUrl = `https://${SHOP}/admin/oauth/authorize?client_id=${clientId}&scope=${SCOPES}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

      console.log(`\nOpening browser for authorization...\n`);
      console.log(`If it doesn't open, visit:\n${authUrl}\n`);

      // Open browser (macOS)
      exec(`open "${authUrl}"`);
    });

    // Timeout after 2 minutes
    setTimeout(() => {
      server.close();
      reject(new Error("OAuth timed out after 2 minutes"));
    }, 120_000);
  });

  // Save token
  await writeFile(TOKEN_FILE, token, "utf-8");
  console.log(`\n✅ Access token saved to .shopify-token`);
  console.log(`\nYou can now run:`);
  console.log(`  node publish-blog-posts.mjs --dry-run`);
  console.log(`  node publish-blog-posts.mjs --draft`);
  console.log(`  node publish-blog-posts.mjs\n`);
}

// ---------------------------------------------------------------------------
// Resolve access token
// ---------------------------------------------------------------------------

async function getToken() {
  // 1. Environment variable (explicit)
  if (process.env.SHOPIFY_ACCESS_TOKEN) {
    return process.env.SHOPIFY_ACCESS_TOKEN;
  }

  // 2. Saved token file from --setup
  try {
    const token = (await readFile(TOKEN_FILE, "utf-8")).trim();
    if (token) return token;
  } catch {}

  return null;
}

// ---------------------------------------------------------------------------
// Shopify API helpers
// ---------------------------------------------------------------------------

let ACCESS_TOKEN;

async function shopifyFetch(path, options = {}) {
  const url = `https://${SHOP}/admin/api/${API_VERSION}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": ACCESS_TOKEN,
      ...options.headers,
    },
  });

  // Rate-limit back-off: respect Retry-After header
  if (res.status === 429) {
    const retryAfter = parseFloat(res.headers.get("Retry-After") || "2");
    console.log(`  Rate limited — waiting ${retryAfter}s...`);
    await sleep(retryAfter * 1000);
    return shopifyFetch(path, options);
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Shopify API ${res.status}: ${body}`);
  }

  return res.json();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ---------------------------------------------------------------------------
// Markdown parsing
// ---------------------------------------------------------------------------

function parsePost(content, filename) {
  const get = (label) => {
    const re = new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`, "i");
    const m = content.match(re);
    return m ? m[1].trim() : "";
  };

  const title = get("Title");
  const handleRaw = get("URL handle");
  const handle = handleRaw.replace(/`/g, "");
  const excerpt = get("Excerpt");
  const author = get("Author");
  const tagsRaw = get("Tags");
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .join(", ");

  const seoTitle = get("SEO title");
  const seoDescription = get("SEO description");

  // Extract HTML from the ```html code block
  const htmlMatch = content.match(/```html\n([\s\S]*?)```/);
  const html = htmlMatch ? htmlMatch[1].trim() : "";

  return { filename, title, handle, excerpt, author, tags, seoTitle, seoDescription, html };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // Handle --setup mode
  if (SETUP) {
    await setup();
    return;
  }

  // Resolve token
  ACCESS_TOKEN = await getToken();

  if (!ACCESS_TOKEN && !DRY_RUN) {
    console.error("Error: No access token found.");
    console.error("");
    console.error("Either run setup first:");
    console.error("  SHOPIFY_CLIENT_ID=xxxx SHOPIFY_CLIENT_SECRET=xxxx node publish-blog-posts.mjs --setup");
    console.error("");
    console.error("Or pass the token directly:");
    console.error("  SHOPIFY_ACCESS_TOKEN=shpat_xxxx node publish-blog-posts.mjs");
    process.exit(1);
  }

  console.log(`\n📝 Shopify Blog Publisher`);
  console.log(`   Mode: ${DRY_RUN ? "DRY RUN (no API calls)" : DRAFT ? "DRAFT" : "PUBLISH"}\n`);

  // 1. Read and parse all markdown files
  const files = (await readdir(POSTS_DIR))
    .filter((f) => /^\d{2}-.*\.md$/.test(f))
    .sort();

  const posts = [];
  for (const file of files) {
    const content = await readFile(join(POSTS_DIR, file), "utf-8");
    const post = parsePost(content, file);

    if (!post.title || !post.handle || !post.html) {
      console.warn(`⚠️  Skipping ${file} — missing title, handle, or HTML`);
      continue;
    }

    posts.push(post);
  }

  console.log(`Found ${posts.length} posts:\n`);
  for (const p of posts) {
    console.log(`  ${p.filename}`);
    console.log(`    Title:  ${p.title}`);
    console.log(`    Handle: ${p.handle}`);
    console.log(`    HTML:   ${p.html.length.toLocaleString()} chars`);
    console.log(`    Tags:   ${p.tags}`);
    console.log(`    SEO:    ${p.seoTitle || "(none)"}`);
    console.log();
  }

  if (DRY_RUN) {
    console.log("Dry run complete — no API calls made.\n");
    return;
  }

  // 2. Look up the blog ID
  console.log(`Looking up blog "${BLOG_TITLE}"...`);
  const { blogs } = await shopifyFetch("/blogs.json");
  const blog = blogs.find(
    (b) => b.title.toLowerCase() === BLOG_TITLE.toLowerCase()
  );
  if (!blog) {
    console.error(`Error: Blog "${BLOG_TITLE}" not found. Available blogs:`);
    blogs.forEach((b) => console.error(`  - "${b.title}" (id: ${b.id})`));
    process.exit(1);
  }
  console.log(`  Found blog id: ${blog.id}\n`);

  // 3. Get existing articles to skip duplicates
  console.log("Checking existing articles...");
  let existingHandles = new Set();
  let page = `/blogs/${blog.id}/articles.json?limit=250&fields=id,handle`;
  while (page) {
    const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}${page}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ACCESS_TOKEN,
      },
    });
    const data = await res.json();
    for (const a of data.articles || []) {
      existingHandles.add(a.handle);
    }
    // Pagination via Link header
    const link = res.headers.get("Link") || "";
    const nextMatch = link.match(/<[^>]*page_info=([^>&]+)[^>]*>;\s*rel="next"/);
    if (nextMatch) {
      page = `/blogs/${blog.id}/articles.json?limit=250&page_info=${nextMatch[1]}`;
    } else {
      page = null;
    }
  }
  console.log(`  Found ${existingHandles.size} existing article(s)\n`);

  // 4. Create articles
  let created = 0;
  let skipped = 0;
  const errors = [];

  for (const post of posts) {
    if (existingHandles.has(post.handle)) {
      console.log(`⏭️  Skipping "${post.title}" — already exists (handle: ${post.handle})`);
      skipped++;
      continue;
    }

    console.log(`📤 Creating "${post.title}"...`);

    const articlePayload = {
      article: {
        title: post.title,
        handle: post.handle,
        author: post.author || "Matt",
        body_html: post.html,
        summary_html: post.excerpt,
        tags: post.tags,
        published: !DRAFT,
        metafields: [],
      },
    };

    // Add SEO metafields if present
    if (post.seoTitle) {
      articlePayload.article.metafields.push({
        namespace: "global",
        key: "title_tag",
        value: post.seoTitle,
        type: "single_line_text_field",
      });
    }
    if (post.seoDescription) {
      articlePayload.article.metafields.push({
        namespace: "global",
        key: "description_tag",
        value: post.seoDescription,
        type: "single_line_text_field",
      });
    }

    try {
      const result = await shopifyFetch(`/blogs/${blog.id}/articles.json`, {
        method: "POST",
        body: JSON.stringify(articlePayload),
      });
      console.log(`   ✅ Created (id: ${result.article.id}, published: ${!DRAFT})`);
      created++;
    } catch (err) {
      console.error(`   ❌ Failed: ${err.message}`);
      errors.push({ post: post.title, error: err.message });
    }

    await sleep(DELAY_MS);
  }

  // 5. Summary
  console.log(`\n${"─".repeat(50)}`);
  console.log(`Summary:`);
  console.log(`  Created: ${created}`);
  console.log(`  Skipped: ${skipped} (already existed)`);
  console.log(`  Errors:  ${errors.length}`);

  if (errors.length > 0) {
    console.log(`\nErrors:`);
    for (const e of errors) {
      console.log(`  - ${e.post}: ${e.error}`);
    }
  }

  if (created > 0) {
    console.log(`\n⚠️  Remember to add featured images manually in Shopify Admin!`);
    console.log(`   Go to: Shopify Admin > Online Store > Blog posts > The Hoodie Blog`);
    console.log(`   Each markdown file has image placement notes at the bottom.\n`);
  }

  if (DRAFT && created > 0) {
    console.log(`📋 Articles were created as DRAFTS. Review them in Shopify Admin`);
    console.log(`   and publish when ready (or re-run without --draft).\n`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
