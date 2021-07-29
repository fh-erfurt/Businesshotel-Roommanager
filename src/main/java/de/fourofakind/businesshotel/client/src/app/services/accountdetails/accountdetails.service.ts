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

  public save(accountdetails: Accountdetails)
  {
    console.log(accountdetails);

    let promise= new Promise<void>((resolve, reject) =>
    {
      this.http.post<Accountdetails>(this.baseUrl, accountdetails)
        .toPromise()
        .then(
          response=>
          {
            console.log(response);
            this.lastInsertedID=response.accountID;
            resolve();
          },
          error=>
          {
            reject(error);
          }
        )
    })

    return promise;
  }
}
