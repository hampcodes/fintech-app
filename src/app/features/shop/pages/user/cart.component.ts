import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '@core/services/cart.service';
import { OrderService } from '@core/services/order.service';
import { AccountService } from '@core/services/account.service';
import { OrderItemRequest } from '@core/models/order.model';
import { AccountResponse } from '@core/models/account.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="cart-container">
      <div class="cart-header">
        <h1>🛒 Carrito de Compras</h1>
        <a routerLink="/shop/catalog" class="btn-back">← Seguir comprando</a>
      </div>

      @if (cartItems().length === 0) {
        <div class="empty-cart">
          <div class="empty-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos desde el catálogo</p>
          <a routerLink="/shop/catalog" class="btn btn-primary">Ir al catálogo</a>
        </div>
      } @else {
        <div class="cart-content">
          <!-- Lista de productos -->
          <div class="cart-items">
            @for (item of cartItems(); track item.product.id) {
              <div class="cart-item">
                @if (item.product.imageUrl) {
                  <img [src]="item.product.imageUrl" [alt]="item.product.name" class="item-image">
                } @else {
                  <div class="item-image-placeholder">📦</div>
                }
                <div class="item-info">
                  <h3>{{ item.product.name }}</h3>
                  <p class="item-category">{{ item.product.categoryName }}</p>
                  <p class="item-price">\${{ item.product.price.toFixed(2) }} c/u</p>
                </div>
                <div class="item-quantity">
                  <button class="qty-btn" (click)="decreaseQuantity(item.product.id)">-</button>
                  <span class="qty-value">{{ item.quantity }}</span>
                  <button class="qty-btn" (click)="increaseQuantity(item.product.id)" [disabled]="item.quantity >= item.product.stock">+</button>
                </div>
                <div class="item-total">
                  <p class="total-price">\${{ (item.product.price * item.quantity).toFixed(2) }}</p>
                  <button class="btn-remove" (click)="removeItem(item.product.id)">🗑️ Eliminar</button>
                </div>
              </div>
            }
          </div>

          <!-- Resumen y checkout -->
          <div class="cart-summary">
            <h2>Resumen del Pedido</h2>
            <div class="summary-row">
              <span>Subtotal ({{ totalItems() }} productos):</span>
              <span>\${{ subtotal().toFixed(2) }}</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span>\${{ subtotal().toFixed(2) }}</span>
            </div>

            <div class="checkout-section">
              <h3>Seleccionar cuenta para el pago</h3>
              <form [formGroup]="checkoutForm">
                <select formControlName="accountNumber" class="form-control">
                  <option value="">Seleccionar cuenta</option>
                  @for (account of accounts(); track account.id) {
                    <option [value]="account.accountNumber">
                      {{ account.accountNumber }} - \${{ account.balance.toFixed(2) }}
                    </option>
                  }
                </select>
                @if (checkoutForm.get('accountNumber')?.invalid && checkoutForm.get('accountNumber')?.touched) {
                  <small class="error">Debes seleccionar una cuenta</small>
                }

                @if (selectedAccountBalance() !== null && selectedAccountBalance()! < subtotal()) {
                  <div class="alert alert-error">
                    Saldo insuficiente en la cuenta seleccionada
                  </div>
                }
              </form>

              @if (errorMessage()) {
                <div class="alert alert-error">
                  {{ errorMessage() }}
                </div>
              }

              @if (successMessage()) {
                <div class="alert alert-success">
                  {{ successMessage() }}
                </div>
              }

              <button
                class="btn btn-primary btn-checkout"
                (click)="checkout()"
                [disabled]="checkoutForm.invalid || loading() || (selectedAccountBalance() !== null && selectedAccountBalance()! < subtotal())">
                @if (loading()) {
                  Procesando...
                } @else {
                  💳 Finalizar Compra
                }
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .cart-container {
      padding: var(--spacing-xl);
      max-width: 1400px;
      margin: 0 auto;
    }

    .cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xl);
    }

    .cart-header h1 {
      margin: 0;
      color: var(--color-text-primary);
    }

    .btn-back {
      padding: var(--spacing-sm) var(--spacing-lg);
      background: var(--color-secondary);
      color: var(--color-text-light);
      text-decoration: none;
      border-radius: var(--border-radius-md);
      transition: var(--transition-base);
    }

    .btn-back:hover {
      background: var(--color-secondary-dark);
    }

    .empty-cart {
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

    .empty-cart h2 {
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
    }

    .empty-cart p {
      color: var(--color-text-secondary);
      margin-bottom: var(--spacing-lg);
    }

    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--spacing-xl);
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .cart-item {
      background: var(--color-background-light);
      padding: var(--spacing-lg);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-sm);
      display: grid;
      grid-template-columns: 100px 1fr auto auto;
      gap: var(--spacing-md);
      align-items: center;
    }

    .item-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: var(--border-radius-sm);
    }

    .item-image-placeholder {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-background-dark);
      border-radius: var(--border-radius-sm);
      font-size: 2rem;
    }

    .item-info h3 {
      margin: 0 0 var(--spacing-xs) 0;
      color: var(--color-text-primary);
    }

    .item-category {
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
      margin: var(--spacing-xs) 0;
    }

    .item-price {
      color: var(--color-success);
      font-weight: var(--font-weight-semibold);
      margin: var(--spacing-xs) 0;
    }

    .item-quantity {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .qty-btn {
      width: 32px;
      height: 32px;
      border: 1px solid var(--color-border-light);
      background: var(--color-background);
      border-radius: var(--border-radius-sm);
      cursor: pointer;
      font-weight: var(--font-weight-bold);
      transition: var(--transition-base);
    }

    .qty-btn:hover:not(:disabled) {
      background: var(--color-primary);
      color: var(--color-text-light);
      border-color: var(--color-primary);
    }

    .qty-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .qty-value {
      min-width: 40px;
      text-align: center;
      font-weight: var(--font-weight-semibold);
    }

    .item-total {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--spacing-sm);
    }

    .total-price {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-primary);
      margin: 0;
    }

    .btn-remove {
      padding: var(--spacing-xs) var(--spacing-sm);
      background: var(--color-danger);
      color: var(--color-text-light);
      border: none;
      border-radius: var(--border-radius-sm);
      cursor: pointer;
      font-size: var(--font-size-sm);
      transition: var(--transition-base);
    }

    .btn-remove:hover {
      background: var(--color-danger-dark);
    }

    .cart-summary {
      background: var(--color-background-light);
      padding: var(--spacing-lg);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-md);
      height: fit-content;
      position: sticky;
      top: var(--spacing-xl);
    }

    .cart-summary h2 {
      margin: 0 0 var(--spacing-lg) 0;
      color: var(--color-text-primary);
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: var(--spacing-sm) 0;
      color: var(--color-text-secondary);
    }

    .summary-row.total {
      border-top: 2px solid var(--color-border-light);
      margin-top: var(--spacing-md);
      padding-top: var(--spacing-md);
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
    }

    .checkout-section {
      margin-top: var(--spacing-xl);
    }

    .checkout-section h3 {
      margin: 0 0 var(--spacing-md) 0;
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
    }

    .form-control {
      width: 100%;
      padding: var(--spacing-sm);
      border: 1px solid var(--color-border-light);
      border-radius: var(--border-radius-sm);
      margin-bottom: var(--spacing-md);
    }

    .form-control:focus {
      outline: none;
      border-color: var(--color-primary);
    }

    .error {
      color: var(--color-danger);
      font-size: var(--font-size-sm);
      display: block;
      margin-top: calc(-1 * var(--spacing-sm));
      margin-bottom: var(--spacing-sm);
    }

    .alert {
      padding: var(--spacing-sm);
      border-radius: var(--border-radius-sm);
      margin-bottom: var(--spacing-md);
      font-size: var(--font-size-sm);
    }

    .alert-error {
      background: var(--color-danger-light);
      color: var(--color-danger);
      border: 1px solid var(--color-danger);
    }

    .alert-success {
      background: var(--color-success-light);
      color: var(--color-success);
      border: 1px solid var(--color-success);
    }

    .btn {
      padding: var(--spacing-md) var(--spacing-lg);
      border: none;
      border-radius: var(--border-radius-md);
      font-weight: var(--font-weight-semibold);
      cursor: pointer;
      transition: var(--transition-base);
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background: var(--color-primary);
      color: var(--color-text-light);
    }

    .btn-primary:hover:not(:disabled) {
      background: var(--color-primary-dark);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-checkout {
      width: 100%;
      font-size: var(--font-size-lg);
    }

    @media (max-width: 1024px) {
      .cart-content {
        grid-template-columns: 1fr;
      }

      .cart-summary {
        position: static;
      }
    }

    @media (max-width: 768px) {
      .cart-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-md);
      }

      .cart-item {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .item-image, .item-image-placeholder {
        margin: 0 auto;
      }

      .item-total {
        align-items: center;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  cartItems = this.cartService.cart;
  accounts = signal<AccountResponse[]>([]);
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  checkoutForm: FormGroup = this.fb.group({
    accountNumber: ['', Validators.required]
  });

  totalItems = computed(() => this.cartService.getItemCount());
  subtotal = computed(() => this.cartService.getTotal());

  selectedAccountBalance = computed(() => {
    const accountNumber = this.checkoutForm.get('accountNumber')?.value;
    if (!accountNumber) return null;
    const account = this.accounts().find(a => a.accountNumber === accountNumber);
    return account ? account.balance : null;
  });

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.get().subscribe({
      next: (accounts) => {
        this.accounts.set(accounts);
      }
    });
  }

  increaseQuantity(productId: string) {
    const item = this.cartItems().find(i => i.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: string) {
    const item = this.cartItems().find(i => i.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
    }
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  checkout() {
    if (this.checkoutForm.invalid) return;

    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const items: OrderItemRequest[] = this.cartItems().map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));

    const orderRequest = {
      items,
      accountNumber: this.checkoutForm.get('accountNumber')?.value
    };

    this.orderService.create(orderRequest).subscribe({
      next: () => {
        this.successMessage.set('¡Compra realizada exitosamente!');
        this.cartService.clearCart();
        this.loading.set(false);
        setTimeout(() => {
          this.router.navigate(['/shop/orders']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage.set(error.error?.message || 'Error al procesar la compra');
        this.loading.set(false);
      }
    });
  }
}
