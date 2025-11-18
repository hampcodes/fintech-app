import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '@core/services/account.service';
import { TransactionService } from '@core/services/transaction.service';
import { AuthService } from '@core/services/auth.service';
import { AccountResponse } from '@core/models/account.model';
import { TransactionResponse } from '@core/models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <div class="welcome-section">
        <div>
          <h1>{{ isAdmin() ? 'Panel de Administración' : 'Bienvenido' }}</h1>
          <p class="subtitle">{{ currentUserName() }}</p>
        </div>
        <a routerLink="/dashboard" class="btn-home">🏠 Inicio</a>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon accounts">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
          </div>
          <div class="stat-info">
            <h3>Cuentas Totales</h3>
            <p class="stat-number">{{ accounts().length }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon balance">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div class="stat-info">
            <h3>Balance Total</h3>
            <p class="stat-number">\${{ totalBalance().toFixed(2) }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon transactions">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div class="stat-info">
            <h3>Transacciones</h3>
            <p class="stat-number">{{ transactions().length }}</p>
          </div>
        </div>
      </div>

      <div class="content-grid">
        <!-- Recent Accounts -->
        <div class="card">
          <div class="card-header">
            <h2>Cuentas Recientes</h2>
            <a routerLink="/accounts" class="link">Ver todas →</a>
          </div>
          <div class="card-content">
            @if (accounts().length === 0) {
              <p class="empty-state">No hay cuentas registradas</p>
            } @else {
              <div class="list">
                @for (account of recentAccounts(); track account.id) {
                  <div class="list-item" (click)="navigateToAccount(account.id)">
                    <div class="item-info">
                      <strong>{{ account.accountNumber }}</strong>
                      <span class="text-muted">{{ account.customerName || 'Cliente' }}</span>
                    </div>
                    <div class="item-amount">\${{ account.balance.toFixed(2) }}</div>
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="card">
          <div class="card-header">
            <h2>Transacciones Recientes</h2>
            <a routerLink="/transactions" class="link">Ver todas →</a>
          </div>
          <div class="card-content">
            @if (transactions().length === 0) {
              <p class="empty-state">No hay transacciones registradas</p>
            } @else {
              <div class="list">
                @for (transaction of recentTransactions(); track transaction.id) {
                  <div class="list-item" (click)="navigateToTransaction(transaction.id)">
                    <div class="item-info">
                      <strong>{{ transaction.type === 'DEPOSIT' ? 'Depósito' : 'Retiro' }}</strong>
                      <span class="text-muted">{{ transaction.accountNumber }}</span>
                    </div>
                    <div class="item-amount" [class.positive]="transaction.type === 'DEPOSIT'" [class.negative]="transaction.type === 'WITHDRAW'">
                      {{ transaction.type === 'DEPOSIT' ? '+' : '-' }}\${{ transaction.amount.toFixed(2) }}
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="actions-card">
        <h2>Acciones Rápidas</h2>
        @if (isAdmin()) {
          <div class="action-buttons">
            <button class="action-btn admin" routerLink="/shop/admin/categories">
              📂 Gestionar Categorías
            </button>
            <button class="action-btn admin" routerLink="/shop/admin/products">
              📦 Gestionar Productos
            </button>
            <button class="action-btn primary" routerLink="/accounts/create">
              ➕ Nueva Cuenta
            </button>
            <button class="action-btn info" routerLink="/reports">
              📊 Ver Reportes
            </button>
          </div>
        } @else {
          <div class="action-buttons">
            <button class="action-btn primary" routerLink="/shop/catalog">
              🛒 Ir al Catálogo
            </button>
            <button class="action-btn success" routerLink="/transactions/deposit">
              💰 Realizar Depósito
            </button>
            <button class="action-btn warning" routerLink="/transactions/withdraw">
              💸 Realizar Retiro
            </button>
            <button class="action-btn info" routerLink="/accounts">
              💳 Ver Mis Cuentas
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: var(--spacing-xl);
      max-width: 1400px;
      margin: 0 auto;
    }

    .welcome-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xl);
    }

    .welcome-section h1 {
      margin: 0;
      color: var(--color-text-primary);
    }

    .subtitle {
      color: var(--color-text-secondary);
      margin: var(--spacing-xs) 0 0 0;
      font-size: var(--font-size-lg);
    }

    .btn-home {
      padding: var(--spacing-sm) var(--spacing-lg);
      background: var(--color-primary);
      color: var(--color-text-light);
      text-decoration: none;
      border-radius: var(--border-radius-md);
      font-weight: var(--font-weight-medium);
      transition: var(--transition-base);
    }

    .btn-home:hover {
      background: var(--color-primary-dark);
      transform: translateY(-2px);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
    }

    .stat-card {
      background: var(--color-background-light);
      padding: var(--spacing-lg);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-sm);
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: var(--border-radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon.accounts {
      background: var(--gradient-primary);
      color: var(--color-text-light);
    }

    .stat-icon.balance {
      background: var(--gradient-pink);
      color: var(--color-text-light);
    }

    .stat-icon.transactions {
      background: var(--gradient-blue);
      color: var(--color-text-light);
    }

    .stat-info h3 {
      margin: 0;
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      font-weight: var(--font-weight-medium);
    }

    .stat-number {
      margin: var(--spacing-xs) 0 0 0;
      font-size: 1.75rem;
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
    }

    .card {
      background: var(--color-background-light);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
    }

    .card-header {
      padding: var(--spacing-lg);
      border-bottom: 1px solid var(--color-border-light);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-header h2 {
      margin: 0;
      font-size: var(--font-size-xl);
      color: var(--color-text-primary);
    }

    .link {
      color: var(--color-purple);
      text-decoration: none;
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
    }

    .link:hover {
      text-decoration: underline;
    }

    .card-content {
      padding: var(--spacing-md);
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .list-item {
      padding: var(--spacing-md);
      background: var(--color-background);
      border-radius: var(--border-radius-sm);
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: var(--transition-base);
    }

    .list-item:hover {
      background: var(--color-background-dark);
    }

    .item-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    .text-muted {
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
    }

    .item-amount {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
    }

    .item-amount.positive {
      color: var(--color-success);
    }

    .item-amount.negative {
      color: var(--color-danger);
    }

    .empty-state {
      text-align: center;
      color: var(--color-text-muted);
      padding: var(--spacing-xl);
    }

    .actions-card {
      background: var(--color-background-light);
      padding: var(--spacing-lg);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-sm);
    }

    .actions-card h2 {
      margin: 0 0 var(--spacing-lg) 0;
      font-size: var(--font-size-xl);
      color: var(--color-text-primary);
    }

    .action-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-md);
    }

    .action-btn {
      padding: var(--spacing-md) var(--spacing-lg);
      border: none;
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      justify-content: center;
      transition: var(--transition-base);
    }

    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .action-btn.primary {
      background: var(--color-purple);
      color: var(--color-text-light);
    }

    .action-btn.success {
      background: var(--color-success);
      color: var(--color-text-light);
    }

    .action-btn.warning {
      background: var(--color-warning);
      color: var(--color-text-primary);
    }

    .action-btn.info {
      background: var(--color-info);
      color: var(--color-text-light);
    }

    .action-btn.admin {
      background: var(--color-warning);
      color: var(--color-text-primary);
      font-weight: var(--font-weight-bold);
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: var(--spacing-md);
      }

      .content-grid {
        grid-template-columns: 1fr;
      }

      .action-buttons {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  private accountService = inject(AccountService);
  private transactionService = inject(TransactionService);
  private authService = inject(AuthService);
  private router = inject(Router);

  accounts = signal<AccountResponse[]>([]);
  transactions = signal<TransactionResponse[]>([]);

  totalBalance = signal(0);
  recentAccounts = signal<AccountResponse[]>([]);
  recentTransactions = signal<TransactionResponse[]>([]);

  isAdmin = computed(() => this.authService.isAdmin());
  currentUserName = computed(() => this.authService.currentUser()?.name || 'Usuario');

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Cargar cuentas
    this.accountService.get().subscribe({
      next: (accounts) => {
        this.accounts.set(accounts);
        this.calculateTotalBalance(accounts);
        this.recentAccounts.set(accounts.slice(0, 5));
      }
    });

    // Cargar transacciones
    this.transactionService.get().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
        this.recentTransactions.set(transactions.slice(0, 5));
      }
    });
  }

  calculateTotalBalance(accounts: AccountResponse[]) {
    const total = accounts.reduce((sum, account) => sum + account.balance, 0);
    this.totalBalance.set(total);
  }

  navigateToAccount(id: string) {
    this.router.navigate(['/accounts', id]);
  }

  navigateToTransaction(id: string) {
    this.router.navigate(['/transactions', id]);
  }
}
