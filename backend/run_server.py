import sys
import os
import glob

venv_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".venv"))
for pattern in (
    os.path.join(venv_dir, "Lib", "site-packages"),
    os.path.join(venv_dir, "lib", "python*", "site-packages"),
):
    for site_packages in glob.glob(pattern):
        if site_packages not in sys.path:
            sys.path.insert(0, site_packages)

import uvicorn
from main import app

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"Starting TeamSync FastAPI Backend on http://127.0.0.1:{port} ...")
    uvicorn.run(app, host="127.0.0.1", port=port, log_level="info")
