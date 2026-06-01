import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tecnico, TECNICOS_MOCK } from '../../../../models/tecnico';

@Component({
  selector: 'app-tab-tecnicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-tecnicos.html',
  styleUrl: './tab-tecnicos.scss'
})
export class TabTecnicos implements OnInit {

  tecnicos = signal<Tecnico[]>([]);

  ngOnInit(): void { this.tecnicos.set(TECNICOS_MOCK); }

  getDispClass(disp: boolean): string { return disp ? 'disp-on' : 'disp-off'; }
  getDispLabel(disp: boolean): string { return disp ? 'Disponible' : 'Ocupado'; }

  getCargaColor(asignados: number): string {
    if (asignados >= 5) return '#F05050';
    if (asignados >= 3) return '#F0A030';
    return '#18C96A';
  }
}