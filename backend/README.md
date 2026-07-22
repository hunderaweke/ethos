# blueprint.id backend

FastAPI + SQLAlchemy 2.0 + Alembic + Postgres.

## Setup

```
docker compose up -d db          # from repo root
cp .env.example .env
uv sync
uv run alembic upgrade head
uv run uvicorn app.main:app --reload --port 8000
```

Docs at `http://localhost:8000/docs`. Set `GOOGLE_CLIENT_ID` in `.env` before testing `/api/v1/auth/google`.
