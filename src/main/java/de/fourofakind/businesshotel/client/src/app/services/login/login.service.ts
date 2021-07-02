import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
// import {Accountdetail, RootObject} from "../login/login";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Data} from "@angular/router";
import {Accountdetails} from "../accountdetails/accountdetails";
import {Accountdetail} from "./login";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  accountDetail!: Accountdetail;

  private baseUrl = "http://localhost:8081/accountdetails/search"
  constructor(private http: HttpClient) { }

  public getAccount(): Observable<Accountdetail>{
    return this.http.get<Accountdetail>(`${this.baseUrl}`, {
      params: {
        username: "Marius Mac Mac"
      }
    })

  }

  login(username: string, password: string) {
    this.getAccount().subscribe((data: Accountdetail)=>{
      this.accountDetail = data as Accountdetail

      alert(data.username)
    })


    // this.getAccountDetails().subscribe((data: RootObject)=> {
    //   for (accountdetails of data._embedded.accountdetails) {
    //
    //   }
    // })

    // return this.http.post<RootObject>(`${environment.apiUrl}/accountdetails`, { username, password })
    //   .pipe(map(user => {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('user', JSON.stringify(user));
    //     // this.userSubject.next(user);
    //     return user;
    //   }));
  }
}
