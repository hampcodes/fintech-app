import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountService } from '@core/services/account.service';
import { AccountResponse } from '@core/models/account.model';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="account-list-container">
      <div class="header">
        <h2>Mis Cuentas</h2>
        <a routerLink="/accounts/create" class="btn btn-primary">+ Nueva Cuenta</a>
      </div>

      @if (loading()) {
        <p>Cargando cuentas...</p>
      } @else if (accounts().length === 0) {
        <div class="empty-state">
          <p>No tienes cuentas registradas</p>
          <a routerLink="/accounts/create" class="btn btn-secondary">Crear primera cuenta</a>
        </div>
      } @else {
        <div class="accounts-grid">
          @for (account of accounts(); track account.id) {
            <div class="account-card">
              <h3>{{ account.accountNumber }}</h3>
              <p class="customer-name">{{ account.customerName || 'Cliente' }}</p>
              <p class="balance">Balance: {{ '$' + account.balance.toFixed(2) }}</p>
              <a [routerLink]="['/accounts', account.id]" class="btn btn-link">Ver detalles</a>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .account-list-container {
      padding: 2rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 500;
      border: none;
      cursor: pointer;
    }
    .btn-primary {
      background: #007bff;
      color: white;
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    .btn-link {
      background: transparent;
      color: #007bff;
      padding: 0.5rem 1rem;
    }
    .empty-state {
      text-align: center;
      padding: 3rem;
    }
    .accounts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .account-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1.5rem;
      background: white;
    }
    .account-type {
      color: #6c757d;
      font-size: 0.875rem;
    }
    .balance {
      font-size: 1.5rem;
      font-weight: bold;
      color: #28a745;
      margin: 1rem 0;
    }
  `]
})
export class AccountListComponent implements OnInit {
  private accountService = inject(AccountService);

  accounts = signal<AccountResponse[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accounts.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
