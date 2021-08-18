import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Accountdetail} from "./accountdetail";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})

/*
* Service for accountdetail management (Save, Get, Update, Delete) of employee and customers
* Consumes accountdetail REST-API
*/
export class AccountdetailsService {

  lastInsertedID:number | undefined;
  private readonly baseUrl:string;

  constructor(private http: HttpClient) {
    this.baseUrl="http://localhost:8081/accountdetails/";
    this.lastInsertedID=0;
  }

  /*
  * function without params
  * returns all accountdetails
  */
  public getAllAccountdetails(): Observable<Accountdetail>
  {
    return this.http.get<Accountdetail>(`${this.baseUrl}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result._embedded.accountdetails;
      })
    )
  }

  /*
  * accountID as input param
  * returns accountdetails associated with accountID
  */
  public getAccountdetails(id:number): Observable<Accountdetail>
  {
    return this.http.get<Accountdetail>(`${this.baseUrl}${id}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result;
      })
    )
  }

  /*
  * username as input param
  * returns accountdetails associated with username
  */
  public getAccountdetailsByUsername(username:string): Observable<Accountdetail>
  {
    return this.http.get<Accountdetail>(`${this.baseUrl}search/findByUsername?username=${username}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result;
      })
    )
  }

  /*
  * accountdetails as input param
  * returns Observable containing the newly added Accountdetail entry
  */
  public save(accountdetails: Accountdetail): Observable<Accountdetail>
  {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(accountdetails.passwordHash, salt)
    accountdetails.passwordHash = passwordHash
    return this.http.post<Accountdetail>(this.baseUrl, accountdetails)
      .pipe(
        map(
          (res) => {
            console.log(res);
            return res;
          }
        )
      )
  }

  /*
  * accountID as input param
  * returns empty Observable after deleting the Accountdetail entry
  */
  public delete(id: number):Observable<Accountdetail>
  {
    return this.http.delete<Accountdetail>(`${this.baseUrl}${id}`)
      .pipe(
        map(
          (res)=>
          {
            console.log(res);
            return res;
          }
        )
      )
  }

  /*
  * accountID and accountDetail Object as input params
  * returns Observable containing the updated Accountdetail entry
  */
  public updateAccountdetails(id: number, accountdetails: Accountdetail):Observable<Accountdetail>
  {
    console.log(accountdetails);

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(accountdetails.passwordHash, salt)
    accountdetails.passwordHash = passwordHash

    return this.http.put<Accountdetail>(`${this.baseUrl}${id}`, accountdetails)
      .pipe(
        map(
          (res)=>
          {
            console.log(res);
            return res;
          }
        )
      )
  }

  /*
  * accountID and username as input params
  * returns Observable containing the Accountdetail entry with a changed username
  */
  public updateUsername(id: number, username: string):Observable<Accountdetail>
  {
    console.log(username);

    return this.http.patch<Accountdetail>(`${this.baseUrl}${id}`, {username:username})
      .pipe(
        map(
          (res)=>
          {
            console.log(res);
            return res;
          }
        )
      )
  }
}
