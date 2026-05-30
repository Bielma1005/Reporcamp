import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaIncidencia } from '../../../../../models/incidencia';
import { DatoDescripcion } from '../paso-descripcion/paso-descripcion';
import { DatoFoto } from '../paso-foto/paso-foto';

@Component({
  selector: 'app-paso-confirmar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paso-confirmar.html',
  styleUrl: './paso-confirmar.scss'
})
export class PasoConfirmar {
  @Input() categoria: CategoriaIncidencia | null = null;
  @Input() descripcion: DatoDescripcion = { zona: '', ubicacionExacta: '', descripcion: '' };
  @Input() foto: DatoFoto = { fotoPreview: null, pinX: null, pinY: null };

  getIcono(): string {
    const iconos: Record<string, string> = {
      'Infraestructura': '🏗️',
      'Servicios': '⚡',
      'Limpieza': '🧹'
    };
    return this.categoria ? iconos[this.categoria] : '—';
  }

  getDescCorta(): string {
    const d = this.descripcion.descripcion;
    if (!d) return '—';
    return d.length > 80 ? d.substring(0, 80) + '...' : d;
  }
}