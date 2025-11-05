import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <a routerLink="/admin">FinTech Admin</a>
      </div>

      <ul class="navbar-menu">
        <li><a routerLink="/admin/dashboard" routerLinkActive="active">Dashboard</a></li>
        <li><a routerLink="/admin/users" routerLinkActive="active">Usuarios</a></li>
        <li><a routerLink="/admin/accounts" routerLinkActive="active">Cuentas</a></li>
        <li><a routerLink="/admin/transactions" routerLinkActive="active">Transacciones</a></li>
        <li><a routerLink="/admin/settings" routerLinkActive="active">Configuración</a></li>
      </ul>

      <div class="navbar-user">
        <span class="admin-badge">ADMIN</span>
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
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
      gap: 1.5rem;
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

    .admin-badge {
      background: rgba(255, 255, 255, 0.3);
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: bold;
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
      color: #f5576c;
    }
  `]
})
export class NavbarAdminComponent {
  authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
