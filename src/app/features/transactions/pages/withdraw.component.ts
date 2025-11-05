import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@core/services/account.service';
import { TransactionService } from '@core/services/transaction.service';
import { AccountResponse } from '@core/models/account.model';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="withdraw-container">
      <h2>Realizar Retiro</h2>
      <form [formGroup]="withdrawForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="accountId">Cuenta de origen:</label>
          <select
            id="accountId"
            formControlName="accountId"
            class="form-control"
            (change)="onAccountChange()">
            <option value="">Seleccionar cuenta</option>
            @for (account of accounts(); track account.id) {
              <option [value]="account.id">
                {{ account.accountNumber + ' - ' + (account.customerName || 'Cliente') + ' ($' + account.balance.toFixed(2) + ')' }}
              </option>
            }
          </select>
          @if (withdrawForm.get('accountId')?.invalid && withdrawForm.get('accountId')?.touched) {
            <small class="error">Cuenta requerida</small>
          }
        </div>

        @if (selectedAccount()) {
          <div class="balance-info">
            <span>Balance disponible:</span>
            <span class="amount">{{ '$' + selectedAccount()!.balance.toFixed(2) }}</span>
          </div>
        }

        <div class="form-group">
          <label for="amount">Monto a retirar:</label>
          <input
            id="amount"
            type="number"
            formControlName="amount"
            class="form-control"
            placeholder="0.00">
          @if (withdrawForm.get('amount')?.invalid && withdrawForm.get('amount')?.touched) {
            @if (withdrawForm.get('amount')?.errors?.['required']) {
              <small class="error">Monto requerido</small>
            } @else if (withdrawForm.get('amount')?.errors?.['min']) {
              <small class="error">Monto debe ser mayor a 0</small>
            } @else if (withdrawForm.get('amount')?.errors?.['insufficientFunds']) {
              <small class="error">Fondos insuficientes</small>
            }
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
          <button type="submit" [disabled]="withdrawForm.invalid || loading()" class="btn btn-warning">
            {{ loading() ? 'Procesando...' : 'Retirar' }}
          </button>
          <button type="button" (click)="cancel()" class="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .withdraw-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .balance-info {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 4px;
      margin-bottom: 1.5rem;
    }
    .balance-info .amount {
      font-size: 1.25rem;
      font-weight: bold;
      color: #28a745;
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
    .btn-warning {
      background: #ffc107;
      color: #000;
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
export class WithdrawComponent implements OnInit {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);
  private router = inject(Router);

  accounts = signal<AccountResponse[]>([]);
  selectedAccount = signal<AccountResponse | null>(null);
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  withdrawForm: FormGroup = this.fb.group({
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

  onAccountChange() {
    const accountId = this.withdrawForm.get('accountId')?.value;
    const account = this.accounts().find(a => a.id === accountId);
    this.selectedAccount.set(account || null);

    // Actualizar validadores del monto
    if (account) {
      this.withdrawForm.get('amount')?.setValidators([
        Validators.required,
        Validators.min(0.01),
        this.insufficientFundsValidator(account.balance)
      ]);
      this.withdrawForm.get('amount')?.updateValueAndValidity();
    }
  }

  insufficientFundsValidator(balance: number) {
    return (control: any) => {
      const amount = control.value;
      if (amount > balance) {
        return { insufficientFunds: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.withdrawForm.valid) {
      this.loading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      const { accountId, amount, description } = this.withdrawForm.value;

      this.transactionService.withdraw(accountId, amount, description).subscribe({
        next: () => {
          this.successMessage.set('Retiro realizado exitosamente');
          this.loading.set(false);
          setTimeout(() => {
            this.router.navigate(['/transactions']);
          }, 1500);
        },
        error: (error) => {
          this.errorMessage.set('Error al realizar el retiro');
          this.loading.set(false);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/transactions']);
  }
}
