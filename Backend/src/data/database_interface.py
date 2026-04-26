from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Optional

from src.models.schemas import ChatSessionCreate, ChatSessionMessageRequest, ChatSessionResponse, TextCreate, TextResponse, TextUpdate


class SkyRepositories(ABC):
    @abstractmethod
    def upload_file(self, text_create: TextCreate) -> TextResponse:
        raise NotImplementedError

    @abstractmethod
    def list_sky_sessions(self) -> list[TextResponse]:
        raise NotImplementedError

    @abstractmethod
    def get_sky_session_by_id(self, id: str) -> Optional[TextResponse]:
        raise NotImplementedError

    @abstractmethod
    def update_sky_session_by_id(self, id: str, text_create: TextUpdate) -> Optional[TextResponse]:
        raise NotImplementedError

    @abstractmethod
    def delete_sky_session_by_id(self, id: str) -> bool:
        raise NotImplementedError

    @abstractmethod
    def generate_summary(self, id: str) -> Optional[TextResponse]:
        raise NotImplementedError

    @abstractmethod
    def get_summary_by_id(self, id: str) -> Optional[TextResponse]:
        raise NotImplementedError

    @abstractmethod
    def start_chat_session(self, id: str, question: str) -> Optional[TextResponse]:
        raise NotImplementedError

    @abstractmethod
    def get_chat_session_by_id(self, id: str) -> Optional[TextResponse]:
        raise NotImplementedError


class ChatRepository(ABC):
    @abstractmethod
    def create_chat_session(self, payload: ChatSessionCreate) -> ChatSessionResponse:
        raise NotImplementedError

    @abstractmethod
    def list_chat_sessions(self) -> list[ChatSessionResponse]:
        raise NotImplementedError

    @abstractmethod
    def get_chat_session_by_id(self, session_id: str) -> Optional[ChatSessionResponse]:
        raise NotImplementedError

    @abstractmethod
    def update_chat_session_name(self, session_id: str, name: str) -> Optional[ChatSessionResponse]:
        raise NotImplementedError

    @abstractmethod
    def delete_chat_session(self, session_id: str) -> bool:
        raise NotImplementedError

    @abstractmethod
    def send_message(self, session_id: str, message: str, domain: Optional[str] = None) -> Optional[list[dict]]:
        raise NotImplementedError