import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DatoFoto {
  fotoPreview: string | null;
  pinX: number | null;
  pinY: number | null;
}

@Component({
  selector: 'app-paso-foto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paso-foto.html',
  styleUrl: './paso-foto.scss'
})
export class PasoFoto {
  @Output() datosActualizados = new EventEmitter<DatoFoto>();

  fotoPreview: string | null = null;
  pinX: number | null = null;
  pinY: number | null = null;

  // ── Foto ──────────────────────────────────────────────
  abrirSelector(input: HTMLInputElement): void {
    input.click();
  }

  onFoto(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      this.fotoPreview = e.target?.result as string;
      this.emitir();
    };
    reader.readAsDataURL(file);
  }

  // ── Pin en el mapa ────────────────────────────────────
  marcarPin(event: MouseEvent): void {
    const el   = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();

    // Posición relativa al contenedor del mapa
    this.pinX = event.clientX - rect.left;
    this.pinY = event.clientY - rect.top;

    this.emitir();
  }

  // ── Emitir datos al padre ─────────────────────────────
  emitir(): void {
    this.datosActualizados.emit({
      fotoPreview: this.fotoPreview,
      pinX:        this.pinX,
      pinY:        this.pinY
    });
  }
}