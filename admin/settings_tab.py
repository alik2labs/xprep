import subprocess
from flask import request, redirect
from admin.helpers import load_config, save_config, SECTIONS, SETUP_SCRIPT, MOUNT_USB_SCRIPT

def build_settings_context():
    config = load_config()
    sections = [(key, label, icon, sub, desc, config.get(key, False)) for key, label, icon, sub, desc in SECTIONS]
    return {"sections": sections}

def register_settings_routes(app):
    @app.route("/save", methods=["POST"])
    def save():
        new_config = {}
        for key, _label, _icon, _sub, _desc in SECTIONS:
            new_config[key] = key in request.form
        save_config(new_config)
        subprocess.run(["bash", str(SETUP_SCRIPT)], check=True)
        return redirect("/?tab=settings")

    @app.route("/mount-usb", methods=["POST"])
    def mount_usb():
        subprocess.run(["bash", str(MOUNT_USB_SCRIPT)], check=True)
        return redirect("/?tab=settings")
