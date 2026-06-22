import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/usuarios';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAdmin) {
    return true;
  }

  if (typeof window !== 'undefined' && window.alert) {
    window.alert('No tienes permisos para acceder al panel de administración.');
  }

  router.navigate(['/inicio']);
  return false;
};
