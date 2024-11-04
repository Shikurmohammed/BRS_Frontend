import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BorrowRequest } from '../models/borrowRequest';
@Injectable({
  providedIn: 'root',
})
export class BorrowRequestService {
  private apiUrl = `http://localhost:8080/api`;
  http: HttpClient = inject(HttpClient);

  fetchRequests() {
    return this.http.get<BorrowRequest[]>(`${this.apiUrl}/getBorrowRequests`)
  }

  addRequest(book_id:number){
   return this.http.post(`${this.apiUrl}/saveBorrowRequest`,book_id)
  }

  removeRequest(id:number){
   return this.http.delete(`${this.apiUrl}/deleteBorrowRequest/${id}`)
  }

  searchRequest(id:number){
    return this.http.get(`${this.apiUrl}/getBorrowRequest/+${id}`)
  }
  fetchRequestsByRequesterId(){
    return this.http.get(`${this.apiUrl}/getBorrowRequestByRequesterId`);//you can pass client id or pass it from the authentication object of the server
  }

  updateRequest( data:BorrowRequest,id:number|undefined,){
    return this.http.put(`${this.apiUrl}/updateBorrowRequest/${id}`,data);
  }
  approveRequest(id:number){
    return this.http.put(`${this.apiUrl}/approveBorrowRequest`,id);
  }
  rejectRequest(id:number){
    return this.http.put(`${this.apiUrl}/rejectBorrowRequest`,id);
  }
}
