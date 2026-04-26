import httpx
from httpx import AsyncClient

from src.utils.config import HTTPX_CLIENT_TIMEOUT


def get_httpx_client() -> AsyncClient:
    return httpx.AsyncClient(timeout=HTTPX_CLIENT_TIMEOUT)