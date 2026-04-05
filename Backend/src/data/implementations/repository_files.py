from typing import Optional
from src.models.schemas import TextCreate, TextResponse
from src.data.database_interface import SkyRepositories


class SkyRepositoryMongo(SkyRepositories):
    def __init__(self, client):
        self.client = client
        self.db = client["sky_db"]
        self.collection = self.db["sky_sessions"]


    def generate_summary(self, id: str) -> Optional[TextResponse]:
        pass

    def get_summary_by_id(self, id: str) -> Optional[TextResponse]:
        pass


