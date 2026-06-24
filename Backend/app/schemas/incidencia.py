from pydantic import BaseModel

class IncidenciaCreate(BaseModel):
    categoria: str
    zona: str
    ubicacion: str
    descripcion: str

class IncidenciaOut(BaseModel):
    id: int
    codigo: str
    categoria: str
    zona: str
    ubicacion: str
    descripcion: str
    estado: str
    personal_asignado: str | None

    model_config = {"from_attributes": True}

class ActualizarEstado(BaseModel):
     estado: str

class AsignarPersonal(BaseModel):
    personal_asignado: str