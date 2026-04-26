FROM python:3.11-slim


COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
WORKDIR /app
COPY pyproject.toml uv.lock ./
ENV UV_NO_DEV=1
RUN uv sync --locked
COPY ./src /app/src
ENV PATH="/app/.venv/bin:$PATH"
EXPOSE 8080
CMD ["python", "src/main.py"]