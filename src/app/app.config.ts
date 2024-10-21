import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/authInterceptor';
export const appConfig: ApplicationConfig = {
  providers: [
   // provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    } ,
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(), provideAnimationsAsync(),
    provideAnimations(),provideToastr({
      timeOut:3000,
      positionClass:'toast-top-right',
      preventDuplicates:true,
      closeButton:true,
      autoDismiss:true,
      progressBar:true,
    })
   // BookService
  ],
};
