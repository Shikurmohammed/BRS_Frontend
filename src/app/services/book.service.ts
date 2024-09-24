import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `http://localhost:8080/api`;
  http: HttpClient = inject(HttpClient);
  headers:HttpHeaders= new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`)
  fetchBooks() {

    return this.http.get<Book[]>(`${this.apiUrl}/getBooks`,{headers:this.headers});
  }
}
