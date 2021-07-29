import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Room } from './room';
import {Booking} from "../booking/booking";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = "http://localhost:8081/room/"

  constructor(private http: HttpClient) { }

  public getHotelRooms(): Observable<Room[]>{
    return this.http.get<Room[]>(`${this.baseUrl}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result._embedded.hotelroom;
      })
    )
  }

  public getConferenceRooms(): Observable<Room[]>{
    return this.http.get<Room[]>(`${this.baseUrl}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result._embedded.conferenceroom;
      })
    )
  }

  public getRoom(id:number): Observable<Room>{
    return this.http.get<Room>(`${this.baseUrl}${id}`).pipe(
      map((result:any) =>{
        console.log(result);
        return result;
      })
    )
  }

  // public getRooms(): Observable<Room[]>{
  //   let result:Room[] = [];
  //   result.push(this.getHotelRooms())
  //
  // }

}
