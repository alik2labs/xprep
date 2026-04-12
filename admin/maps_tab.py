import json
import subprocess
import threading
import urllib.request
import csv
import io
import time
import re
from pathlib import Path
from flask import request, redirect

MAPS_DIR = Path("/opt/xprep/maps/data")
STATUS_FILE = Path("/opt/xprep/maps/download_status.json")
DIRECTORY_JSON = Path("/opt/xprep/maps/directory.json")
MAPS_DIR_TSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6ELkxDMAPWyAzq1J9w47Rtrg5g0veeR5PvXLobxBZ2IFheXBbuIhV8uUupTTuwSss8OgxQ68OksqI/pub?output=tsv"
BUILDS_METADATA = "https://build-metadata.protomaps.dev/builds.json"


def get_latest_protomaps_url():
    try:
        req = urllib.request.Request(BUILDS_METADATA, headers={"User-Agent": "xPrep/1.0"})
        with urllib.request.urlopen(req, timeout=10) as r:
            builds = json.loads(r.read().decode("utf-8"))
        builds.sort(key=lambda b: b["key"], reverse=True)
        return "https://build.protomaps.com/" + builds[0]["key"]
    except Exception:
        return "https://build.protomaps.com/20260410.pmtiles"


def list_maps():
    maps = []
    if MAPS_DIR.exists():
        for f in sorted(MAPS_DIR.glob("*.pmtiles")):
            size_mb = f.stat().st_size / (1024 * 1024)
            try:
                result = subprocess.run(
                    ["/usr/local/bin/pmtiles", "show", str(f)],
                    capture_output=True, text=True, timeout=5
                )
                zoom = next((
                    re.search(r"max zoom:\s*(\d+)", line).group(1)
                    for line in result.stdout.split("\n") if "max zoom" in line
                ), "-")
            except Exception:
                zoom = "-"
            special_names = {"uae": "United Arab Emirates"}
            raw = f.stem.replace("-", " ").replace("_", " ")
            computed_name = special_names.get(f.stem, raw.upper() if len(f.stem) <= 3 else raw.title())
            maps.append({
                "filename": f.name,
                "stem": f.stem,
                "name": "Base World Map" if f.name == "base.pmtiles" else computed_name,
                "size": f"{size_mb:.1f} MB",
                "zoom": zoom,
                "deletable": f.name != "base.pmtiles"
            })
    return maps


