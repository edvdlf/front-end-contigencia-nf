import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from '../../auth/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: LoginService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken()
    console.log('🔍 Interceptor executado para URL:', request.url);
    console.log('Token encontrado:', token ? '✅ SIM' : '❌ NÃO');

    if (token) {
      if (this.authService.isAuthenticated()) {
        const isFormData = request.body instanceof FormData;
        const clonedRequest = request.clone({
          setHeaders: {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            'Authorization': `Bearer ${token}`
          }
        });
        return next.handle(clonedRequest);
      } else {
        this.authService.destroySession();
        this.router.navigate(['/login']);
        return throwError(() => new Error('Token expirado. Faça login novamente.'));
      }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.destroySession();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );

  }
}
