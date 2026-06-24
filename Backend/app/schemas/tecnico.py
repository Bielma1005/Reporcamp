from pydantic import BaseModel

class TecnicoCreate(BaseModel):
    nombre: str
    especialidad: str

class TecnicoOut(BaseModel):
    id: int
    nombre: str
    especialidad: str

    model_config = {"from_attributes": True}
    