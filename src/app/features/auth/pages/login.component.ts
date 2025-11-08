import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { LoginRequest } from '@core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-wrapper">
        <div class="login-image">
          <div class="image-content">
            <div class="floating-icon icon-1">🔐</div>
            <div class="floating-icon icon-2">💎</div>
            <div class="floating-icon icon-3">⚡</div>
            <div class="floating-icon icon-4">🏦</div>
            <div class="main-illustration">
              <div class="welcome-badge">
                <div class="badge-check">✓</div>
                <div class="badge-text">
                  <div class="badge-title">Bienvenido de vuelta</div>
                  <div class="badge-subtitle">Tu banca digital segura</div>
                </div>
              </div>
              <div class="features-list">
                <div class="feature-item">
                  <span class="feature-check">✓</span>
                  <span>Acceso 24/7</span>
                </div>
                <div class="feature-item">
                  <span class="feature-check">✓</span>
                  <span>Máxima seguridad</span>
                </div>
                <div class="feature-item">
                  <span class="feature-check">✓</span>
                  <span>Transacciones instantáneas</span>
                </div>
                <div class="feature-item">
                  <span class="feature-check">✓</span>
                  <span>Control en tiempo real</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="login-card">
          <div class="login-header">
            <div class="logo-icon">💎</div>
            <h1>Bienvenido</h1>
            <p>Ingresa a tu cuenta FinTechApp</p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="form-control"
              placeholder="tucorreo@ejemplo.com"
              [class.error-input]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
            @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
              <small class="error-message">
                @if (loginForm.get('email')?.errors?.['required']) {
                  El correo es requerido
                } @else if (loginForm.get('email')?.errors?.['email']) {
                  Ingresa un correo válido
                }
              </small>
            }
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              id="password"
              type="password"
              formControlName="password"
              class="form-control"
              placeholder="••••••••"
              [class.error-input]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
            @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
              <small class="error-message">La contraseña es requerida</small>
            }
          </div>

          @if (errorMessage()) {
            <div class="alert alert-error">
              <span class="alert-icon">⚠️</span>
              <span>{{ errorMessage() }}</span>
            </div>
          }

          <button type="submit" class="btn-primary" [disabled]="loginForm.invalid || loading()">
            @if (loading()) {
              <span class="spinner"></span>
              <span>Ingresando...</span>
            } @else {
              <span>Iniciar Sesión</span>
            }
          </button>

          <div class="divider">
            <span>o</span>
          </div>

          <p class="register-link">
            ¿No tienes cuenta? <a routerLink="/register">Créala gratis</a>
          </p>
        </form>
      </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-xl) var(--spacing-md);
    }

    .login-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 1400px;
      width: 100%;
      gap: var(--spacing-3xl);
      align-items: center;
    }

    .login-image {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: var(--spacing-xl);
    }

    .image-content {
      position: relative;
      width: 100%;
      max-width: 380px;
      height: 600px;
    }

    .floating-icon {
      position: absolute;
      font-size: 3.5rem;
      z-index: 2;
      opacity: 0.15;
    }

    .icon-1 {
      top: 5%;
      left: 10%;
    }

    .icon-2 {
      top: 10%;
      right: 5%;
    }

    .icon-3 {
      bottom: 20%;
      left: 5%;
    }

    .icon-4 {
      bottom: 10%;
      right: 15%;
    }

    .main-illustration {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      max-width: 100%;
      z-index: 1;
    }

    .welcome-badge {
      background: var(--color-background-light);
      padding: 2rem 1.5rem;
      border-radius: var(--border-radius-2xl);
      box-shadow: 0 20px 50px rgba(0, 168, 89, 0.25);
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-xl);
      border: 3px solid var(--color-secondary);
      width: 100%;
    }

    .badge-check {
      width: 50px;
      height: 50px;
      background: var(--gradient-success);
      color: var(--color-text-light);
      border-radius: var(--border-radius-round);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      flex-shrink: 0;
    }

    .badge-title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      margin-bottom: var(--spacing-xs);
    }

    .badge-subtitle {
      font-size: var(--font-size-base);
      color: var(--color-secondary);
      font-weight: var(--font-weight-semibold);
    }

    .features-list {
      background: var(--color-background-light);
      padding: 1.5rem;
      border-radius: var(--border-radius-xl);
      box-shadow: 0 10px 30px rgba(0, 61, 122, 0.15);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      font-size: 1.1rem;
      color: var(--color-text-primary);
      font-weight: var(--font-weight-medium);
    }

    .feature-check {
      width: 28px;
      height: 28px;
      background: var(--color-secondary);
      color: var(--color-text-light);
      border-radius: var(--border-radius-round);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: var(--font-weight-bold);
      flex-shrink: 0;
    }

    .login-card {
      width: 100%;
      max-width: 550px;
      background: var(--color-background-light);
      border-radius: var(--border-radius-2xl);
      box-shadow: var(--shadow-xl);
      padding: var(--spacing-3xl) 2.5rem;
    }

    .login-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .logo-icon {
      font-size: 3.5rem;
      margin-bottom: var(--spacing-md);
    }

    .login-header h1 {
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .login-header p {
      color: var(--color-text-secondary);
      margin: 0;
      font-size: var(--font-size-base);
    }

    .form-group {
      margin-bottom: var(--spacing-lg);
    }

    label {
      display: block;
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
      font-size: 0.95rem;
    }

    .form-control {
      width: 100%;
      padding: 0.875rem var(--spacing-md);
      border: 2px solid var(--color-border-light);
      border-radius: var(--border-radius-lg);
      font-size: var(--font-size-base);
      transition: var(--transition-base);
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: var(--color-secondary);
      box-shadow: 0 0 0 3px rgba(0, 168, 89, 0.1);
    }

    .form-control::placeholder {
      color: var(--color-text-muted);
    }

    .error-input {
      border-color: var(--color-danger);
    }

    .error-input:focus {
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }

    .error-message {
      display: block;
      color: var(--color-danger);
      font-size: var(--font-size-sm);
      margin-top: var(--spacing-sm);
      font-weight: var(--font-weight-medium);
    }

    .alert {
      padding: var(--spacing-md);
      border-radius: var(--border-radius-lg);
      margin-bottom: var(--spacing-lg);
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .alert-error {
      background: var(--color-danger-light);
      color: var(--color-danger);
      border: 1px solid #fcc;
    }

    .alert-icon {
      font-size: 1.2rem;
    }

    .btn-primary {
      width: 100%;
      padding: var(--spacing-md);
      background: var(--color-secondary);
      color: var(--color-text-light);
      border: none;
      border-radius: var(--border-radius-lg);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-bold);
      cursor: pointer;
      transition: var(--transition-base);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
    }

    .btn-primary:hover:not(:disabled) {
      background: var(--color-secondary-light);
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 168, 89, 0.3);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid var(--color-text-light);
      border-top-color: transparent;
      border-radius: var(--border-radius-round);
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .divider {
      text-align: center;
      margin: var(--spacing-xl) 0;
      position: relative;
    }

    .divider::before,
    .divider::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 45%;
      height: 1px;
      background: var(--color-border-light);
    }

    .divider::before {
      left: 0;
    }

    .divider::after {
      right: 0;
    }

    .divider span {
      background: var(--color-background-light);
      padding: 0 var(--spacing-md);
      color: var(--color-text-secondary);
      font-size: 0.9rem;
    }

    .register-link {
      text-align: center;
      color: var(--color-text-secondary);
      margin: 0;
      font-size: 0.95rem;
    }

    .register-link a {
      color: var(--color-secondary);
      text-decoration: none;
      font-weight: var(--font-weight-semibold);
      transition: var(--transition-base);
    }

    .register-link a:hover {
      color: var(--color-secondary-light);
      text-decoration: underline;
    }

    @media (max-width: 992px) {
      .login-wrapper {
        grid-template-columns: 1fr;
      }

      .login-image {
        display: none;
      }

      .login-card {
        max-width: 500px;
        margin: 0 auto;
      }
    }

    @media (max-width: 576px) {
      .login-card {
        padding: var(--spacing-xl) var(--spacing-lg);
      }

      .login-header h1 {
        font-size: 1.75rem;
      }
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  errorMessage = signal('');

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.errorMessage.set('');

      const credentials: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage.set('Credenciales incorrectas. Por favor, verifica tus datos.');
          this.loading.set(false);
        }
      });
    }
  }
}
