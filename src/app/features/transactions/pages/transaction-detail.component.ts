import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TransactionService } from '@core/services/transaction.service';
import { TransactionResponse } from '@core/models/transaction.model';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="transaction-detail-container">
      @if (loading()) {
        <p>Cargando detalles...</p>
      } @else if (transaction()) {
        <div class="detail-card">
          <h2>Detalle de Transacción</h2>

          <div class="detail-row">
            <span class="label">ID de Transacción:</span>
            <span class="value">{{ transaction()!.id }}</span>
          </div>

          <div class="detail-row">
            <span class="label">Tipo:</span>
            <span class="value tx-type" [class.deposit]="transaction()!.type === 'DEPOSIT'" [class.withdrawal]="transaction()!.type === 'WITHDRAW'">
              {{ transaction()!.type === 'DEPOSIT' ? 'Depósito' : 'Retiro' }}
            </span>
          </div>

          <div class="detail-row">
            <span class="label">Monto:</span>
            <span class="value amount" [class.positive]="transaction()!.type === 'DEPOSIT'" [class.negative]="transaction()!.type === 'WITHDRAW'">
              {{ (transaction()!.type === 'DEPOSIT' ? '+' : '-') + '$' + transaction()!.amount.toFixed(2) }}
            </span>
          </div>

          <div class="detail-row">
            <span class="label">Cuenta:</span>
            <span class="value">{{ transaction()!.accountNumber }}</span>
          </div>

          <div class="detail-row">
            <span class="label">Fecha:</span>
            <span class="value">{{ transaction()!.timestamp | date:'full' }}</span>
          </div>

          @if (transaction()!.description) {
            <div class="detail-row">
              <span class="label">Descripción:</span>
              <span class="value">{{ transaction()!.description }}</span>
            </div>
          }

          <div class="actions">
            <a routerLink="/transactions" class="btn btn-secondary">Volver al historial</a>
            <a [routerLink]="['/accounts', transaction()!.accountNumber]" class="btn btn-primary">Ver cuenta</a>
          </div>
        </div>
      } @else {
        <div class="not-found">
          <p>Transacción no encontrada</p>
          <a routerLink="/transactions" class="btn btn-secondary">Volver</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .transaction-detail-container {
      max-width: 700px;
      margin: 2rem auto;
      padding: 2rem;
    }
    .detail-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #f8f9fa;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 1rem 0;
      border-bottom: 1px solid #f8f9fa;
    }
    .detail-row:last-of-type {
      border-bottom: none;
      margin-bottom: 2rem;
    }
    .label {
      font-weight: 600;
      color: #6c757d;
    }
    .value {
      text-align: right;
    }
    .tx-type {
      text-transform: capitalize;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-weight: 500;
    }
    .tx-type.deposit {
      background: #d4edda;
      color: #155724;
    }
    .tx-type.withdrawal {
      background: #f8d7da;
      color: #721c24;
    }
    .amount {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .amount.positive {
      color: #28a745;
    }
    .amount.negative {
      color: #dc3545;
    }
    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 500;
      color: white;
    }
    .btn-primary {
      background: #007bff;
    }
    .btn-secondary {
      background: #6c757d;
    }
    .not-found {
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 8px;
    }
  `]
})
export class TransactionDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private transactionService = inject(TransactionService);

  transaction = signal<TransactionResponse | null>(null);
  loading = signal(true);

  ngOnInit() {
    const transactionId = this.route.snapshot.paramMap.get('id');

    if (transactionId) {
      this.transactionService.getTransactionById(transactionId).subscribe({
        next: (data) => {
          this.transaction.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        }
      });
    }
  }
}
