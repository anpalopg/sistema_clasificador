from __future__ import annotations

from fastapi import HTTPException, status

from src.data.database_interface import ChatRepository
from src.models.schemas import ChatSessionCreate, ChatSessionMessageRequest, ChatSessionResponse


class ChatService:
    def __init__(self, repository: ChatRepository) -> None:
        self.repository = repository

    def create_chat_session(self, payload: ChatSessionCreate) -> ChatSessionResponse:
        return self.repository.create_chat_session(payload)

    def list_chat_sessions(self) -> list[ChatSessionResponse]:
        return self.repository.list_chat_sessions()

    def get_chat_session_by_id(self, session_id: str) -> ChatSessionResponse:
        session = self.repository.get_chat_session_by_id(session_id)
        if not session:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
        return session

    def update_chat_session_name(self, session_id: str, name: str) -> ChatSessionResponse:
        session = self.repository.update_chat_session_name(session_id, name)
        if not session:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
        return session

    def delete_chat_session(self, session_id: str) -> None:
        deleted = self.repository.delete_chat_session(session_id)
        if not deleted:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")

    def send_message(self, payload: ChatSessionMessageRequest) -> list[dict]:
        messages = self.repository.send_message(payload.chat_session_id, payload.message, payload.domain)
        if messages is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
        return messages