from abc import ABC, abstractmethod
from typing import Optional
from src.models.schemas import TextCreate, TextResponse

class SkyRepositories(ABC):
    @abstractmethod
    def upload_file(self, text_create: TextCreate) -> TextRespons0e:
        pass

    @abstractmethod
    def list_sky_sessions(self) -> list[TextResponse]:
        pass

    @abstractmethod
    def get_sky_session_by_id(self, id: str) -> Optional[TextResponse]:
        pass

    @abstractmethod
    def update_sky_session_by_id(self, id: str, text_create: TextCreate) -> Optional[TextResponse]:
        pass

    @abstractmethod
    def delete_sky_session_by_id(self, id: str) -> bool:
        pass

    @abstractmethod
    def generate_summary(self, id: str) -> Optional[TextResponse]:
        pass

    @abstractmethod
    def get_summary_by_id(self, id: str) -> Optional[TextResponse]:
        pass

    @abstractmethod
    def start_chat_session(self, id: str, question: str) -> Optional[TextResponse]:
        pass

    @abstractmethod
    def get_chat_session_by_id(self, id: str) -> list[TextResponse]:
        pass
