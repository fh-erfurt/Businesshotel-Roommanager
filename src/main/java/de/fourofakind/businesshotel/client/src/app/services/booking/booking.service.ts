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

  public saveBooking(booking:Booking, bookingType:string)
  {
    if(bookingType ==="hotelRoom")
    {
      this.save(booking,this.hotelRoomBaseUrl);
    }
    else
    {
      this.save(booking,this.conferenceRoomBaseUrl);

    }
  }

  public save(booking: Booking, url: string) {
    console.log(booking);

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


  /*public createBooking(booking: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, booking);
  }

  updateBooking(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}${id}`, value);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}`, { responseType: 'text' });
  }*/


}
