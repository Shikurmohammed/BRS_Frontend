import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class AuditLog{
    constructor(private http:HttpClient){}
    getAuditLogs(){
        return null;
    }
    removeAuditLog(){

    }
}