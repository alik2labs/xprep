import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]

CONFIG_FILE = BASE_DIR / "assets" / "enabled_sections.json"
SETUP_SCRIPT = BASE_DIR / "scripts" / "setup_portal.sh"
MOUNT_USB_SCRIPT = BASE_DIR / "scripts" / "mount_usb.sh"

KIWIX_BASE = Path("/opt/xprep/kiwix")
KIWIX_CATALOG_FILE = KIWIX_BASE / "catalog" / "zims.json"
KIWIX_DATA_DIR = KIWIX_BASE / "data"
KIWIX_TMP_DIR = KIWIX_BASE / "tmp"
KIWIX_REBUILD_SCRIPT = str(KIWIX_BASE / "bin" / "rebuild_kiwix_library.sh")
KIWIX_QUEUE_WORKER = str(KIWIX_BASE / "bin" / "queue_worker.py")
KIWIX_QUEUE_FILE = KIWIX_BASE / "state" / "queue.json"
KIWIX_STATUS_FILE = KIWIX_BASE / "state" / "status.json"
KIWIX_PID_FILE = KIWIX_BASE / "state" / "queue_worker.pid"
KIWIX_SERVICE = "xprep-kiwix.service"
KIWIX_REFRESH_SCRIPT = str(KIWIX_BASE / "bin" / "refresh_library_catalog.py")


SECTIONS = [
    ("documents", "Documents"),
    ("usb", "External USB"),
    ("videos", "Videos"),
    ("kiwix", "Kiwix"),
    ("kolibri", "Kolibri"),
    ("calibre", "Calibre Library"),
    ("tools", "Tools"),
    ("prayer", "Prayer Times"),
    ("maps", "Maps"),
    ("games", "Games"),
    ("expat", "ExpatPrepper.org"),
]

def load_json(path, default):
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text())
    except Exception:
        return default

def save_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2) + "\n")

def load_config():
    return load_json(CONFIG_FILE, {})

def save_config(data):
    save_json(CONFIG_FILE, data)
