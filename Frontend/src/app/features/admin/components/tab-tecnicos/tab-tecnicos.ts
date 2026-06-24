import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TecnicoService, Tecnico } from '../../../../core/services/tecnicos';

@Component({
  selector: 'app-tab-tecnicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tab-tecnicos.html',
  styleUrl: './tab-tecnicos.scss'
})
export class TabTecnicos implements OnInit {
  tecnicos = signal<Tecnico[]>([]);
  nuevoNombre = '';
  nuevoEspecialidad = '';

  constructor(private tecnicoService: TecnicoService) {}

  ngOnInit(): void {
    this.cargarTecnicos();
  }

  cargarTecnicos(): void {
    this.tecnicoService.getAll().subscribe({
      next: (datos) => this.tecnicos.set(datos),
      error: (err) => console.error('Error cargando técnicos', err)
    });
  }

  registrar(): void {
    if (!this.nuevoNombre.trim() || !this.nuevoEspecialidad.trim()) return;
    this.tecnicoService.crear({
      nombre: this.nuevoNombre.trim(),
      especialidad: this.nuevoEspecialidad.trim()
    }).subscribe({
      next: (t) => {
        this.tecnicos.update(lista => [...lista, t]);
        this.nuevoNombre = '';
        this.nuevoEspecialidad = '';
      },
      error: (err) => console.error('Error registrando técnico', err)
    });
  }

  eliminar(id: number): void {
    this.tecnicoService.eliminar(id).subscribe({
      next: () => this.tecnicos.update(lista => lista.filter(t => t.id !== id)),
      error: (err) => console.error('Error eliminando técnico', err)
    });
  }
}
