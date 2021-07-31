import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "./booking";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly baseUrl:string;
  private readonly hotelRoomBaseUrl:string;
  private readonly conferenceRoomBaseUrl:string;
  constructor(private http: HttpClient) {
    this.baseUrl="http://localhost:8081/booking/";
    this.hotelRoomBaseUrl="http://localhost:8081/hotelRoomBooking/";
    this.conferenceRoomBaseUrl="http://localhost:8081/conferenceRoomBooking/";

  }

  public getBooking(id:number): Observable<Booking>
  {
    return this.http.get<Booking>(`${this.baseUrl}${id}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result;
      })
    )
  }

  public getBookingIDsByCustomerID(id:number): Observable<Booking[]>
  {
    return this.http.get<Booking[]>(`${this.baseUrl}search/findByCustomerID?customerID=${id}`).pipe(
      map((result:any) =>{
        console.log(result);

        return result;
      })
    )
  }

  public getConferenceRoomBookings(): Observable<Booking[]>
  {
    return this.http.get<Booking[]>(`${this.baseUrl}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result._embedded.conferenceRoomBookings;
      })
    )
  }

  public getHotelRoomBookings(): Observable<Booking[]>
  {
    return this.http.get<Booking[]>(`${this.baseUrl}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result._embedded.hotelRoomBookings;
      })
    )
  }

  public save(booking:Booking, bookingType:string)
  {
    console.log(booking);
    let url;

    if(bookingType ==="hotelRoom")
    {
      url=this.hotelRoomBaseUrl;
    }
    else
    {
      url=this.conferenceRoomBaseUrl;

    }

    this.http.post<Booking>(url, booking)
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


  public delete(id: number) {
    this.http.delete<Booking>(`${this.baseUrl}${id}`)
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
          console.log("Post call => Booking deletion successful");
        }
      )
  }

  public updateBooking(id: number, booking: Booking) {
    console.log(booking);

    this.http.put(`${this.baseUrl}${id}`, booking)
      .subscribe(
        (val)=>
        {
          console.log("Put call => successful value returned in body: ", val);
        },

        response=>
        {
          console.log("Put call => error in: ", response);
        },
        ()=>
        {
          console.log("Put call => Booking update successful");
        }
      )
  }



}



