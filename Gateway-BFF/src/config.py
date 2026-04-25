import os
from dotenv import load_dotenv

load_dotenv()

GENERAL_CONTROLLER_URL = os.getenv("GENERAL_CONTROLLER_URL", "http://localhost:8081")


HTTP_TIMEOUT=float(os.getenv("HTTP_TIMEOUT", 10.0))


APP_PORT=int(os.getenv("APP_PORT", 8080))
APP_HOST=os.getenv("APP_HOST", "0.0.0.0")
APP_RELOAD=bool(os.getenv("APP_RELOAD", "True"))
