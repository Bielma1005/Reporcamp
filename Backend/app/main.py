from fastapi import FastAPI
from app.database import engine, Base
from app.models.incidencia import Incidencia
from app.models.tecnico import Tecnico
from app.models.admin import Admin
from app.routes.incidencias import router as incidencias_router
from app.routes.tecnicos import router as tecnicos_router
from app.routes.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    incidencias_router,
    prefix="/incidencias",
    tags=["Incidencias"]
)

app.include_router(
    tecnicos_router,
    prefix="/tecnicos",
    tags=["Tecnicos"]
)

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Auth"]
)

@app.get("/")
def inicio():
    return {"mensaje": "Backend de Reporcamp funcionando"}