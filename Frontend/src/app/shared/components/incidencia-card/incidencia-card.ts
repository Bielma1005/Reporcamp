import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Incidencia } from '../../../models/incidencia';

@Component({
  selector: 'app-incidencia-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incidencia-card.html',
  styleUrl: './incidencia-card.scss'
})
export class IncidenciaCard {
  @Input() incidencia!: Incidencia;
  @Output() verDetalle = new EventEmitter<Incidencia>();

  getIcono(): string {
    const iconos: Record<string, string> = {
      'Infraestructura': '🏗️',
      'Servicios': '⚡',
      'Limpieza': '🧹'
    };
    return iconos[this.incidencia.categoria] ?? '📋';
  }

  getBgColor(): string {
    const colores: Record<string, string> = {
      pendiente: '#F0505015',
      proceso:   '#F0A03015',
      resuelto:  '#18C96A15',
      cerrado:   '#E0D5C015'
    };
    return colores[this.incidencia.estado] ?? '#E0D5C015';
  }

  getTagClass(): string {
    return `tag-${this.incidencia.estado}`;
  }

  getTagLabel(): string {
    return this.incidencia.estado === 'proceso' ? 'proceso' : this.incidencia.estado;
  }

  getFecha(): string {
    return new Date(this.incidencia.fechaCreacion).toLocaleDateString('es-MX', {
      day: 'numeric', month: 'short'
    });
  }

  onClick(): void {
    this.verDetalle.emit(this.incidencia);
  }
}