export interface Tecnico {
  id: number;
  nombre: string;
  iniciales: string;
  color: string;
  especialidad: string;
  asignados: number;
  resueltosEsteMes: number;
  tiempoPromedio: string;
  disponible: boolean;
  correo: string;
}

export const TECNICOS_MOCK: Tecnico[] = [
  { id: 1, nombre: 'Roberto Sánchez', iniciales: 'RS', color: '#F0A030', especialidad: 'Climatización / HVAC', asignados: 3, resueltosEsteMes: 12, tiempoPromedio: '3.2d', disponible: true, correo: 'r.sanchez@unistmo.edu.mx' },
  { id: 2, nombre: 'María Torres', iniciales: 'MT', color: '#18C96A', especialidad: 'Electricidad e iluminación', asignados: 5, resueltosEsteMes: 18, tiempoPromedio: '2.8d', disponible: false, correo: 'm.torres@unistmo.edu.mx' },
  { id: 3, nombre: 'Carlos Vega', iniciales: 'CV', color: '#10C8B0', especialidad: 'Plomería y sanitarios', asignados: 1, resueltosEsteMes: 9, tiempoPromedio: '4.5d', disponible: true, correo: 'c.vega@unistmo.edu.mx' },
];