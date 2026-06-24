from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.tecnico import Tecnico
from app.schemas.tecnico import TecnicoCreate, TecnicoOut

router = APIRouter()

@router.get("/", response_model=list[TecnicoOut])
def listar_tecnicos(db: Session = Depends(get_db)):
    return db.query(Tecnico).all()

@router.post("/", response_model=TecnicoOut)
def crear_tecnico(datos: TecnicoCreate, db: Session = Depends(get_db)):
    tecnico = Tecnico(nombre=datos.nombre, especialidad=datos.especialidad)
    db.add(tecnico)
    db.commit()
    db.refresh(tecnico)
    return tecnico

@router.delete("/{id}")
def eliminar_tecnico(id: int, db: Session = Depends(get_db)):
    tecnico = db.query(Tecnico).filter(Tecnico.id == id).first()
    if not tecnico:
        raise HTTPException(status_code=404, detail="Técnico no encontrado")
    db.delete(tecnico)
    db.commit()
    return {"mensaje": "Técnico eliminado"}
