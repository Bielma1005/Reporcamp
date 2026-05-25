import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DatoMensual {
  mes: string;
  nuevas: number;
  resueltas: number;
}

export interface DatoZona {
  zona: string;
  pendientes: number;
  total: number;
  tiempoPromedio: string;
  color: string;
}

export interface EstadisticasGenerales {
  resumen: {
    total: number;
    pendientes: number;
    enProceso: number;
    resueltas: number;
    tiempoPromedio: number;
    tasaResolucion: number;
    resueltasATiempo: number;
  };
  porCategoria: { categoria: string; total: number; color: string }[];
  evolucionMensual: DatoMensual[];
  tiempoPorCategoria: { categoria: string; dias: number; color: string }[];
  zonasCriticas: DatoZona[];
}

@Injectable({ providedIn: 'root' })
export class EstadisticasService {
  private apiUrl = `${environment.apiUrl}/estadisticas`;

  constructor(private http: HttpClient) {}

  getEstadisticas(periodo?: string): Observable<EstadisticasGenerales> {
    const params = periodo ? { periodo } : {};
    return this.http.get<EstadisticasGenerales>(this.apiUrl, { params });
  }

  exportarExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/exportar`, { responseType: 'blob' });
  }
}