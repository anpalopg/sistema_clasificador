import os
import dotenv import load_dotenv
from pydantic import BaseSettings,SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env",case_sensitive=True)

    APP_HOST = os.getenv("APP_HOST","")
    APP_PORT = os.getenv("APP_PORT","")
    APP_RELOAD = os.getenv("APP_RELOAD","")
    APP_MONGO_URL = os.getenv("APP_MONGO_URI","")
    HTTPX_CLIENT_TIMEOUT= int(os.getenv("HTTPX_TIMEOUT",100000))
    DATABASE_URL=""
    
settings = Settings()