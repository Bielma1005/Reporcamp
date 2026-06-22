import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/usuarios';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss'
})
export class BottomNav {
  private auth = inject(AuthService);
  private router = inject(Router);

  navItems = [
    { path: '/inicio',    icon: '⊞', label: 'Inicio'   },
    { path: '/reportar',  icon: '＋', label: 'Reportar' },
    { path: '/stats',     icon: '◈',  label: 'Stats'    },
    { path: '/admin',     icon: '◉',  label: 'Admin'    },
  ];

  goTo(item: { path: string; label: string }): void {
    if (item.path === '/admin' && !this.auth.isAdmin) {
      this.auth.entrarComoAdmin();
    }
    this.router.navigate([item.path]);
  }
}