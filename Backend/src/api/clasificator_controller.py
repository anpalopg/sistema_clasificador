from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse

from src.business.sky_service import SkyService
from src.dependencies.get_sky_service import get_sky_service
from src.models.schemas import ChatRequest, TextCreate, TextResponse, TextUpdate

router = APIRouter(
    prefix="/sky",
    tags=["sky"]
)

@router.post("/upload_file", response_model=TextResponse, status_code=status.HTTP_201_CREATED)
def upload_file(payload: TextCreate, sky_service: SkyService = Depends(get_sky_service)):
    return sky_service.upload_file(payload)

@router.get("/list_sky_sessions", response_model=list[TextResponse], status_code=status.HTTP_200_OK)
def list_sky_sessions(sky_service: SkyService = Depends(get_sky_service)):
    return sky_service.list_sky_sessions()

@router.get("/get_sky_sessions_by_id/{id}", response_model=TextResponse, status_code=status.HTTP_200_OK)
def get_sky_sessions_by_id(id: str, sky_service: SkyService = Depends(get_sky_service)):
    return sky_service.get_sky_session_by_id(id)

@router.patch("/update_sky_sessions_by_id/{id}", response_model=TextResponse, status_code=status.HTTP_200_OK)
def update_sky_sessions_by_id(
    id: str,
    payload: TextUpdate,
    sky_service: SkyService = Depends(get_sky_service),
):
    return sky_service.update_sky_session_by_id(id, payload)

@router.delete("/delete_sky_sessions_by_id/{id}", status_code=status.HTTP_200_OK)
def delete_sky_sessions_by_id(id: str, sky_service: SkyService = Depends(get_sky_service)):
    sky_service.delete_sky_session_by_id(id)
    return JSONResponse(content={"message": "Sky session deleted successfully"}, status_code=status.HTTP_200_OK)

@router.post("/summaries_file/{id}", response_model=TextResponse, status_code=status.HTTP_201_CREATED)
def summaries_file(id: str, sky_service: SkyService = Depends(get_sky_service)):
    return sky_service.summaries_file(id)

@router.post("/chat_file_session/{id}", response_model=TextResponse, status_code=status.HTTP_201_CREATED)
def chat_file_session(
    id: str,
    payload: ChatRequest,
    sky_service: SkyService = Depends(get_sky_service),
):
    return sky_service.chat_file_session(id, payload)
