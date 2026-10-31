import json
import os

with open('extracted_site_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('site_summary.txt', 'w', encoding='utf-8') as out:
    out.write("=== CONTACTS ===\n")
    for k, v in data['contacts'].items():
        out.write(f"{k}: {v}\n")
    out.write("\n=== PAGES & TEXTS ===\n")
    for url, p in data['pages'].items():
        out.write(f"\n--- URL: {url} ---\nTitle: {p.get('title')}\n")
        for t in p.get('texts', []):
            out.write(f"  • {t}\n")

print("Wrote site_summary.txt")

# Check downloaded images
img_dir = os.path.join(os.getcwd(), 'assets', 'scraped_images')
if os.path.exists(img_dir):
    files = os.listdir(img_dir)
    print(f"Total downloaded files in {img_dir}: {len(files)}")
    for f in sorted(files)[:25]:
        print("  -", f)
