import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/Book';
import { LogService } from './log.service';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `http://localhost:8080/api`;
  http: HttpClient = inject(HttpClient);
  //headers:HttpHeaders= new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`)
  errorSubject= new Subject<HttpErrorResponse>();
  logService= inject(LogService)
  headers:HttpHeaders=new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)


  //Method to fetch all book data
  fetchBooks() {
    return this.http.get<Book[]>(`${this.apiUrl}/getBooks`)
  }
  

  //Method to add book data to the database table
  addBook(data:any){
   return this.http.post<Book[]>(`${this.apiUrl}/saveBook`,data)
   //.subscribe({error:(err)=>{this.errorSubject.next(err)}})
  }

  // Method to remove Book data from database table
  removeBook(id:number){
   return this.http.delete(`${this.apiUrl}/deleteBook/${id}`,{ observe:'events',responseType:'json'})
  }

  //Method to search a Book from the database table 
  searchBook(id:number){
    return this.http.get(`${this.apiUrl}/getBook/+${id}`)
  }

  //Method to update book data 
  updateBook( data:Book,id:number|undefined,){
    return this.http.put(`${this.apiUrl}/updateBook/${id}`,data);
  }
}
