import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Rent } from '../models/Rent';

@Injectable({ providedIn: 'root' })
export class RentService {
  http: HttpClient = inject(HttpClient);
  private apiUrl = `http://localhost:8080/api`;
  errorSubject = new Subject<HttpErrorResponse>();

  fetchRents() {
    return this.http.get<Rent[]>(`${this.apiUrl}/getRentList`);
  }

  addRent(data: Rent) {
    //this.http.post<Rent[]>(`${this.apiUrl}/rentBook`,data,{headers:this.headers}).subscribe({error:(err)=>{this.errorSubject.next(err)}})
  }

  removeRent() {}

  searchRent() {}

  updateRent() {}

  getRentsByUserId(){
    return this.http.get<Rent[]>(`${this.apiUrl}/getRentalsByRequesterId`)// you can pass userId here, in my case am passing from backend
  }
}
