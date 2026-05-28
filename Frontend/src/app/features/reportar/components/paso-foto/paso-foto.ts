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
  mapaNota = 'Toca el mapa para marcar la ubicación exacta';

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

  marcarPin(event: MouseEvent): void {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    this.pinX = event.clientX - rect.left;
    this.pinY = event.clientY - rect.top;
    this.mapaNota = '📍 Ubicación marcada correctamente';
    this.emitir();
  }

  emitir(): void {
    this.datosActualizados.emit({
      fotoPreview: this.fotoPreview,
      pinX: this.pinX,
      pinY: this.pinY
    });
  }

  abrirSelector(input: HTMLInputElement): void {
    input.click();
  }
}