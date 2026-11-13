import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const origin = "https://www.crystalkilpatrick.com";
const blogUrl = origin + "/blog/";
const author = "Crystal Kilpatrick";
const publisher = "Crystal Kilpatrick Group";
const image = origin + "/images/og-image.jpg";
const indexTitle = "Austin Real Estate Blog | Crystal Kilpatrick";
const indexDescription = "Crystal Kilpatrick shares Austin housing market updates and practical advice for buying and selling in Southwest Austin, Dripping Springs, and the Hill Country.";

const file = (path) => new URL(path, root);
const read = (path) => readFile(file(path), "utf8");
async function write(path, content) {
  const url = file(path);
  await mkdir(new URL(".", url), { recursive: true });
  await writeFile(url, content);
}

const escape = (value) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]);
const nonempty = (value) => typeof value === "string" && value.trim().length > 0;
const hasItems = (value, predicate) => Array.isArray(value) && value.length > 0 && value.every(predicate);
const linkItem = (item) => item && nonempty(item.label) && nonempty(item.url)
  && /^(https:\/\/[^\s]+|\/(?!\/)[^\s]+)$/.test(item.url);
const dateLabel = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });
const shortDate = (date) => dateLabel.format(new Date(date + "T00:00:00Z"));

const home = await read("index.html");
const nav = home.slice(home.indexOf('<header class="site-nav"'), home.indexOf('<main id="main">'))
  .replace('class="site-nav" id="siteNav" data-transparent="true"', 'class="site-nav is-inner" id="siteNav"');
const footer = home.match(/<footer class="site-footer"[\s\S]*?<\/footer>/)?.[0];
if (!nav.includes('id="siteNav"') || !footer) throw new Error("Could not find the site navigation and footer.");

const posts = [];
for (const entry of await readdir(file("blog-content"), { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
  const slug = entry.name.slice(0, -5);
  const post = JSON.parse(await read("blog-content/" + entry.name));
  const date = new Date(post.date + "T00:00:00Z");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(post.date) ||
      Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== post.date ||
      ![post.title, post.description, post.summary, post.intro, post.cta].every(nonempty) ||
      !hasItems(post.sections, (section) => section && nonempty(section.heading) && hasItems(section.paragraphs, nonempty)) ||
      !hasItems(post.faqs, (faq) => faq && nonempty(faq.question) && nonempty(faq.answer)) ||
      !hasItems(post.sources, linkItem) || !hasItems(post.related, linkItem)) {
    throw new Error("Check the fields and URL slug in " + entry.name);
  }
  posts.push({ ...post, slug, url: blogUrl + slug + "/" });
}
if (!posts.length) throw new Error("No blog posts found.");
posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

function page({ title, description, url, graph, body, article = false }) {
  const safeTitle = escape(title);
  const safeDescription = escape(description);
  const data = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2).replace(/</g, "\\u003c");
  const navigation = article ? nav : nav.replaceAll('<a href="/blog/">Blog</a>', '<a href="/blog/" aria-current="page">Blog</a>');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${safeTitle}</title>
<meta name="description" content="${safeDescription}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${article ? "article" : "website"}">
<meta property="og:title" content="${safeTitle}">
<meta property="og:description" content="${safeDescription}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:image:alt" content="Crystal Kilpatrick Group">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;500&display=swap">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/blog.css">
<script type="application/ld+json">
${data}
</script>
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
${navigation}<main id="main" class="blog-main">
  <div class="container">
    <div class="blog-content">
${body}
    </div>
  </div>
</main>
${footer}
<script src="/js/analytics.js"></script>
<script src="/js/main.js"></script>
</body>
</html>
`;
}

function breadcrumbs(post) {
  const pages = [["Home", origin + "/"], ["Blog", blogUrl]];
  if (post) pages.push([post.title, post.url]);
  return {
    "@type": "BreadcrumbList",
    itemListElement: pages.map(([name, item], index) => ({
      "@type": "ListItem", position: index + 1, name, item,
    })),
  };
}

function links(items) {
  return items.map(({ label, url }) => `          <li><a href="${escape(url)}">${escape(label)}</a></li>`).join("\n");
}

await write("blog/index.html", page({
  title: indexTitle,
  description: indexDescription,
  url: blogUrl,
  graph: [{ "@type": "Blog", name: indexTitle, description: indexDescription, url: blogUrl }, breadcrumbs()],
  body: `      <h1>Austin Real Estate Blog</h1>
      <p class="lead">Market updates and advice from Crystal Kilpatrick for buying or selling in Austin, Dripping Springs, and the Hill Country.</p>
${posts.map((post) => `      <article class="blog-card">
        <p class="blog-meta"><time datetime="${post.date}">${shortDate(post.date)}</time></p>
        <h2><a href="/blog/${post.slug}/">${escape(post.title)}</a></h2>
        <p>${escape(post.summary)}</p>
      </article>`).join("\n")}
`,
}));

for (const post of posts) {
  await write("blog/" + post.slug + "/index.html", page({
    title: post.title + " | Crystal Kilpatrick",
    description: post.description,
    url: post.url,
    article: true,
    graph: [{
      "@type": "BlogPosting",
      "@id": post.url + "#article",
      mainEntityOfPage: post.url,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      image,
      author: { "@type": "Person", name: author, url: origin + "/about/" },
      publisher: { "@type": "RealEstateAgent", "@id": origin + "/#agent", name: publisher, url: origin + "/" },
    }, breadcrumbs(post)],
    body: `      <nav class="blog-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/blog/">Blog</a></nav>
      <article>
        <h1>${escape(post.title)}</h1>
        <p class="blog-meta">By <a href="/about/">Crystal Kilpatrick</a> · <time datetime="${post.date}">${shortDate(post.date)}</time></p>
        <p class="lead blog-summary">${escape(post.summary)}</p>
        <p>${escape(post.intro)}</p>
${post.sections.map(({ heading, paragraphs }) => `        <section class="blog-post-section">
          <h2>${escape(heading)}</h2>
${paragraphs.map((paragraph) => `          <p>${escape(paragraph)}</p>`).join("\n")}
        </section>`).join("\n")}
        <section class="blog-post-section">
          <h2>Frequently asked questions</h2>
${post.faqs.map(({ question, answer }) => `          <h3>${escape(question)}</h3>
          <p>${escape(answer)}</p>`).join("\n")}
        </section>
        <section class="blog-cta">
          <h2>Talk through your next move</h2>
          <p>${escape(post.cta)}</p>
          <a class="button button-primary js-track-cta" data-event="consultation_click" href="/contact/">Contact Crystal</a>
        </section>
        <section class="blog-post-section">
          <h2>Explore Austin-area neighborhoods</h2>
          <ul class="blog-link-list">
${links(post.related)}
          </ul>
        </section>
        <section class="blog-post-section">
          <h2>Sources</h2>
          <ul class="blog-link-list">
${links(post.sources)}
          </ul>
        </section>
      </article>
`,
  }));
}

const sitemap = (await read("sitemap.xml"))
  .replace(/^  <!-- BEGIN BLOG -->\n[\s\S]*?^  <!-- END BLOG -->\n/m, "");
const blogEntries = [{ url: blogUrl, date: posts[0].date }, ...posts]
  .map(({ url, date }) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${date}</lastmod>\n  </url>`).join("\n");
await write("sitemap.xml", sitemap.replace("</urlset>", `  <!-- BEGIN BLOG -->\n${blogEntries}\n  <!-- END BLOG -->\n</urlset>`));
console.log(`Built ${posts.length} blog post(s), the blog index, and sitemap entries.`);
