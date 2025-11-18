import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '@core/services/category.service';
import { CategoryRequest, CategoryResponse } from '@core/models/category.model';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="manage-container">
      <div class="header">
        <h1>Gestión de Categorías</h1>
        <button class="btn btn-primary" (click)="showForm = !showForm">
          {{ showForm ? 'Cancelar' : '+ Nueva Categoría' }}
        </button>
      </div>

      @if (showForm) {
        <div class="form-card">
          <h2>{{ editingCategory ? 'Editar' : 'Nueva' }} Categoría</h2>
          <form [formGroup]="categoryForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Nombre *</label>
              <input
                id="name"
                type="text"
                formControlName="name"
                class="form-control"
                placeholder="Ej: Electrónica">
              @if (categoryForm.get('name')?.invalid && categoryForm.get('name')?.touched) {
                <small class="error">El nombre es requerido</small>
              }
            </div>

            <div class="form-group">
              <label for="description">Descripción</label>
              <textarea
                id="description"
                formControlName="description"
                class="form-control"
                rows="3"
                placeholder="Descripción de la categoría"></textarea>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="cancelEdit()">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary" [disabled]="categoryForm.invalid || loading()">
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
        <h2>Categorías Registradas</h2>
        @if (categories().length === 0) {
          <p class="empty-state">No hay categorías registradas</p>
        } @else {
          <table class="data-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (category of categories(); track category.id) {
                <tr>
                  <td><strong>{{ category.name }}</strong></td>
                  <td>{{ category.description || '-' }}</td>
                  <td>{{ category.createdAt | date:'short' }}</td>
                  <td>
                    <div class="actions">
                      <button class="btn-icon btn-edit" (click)="edit(category)" title="Editar">
                        ✏️
                      </button>
                      <button class="btn-icon btn-delete" (click)="delete(category.id)" title="Eliminar">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  `,
  styles: [`
    .manage-container {
      padding: var(--spacing-xl);
      max-width: 1200px;
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
    }

    .form-actions {
      display: flex;
      gap: var(--spacing-sm);
      justify-content: flex-end;
      margin-top: var(--spacing-lg);
    }

    .btn {
      padding: var(--spacing-sm) var(--spacing-lg);
      border: none;
      border-radius: var(--border-radius-sm);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: var(--transition-base);
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

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table thead {
      background: var(--color-background-dark);
    }

    .data-table th {
      text-align: left;
      padding: var(--spacing-md);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      border-bottom: 2px solid var(--color-border-light);
    }

    .data-table td {
      padding: var(--spacing-md);
      border-bottom: 1px solid var(--color-border-light);
    }

    .data-table tbody tr:hover {
      background: var(--color-background);
    }

    .actions {
      display: flex;
      gap: var(--spacing-xs);
    }

    .btn-icon {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: var(--spacing-xs);
      border-radius: var(--border-radius-sm);
      transition: var(--transition-base);
    }

    .btn-icon:hover {
      background: var(--color-background-dark);
    }

    .empty-state {
      text-align: center;
      padding: var(--spacing-xl);
      color: var(--color-text-secondary);
    }
  `]
})
export class ManageCategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private fb = inject(FormBuilder);

  categories = signal<CategoryResponse[]>([]);
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  showForm = false;
  editingCategory: CategoryResponse | null = null;

  categoryForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  });

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.get().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: () => {
        this.errorMessage.set('Error al cargar las categorías');
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.loading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      const categoryData: CategoryRequest = this.categoryForm.value;

      const operation = this.editingCategory
        ? this.categoryService.update(this.editingCategory.id, categoryData)
        : this.categoryService.create(categoryData);

      operation.subscribe({
        next: () => {
          this.successMessage.set(
            this.editingCategory
              ? 'Categoría actualizada exitosamente'
              : 'Categoría creada exitosamente'
          );
          this.loading.set(false);
          this.cancelEdit();
          this.loadCategories();
        },
        error: () => {
          this.errorMessage.set('Error al guardar la categoría');
          this.loading.set(false);
        }
      });
    }
  }

  edit(category: CategoryResponse) {
    this.editingCategory = category;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description
    });
    this.showForm = true;
  }

  delete(id: string) {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoryService.delete(id).subscribe({
        next: () => {
          this.successMessage.set('Categoría eliminada exitosamente');
          this.loadCategories();
        },
        error: () => {
          this.errorMessage.set('Error al eliminar la categoría');
        }
      });
    }
  }

  cancelEdit() {
    this.showForm = false;
    this.editingCategory = null;
    this.categoryForm.reset();
  }
}
