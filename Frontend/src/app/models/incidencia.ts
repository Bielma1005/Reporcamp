
export type EstadoIncidencia = 'pendiente' | 'proceso' | 'resuelto' | 'cerrado';
export type CategoriaIncidencia = 'Infraestructura' | 'Servicios' | 'Limpieza';
export type PrioridadIncidencia = 'alta' | 'media' | 'baja';
export type RolUsuario = 'admin' | 'tecnico' | 'ciudadano' | 'invitado';

export interface TimelineItem {
  label: string;
  fecha: string | null;
  completado: boolean;
  activo: boolean;
  nota?: string;
}

export interface Comentario {
  id: number;
  autor: string;
  iniciales: string;
  rol: RolUsuario;
  fecha: string;
  texto: string;
  color: string;
}

export interface Incidencia {
  id: number;
  codigo: string;
  titulo: string;
  descripcion: string;
  categoria: CategoriaIncidencia;
  zona: string;
  ubicacionExacta: string;
  estado: EstadoIncidencia;
  prioridad: PrioridadIncidencia;
  fotoUrl?: string;
  latitud?: number;
  longitud?: number;
  fechaCreacion: string;
  fechaActualizacion: string;
  fechaResolucion?: string;
  reportanteId: number;
  reportanteNombre: string;
  tecnicoId?: number;
  tecnicoNombre?: string;
  timeline: TimelineItem[];
  comentarios: Comentario[];
}

export interface CrearIncidenciaDto {
  titulo: string;
  descripcion: string;
  categoria: CategoriaIncidencia;
  zona: string;
  ubicacionExacta: string;
  fotoUrl?: string;
  latitud?: number;
  longitud?: number;
}

export interface ActualizarIncidenciaDto {
  estado?: EstadoIncidencia;
  prioridad?: PrioridadIncidencia;
  tecnicoId?: number;
  nota?: string;
}

export interface FiltroIncidencia {
  estado?: EstadoIncidencia | 'all';
  categoria?: CategoriaIncidencia | 'all';
  zona?: string;
  tecnicoId?: number;
  busqueda?: string;
}

export interface ResumenEstadisticas {
  total: number;
  pendientes: number;
  enProceso: number;
  resueltas: number;
  tiempoPromedioResolucion: number;
  tasaResolucion: number;
  resueltasATiempo: number;
}