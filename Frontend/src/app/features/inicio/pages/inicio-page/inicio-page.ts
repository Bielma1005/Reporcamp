import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IncidenciaCard } from '../../../../shared/components/incidencia-card/incidencia-card';
import { ZONAS_CAMPUS_MOCK } from '../../../../models/mapa-campus';
import {
  Incidencia,
  EstadoIncidencia,
  CategoriaIncidencia,
  INCIDENCIAS_MOCK
} from '../../../../models/incidencia';

@Component({
  selector: 'app-inicio-page',
  standalone: true,
  imports: [CommonModule, FormsModule, IncidenciaCard],
  templateUrl: './inicio-page.html',
  styleUrl: './inicio-page.scss'
})
export class InicioPage implements OnInit {

  // ── Señales reactivas ─────────────────────────────────
  incidencias          = signal<Incidencia[]>([]);
  busqueda             = signal('');
  filtroEstado         = signal<EstadoIncidencia | 'all'>('all');
  filtroCategoria      = signal<CategoriaIncidencia | 'all'>('all');
  incidenciaSeleccionada = signal<Incidencia | null>(null);
  mostrarSheet         = signal(false);

  // ── Computed: lista filtrada ──────────────────────────
  incidenciasFiltradas = computed(() => {
    let lista = this.incidencias();
    const estado    = this.filtroEstado();
    const categoria = this.filtroCategoria();
    const busq      = this.busqueda().toLowerCase();

    if (estado    !== 'all') lista = lista.filter(i => i.estado    === estado);
    if (categoria !== 'all') lista = lista.filter(i => i.categoria === categoria);
    if (busq) lista = lista.filter(i =>
      i.titulo.toLowerCase().includes(busq) ||
      i.zona.toLowerCase().includes(busq)   ||
      i.codigo.toLowerCase().includes(busq)
    );
    return lista;
  });

  // ── Computed: resumen ─────────────────────────────────
  resumen = computed(() => {
    const lista = this.incidencias();
    return {
      total:     lista.length,
      pendientes: lista.filter(i => i.estado === 'pendiente').length,
      enProceso:  lista.filter(i => i.estado === 'proceso').length,
      resueltas:  lista.filter(i => i.estado === 'resuelto').length,
    };
  });

  // ── Mapa ──────────────────────────────────────────────
  // Pon la imagen en: Frontend/mi-proyecto/public/mapa-campus.jpeg
  readonly mapPath   = 'mapa-campus.jpeg';
  private readonly zonasCampus = ZONAS_CAMPUS_MOCK;

  // Pins en porcentaje (%) sobre la imagen real del campus UNISTMO
  // Ajusta estos valores según donde queden los edificios en TU imagen
  pins = [
    { x: 48, y: 22, estado: 'pendiente', codigo: 'CR-0012', zona: this.getZonaNombre('z22') },
    { x: 65, y: 48, estado: 'proceso',   codigo: 'CR-0015', zona: this.getZonaNombre('z14') },
    { x: 47, y: 55, estado: 'pendiente', codigo: 'CR-0011', zona: this.getZonaNombre('z13') },
    { x: 68, y: 62, estado: 'resuelto',  codigo: 'CR-0009', zona: this.getZonaNombre('z16') },
    { x: 46, y: 70, estado: 'pendiente', codigo: 'CR-0016', zona: this.getZonaNombre('z24') },
    { x: 82, y: 38, estado: 'proceso',   codigo: 'CR-0014', zona: this.getZonaNombre('z12') },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.incidencias.set(INCIDENCIAS_MOCK);
  }

  private getZonaNombre(id: string): string {
    return this.zonasCampus.find(zona => zona.id === id)?.nombre ?? id;
  }

  // ── Filtros ───────────────────────────────────────────
  setFiltroEstado(estado: EstadoIncidencia | 'all'): void {
    this.filtroEstado.set(estado);
    this.filtroCategoria.set('all');
  }

  setFiltroCategoria(cat: CategoriaIncidencia): void {
    this.filtroCategoria.set(this.filtroCategoria() === cat ? 'all' : cat);
    this.filtroEstado.set('all');
  }

  onBuscar(valor: string): void {
    this.busqueda.set(valor);
  }

  // ── Sheet ─────────────────────────────────────────────
  abrirSheet(incidencia: Incidencia): void {
    this.incidenciaSeleccionada.set(incidencia);
    this.mostrarSheet.set(true);
  }

  abrirSheetPorCodigo(codigo: string): void {
    const inc = this.incidencias().find(i => i.codigo === codigo);
    if (inc) this.abrirSheet(inc);
  }

  cerrarSheet(): void {
    this.mostrarSheet.set(false);
    this.incidenciaSeleccionada.set(null);
  }

  irADetalle(): void {
    this.cerrarSheet();
    this.router.navigate(['/reportar']);
  }

  irAReportar(): void {
    this.router.navigate(['/reportar']);
  }

  // ── Colores ───────────────────────────────────────────
  getColorPin(estado: string): string {
    const colores: Record<string, string> = {
      pendiente: '#F05050',
      proceso:   '#F0A030',
      resuelto:  '#18C96A'
    };
    return colores[estado] ?? '#8A7D68';
  }
}