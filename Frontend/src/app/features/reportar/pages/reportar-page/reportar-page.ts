import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriaIncidencia } from '../../../../models/incidencia';
import { PasoCategoria } from '../components/paso-categoria/paso-categoria';
import { PasoDescripcion, DatoDescripcion } from '../components/paso-descripcion/paso-descripcion';
import { PasoFoto, DatoFoto } from '../components/paso-foto/paso-foto';
import { PasoConfirmar } from '../components/paso-confirmar/paso-confirmar';
import { ReporteExitoso } from '../components/reporte-exitoso/reporte-exitoso';

@Component({
  selector: 'app-reportar-page',
  standalone: true,
  imports: [
    CommonModule,
    PasoCategoria,
    PasoDescripcion,
    PasoFoto,
    PasoConfirmar,
    ReporteExitoso
  ],
  templateUrl: './reportar-page.html',
  styleUrl: './reportar-page.scss'
})
export class ReportarPage {

  paso = signal(1);
  enviado = signal(false);
  cargando = signal(false);

  // Datos acumulados de cada paso
  categoria = signal<CategoriaIncidencia | null>(null);
  descripcion = signal<DatoDescripcion>({ zona: '', ubicacionExacta: '', descripcion: '' });
  foto = signal<DatoFoto>({ fotoPreview: null, pinX: null, pinY: null });
  codigoGenerado = signal('');

  pasos = [
    { n: 1, label: 'Categoría'   },
    { n: 2, label: 'Descripción' },
    { n: 3, label: 'Foto'        },
    { n: 4, label: 'Confirmar'   },
  ];

  constructor(private router: Router) {}

  // ── Navegación ────────────────────────────────────────
  siguiente(): void {
    if (this.paso() < 4) {
      this.paso.update(p => p + 1);
      return;
    }
    this.enviar();
  }

  anterior(): void {
    if (this.paso() > 1) this.paso.update(p => p - 1);
    else this.router.navigate(['/inicio']);
  }

  goBack(): void { this.anterior(); }

  // ── Validación por paso ───────────────────────────────
  puedeAvanzar(): boolean {
    switch (this.paso()) {
      case 1: return !!this.categoria();
      case 2: return !!this.descripcion().zona && !!this.descripcion().descripcion.trim();
      case 3: return true; // foto y mapa son opcionales
      case 4: return true;
      default: return false;
    }
  }

  labelBoton(): string {
    if (this.cargando()) return 'Enviando...';
    return this.paso() === 4 ? '✓ Enviar reporte' : 'Continuar →';
  }

  // ── Callbacks de pasos ────────────────────────────────
  onCategoria(cat: CategoriaIncidencia): void {
    this.categoria.set(cat);
  }

  onDescripcion(datos: DatoDescripcion): void {
    this.descripcion.set(datos);
  }

  onFoto(datos: DatoFoto): void {
    this.foto.set(datos);
  }

  // ── Envío ─────────────────────────────────────────────
  enviar(): void {
    this.cargando.set(true);
    // Simulación: en producción aquí llamas al servicio HTTP
    setTimeout(() => {
      const codigo = 'CR-0' + (Math.floor(Math.random() * 900) + 100);
      this.codigoGenerado.set(codigo);
      this.enviado.set(true);
      this.cargando.set(false);
    }, 1200);
  }

  irAInicio(): void {
    this.router.navigate(['/inicio']);
  }
}