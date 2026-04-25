import httpx
from httpx import AsyncClient

from config import HTTPX_CLIET_TIMEOUT


def get_httpx_client() -> AsyncClient:
    return httpx.AsyncClient(timeout=HTTPX_CLIET_TIMEOUT)