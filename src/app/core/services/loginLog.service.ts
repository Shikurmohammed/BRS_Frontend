import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class LoginLog{
    constructor(private http:HttpClient){}
    getLoginLogs(){
        return null;
    }
    removeLoginLog(){

    }
}