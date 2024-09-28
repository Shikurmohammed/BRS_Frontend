
// import { inject } from '@angular/core';
// import {
//     ActivatedRouteSnapshot,
//     CanActivateFn,
//     Router,
//     RouterStateSnapshot,
// } from '@angular/router';
// import { session } from '../utils/session';
// export const authGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot,
// ) => {
//   const router: Router = inject(Router);
//   const protectedRoutes: string[] = ['/dashboard'];
//   return protectedRoutes.includes(state.url) && !session
//     ? router.navigate(['/dashboard'])
//     : router.navigate(['/login']);
// };

import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { BookService } from "../services/book.service";

export interface IDeactivateComponent{
  canExit: ()=>boolean | Observable<boolean>|Promise<boolean>;
}
export const CanActivate=()=>{
  let authService=inject(AuthService)
  let route= inject(Router)
  //console.log(authService.isAuthenticated())
  if(authService.isAuthenticated()){
  
    return true;
  }
  else{
    route.navigateByUrl('/login')
    return false;
  }

}
// export function canDeactivate(comp:Component){
//  return comp.canExit();
// }
export const resolve=()=>{
return inject(BookService).fetchBooks();
}