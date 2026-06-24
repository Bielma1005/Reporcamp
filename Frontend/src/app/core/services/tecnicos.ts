import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Tecnico {
  id: number;
  nombre: string;
  especialidad: string;
}

export interface TecnicoCreate {
  nombre: string;
  especialidad: string;
}

@Injectable({ providedIn: 'root' })
export class TecnicoService {
  private apiUrl = `${environment.apiUrl}/tecnicos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(this.apiUrl);
  }

  crear(datos: TecnicoCreate): Observable<Tecnico> {
    return this.http.post<Tecnico>(this.apiUrl, datos);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
