from pathlib import Path
from flask import request, redirect, jsonify, send_file

DOCUMENTS_DIR = Path("/opt/xprep/documents")

def list_documents():
    DOCUMENTS_DIR.mkdir(parents=True, exist_ok=True)
    docs = []
    for path in sorted(DOCUMENTS_DIR.iterdir()):
        if path.is_file() and not path.name.startswith("."):
            docs.append({
                "filename": path.name,
                "size_mb": round(path.stat().st_size / (1024 * 1024), 1),
            })
    return docs

def build_documents_context():
    return {
        "documents": list_documents(),
    }

def register_documents_api(app):
    @app.route("/api/documents")
    def api_documents():
        DOCUMENTS_DIR.mkdir(parents=True, exist_ok=True)
        files = [
            p.name for p in sorted(DOCUMENTS_DIR.iterdir())
            if p.is_file() and not p.name.startswith(".")
        ]
        return jsonify({"documents": files})

    @app.route("/api/documents/file/<filename>")
    def api_document_file(filename):
        path = DOCUMENTS_DIR / filename
        if not path.exists() or not path.is_file():
            return "Not found", 404
        return send_file(str(path), conditional=True)

def register_documents_routes(app):
    @app.route("/delete-documents", methods=["POST"])
    def delete_documents():
        names = request.form.getlist("document_names")
        for name in names:
            name = name.strip()
            if not name:
                continue
            path = DOCUMENTS_DIR / name
            if path.exists() and path.is_file():
                path.unlink()
        return redirect("/?tab=documents")

    @app.route("/upload-document", methods=["POST"])
    def upload_document():
        if "document_file" not in request.files:
            return redirect("/?tab=documents")
        file = request.files["document_file"]
        if not file or file.filename == "":
            return redirect("/?tab=documents")
        DOCUMENTS_DIR.mkdir(parents=True, exist_ok=True)
        save_path = DOCUMENTS_DIR / file.filename
        file.save(str(save_path))
        return redirect("/?tab=documents")