def _fetch_and_build_directory():
    _latest_url = get_latest_protomaps_url()
    req = urllib.request.Request(MAPS_DIR_TSV, headers={"User-Agent": "xPrep/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        raw = r.read().decode("utf-8")
    reader = csv.DictReader(io.StringIO(raw), delimiter="\t")
    rows = list(reader)
    region_map = {}
    region_order = []
    for row in rows:
        t       = (row.get("Type") or "").strip()
        reg     = (row.get("Region") or "").strip()
        name    = (row.get("Name") or "").strip()
        p_full  = (row.get("P_Full_Name") or "").strip()
        bbox    = (row.get("BBOX") or "").strip()
        maxzoom = (row.get("MaxZoom") or "14").strip()
        size    = (row.get("Estimated Size (MB)") or "").strip()
        raw_source = (row.get("Source PMTiles URL") or "").strip()
        source = _latest_url if raw_source else ""
        if t == "Global":
            continue
        if t == "Continent":
            if name not in region_map:
                region_map[name] = {"name": name, "entries": []}
                region_order.append(name)
            region_map[name]["entries"].insert(0, {"name": name, "filename": p_full, "bbox": bbox, "maxzoom": maxzoom, "size": size, "source": source, "is_region_file": True})
        elif t == "Region":
            key = reg
            if key not in region_map:
                region_map[key] = {"name": key, "entries": []}
                region_order.append(key)
            region_map[key]["entries"].insert(0, {"name": name, "filename": p_full, "bbox": bbox, "maxzoom": maxzoom, "size": size, "source": source, "is_region_file": True})
        elif t == "Country":
            key = reg
            if key not in region_map:
                region_map[key] = {"name": key, "entries": []}
                region_order.append(key)
            region_map[key]["entries"].append({"name": name, "filename": p_full, "bbox": bbox, "maxzoom": maxzoom, "size": size, "source": source, "is_region_file": False})
    regions = [region_map[k] for k in region_order if k in region_map]
    return {"regions": regions, "updated": time.strftime("%d %b %Y %H:%M"), "count": len(rows)}


def _do_extract(parts, filename):
    STATUS_FILE.write_text(json.dumps({"state": "downloading", "filename": filename, "started": int(time.time())}))
    result = subprocess.run(parts, timeout=7200, capture_output=True, text=True)
    if result.returncode == 0:
        STATUS_FILE.write_text(json.dumps({"state": "done", "filename": filename}))
    else:
        STATUS_FILE.write_text(json.dumps({"state": "error", "filename": filename, "error": result.stderr[-300:]}))


def register_maps_routes(app):

    @app.route("/fonts/<path:filename>")
    def serve_font(filename):
        from flask import send_from_directory
        return send_from_directory("/var/www/html/fonts", filename)

    @app.route("/api/maps/info")
    def api_maps_info():
        filename = request.args.get("file", "")
        if not filename.endswith(".pmtiles"):
            return json.dumps({"error": "invalid"}), 400
        fpath = MAPS_DIR / filename
        if not fpath.exists():
            return json.dumps({"error": "not found"}), 404
        try:
            result = subprocess.run(
                ["/usr/local/bin/pmtiles", "show", str(fpath)],
                capture_output=True, text=True, timeout=10
            )
            bounds = [-180, -85, 180, 85]
            for line in result.stdout.split("\n"):
                if "bounds:" in line:
                    nums = re.findall(r"[-\d.]+", line)
                    if len(nums) >= 4:
                        bounds = [float(n) for n in nums[:4]]
            return json.dumps({"bounds": bounds}), 200, {"Content-Type": "application/json"}
        except Exception as e:
            return json.dumps({"error": str(e)}), 500

    @app.route("/api/maps/list")
    def api_maps_list():
        return json.dumps({"maps": list_maps()}), 200, {"Content-Type": "application/json"}

    @app.route("/api/maps")
    def api_maps():
        maps = [f.stem for f in sorted(MAPS_DIR.glob("*.pmtiles"))] if MAPS_DIR.exists() else []
        return json.dumps({"maps": maps}), 200, {"Content-Type": "application/json"}

    @app.route("/api/maps/download-status")
    def api_maps_download_status():
        if STATUS_FILE.exists():
            return STATUS_FILE.read_text(), 200, {"Content-Type": "application/json"}
        return json.dumps({"state": "idle"}), 200, {"Content-Type": "application/json"}

    @app.route("/api/maps/directory")
    def api_maps_directory():
        if DIRECTORY_JSON.exists():
            return DIRECTORY_JSON.read_text(), 200, {"Content-Type": "application/json"}
        try:
            data = _fetch_and_build_directory()
            DIRECTORY_JSON.parent.mkdir(parents=True, exist_ok=True)
            DIRECTORY_JSON.write_text(json.dumps(data))
            return json.dumps(data), 200, {"Content-Type": "application/json"}
        except Exception as e:
            return json.dumps({"error": str(e)}), 200, {"Content-Type": "application/json"}

    @app.route("/api/maps/directory-update", methods=["POST"])
    def api_maps_directory_update():
        try:
            data = _fetch_and_build_directory()
            DIRECTORY_JSON.parent.mkdir(parents=True, exist_ok=True)
            DIRECTORY_JSON.write_text(json.dumps(data))
            return json.dumps(data), 200, {"Content-Type": "application/json"}
        except Exception as e:
            return json.dumps({"error": str(e)}), 200, {"Content-Type": "application/json"}

    @app.route("/api/maps/directory-download", methods=["POST"])
    def api_maps_directory_download():
        body     = request.get_json(force=True)
        source   = (body.get("source") or "").strip()
        filename = (body.get("filename") or "").strip()
        bbox     = (body.get("bbox") or "").strip()
        maxzoom  = (body.get("maxzoom") or "14").strip()
        if not source or not filename:
            return json.dumps({"error": "missing source or filename"}), 400, {"Content-Type": "application/json"}
        dest = str(MAPS_DIR / Path(filename).name)
        parts = ["/usr/local/bin/pmtiles", "extract", source, dest, "--download-threads=4"]
        if bbox:
            parts.append("--bbox=" + bbox)
        if maxzoom:
            parts.append("--maxzoom=" + maxzoom)
        threading.Thread(target=_do_extract, args=(parts, filename), daemon=True).start()
        return json.dumps({"ok": True}), 200, {"Content-Type": "application/json"}

    @app.route("/upload-map", methods=["POST"])
    def upload_map():
        f = request.files.get("pmtiles_file")
        if not f:
            return "No file", 400
        filename = Path(f.filename).name
        if not filename.endswith(".pmtiles"):
            filename += ".pmtiles"
        MAPS_DIR.mkdir(parents=True, exist_ok=True)
        f.save(str(MAPS_DIR / filename))
        return redirect("/?tab=maps&msg=Map+uploaded+successfully")

    @app.route("/delete-map", methods=["POST"])
    def delete_map():
        filename = request.form.get("filename", "")
        if filename == "base.pmtiles":
            return "Cannot delete base map", 403
        fpath = MAPS_DIR / filename
        if fpath.exists() and fpath.suffix == ".pmtiles":
            fpath.unlink()
        return redirect("/?tab=maps&msg=Map+deleted")

    @app.route("/delete-map-selected", methods=["POST"])
    def delete_map_selected():
        filenames = request.form.getlist("map_files")
        for filename in filenames:
            if filename == "base.pmtiles":
                continue
            fpath = MAPS_DIR / filename
            if fpath.exists() and fpath.suffix == ".pmtiles":
                fpath.unlink()
        return redirect("/?tab=maps&msg=Map+deleted")

    @app.route("/download-map", methods=["POST"])
    def download_map():
        url      = request.form.get("url", "").strip()
        filename = request.form.get("filename", "").strip()
        bbox     = request.form.get("bbox", "").strip()
        maxzoom  = request.form.get("maxzoom", "14").strip()
        if not url or not filename:
            return redirect("/?tab=maps")
        if not filename.endswith(".pmtiles"):
            filename += ".pmtiles"
        dest = MAPS_DIR / Path(filename).name
        cmd = ["/usr/local/bin/pmtiles", "extract", url, str(dest), "--download-threads=4"]
        if bbox:
            cmd += ["--bbox=" + bbox]
        if maxzoom:
            cmd += ["--maxzoom=" + maxzoom]
        threading.Thread(target=_do_extract, args=(cmd, filename), daemon=True).start()
        return redirect("/?tab=maps")
