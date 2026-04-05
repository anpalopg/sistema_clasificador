
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
import fastapi import status
from httpx import AsyncClient


#importaciones de todo
from src.bussines.services import SkyService, get_sky_service
from src.models.sky_session import SkySession, SkySessionUpdateResponse 



from src.data.database import get_db
from src.data.repositories import get_db
from src.dependencies import get_db
from src.utils.config import crud
from src.models.llm import LLMResponse
from src.models.schemas import TextCreate, TextResponse
from src.models.bertopic_model import TopicModel

##Smart Knowledge Yield

router = APIRouter(
    prefix="/sky",
    tags=["sky"]
)

#vamos a organizarlo por texto archivo y mensajes
    
@router.post("/upload_file", response_model=SkySession, status_code=status.HTTP_201_CREATED)
def upload_file(sky_service: SkyService = Depends(get_sky_service)):
    return sky_service.upload_file()

@router.get("/list_sky_sessions", response_model=list[SkySession], status_code=status.HTTP_200_OK)
def list_sky_sessions(sky_service: SkyService = Depends(get_sky_service)):
    return sky_service.list_sky_sessions()

@router.get("/get_sky_sessions_by_id/{id}", response_model=SkySession, status_code=status.HTTP_200_OK)
def get_sky_sessions_by_id(id: str, sky_service: SkyService = Depends(get_sky_service)):
    return sky_service.get_sky_session_by_id(id)

@router.patch("/update_sky_sessions_by_id/{id}", response_model=SkySessionUpdateResponse, status_code=status.HTTP_200_OK)
def update_sky_sessions_by_id(id: str, sky_service: SkyService = Depends(get_sky_service)):
    return sky_service.update_sky_session_by_id(id)

@router.delete("/delete_sky_sessions_by_id/{id}", status_code=status.HTTP_200_OK)
def delete_sky_sessions_by_id(id: str, sky_service: SkyService = Depends(get_sky_service)):
    sky_service.delete_sky_session_by_id(id)
    return JSONResponse(content={"message": "Sky session deleted successfully"}, status_code=status.HTTP_200_OK)



#aca va el resumen o la respuesta

@router.post("/summaries_file", response_model=SkySession, status_code=status.HTTP_201_CREATED)
def summaries_file(sky_service: SkyService = Depends(get_sky_service)):
    return sky_service.summaries_file()

@router.get("/summaries_sky_sessions_by_id/{id}", response_model=SkySession, status_code=status.HTTP_200_OK)
def summaries_sky_sessions_by_id(id: str, sky_service: SkyService = Depends(get_sky_service)):
    return sky_service.summaries_sky_session_by_id(id)


#acerca del texto y su resumen

@router.post("/chat_file_session", response_model=SkySession, status_code=status.HTTP_201_CREATED)
def chat_file_session(sky_service: SkyService = Depends(get_sky_service)):
    return sky_service.chat_file_session()

@router.get("/summaries_sky_chat_sessions_by_id/{id}", response_model=SkySession, status_code=status.HTTP_200_OK)
def summaries_sky_chat_sessions_by_id(id: str, sky_service: SkyService = Depends(get_sky_service)):
    return sky_service.summaries_sky_chat_session_by_id(id)
