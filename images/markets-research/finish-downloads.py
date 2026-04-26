#!/usr/bin/env python3
"""
Finish the download pass that the original Claude session couldn't complete
(the sandbox bash session crashed mid-batch).

What this does:
- Reads MANIFEST.json from the same folder
- For every entry where downloaded_at is null, fetches the direct_download_url
  to the per-neighborhood folder, using the manifest filename
- Updates downloaded_at on success and writes MANIFEST.json back
- Resolves Wikimedia thumbnail URLs that may 404 by falling back to the
  full-resolution direct file URL (Wikimedia generates thumbs lazily)

Run from the markets-research/ folder:
    python3 finish-downloads.py

Idempotent. Safe to run multiple times.
"""
import json, os, re, urllib.request
from datetime import datetime, timezone
from pathlib import Path

UA = "CrystalKilpatrickResearch/1.0 (research)"
HERE = Path(__file__).parent.resolve()
MANIFEST_PATH = HERE / "MANIFEST.json"

def fetch(url, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()

def wikimedia_alt_urls(url):
    """If a Wikimedia /thumb/ URL 404s, try a few variants."""
    out = [url]
    # Try without thumbnail prefix (full file)
    if "/thumb/" in url:
        # Strip /thumb/ and the trailing /Npx-filename
        m = re.match(r"^(https://upload\.wikimedia\.org/wikipedia/commons)/thumb/(.+?)/\d+px-([^/]+)$", url)
        if m:
            out.append(f"{m.group(1)}/{m.group(2)}")
    return out

def download_one(entry):
    if entry.get("downloaded_at"):
        return ("cached", "already had downloaded_at")
    src = entry.get("direct_download_url")
    if not src or src == "null":
        return ("skip", "no direct_download_url")
    dest = HERE / entry["neighborhood_slug"] / entry["filename"]
    if dest.exists() and dest.stat().st_size > 1000:
        # Update the manifest record
        entry["downloaded_at"] = datetime.now(timezone.utc).isoformat()
        return ("ok-already-on-disk", str(dest))
    dest.parent.mkdir(parents=True, exist_ok=True)
    last_err = None
    for u in wikimedia_alt_urls(src):
        try:
            data = fetch(u, timeout=30)
            if len(data) < 1000:
                last_err = f"too small ({len(data)} bytes)"
                continue
            with open(dest, "wb") as f:
                f.write(data)
            entry["downloaded_at"] = datetime.now(timezone.utc).isoformat()
            entry["downloaded_size_bytes"] = len(data)
            entry["rejected_reason"] = None
            return ("ok", str(dest))
        except Exception as e:
            last_err = str(e)
            continue
    return ("fail", last_err)

def main():
    if not MANIFEST_PATH.exists():
        print(f"MANIFEST.json not found at {MANIFEST_PATH}")
        return
    manifest = json.loads(MANIFEST_PATH.read_text())
    photos = manifest.get("photos", [])
    print(f"Manifest has {len(photos)} entries.")
    pending = [p for p in photos if not p.get("downloaded_at") and p.get("direct_download_url") and p.get("direct_download_url") != "null"]
    print(f"Pending downloads: {len(pending)}")
    ok = fail = cached = skip = 0
    for p in pending:
        st, info = download_one(p)
        print(f"  [{st}] {p['neighborhood_slug']}/{p['filename']} → {info}")
        if st in ("ok","ok-already-on-disk"): ok += 1
        elif st == "cached": cached += 1
        elif st == "skip": skip += 1
        else: fail += 1
    # Write manifest back
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2))
    print(f"\nDone. ok={ok} cached={cached} skip={skip} fail={fail}")
    # Per-neighborhood summary
    from collections import Counter
    on_disk = 0
    per = Counter()
    for p in photos:
        dest = HERE / p["neighborhood_slug"] / p["filename"]
        if dest.exists() and dest.stat().st_size > 0:
            per[p["neighborhood_slug"]] += 1
            on_disk += 1
    print(f"\nFiles on disk: {on_disk}")
    for slug, n in sorted(per.items()):
        print(f"  {slug}: {n}")

if __name__ == "__main__":
    main()
