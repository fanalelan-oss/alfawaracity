import re
import json

with open('scraped_index.html', 'rb') as f:
    raw = f.read()

text = raw.decode('utf-8', errors='replace')

# Look for patterns of cards and titles
cards = text.split('data-[hover=true]:')
print(f"Cards count: {len(cards)}")

card_data = []
for idx, c in enumerate(cards):
    imgs = re.findall(r'/uploads/([a-zA-Z0-9_\.-]+)', c)
    if not imgs:
        continue
    # find Arabic text
    ar_chunks = re.findall(r'[\u0600-\u06FF0-9()\s-]+', c)
    clean_ar = [t.strip() for t in ar_chunks if len(t.strip()) > 3]
    unique_ar = list(dict.fromkeys(clean_ar))
    
    card_data.append({
        'card_index': idx,
        'images': list(dict.fromkeys(imgs)),
        'texts': unique_ar[:8]
    })

with open('scraped_cards_analysis.json', 'w', encoding='utf-8') as f:
    json.dump(card_data, f, ensure_ascii=False, indent=2)

for c in card_data:
    print(f"\n--- Card {c['card_index']} ---")
    print("Images:", c['images'])
    print("Texts:", c['texts'])
