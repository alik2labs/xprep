import subprocess
from pathlib import Path
from flask import request, redirect
from admin.helpers import (
    load_json, save_json,
    KIWIX_CATALOG_FILE, KIWIX_DATA_DIR, KIWIX_TMP_DIR,
    KIWIX_REBUILD_SCRIPT, KIWIX_QUEUE_WORKER, KIWIX_QUEUE_FILE,
    KIWIX_STATUS_FILE, KIWIX_PID_FILE, KIWIX_SERVICE, KIWIX_REFRESH_SCRIPT
)

def read_catalog():
    return load_json(KIWIX_CATALOG_FILE, [])

def read_queue():
    return load_json(KIWIX_QUEUE_FILE, [])

def write_queue(items):
    save_json(KIWIX_QUEUE_FILE, items)

def read_status():
    return load_json(KIWIX_STATUS_FILE, {
        "state": "idle",
        "current_id": "",
        "title": "",
        "filename": "",
        "downloaded_bytes": 0,
        "total_bytes": 0,
        "speed_bps": 0,
        "elapsed_seconds": 0,
        "eta_seconds": 0,
        "queue": [],
        "last_error": "",
        "updated_at": 0,
    })

def write_status(data):
    save_json(KIWIX_STATUS_FILE, data)

def format_seconds(value):
    value = int(value or 0)
    h = value // 3600
    m = (value % 3600) // 60
    s = value % 60
    if h:
        return f"{h}h {m}m"
    if m:
        return f"{m}m {s}s"
    return f"{s}s"

def bytes_to_mb(value):
    if not value:
        return "0"
    return f"{value / (1024 * 1024):.0f}"

def bps_text(value):
    if not value:
        return "-"
    mbps = value / (1024 * 1024)
    return f"{mbps:.2f} MB/s"

def build_display_name(item):
    return f"{item.get('title', '')} - {item.get('name', '')} - {item.get('flavour', '')}"

def enrich_catalog(catalog):
    for item in catalog:
        filename = item.get("filename", "")
        item["installed"] = (KIWIX_DATA_DIR / filename).exists()
        item["name"] = item.get("name", "")
        item["summary"] = item.get("summary", "")
        item["articleCount"] = item.get("articleCount", "")
        item["mediaCount"] = item.get("mediaCount", "")
        item["updated_short"] = (item.get("updated", "") or "")[:10]
        item["length_mb"] = str(item.get("length_mb") or "0")
        item["flavour"] = item.get("flavour", "")
        item["title"] = item.get("title", "")
        item["category"] = item.get("category", "Other")
        item["display_name"] = build_display_name(item)
    return catalog

def get_installed_catalog(catalog):
    return [item for item in catalog if item.get("installed")]

def group_catalog(catalog):
    grouped = {}
    for item in catalog:
        heading = item.get("category", "Other")
        grouped.setdefault(heading, []).append(item)

    result = []
    for heading in sorted(grouped.keys(), key=lambda s: s.lower()):
        items = sorted(grouped[heading], key=lambda x: (x.get("name") or "").lower())
        result.append((heading, items))
    return result

def get_languages(catalog):
    langs = sorted({(item.get("language") or "unknown") for item in catalog if item.get("language")})
    return langs[:300]

def worker_running():
    if not KIWIX_PID_FILE.exists():
        return False
    try:
        pid = int(KIWIX_PID_FILE.read_text().strip())
        return Path(f"/proc/{pid}").exists()
    except Exception:
        return False

def launch_worker_if_needed():
    if worker_running():
        return
    subprocess.Popen(
        ["/usr/bin/python3", KIWIX_QUEUE_WORKER],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        start_new_session=True,
    )

def build_kiwix_context(language=""):
    catalog = enrich_catalog(read_catalog())
    current_language = (language or "").strip()
    if current_language:
        filtered_catalog = [item for item in catalog if item.get("language") == current_language]
    else:
        filtered_catalog = catalog

    installed_catalog = get_installed_catalog(catalog)
    grouped_catalog = group_catalog(filtered_catalog)
    languages = get_languages(catalog)

    queue_status = read_status()
    queue_status["queue"] = read_queue()
    queue_status["downloaded_mb"] = bytes_to_mb(queue_status.get("downloaded_bytes", 0))
    queue_status["total_mb"] = bytes_to_mb(queue_status.get("total_bytes", 0))
    queue_status["speed_text"] = bps_text(queue_status.get("speed_bps", 0))
    queue_status["elapsed_text"] = format_seconds(queue_status.get("elapsed_seconds", 0))
    queue_status["eta_text"] = format_seconds(queue_status.get("eta_seconds", 0))
    total = queue_status.get("total_bytes", 0) or 0
    done = queue_status.get("downloaded_bytes", 0) or 0
    queue_status["percent"] = int((done / total) * 100) if total else 0

    catalog_map = {item["id"]: item for item in catalog if item.get("id")}
    queue_status["current_display"] = build_display_name(catalog_map.get(queue_status.get("current_id", ""), {})) if queue_status.get("current_id") in catalog_map else ""
    queue_status["queue_display"] = [build_display_name(catalog_map[q]) for q in queue_status["queue"] if q in catalog_map]

    return {
        "installed_catalog": installed_catalog,
        "grouped_catalog": grouped_catalog,
        "languages": languages,
        "current_language": current_language,
        "queue_status": queue_status,
    }

def register_kiwix_routes(app):
    @app.route("/refresh-kiwix-catalog", methods=["POST"])
    def refresh_kiwix_catalog_route():
        subprocess.run(["/usr/bin/python3", KIWIX_REFRESH_SCRIPT], check=True)
        return redirect("/?tab=kiwix")

    @app.route("/stop-download", methods=["POST"])
    def stop_download():
        subprocess.run(["pkill", "-f", "queue_worker.py"], check=False)
        write_queue([])
        write_status({
            "state": "idle",
            "current_id": "",
            "title": "",
            "filename": "",
            "downloaded_bytes": 0,
            "total_bytes": 0,
            "speed_bps": 0,
            "elapsed_seconds": 0,
            "eta_seconds": 0,
            "queue": [],
            "last_error": "",
            "updated_at": 0,
        })
        return redirect("/?tab=kiwix")

    @app.route("/purge-temp-files", methods=["POST"])
    def purge_temp_files():
        for part in KIWIX_TMP_DIR.glob("*.part"):
            try:
                part.unlink()
            except Exception:
                pass
        return redirect("/?tab=kiwix")

    @app.route("/queue-zims", methods=["POST"])
    def queue_zims():
        ids = request.form.getlist("zim_ids")
        queue = read_queue()
        status = read_status()
        current_id = status.get("current_id", "")

        for item_id in ids:
            if item_id == current_id:
                continue
            if item_id not in queue:
                queue.append(item_id)

        write_queue(queue)
        launch_worker_if_needed()
        return redirect("/?tab=kiwix")

    @app.route("/delete-zims", methods=["POST"])
    def delete_zims():
        ids = request.form.getlist("zim_ids")
        catalog = read_catalog()

        for zim_id in ids:
            item = next((x for x in catalog if x.get("id") == zim_id), None)
            if not item:
                continue
            filename = item.get("filename")
            if not filename:
                continue
            path = KIWIX_DATA_DIR / filename
            if path.exists():
                path.unlink()

        subprocess.run(["bash", KIWIX_REBUILD_SCRIPT], check=True)
        subprocess.run(["systemctl", "restart", KIWIX_SERVICE], check=True)
        return redirect("/?tab=kiwix")
