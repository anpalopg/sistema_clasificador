from fastapi import FastAPI
import uvicorn

from src.api.clasificator_controller import router as sky_router
from src.utils.config import APP_HOST, APP_PORT, APP_RELOAD



def create_app(): 
  
    #Instanciating fastapi
    app = FastAPI(
    
    title="Chat service",
    description="This service allows developers to manage the chats lyfecycle",
    version="0.1"
    )

    #Including the different routes 
    app.include_router(sky_router)

    return app


app = create_app()


if __name__ == "__main__":
    uvicorn.run("src.main:app", host=APP_HOST, port=APP_PORT, reload=APP_RELOAD)
