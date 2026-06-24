from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from random import randint
from app.database import get_db
from app.models.incidencia import Incidencia
from app.schemas.incidencia import IncidenciaCreate, IncidenciaOut,ActualizarEstado, AsignarPersonal



router = APIRouter()

@router.get("/", response_model=list[IncidenciaOut])
def listar_incidencias(db: Session = Depends(get_db)):
    return db.query(Incidencia).all()

@router.post("/")
def crear_incidencia(
    incidencia: IncidenciaCreate,
    db: Session = Depends(get_db)
):
    codigo = f"CR-{randint(100,999)}"
    nueva = Incidencia(
        codigo=codigo,
        categoria=incidencia.categoria,
        zona=incidencia.zona,
        ubicacion=incidencia.ubicacion,
        descripcion=incidencia.descripcion,
        estado="pendiente",
        personal_asignado=None
    )
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return {
        "mensaje": "Incidencia guardada",
        "codigo": nueva.codigo
    }

@router.patch("/{id}/estado", response_model=IncidenciaOut)
def actualizar_estado(
    id: int,
    datos: ActualizarEstado,
    db: Session = Depends(get_db)
):
    inc = db.query(Incidencia).filter(Incidencia.id == id).first()
    if not inc:
        raise HTTPException(status_code=404, detail="Incidencia no encontrada")
    inc.estado = datos.estado
    db.commit()
    db.refresh(inc)
    return inc

@router.patch("/{id}/asignar", response_model=IncidenciaOut)
def asignar_personal(
    id: int,
    datos: AsignarPersonal,
    db: Session = Depends(get_db)
):
    inc = db.query(Incidencia).filter(Incidencia.id == id).first()
    if not inc:
        raise HTTPException(status_code=404, detail="Incidencia no encontrada")
    inc.personal_asignado = datos.personal_asignado
    db.commit()
    db.refresh(inc)
    return inc