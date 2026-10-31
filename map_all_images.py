import re
import json

with open('alfawara_clean.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's inspect each card
cards = html.split('data-[hover=true]:')

mapped_units = []

for idx, c in enumerate(cards[1:], 1):
    imgs = re.findall(r'/uploads/([a-zA-Z0-9_\.-]+)', c)
    if not imgs:
        continue
    unique_imgs = list(dict.fromkeys(imgs))
    
    # Extract title from h2, h3, h4 or spans
    title_matches = re.findall(r'<(?:h1|h2|h3|h4|h5|p|span)[^>]*>(.*?)</(?:h1|h2|h3|h4|h5|p|span)>', c, re.I | re.S)
    clean_texts = []
    for t in title_matches:
        clean = re.sub(r'<[^>]+>', '', t).strip()
        clean = re.sub(r'\s+', ' ', clean)
        if len(clean) > 2 and not clean.startswith('{') and not clean.startswith('var '):
            clean_texts.append(clean)
            
    unique_texts = list(dict.fromkeys(clean_texts))
    
    mapped_units.append({
        'section_index': idx,
        'images': unique_imgs,
        'texts': unique_texts[:10]
    })

print(f"Discovered {len(mapped_units)} sections/cards:")
for u in mapped_units:
    print(f"\n=============================")
    print(f"Section {u['section_index']}:")
    print("Images count:", len(u['images']))
    print("Images:", u['images'])
    print("Texts:")
    for t in u['texts']:
        print("  -", t)

with open('exact_image_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(mapped_units, f, ensure_ascii=False, indent=2)
