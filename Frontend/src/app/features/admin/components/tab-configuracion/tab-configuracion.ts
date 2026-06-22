import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZONAS_CAMPUS_MOCK } from '../../../../models/mapa-campus';

@Component({
  selector: 'app-tab-configuracion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-configuracion.html',
  styleUrl: './tab-configuracion.scss'
})
export class TabConfiguracion {
  zonas = ZONAS_CAMPUS_MOCK.map(zona => zona.nombre);

  categorias = [
    { nombre: 'Infraestructura', icon: '🏗️', desc: 'Paredes, techos, puertas, mobiliario' },
    { nombre: 'Servicios',       icon: '⚡', desc: 'Luz, agua, internet, climatización'   },
    { nombre: 'Limpieza',        icon: '🧹', desc: 'Basura, sanitarios, plagas, higiene'  },
  ];
}