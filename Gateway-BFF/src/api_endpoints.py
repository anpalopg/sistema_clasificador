from fastapi import APIRouter, Request, Response, Depends

from backend_service import BackendService
from dependencies import get_backend_service



router = APIRouter()


@router.api_route(
    "/{path:path}",
    methods=["GET", "POST", "PUT", "PATCH", "DELETE"]
)
async def proxy(
    path: str,
    request: Request,
    service: BackendService = Depends(get_backend_service)
):
  
   
    backend_response = await service.forward(request, path)

    # Return the backend response to the client
    return Response(
        content=backend_response.content,
        status_code=backend_response.status_code,
        headers=dict(backend_response.headers),
    )
