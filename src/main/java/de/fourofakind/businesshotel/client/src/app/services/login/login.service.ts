import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Accountdetail, Links} from "./login";
import {map} from "rxjs/operators";
import {RawData} from "../accountdetails/accountdetail";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  accountDetail!: Accountdetail;

  private baseUrl = "http://localhost:8081/accountdetails/"
  constructor(private http: HttpClient) { }

  public getAccount(username: string): Observable<Accountdetail | null>{
    return this.http.get<Accountdetail>(`${this.baseUrl}search/findByUsername?username=${username}`).pipe(
      map((result:any) =>{
        console.log("result", result);
        let account: Accountdetail;
        if(result.accountID)
        {
          account = {
            accountID: result.accountID,
            passwordHash: result.passwordHash,
            username: result.username,
          };

          return account;
        } else {
          return null;
        }
      })
    )
  }

  login(username: string, password: string) {
    this.getAccount(username).subscribe((data: Accountdetail | null)=>{

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
    }, (error)=>{
      alert("Errrorororo")
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
