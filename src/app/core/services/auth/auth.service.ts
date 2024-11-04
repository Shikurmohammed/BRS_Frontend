import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //properties
  http: HttpClient = inject(HttpClient);
  private apiUrl = `http://localhost:8080/api`;
  jwtService: JwtService = inject(JwtService);
  private token: string | null = null;

  //Method to authenticate a user
  login(username: string, password: string): Observable<HttpResponse<any>> {
    const data = { username: username, password: password };
    return this.http.post<any>(`${this.apiUrl}/authenticate`, data, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'response',
    });
  }

  //Method to save token to local storage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  //Method to get an item with key 'token' from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //Method to logout a user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('Role');
  }

  //Method to validate if the current user is authenticated, using the stored token in local storage and its expiration time
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
    // --> !!token checks if the variable token is not empty, not null and undefined
    // --> token!=null checks only if token is not null, but it can't check if it is empty or undefined
  }

  //Method to check whether the stored token is expired
  isTokenExpired(token: string | null): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;
    const expiryDate = this.jwtService.getTokenExpirationTime(token);
    return expiryDate ? expiryDate < new Date() : false;
  }
  saveRole(role:string){
    localStorage.setItem("Role",role);
  }
  getRole(){
     return localStorage.getItem("Role");
  }

  route: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  redirectUser(userRole) {
    //this.user_role
    console.log("The tried ::",userRole)
    if (userRole && userRole!=null) {
      switch (userRole) {
        case 'ADMIN':
          this.route.navigateByUrl('/admin-dashboard');
          break;
        case 'LIBRARIAN':
          this.route.navigateByUrl('/librarian-dashboard');
          break;
        case 'USER':
          this.route.navigateByUrl('/users-home');
          break;
        case 'GUEST':
          this.route.navigateByUrl('/home');
          break;
        default:
          this.route.navigateByUrl('/login');
          break;
      }
    } else {
      this.route.navigateByUrl('/login');
    }
  }
}
