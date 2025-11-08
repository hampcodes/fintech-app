import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { RegisterRequest } from '@core/models/user.model';
import { AuthValidators } from '../validators/auth.validators';
import { CommonValidators } from '@core/validators/common-validators';
import { NATIONALITIES } from '@core/constants/nationalities';

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

          <!-- Stepper -->
          <div class="stepper">
            <div class="step" [class.active]="currentStep() >= 1" [class.completed]="currentStep() > 1">
              <div class="step-number">1</div>
              <div class="step-label">Cuenta</div>
            </div>
            <div class="step-line" [class.completed]="currentStep() > 1"></div>
            <div class="step" [class.active]="currentStep() >= 2" [class.completed]="currentStep() > 2">
              <div class="step-number">2</div>
              <div class="step-label">Datos Personales</div>
            </div>
            <div class="step-line" [class.completed]="currentStep() > 2"></div>
            <div class="step" [class.active]="currentStep() >= 3">
              <div class="step-number">3</div>
              <div class="step-label">Información Adicional</div>
            </div>
          </div>

          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">

          <!-- Paso 1: Datos de Cuenta -->
          @if (currentStep() === 1) {
            <div class="form-grid">
            <div class="form-group full-width">
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
                <small class="error-message">
                  @if (registerForm.get('password')?.errors?.['required']) {
                    La contraseña es requerida
                  } @else if (registerForm.get('password')?.errors?.['minlength']) {
                    La contraseña debe tener al menos 6 caracteres
                  } @else if (registerForm.get('password')?.errors?.['weakPassword']) {
                    La contraseña debe contener mayúsculas, minúsculas, números y mínimo 8 caracteres
                  }
                </small>
              }
            </div>
            </div>
          }

          <!-- Paso 2: Datos Personales -->
          @if (currentStep() === 2) {
            <div class="form-grid">
            <div class="form-group full-width">
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
              <label for="dni">DNI</label>
              <input
                id="dni"
                type="text"
                formControlName="dni"
                class="form-control"
                placeholder="12345678"
                [class.error-input]="registerForm.get('dni')?.invalid && registerForm.get('dni')?.touched">
              @if (registerForm.get('dni')?.invalid && registerForm.get('dni')?.touched) {
                <small class="error-message">
                  @if (registerForm.get('dni')?.errors?.['invalidDni']) {
                    El DNI debe tener 8 dígitos
                  }
                </small>
              }
            </div>

            <div class="form-group">
              <label for="phone">Teléfono</label>
              <input
                id="phone"
                type="tel"
                formControlName="phone"
                class="form-control"
                placeholder="999999999"
                [class.error-input]="registerForm.get('phone')?.invalid && registerForm.get('phone')?.touched">
              @if (registerForm.get('phone')?.invalid && registerForm.get('phone')?.touched) {
                <small class="error-message">
                  @if (registerForm.get('phone')?.errors?.['invalidPhone']) {
                    El teléfono debe tener 9 dígitos
                  }
                </small>
              }
            </div>

            <div class="form-group">
              <label for="dateOfBirth">Fecha de nacimiento</label>
              <input
                id="dateOfBirth"
                type="date"
                formControlName="dateOfBirth"
                class="form-control"
                [class.error-input]="registerForm.get('dateOfBirth')?.invalid && registerForm.get('dateOfBirth')?.touched">
              @if (registerForm.get('dateOfBirth')?.invalid && registerForm.get('dateOfBirth')?.touched) {
                <small class="error-message">
                  @if (registerForm.get('dateOfBirth')?.errors?.['minAge']) {
                    Debes ser mayor de 18 años
                  }
                </small>
              }
            </div>
            </div>
          }

          <!-- Paso 3: Información Adicional -->
          @if (currentStep() === 3) {
            <div class="form-grid">
            <div class="form-group full-width">
              <label for="nationality">Nacionalidad</label>
              <select
                id="nationality"
                formControlName="nationality"
                class="form-control">
                <option value="">Selecciona tu nacionalidad</option>
                @for (nationality of nationalities; track nationality) {
                  <option [value]="nationality">{{ nationality }}</option>
                }
              </select>
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
          }

          @if (errorMessage()) {
            <div class="alert alert-error">
              <span class="alert-icon">⚠️</span>
              <span>{{ errorMessage() }}</span>
            </div>
          }

          <!-- Botones de navegación -->
          <div class="step-buttons">
            @if (currentStep() > 1) {
              <button type="button" class="btn-secondary" (click)="previousStep()">
                ← Anterior
              </button>
            }

            @if (currentStep() < 3) {
              <button type="button" class="btn-primary" (click)="nextStep()">
                Siguiente →
              </button>
            }

            @if (currentStep() === 3) {
              <button type="submit" class="btn-primary" [disabled]="registerForm.invalid || loading()">
                @if (loading()) {
                  <span class="spinner"></span>
                  <span>Creando cuenta...</span>
                } @else {
                  <span>Crear cuenta</span>
                }
              </button>
            }
          </div>

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
    .register-container {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-xl) var(--spacing-md);
    }

    .register-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 1400px;
      width: 100%;
      gap: var(--spacing-3xl);
      align-items: center;
    }

    .register-image {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: var(--spacing-xl);
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
      background: var(--color-background-light);
      padding: 2.5rem var(--spacing-xl);
      border-radius: var(--border-radius-2xl);
      box-shadow: 0 20px 50px rgba(0, 168, 89, 0.25);
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
      border: 3px solid var(--color-secondary);
    }

    .badge-check {
      width: 60px;
      height: 60px;
      background: var(--gradient-success);
      color: var(--color-text-light);
      border-radius: var(--border-radius-round);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-3xl);
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
      padding: var(--spacing-xl);
      border-radius: var(--border-radius-xl);
      box-shadow: 0 10px 30px rgba(0, 61, 122, 0.15);
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
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

    .register-card {
      width: 100%;
      max-width: 750px;
      background: var(--color-background-light);
      border-radius: var(--border-radius-2xl);
      box-shadow: var(--shadow-xl);
      padding: var(--spacing-3xl) 2.5rem;
    }

    .register-header {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    /* Stepper Styles */
    .stepper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      padding: 0 1rem;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      flex: 0 0 auto;
    }

    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--color-gray-light);
      color: var(--color-text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-base);
      transition: all 0.3s ease;
    }

    .step.active .step-number {
      background: var(--color-secondary);
      color: var(--color-text-light);
      box-shadow: 0 4px 12px rgba(0, 168, 89, 0.3);
    }

    .step.completed .step-number {
      background: var(--color-success);
      color: var(--color-text-light);
    }

    .step-label {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      font-weight: var(--font-weight-medium);
      text-align: center;
    }

    .step.active .step-label {
      color: var(--color-secondary);
      font-weight: var(--font-weight-semibold);
    }

    .step.completed .step-label {
      color: var(--color-success);
    }

    .step-line {
      flex: 1;
      height: 2px;
      background: var(--color-border-light);
      margin: 0 0.5rem;
      position: relative;
      top: -15px;
    }

    .step-line.completed {
      background: var(--color-success);
    }

    .step-buttons {
      display: flex;
      gap: var(--spacing-md);
      margin-top: var(--spacing-lg);
    }

    .step-buttons .btn-secondary {
      flex: 1;
      background: var(--color-gray);
      color: var(--color-text-light);
      padding: var(--spacing-md);
      border: none;
      border-radius: var(--border-radius-lg);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-bold);
      cursor: pointer;
      transition: var(--transition-base);
    }

    .step-buttons .btn-secondary:hover {
      background: var(--color-gray-dark);
    }

    .step-buttons .btn-primary {
      flex: 1;
    }

    .logo-icon {
      font-size: var(--font-size-3xl);
      margin-bottom: var(--spacing-md);
    }

    .register-header h1 {
      font-size: 1.875rem;
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      margin: 0 0 var(--spacing-sm) 0;
    }

    .register-header p {
      color: var(--color-text-secondary);
      margin: 0;
      font-size: 0.95rem;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
      margin-bottom: var(--spacing-lg);
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
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
      font-size: 0.9rem;
    }

    .required {
      color: var(--color-danger);
    }

    .form-control {
      width: 100%;
      padding: 0.75rem var(--spacing-md);
      border: 2px solid var(--color-border-light);
      border-radius: var(--border-radius-lg);
      font-size: 0.95rem;
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
      margin-top: 0.4rem;
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

    .login-link {
      text-align: center;
      color: var(--color-text-secondary);
      margin: 0;
      font-size: 0.95rem;
    }

    .login-link a {
      color: var(--color-secondary);
      text-decoration: none;
      font-weight: var(--font-weight-semibold);
      transition: var(--transition-base);
    }

    .login-link a:hover {
      color: var(--color-secondary-light);
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
        padding: var(--spacing-xl) var(--spacing-lg);
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
  nationalities = NATIONALITIES;
  currentStep = signal(1);

  registerForm: FormGroup = this.fb.group({
    // Campos requeridos
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), AuthValidators.strongPassword()]],
    name: ['', [Validators.required, Validators.minLength(3), AuthValidators.fullName()]],
    // Campos opcionales con validaciones
    phone: ['', [CommonValidators.phone(9)]],
    dni: ['', [AuthValidators.peruvianDNI()]],
    address: [''],
    dateOfBirth: ['', [CommonValidators.minAge(18)]],
    nationality: [''],
    occupation: ['']
  });

  nextStep() {
    // Validar campos del paso actual antes de avanzar
    if (!this.validateCurrentStep()) {
      this.markStepFieldsAsTouched();
      return;
    }

    if (this.currentStep() < 3) {
      this.currentStep.set(this.currentStep() + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  validateCurrentStep(): boolean {
    const step = this.currentStep();

    if (step === 1) {
      // Paso 1: Validar email y password
      const email = this.registerForm.get('email');
      const password = this.registerForm.get('password');
      return (email?.valid ?? false) && (password?.valid ?? false);
    } else if (step === 2) {
      // Paso 2: Validar nombre (requerido)
      const name = this.registerForm.get('name');
      // Los demás campos son opcionales pero deben ser válidos si tienen valor
      const dni = this.registerForm.get('dni');
      const phone = this.registerForm.get('phone');
      const dateOfBirth = this.registerForm.get('dateOfBirth');

      return (name?.valid ?? false) &&
             (dni?.value === '' || (dni?.valid ?? true)) &&
             (phone?.value === '' || (phone?.valid ?? true)) &&
             (dateOfBirth?.value === '' || (dateOfBirth?.valid ?? true));
    }

    return true; // Paso 3 no tiene campos requeridos
  }

  markStepFieldsAsTouched() {
    const step = this.currentStep();

    if (step === 1) {
      this.registerForm.get('email')?.markAsTouched();
      this.registerForm.get('password')?.markAsTouched();
    } else if (step === 2) {
      this.registerForm.get('name')?.markAsTouched();
      this.registerForm.get('dni')?.markAsTouched();
      this.registerForm.get('phone')?.markAsTouched();
      this.registerForm.get('dateOfBirth')?.markAsTouched();
    }
  }

  previousStep() {
    if (this.currentStep() > 1) {
      this.currentStep.set(this.currentStep() - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

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

      this.authService.register(registerData).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.errorMessage.set('Error al registrar usuario. Por favor, verifica tus datos.');
          this.loading.set(false);
        }
      });
    }
  }
}
