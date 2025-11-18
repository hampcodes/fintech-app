import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { CartService } from '@core/services/cart.service';
import { ProductResponse } from '@core/models/product.model';
import { CategoryResponse } from '@core/models/category.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="catalog-container">
      <div class="catalog-header">
        <div>
          <h1>Catálogo de Productos</h1>
          <p class="subtitle">Encuentra los mejores productos para ti</p>
        </div>
        <a routerLink="/shop/cart" class="cart-button">
          🛒 Carrito ({{ cartItemCount() }})
          @if (cartItemCount() > 0) {
            <span class="cart-badge">{{ cartItemCount() }}</span>
          }
        </a>
      </div>

      <!-- Filtros de categoría -->
      <div class="filters">
        <button
          class="filter-btn"
          [class.active]="selectedCategory() === null"
          (click)="filterByCategory(null)">
          Todos
        </button>
        @for (category of categories(); track category.id) {
          <button
            class="filter-btn"
            [class.active]="selectedCategory() === category.id"
            (click)="filterByCategory(category.id)">
            {{ category.name }}
          </button>
        }
      </div>

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

      <!-- Grid de productos -->
      <div class="products-grid">
        @if (filteredProducts().length === 0) {
          <p class="empty-state">No hay productos disponibles</p>
        }
        @for (product of filteredProducts(); track product.id) {
          <div class="product-card">
            @if (product.imageUrl) {
              <img [src]="product.imageUrl" [alt]="product.name" class="product-image">
            } @else {
              <div class="product-image-placeholder">📦</div>
            }
            <div class="product-info">
              <div class="product-category">{{ product.categoryName }}</div>
              <h3>{{ product.name }}</h3>
              <p class="description">{{ product.description || 'Sin descripción' }}</p>
              <div class="product-footer">
                <div class="price-section">
                  <span class="price">\${{ product.price.toFixed(2) }}</span>
                  <span class="stock" [class.low-stock]="product.stock < 10" [class.out-of-stock]="product.stock === 0">
                    @if (product.stock === 0) {
                      Agotado
                    } @else if (product.stock < 10) {
                      ¡Últimas {{ product.stock }} unidades!
                    } @else {
                      Disponible
                    }
                  </span>
                </div>
                <button
                  class="btn-add-to-cart"
                  (click)="addToCart(product)"
                  [disabled]="product.stock === 0">
                  @if (product.stock === 0) {
                    No disponible
                  } @else {
                    🛒 Agregar al carrito
                  }
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .catalog-container {
      padding: var(--spacing-xl);
      max-width: 1400px;
      margin: 0 auto;
    }

    .catalog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xl);
    }

    .catalog-header h1 {
      margin: 0;
      color: var(--color-text-primary);
    }

    .subtitle {
      color: var(--color-text-secondary);
      margin: var(--spacing-xs) 0 0 0;
    }

    .cart-button {
      position: relative;
      padding: var(--spacing-md) var(--spacing-lg);
      background: var(--color-primary);
      color: var(--color-text-light);
      text-decoration: none;
      border-radius: var(--border-radius-md);
      font-weight: var(--font-weight-medium);
      transition: var(--transition-base);
    }

    .cart-button:hover {
      background: var(--color-primary-dark);
      transform: translateY(-2px);
    }

    .cart-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background: var(--color-danger);
      color: var(--color-text-light);
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-bold);
    }

    .filters {
      display: flex;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-xl);
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: var(--spacing-sm) var(--spacing-lg);
      border: 2px solid var(--color-border-light);
      background: var(--color-background-light);
      color: var(--color-text-secondary);
      border-radius: var(--border-radius-md);
      cursor: pointer;
      transition: var(--transition-base);
      font-weight: var(--font-weight-medium);
    }

    .filter-btn:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
    }

    .filter-btn.active {
      background: var(--color-primary);
      color: var(--color-text-light);
      border-color: var(--color-primary);
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

    .alert-success {
      background: var(--color-success-light);
      color: var(--color-success);
      border: 1px solid var(--color-success);
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--spacing-lg);
    }

    .product-card {
      background: var(--color-background-light);
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      transition: var(--transition-base);
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .product-image {
      width: 100%;
      height: 250px;
      object-fit: cover;
    }

    .product-image-placeholder {
      width: 100%;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-background-dark);
      font-size: 5rem;
    }

    .product-info {
      padding: var(--spacing-lg);
    }

    .product-category {
      display: inline-block;
      padding: var(--spacing-xs) var(--spacing-sm);
      background: var(--color-primary-light);
      color: var(--color-primary);
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-sm);
      text-transform: uppercase;
    }

    .product-info h3 {
      margin: var(--spacing-sm) 0;
      color: var(--color-text-primary);
      font-size: var(--font-size-lg);
    }

    .description {
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
      margin: var(--spacing-sm) 0;
      line-height: 1.5;
    }

    .product-footer {
      margin-top: var(--spacing-md);
    }

    .price-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-md);
    }

    .price {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-success);
    }

    .stock {
      padding: var(--spacing-xs) var(--spacing-sm);
      background: var(--color-success-light);
      color: var(--color-success);
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-medium);
    }

    .stock.low-stock {
      background: var(--color-warning-light);
      color: var(--color-warning);
    }

    .stock.out-of-stock {
      background: var(--color-danger-light);
      color: var(--color-danger);
    }

    .btn-add-to-cart {
      width: 100%;
      padding: var(--spacing-md);
      background: var(--color-primary);
      color: var(--color-text-light);
      border: none;
      border-radius: var(--border-radius-md);
      font-weight: var(--font-weight-semibold);
      cursor: pointer;
      transition: var(--transition-base);
      font-size: var(--font-size-base);
    }

    .btn-add-to-cart:hover:not(:disabled) {
      background: var(--color-primary-dark);
      transform: translateY(-2px);
    }

    .btn-add-to-cart:disabled {
      background: var(--color-background-dark);
      color: var(--color-text-secondary);
      cursor: not-allowed;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: var(--spacing-3xl);
      color: var(--color-text-secondary);
      font-size: var(--font-size-lg);
    }

    @media (max-width: 768px) {
      .catalog-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-md);
      }

      .products-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CatalogComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private cartService = inject(CartService);

  products = signal<ProductResponse[]>([]);
  categories = signal<CategoryResponse[]>([]);
  selectedCategory = signal<string | null>(null);
  errorMessage = signal('');
  successMessage = signal('');

  cartItemCount = computed(() => this.cartService.getItemCount());

  filteredProducts = computed(() => {
    const categoryId = this.selectedCategory();
    if (!categoryId) {
      return this.products();
    }
    return this.products().filter(p => p.categoryId === categoryId);
  });

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.get().subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {
        this.errorMessage.set('Error al cargar los productos');
      }
    });
  }

  loadCategories() {
    this.categoryService.get().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      }
    });
  }

  filterByCategory(categoryId: string | null) {
    this.selectedCategory.set(categoryId);
  }

  addToCart(product: ProductResponse) {
    this.cartService.addToCart(product, 1);
    this.successMessage.set(`${product.name} agregado al carrito`);
    setTimeout(() => this.successMessage.set(''), 3000);
  }
}
