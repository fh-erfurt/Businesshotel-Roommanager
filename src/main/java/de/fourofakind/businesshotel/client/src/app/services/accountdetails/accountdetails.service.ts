import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Accountdetails} from "./accountdetails";

@Injectable({
  providedIn: 'root'
})
export class AccountdetailsService {

  private readonly baseUrl:string;
  constructor(private http: HttpClient) {
    this.baseUrl="http://localhost:8081/accountdetails/";
  }

  public save(accountdetails: Accountdetails) {
    console.log(accountdetails);

    this.http.post<Accountdetails>(this.baseUrl, accountdetails)
      .subscribe(
        (val)=>
        {
          console.log("Post call => successful value returned in body: ", val);
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
  }
}
