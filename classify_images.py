import os
import re
import json

with open('scraped_index.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Let's search all img tags
img_matches = list(re.finditer(r'<img\s+[^>]*src=[\"\']([^\"\']+)[\"\'][^>]*>', html, re.I))
print(f"Total img tags in scraped HTML: {len(img_matches)}")

# Map each unique image to its alt, heading, surrounding card text
image_mapping = {}

for m in img_matches:
    tag = m.group(0)
    src = m.group(1)
    
    # Extract filename or key
    basename = src.split('/')[-1].split('?')[0]
    
    alt_match = re.search(r'alt=[\"\']([^\"\']*)[\"\']', tag, re.I)
    alt = alt_match.group(1).strip() if alt_match else ""
    
    # Find card context around the image
    start = max(0, m.start() - 350)
    end = min(len(html), m.end() + 350)
    snippet = html[start:end]
    clean_text = re.sub(r'<[^>]+>', ' ', snippet)
    clean_text = re.sub(r'\s+', ' ', clean_text).strip()
    
    # Try to find nearby h2, h3, h4, p
    headings = re.findall(r'<(?:h1|h2|h3|h4|h5)[^>]*>(.*?)</(?:h1|h2|h3|h4|h5)>', snippet, re.I | re.S)
    clean_headings = [re.sub(r'<[^>]+>', '', h).strip() for h in headings]
    
    image_mapping[basename] = {
        'src': src,
        'alt': alt,
        'headings': clean_headings,
        'context': clean_text[:120]
    }

for k, v in image_mapping.items():
    print(f"\n--- {k} ---")
    print(f"Alt: {v['alt']}")
    print(f"Headings: {v['headings']}")
    print(f"Context: {v['context']}")

with open('image_contexts.json', 'w', encoding='utf-8') as out:
    json.dump(image_mapping, out, ensure_ascii=False, indent=2)
