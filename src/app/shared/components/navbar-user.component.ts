import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar-user',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <a routerLink="/dashboard">FinTech App</a>
      </div>

      <ul class="navbar-menu">
        <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
        <li><a routerLink="/accounts" routerLinkActive="active">Mis Cuentas</a></li>
        <li><a routerLink="/transactions" routerLinkActive="active">Transacciones</a></li>
      </ul>

      <div class="navbar-user">
        <span class="user-name">{{ authService.currentUser()?.name }}</span>
        <button (click)="logout()" class="btn-logout">Cerrar Sesión</button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .navbar-brand a {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      text-decoration: none;
    }

    .navbar-menu {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .navbar-menu a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background 0.3s;
    }

    .navbar-menu a:hover, .navbar-menu a.active {
      background: rgba(255, 255, 255, 0.2);
    }

    .navbar-user {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-name {
      font-weight: 500;
    }

    .btn-logout {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-logout:hover {
      background: white;
      color: #667eea;
    }
  `]
})
export class NavbarUserComponent {
  authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
