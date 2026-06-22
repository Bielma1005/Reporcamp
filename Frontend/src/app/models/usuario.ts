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

export const USUARIOS_MOCK: Usuario[] = [
  { id: 1, nombre: 'Ana', apellido: 'Alvarado', correo: 'a.alvarado@unistmo.edu.mx', rol: 'admin', area: 'Dirección', iniciales: 'AA', color: '#F05050', activo: true, ultimoAcceso: 'Hoy 09:12', totalReportes: 0 },
  { id: 2, nombre: 'Juan', apellido: 'Martínez', correo: 'j.martinez@unistmo.edu.mx', rol: 'ciudadano', area: 'Ing. Computación', iniciales: 'JM', color: '#7A1F2B', activo: true, ultimoAcceso: 'Hoy 08:45', totalReportes: 4 },
  { id: 3, nombre: 'Leslie', apellido: 'Cristóbal', correo: 'l.cristobal@unistmo.edu.mx', rol: 'ciudadano', area: 'Ing. Computación', iniciales: 'LC', color: '#10C8B0', activo: true, ultimoAcceso: 'Hoy 07:30', totalReportes: 2 },
  { id: 4, nombre: 'Emanuel', apellido: 'Ruiz', correo: 'e.ruiz@unistmo.edu.mx', rol: 'ciudadano', area: 'Ing. Computación', iniciales: 'ER', color: '#F0A030', activo: true, ultimoAcceso: 'Ayer 17:00', totalReportes: 1 },
  { id: 5, nombre: 'Luis', apellido: 'Pérez', correo: 'l.perez@unistmo.edu.mx', rol: 'ciudadano', area: 'Administración', iniciales: 'LP', color: '#8A7D68', activo: false, ultimoAcceso: '8 May', totalReportes: 1 },
];