from sqlalchemy import Column, Integer, String
from app.database import Base

class Incidencia(Base):
    __tablename__ = "incidencias"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String, unique=True)
    categoria = Column(String)
    zona = Column(String)
    ubicacion = Column(String)
    descripcion = Column(String)
    estado = Column(String, default="Pendiente")
    personal_asignado = Column(String, nullable=True)
    