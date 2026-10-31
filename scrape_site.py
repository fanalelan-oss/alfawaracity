import os
import re
import json
import urllib.request
import ssl
from urllib.parse import urljoin, urlparse

BASE_URL = 'https://alfawaracity.com/'

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch(url):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=15) as res:
            return res.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def download_file(url, out_path):
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=20) as res:
            with open(out_path, 'wb') as f:
                f.write(res.read())
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

# 1. Analyze homepage
home_html = fetch(BASE_URL)
if not home_html:
    print("Could not fetch homepage")
    exit(1)

# Find all links
all_links = set(re.findall(r'href=[\"\'](.*?)[\"\']', home_html, re.I))
pages_to_crawl = set()
for l in all_links:
    full = urljoin(BASE_URL, l)
    p = urlparse(full)
    if 'alfawaracity.com' in p.netloc:
        path = p.path.rstrip('/')
        if not any(path.endswith(ext) for ext in ['.jpg', '.png', '.css', '.js', '.pdf', '.svg']):
            clean_url = f"{p.scheme}://{p.netloc}{path}"
            if clean_url != BASE_URL.rstrip('/'):
                pages_to_crawl.add(clean_url)

print(f"Discovered {len(pages_to_crawl)} subpages to inspect:")
for p in sorted(pages_to_crawl):
    print(" -", p)

# Crawl subpages and accumulate HTML and images
site_data = {
    'pages': {},
    'images': set(),
    'contacts': {
        'phones': set(),
        'emails': set(),
        'socials': set()
    }
}

all_pages = [BASE_URL] + list(pages_to_crawl)

for url in all_pages:
    print(f"Fetching {url}...")
    html = fetch(url)
    if not html:
        continue
    
    # Title
    t_match = re.search(r'<title>(.*?)</title>', html, re.I | re.S)
    title = t_match.group(1).strip() if t_match else ''
    
    # Extract clean text from paragraphs, headers, list items
    text_blocks = re.findall(r'<(?:h1|h2|h3|h4|h5|h6|p|li|span|a)[^>]*>(.*?)</(?:h1|h2|h3|h4|h5|h6|p|li|span|a)>', html, re.I | re.S)
    clean_texts = []
    for b in text_blocks:
        t = re.sub(r'<[^>]+>', '', b).strip()
        t = re.sub(r'\s+', ' ', t)
        if len(t) > 3 and not t.startswith('{') and not t.endswith('}'):
            clean_texts.append(t)
            
    site_data['pages'][url] = {
        'title': title,
        'texts': list(dict.fromkeys(clean_texts)) # deduplicate preserving order
    }
    
    # Images in this page
    imgs = re.findall(r'src=[\"\'](.*?\.(?:jpg|jpeg|png|webp|svg|gif)(?:\?.*?)?)[\"\']', html, re.I)
    for img in imgs:
        full_img = urljoin(url, img)
        site_data['images'].add(full_img)
        
    # Social / Contact links
    for l in re.findall(r'href=[\"\'](.*?)[\"\']', html, re.I):
        if 'wa.me' in l or 'whatsapp' in l:
            site_data['contacts']['phones'].add(l)
        if 'tel:' in l:
            site_data['contacts']['phones'].add(l)
        if 'mailto:' in l:
            site_data['contacts']['emails'].add(l)
        if any(s in l for s in ['instagram.com', 'twitter.com', 'x.com', 'snapchat.com', 'tiktok.com', 'facebook.com']):
            site_data['contacts']['socials'].add(l)

print(f"\nTotal unique images discovered: {len(site_data['images'])}")
print(f"Contacts discovered: {site_data['contacts']}")

# Save extracted text data
with open('extracted_site_data.json', 'w', encoding='utf-8') as f:
    # convert sets to lists for JSON
    serializable = {
        'pages': site_data['pages'],
        'images': sorted(list(site_data['images'])),
        'contacts': {k: sorted(list(v)) for k, v in site_data['contacts'].items()}
    }
    json.dump(serializable, f, ensure_ascii=False, indent=2)

print("Saved extracted_site_data.json successfully.")

# Now download all relevant hotel images into ./assets/scraped_images/
img_dir = os.path.join(os.getcwd(), 'assets', 'scraped_images')
os.makedirs(img_dir, exist_ok=True)

downloaded_count = 0
for i, img_url in enumerate(sorted(list(site_data['images']))):
    parsed = urlparse(img_url)
    ext = os.path.splitext(parsed.path)[1].split('?')[0] or '.jpg'
    filename = f"img_{i+1:03d}_{os.path.basename(parsed.path)}"
    # sanitize filename
    filename = re.sub(r'[^\w\.-]', '_', filename)
    target_path = os.path.join(img_dir, filename)
    if download_file(img_url, target_path):
        downloaded_count += 1

print(f"Downloaded {downloaded_count} images to {img_dir}")
