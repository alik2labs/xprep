import json
import os
import zipfile
import mimetypes
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from flask import jsonify, request, send_from_directory, Response, abort

BLOOM_API = "https://api.bloomlibrary.org/v1/opds"
BOOKS_DIR = Path("/opt/xprep/bloom/books")
BOOKS_DIR.mkdir(parents=True, exist_ok=True)
META_FILE = Path("/opt/xprep/bloom/books.json")

def load_meta():
    if META_FILE.exists():
        return json.loads(META_FILE.read_text())
    return {}

def save_meta(meta):
    META_FILE.write_text(json.dumps(meta, indent=2))

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
        summary = entry.findtext("atom:summary", "", ns)
        license = entry.findtext("dc:license", "", ns)
        language = entry.findtext("dc:language", "", ns)
        thumbnail = epub = pdf = None
        for link in entry.findall("atom:link", ns):
            rel = link.get("rel", "")
            href = link.get("href", "")
            ltype = link.get("type", "")
            if rel == "http://opds-spec.org/image":
                thumbnail = href
            elif rel == "http://opds-spec.org/acquisition/open-access":
                if ("epub" in ltype or ".epub" in href) and epub is None:
                    epub = href
                elif ("pdf" in ltype or ".pdf" in href) and pdf is None:
                    pdf = href
        books.append({"title": title, "subject": subject, "level": level,
                      "summary": summary, "license": license, "language": language,
                      "thumbnail": thumbnail, "epub": epub, "pdf": pdf})
    return books

def _slug(title):
    import re
    s = title.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = s.strip("-")[:60]
    return s or "book"

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
            # Deduplicate — keep one entry per slug (same book in multiple languages)
            seen = {}
            for b in books:
                slug = _slug(b["title"])
                if slug not in seen:
                    seen[slug] = b
                elif b.get("epub") and not seen[slug].get("epub"):
                    seen[slug] = b
            books = list(seen.values())
            meta = load_meta()
            for b in books:
                b["saved"] = _slug(b["title"]) in meta
            return jsonify({"ok": True, "books": books, "count": len(books)})
        except Exception as e:
            return jsonify({"ok": False, "error": str(e), "books": []}), 500

    @app.route("/api/bloom/save", methods=["POST"])
    def api_bloom_save():
        data = request.get_json(force=True)
        title = (data.get("title") or "").strip()
        epub_url = (data.get("epub") or "").strip()
        thumbnail = (data.get("thumbnail") or "").strip()
        subject = (data.get("subject") or "").strip()
        level = (data.get("level") or "").strip()
        if not title or not epub_url:
            return jsonify({"ok": False, "error": "Missing title or epub url"}), 400
        slug = _slug(title)
        dest = BOOKS_DIR / f"{slug}.epub"
        try:
            req = urllib.request.Request(epub_url, headers={"User-Agent": "xPrep/1.0"})
            with urllib.request.urlopen(req, timeout=60) as r:
                dest.write_bytes(r.read())
            meta = load_meta()
            meta[slug] = {"title": title, "subject": subject, "level": level,
                          "thumbnail": thumbnail, "slug": slug,
                          "filename": f"{slug}.epub", "size": dest.stat().st_size}
            save_meta(meta)
            return jsonify({"ok": True, "slug": slug})
        except Exception as e:
            return jsonify({"ok": False, "error": str(e)}), 500

    @app.route("/api/bloom/delete", methods=["POST"])
    def api_bloom_delete():
        data = request.get_json(force=True)
        slug = (data.get("slug") or "").strip()
        meta = load_meta()
        if slug in meta:
            f = BOOKS_DIR / f"{slug}.epub"
            if f.exists():
                f.unlink()
            del meta[slug]
            save_meta(meta)
        return jsonify({"ok": True})

    @app.route("/api/bloom/saved")
    def api_bloom_saved():
        meta = load_meta()
        return jsonify({"ok": True, "books": list(meta.values()), "count": len(meta)})

    @app.route("/api/bloom/epub/<slug>/")
    @app.route("/api/bloom/epub/<slug>/<path:filepath>")
    def api_bloom_epub_file(slug, filepath="META-INF/container.xml"):
        slug = slug.replace("..", "").replace("\\", "")
        epub_path = BOOKS_DIR / f"{slug}.epub"
        if not epub_path.exists():
            abort(404)
        if not filepath:
            filepath = "META-INF/container.xml"
        try:
            with zipfile.ZipFile(str(epub_path)) as z:
                names = z.namelist()
                match = next((n for n in names if n == filepath), None)
                if not match:
                    match = next((n for n in names if n.lower() == filepath.lower()), None)
                if not match:
                    # Return empty response for optional files
                    return Response(b"", status=204)
                data = z.read(match)
            mime = mimetypes.guess_type(filepath)[0] or "application/octet-stream"
            if filepath.endswith((".xhtml", ".html", ".htm")):
                mime = "application/xhtml+xml"
            elif filepath.endswith(".opf"):
                mime = "application/oebps-package+xml"
            elif filepath.endswith(".ncx"):
                mime = "application/x-dtbncx+xml"
            return Response(data, mimetype=mime, headers={
                "Access-Control-Allow-Origin": "*",
                "Cache-Control": "no-cache"
            })
        except Exception as e:
            abort(500)
