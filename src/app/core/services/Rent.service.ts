import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Rent } from "../models/Rent";

@Injectable({providedIn:'root'})
export class RentService{
  http:HttpClient= inject(HttpClient);
  private apiUrl = `http://localhost:8080/api`;
  headers:HttpHeaders=new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
  errorSubject= new Subject<HttpErrorResponse>();

  //Method to fetch book rent data
  fetchRents(){
    return this.http.get<Rent[]>(`${this.apiUrl}/getRentList`,{headers:this.headers});
  }

  //Method to add Rent data to the database table
  addRent(data:Rent){
    //this.http.post<Rent[]>(`${this.apiUrl}/rentBook`,data,{headers:this.headers}).subscribe({error:(err)=>{this.errorSubject.next(err)}})
  }

  // Method to remove Rent data from database table
  removeRent(){

  }

  //Method to search a Rent from the database table 
  searchRent(){

  }

  //Method to update Rent data 
  updateRent(){

  }
}