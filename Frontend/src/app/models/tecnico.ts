export type RolUsuario = 'admin' | 'tecnico' | 'ciudadano' | 'invitado';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  rol: RolUsuario;
  area: string;
  iniciales: string;
  color: string;
  activo: boolean;
  ultimoAcceso: string;
  totalReportes: number;
}

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

export interface LoginDto {
  correo: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export interface CrearUsuarioDto {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  rol: RolUsuario;
  area: string;
}