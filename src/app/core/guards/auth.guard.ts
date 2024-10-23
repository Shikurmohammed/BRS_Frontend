import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { BookService } from '../services/book.service';

export interface IDeactivateComponent {
  canExit: () => boolean | Observable<boolean> | Promise<boolean>;
}
export const CanActivate = (expectedRole: string) => {
  let authService = inject(AuthService);
  let route = inject(Router);
  const currentRole = localStorage.getItem('Role');
  console.log('Current Role:' + currentRole + ' Expec' + expectedRole);
  
  if (
    authService.isAuthenticated() &&
    expectedRole.trim().split(",").includes(currentRole.trim())
  ) {
    return true;
  } else {
    route.navigateByUrl('/login');
    return false;
  }
};
// export function canDeactivate(comp:Component){
//  return comp.canExit();
// }
export const resolve = () => {
  console.log('resolve');
  return inject(BookService).fetchBooks();
};
