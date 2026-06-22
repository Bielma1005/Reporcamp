import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario, LoginDto, AuthResponse, CrearUsuarioDto, RolUsuario } from '../../models/usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private _usuario$ = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this._usuario$.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const stored = this.safeGetItem('usuario');
    if (stored) {
      try {
        this._usuario$.next(JSON.parse(stored));
      } catch {
        this.safeRemoveItem('usuario');
      }
    }
  }

  get usuario(): Usuario | null { return this._usuario$.value; }
  get token(): string | null { return this.safeGetItem('token'); }
  get isLoggedIn(): boolean { return !!this.token; }
  get isAdmin(): boolean { return this.usuario?.rol === 'admin'; }
  get isTecnico(): boolean { return this.usuario?.rol === 'tecnico'; }

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dto).pipe(
      tap(res => {
        this.safeSetItem('token', res.token);
        this.safeSetItem('usuario', JSON.stringify(res.usuario));
        this._usuario$.next(res.usuario);
      })
    );
  }

  logout(): void {
    this.safeRemoveItem('token');
    this.safeRemoveItem('usuario');
    this._usuario$.next(null);
    this.router.navigate(['/login']);
  }

  register(dto: CrearUsuarioDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, dto).pipe(
      tap(res => {
        this.safeSetItem('token', res.token);
        this.safeSetItem('usuario', JSON.stringify(res.usuario));
        this._usuario$.next(res.usuario);
      })
    );
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/usuarios`);
  }

  setRole(role: RolUsuario): void {
    const current = this.usuario ?? this.crearUsuarioDemo();
    const actualizado: Usuario = { ...current, rol: role };
    this.safeSetItem('usuario', JSON.stringify(actualizado));
    this._usuario$.next(actualizado);
  }

  entrarComoAdmin(): void {
    this.setRole('admin');
  }

  private crearUsuarioDemo(): Usuario {
    return {
      id: 999,
      nombre: 'Demo',
      apellido: 'Admin',
      correo: 'demo@campusreport.com',
      rol: 'ciudadano',
      area: 'Administración',
      iniciales: 'DE',
      color: '#7A1F2B',
      activo: true,
      ultimoAcceso: 'Ahora',
      totalReportes: 0
    };
  }

  private safeGetItem(key: string): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
  }

  private safeSetItem(key: string, value: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  private safeRemoveItem(key: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}
