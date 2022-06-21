import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { BookingPassenger } from '../_models/booking-passenger';
const AUTH_API = 'http://localhost:7000/';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient,
    private token: TokenStorageService
  ) { }

  GetAllTickets(name:string): Observable<any> {
    debugger;
    var authToken = this.token.getToken();
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get<any>(AUTH_API + 'getbookingdetailsbyname?name='+name, {headers: headers_object});
  } 

  AddBooking(booking: BookingPassenger)
  {
    debugger;
    var authToken = this.token.getToken();
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.post<string>(AUTH_API + 'addbooking',booking, {headers: headers_object});
  }

  DeleteTicket(pnr:string)
  {
    var authToken = this.token.getToken();
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.delete<any>(AUTH_API + 'deletebooking?pnr='+pnr, {headers: headers_object});
  }
}
