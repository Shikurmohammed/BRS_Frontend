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
  constructor(
    private authService: AuthService,private logService:LogService
    
  ) {}
  errorHandlerService:ErrorHandlerService=inject(ErrorHandlerService)
  intercept(req: HttpRequest<any>,next: HttpHandler,): Observable<HttpEvent<any>>
   {
   //console.log('Auth Interceptor called...');
    const token = this.authService.getToken();
   
    if (token) {
      const cloned = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      });
      return next.handle(cloned)
      .pipe(
        catchError((error: HttpErrorResponse) => {
         // let errorObj={message:error.message,level:'Warning', time:new Date()};
          //this.logService.logError(errorObj)
          return this.errorHandlerService.handleError(error);
        }),
      );
    } else {
      return next.handle(req);
    }
  }
}
