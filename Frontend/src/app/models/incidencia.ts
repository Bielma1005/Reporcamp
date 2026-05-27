export type EstadoIncidencia = 'pendiente' | 'proceso' | 'resuelto' | 'cerrado';
export type CategoriaIncidencia = 'Infraestructura' | 'Servicios' | 'Limpieza';
export type PrioridadIncidencia = 'alta' | 'media' | 'baja';

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
  rol: string;
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
  reportanteNombre: string;
  tecnicoNombre?: string;
  fechaCreacion: string;
  timeline: TimelineItem[];
  comentarios: Comentario[];
}

export interface CrearIncidenciaDto {
  titulo: string;
  descripcion: string;
  categoria: CategoriaIncidencia;
  zona: string;
  ubicacionExacta: string;
}

export interface ResumenEstadisticas {
  total: number;
  pendientes: number;
  enProceso: number;
  resueltas: number;
  tiempoPromedio: number;
  tasaResolucion: number;
}

// Datos mock para desarrollo sin backend
export const INCIDENCIAS_MOCK: Incidencia[] = [
  {
    id: 1,
    codigo: 'CR-0012',
    titulo: 'Fuga de agua en baño Edificio A',
    descripcion: 'El baño del 2do piso tiene una fuga en el lavabo desde el lunes.',
    categoria: 'Infraestructura',
    zona: 'Edificio A',
    ubicacionExacta: 'Baño 2do piso',
    estado: 'pendiente',
    prioridad: 'alta',
    reportanteNombre: 'Juan Martínez',
    fechaCreacion: '2025-05-12T09:30:00',
    timeline: [
      { label: 'Reporte creado', fecha: '12 May · 09:30', completado: true, activo: false, nota: 'Código CR-0012 asignado.' },
      { label: 'Asignado a mantenimiento', fecha: null, completado: false, activo: true },
      { label: 'En proceso', fecha: null, completado: false, activo: false },
      { label: 'Resuelto', fecha: null, completado: false, activo: false }
    ],
    comentarios: []
  },
  {
    id: 2,
    codigo: 'CR-0015',
    titulo: 'Aire acondicionado sin funcionar',
    descripcion: 'El AC del Laboratorio de Cómputo no enfría desde el martes. Temperatura supera 30°C.',
    categoria: 'Servicios',
    zona: 'Laboratorios',
    ubicacionExacta: 'Lab. Cómputo planta baja',
    estado: 'proceso',
    prioridad: 'alta',
    reportanteNombre: 'Juan Martínez',
    tecnicoNombre: 'Roberto Sánchez',
    fechaCreacion: '2025-05-10T14:00:00',
    timeline: [
      { label: 'Reporte creado', fecha: '10 May · 14:00', completado: true, activo: false, nota: 'Notificación enviada a mantenimiento.' },
      { label: 'Asignado a técnico', fecha: '10 May · 15:30', completado: true, activo: false, nota: 'Asignado a Roberto Sánchez.' },
      { label: 'En proceso', fecha: '11 May · 09:00', completado: false, activo: true, nota: 'Se requiere reemplazo del compresor.' },
      { label: 'Resuelto', fecha: null, completado: false, activo: false }
    ],
    comentarios: [
      { id: 1, autor: 'Roberto Sánchez', iniciales: 'RS', rol: 'Técnico', fecha: '11 May · 09:45', texto: 'Diagnóstico hecho. Compresor con falla. Refacción solicitada a Climatec MX.', color: '#F0A030' },
      { id: 2, autor: 'Ana Morales', iniciales: 'AM', rol: 'Coordinadora', fecha: '11 May · 11:00', texto: 'Se habilitaron ventiladores mientras se repara.', color: '#18C96A' }
    ]
  },
  {
    id: 3,
    codigo: 'CR-0011',
    titulo: 'Silla rota en salón C-14',
    descripcion: 'Una silla del salón C-14 está rota y puede causar accidente.',
    categoria: 'Infraestructura',
    zona: 'Edificio C',
    ubicacionExacta: 'Salón C-14',
    estado: 'pendiente',
    prioridad: 'media',
    reportanteNombre: 'Leslie Cristóbal',
    fechaCreacion: '2025-05-13T08:45:00',
    timeline: [
      { label: 'Reporte creado', fecha: '13 May · 08:45', completado: true, activo: false },
      { label: 'Sin asignar', fecha: null, completado: false, activo: true },
      { label: 'Resuelto', fecha: null, completado: false, activo: false }
    ],
    comentarios: []
  },
  {
    id: 4,
    codigo: 'CR-0009',
    titulo: 'Proyector dañado — Sala Servicios',
    descripcion: 'El proyector no enciende. Se revisó el cable y no es el problema.',
    categoria: 'Servicios',
    zona: 'Servicios',
    ubicacionExacta: 'Sala de proyecciones',
    estado: 'resuelto',
    prioridad: 'baja',
    reportanteNombre: 'Emanuel Ruiz',
    tecnicoNombre: 'María Torres',
    fechaCreacion: '2025-05-05T10:00:00',
    timeline: [
      { label: 'Reporte creado', fecha: '5 May · 10:00', completado: true, activo: false },
      { label: 'Asignado', fecha: '5 May · 11:00', completado: true, activo: false },
      { label: 'En proceso', fecha: '6 May', completado: true, activo: false },
      { label: 'Resuelto', fecha: '8 May · 14:30', completado: true, activo: false }
    ],
    comentarios: []
  },
  {
    id: 5,
    codigo: 'CR-0016',
    titulo: 'Basura acumulada — Edificio D',
    descripcion: 'La entrada del Edificio D tiene basura acumulada desde ayer.',
    categoria: 'Limpieza',
    zona: 'Edificio D',
    ubicacionExacta: 'Entrada principal',
    estado: 'pendiente',
    prioridad: 'media',
    reportanteNombre: 'Leslie Cristóbal',
    fechaCreacion: '2025-05-13T07:00:00',
    timeline: [
      { label: 'Reporte creado', fecha: '13 May · 07:00', completado: true, activo: false },
      { label: 'Sin asignar', fecha: null, completado: false, activo: true },
      { label: 'Resuelto', fecha: null, completado: false, activo: false }
    ],
    comentarios: []
  },
  {
    id: 6,
    codigo: 'CR-0014',
    titulo: 'Iluminación deficiente en pasillos',
    descripcion: 'Los pasillos de Rectoría están muy oscuros, focos fundidos.',
    categoria: 'Servicios',
    zona: 'Rectoría',
    ubicacionExacta: 'Pasillo principal 1er piso',
    estado: 'proceso',
    prioridad: 'media',
    reportanteNombre: 'Emanuel Ruiz',
    tecnicoNombre: 'María Torres',
    fechaCreacion: '2025-05-11T16:00:00',
    timeline: [
      { label: 'Reporte creado', fecha: '11 May · 16:00', completado: true, activo: false },
      { label: 'Asignado', fecha: '11 May · 17:00', completado: true, activo: false },
      { label: 'En proceso', fecha: '12 May · 09:00', completado: false, activo: true },
      { label: 'Resuelto', fecha: null, completado: false, activo: false }
    ],
    comentarios: []
  }
];