from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import uuid4

from bson import ObjectId
from pymongo import ReturnDocument
from pymongo.collection import Collection

from src.data.database_interface import ChatRepository
from src.models.schemas import ChatMessage, ChatSessionCreate, ChatSessionResponse


def _to_datetime(value):
    if isinstance(value, datetime):
        return value
    return datetime.utcnow()


def _serialize_chat_session(document: dict) -> ChatSessionResponse:
    return ChatSessionResponse(
        _id=str(document["_id"]),
        name=document["name"],
        created_at=_to_datetime(document.get("created_at")),
        updated_at=_to_datetime(document.get("updated_at")),
        messages=[ChatMessage(**message) for message in document.get("messages", [])],
    )


class MongoChatRepository(ChatRepository):
    def __init__(self, collection: Collection) -> None:
        self.collection = collection

    def create_chat_session(self, payload: ChatSessionCreate) -> ChatSessionResponse:
        now = datetime.utcnow()
        result = self.collection.insert_one(
            {
                "name": payload.name,
                "messages": [],
                "created_at": now,
                "updated_at": now,
            }
        )
        document = self.collection.find_one({"_id": result.inserted_id})
        return _serialize_chat_session(document)

    def list_chat_sessions(self) -> list[ChatSessionResponse]:
        cursor = self.collection.find().sort("created_at", -1)
        return [_serialize_chat_session(document) for document in cursor]

    def get_chat_session_by_id(self, session_id: str) -> Optional[ChatSessionResponse]:
        document = self.collection.find_one({"_id": ObjectId(session_id)})
        if not document:
            return None
        return _serialize_chat_session(document)

    def update_chat_session_name(self, session_id: str, name: str) -> Optional[ChatSessionResponse]:
        now = datetime.utcnow()
        result = self.collection.find_one_and_update(
            {"_id": ObjectId(session_id)},
            {"$set": {"name": name, "updated_at": now}},
            return_document=ReturnDocument.AFTER,
        )
        if not result:
            return None
        return _serialize_chat_session(result)

    def delete_chat_session(self, session_id: str) -> bool:
        result = self.collection.delete_one({"_id": ObjectId(session_id)})
        return result.deleted_count > 0

    def send_message(self, session_id: str, message: str, domain: Optional[str] = None) -> Optional[list[dict]]:
        document = self.collection.find_one({"_id": ObjectId(session_id)})
        if not document:
            return None

        now = datetime.utcnow()
        user_message = {"role": "user", "content": message, "created_at": now}
        assistant_message = {
            "role": "assistant",
            "content": f"Respuesta simulada para: {message}",
            "created_at": now,
        }

        updated_messages = [*document.get("messages", []), user_message, assistant_message]
        self.collection.update_one(
            {"_id": ObjectId(session_id)},
            {"$set": {"messages": updated_messages, "updated_at": now}},
        )

        return updated_messages


class InMemoryChatRepository(ChatRepository):
    def __init__(self) -> None:
        self._store: dict[str, ChatSessionResponse] = {}

    def create_chat_session(self, payload: ChatSessionCreate) -> ChatSessionResponse:
        now = datetime.utcnow()
        session = ChatSessionResponse(
            _id=str(uuid4()),
            name=payload.name,
            created_at=now,
            updated_at=now,
            messages=[],
        )
        self._store[session.id] = session
        return session

    def list_chat_sessions(self) -> list[ChatSessionResponse]:
        return sorted(self._store.values(), key=lambda item: item.created_at, reverse=True)

    def get_chat_session_by_id(self, session_id: str) -> Optional[ChatSessionResponse]:
        return self._store.get(session_id)

    def update_chat_session_name(self, session_id: str, name: str) -> Optional[ChatSessionResponse]:
        session = self._store.get(session_id)
        if not session:
            return None

        updated = session.model_copy(update={"name": name, "updated_at": datetime.utcnow()})
        self._store[session_id] = updated
        return updated

    def delete_chat_session(self, session_id: str) -> bool:
        return self._store.pop(session_id, None) is not None

    def send_message(self, session_id: str, message: str, domain: Optional[str] = None) -> Optional[list[dict]]:
        session = self._store.get(session_id)
        if not session:
            return None

        now = datetime.utcnow()
        updated_messages = [
            *session.messages,
            {"role": "user", "content": message, "created_at": now},
            {"role": "assistant", "content": f"Respuesta simulada para: {message}", "created_at": now},
        ]
        updated = session.model_copy(update={"messages": updated_messages, "updated_at": now})
        self._store[session_id] = updated
        return updated_messages