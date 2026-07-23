from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql+asyncpg://ethos:ethos@localhost:5432/ethos"
    google_client_id: str = ""
    session_cookie_name: str = "ethos_session"
    session_ttl_days: int = 30
    frontend_origin: str = "http://localhost:5173"
    # Absolute base for self-hosted asset URLs (cached resource images) when no
    # request is in scope (e.g. the seed script). Overridden per-request by the
    # actual request base_url in the link-preview route.
    public_base_url: str = "http://localhost:8000"
    environment: str = "development"


settings = Settings()
