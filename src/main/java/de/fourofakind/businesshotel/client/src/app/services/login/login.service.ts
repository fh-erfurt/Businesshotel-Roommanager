import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {RootObject} from "../login/login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = "http://localhost:8081/accountdetails"
  constructor(private http: HttpClient) { }

  public getAccountDetails(): Observable<RootObject>{
    return this.http.get<RootObject>(`${this.baseUrl}`)
  }
}
