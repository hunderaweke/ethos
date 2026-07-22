from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql+asyncpg://ethos:ethos@localhost:5432/ethos"
    google_client_id: str = ""
    session_cookie_name: str = "ethos_session"
    session_ttl_days: int = 30
    frontend_origin: str = "http://localhost:5173"
    environment: str = "development"


settings = Settings()
