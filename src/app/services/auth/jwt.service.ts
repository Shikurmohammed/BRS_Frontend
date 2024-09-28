import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }
    //Decode the token to extract the claims and expiry  .. (if jwt is used to generate it)
    getTokenExpirationTime(token: string): Date | null {
      const decoded: any = jwtDecode(token);
      if (decoded.exp===undefined) {
        return null;
      }
      const date = new Date(0);//initializes the date variable to the unix epoch
      date.setUTCSeconds(decoded.exp);//sets the expiration time based on decoded.exp (since unix epoch(1970:00:00))
      return date;
    }
  
   
}
