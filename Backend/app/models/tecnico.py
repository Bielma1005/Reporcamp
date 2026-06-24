from sqlalchemy import Column, Integer, String
from app.database import Base

class Tecnico(Base):
    __tablename__ = "tecnicos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    especialidad = Column(String)
    