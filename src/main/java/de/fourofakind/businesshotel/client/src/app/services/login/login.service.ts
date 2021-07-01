import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {RootObject} from "../login/login";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = "http://localhost:8081/accountdetails"
  constructor(private http: HttpClient) { }

  public getAccount(): Observable<RootObject>{
    return this.http.get<RootObject>(`${this.baseUrl}`, {
      params: {
        username: "Marius Mac Mac"
      },
      observe: 'response'
    })

  }

  login(username: string, password: string) {



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
