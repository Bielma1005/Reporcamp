// models/mapa-campus.model.ts

export type EstadoZona = 'pendiente' | 'proceso' | 'resuelto' | 'sin-incidencias';

export interface ZonaCampus {
  id: string;
  nombre: string;
  descripcion: string;
  x: number; // posición % sobre la imagen (0-100)
  y: number;
  estado: EstadoZona;
  totalIncidencias: number;
  incidenciasPendientes: number;
  incidenciasEnProceso: number;
  incidenciasResueltas: number;
}

export interface ResumenMapa {
  totalZonas: number;
  zonasPendientes: number;
  zonasEnProceso: number;
  zonasResueltas: number;
  zonasSinIncidencias: number;
}

export const ZONAS_CAMPUS_MOCK: ZonaCampus[] = [
  { id:'z01', nombre:'Laboratorio de computo y laboratorio de inteligencia artificial', descripcion:'Laboratorio de cómputo e inteligencia artificial', x:52, y:8,  estado:'pendiente',        totalIncidencias:3, incidenciasPendientes:2, incidenciasEnProceso:1, incidenciasResueltas:0 },
  { id:'z02', nombre:'Instituto de energia', descripcion:'Instituto de energía renovable', x:68, y:6,  estado:'proceso',           totalIncidencias:2, incidenciasPendientes:0, incidenciasEnProceso:2, incidenciasResueltas:0 },
  { id:'z03', nombre:'Edificio de industrial', descripcion:'Edificio de ingeniería industrial', x:84, y:14, estado:'sin-incidencias',   totalIncidencias:0, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z04', nombre:'Edificio de energia', descripcion:'Aulas, baños, sala de cómputo y videoconferencias', x:60, y:18, estado:'resuelto',          totalIncidencias:1, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:1 },
  { id:'z05', nombre:'Taller de madera, cera, mica y metales', descripcion:'Taller de madera, cerámica y metales', x:80, y:26, estado:'pendiente',         totalIncidencias:4, incidenciasPendientes:3, incidenciasEnProceso:1, incidenciasResueltas:0 },
  { id:'z06', nombre:'Edificio de ingenieria quimica', descripcion:'Edificio de ingeniería química', x:84, y:36, estado:'sin-incidencias',   totalIncidencias:0, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z07', nombre:'Aulas y baños', descripcion:'Aulas y baños', x:44, y:28, estado:'proceso',           totalIncidencias:2, incidenciasPendientes:0, incidenciasEnProceso:2, incidenciasResueltas:0 },
  { id:'z08', nombre:'Edificio de posgrado', descripcion:'Edificio de posgrado', x:55, y:35, estado:'resuelto',          totalIncidencias:1, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:1 },
  { id:'z09', nombre:'Departamento de profesores', descripcion:'Departamento de profesores', x:28, y:38, estado:'sin-incidencias',   totalIncidencias:0, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z10', nombre:'Centro de idiomas', descripcion:'Centro de idiomas', x:57, y:46, estado:'pendiente',         totalIncidencias:2, incidenciasPendientes:2, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z11', nombre:'Sala de autoacceso', descripcion:'Sala de autoacceso', x:72, y:48, estado:'sin-incidencias',   totalIncidencias:0, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z12', nombre:'Sala de computo 1 y 2', descripcion:'Sala de cómputo 1 y 2', x:74, y:56, estado:'proceso',           totalIncidencias:3, incidenciasPendientes:0, incidenciasEnProceso:2, incidenciasResueltas:1 },
  { id:'z13', nombre:'Biblioteca', descripcion:'Biblioteca universitaria', x:47, y:54, estado:'resuelto',          totalIncidencias:1, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:1 },
  { id:'z14', nombre:'Laboratorios de quimica', descripcion:'Laboratorios de química', x:66, y:62, estado:'pendiente',         totalIncidencias:5, incidenciasPendientes:3, incidenciasEnProceso:2, incidenciasResueltas:0 },
  { id:'z15', nombre:'Edificio de profesores', descripcion:'Edificio de profesores zona centro', x:80, y:64, estado:'sin-incidencias',   totalIncidencias:0, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z16', nombre:'Cafeteria', descripcion:'Cafetería universitaria', x:32, y:56, estado:'pendiente',         totalIncidencias:3, incidenciasPendientes:2, incidenciasEnProceso:1, incidenciasResueltas:0 },
  { id:'z17', nombre:'Explanada', descripcion:'Explanada central', x:50, y:62, estado:'sin-incidencias',   totalIncidencias:0, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z18', nombre:'Bloque de Aulas', descripcion:'Bloque de aulas', x:78, y:74, estado:'proceso',           totalIncidencias:2, incidenciasPendientes:0, incidenciasEnProceso:2, incidenciasResueltas:0 },
  { id:'z19', nombre:'Departamento del rector', descripcion:'Departamento del rector', x:14, y:52, estado:'sin-incidencias',   totalIncidencias:0, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z20', nombre:'Almacen', descripcion:'Almacén universitario', x:28, y:68, estado:'resuelto',          totalIncidencias:1, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:1 },
  { id:'z21', nombre:'Recursos humanos', descripcion:'Departamento de recursos humanos', x:40, y:72, estado:'sin-incidencias',   totalIncidencias:0, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z22', nombre:'Rectoría, sala de reuniones y oficina de redes', descripcion:'Rectoría, sala de reuniones y oficina de redes', x:32, y:80, estado:'pendiente',         totalIncidencias:2, incidenciasPendientes:2, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z23', nombre:'Auditorio', descripcion:'Auditorio universitario', x:58, y:84, estado:'resuelto',          totalIncidencias:1, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:1 },
  { id:'z24', nombre:'Servicios escolares, enfermeria y vicerrectoria', descripcion:'Servicios escolares, enfermería y vicerrectoría', x:68, y:78, estado:'proceso',           totalIncidencias:2, incidenciasPendientes:0, incidenciasEnProceso:2, incidenciasResueltas:0 },
  { id:'z25', nombre:'Sala de computo de diseño y matematicas', descripcion:'Sala de cómputo, diseño y matemáticas', x:82, y:86, estado:'sin-incidencias',   totalIncidencias:0, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z26', nombre:'Modulo de vigilancia', descripcion:'Módulo de vigilancia', x:46, y:90, estado:'sin-incidencias',   totalIncidencias:0, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z27', nombre:'Estacionamiento', descripcion:'Estacionamiento universitario', x:26, y:88, estado:'pendiente',         totalIncidencias:2, incidenciasPendientes:2, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z28', nombre:'Cancha de Deportes', descripcion:'Cancha de deportes', x:10, y:84, estado:'sin-incidencias',   totalIncidencias:0, incidenciasPendientes:0, incidenciasEnProceso:0, incidenciasResueltas:0 },
  { id:'z29', nombre:'Planta de tratamiento de agua', descripcion:'Planta de tratamiento de agua', x:8,  y:20, estado:'proceso',           totalIncidencias:1, incidenciasPendientes:0, incidenciasEnProceso:1, incidenciasResueltas:0 },
];
