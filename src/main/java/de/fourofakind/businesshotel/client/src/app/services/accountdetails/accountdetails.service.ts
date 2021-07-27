import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Accountdetails} from "./accountdetails";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountdetailsService {

  private readonly baseUrl:string;
  constructor(private http: HttpClient) {
    this.baseUrl="http://localhost:8081/accountdetails/";
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

  public save(accountdetails: Accountdetails) {
    console.log(accountdetails);

    let returnValue!: Accountdetails;

    this.http.post<Accountdetails>(this.baseUrl, accountdetails)
      .subscribe(
        (val)=>
        {
          console.log("Post call => successful value returned in body: ", val);
          console.log("accountID: ", val.accountID);
          return val.accountID;
        },

        response=>
        {
          console.log("Post call => error in: ", response);
        },
        ()=>
        {
          console.log("Post call => Booking creation successful");
        }
      )

    return returnValue;
  }
}
