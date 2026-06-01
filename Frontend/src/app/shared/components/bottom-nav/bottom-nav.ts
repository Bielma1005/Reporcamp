import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss'
})
export class BottomNav {
  navItems = [
    { path: '/inicio',    icon: '⊞', label: 'Inicio'   },
    { path: '/reportar',  icon: '＋', label: 'Reportar' },
    { path: '/stats',     icon: '◈',  label: 'Stats'    },
    { path: '/admin',     icon: '◉',  label: 'Admin'    },
  ];
}