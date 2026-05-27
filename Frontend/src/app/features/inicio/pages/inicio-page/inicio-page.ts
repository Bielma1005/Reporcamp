import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IncidenciaCard } from '../../../../shared/components/incidencia-card/incidencia-card';
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

  // Señales reactivas
  incidencias = signal<Incidencia[]>([]);
  busqueda = signal('');
  filtroEstado = signal<EstadoIncidencia | 'all'>('all');
  filtroCategoria = signal<CategoriaIncidencia | 'all'>('all');
  incidenciaSeleccionada = signal<Incidencia | null>(null);
  mostrarSheet = signal(false);

  // Computed — lista filtrada automáticamente
  incidenciasFiltradas = computed(() => {
    let lista = this.incidencias();
    const estado = this.filtroEstado();
    const categoria = this.filtroCategoria();
    const busq = this.busqueda().toLowerCase();

    if (estado !== 'all') lista = lista.filter(i => i.estado === estado);
    if (categoria !== 'all') lista = lista.filter(i => i.categoria === categoria);
    if (busq) lista = lista.filter(i =>
      i.titulo.toLowerCase().includes(busq) ||
      i.zona.toLowerCase().includes(busq) ||
      i.codigo.toLowerCase().includes(busq)
    );
    return lista;
  });

  // Computed — resumen
  resumen = computed(() => {
    const lista = this.incidencias();
    return {
      total:      lista.length,
      pendientes: lista.filter(i => i.estado === 'pendiente').length,
      enProceso:  lista.filter(i => i.estado === 'proceso').length,
      resueltas:  lista.filter(i => i.estado === 'resuelto').length,
    };
  });

  // Pins del mapa
  pins = [
    { x: 34,  y: 35,  estado: 'pendiente', codigo: 'CR-0012' },
    { x: 230, y: 109, estado: 'proceso',   codigo: 'CR-0015' },
    { x: 131, y: 109, estado: 'pendiente', codigo: 'CR-0011' },
    { x: 307, y: 109, estado: 'resuelto',  codigo: 'CR-0009' },
    { x: 131, y: 174, estado: 'pendiente', codigo: 'CR-0016' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Usar datos mock mientras no hay backend
    this.incidencias.set(INCIDENCIAS_MOCK);
  }

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

  getColorPin(estado: string): string {
    const colores: Record<string, string> = {
      pendiente: '#F05050',
      proceso:   '#F0A030',
      resuelto:  '#18C96A'
    };
    return colores[estado] ?? '#7A88AA';
  }
}