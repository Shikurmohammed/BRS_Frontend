
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
  console.log('resolve')
return inject(BookService).fetchBooks();
}