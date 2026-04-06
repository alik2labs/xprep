#!/usr/bin/env python3
import json
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

OUT = Path("/opt/xprep/kiwix/catalog/zims.json")
URL = "https://library.kiwix.org/catalog/v2/entries?count=-1"

def text_or_empty(elem, tag, ns):
    found = elem.find(tag, ns)
    return (found.text or "").strip() if found is not None and found.text else ""

def bytes_to_mb(length_text):
    try:
        return str(int(int(length_text) / (1024 * 1024)))
    except Exception:
        return "0"

xml_text = urllib.request.urlopen(URL, timeout=60).read().decode("utf-8", errors="ignore")
root = ET.fromstring(xml_text)
ns = {"atom": "http://www.w3.org/2005/Atom"}

items = []
for entry in root.findall("atom:entry", ns):
    entry_id = text_or_empty(entry, "atom:id", ns)
    title = text_or_empty(entry, "atom:title", ns)
    updated = text_or_empty(entry, "atom:updated", ns)
    summary = text_or_empty(entry, "atom:summary", ns)
    language = text_or_empty(entry, "atom:language", ns)
    name = text_or_empty(entry, "atom:name", ns)
    flavour = text_or_empty(entry, "atom:flavour", ns)
    category = text_or_empty(entry, "atom:category", ns)
    tags = text_or_empty(entry, "atom:tags", ns)
    article_count = text_or_empty(entry, "atom:articleCount", ns)
    media_count = text_or_empty(entry, "atom:mediaCount", ns)

    href = ""
    length = "0"

    for link in entry.findall("atom:link", ns):
        rel = (link.attrib.get("rel") or "").strip()
        link_href = (link.attrib.get("href") or "").strip()
        if rel == "http://opds-spec.org/acquisition/open-access" and link_href:
            href = link_href
            length = link.attrib.get("length", "0")
            break

    if not href:
        continue

    if href.endswith(".meta4"):
        href = href[:-6]

    filename = Path(urlparse(href).path).name
    if not filename.endswith(".zim"):
        continue

    item_id = entry_id or name or filename.replace(".zim", "")
    item_id = item_id.replace(".", "_")

    items.append({
        "id": item_id,
        "title": title,
        "updated": updated,
        "summary": summary,
        "language": language,
        "name": name,
        "flavour": flavour,
        "category": category,
        "tags": tags,
        "articleCount": article_count,
        "mediaCount": media_count,
        "href": href,
        "url": href,
        "length": length,
        "length_mb": bytes_to_mb(length),
        "filename": filename,
    })

OUT.write_text(json.dumps(items, indent=2) + "\n")
print("saved:", len(items))
