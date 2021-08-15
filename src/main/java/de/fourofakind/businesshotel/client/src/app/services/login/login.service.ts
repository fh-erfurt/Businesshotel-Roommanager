import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Accountdetail, Links} from "./login";
import {map} from "rxjs/operators";
import {RawData} from "../accountdetails/accountdetail";
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  accountDetail!: Accountdetail;
  equalPassword: boolean = true

  private baseUrl = "http://localhost:8081/accountdetails/"
  constructor(private http: HttpClient) { }

  public getAccount(username: string): Observable<Accountdetail | null>{
    console.log("getAccount 1")
    return this.http.get<Accountdetail>(`${this.baseUrl}search/findByUsername?username=${username}`).pipe(
      map((result:any) =>{
        console.log("getAccount 2")
        console.log("result", result);
        let account: Accountdetail;
        if(result.accountID)
        {
          console.log("getAccount 3")
          account = {
            accountID: result.accountID,
            passwordHash: result.passwordHash,
            username: result.username,
          };

          return account;
        } else {
          console.log("getAccount 4")
          return null;
        }
      })
    )
  }

  hashPassword = (password: string) => {
    return new Promise((resolve, reject) => {
      const saltRounds = 10;

      try{
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        });
      }
      catch(e){
        console.log('caught error', e);
        // Handle exceptions
      }
    });
  };

  login = (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      this.getAccount(username).subscribe((data: Accountdetail | null)=>{

        if (data !== null) {
          this.accountDetail = data as Accountdetail

          bcrypt.compare(password, this.accountDetail.passwordHash, (err, result) => {
            if (err) {
              reject("something unexpected happened: " + err)
            }
            if (result) {
              localStorage.setItem('user', username);
              localStorage.setItem('userID', String(this.accountDetail.accountID));
              resolve("Success: " + result)

            } else {
              reject("wrong password")
            }
          });
        } else {
          console.log("userdata not existing")
        }
        console.log(data)
      }, (error)=>{
        reject("username not found")
      })
    })
  }
}
