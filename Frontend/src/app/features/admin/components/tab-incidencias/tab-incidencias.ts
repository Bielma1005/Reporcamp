import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Incidencia, EstadoIncidencia, INCIDENCIAS_MOCK } from '../../../../models/incidencia';

@Component({
  selector: 'app-tab-incidencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tab-incidencias.html',
  styleUrl: './tab-incidencias.scss'
})
export class TabIncidencias implements OnInit {

  incidencias = signal<Incidencia[]>([]);
  busqueda    = signal('');
  filtroEst   = signal<EstadoIncidencia | 'all'>('all');
  filtroCat   = signal<string>('all');

  filtradas = computed(() => {
    let lista = this.incidencias();
    const est  = this.filtroEst();
    const cat  = this.filtroCat();
    const busq = this.busqueda().toLowerCase();
    if (est  !== 'all') lista = lista.filter(i => i.estado    === est);
    if (cat  !== 'all') lista = lista.filter(i => i.categoria === cat);
    if (busq)           lista = lista.filter(i =>
      i.titulo.toLowerCase().includes(busq) ||
      i.codigo.toLowerCase().includes(busq) ||
      i.zona.toLowerCase().includes(busq)
    );
    return lista;
  });

  resumen = computed(() => ({
    total:     this.incidencias().length,
    pendientes: this.incidencias().filter(i => i.estado === 'pendiente').length,
    proceso:    this.incidencias().filter(i => i.estado === 'proceso').length,
    hoy:        3
  }));

  constructor(private router: Router) {}

  ngOnInit(): void { this.incidencias.set(INCIDENCIAS_MOCK); }

  onBuscar(v: string): void   { this.busqueda.set(v); }
  setEst(e: string): void     { this.filtroEst.set(e as EstadoIncidencia | 'all'); }
  setCat(c: string): void     { this.filtroCat.set(c); }
  verDetalle(inc: Incidencia) { this.router.navigate(['/inicio']); }

  getIcono(cat: string): string {
    return cat === 'Infraestructura' ? '🏗️' : cat === 'Servicios' ? '⚡' : '🧹';
  }
  getTagClass(estado: string): string  { return `tag-${estado}`; }
  getTagLabel(estado: string): string  { return estado === 'proceso' ? 'proceso' : estado; }
  getPrioClass(p: string): string      { return `prio-${p}`; }
  getPrioLabel(p: string): string      { return p === 'alta' ? '▲ Alta' : p === 'media' ? '● Media' : '▼ Baja'; }
  tieneTecnico(inc: Incidencia): boolean { return !inc.tecnicoNombre; }
}