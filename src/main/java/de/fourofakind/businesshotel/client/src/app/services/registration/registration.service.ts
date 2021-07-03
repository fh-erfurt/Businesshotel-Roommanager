import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Accountdetail} from "../login/login";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  accountDetail!: Accountdetail;

  private baseUrl = "http://localhost:8081/accountdetails/search/findAccountDetailsByUsername"
  constructor(private http: HttpClient) { }

  public getAccount(username: string): Observable<Accountdetail>{
    return this.http.get<Accountdetail>(`${this.baseUrl}`, {
      params: {
        username: username
      }
    })

  }

  register(username: string, password: string) {
    this.getAccount(username).subscribe((data: Accountdetail)=>{


      if (data !== null) {
        this.accountDetail = data as Accountdetail

        if (this.accountDetail.passwordHash === password) {
          console.log("Success")
          localStorage.setItem('user', username);
          localStorage.setItem('userID', String(this.accountDetail.accountID));
          window.location.href = "";
        } else {
          console.log("Error Handling")
        }
      } else {
        console.log("Error Handling")
      }
      console.log(data)
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
