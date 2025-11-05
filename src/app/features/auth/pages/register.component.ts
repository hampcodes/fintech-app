import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { RegisterRequest } from '@core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="register-container">
      <div class="register-wrapper">
        <div class="register-image">
          <div class="image-content">
            <div class="floating-icon icon-1">🎯</div>
            <div class="floating-icon icon-2">🔒</div>
            <div class="floating-icon icon-3">💰</div>
            <div class="floating-icon icon-4">📈</div>
            <div class="main-illustration">
              <div class="success-badge">
                <div class="badge-check">✓</div>
                <div class="badge-text">
                  <div class="badge-title">Cuenta creada</div>
                  <div class="badge-subtitle">¡Bienvenido a FinTech!</div>
                </div>
              </div>
              <div class="features-list">
                <div class="feature-item">
                  <span class="feature-check">✓</span>
                  <span>Sin comisiones</span>
                </div>
                <div class="feature-item">
                  <span class="feature-check">✓</span>
                  <span>100% seguro</span>
                </div>
                <div class="feature-item">
                  <span class="feature-check">✓</span>
                  <span>Transferencias gratis</span>
                </div>
                <div class="feature-item">
                  <span class="feature-check">✓</span>
                  <span>Soporte 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="register-card">
          <div class="register-header">
            <div class="logo-icon">💎</div>
            <h1>Crea tu cuenta</h1>
            <p>Únete a FinTechApp y empieza a gestionar tus finanzas</p>
          </div>

          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <!-- Campos requeridos -->
            <div class="form-group">
              <label for="name">Nombre completo <span class="required">*</span></label>
              <input
                id="name"
                type="text"
                formControlName="name"
                class="form-control"
                placeholder="Juan Pérez"
                [class.error-input]="registerForm.get('name')?.invalid && registerForm.get('name')?.touched">
              @if (registerForm.get('name')?.invalid && registerForm.get('name')?.touched) {
                <small class="error-message">El nombre completo es requerido</small>
              }
            </div>

            <div class="form-group">
              <label for="email">Correo electrónico <span class="required">*</span></label>
              <input
                id="email"
                type="email"
                formControlName="email"
                class="form-control"
                placeholder="tucorreo@ejemplo.com"
                [class.error-input]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
              @if (registerForm.get('email')?.invalid && registerForm.get('email')?.touched) {
                <small class="error-message">
                  @if (registerForm.get('email')?.errors?.['required']) {
                    El correo es requerido
                  } @else if (registerForm.get('email')?.errors?.['email']) {
                    Ingresa un correo válido
                  }
                </small>
              }
            </div>

            <div class="form-group full-width">
              <label for="password">Contraseña <span class="required">*</span></label>
              <input
                id="password"
                type="password"
                formControlName="password"
                class="form-control"
                placeholder="Mínimo 6 caracteres"
                [class.error-input]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
              @if (registerForm.get('password')?.invalid && registerForm.get('password')?.touched) {
                <small class="error-message">La contraseña debe tener mínimo 6 caracteres</small>
              }
            </div>

            <!-- Campos opcionales -->
            <div class="form-group">
              <label for="dni">DNI</label>
              <input
                id="dni"
                type="text"
                formControlName="dni"
                class="form-control"
                placeholder="12345678">
            </div>

            <div class="form-group">
              <label for="phone">Teléfono</label>
              <input
                id="phone"
                type="tel"
                formControlName="phone"
                class="form-control"
                placeholder="+51 999 999 999">
            </div>

            <div class="form-group">
              <label for="dateOfBirth">Fecha de nacimiento</label>
              <input
                id="dateOfBirth"
                type="date"
                formControlName="dateOfBirth"
                class="form-control">
            </div>

            <div class="form-group">
              <label for="nationality">Nacionalidad</label>
              <input
                id="nationality"
                type="text"
                formControlName="nationality"
                class="form-control"
                placeholder="Peruana">
            </div>

            <div class="form-group full-width">
              <label for="address">Dirección</label>
              <input
                id="address"
                type="text"
                formControlName="address"
                class="form-control"
                placeholder="Calle, número, distrito, ciudad">
            </div>

            <div class="form-group full-width">
              <label for="occupation">Ocupación</label>
              <input
                id="occupation"
                type="text"
                formControlName="occupation"
                class="form-control"
                placeholder="Ingeniero, Contador, Estudiante, etc.">
            </div>
          </div>

          @if (errorMessage()) {
            <div class="alert alert-error">
              <span class="alert-icon">⚠️</span>
              <span>{{ errorMessage() }}</span>
            </div>
          }

          <button type="submit" class="btn-primary" [disabled]="registerForm.invalid || loading()">
            @if (loading()) {
              <span class="spinner"></span>
              <span>Creando cuenta...</span>
            } @else {
              <span>Crear cuenta</span>
            }
          </button>

          <div class="divider">
            <span>o</span>
          </div>

          <p class="login-link">
            ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión</a>
          </p>
        </form>
      </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      --color-primary: #003D7A;
      --color-secondary: #00A859;
      --color-light: #F5F5F5;
      --color-white: #FFFFFF;
      --color-error: #dc3545;
      --color-text: #333333;
      --color-text-light: #666666;
    }

    .register-container {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }

    .register-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 1400px;
      width: 100%;
      gap: 3rem;
      align-items: center;
    }

    .register-image {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 2rem;
    }

    .image-content {
      position: relative;
      width: 100%;
      max-width: 500px;
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
      max-width: 400px;
      z-index: 1;
    }

    .success-badge {
      background: white;
      padding: 2.5rem 2rem;
      border-radius: 20px;
      box-shadow: 0 20px 50px rgba(0, 168, 89, 0.25);
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 2rem;
      border: 3px solid var(--color-secondary);
    }

    .badge-check {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, var(--color-secondary) 0%, #00c96d 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .badge-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-primary);
      margin-bottom: 0.25rem;
    }

    .badge-subtitle {
      font-size: 1rem;
      color: var(--color-secondary);
      font-weight: 600;
    }

    .features-list {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 61, 122, 0.15);
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.1rem;
      color: var(--color-text);
      font-weight: 500;
    }

    .feature-check {
      width: 28px;
      height: 28px;
      background: var(--color-secondary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
    }

    .register-card {
      width: 100%;
      max-width: 750px;
      background: var(--color-white);
      border-radius: 20px;
      box-shadow: 0 15px 50px rgba(0, 61, 122, 0.15);
      padding: 3rem 2.5rem;
    }

    .register-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .logo-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .register-header h1 {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--color-primary);
      margin: 0 0 0.5rem 0;
    }

    .register-header p {
      color: var(--color-text-light);
      margin: 0;
      font-size: 0.95rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    label {
      display: block;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .required {
      color: var(--color-error);
    }

    .form-control {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: var(--color-secondary);
      box-shadow: 0 0 0 3px rgba(0, 168, 89, 0.1);
    }

    .form-control::placeholder {
      color: #aaa;
    }

    .error-input {
      border-color: var(--color-error);
    }

    .error-input:focus {
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }

    .error-message {
      display: block;
      color: var(--color-error);
      font-size: 0.8rem;
      margin-top: 0.4rem;
      font-weight: 500;
    }

    .alert {
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .alert-error {
      background: #fee;
      color: var(--color-error);
      border: 1px solid #fcc;
    }

    .alert-icon {
      font-size: 1.2rem;
    }

    .btn-primary {
      width: 100%;
      padding: 1rem;
      background: var(--color-secondary);
      color: var(--color-white);
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn-primary:hover:not(:disabled) {
      background: #00c96d;
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
      border: 2px solid var(--color-white);
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .divider {
      text-align: center;
      margin: 2rem 0;
      position: relative;
    }

    .divider::before,
    .divider::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 45%;
      height: 1px;
      background: #e0e0e0;
    }

    .divider::before {
      left: 0;
    }

    .divider::after {
      right: 0;
    }

    .divider span {
      background: var(--color-white);
      padding: 0 1rem;
      color: var(--color-text-light);
      font-size: 0.9rem;
    }

    .login-link {
      text-align: center;
      color: var(--color-text-light);
      margin: 0;
      font-size: 0.95rem;
    }

    .login-link a {
      color: var(--color-secondary);
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .login-link a:hover {
      color: #00c96d;
      text-decoration: underline;
    }

    @media (max-width: 992px) {
      .register-wrapper {
        grid-template-columns: 1fr;
      }

      .register-image {
        display: none;
      }

      .register-card {
        max-width: 750px;
        margin: 0 auto;
      }
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }

      .register-card {
        padding: 2rem 1.5rem;
      }

      .register-header h1 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  errorMessage = signal('');

  registerForm: FormGroup = this.fb.group({
    // Campos requeridos
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', Validators.required],
    // Campos opcionales
    phone: [''],
    dni: [''],
    address: [''],
    dateOfBirth: [''],
    nationality: [''],
    occupation: ['']
  });

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading.set(true);
      this.errorMessage.set('');

      // Construir RegisterRequest con todos los campos
      const formData = this.registerForm.value;
      const registerData: RegisterRequest = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone || undefined,
        dni: formData.dni || undefined,
        address: formData.address || undefined,
        dateOfBirth: formData.dateOfBirth || undefined,
        nationality: formData.nationality || undefined,
        occupation: formData.occupation || undefined
      };

      this.authService.registerWithData(registerData).subscribe({
        next: () => {
          this.router.navigate(['/accounts']);
        },
        error: (error) => {
          this.errorMessage.set('Error al registrar usuario. Por favor, verifica tus datos.');
          this.loading.set(false);
        }
      });
    }
  }
}
