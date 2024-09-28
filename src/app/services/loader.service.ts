import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
private source= new BehaviorSubject<boolean>(false);
currentValue=this.source.asObservable()
  constructor() { }
  setLoader(data:boolean){
    return this.source.next(data)
  }


}
