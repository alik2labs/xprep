import shutil
import socket
import subprocess
from pathlib import Path
from flask import jsonify

VERSION_FILE = Path("/opt/xprep/version.txt")

def get_hostname():
    try:
        return socket.gethostname()
    except:
        return "xprep"

def get_ips():
    try:
        result = subprocess.run(
            ["hostname", "-I"],
            capture_output=True, text=True, timeout=3
        )
        ips = result.stdout.strip().split()
        # Filter out docker/loopback ranges
        filtered = [ip for ip in ips if not ip.startswith("172.") and not ip.startswith("127.")]
        return filtered
    except:
        return []

def get_storage():
    try:
        total, used, free = shutil.disk_usage("/")
        return {
            "total_gb": round(total / (1024**3), 1),
            "used_gb": round(used / (1024**3), 1),
            "free_gb": round(free / (1024**3), 1),
            "percent_used": round((used / total) * 100, 1),
        }
    except:
        return {}

def get_connected_users():
    try:
        result = subprocess.run(
            ["arp", "-n"],
            capture_output=True, text=True, timeout=3
        )
        lines = [l for l in result.stdout.strip().split("\n")[1:]
                 if "10.10.10." in l and "incomplete" not in l]
        return len(lines)
    except:
        return 0

def get_version():
    try:
        if VERSION_FILE.exists():
            return VERSION_FILE.read_text().strip()
        # Fall back to config.env
        import re
        from pathlib import Path
        config_env = Path(__file__).resolve().parents[1] / "config.env"
        if config_env.exists():
            m = re.search(r'VERSION="([^"]+)"', config_env.read_text())
            if m:
                return m.group(1)
        return "1.0.0"
    except:
        return "1.0.0"

def get_uptime():
    try:
        result = subprocess.run(["uptime", "-p"], capture_output=True, text=True, timeout=3)
        return result.stdout.strip().replace("up ", "")
    except:
        return "unknown"

def get_service_status(service):
    try:
        result = subprocess.run(
            ["systemctl", "is-active", service],
            capture_output=True, text=True, timeout=3
        )
        return result.stdout.strip() == "active"
    except:
        return False

def get_maps_info():
    try:
        from pathlib import Path
        maps_dir = Path("/opt/xprep/maps/data")
        if not maps_dir.exists():
            return {"count": 0, "size_gb": 0}
        files = list(maps_dir.glob("*.pmtiles"))
        total = sum(f.stat().st_size for f in files)
        return {"count": len(files), "size_gb": round(total / (1024**3), 2)}
    except:
        return {"count": 0, "size_gb": 0}

def get_wifi_ssid():
    try:
        from pathlib import Path
        conf = Path("/etc/hostapd/hostapd.conf").read_text()
        for line in conf.splitlines():
            if line.startswith("ssid="):
                return line.split("=", 1)[1].strip()
    except:
        pass
    return "xPrep"

def register_status_api(app):
    @app.route("/api/status")
    def api_status():
        services = {
            "WiFi Hotspot": get_service_status("hostapd"),
            "Web Server": get_service_status("nginx"),
            "Admin Panel": get_service_status("xprep-admin"),
            "Kiwix": get_service_status("xprep-kiwix"),
            "Kolibri": get_service_status("xprep-kolibri"),
            "Calibre": get_service_status("xprep-calibre"),
        }
        return jsonify({
            "hostname": get_hostname(),
            "ips": get_ips(),
            "storage": get_storage(),
            "connected_users": get_connected_users(),
            "version": get_version(),
            "uptime": get_uptime(),
            "services": services,
            "maps": get_maps_info(),
            "wifi_ssid": get_wifi_ssid(),
        })
