#!/usr/bin/env python3
import json
import os
import shutil
import subprocess
import time
from pathlib import Path
from urllib.request import urlopen, Request

BASE = Path("/opt/xprep/kiwix")
CATALOG = BASE / "catalog" / "zims.json"
QUEUE = BASE / "state" / "queue.json"
STATUS = BASE / "state" / "status.json"
PIDFILE = BASE / "state" / "queue_worker.pid"
TMP = BASE / "tmp"
DATA = BASE / "data"
REBUILD = BASE / "bin" / "rebuild_kiwix_library.sh"
SERVICE = "xprep-kiwix.service"

TMP.mkdir(parents=True, exist_ok=True)
DATA.mkdir(parents=True, exist_ok=True)
QUEUE.parent.mkdir(parents=True, exist_ok=True)

def load_json(path, default):
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text())
    except Exception:
        return default

def save_json(path, data):
    path.write_text(json.dumps(data, indent=2) + "\n")

def read_queue():
    return load_json(QUEUE, [])

def write_queue(items):
    save_json(QUEUE, items)

def read_catalog():
    return load_json(CATALOG, [])

def save_status(data):
    save_json(STATUS, data)

def format_state(state="idle", **extra):
    payload = {
        "state": state,
        "current_id": "",
        "title": "",
        "filename": "",
        "downloaded_bytes": 0,
        "total_bytes": 0,
        "speed_bps": 0,
        "elapsed_seconds": 0,
        "eta_seconds": 0,
        "queue": read_queue(),
        "last_error": "",
        "updated_at": int(time.time()),
    }
    payload.update(extra)
    save_status(payload)

def get_item(item_id):
    for item in read_catalog():
        if item.get("id") == item_id:
            return item
    return None

def process_one(item):

    url = item.get("url") or item.get("href")
    if not url:
        raise RuntimeError(f"No download URL for {item.get('id', 'unknown')}")

    filename = item["filename"]
    title = item.get("title", filename)
    item_id = item["id"]

    tmp_path = TMP / f"{filename}.part"
    final_path = DATA / filename

    req = Request(url, headers={"User-Agent": "xprep-kiwix"})
    start = time.time()
    last_t = start
    last_b = 0

    with urlopen(req, timeout=60) as resp:
        total = resp.headers.get("Content-Length")
        total = int(total) if total and total.isdigit() else 0

        with open(tmp_path, "wb") as f:
            downloaded = 0
            while True:
                chunk = resp.read(1024 * 256)
                if not chunk:
                    break
                f.write(chunk)
                downloaded += len(chunk)

                now = time.time()
                if now - last_t >= 1:
                    elapsed = int(now - start)
                    delta_b = downloaded - last_b
                    delta_t = max(now - last_t, 0.001)
                    speed = int(delta_b / delta_t)
                    eta = int((total - downloaded) / speed) if total and speed > 0 else 0
                    format_state(
                        "downloading",
                        current_id=item_id,
                        title=title,
                        filename=filename,
                        downloaded_bytes=downloaded,
                        total_bytes=total,
                        speed_bps=speed,
                        elapsed_seconds=elapsed,
                        eta_seconds=eta,
                        queue=read_queue(),
                    )
                    last_t = now
                    last_b = downloaded

    shutil.move(str(tmp_path), str(final_path))
    subprocess.run(["bash", str(REBUILD)], check=True)
    subprocess.run(["systemctl", "restart", SERVICE], check=True)

def main():
    PIDFILE.write_text(str(os.getpid()))

    try:
        while True:
            queue = read_queue()
            if not queue:
                format_state("idle", queue=[])
                break

            item_id = queue[0]
            item = get_item(item_id)
            if not item:
                queue.pop(0)
                write_queue(queue)
                format_state("error", last_error=f"Missing catalog item: {item_id}", queue=queue)
                continue

            try:
                format_state("starting", current_id=item_id, title=item.get("title", ""), filename=item.get("filename", ""), queue=queue)
                process_one(item)
                queue = read_queue()
                if queue and queue[0] == item_id:
                    queue.pop(0)
                    write_queue(queue)
                format_state("completed", current_id=item_id, title=item.get("title", ""), filename=item.get("filename", ""), queue=queue)
                time.sleep(1)
            except Exception as e:
                queue = read_queue()
                if queue and queue[0] == item_id:
                    queue.pop(0)
                    write_queue(queue)
                format_state("error", current_id=item_id, title=item.get("title", ""), filename=item.get("filename", ""), queue=queue, last_error=str(e))
                time.sleep(2)
    finally:
        if PIDFILE.exists():
            PIDFILE.unlink(missing_ok=True)

if __name__ == "__main__":
    main()
