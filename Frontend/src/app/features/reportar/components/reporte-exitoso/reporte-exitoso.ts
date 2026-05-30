import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporte-exitoso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporte-exitoso.html',
  styleUrl: './reporte-exitoso.scss'
})
export class ReporteExitoso {
  @Input() codigo = '';
  @Output() irAInicio = new EventEmitter<void>();
}