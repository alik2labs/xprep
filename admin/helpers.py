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
    ("documents", "Files", '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="8" y="4" width="20" height="26" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M22 4v8h6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="12" y1="18" x2="24" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="22" x2="24" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="12" y1="26" x2="20" y2="26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', "Local Files", "Saved files, documents and more."),
    ("usb", "External Storage", '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="12" y="6" width="16" height="22" rx="3" stroke="currentColor" stroke-width="1.5"/><line x1="20" y1="28" x2="20" y2="35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="16" y="10" width="8" height="5" rx="1" stroke="currentColor" stroke-width="1.2"/><line x1="15" y1="19" x2="25" y2="19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="15" y1="23" x2="25" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', "USB Drive", "Access files from a connected USB drive."),
    ("videos", "Videos", '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="4" y="10" width="24" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M28 16l8-5v16l-8-5V16z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>', "Media Player", "Watch locally stored video files in your browser."),
    ("kiwix", "Library", '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="6" y="8" width="6" height="26" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="15" y="8" width="6" height="26" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M24 8l6 26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M30 8l4 26" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', "Kiwix", "Offline Wikipedia, medical references and guides."),
    ("kolibri", "Learn", '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M20 4l3.5 7 7.5 1-5.5 5.5 1.5 8L20 22l-7 3.5 1.5-8L9 12l7.5-1L20 4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="12" y1="30" x2="28" y2="30" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="15" y1="34" x2="25" y2="34" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', "Kolibri", "Offline courses and educational content for all ages."),
    ("calibre", "eBooks", '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M8 6h18a2 2 0 012 2v24a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" stroke-width="1.5"/><path d="M6 34c4-3 10-3 14 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="14" x2="22" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="19" x2="22" y2="19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="24" x2="18" y2="24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', "Calibre Library", "Browse and read your offline eBook collection."),
    ("tools", "Tools", '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M30 10l-4 4-6-6 4-4a8 8 0 016 6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 14L8 26a2 2 0 000 3l3 3a2 2 0 003 0l12-12" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>', "Field Utilities", "Offline calculators, converters and reference tools."),
    ("prayer", "Prayer", '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M20 4C20 4 8 12 8 22a12 12 0 0024 0C32 12 20 4 20 4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 16v8M16 20h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', "Times & Qibla", "Offline prayer times, Qibla direction and Hijri calendar."),
    ("maps", "Maps", '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><path d="M15 5L5 9v26l10-4 10 4 10-4V5L25 9 15 5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><line x1="15" y1="5" x2="15" y2="31" stroke="currentColor" stroke-width="1.5"/><line x1="25" y1="9" x2="25" y2="35" stroke="currentColor" stroke-width="1.5"/></svg>', "Offline Maps", "Browse regional maps without an internet connection."),
    ("games", "Games", '<svg width="26" height="26" viewBox="0 0 40 40" fill="none"><rect x="4" y="12" width="32" height="18" rx="4" stroke="currentColor" stroke-width="1.5"/><line x1="13" y1="18" x2="13" y2="24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="24" cy="19" r="1.5" fill="currentColor"/><circle cx="28" cy="23" r="1.5" fill="currentColor"/></svg>', "Classic Games", "Pong, Snake, Tetris and more offline games."),
    ("expat", "ExpatPrepper", '<svg width="26" height="26" viewBox="0 0 40 40" fill="none" stroke-width="1.5" stroke-linecap="round"><rect x="4" y="6" width="32" height="28" rx="3" stroke="currentColor"/><line x1="4" y1="14" x2="36" y2="14" stroke="currentColor"/><line x1="14" y1="6" x2="14" y2="34" stroke="currentColor"/><circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none"/><circle cx="9" cy="24" r="1.5" fill="currentColor" stroke="none"/><circle cx="9" cy="29" r="1.5" fill="currentColor" stroke="none"/></svg>', "Urban Survival Guide", "Offline copy of expatprepper.org. Update when connected."),
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
