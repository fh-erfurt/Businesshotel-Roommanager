import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking, ConferenceRoomBooking, HotelRoomBooking} from "./booking";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

/**
 * Service for booking management (Save)
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


  /**
   * returns Booking associated with bookingNo
   *
   * @param id bookingNo to be searched for
   */
  public getBooking(id:number): Observable<Booking>
  {
    return this.http.get<Booking>(`${this.baseUrl}${id}`).pipe(
      map((result:any) =>{
        return result;
      })
    )
  }


  /**
   * returns all Bookings that collide with the timeframe between startTimeStamp and endTimeStamp
   *
   * @param startTimeStamp begin of time period to be checked
   * @param endTimeStamp end of time period to be checked
   */
  public getBookingsByStartDateAndEndDate(startTimeStamp:string, endTimeStamp:string):Observable<Booking[]>
  {
    return this.http.get<Booking[]>(`${this.baseUrl}search/findByStartDateIsBetweenOrEndDateIsBetweenOrStartDateBeforeAndEndDateAfter?startDate=${startTimeStamp}&endDate=${endTimeStamp}`).pipe(
      map((result:any) =>{
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


  /**
   * returns all Bookings associated with customerID
   *
   * @param id customerID to be searched for
   */
  public getBookingsByCustomerID(id:number): Observable<Booking[]>
  {
    return this.http.get<Booking[]>(`${this.baseUrl}search/findByCustomerID?customerID=${id}`).pipe(
      map((result:any) =>{
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

  /**
   * returns all Bookings associated with roomNo
   *
   * @param id roomNo to be searched for
   */
  public getBookingsByRoomNumber(id:number): Observable<Booking[]>
  {
    return this.http.get<Booking[]>(`${this.baseUrl}search/findByRoomNo?roomNo=${id}`).pipe(
      map((result:any) =>{
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


  /**
   * returns all Bookings associated with empNo
   *
   * @param id empNo to be searched for
   */
  public getBookingsByEmpNo(id:number): Observable<Booking[]>
  {
    return this.http.get<Booking[]>(`${this.baseUrl}search/findByEmpNo?empNo=${id}`).pipe(
      map((result:any) =>{
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

  /**
  * returns all bookings (hotelroom and conferenceroom)
  */
  public getBookings(): Observable<Booking[]>
  {
    return this.http.get<Booking[]>(this.baseUrl).pipe(
      map((result:any) =>{
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


  /**
   * returns Observable containing the newly added Booking entry
   *
   * @param booking data to be inserted
   * @param bookingType type of room to be inserted
   */
  public save(booking:Booking, bookingType:string):Observable<Booking>
  {
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


  /**
   * returns Observable containing the newly added Booking entry
   *
   * @param booking data to be inserted
   * @param bookingType type of room to be inserted
   */
  public saveMy(booking: Booking, bookingType:string):Observable<Booking>
  {
    let url;


    if(bookingType ==="hotelRoom")
    {
      url=this.hotelRoomBaseUrl;

      const finalBooking: HotelRoomBooking = {
        roomNo: booking.roomNo,
        pricing: booking.pricing,
        empNo: booking.empNo,
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
        specialWishes: booking.specialWishes,
        customerID: booking.customerID
      }

      return this.http.post<Booking>(url, finalBooking)
        .pipe(
          map(
            (res)=>
            {
              return res;
            }
          )
        )

    } else {

      url=this.conferenceRoomBaseUrl;

      const finalBooking: ConferenceRoomBooking = {
        roomNo: booking.roomNo,
        pricing: booking.pricing,
        empNo: booking.empNo,
        startDate: new Date(booking.startDate),
        endDate: new Date(booking.endDate),
        specialWishes: booking.specialWishes,
        customerID: booking.customerID
      }

      return this.http.post<Booking>(url, finalBooking)
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


  /**
   * returns empty Observable after deleting the Booking entry
   *
   * @param id bookingNo of booking to be deleted
   */
  public delete(id: number):Observable<Booking> {
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


  /**
   * returns Observable containing the updated Booking entry
   *
   * @param id bookingNo of booking to be updated
   * @param booking data to be updated
   */
  public updateBooking(id: number, booking: Booking):Observable<Booking> {

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


  /**
   * sets customerID of booking associated with bookingNo to 1 (special entry in Customer table to archive bookings of deleted customer accounts)
   *
   * @param bookingNo bookingNo of booking to be patched
   */
  public patchBookingsAtCustomerDelete(bookingNo:number):Observable<Booking>
  {

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


  /**
   * sets empNo of booking associated with bookingNo to 1 (special entry in Employee table to archive bookings of deleted employee accounts)
   *
   * @param bookingNo bookingNo of booking to be patched
   */
  public patchBookingsAtEmployeeDelete(bookingNo:number):Observable<Booking>
  {

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



