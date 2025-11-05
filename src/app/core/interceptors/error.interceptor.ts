import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error';

      if (error.error instanceof ErrorEvent) {
        // Error del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del servidor
        errorMessage = `Error ${error.status}: ${error.error?.message || error.message}`;

        // Si el error es 401 (Unauthorized), hacer logout
        if (error.status === 401) {
          authService.logout();
          router.navigate(['/login']);
        }

        // Si el error es 403 (Forbidden), redirigir
        if (error.status === 403) {
          router.navigate(['/']);
        }
      }

      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
