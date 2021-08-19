import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Accountdetail} from "./accountdetail";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})

/**
* Service for accountdetail management (Save, Get, Update, Delete) of employee and customers
*
* Consumes accountdetail REST-API
*/
export class AccountdetailsService {

  lastInsertedID:number | undefined;
  private readonly baseUrl:string;

  constructor(private http: HttpClient) {
    this.baseUrl="http://localhost:8081/accountdetails/";
    this.lastInsertedID=0;
  }

  /**
  * function without params
  *
  * returns all accountdetails
  */
  public getAllAccountdetails(): Observable<Accountdetail>
  {
    return this.http.get<Accountdetail>(`${this.baseUrl}`).pipe(
      map((result:any) =>{
        return result._embedded.accountdetails;
      })
    )
  }


  /**
   * returns accountdetails associated with accountID
   *
   * @param id accountID to be searched for
   */
  public getAccountdetails(id:number): Observable<Accountdetail>
  {
    return this.http.get<Accountdetail>(`${this.baseUrl}${id}`).pipe(
      map((result:any) =>{
        return result;
      })
    )
  }


  /**
   * returns accountdetails associated with username
   *
   * @param username username to be searched for
   */
  public getAccountdetailsByUsername(username:string): Observable<Accountdetail>
  {
    return this.http.get<Accountdetail>(`${this.baseUrl}search/findByUsername?username=${username}`).pipe(
      map((result:any) =>{
        return result;
      })
    )
  }


  /**
   * returns Observable containing the newly added Accountdetail entry
   *
   * @param accountdetails accountdetails to be inserted
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
            return res;
          }
        )
      )
  }

  /**
   * returns empty Observable after deleting the Accountdetail entry
   *
   * @param id accountID of accountdetail entry to be deleted
   */
  public delete(id: number):Observable<Accountdetail>
  {
    return this.http.delete<Accountdetail>(`${this.baseUrl}${id}`)
      .pipe(
        map(
          (res)=>
          {
            return res;
          }
        )
      )
  }


  /**
   *
   * @param id accountID of accountDetail to be updated
   * @param accountdetails data to be updated
   */
  public updateAccountdetails(id: number, accountdetails: Accountdetail):Observable<Accountdetail>
  {

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(accountdetails.passwordHash, salt)
    accountdetails.passwordHash = passwordHash

    return this.http.put<Accountdetail>(`${this.baseUrl}${id}`, accountdetails)
      .pipe(
        map(
          (res)=>
          {
            return res;
          }
        )
      )
  }


  /**
   *
   * @param id accountID of accountDetail to be updated
   * @param username data to be updated
   */
  public updateUsername(id: number, username: string):Observable<Accountdetail>
  {

    return this.http.patch<Accountdetail>(`${this.baseUrl}${id}`, {username:username})
      .pipe(
        map(
          (res)=>
          {
            return res;
          }
        )
      )
  }
}
