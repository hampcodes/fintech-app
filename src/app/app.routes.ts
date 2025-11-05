import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Ruta principal - Home (sin layout)
  {
    path: '',
    loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES)
  },

  // Rutas de autenticación con landing-layout (Login, Register)
  {
    path: '',
    loadComponent: () => import('./shared/layouts/landing-layout.component').then(m => m.LandingLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/pages/register.component').then(m => m.RegisterComponent)
      }
    ]
  },

  // Rutas protegidas con Auth Layout (Dashboard)
  {
    path: '',
    loadComponent: () => import('./shared/layouts/auth-layout.component').then(m => m.AuthLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'accounts',
        loadChildren: () => import('./features/accounts/accounts.routes').then(m => m.ACCOUNTS_ROUTES)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./features/transactions/transactions.routes').then(m => m.TRANSACTIONS_ROUTES)
      }
    ]
  },

  // Ruta por defecto (404)
  {
    path: '**',
    redirectTo: ''
  }
];
