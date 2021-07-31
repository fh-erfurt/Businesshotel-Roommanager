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

  public getBookingsByCustomerID(id:number): Observable<Booking[]>
  {
    return this.http.get<Booking[]>(`${this.baseUrl}search/findByCustomerID?customerID=${id}`).pipe(
      map((result:any) =>{
        console.log(result);
        let bookings=[];
        if(result._embedded.conferenceRoomBooking && result._embedded.hotelRoomBooking)
        {
          bookings=result._embedded.conferenceRoomBooking.concat(result._embedded.hotelRoomBooking);
        }
        else if(result._embedded.conferenceRoomBooking) bookings=result._embedded.conferenceRoomBooking
        else if(result._embedded.hotelRoomBooking) bookings=result._embedded.hotelRoomBooking

        return bookings;
      })
    )
  }

  public getBookings(): Observable<Booking[]>
  {
    return this.http.get<Booking[]>(this.baseUrl).pipe(
      map((result:any) =>{
        console.log(result);
        let bookings=[];
        if(result._embedded.conferenceRoomBooking && result._embedded.hotelRoomBooking)
        {
          bookings=result._embedded.conferenceRoomBooking.concat(result._embedded.hotelRoomBooking);
        }
        else if(result._embedded.conferenceRoomBooking) bookings=result._embedded.conferenceRoomBooking
        else if(result._embedded.hotelRoomBooking) bookings=result._embedded.hotelRoomBooking

        return bookings;
      })
    )
  }

  // public getConferenceRoomBookings(): Observable<Booking[]>
  // {
  //   return this.http.get<Booking[]>(`${this.baseUrl}`).pipe(
  //     map((result:any) =>{
  //       //console.log(result);
  //       return result._embedded.conferenceRoomBookings;
  //     })
  //   )
  // }
  //
  // public getHotelRoomBookings(): Observable<Booking[]>
  // {
  //   return this.http.get<Booking[]>(`${this.baseUrl}`).pipe(
  //     map((result:any) =>{
  //       //console.log(result);
  //       return result._embedded.hotelRoomBookings;
  //     })
  //   )
  // }

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

    return this.http.post<Booking>(url, booking)
      .pipe(
        map(
          (res)=>
          {
            return res;
          }
        )
      )


  }


  public delete(id: number) {
    return this.http.delete<Booking>(`${this.baseUrl}${id}`)
      .pipe(
        map(
          (res)=>
          {
            return res;
          }
        )
      )
  }

  public updateBooking(id: number, booking: Booking) {
    console.log(booking);

    console.log(booking);

    return this.http.put<Booking>(`${this.baseUrl}${id}`, booking)
      .pipe(
        map(
          (res)=>
          {
            return res;
          }
        )
      )
  }

  public patchBookingsAtCustomerDelete(bookingNo:number)
  {
    console.log(bookingNo);

    return this.http.patch<Booking>(`${this.baseUrl}${bookingNo}`, {customerID:1})
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



