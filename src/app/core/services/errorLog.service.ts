import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorLog } from "../models/ErrorLog";
@Injectable({providedIn:'root'})
export class ErrorLogService{
    private apiUrl = `http://localhost:8080/api`;
    constructor(private http:HttpClient){}
    getErrorLogs(){
        return this.http.get<ErrorLog[]>(`${this.apiUrl}/getErrorLogs`);
    }
    removeErrorLog(id:number|null){
    this.http.delete<any>(`${this.apiUrl}/removeErrorLog/+${id}`)
    }
}