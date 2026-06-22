import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

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
    canActivate: [adminGuard],
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
