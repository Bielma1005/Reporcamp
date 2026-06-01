import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario, LoginDto, AuthResponse, CrearUsuarioDto } from '../../models/usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private _usuario$ = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this._usuario$.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const stored = localStorage.getItem('usuario');
    if (stored) this._usuario$.next(JSON.parse(stored));
  }

  get usuario(): Usuario | null { return this._usuario$.value; }
  get token(): string | null { return localStorage.getItem('token'); }
  get isLoggedIn(): boolean { return !!this.token; }
  get isAdmin(): boolean { return this.usuario?.rol === 'admin'; }
  get isTecnico(): boolean { return this.usuario?.rol === 'tecnico'; }

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dto).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this._usuario$.next(res.usuario);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this._usuario$.next(null);
    this.router.navigate(['/login']);
  }

  register(dto: CrearUsuarioDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, dto).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this._usuario$.next(res.usuario);
      })
    );
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/usuarios`);
  }
}
