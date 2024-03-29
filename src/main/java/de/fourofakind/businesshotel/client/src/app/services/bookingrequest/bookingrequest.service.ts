import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Bookingrequest, RootObject} from "./bookingrequest";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

/**
 * Service for bookingRequest management (Save, Get, Update, Delete) hotelRoomBookings and conferenceRoomBookings
 * Consumes room, bookingrequest, hotelRoomBooking and conferenceRoomBooking REST-APIs
 */

export class BookingrequestService {

  private readonly baseUrl:string;
  private readonly roomBaseUrl:string;
  private readonly hotelRoomBaseUrl:string;
  private readonly conferenceRoomBaseUrl:string;


  constructor(private http: HttpClient)
  {
    this.roomBaseUrl = "http://localhost:8081/room";
    this.baseUrl="http://localhost:8081/bookingrequest/";
    this.hotelRoomBaseUrl="http://localhost:8081/hotelRoomBooking/";
    this.conferenceRoomBaseUrl="http://localhost:8081/conferenceRoomBooking/";

  }

  /**
   * returns Booking associated with bookingNo
   *
   * @param id bookingNo to be searched for
   */
  getRooms(): Observable<RootObject>{
    return this.http.get<RootObject>(`${this.baseUrl}`)
  }

  public save(bookingRequest:Bookingrequest)
  {


    return this.http.post<Bookingrequest>(this.baseUrl, bookingRequest)
      .pipe(
        map(
          (res)=>
          {
            return res;
          }
        )
      )


  }

  public getBookingRequestIDsByCustomerID(id:number): Observable<Bookingrequest[]>
  {
    return this.http.get<Bookingrequest[]>(`${this.baseUrl}search/findByCustomerID?customerID=${id}`).pipe(
      map((result:any) =>{

        return result._embedded.bookingrequest;
      })
    )
  }

  public patchBookingRequestsAtCustomerDelete(bookingRequestNo:number)
  {


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
