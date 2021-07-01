import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HotelRoomBooking, RawData} from "./booking";
import {ConferenceRoomBooking} from "./booking";
import {Booking} from "./booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl:string;
  constructor(private http: HttpClient) {
    this.baseUrl="http://localhost:8081/booking/";
  }

  public getAllBookings(): Observable<RawData>
  {
    return this.http.get<RawData>(`${this.baseUrl}`)
  }

  public getBooking(id:number): Observable<RawData>
  {
    return this.http.get<RawData>(`${this.baseUrl}${id}`)
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
