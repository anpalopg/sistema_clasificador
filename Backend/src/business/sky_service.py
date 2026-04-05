# Lógica de negocio para el resumen de textos. Aquí se implementan las funciones que utilizan los modelos de lenguaje para generar resúmenes a partir de los textos almacenados en la base de datos.



from fastapi import HTTPException,status
from typing import Optional

from src.data.database import Database
from src.models.llm import LLM
from src.models.schemas import SummaryRequest, SummaryResponse
from src.models.bertopic_model import BERTopicModel

class SkyService:
    def upload_file(self):
        return TextRepository.create(...)

    def list_sky_sessions(self):
        return TextRepository.list_all()

    def get_sky_session_by_id(self, id: str):
        return TextRepository.get(id)

    def update_sky_session_by_id(self, id: str):
        return TextRepository.update(id, ...)

    def delete_sky_session_by_id(self, id: str):
        return TextRepository.delete(id)

    def summaries_file(self):
        return TopicModel.generate_summary(...)

    def summaries_sky_session_by_id(self, id: str):
        return TextRepository.get_summary(id)

    def chat_file_session(self):
        return LLMClient.chat(...)

    def summaries_sky_chat_session_by_id(self, id: str):
        return TextRepository.get_chat_history(id)

def get_sky_service():
    return SkyService()
