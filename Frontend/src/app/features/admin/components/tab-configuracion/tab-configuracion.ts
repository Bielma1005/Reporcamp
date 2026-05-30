import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-configuracion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-configuracion.html',
  styleUrl: './tab-configuracion.scss'
})
export class TabConfiguracion {
  zonas = [
    'Edificio A', 'Edificio B', 'Edificio C', 'Edificio D',
    'Rectoría', 'Cafetería', 'Laboratorios', 'Biblioteca',
    'Lab. Cómputo', 'Estacionamiento', 'Área verde', 'Servicios'
  ];

  categorias = [
    { nombre: 'Infraestructura', icon: '🏗️', desc: 'Paredes, techos, puertas, mobiliario' },
    { nombre: 'Servicios',       icon: '⚡', desc: 'Luz, agua, internet, climatización'   },
    { nombre: 'Limpieza',        icon: '🧹', desc: 'Basura, sanitarios, plagas, higiene'  },
  ];
}