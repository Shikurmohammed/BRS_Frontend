import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `http://localhost:8080/api`;
  http: HttpClient = inject(HttpClient);
  headers:HttpHeaders= new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`)

  //Method to fetch all book data
  fetchBooks() {
    return this.http.get<Book[]>(`${this.apiUrl}/getBooks`,{headers:this.headers});
  }

  //Method to add book data to the database table
  addBook(data:Book){
   return this.http.post<Book[]>(`${this.apiUrl}/saveBook`,data,{headers:this.headers})
  }

  // Method to remove Book data from database table
  removeBook(id:number){
   return this.http.delete(`${this.apiUrl}/deleteBook/${id}`,{headers:this.headers})
  }

  //Method to search a Book from the database table 
  searchBook(id:number){
    return this.http.get(`${this.apiUrl}/searchBook`,{headers:this.headers})
  }

  //Method to update book data 
  updateBook(data:NgForm){
    return this.http.put(`${this.apiUrl}/updateBook`,{headers:this.headers});
  }
}
