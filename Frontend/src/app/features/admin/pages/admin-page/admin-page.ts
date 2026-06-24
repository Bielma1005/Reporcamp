import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabIncidencias }   from '../../components/tab-incidencias/tab-incidencias';
import { TabUsuarios }      from '../../components/tab-usuarios/tab-usuarios';
import { TabTecnicos }      from '../../components/tab-tecnicos/tab-tecnicos';
import { TabConfiguracion } from '../../components/tab-configuracion/tab-configuracion';

type TabActivo = 'incidencias' | 'usuarios' | 'tecnicos' | 'config';

interface Tab {
  id: TabActivo;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    TabIncidencias,
    TabUsuarios,
    TabTecnicos,
    TabConfiguracion
  ],
  templateUrl: './admin-page.html',
  styleUrl:    './admin-page.scss'
})
export class AdminPage {

  tabActivo = signal<TabActivo>('incidencias');

  tabs: Tab[] = [
    { id: 'incidencias', icon: '⊞', label: 'Incidencias' },
    { id: 'usuarios',    icon: '👥', label: 'Usuarios'    },
    { id: 'tecnicos',    icon: '🔧', label: 'Técnicos'    },
    { id: 'config',      icon: '⚙️', label: 'Config.'     },
  ];

  setTab(id: TabActivo): void { this.tabActivo.set(id); }

  
}