import json
import urllib.request
import xml.etree.ElementTree as ET
from flask import jsonify, request

BLOOM_API = "https://api.bloomlibrary.org/v1/opds"

def parse_books(xml_text):
    root = ET.fromstring(xml_text)
    ns = {
        "atom": "http://www.w3.org/2005/Atom",
        "dc": "http://purl.org/dc/terms/",
        "bloom": "https://bloomlibrary.org/opds"
    }
    books = []
    for entry in root.findall("atom:entry", ns):
        title = entry.findtext("atom:title", "", ns)
        subject = entry.findtext("dc:subject", "", ns)
        level = entry.findtext("bloom:level", "", ns)
        thumbnail = None
        epub = None
        pdf = None
        for link in entry.findall("atom:link", ns):
            rel = link.get("rel", "")
            href = link.get("href", "")
            ltype = link.get("type", "")
            if rel == "http://opds-spec.org/image":
                thumbnail = href
            elif rel == "http://opds-spec.org/acquisition/open-access":
                if "epub" in ltype or ".epub" in href:
                    epub = href
                elif "pdf" in ltype or ".pdf" in href:
                    pdf = href
        books.append({
            "title": title,
            "subject": subject,
            "level": level,
            "thumbnail": thumbnail,
            "epub": epub,
            "pdf": pdf,
        })
    return books

def register_bloom_routes(app):
    @app.route("/api/bloom/books")
    def api_bloom_books():
        lang = request.args.get("lang", "en")
        try:
            url = f"{BLOOM_API}?lang={lang}&minimalnavlinks=true"
            req = urllib.request.Request(url, headers={"User-Agent": "xPrep/1.0"})
            with urllib.request.urlopen(req, timeout=15) as r:
                xml_text = r.read().decode("utf-8")
            books = parse_books(xml_text)
            return jsonify({"ok": True, "books": books, "count": len(books)})
        except Exception as e:
            return jsonify({"ok": False, "error": str(e), "books": []}), 500
