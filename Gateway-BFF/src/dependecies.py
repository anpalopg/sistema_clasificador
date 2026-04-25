from config import HTTP_TIMEOUT
import httpx
from fastapi import Depends

from backend_service import BackendService


async def get_http_client():


    async with httpx.AsyncClient(timeout=HTTP_TIMEOUT) as client:
        yield client  



def get_backend_service(
    client = Depends(get_http_client)
):
    
    return BackendService(client)
