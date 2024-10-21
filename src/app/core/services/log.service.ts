import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
@Injectable({providedIn:'root'})
export class LogService{
    http:HttpClient=inject(HttpClient);
    private apiUrl = `http://localhost:8080/api`;
    logError(data:{message:string, level:string, time:Date}){
        this.http.post(`${this.apiUrl}/saveLog`,data).subscribe()
    }
    fetchError(){
    }
}