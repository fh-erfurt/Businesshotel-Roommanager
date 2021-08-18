import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking, ConferenceRoomBooking, HotelRoomBooking} from "./booking";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

/*
 * Service for booking management (Save, Get, Update, Delete) hotelRoomBookings and conferenceRoomBookings
 * Consumes booking, hotelRoomBooking and conferenceRoomBooking REST-APIs
 */
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

  public getBookingsByStartDateAndEndDate(startDate:string, endDate:string):Observable<Booking[]>
  {
    return this.http.get<Booking[]>(`${this.baseUrl}search/findByStartDateIsBetweenOrEndDateIsBetweenOrStartDateBeforeAndEndDateAfter?startDate=${startDate}&endDate=${endDate}`).pipe(
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

  public getBookingsByRoomNumber(id:number): Observable<Booking[]>
  {
    return this.http.get<Booking[]>(`${this.baseUrl}search/findByRoomNo?roomNo=${id}`).pipe(
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

  public getBookingsByEmpNo(id:number): Observable<Booking[]>
  {
    return this.http.get<Booking[]>(`${this.baseUrl}search/findByEmpNo?empNo=${id}`).pipe(
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

  public save(booking:Booking, bookingType:string)
  {
    console.log("save")
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

  public saveMy(booking: Booking, bookingType:string):Observable<Booking>
  {
    console.log("saveBooking")
    // console.log(booking);
    let url;

    // var finalBooking = {}

    console.log("this.baseUrl: ", this.baseUrl)

    // console.log("booking: ", JSON.stringify(booking))

    if(bookingType ==="hotelRoom")
    {
      url=this.hotelRoomBaseUrl;
      console.log("url: ", url)

      const finalBooking: HotelRoomBooking = {
        roomNo: booking.roomNo,
        pricing: booking.pricing,
        empNo: booking.empNo,
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
        specialWishes: booking.specialWishes,
        customerID: booking.customerID
      }
      console.log("booking: ", JSON.stringify(finalBooking))
      console.log("finalHotelRoomBooking: ", finalBooking)

      return this.http.post<Booking>(url, finalBooking)
        .pipe(
          map(
            (res)=>
            {
              console.log("res: ", res)
              return res;
            }
          )
        )

    } else {

      url=this.conferenceRoomBaseUrl;
      console.log("url: ", url)

      const finalBooking: ConferenceRoomBooking = {
        roomNo: booking.roomNo,
        pricing: booking.pricing,
        empNo: booking.empNo,
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
        specialWishes: booking.specialWishes,
        customerID: booking.customerID
      }
      console.log("booking: ", JSON.stringify(finalBooking))
      console.log("finalConferenceRoomBooking: ", finalBooking)

      return this.http.post<Booking>(url, finalBooking)
        .pipe(
          map(
            (res)=>
            {
              console.log("res: ", res)
              return res;
            }
          )
        )
    }

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

  public patchBookingsAtEmployeeDelete(bookingNo:number)
  {
    console.log(bookingNo);

    return this.http.patch<Booking>(`${this.baseUrl}${bookingNo}`, {empNo:1})
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



