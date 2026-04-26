from pymongo.errors import PyMongoError
from pymongo import MongoClient

from src.business.chat_service import ChatService
from src.data.chat_repository import InMemoryChatRepository, MongoChatRepository
from src.utils.config import APP_MONGO_URL


if APP_MONGO_URL:
    try:
        _mongo_client = MongoClient(APP_MONGO_URL, serverSelectionTimeoutMS=3000)
        _mongo_client.admin.command("ping")
        _chat_collection = _mongo_client["sky_db"]["chat_sessions"]
        _chat_repository = MongoChatRepository(_chat_collection)
    except PyMongoError:
        _chat_repository = InMemoryChatRepository()
else:
    _chat_repository = InMemoryChatRepository()


def get_chat_service() -> ChatService:
    return ChatService(_chat_repository)