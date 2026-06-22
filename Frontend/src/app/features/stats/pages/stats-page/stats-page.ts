import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { INCIDENCIAS_MOCK } from '../../../../models/incidencia';
import { ZONAS_CAMPUS_MOCK } from '../../../../models/mapa-campus';

interface DatoMensual { mes: string; nuevas: number; resueltas: number; }
interface DatoZona    { zona: string; pendientes: number; total: number; avg: string; color: string; }
interface DatoCategoria { label: string; valor: number; color: string; }

@Component({
  selector: 'app-stats-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-page.html',
  styleUrl:    './stats-page.scss'
})
export class StatsPage implements OnInit {

  periodo = signal<string>('Mayo 2025');
  periodos = ['7 días', 'Mayo 2025', '2025', 'Histórico'];
  private readonly zonasCampus = ZONAS_CAMPUS_MOCK;

  // ── Métricas ─────────────────────────────────────────
  total      = signal(147);
  resueltas  = signal(114);
  tasa       = signal(78);
  tiempoProm = signal(4.2);
  aTiempo    = signal(63);

  // ── Datos de gráficas ────────────────────────────────
  evolucion: DatoMensual[] = [
    { mes: 'Dic', nuevas: 32, resueltas: 25 },
    { mes: 'Ene', nuevas: 28, resueltas: 30 },
    { mes: 'Feb', nuevas: 41, resueltas: 35 },
    { mes: 'Mar', nuevas: 38, resueltas: 32 },
    { mes: 'Abr', nuevas: 45, resueltas: 38 },
    { mes: 'May', nuevas: 52, resueltas: 41 },
  ];

  categorias: DatoCategoria[] = [
    { label: 'Infraestructura', valor: 48, color: '#7A1F2B' },
    { label: 'Servicios',       valor: 61, color: '#F0A030' },
    { label: 'Limpieza',        valor: 38, color: '#10C8B0' },
  ];

  tiempoCat: DatoCategoria[] = [
    { label: 'Infraestructura', valor: 5.8, color: '#7A1F2B' },
    { label: 'Servicios',       valor: 3.4, color: '#F0A030' },
    { label: 'Limpieza',        valor: 2.1, color: '#10C8B0' },
  ];

  zonas: DatoZona[] = [
    { zona: this.zonasCampus.find(z => z.id === 'z14')?.nombre ?? 'Laboratorios de quimica', pendientes: 8, total: 22, avg: '5.2d', color: '#F05050' },
    { zona: this.zonasCampus.find(z => z.id === 'z07')?.nombre ?? 'Aulas y baños', pendientes: 6, total: 18, avg: '3.8d', color: '#F0A030' },
    { zona: this.zonasCampus.find(z => z.id === 'z16')?.nombre ?? 'Cafeteria', pendientes: 5, total: 15, avg: '2.1d', color: '#F0A030' },
    { zona: this.zonasCampus.find(z => z.id === 'z27')?.nombre ?? 'Estacionamiento', pendientes: 4, total: 12, avg: '6.5d', color: '#F05050' },
    { zona: this.zonasCampus.find(z => z.id === 'z13')?.nombre ?? 'Biblioteca', pendientes: 3, total: 20, avg: '3.2d', color: '#18C96A' },
    { zona: this.zonasCampus.find(z => z.id === 'z22')?.nombre ?? 'Rectoría, sala de reuniones y oficina de redes', pendientes: 2, total: 10, avg: '2.8d', color: '#18C96A' },
  ];

  // ── Gráfica de líneas (coordenadas SVG) ──────────────
  maxNuevas = 0;
  puntosNuevas   = '';
  puntosResueltas = '';
  readonly CHART_W = 300;
  readonly CHART_H = 120;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.calcularLineas();
  }

  calcularLineas(): void {
    const max = Math.max(...this.evolucion.map(d => Math.max(d.nuevas, d.resueltas)));
    this.maxNuevas = max;
    const n = this.evolucion.length;
    const xs = this.evolucion.map((_, i) => (i / (n - 1)) * this.CHART_W);
    const yN = this.evolucion.map(d => this.CHART_H - (d.nuevas    / max) * this.CHART_H);
    const yR = this.evolucion.map(d => this.CHART_H - (d.resueltas / max) * this.CHART_H);
    this.puntosNuevas    = xs.map((x, i) => `${x},${yN[i]}`).join(' ');
    this.puntosResueltas = xs.map((x, i) => `${x},${yR[i]}`).join(' ');
  }

  // ── Dona (segmentos SVG) ─────────────────────────────
  getSegmentos(): { d: string; color: string; label: string; valor: number }[] {
    const total = this.categorias.reduce((a, c) => a + c.valor, 0);
    const R = 45; const cx = 55; const cy = 55;
    let angulo = -90;
    return this.categorias.map(cat => {
      const deg   = (cat.valor / total) * 360;
      const start = this.polar(cx, cy, R, angulo);
      const end   = this.polar(cx, cy, R, angulo + deg);
      const large = deg > 180 ? 1 : 0;
      const d = `M ${cx} ${cy} L ${start.x} ${start.y} A ${R} ${R} 0 ${large} 1 ${end.x} ${end.y} Z`;
      angulo += deg;
      return { d, color: cat.color, label: cat.label, valor: cat.valor };
    });
  }

  private polar(cx: number, cy: number, r: number, deg: number) {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  // ── Barras ───────────────────────────────────────────
  getAltoBarra(valor: number): number {
    const max = Math.max(...this.tiempoCat.map(c => c.valor));
    return (valor / max) * 100;
  }

  getAnchoBarra(pendientes: number): number {
    return Math.round((pendientes / 8) * 100);
  }

  // ── Periodo ──────────────────────────────────────────
  setPeriodo(p: string): void { this.periodo.set(p); }

  // ── Exportar XLS ─────────────────────────────────────
  exportarXLS(): void {
    const rows = [
      ['Zona', 'Pendientes', 'Total', 'T.Prom'],
      ...this.zonas.map(z => [z.zona, z.pendientes, z.total, z.avg])
    ];
    const xls = rows.map(r => r.join('\t')).join('\n');
    const blob = new Blob([xls], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `campusreport-${this.periodo()}.xls`;
    a.click();
  }
}