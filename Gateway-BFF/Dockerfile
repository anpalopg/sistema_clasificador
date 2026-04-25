FROM python:3.11-slim


# Install uv in docker OS
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

#Workin directory
WORKDIR /app

# Copy dependency files
COPY pyproject.toml uv.lock ./


# Environment variables
## Disable the development dependencies
ENV UV_NO_DEV=1

# Sync the project into a new environment, asserting the lockfile is up to date
RUN uv sync --locked


# Copy application code
COPY ./src /app/src

# Add venv to PATH
ENV PATH="/app/.venv/bin:$PATH"

# Expose port
EXPOSE 8080

# Command to run the application
CMD ["python", "src/main.py"]