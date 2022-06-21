import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { Airline } from '../_models/airline';
const AUTH_API = 'http://localhost:7000/';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  constructor(
    private http: HttpClient,
    private token: TokenStorageService
    ) { }
  
   GetAllAirlines(): Observable<any> {
    debugger;
    var authToken = this.token.getToken();
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get<any>(AUTH_API + 'airline', {headers: headers_object});
  } 

  AddAirline(airline: Airline)
  {
    debugger;
    var authToken = this.token.getToken();
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.post<any>(AUTH_API + 'addairline',airline, {headers: headers_object});
  }

  BlockAirline(airlineId:number)
  {
    debugger;
    var authToken = this.token.getToken();
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.put<any>(AUTH_API + 'blockairline?airlineId='+airlineId, {headers: headers_object});
  }

  UnBlockAirline(airlineId:number)
  {
    debugger;
    var authToken = this.token.getToken();
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.put<any>(AUTH_API + 'unblockairline?airlineId='+airlineId, {headers: headers_object});
  }

  DeleteAirline(airlineId:number)
  {
    var authToken = this.token.getToken();
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.delete<any>(AUTH_API + 'deleteairline?airlineId='+airlineId, {headers: headers_object});
  }
}