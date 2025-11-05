import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountService } from '@core/services/account.service';
import { TransactionService } from '@core/services/transaction.service';
import { AccountResponse } from '@core/models/account.model';
import { TransactionResponse } from '@core/models/transaction.model';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="account-detail-container">
      @if (loading()) {
        <p>Cargando detalles...</p>
      } @else if (account()) {
        <div class="account-header">
          <div>
            <h2>Cuenta {{ account()!.accountNumber }}</h2>
            <p class="customer-name">{{ account()!.customerName || 'Cliente' }}</p>
          </div>
          <div class="balance">
            <span class="label">Balance:</span>
            <span class="amount">{{ '$' + account()!.balance.toFixed(2) }}</span>
          </div>
        </div>

        <div class="actions">
          <a routerLink="/transactions/deposit" class="btn btn-success">Depositar</a>
          <a routerLink="/transactions/withdraw" class="btn btn-warning">Retirar</a>
          <a routerLink="/accounts" class="btn btn-secondary">Volver</a>
        </div>

        <div class="transactions-section">
          <h3>Transacciones Recientes</h3>
          @if (transactions().length === 0) {
            <p class="empty">No hay transacciones registradas</p>
          } @else {
            <div class="transactions-list">
              @for (tx of transactions(); track tx.id) {
                <div class="transaction-item">
                  <div class="tx-info">
                    <span class="tx-type">{{ tx.type }}</span>
                    <span class="tx-date">{{ tx.timestamp | date:'short' }}</span>
                  </div>
                  <span class="tx-amount" [class.positive]="tx.type === 'DEPOSIT'" [class.negative]="tx.type === 'WITHDRAW'">
                    {{ (tx.type === 'DEPOSIT' ? '+' : '-') + '$' + tx.amount.toFixed(2) }}
                  </span>
                </div>
              }
            </div>
          }
        </div>
      } @else {
        <p>Cuenta no encontrada</p>
      }
    </div>
  `,
  styles: [`
    .account-detail-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .account-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      margin-bottom: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .account-type {
      color: #6c757d;
      text-transform: uppercase;
      font-size: 0.875rem;
    }
    .balance {
      text-align: right;
    }
    .balance .label {
      display: block;
      color: #6c757d;
      font-size: 0.875rem;
    }
    .balance .amount {
      font-size: 2rem;
      font-weight: bold;
      color: #28a745;
    }
    .actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 500;
      color: white;
    }
    .btn-success {
      background: #28a745;
    }
    .btn-warning {
      background: #ffc107;
      color: #000;
    }
    .btn-secondary {
      background: #6c757d;
    }
    .transactions-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .transactions-list {
      margin-top: 1rem;
    }
    .transaction-item {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }
    .transaction-item:last-child {
      border-bottom: none;
    }
    .tx-info {
      display: flex;
      flex-direction: column;
    }
    .tx-type {
      font-weight: 500;
      text-transform: capitalize;
    }
    .tx-date {
      font-size: 0.875rem;
      color: #6c757d;
    }
    .tx-amount {
      font-size: 1.25rem;
      font-weight: bold;
    }
    .tx-amount.positive {
      color: #28a745;
    }
    .tx-amount.negative {
      color: #dc3545;
    }
    .empty {
      text-align: center;
      color: #6c757d;
      padding: 2rem;
    }
  `]
})
export class AccountDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);

  account = signal<AccountResponse | null>(null);
  transactions = signal<TransactionResponse[]>([]);
  loading = signal(true);

  ngOnInit() {
    const accountId = this.route.snapshot.paramMap.get('id');

    if (accountId) {
      this.accountService.getAccountById(accountId).subscribe({
        next: (data) => {
          this.account.set(data);
          this.loadTransactions(accountId);
        },
        error: () => {
          this.loading.set(false);
        }
      });
    }
  }

  private loadTransactions(accountId: string) {
    this.transactionService.getTransactionsByAccount(accountId).subscribe({
      next: (data) => {
        this.transactions.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
