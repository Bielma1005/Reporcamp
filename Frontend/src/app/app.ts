import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNav } from './shared/components/bottom-nav/bottom-nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BottomNav],
  template: `
    <div class="app-wrapper">
      <router-outlet />
      <app-bottom-nav />
    </div>
  `,
  styles: [`
    .app-wrapper {
      width: 100%;
      max-width: 430px;
      margin: 0 auto;
      min-height: 100vh;
      background: #080A10;
      position: relative;
    }
  `]
})
export class App {}