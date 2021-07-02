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
  constructor(private http: HttpClient) {
    this.baseUrl="http://localhost:8081/booking/";
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

  public save(booking: Booking) {
    return this.http.post<Booking>(this.baseUrl, booking);
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
