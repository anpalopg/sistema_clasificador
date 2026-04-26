import os

from dotenv import load_dotenv


load_dotenv()

APP_HOST = os.getenv("APP_HOST", "0.0.0.0")
APP_PORT = int(os.getenv("APP_PORT", "8000"))
APP_RELOAD = os.getenv("APP_RELOAD", "false").lower() in {"1", "true", "yes", "on"}
APP_MONGO_URL = os.getenv("APP_MONGO_URI", "")
HTTPX_CLIENT_TIMEOUT = float(os.getenv("HTTPX_TIMEOUT", "100000"))
DATABASE_URL = os.getenv("DATABASE_URL", "")