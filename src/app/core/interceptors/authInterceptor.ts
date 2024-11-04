import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { ErrorHandlerService } from '../services/errorHandler.service';
import { LogService } from '../services/log.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,private logService:LogService) {}
  private allowedPaths: string[] = ['/api/getBooks']; // Define allowed paths

  errorHandlerService:ErrorHandlerService=inject(ErrorHandlerService)
  intercept(req: HttpRequest<any>,next: HttpHandler,): Observable<HttpEvent<any>>
   {
    const isAllowed = this.allowedPaths.some(path => req.url.includes(path));
    const token = this.authService.getToken();
    if (token) {
      const cloned = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      });
      return next.handle(cloned)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.errorHandlerService.handleError(error);
        }),
      );
    } 
    else if(isAllowed){ return next.handle(req);}
    else {
      return next.handle(req);
    }
  }
}
