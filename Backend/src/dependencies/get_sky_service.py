from src.business.sky_service import SkyService
from src.data.database import InMemorySkyRepository


_repository = InMemorySkyRepository()


def get_sky_service() -> SkyService:
    return SkyService(_repository)