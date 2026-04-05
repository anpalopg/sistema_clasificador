
from fastapi import FastAPI
import uvicorn
from api import chat
from config import APP_HOST ,APP_PORT ,APP_REPORT


def create_app():
    app=FastApi(
            title="chat service",
            description="this is a chat service api",
            version="1.0.0",
        
    )

    app.include_router(chat.router)
    return app



app=create_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host=APP_HOST, port=APP_PORT, reload=True)
