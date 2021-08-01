import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Bookingrequest, RootObject} from "./bookingrequest";
import {map} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class BookingrequestService {

  private readonly baseUrl:string;
  private readonly roomBaseUrl:string;


  constructor(private http: HttpClient)
  {
    this.roomBaseUrl = "http://localhost:8081/room";
    this.baseUrl="http://localhost:8081/bookingrequest/";

  }

  getRooms(): Observable<RootObject>{
    return this.http.get<RootObject>(`${this.baseUrl}`)
  }

  public getBookingRequestIDsByCustomerID(id:number): Observable<Bookingrequest[]>
  {
    return this.http.get<Bookingrequest[]>(`${this.baseUrl}search/findByCustomerID?customerID=${id}`).pipe(
      map((result:any) =>{
        console.log(result);
        return result._embedded.bookingrequest;
      })
    )
  }

  public patchBookingRequestsAtCustomerDelete(bookingRequestNo:number)
  {
    console.log(bookingRequestNo);

    return this.http.patch<Bookingrequest>(`${this.baseUrl}${bookingRequestNo}`, {customerID:1})
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
