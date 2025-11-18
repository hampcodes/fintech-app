import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '@core/services/order.service';
import { OrderResponse, OrderStatus } from '@core/models/order.model';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="orders-container">
      <div class="orders-header">
        <h1>📦 Mis Órdenes</h1>
        <a routerLink="/shop/catalog" class="btn btn-primary">Ir al catálogo</a>
      </div>

      @if (errorMessage()) {
        <div class="alert alert-error">
          {{ errorMessage() }}
        </div>
      }

      @if (orders().length === 0) {
        <div class="empty-state">
          <div class="empty-icon">📦</div>
          <h2>No tienes órdenes todavía</h2>
          <p>Realiza tu primera compra desde el catálogo</p>
          <a routerLink="/shop/catalog" class="btn btn-primary">Ir al catálogo</a>
        </div>
      } @else {
        <div class="orders-list">
          @for (order of orders(); track order.id) {
            <div class="order-card">
              <div class="order-header">
                <div>
                  <h3>Orden #{{ order.id.substring(0, 8) }}</h3>
                  <p class="order-date">{{ order.createdAt | date:'medium' }}</p>
                </div>
                <span class="status-badge" [class]="'status-' + order.status.toLowerCase()">
                  {{ getStatusLabel(order.status) }}
                </span>
              </div>

              <div class="order-details">
                <div class="detail-row">
                  <span>Cuenta de pago:</span>
                  <strong>{{ order.accountNumber }}</strong>
                </div>
                <div class="detail-row">
                  <span>Total de productos:</span>
                  <strong>{{ order.items.length }}</strong>
                </div>
              </div>

              <div class="order-items">
                @for (item of order.items; track item.id) {
                  <div class="order-item">
                    <span class="item-name">{{ item.productName }}</span>
                    <span class="item-quantity">x{{ item.quantity }}</span>
                    <span class="item-price">\${{ item.subtotal.toFixed(2) }}</span>
                  </div>
                }
              </div>

              <div class="order-footer">
                <span class="total-label">Total:</span>
                <span class="total-amount">\${{ order.total.toFixed(2) }}</span>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .orders-container {
      padding: var(--spacing-xl);
      max-width: 1200px;
      margin: 0 auto;
    }

    .orders-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xl);
    }

    .orders-header h1 {
      margin: 0;
      color: var(--color-text-primary);
    }

    .btn {
      padding: var(--spacing-sm) var(--spacing-lg);
      background: var(--color-primary);
      color: var(--color-text-light);
      text-decoration: none;
      border-radius: var(--border-radius-md);
      font-weight: var(--font-weight-medium);
      transition: var(--transition-base);
      border: none;
      cursor: pointer;
    }

    .btn:hover {
      background: var(--color-primary-dark);
    }

    .alert {
      padding: var(--spacing-md);
      border-radius: var(--border-radius-sm);
      margin-bottom: var(--spacing-lg);
    }

    .alert-error {
      background: var(--color-danger-light);
      color: var(--color-danger);
      border: 1px solid var(--color-danger);
    }

    .empty-state {
      text-align: center;
      padding: var(--spacing-3xl);
      background: var(--color-background-light);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .empty-icon {
      font-size: 5rem;
      margin-bottom: var(--spacing-md);
    }

    .empty-state h2 {
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
    }

    .empty-state p {
      color: var(--color-text-secondary);
      margin-bottom: var(--spacing-lg);
    }

    .orders-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .order-card {
      background: var(--color-background-light);
      padding: var(--spacing-lg);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-md);
      padding-bottom: var(--spacing-md);
      border-bottom: 2px solid var(--color-border-light);
    }

    .order-header h3 {
      margin: 0;
      color: var(--color-text-primary);
    }

    .order-date {
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
      margin: var(--spacing-xs) 0 0 0;
    }

    .status-badge {
      padding: var(--spacing-xs) var(--spacing-md);
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
      text-transform: uppercase;
    }

    .status-pending {
      background: var(--color-warning-light);
      color: var(--color-warning);
    }

    .status-confirmed {
      background: var(--color-info-light);
      color: var(--color-info);
    }

    .status-delivered {
      background: var(--color-success-light);
      color: var(--color-success);
    }

    .status-cancelled {
      background: var(--color-danger-light);
      color: var(--color-danger);
    }

    .order-details {
      margin-bottom: var(--spacing-md);
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: var(--spacing-xs) 0;
      color: var(--color-text-secondary);
    }

    .order-items {
      background: var(--color-background);
      padding: var(--spacing-md);
      border-radius: var(--border-radius-sm);
      margin-bottom: var(--spacing-md);
    }

    .order-item {
      display: grid;
      grid-template-columns: 1fr auto auto;
      gap: var(--spacing-md);
      padding: var(--spacing-sm) 0;
      border-bottom: 1px solid var(--color-border-light);
    }

    .order-item:last-child {
      border-bottom: none;
    }

    .item-name {
      color: var(--color-text-primary);
    }

    .item-quantity {
      color: var(--color-text-secondary);
    }

    .item-price {
      color: var(--color-success);
      font-weight: var(--font-weight-semibold);
    }

    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: var(--spacing-md);
      border-top: 2px solid var(--color-border-light);
    }

    .total-label {
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
    }

    .total-amount {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
    }

    @media (max-width: 768px) {
      .orders-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-md);
      }

      .order-item {
        grid-template-columns: 1fr;
        gap: var(--spacing-xs);
      }
    }
  `]
})
export class MyOrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  private router = inject(Router);

  orders = signal<OrderResponse[]>([]);
  errorMessage = signal('');

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.get().subscribe({
      next: (orders) => {
        this.orders.set(orders);
      },
      error: () => {
        this.errorMessage.set('Error al cargar las órdenes');
      }
    });
  }

  getStatusLabel(status: OrderStatus): string {
    const labels = {
      [OrderStatus.PENDING]: 'Pendiente',
      [OrderStatus.CONFIRMED]: 'Confirmada',
      [OrderStatus.DELIVERED]: 'Entregada',
      [OrderStatus.CANCELLED]: 'Cancelada'
    };
    return labels[status] || status;
  }
}
