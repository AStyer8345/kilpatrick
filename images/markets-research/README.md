# Markets Research — Licensed Neighborhood Photography

**Generated:** 2026-04-25
**Last update:** 2026-04-26 (Wikimedia retry pass + Apify Unsplash supplement)
**Folder note:** This was meant to land in `/Users/adamstyer/Documents/crystalkilpatrick/images/markets-research/` but Claude only had access to `/Users/adamstyer/Documents/Claude/Projects/kilpatrick/`. Move or symlink when you're ready.

## Final summary

| Result | Count |
|---|---|
| Approved photos downloaded | **47** |
| Total entries in MANIFEST.json | 47 (+ 1 placeholder for Kyle's original "no candidates" note that's now superseded) |
| Sources | Wikimedia Commons (37) · Pexels (7) · Unsplash (3) |
| Apify spend | **$0.24** (8 Unsplash actor runs) |
| Neighborhoods with ≥ 3 photos | **10 of 12** |
| Neighborhoods under target | kyle-78640 (2), south-austin-78745 (2) |

## Per-neighborhood coverage

| Neighborhood | Photos | Notes |
|---|---|---|
| barton-creek-78735 | 5 | Strong — 5 greenbelt shots (Gus Fruh panoramic, waterfall, etc.) |
| belterra-bear-creek-78737 | 3 | 1 specific (Bear Creek River) + 2 Hill Country filler |
| buda-78610 | 5 | Strong — Downtown Gazebo, Carrington House, Moore Building, historic downtown |
| cedar-park-78613 | 3 | Cedar Park Depot + Bushy Creek frost flower + Wilson Ledbetter Park bridge |
| dripping-springs-78620 | 5 | Strong — Hamilton Pool x3 + City Hall + Hill Country forest |
| far-south-austin-78747 | 5 | Strong — Onion Creek + McKinney Falls (entrance, pond, visitor center) |
| **kyle-78640** | **2** | Hill Country filler only (Boerne Lake sunset + autumn oak). **No Kyle-specific content available** on free sources. Recommend paid stock or commission for Old Town Kyle / Plum Creek / Lake Kyle. |
| leander-78641 | 3 | Leander, TX streetscape + 2 town views |
| new-braunfels | 6 | Strong — 4 Gruene Hall/Historic District + Landa Park + Founders Oak + Guadalupe River |
| san-marcos-78666 | 5 | Strong — Hays Courthouse x2 + downtown views x2 + Distant Downtown View |
| **south-austin-78745** | **2** | Pexels Austin cloudy river + Hill Country rolling hills filler. **No South Lamar / Garrison Park / Manchaca specific content** on free sources. Recommend paid stock. |
| southwest-austin-maple-run-78749 | 3 | Violet Crown Trail (specific) + Austin oak + bluebonnet filler |

## License accounting

| License | Photos | Attribution required? |
|---|---|---|
| CC BY 4.0 | 13 | Yes |
| CC BY-SA 4.0 | 8 | Yes |
| CC BY-SA 3.0 | 7 | Yes |
| CC BY-SA 2.5 | 2 | Yes |
| CC BY 3.0 | 1 | Yes |
| CC BY 2.0 | 4 | Yes |
| Public Domain (NPS) | 2 | No |
| Pexels License | 7 | No (free commercial use) |
| Unsplash License | 3 | No (free commercial use) |

Per-photo `attribution_string` is in `MANIFEST.json`. For CC-BY/CC-BY-SA images you'll need a credit somewhere on the site (footer, photo credits page, or per-image overlay). Pexels, Unsplash, and NPS attribution is optional.

## What changed in the supplement pass

1. **Wikimedia retry** — the original `/thumb/` URLs I'd guessed lacked the SHA-1 prefix path that Wikimedia requires. Switched to `Special:FilePath?width=2400` redirects, which always resolve. All 19 originally-pending Wikimedia photos now downloaded.
2. **Apify Unsplash** — 8 runs returned a mix of mostly-wrong-place results (Houston, Waco, El Paso, Marfa, Boerne). After strict Texas/Hill-Country filtering, only **3 photos passed**:
   - Texas Hill Country rolling hills (south-austin filler)
   - Sunset at Boerne Lake (kyle filler)
   - Spring-leaves Hill Country oak (kyle filler)
3. **Cedar Park's Wilson Ledbetter Park bridge** — now downloaded.

## Borderline calls Adam should weigh in on

1. **kyle-78640**'s 2 photos are Hill Country filler from Unsplash, not Kyle landmarks. If brand integrity matters, mark Kyle "coming soon" rather than ship Boerne sunset.
2. **south-austin-78745** same situation — neither photo specifically shows South Austin.
3. **Pexels "Cloudy Sky Reflecting in a River"** for South Austin reads moody/gray — may not match "warm editorial" brief.
4. **Bluebonnet shots** are season-locked (March–April only). Use seasonally or accept they read as "spring in Texas."
5. **Buda's Carrington House** — verify it's not currently for sale before publishing.
6. **Dripping Springs** has 3 Hamilton Pool shots — consider one signature plus broader scenes to avoid repetition.
7. **NPS Onion Creek shots** are public domain and require no attribution. Use freely.

## How to refresh in the future

```bash
cd /Users/adamstyer/Documents/Claude/Projects/kilpatrick/images/markets-research
python3 finish-downloads.py   # idempotent — re-downloads anything missing
```

## Recommended next investments

| Priority | Action | Est. cost |
|---|---|---|
| **High** | Adobe Stock subscription ($30/mo, 10 standard images) — fill kyle, south-austin, sw-austin, belterra landmark gaps | $30 |
| Medium | Local commission — half-day photographer in Kyle/Buda/Dripping Springs for editorial-style streetscapes | $400–$800 |
| Low | Pexels API key (free) — re-run with API rather than HTML scraping | $0 |
| Low | Unsplash API key (free, 50 req/hr) — better than Apify for breadth | $0 |
