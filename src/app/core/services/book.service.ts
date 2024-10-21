import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
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


  //Method to fetch all book data
  fetchBooks() {
    let httpQueryParams=new HttpParams();
    httpQueryParams= httpQueryParams.set('page',2)
    httpQueryParams= httpQueryParams.set('items',10)
    return this.http.get<Book[]>(`${this.apiUrl}/getBooks`,{params:httpQueryParams,observe:'response'})
    .pipe(
      catchError(
        (err)=>{
          console.log(err)
       
          return throwError(()=>err);
        })
    );
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
