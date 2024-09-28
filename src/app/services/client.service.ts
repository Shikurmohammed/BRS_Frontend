import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class ClientService{
    http:HttpClient=inject(HttpClient);
    headers:HttpHeaders= new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    private apiUrl=`http://localhost:8080/api`;
    //Method to fetch client data
    fetchClient(){
        this.http.get(`${this.apiUrl}/getClients`,{headers:this.headers})
    }
      //Method to add Client data to the database table
  addClient(){

  }

  // Method to remove Client data from database table
  removeClient(){

  }

  //Method to search a Client from the database table 
  searchClient(){

  }

  //Method to update Client data 
  updateClient(){

  }
}