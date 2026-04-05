from typing import Optional
from src.models.schemas import TextCreate, TextResponse
from src.data.database_interface import SkyRepositories


class SkyRepositoryMongo(SkyRepositories):
    def __init__(self, client):
        self.client = client
        self.db = client["sky_db"]
        self.collection = self.db["sky_sessions"]


    def start_chat_session(self, id: str, question: str) -> Optional[TextResponse]:
        pass

    def get_chat_session_by_id(self, id: str) -> list[TextResponse]:
        pass
