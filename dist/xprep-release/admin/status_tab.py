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
        return "1.0.0"
    except:
        return "1.0.0"

def register_status_api(app):
    @app.route("/api/status")
    def api_status():
        return jsonify({
            "hostname": get_hostname(),
            "ips": get_ips(),
            "storage": get_storage(),
            "connected_users": get_connected_users(),
            "version": get_version(),
        })
