from fastapi import HTTPException, status

from src.data.database import SkyRepository
from src.models.schemas import ChatRequest, TextCreate, TextResponse, TextUpdate


class SkyService:
    def __init__(self, repository: SkyRepository) -> None:
        self.repository = repository

    def upload_file(self, payload: TextCreate) -> TextResponse:
        return self.repository.upload_file(payload)

    def list_sky_sessions(self) -> list[TextResponse]:
        return self.repository.list_sky_sessions()

    def get_sky_session_by_id(self, session_id: str) -> TextResponse:
        session = self.repository.get_sky_session_by_id(session_id)
        if not session:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
        return session

    def update_sky_session_by_id(self, session_id: str, payload: TextUpdate) -> TextResponse:
        session = self.repository.update_sky_session_by_id(session_id, payload)
        if not session:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
        return session

    def delete_sky_session_by_id(self, session_id: str) -> None:
        deleted = self.repository.delete_sky_session_by_id(session_id)
        if not deleted:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")

    def summaries_file(self, session_id: str) -> TextResponse:
        session = self.repository.generate_summary(session_id)
        if not session:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
        return session

    def chat_file_session(self, session_id: str, payload: ChatRequest) -> TextResponse:
        session = self.repository.start_chat_session(session_id, payload.question)
        if not session:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
        return session

