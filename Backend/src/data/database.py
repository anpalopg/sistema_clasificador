from __future__ import annotations

from abc import ABC, abstractmethod
from datetime import datetime
from typing import Optional
from uuid import uuid4

from src.models.schemas import ChatMessage, TextCreate, TextResponse, TextUpdate


class SkyRepository(ABC):
    @abstractmethod
    def upload_file(self, text_create: TextCreate) -> TextResponse:
        raise NotImplementedError

    @abstractmethod
    def list_sky_sessions(self) -> list[TextResponse]:
        raise NotImplementedError

    @abstractmethod
    def get_sky_session_by_id(self, session_id: str) -> Optional[TextResponse]:
        raise NotImplementedError

    @abstractmethod
    def update_sky_session_by_id(self, session_id: str, payload: TextUpdate) -> Optional[TextResponse]:
        raise NotImplementedError

    @abstractmethod
    def delete_sky_session_by_id(self, session_id: str) -> bool:
        raise NotImplementedError

    @abstractmethod
    def generate_summary(self, session_id: str) -> Optional[TextResponse]:
        raise NotImplementedError

    @abstractmethod
    def start_chat_session(self, session_id: str, question: str) -> Optional[TextResponse]:
        raise NotImplementedError


class InMemorySkyRepository(SkyRepository):
    def __init__(self) -> None:
        self._store: dict[str, TextResponse] = {}

    def upload_file(self, text_create: TextCreate) -> TextResponse:
        now = datetime.utcnow()
        session = TextResponse(
            id=str(uuid4()),
            name=text_create.name,
            content=text_create.content,
            summary=None,
            messages=[],
            created_at=now,
            updated_at=now,
        )
        self._store[session.id] = session
        return session

    def list_sky_sessions(self) -> list[TextResponse]:
        return sorted(self._store.values(), key=lambda item: item.created_at, reverse=True)

    def get_sky_session_by_id(self, session_id: str) -> Optional[TextResponse]:
        return self._store.get(session_id)

    def update_sky_session_by_id(self, session_id: str, payload: TextUpdate) -> Optional[TextResponse]:
        current = self._store.get(session_id)
        if not current:
            return None

        update_data = payload.model_dump(exclude_none=True)
        updated = current.model_copy(update={**update_data, "updated_at": datetime.utcnow()})
        self._store[session_id] = updated
        return updated

    def delete_sky_session_by_id(self, session_id: str) -> bool:
        return self._store.pop(session_id, None) is not None

    def generate_summary(self, session_id: str) -> Optional[TextResponse]:
        session = self._store.get(session_id)
        if not session:
            return None

        summary = f"Resumen automatico: {session.content[:140]}"
        updated = session.model_copy(update={"summary": summary, "updated_at": datetime.utcnow()})
        self._store[session_id] = updated
        return updated

    def start_chat_session(self, session_id: str, question: str) -> Optional[TextResponse]:
        session = self._store.get(session_id)
        if not session:
            return None

        user_message = ChatMessage(role="user", content=question)
        assistant_message = ChatMessage(role="assistant", content=f"Respuesta simulada para: {question}")
        updated = session.model_copy(
            update={
                "messages": [*session.messages, user_message, assistant_message],
                "updated_at": datetime.utcnow(),
            }
        )
        self._store[session_id] = updated
        return updated

