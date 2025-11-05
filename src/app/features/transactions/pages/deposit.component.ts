import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@core/services/account.service';
import { TransactionService } from '@core/services/transaction.service';
import { AccountResponse } from '@core/models/account.model';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="deposit-container">
      <h2>Realizar Depósito</h2>
      <form [formGroup]="depositForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="accountId">Cuenta destino:</label>
          <select
            id="accountId"
            formControlName="accountId"
            class="form-control">
            <option value="">Seleccionar cuenta</option>
            @for (account of accounts(); track account.id) {
              <option [value]="account.id">
                {{ account.accountNumber + ' - ' + (account.customerName || 'Cliente') + ' ($' + account.balance.toFixed(2) + ')' }}
              </option>
            }
          </select>
          @if (depositForm.get('accountId')?.invalid && depositForm.get('accountId')?.touched) {
            <small class="error">Cuenta requerida</small>
          }
        </div>

        <div class="form-group">
          <label for="amount">Monto a depositar:</label>
          <input
            id="amount"
            type="number"
            formControlName="amount"
            class="form-control"
            placeholder="0.00">
          @if (depositForm.get('amount')?.invalid && depositForm.get('amount')?.touched) {
            <small class="error">Monto debe ser mayor a 0</small>
          }
        </div>

        <div class="form-group">
          <label for="description">Descripción (opcional):</label>
          <textarea
            id="description"
            formControlName="description"
            class="form-control"
            rows="3"
            placeholder="Descripción de la transacción"></textarea>
        </div>

        @if (errorMessage()) {
          <div class="alert alert-error">{{ errorMessage() }}</div>
        }

        @if (successMessage()) {
          <div class="alert alert-success">{{ successMessage() }}</div>
        }

        <div class="actions">
          <button type="submit" [disabled]="depositForm.invalid || loading()" class="btn btn-success">
            {{ loading() ? 'Procesando...' : 'Depositar' }}
          </button>
          <button type="button" (click)="cancel()" class="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .deposit-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
    textarea.form-control {
      resize: vertical;
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
    .alert-success {
      padding: 0.75rem;
      background: #d4edda;
      color: #155724;
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
    .btn-success {
      background: #28a745;
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
export class DepositComponent implements OnInit {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);
  private router = inject(Router);

  accounts = signal<AccountResponse[]>([]);
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  depositForm: FormGroup = this.fb.group({
    accountId: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    description: ['']
  });

  ngOnInit() {
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accounts.set(data);
      }
    });
  }

  onSubmit() {
    if (this.depositForm.valid) {
      this.loading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      const { accountId, amount, description } = this.depositForm.value;

      this.transactionService.deposit(accountId, amount, description).subscribe({
        next: () => {
          this.successMessage.set('Depósito realizado exitosamente');
          this.loading.set(false);
          setTimeout(() => {
            this.router.navigate(['/transactions']);
          }, 1500);
        },
        error: (error) => {
          this.errorMessage.set('Error al realizar el depósito');
          this.loading.set(false);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/transactions']);
  }
}
