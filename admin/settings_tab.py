import subprocess
from flask import request, redirect
from admin.helpers import load_config, save_config, SECTIONS, SETUP_SCRIPT, MOUNT_USB_SCRIPT

def build_settings_context():
    config = load_config()
    order = config.get("order", [s[0] for s in SECTIONS])
    section_map = {key: (key, label, icon, sub, desc) for key, label, icon, sub, desc in SECTIONS}
    # Add any new sections not in saved order
    for key, *_ in SECTIONS:
        if key not in order:
            order.append(key)
    sections = [(key, label, icon, sub, desc, config.get(key, False))
                for key in order if key in section_map
                for _, label, icon, sub, desc in [section_map[key]]]
    return {"sections": sections}

def register_settings_routes(app):
    @app.route("/save", methods=["POST"])
    def save():
        new_config = {}
        enabled_str = request.form.get("section_enabled", "")
        if enabled_str:
            enabled_keys = set(k.strip() for k in enabled_str.split(",") if k.strip())
            for key, _label, _icon, _sub, _desc in SECTIONS:
                new_config[key] = key in enabled_keys
        else:
            for key, _label, _icon, _sub, _desc in SECTIONS:
                new_config[key] = key in request.form
        order_str = request.form.get("section_order", "")
        if order_str:
            new_config["order"] = [k.strip() for k in order_str.split(",") if k.strip()]
        save_config(new_config)
        subprocess.run(["bash", str(SETUP_SCRIPT)], check=True)
        return redirect("/?tab=settings")

    @app.route("/mount-usb", methods=["POST"])
    def mount_usb():
        subprocess.run(["bash", str(MOUNT_USB_SCRIPT)], check=True)
        return redirect("/?tab=settings")
