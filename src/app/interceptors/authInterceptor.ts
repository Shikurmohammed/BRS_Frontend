import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { ErrorHandlerService } from '../services/errorHandler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    
  ) {}
  errorHandlerService:ErrorHandlerService=inject(ErrorHandlerService)
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    console.log('Auth Interceptor called...');
    const token = this.authService.getToken();
    // console.log('token value: '+token)
    if (token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorHandlerService.handleError(error);
        }),
      );
    } else {
      return next.handle(req);
    }
  }
}
