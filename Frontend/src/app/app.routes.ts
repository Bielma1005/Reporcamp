import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./features/inicio/pages/inicio-page/inicio-page').then(
        m => m.InicioPage
      )
  },
  {
    path: 'reportar',
    loadComponent: () =>
      import('./features/reportar/pages/reportar-page/reportar-page').then(
        m => m.ReportarPage
      )
  },
  {
    path: 'stats',
    loadComponent: () =>
      import('./features/stats/pages/stats-page/stats-page').then(
        m => m.StatsPage
      )
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/pages/admin-page/admin-page').then(
        m => m.AdminPage
      )
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];