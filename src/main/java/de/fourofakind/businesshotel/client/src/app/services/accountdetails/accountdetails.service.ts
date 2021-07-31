import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Accountdetails} from "./accountdetails";
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

  public getAllAccountdetails(): Observable<Accountdetails>
  {
    return this.http.get<Accountdetails>(`${this.baseUrl}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result._embedded.accountdetails;
      })
    )
  }

  public getAccountdetails(id:number): Observable<Accountdetails>
  {
    return this.http.get<Accountdetails>(`${this.baseUrl}${id}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result;
      })
    )
  }

  public getAccountdetailsByUsername(username:string): Observable<Accountdetails>
  {
    return this.http.get<Accountdetails>(`${this.baseUrl}search/findByUsername?username=${username}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result;
      })
    )
  }

  public save(accountdetails: Accountdetails):Observable<Accountdetails>
  {
    console.log(accountdetails);

    return this.http.post<Accountdetails>(this.baseUrl, accountdetails)
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

  public delete(id: number):Observable<Accountdetails>
  {
    return this.http.delete<Accountdetails>(`${this.baseUrl}${id}`)
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

  public updateAccountdetails(id: number, accountdetails: Accountdetails)
  {
    console.log(accountdetails);

    return this.http.put<Accountdetails>(`${this.baseUrl}${id}`, accountdetails)
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

    return this.http.patch<Accountdetails>(`${this.baseUrl}${id}`, {username:username})
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
