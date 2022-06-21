import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { Inventory } from '../_models/inventory';
import { BookingPassenger } from '../_models/booking-passenger';
const AUTH_API = 'http://localhost:7000/';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private http: HttpClient,
    private token: TokenStorageService
  ) { }

  GetAllInventories(): Observable<any> {
    debugger;
    var authToken = this.token.getToken();
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get<any>(AUTH_API + 'inventory', {headers: headers_object});
  } 
  SearchInventory(source:string,destination:string,startDateTime:Date,round:boolean,endDateTime? :Date): Observable<any> 
  {
    debugger;
    var authToken = this.token.getToken();
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
   if(round == false && endDateTime == null)
    {
      var body = {
      "From" : source,
      "To" : destination,
      "StartTime" : startDateTime,
      "IsRoundTrip" : round
    }
    return this.http.post<any>(AUTH_API + 'searchflight',body, {headers: headers_object});
  
    }
    else{
      var roundbody = {
        "From" : source,
        "To" : destination,
        "StartTime" : startDateTime,
        "IsRoundTrip" : round,
        "ReturnStartTime" : endDateTime
      }
      return this.http.post<any>(AUTH_API + 'searchflight',roundbody, {headers: headers_object});
  
    }
    }
  AddInventory(inventory: Inventory)
  {
    var authToken = this.token.getToken();
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.post<any>(AUTH_API + 'addinventory',inventory, {headers: headers_object});
  }

  DeleteInventory(inventoryId:number)
  {
    var authToken = this.token.getToken();
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.delete<any>(AUTH_API + 'deleteinventory?inventoryId='+inventoryId, {headers: headers_object});
  }
  GetInventory(inventoryId:number)
  {
    var authToken = this.token.getToken();
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.get<Inventory>(AUTH_API + 'getinventorybyid?inventoryId='+inventoryId, {headers: headers_object});
  }
}
