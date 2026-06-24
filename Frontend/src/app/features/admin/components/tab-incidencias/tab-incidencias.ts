import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IncidenciaBackend } from '../../../../models/incidencia';
import { IncidenciaService } from '../../../../core/services/incidencias';
import { TecnicoService, Tecnico } from '../../../../core/services/tecnicos';

@Component({
  selector: 'app-tab-incidencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tab-incidencias.html',
  styleUrl: './tab-incidencias.scss'
})
export class TabIncidencias implements OnInit {
  incidencias = signal<IncidenciaBackend[]>([]);
  tecnicos = signal<Tecnico[]>([]);
  busqueda = signal('');
  filtroEst = signal<string>('all');
  filtroCat = signal<string>('all');

  constructor(
    private router: Router,
    private incidenciaService: IncidenciaService,
    private tecnicoService: TecnicoService
  ) {}

  ngOnInit(): void {
    this.incidenciaService.getAll().subscribe({
      next: (datos) => this.incidencias.set(datos as unknown as IncidenciaBackend[]),
      error: (err) => console.error('Error cargando incidencias', err)
    });
    this.tecnicoService.getAll().subscribe({
      next: (datos) => this.tecnicos.set(datos),
      error: (err) => console.error('Error cargando técnicos', err)
    });
  }

  filtradas = computed(() => {
    let lista = this.incidencias();
    const est = this.filtroEst();
    const cat = this.filtroCat();
    const busq = this.busqueda().toLowerCase();
    if (est !== 'all') lista = lista.filter(i => i.estado === est);
    if (cat !== 'all') lista = lista.filter(i => i.categoria === cat);
    if (busq) lista = lista.filter(i =>
      i.codigo.toLowerCase().includes(busq) ||
      i.zona.toLowerCase().includes(busq)
    );
    return lista;
  });

  resumen = computed(() => ({
    total: this.incidencias().length,
    pendientes: this.incidencias().filter(i => i.estado === 'pendiente').length,
    proceso: this.incidencias().filter(i => i.estado === 'proceso').length,
    hoy: 0
  }));

  onBuscar(v: string): void { this.busqueda.set(v); }
  setEst(e: string): void { this.filtroEst.set(e); }
  setCat(c: string): void { this.filtroCat.set(c); }
  verDetalle(inc: IncidenciaBackend): void { console.log(inc); }
  getTagClass(estado: string): string { return `tag-${estado}`; }
  getTagLabel(estado: string): string { return estado; }

  cambiarEstado(inc: IncidenciaBackend, nuevoEstado: string): void {
    this.incidenciaService.cambiarEstado(inc.id, nuevoEstado).subscribe({
      next: (actualizada) => {
        this.incidencias.update(lista =>
          lista.map(i => i.id === actualizada.id ? actualizada : i)
        );
      },
      error: (err) => console.error('Error cambiando estado', err)
    });
  }

  asignarTecnico(inc: IncidenciaBackend, nombre: string): void {
    if (!nombre) return;
    this.incidenciaService.asignarPersonal(inc.id, nombre).subscribe({
      next: (actualizada) => {
        this.incidencias.update(lista =>
          lista.map(i => i.id === actualizada.id ? actualizada : i)
        );
      },
      error: (err) => console.error('Error asignando técnico', err)
    });
  }
}