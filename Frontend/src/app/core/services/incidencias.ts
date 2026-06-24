import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  Incidencia,
  CrearIncidenciaDto,
  ActualizarIncidenciaDto,
  FiltroIncidencia,
  ResumenEstadisticas,
  IncidenciaBackend 
} from '../../models/incidencia';

@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  private apiUrl = `${environment.apiUrl}/incidencias`;
  private _incidencias$ = new BehaviorSubject<Incidencia[]>([]);
  incidencias$ = this._incidencias$.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener todas con filtros opcionales
  getAll(filtros?: FiltroIncidencia): Observable<Incidencia[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.estado && filtros.estado !== 'all') params = params.set('estado', filtros.estado);
      if (filtros.categoria && filtros.categoria !== 'all') params = params.set('categoria', filtros.categoria);
      if (filtros.zona) params = params.set('zona', filtros.zona);
      if (filtros.busqueda) params = params.set('busqueda', filtros.busqueda);
      if (filtros.tecnicoId) params = params.set('tecnicoId', filtros.tecnicoId.toString());
    }
    return this.http.get<Incidencia[]>(this.apiUrl, { params }).pipe(
      tap(data => this._incidencias$.next(data))
    );
  }

  // Obtener por ID
  getById(id: number): Observable<Incidencia> {
    return this.http.get<Incidencia>(`${this.apiUrl}/${id}`);
  }

  // Obtener por código (CR-0012)
  getByCodigo(codigo: string): Observable<Incidencia> {
    return this.http.get<Incidencia>(`${this.apiUrl}/codigo/${codigo}`);
  }

  // Crear nueva incidencia
  crear(dto: CrearIncidenciaDto): Observable<Incidencia> {
    return this.http.post<Incidencia>(this.apiUrl, dto);
  }

  // Actualizar estado, prioridad o técnico
  actualizar(id: number, dto: ActualizarIncidenciaDto): Observable<Incidencia> {
    return this.http.patch<Incidencia>(`${this.apiUrl}/${id}`, dto);
  }
  // El admin puede cambiar el estado de la incidencia directamente
  cambiarEstado(id: number, estado: string): Observable<IncidenciaBackend> {
  return this.http.patch<IncidenciaBackend>(`${this.apiUrl}/${id}/estado`, { estado });
  }
  // Asignar personal a la incidencia
  asignarPersonal(id: number, personal_asignado: string): Observable<IncidenciaBackend> {
  return this.http.patch<IncidenciaBackend>(`${this.apiUrl}/${id}/asignar`, { personal_asignado });
  }

  // Agregar comentario
  agregarComentario(id: number, texto: string): Observable<Incidencia> {
    return this.http.post<Incidencia>(`${this.apiUrl}/${id}/comentarios`, { texto });
  }

  // Verificar resolución (por el reportante)
  verificarResolucion(id: number): Observable<Incidencia> {
    return this.http.post<Incidencia>(`${this.apiUrl}/${id}/verificar`, {});
  }

  // Subir foto
  subirFoto(id: number, archivo: File): Observable<{ url: string }> {
    const form = new FormData();
    form.append('foto', archivo);
    return this.http.post<{ url: string }>(`${this.apiUrl}/${id}/foto`, form);
  }

  // Resumen estadístico
  getResumen(): Observable<ResumenEstadisticas> {
    return this.http.get<ResumenEstadisticas>(`${this.apiUrl}/resumen`);
  }

  // Exportar CSV
  exportarCSV(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/exportar`, { responseType: 'blob' });
  }
}