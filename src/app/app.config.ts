import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { APP_DATE_FORMATS } from './core/date-format';
import { AuthInterceptor } from './core/interceptors/authInterceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    } ,
    {
      provide:MAT_DATE_FORMATS,useValue:APP_DATE_FORMATS 
    },
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
    }), provideAnimationsAsync()
  ],
};
