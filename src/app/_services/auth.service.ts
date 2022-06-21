import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:7000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'loginuser', {
      username,
      password
    }, httpOptions);
  }
  register(username: string, email: string, phonenumber: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'registeruser', {
      username,
      email,
      phonenumber,
      password
    }, httpOptions);
  }
}