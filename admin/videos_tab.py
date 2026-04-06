import os
from pathlib import Path
from flask import request, redirect, jsonify, send_file
from admin.helpers import BASE_DIR

VIDEOS_DIR = Path("/opt/xprep/videos")

ALLOWED_EXTENSIONS = {".mp4", ".mkv", ".avi", ".webm"}

def list_videos():
    VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
    videos = []
    for path in sorted(VIDEOS_DIR.iterdir()):
        if path.suffix.lower() in ALLOWED_EXTENSIONS:
            videos.append({
                "filename": path.name,
                "size_mb": round(path.stat().st_size / (1024 * 1024), 1),
            })
    return videos

def build_videos_context():
    return {
        "videos": list_videos(),
    }

def register_videos_api(app):
    @app.route("/api/videos")
    def api_videos():
        VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
        files = [
            p.name for p in sorted(VIDEOS_DIR.iterdir())
            if p.suffix.lower() in ALLOWED_EXTENSIONS
        ]
        return jsonify({"videos": files})

    @app.route("/api/videos/file/<filename>")
    def api_video_file(filename):
        path = VIDEOS_DIR / filename
        if not path.exists() or path.suffix.lower() not in ALLOWED_EXTENSIONS:
            return "Not found", 404
        return send_file(str(path), conditional=True)

def register_videos_routes(app):
    @app.route("/delete-videos", methods=["POST"])
    def delete_videos():
        names = request.form.getlist("video_names")
        for name in names:
            name = name.strip()
            if not name:
                continue
            path = VIDEOS_DIR / name
            if path.exists() and path.suffix.lower() in ALLOWED_EXTENSIONS:
                path.unlink()
        return redirect("/?tab=videos")

def register_videos_upload(app):
    @app.route("/upload-video", methods=["POST"])
    def upload_video():
        if "video_file" not in request.files:
            return redirect("/?tab=videos")
        file = request.files["video_file"]
        if not file or file.filename == "":
            return redirect("/?tab=videos")
        ext = Path(file.filename).suffix.lower()
        if ext not in ALLOWED_EXTENSIONS:
            return redirect("/?tab=videos")
        VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
        save_path = VIDEOS_DIR / file.filename
        file.save(str(save_path))
        return redirect("/?tab=videos")
