import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 http:HttpClient= inject(HttpClient);
private apiUrl = `http://localhost:8080/api`;

private token: string | null=null;
login(username:string, password:string):Observable<HttpResponse<any>>{
  const data={username:username, password:password}


  return this.http.post<any>(`${this.apiUrl}/authenticate`,data
    ,{
    headers: { 'Content-Type': 'application/json' },observe:'response'}
  )
  .pipe(
    tap((response)=>{
      this.token=response.body?.token;
      this.saveToken(this.token!)
    }),
    catchError(this.handleError)
  );
}

saveToken(token:string ):void{
  localStorage.setItem('token',token)
}
getToken():string |null{
  return localStorage.getItem('token')
}

logout():void{
  localStorage.removeItem('token');
}
isAuthenticated():boolean{
  return this.token!=null;
}




handleError(error:HttpResponse<any>){
  let errorMessage = 'An unknown error occurred!';
  console.log(error.status)
  if (error.status ) {
    // Client-side error
   
    errorMessage = `Error: ${error.status}`;
  } else {
    // Server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.status}`;
  }
  return throwError(errorMessage); // Return a user-friendly error message

}
}
