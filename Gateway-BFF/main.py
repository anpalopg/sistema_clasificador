from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parent
SRC_DIR = ROOT / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from src.main import app  # noqa: E402


if __name__ == "__main__":
    import uvicorn

    from config import APP_HOST, APP_PORT, APP_RELOAD  # noqa: E402

    uvicorn.run("src.main:app", host=APP_HOST, port=APP_PORT, reload=APP_RELOAD)
