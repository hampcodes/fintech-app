import { Routes } from '@angular/router';
import { adminGuard } from '@core/guards/admin.guard';

export const SHOP_ROUTES: Routes = [
  // Rutas para usuarios (catálogo y compras)
  {
    path: 'catalog',
    loadComponent: () => import('./pages/user/catalog.component').then(m => m.CatalogComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/user/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/user/my-orders.component').then(m => m.MyOrdersComponent)
  },

  // Rutas para administradores
  {
    path: 'admin/categories',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/manage-categories.component').then(m => m.ManageCategoriesComponent)
  },
  {
    path: 'admin/products',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/manage-products.component').then(m => m.ManageProductsComponent)
  },

  // Redirección por defecto
  {
    path: '',
    redirectTo: 'catalog',
    pathMatch: 'full'
  }
];
