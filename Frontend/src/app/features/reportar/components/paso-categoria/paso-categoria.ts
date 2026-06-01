import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaIncidencia } from '../../../../models/incidencia';

interface CatCard {
  id: CategoriaIncidencia;
  icon: string;
  nombre: string;
  desc: string;
}

@Component({
  selector: 'app-paso-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paso-categoria.html',
  styleUrl: './paso-categoria.scss'
})
export class PasoCategoria {
  @Output() categoriaSeleccionada = new EventEmitter<CategoriaIncidencia>();

  seleccionada: CategoriaIncidencia | null = null;

  categorias: CatCard[] = [
    { id: 'Infraestructura', icon: '🏗️', nombre: 'Infraestructura', desc: 'Paredes, techos, puertas, mobiliario dañado' },
    { id: 'Servicios',       icon: '⚡', nombre: 'Servicios',        desc: 'Luz, agua, internet, climatización' },
    { id: 'Limpieza',        icon: '🧹', nombre: 'Limpieza',         desc: 'Basura, sanitarios, plagas, higiene' },
  ];

  seleccionar(cat: CategoriaIncidencia): void {
    this.seleccionada = cat;
    this.categoriaSeleccionada.emit(cat);
  }
}
