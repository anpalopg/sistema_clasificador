import os

import uvicorn
from fastapi import FastAPI


def create_app() -> FastAPI:
    app = FastAPI(
        title="Smart Knowledge Yield Backend",
        description="Core backend API service",
        version="1.0.0",
    )

    @app.get("/")
    async def root() -> dict[str, str]:
        return {"message": "Smart Knowledge Yield backend is running"}

    @app.get("/health")
    async def health() -> dict[str, str]:
        return {"status": "ok"}

    return app


app = create_app()


if __name__ == "__main__":
    host = os.getenv("APP_HOST", "0.0.0.0") or "0.0.0.0"
    port = int(os.getenv("APP_PORT", "8000") or "8000")
    reload = (os.getenv("APP_RELOAD", "true") or "true").lower() == "true"
    uvicorn.run("main:app", host=host, port=port, reload=reload)
