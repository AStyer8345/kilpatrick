# Sprint 1 — Placeholder Log & Open Items

**Last updated:** 2026-04-26
**Sprint:** 1 — Static foundation (homepage, about, contact, global layout)
**Owner of resolution:** Crystal Kilpatrick / Adam Styer

This document is the clean handoff list for everything Sprint 1 left as a placeholder, an unverified claim, or a future-link stub. Resolve these before launching publicly.

---

## P0 — Must resolve before public launch

### Compliance / legal

- [ ] **Verify TREC license #0479475 directly via TREC public lookup** — `https://www.trec.texas.gov/apps/license-holder-search/`. Pulled from `research/site-architecture.md`; voice guide §1 explicitly notes it was *not* present in scraped sources. Currently displayed in every page footer and embedded in JSON-LD.
- [ ] **Confirm Keller Williams brokerage license / required broker disclosure language** matches current Austin Southwest Market Center compliance (broker license number is separate from Crystal's salesperson license).
- [ ] **Replace EHO icon placeholder** in footer with the official Equal Housing Opportunity logo SVG. Current placeholder is a styled `<span>EHO</span>` div.
- [ ] **TCPA / contact-form consent language** — Sprint 1 reuses verbatim copy from the existing `crystalkilpatrick.com /contact/` page (raw-content.md §9). Have counsel re-validate against any 2026 SMS / TCPA rule changes before launch.
- [ ] **Fair-housing review** of all visible copy (homepage, about, stubs) before any neighborhood pages ship in Sprint 2. Sprint 1 deliberately avoids demographic, school-quality, "best for families," or steering language.

### Tooling / external accounts

- [ ] **Verify Calendly URL `https://calendly.com/crystalkilpatrick`** actually exists and is Crystal's. Used as the primary CTA link in the nav, hero, About, Contact, and bottom-CTA on every page. If the slug is wrong, every primary CTA on the site is dead.
- [ ] **Contact form backend.** Form is currently set up with Netlify form attributes (`data-netlify="true"` + honeypot). On Vercel deployment the form will not capture submissions until either:
  - We add a serverless function endpoint at `/api/contact`, or
  - We point the form to a third-party form handler (Formspree, Basin, Web3Forms, etc.), or
  - We deploy to Netlify instead of Vercel.
  Decision needed before launch.
- [ ] **Google Maps embed** — currently a styled placeholder in the contact page. Replace `.contact-map-placeholder` div with a real Google Maps iframe for `1801 S. MoPac Expy., #100, Austin, TX 78746`.

### Content needed from Crystal

- [ ] **Personal "why I do this" paragraph** for About page bio — marked with `<!-- CONTENT NEEDED FROM CRYSTAL -->` comment in `/about/index.html`. 3–5 sentences in her voice on why she got into real estate and why she stays.
- [ ] **Holly Blackwell team status** — Sprint 1 omits her bio entirely (deliberate per voice guide §1). Confirm whether she is currently on the team. If yes, add bio to About page team grid in Sprint 2. If no, ensure her listing is removed from the public Facebook page.
- [ ] **HGTV "My First Place" 2010** — episode title, original air date, and any clip/still rights. Currently displayed as `Featured Realtor` with no episode detail. Schema currently lists the award without specifics.
- [ ] **Testimonial republication permission** — three testimonials are featured on the homepage with HTML comment flags:
  - "ldjones979" (handle-only Zillow attribution) → 10-day stalled-listing turnaround. Currently shown as "Austin seller, 2020" with no real name. Pursue real-name attribution before launch.
  - "JayVeeEss" (handle-only Zillow attribution) → 2021 relocation. Shown as "Austin buyer, 2021." Pursue real-name attribution.
  - **Kent and Candice Black** (real-name available) → 2017 repeat client. Confirm explicit consent for republication on her own website (their original review was published on Zillow).
- [ ] No `Review` or `AggregateRating` JSON-LD is published anywhere on the site. The Zillow 5.0 / 17 reviews rating cannot be marked up until republication permission is confirmed; conservative omission is intentional.

---

## P1 — Pre-Sprint 2 / nice to have

### Assets — current state

Sprint 1 wired in legacy site photography from `/Users/adamstyer/Documents/Claude/Projects/kilpatrick/photos/website/2024-current/`. These are working placeholders pulled from the existing crystalkilpatrick.com site and may need refresh (especially Crystal's headshot — confirm date/likeness with Crystal).

#### Wired in for Sprint 1
- Hero (`/`): luxury home exterior with pool — `images/hero-home.jpg` (was `home-slider-4.jpg`).
- About hero photo: `images/crystal-kilpatrick.jpg` — Crystal headshot from current site.
- About team banner: **NOT shown** — the available group portrait includes a fourth team member (likely Holly Blackwell). Until Holly's status is confirmed and her bio is added, the banner is held back. Photo file is at `images/team-group.jpg` and will be reinstated in the about page once team roster is final.
- About team headshots: `images/amy-goldberg.jpg`, `images/kelly-gosey.jpg`.
- Authority strip (homepage): real images for Platinum Top 50, Austin Business Journal, RealTrends Verified.

#### Still needed
- **Confirm Crystal headshot is current.** The asset pulled from the legacy site may be dated; verify with Crystal whether to keep or commission a new shoot.
- **Featured Markets grid — 4 of 12 markets now have photos.** Audit of the 738-photo Kilpatrick archive (FB + IG) found that ~95% of the image content is Canva-style marketing composites with brand overlay (Crystal's purple "Listing of the Week" template, contact info burned in, multi-panel collages). Those don't work as editorial market cards. Verified clean photos sourced for: Belterra/Bear Creek (interior kitchen, IG Reel cover), South Austin 78745 (mimosa-tree backyard, IG Reel cover), Barton Creek 78735 (Tuscan courtyard at golden hour, IG Reel cover), and New Braunfels (single-story exterior, IG carousel child). Eight markets still have gradient placeholders: Dripping Springs, SW Austin, Buda, Cedar Park, Kyle, Leander, San Marcos, Far South Austin. To finish: Crystal supplies one clean exterior or interior shot per remaining market, or commission a photographer / license stock. Captions in `posts.json` map content to ZIPs; the data is there, the unbranded raw photos are not.
- **ABOR Top 500 badge**, **HGTV "My First Place" still + rights**, **Keller Williams Realty brand mark**, **CRS / CLHMS / CNE / RENE designation badges** — still text-only on authority strip. Need official-source assets.
- **Equal Housing Opportunity logo** in footer — still a styled text placeholder. Replace with the official EHO SVG.
- **Office exterior photo** (1801 S. MoPac) — for Contact page.
- **Replace contact-map placeholder** with embedded Google Maps iframe.
- **Optional Crystal lifestyle shot** (running at Lady Bird Lake, with rescue dogs) for the About bio body — would add texture without competing with the headshot.

### SEO / AEO infrastructure

- [x] `robots.txt` published with explicit AI crawler allow (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).
- [x] `sitemap.xml` published with all Sprint 1 URLs.
- [x] `llms.txt` published with site overview and canonical entity URL.
- [ ] Submit sitemap to Google Search Console + Bing Webmaster Tools after production cutover.
- [ ] Wire analytics layer into `js/main.js` (currently `console.info` stub). Recommend Plausible or GA4 — decision needed.

### Voice / copy

- [ ] **Banned-words search clean** confirmed before commit (run `grep -ri -E "dream home|journey|seamlessly|passionate|world-class service|treats clients like family|cutting-edge technology" --include='*.html' .` from project root and confirm no matches).
- [ ] Crystal voice review of About bio body before public launch. Bio rewrite intentionally drops the source-bio phrases the voice guide asked us to retire ("treats clients like family," "from the beginning to the end of the process," "highest standard of integrity," "world-class service").

---

## P2 — Sprint 2 follow-ons

### Stub pages currently shipped

The following pages exist as polished single-screen stubs to keep nav from feeling broken. Each links back to `/contact/`. Full builds belong to Sprint 2.

| URL | Stub status | Sprint 2 deliverable |
|---|---|---|
| `/buy/` | Stub — short copy + 2 CTAs | Full buyer's guide page per architecture doc §7 |
| `/sell/` | Stub — short copy + 2 CTAs | Full seller's guide page per architecture doc §8, including the AI-readable proof block |
| `/neighborhoods/` | Stub — short copy + 2 CTAs | Neighborhoods index hub per architecture doc §10 |
| `/testimonials/` | Stub — short copy + Zillow link + CTA | Native, schema-marked reviews page per architecture doc §23 (pending permission audit) |

### Navigation links pointing to Sprint 2 / Sprint 3 destinations

- Featured Markets grid on homepage links every market card to `/neighborhoods/` until the Tier 1 neighborhood pages exist (Belterra/Bear Creek 78737, South Austin 78745, Dripping Springs, SW Austin 78749). Update each card's `href` when its dedicated guide ships.
- Hero "Get Your Home's Value" CTA links to `/sell/` — when `/sell/home-value/` is built, repoint.
- "Read all reviews" link goes to `/testimonials/` stub — points to native reviews page once permission audit completes.

### Pages from architecture doc not in Sprint 1

- `/team/` — Meet the Team hub
- `/team/amy-goldberg/`, `/team/kelly-gosey/`, `/team/holly-blackwell/` — individual team bios
- `/sell/home-value/` — CMA lead capture
- `/neighborhoods/<slug>/` — 12 individual neighborhood guides (Tier 1–3 + outside-Austin hub)
- `/press/` — Press & Media
- `/faq/` — FAQ page (FAQPage schema currently lives inline on homepage; full page is a Sprint 2 deliverable)
- `/market-updates/` — Market Updates blog index + first 3 posts

---

## Schema validation

Pages with structured data:

| Page | Schema types embedded | Validate via |
|---|---|---|
| `/` | RealEstateAgent, Person, WebSite (SearchAction), BreadcrumbList, FAQPage | Google Rich Results Test, Schema.org validator |
| `/about/` | Person (full), BreadcrumbList | Google Rich Results Test |
| `/contact/` | ContactPage, RealEstateAgent (with contactPoint), BreadcrumbList | Google Rich Results Test |
| `/buy/`, `/sell/`, `/neighborhoods/`, `/testimonials/` | WebPage + BreadcrumbList (minimal) | Google Rich Results Test |

**Conservative omissions (intentional):**
- No `AggregateRating` anywhere — Zillow 5.0/17 not republication-licensed.
- No individual `Review` markup — testimonials shown but reviewers' republication permission not confirmed.
- No `geo` (lat/lon) on RealEstateAgent / LocalBusiness — coordinates not authoritatively confirmed.
- No `openingHours` on RealEstateAgent — office hours not confirmed.
- No `image` URL on RealEstateAgent / Person — no headshot asset confirmed yet.

When Crystal supplies headshot, office hours, and confirmed coordinates, add these fields to the JSON-LD on the homepage and About page.

---

## Deployment

- [ ] Deploy production to Vercel via `vercel --prod` from the project root.
- [ ] Custom domain mapping (`crystalkilpatrick.com` cutover) is out of scope for Sprint 1 — Sprint 2 staging-then-cutover plan to be agreed with Crystal.
- [ ] Verify production URLs `/`, `/about/`, `/contact/` load correctly.
- [ ] Run schema validation against the deployed URLs.
- [ ] Verify mobile nav opens, closes (button + Escape + outside click), and locks body scroll on the deployed pages.

---

*End of Sprint 1 placeholder log.*
