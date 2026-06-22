import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZONAS_CAMPUS_MOCK } from '../../../../models/mapa-campus';

export interface DatoDescripcion {
  zona: string;
  ubicacionExacta: string;
  descripcion: string;
}

@Component({
  selector: 'app-paso-descripcion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paso-descripcion.html',
  styleUrl: './paso-descripcion.scss'
})
export class PasoDescripcion {
  @Output() datosActualizados = new EventEmitter<DatoDescripcion>();

  zonas = ZONAS_CAMPUS_MOCK.map(zona => zona.nombre);

  datos: DatoDescripcion = {
    zona: '',
    ubicacionExacta: '',
    descripcion: ''
  };

  onCambio(): void {
    this.datosActualizados.emit({ ...this.datos });
  }

  esValido(): boolean {
    return !!this.datos.zona && !!this.datos.descripcion.trim();
  }
}