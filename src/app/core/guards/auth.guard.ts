import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';

export interface IDeactivateComponent {
  canExit: () => boolean | Observable<boolean> | Promise<boolean>;
}
// export function canDeactivate(comp:Component){
//  return comp.canExit();
// }
export const resolve = () => {
  console.log('resolve');
  return inject(BookService).fetchBooks();
};
