import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NavbarUserComponent } from '../components/navbar-user.component';
import { NavbarAdminComponent } from '../components/navbar-admin.component';
import { FooterComponent } from '../components/footer.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarUserComponent, NavbarAdminComponent, FooterComponent],
  template: `
    <div class="auth-layout">
      @if (isAdmin()) {
        <app-navbar-admin />
      } @else {
        <app-navbar-user />
      }

      <main class="auth-main">
        <router-outlet />
      </main>

      <app-footer />
    </div>
  `,
  styles: [`
    .auth-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .auth-main {
      flex: 1;
      padding: 2rem;
      background: #f8f9fa;
    }
  `]
})
export class AuthLayoutComponent {
  private authService = inject(AuthService);

  isAdmin = computed(() => this.authService.currentUser()?.role === 'ROLE_ADMIN');
}
