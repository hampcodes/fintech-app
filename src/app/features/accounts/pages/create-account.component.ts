import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@core/services/account.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="create-account-container">
      <h2>Crear Nueva Cuenta</h2>
      <form [formGroup]="accountForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="accountNumber">Número de Cuenta:</label>
          <input
            id="accountNumber"
            type="text"
            formControlName="accountNumber"
            class="form-control"
            placeholder="Ingrese número de cuenta (10-20 dígitos)"
            maxlength="20">
          @if (accountForm.get('accountNumber')?.invalid && accountForm.get('accountNumber')?.touched) {
            <small class="error">Número de cuenta requerido (10-20 dígitos)</small>
          }
        </div>

        <div class="form-group">
          <label for="initialBalance">Balance Inicial:</label>
          <input
            id="initialBalance"
            type="number"
            formControlName="initialBalance"
            class="form-control"
            placeholder="0.00">
          @if (accountForm.get('initialBalance')?.invalid && accountForm.get('initialBalance')?.touched) {
            <small class="error">Balance debe ser mayor o igual a 0</small>
          }
        </div>

        @if (errorMessage()) {
          <div class="alert alert-error">{{ errorMessage() }}</div>
        }

        <div class="actions">
          <button type="submit" [disabled]="accountForm.invalid || loading()" class="btn btn-primary">
            {{ loading() ? 'Creando...' : 'Crear Cuenta' }}
          </button>
          <button type="button" (click)="cancel()" class="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .create-account-container {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .error {
      color: red;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }
    .alert-error {
      padding: 0.75rem;
      background: #f8d7da;
      color: #721c24;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
    .actions {
      display: flex;
      gap: 1rem;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-weight: 500;
    }
    .btn-primary {
      background: #007bff;
      color: white;
      flex: 1;
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class CreateAccountComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);

  loading = signal(false);
  errorMessage = signal('');

  accountForm: FormGroup = this.fb.group({
    accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,20}$/)]],
    initialBalance: [0, [Validators.required, Validators.min(0)]]
  });

  onSubmit() {
    if (this.accountForm.valid) {
      this.loading.set(true);
      this.errorMessage.set('');

      this.accountService.createAccount(this.accountForm.value).subscribe({
        next: () => {
          this.router.navigate(['/accounts']);
        },
        error: (error) => {
          this.errorMessage.set('Error al crear la cuenta');
          this.loading.set(false);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/accounts']);
  }
}
