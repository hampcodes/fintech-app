import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TransactionService } from '@core/services/transaction.service';
import { TransactionResponse } from '@core/models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="transaction-list-container">
      <div class="header">
        <h2>Historial de Transacciones</h2>
        <div class="actions">
          <a routerLink="/transactions/deposit" class="btn btn-success">+ Depositar</a>
          <a routerLink="/transactions/withdraw" class="btn btn-warning">- Retirar</a>
        </div>
      </div>

      @if (loading()) {
        <p>Cargando transacciones...</p>
      } @else if (transactions().length === 0) {
        <div class="empty-state">
          <p>No hay transacciones registradas</p>
        </div>
      } @else {
        <div class="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Cuenta</th>
                <th>Monto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (tx of transactions(); track tx.id) {
                <tr>
                  <td>{{ tx.timestamp | date:'short' }}</td>
                  <td class="tx-type">{{ tx.type }}</td>
                  <td>{{ tx.accountNumber }}</td>
                  <td [class.positive]="tx.type === 'DEPOSIT'" [class.negative]="tx.type === 'WITHDRAW'">
                    {{ (tx.type === 'DEPOSIT' ? '+' : '-') + '$' + tx.amount.toFixed(2) }}
                  </td>
                  <td>
                    <a [routerLink]="['/transactions', tx.id]" class="btn-link">Ver</a>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  `,
  styles: [`
    .transaction-list-container {
      padding: 2rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .actions {
      display: flex;
      gap: 1rem;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 500;
      border: none;
      cursor: pointer;
    }
    .btn-success {
      background: #28a745;
      color: white;
    }
    .btn-warning {
      background: #ffc107;
      color: #000;
    }
    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #6c757d;
    }
    .transactions-table {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      background: #f8f9fa;
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid #dee2e6;
    }
    td {
      padding: 1rem;
      border-bottom: 1px solid #dee2e6;
    }
    tr:last-child td {
      border-bottom: none;
    }
    .tx-type {
      text-transform: capitalize;
    }
    .positive {
      color: #28a745;
      font-weight: bold;
    }
    .negative {
      color: #dc3545;
      font-weight: bold;
    }
    .btn-link {
      color: #007bff;
      text-decoration: none;
    }
  `]
})
export class TransactionListComponent implements OnInit {
  private transactionService = inject(TransactionService);

  transactions = signal<TransactionResponse[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.transactionService.getAllTransactions().subscribe({
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
