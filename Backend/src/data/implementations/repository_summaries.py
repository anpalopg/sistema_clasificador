from typing import Optional
from src.models.schemas import TextCreate, TextResponse
from src.data.database_interface import SkyRepositories


class SkyRepositoryMongo(SkyRepositories):
    def __init__(self, client):
        self.client = client
        self.db = client["sky_db"]
        self.collection = self.db["sky_sessions"]

    def upload_file(self, text_create: TextCreate) -> TextResponse:
        pass

    def list_sky_sessions(self) -> list[TextResponse]:
        pass

    def get_sky_session_by_id(self, id: str) -> Optional[TextResponse]:
        pass

    def update_sky_session_by_id(self, id: str, text_create: TextCreate) -> Optional[TextResponse]:
        pass

    def delete_sky_session_by_id(self, id: str) -> bool:
        pass


