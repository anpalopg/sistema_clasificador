from config import APP_HOST, APP_PORT, APP_RELOAD
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api_endpoints import router


def create_app(): 
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  
        allow_credentials=True,  
        allow_methods=["*"], 
        allow_headers=["*"], 
    )

    app.include_router(router)

    return app



app = create_app()


if __name__ == "__main__":
   
    uvicorn.run("main:app", host=APP_HOST, port=APP_PORT, reload=APP_RELOAD)
