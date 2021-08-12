import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Accountdetail} from "./accountdetail";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountdetailsService {

  lastInsertedID:number | undefined;
  private readonly baseUrl:string;

  constructor(private http: HttpClient) {
    this.baseUrl="http://localhost:8081/accountdetails/";
    this.lastInsertedID=0;
  }

  public getAllAccountdetails(): Observable<Accountdetail>
  {
    return this.http.get<Accountdetail>(`${this.baseUrl}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result._embedded.accountdetails;
      })
    )
  }

  public getAccountdetails(id:number): Observable<Accountdetail>
  {
    return this.http.get<Accountdetail>(`${this.baseUrl}${id}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result;
      })
    )
  }

  public getAccountdetailsByUsername(username:string): Observable<Accountdetail>
  {
    return this.http.get<Accountdetail>(`${this.baseUrl}search/findByUsername?username=${username}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result;
      })
    )
  }

  public save(accountdetails: Accountdetail):Observable<Accountdetail>
  {
    console.log(accountdetails);

    return this.http.post<Accountdetail>(this.baseUrl, accountdetails)
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

  public updateAccountdetails(id: number, accountdetails: Accountdetail)
  {
    console.log(accountdetails);

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

  public updateUsername(id: number, username: string)
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
