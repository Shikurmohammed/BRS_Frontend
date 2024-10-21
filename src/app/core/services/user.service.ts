import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    //properties
  http: HttpClient = inject(HttpClient);
  private apiUrl = `http://localhost:8080/api`;

  //methods
  fetchUser() {
    return this.http.get<User[]>(`${this.apiUrl}/getUsers`);
  }

  addUser(data:User) {
    return this.http.post<User>(`${this.apiUrl}/register`,data);
  }

  removeUser() {}

  searchUser() {}

  updateUser() {}
}
