# Publish a blog post

1. Copy the existing JSON post to a new filename, such as `selling-in-dripping-springs.json`. The filename becomes the URL. Keep a published filename stable.
2. Fill in the headline, description, publication date, short answer, opening, sections, FAQs, sources, local links, and closing invitation. Use Crystal’s firsthand observations and check all market figures against a dated source. Keep client and property details private unless cleared for publication.
3. Run `node scripts/build-blog.mjs` from the repository root. It renders the blog index and articles, adds each URL to the sitemap, and fills in the page metadata and structured data. Commit the JSON, generated HTML, and sitemap together. If you intentionally remove a post, also remove its generated folder from `blog/`.
4. Open a pull request, check the Vercel preview, and merge after editorial review.

## Copy into Codex

> Draft an article for Crystal Kilpatrick from my notes below. Write in her voice and use one real example I supplied. Start with a short direct answer. Add three or four FAQs that answer separate questions. Verify dated market figures and link to the original sources. Link to relevant neighborhood or service pages. Create one new JSON file in blog-content, run node scripts/build-blog.mjs, and open a pull request for preview. Flag details that need my review before publication.
