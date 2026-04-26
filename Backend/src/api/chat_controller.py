from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse

from src.business.chat_service import ChatService
from src.dependencies.get_chat_service import get_chat_service
from src.models.schemas import ChatMessage, ChatSessionCreate, ChatSessionMessageRequest, ChatSessionResponse

router = APIRouter(prefix="/chat", tags=["chat"])


@router.get("/list_chat_sessions", response_model=list[ChatSessionResponse], status_code=status.HTTP_200_OK)
def list_chat_sessions(chat_service: ChatService = Depends(get_chat_service)):
    return chat_service.list_chat_sessions()


@router.post("/create_chat_session", response_model=ChatSessionResponse, status_code=status.HTTP_201_CREATED)
def create_chat_session(
    payload: ChatSessionCreate | None = None,
    chat_service: ChatService = Depends(get_chat_service),
):
    return chat_service.create_chat_session(payload or ChatSessionCreate())


@router.delete("/delete_chat_session/{id}", status_code=status.HTTP_200_OK)
def delete_chat_session(id: str, chat_service: ChatService = Depends(get_chat_service)):
    chat_service.delete_chat_session(id)
    return JSONResponse(content={"message": "Chat session deleted successfully"}, status_code=status.HTTP_200_OK)


@router.patch("/update_chat_session_name/{id}", response_model=ChatSessionResponse, status_code=status.HTTP_200_OK)
def update_chat_session_name(
    id: str,
    payload: ChatSessionCreate,
    chat_service: ChatService = Depends(get_chat_service),
):
    return chat_service.update_chat_session_name(id, payload.name)


@router.post("/send_message", response_model=list[ChatMessage], status_code=status.HTTP_201_CREATED)
def send_message(payload: ChatSessionMessageRequest, chat_service: ChatService = Depends(get_chat_service)):
    return chat_service.send_message(payload)