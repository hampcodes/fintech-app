import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { ProductRequest, ProductResponse } from '@core/models/product.model';
import { CategoryResponse } from '@core/models/category.model';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="manage-container">
      <div class="header">
        <h1>Gestión de Productos</h1>
        <button class="btn btn-primary" (click)="showForm = !showForm">
          {{ showForm ? 'Cancelar' : '+ Nuevo Producto' }}
        </button>
      </div>

      @if (showForm) {
        <div class="form-card">
          <h2>{{ editingProduct ? 'Editar' : 'Nuevo' }} Producto</h2>
          <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Nombre *</label>
                <input
                  id="name"
                  type="text"
                  formControlName="name"
                  class="form-control"
                  placeholder="Ej: Laptop Dell">
                @if (productForm.get('name')?.invalid && productForm.get('name')?.touched) {
                  <small class="error">El nombre es requerido</small>
                }
              </div>

              <div class="form-group">
                <label for="categoryId">Categoría *</label>
                <select id="categoryId" formControlName="categoryId" class="form-control">
                  <option value="">Seleccionar categoría</option>
                  @for (category of categories(); track category.id) {
                    <option [value]="category.id">{{ category.name }}</option>
                  }
                </select>
                @if (productForm.get('categoryId')?.invalid && productForm.get('categoryId')?.touched) {
                  <small class="error">La categoría es requerida</small>
                }
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="price">Precio *</label>
                <input
                  id="price"
                  type="number"
                  formControlName="price"
                  class="form-control"
                  placeholder="0.00"
                  step="0.01"
                  min="0">
                @if (productForm.get('price')?.invalid && productForm.get('price')?.touched) {
                  <small class="error">El precio debe ser mayor a 0</small>
                }
              </div>

              <div class="form-group">
                <label for="stock">Stock *</label>
                <input
                  id="stock"
                  type="number"
                  formControlName="stock"
                  class="form-control"
                  placeholder="0"
                  min="0">
                @if (productForm.get('stock')?.invalid && productForm.get('stock')?.touched) {
                  <small class="error">El stock debe ser mayor o igual a 0</small>
                }
              </div>
            </div>

            <div class="form-group">
              <label for="imageUrl">URL de Imagen</label>
              <input
                id="imageUrl"
                type="text"
                formControlName="imageUrl"
                class="form-control"
                placeholder="https://ejemplo.com/imagen.jpg">
            </div>

            <div class="form-group">
              <label for="description">Descripción</label>
              <textarea
                id="description"
                formControlName="description"
                class="form-control"
                rows="3"
                placeholder="Descripción del producto"></textarea>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="cancelEdit()">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary" [disabled]="productForm.invalid || loading()">
                {{ loading() ? 'Guardando...' : 'Guardar' }}
              </button>
            </div>
          </form>
        </div>
      }

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

      <div class="table-card">
        <h2>Productos Registrados</h2>
        @if (products().length === 0) {
          <p class="empty-state">No hay productos registrados</p>
        } @else {
          <div class="products-grid">
            @for (product of products(); track product.id) {
              <div class="product-card">
                @if (product.imageUrl) {
                  <img [src]="product.imageUrl" [alt]="product.name" class="product-image">
                } @else {
                  <div class="product-image-placeholder">📦</div>
                }
                <div class="product-info">
                  <h3>{{ product.name }}</h3>
                  <p class="category-badge">{{ product.categoryName }}</p>
                  <p class="description">{{ product.description || 'Sin descripción' }}</p>
                  <div class="product-details">
                    <span class="price">\${{ product.price.toFixed(2) }}</span>
                    <span class="stock" [class.low-stock]="product.stock < 10">
                      Stock: {{ product.stock }}
                    </span>
                  </div>
                  <div class="product-actions">
                    <button class="btn-small btn-edit" (click)="edit(product)">
                      ✏️ Editar
                    </button>
                    <button class="btn-small btn-delete" (click)="delete(product.id)">
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .manage-container {
      padding: var(--spacing-xl);
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xl);
    }

    .header h1 {
      margin: 0;
      color: var(--color-text-primary);
    }

    .form-card, .table-card {
      background: var(--color-background-light);
      padding: var(--spacing-lg);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-sm);
      margin-bottom: var(--spacing-xl);
    }

    .form-card h2, .table-card h2 {
      margin: 0 0 var(--spacing-lg) 0;
      color: var(--color-text-primary);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-md);
    }

    .form-group {
      margin-bottom: var(--spacing-md);
    }

    .form-group label {
      display: block;
      margin-bottom: var(--spacing-xs);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
    }

    .form-control {
      width: 100%;
      padding: var(--spacing-sm);
      border: 1px solid var(--color-border-light);
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-base);
    }

    .form-control:focus {
      outline: none;
      border-color: var(--color-primary);
    }

    .error {
      color: var(--color-danger);
      font-size: var(--font-size-sm);
      margin-top: var(--spacing-xs);
      display: block;
    }

    .form-actions {
      display: flex;
      gap: var(--spacing-sm);
      justify-content: flex-end;
      margin-top: var(--spacing-lg);
    }

    .btn, .btn-small {
      padding: var(--spacing-sm) var(--spacing-lg);
      border: none;
      border-radius: var(--border-radius-sm);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: var(--transition-base);
    }

    .btn-small {
      padding: var(--spacing-xs) var(--spacing-sm);
      font-size: var(--font-size-sm);
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

    .btn-secondary {
      background: var(--color-secondary);
      color: var(--color-text-light);
    }

    .btn-secondary:hover {
      background: var(--color-secondary-dark);
    }

    .btn-edit {
      background: var(--color-info);
      color: var(--color-text-light);
    }

    .btn-delete {
      background: var(--color-danger);
      color: var(--color-text-light);
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
      background: var(--color-background);
      border-radius: var(--border-radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: var(--transition-base);
    }

    .product-card:hover {
      box-shadow: var(--shadow-md);
    }

    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .product-image-placeholder {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-background-dark);
      font-size: 4rem;
    }

    .product-info {
      padding: var(--spacing-md);
    }

    .product-info h3 {
      margin: 0 0 var(--spacing-xs) 0;
      color: var(--color-text-primary);
    }

    .category-badge {
      display: inline-block;
      padding: var(--spacing-xs) var(--spacing-sm);
      background: var(--color-primary);
      color: var(--color-text-light);
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-xs);
      margin-bottom: var(--spacing-sm);
    }

    .description {
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
      margin: var(--spacing-sm) 0;
    }

    .product-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: var(--spacing-md) 0;
    }

    .price {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-success);
    }

    .stock {
      padding: var(--spacing-xs) var(--spacing-sm);
      background: var(--color-success-light);
      color: var(--color-success);
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-sm);
    }

    .stock.low-stock {
      background: var(--color-warning-light);
      color: var(--color-warning);
    }

    .product-actions {
      display: flex;
      gap: var(--spacing-sm);
    }

    .empty-state {
      text-align: center;
      padding: var(--spacing-xl);
      color: var(--color-text-secondary);
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .products-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ManageProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);

  products = signal<ProductResponse[]>([]);
  categories = signal<CategoryResponse[]>([]);
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  showForm = false;
  editingProduct: ProductResponse | null = null;

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    categoryId: ['', Validators.required],
    imageUrl: ['']
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

  onSubmit() {
    if (this.productForm.valid) {
      this.loading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      const productData: ProductRequest = this.productForm.value;

      const operation = this.editingProduct
        ? this.productService.update(this.editingProduct.id, productData)
        : this.productService.create(productData);

      operation.subscribe({
        next: () => {
          this.successMessage.set(
            this.editingProduct
              ? 'Producto actualizado exitosamente'
              : 'Producto creado exitosamente'
          );
          this.loading.set(false);
          this.cancelEdit();
          this.loadProducts();
        },
        error: () => {
          this.errorMessage.set('Error al guardar el producto');
          this.loading.set(false);
        }
      });
    }
  }

  edit(product: ProductResponse) {
    this.editingProduct = product;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
      imageUrl: product.imageUrl
    });
    this.showForm = true;
  }

  delete(id: string) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.successMessage.set('Producto eliminado exitosamente');
          this.loadProducts();
        },
        error: () => {
          this.errorMessage.set('Error al eliminar el producto');
        }
      });
    }
  }

  cancelEdit() {
    this.showForm = false;
    this.editingProduct = null;
    this.productForm.reset();
  }
}
