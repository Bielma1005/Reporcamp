import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      `${this.apiUrl}/login`,
      { username, password }
    ).pipe(
      tap(res => localStorage.setItem('token', res.access_token))
    );
  }

  logout(): void {
  if (typeof window !== 'undefined') localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

  isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
}
 getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}
}
