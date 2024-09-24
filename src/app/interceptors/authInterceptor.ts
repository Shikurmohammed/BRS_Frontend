import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
@Injectable({
    providedIn:'root'
}
)
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService:AuthService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Auth Interceptor called...')
        const token= this.authService.getToken();
        console.log('token value: '+token)
        if(token){
            const cloned=req.clone({
                setHeaders:{Authorization:`Bearer ${token}`}
                
            });
            return next.handle(cloned);
        }
       else{
        return next.handle(req);
       }
        
    }
}