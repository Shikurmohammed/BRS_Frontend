import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";

export const CanActivate = (expectedRole: string) => {
    let authService = inject(AuthService);
    let route = inject(Router);
    const currentRole = authService.getRole();
    //console.log('Current Role:' + currentRole + ' Expec' + expectedRole);
    
    
    const isMatched= expectedRole?.trim().split(",").includes(currentRole?.trim());
    if (isMatched){//authService.isAuthenticated() && 
      return true;
    } 
    else {
      route.navigate([authService.redirectUser(currentRole)]);
      return false;
    }
  };
