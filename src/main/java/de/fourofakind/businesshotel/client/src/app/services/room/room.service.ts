import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Room} from './room';
import {map} from "rxjs/operators";
import {Hotelroom} from "../hotelroom/hotelroom";
import {Conferenceroom} from "../conferenceroom/conferenceroom";


@Injectable({
  providedIn: 'root'
})

/**
 * Service for room management (Save, Get, Update, Delete) hotelRooms and conferenceRooms
*
 * Consumes room, hotelRoom and conferenceRoom REST-APIs
 */
export class RoomService {

  private readonly baseUrl: string;
  private readonly hotelRoomBaseUrl: string;
  private readonly conferenceRoomBaseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8081/room/";
    this.hotelRoomBaseUrl = "http://localhost:8081/hotelroom/";
    this.conferenceRoomBaseUrl = "http://localhost:8081/conferenceroom/";
  }

  /**
  * function without params
  *
  * returns all hotelrooms
  */
  public getHotelRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.hotelRoomBaseUrl}`).pipe(
      map((result: any) => {
        console.log(result);
        return result._embedded.hotelroom;
      })
    )
  }

  /**
  * function without params
  *
  * returns all conferencerooms
  */
  public getConferenceRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.conferenceRoomBaseUrl}`).pipe(
      map((result: any) => {
        console.log(result);
        return result._embedded.conferenceroom;
      })
    )
  }

  /**
  * roomNo as input param
  *
  * returns room associated with roomNo
  */
  public getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}${id}`).pipe(
      map((result: any) => {
        console.log(result);
        return result;
      })
    )
  }

  /**
  * roomNo as input param
  *
  * returns hotelRoom associated with roomNo
  */
  public getHotelRoom(id: number): Observable<Hotelroom> {
    return this.http.get<Hotelroom>(`${this.hotelRoomBaseUrl}${id}`).pipe(
      map((result: any) => {
        console.log(result);
        return result;
      })
    )
  }

  /**
  * roomNo as input param
  *
  * returns conferenceRoom associated with roomNo
  */
  public getConferenceRoom(id: number): Observable<Conferenceroom> {
    return this.http.get<Conferenceroom>(`${this.conferenceRoomBaseUrl}${id}`).pipe(
      map((result: any) => {
        console.log(result);
        return result;
      })
    )
  }

  /**
  * room and roomType (conferenceroom or hotelroom) as input params
  *
  * returns Observable containing the newly added Hotelroom or Conferenceroom entry
  */
  public save(room: Conferenceroom | Hotelroom, roomType: string): Observable<Hotelroom|Conferenceroom>
  {
    console.log(room);

    if (roomType === "HOTELROOM") {

      return this.http.post<Hotelroom>(this.hotelRoomBaseUrl, room)
        .pipe(
          map(
            (res) => {
              return res;
            }
          )
        )
    } else {

      return this.http.post<Conferenceroom>(this.conferenceRoomBaseUrl, room)
        .pipe(
          map(
            (res) => {
              return res;
            }
          )
        )
    }
  }


  /**
  * roomNo as input param
  *
  * returns empty Observable after deleting the Room entry
  */
  public delete(id: number): Observable<Room>
  {
          return this.http.delete<Room>(`${this.baseUrl}${id}`)
            .pipe(
              map(
                (res) => {
                  return res;
                }
              )
            )
  }


  /**
  * roomNo and roomtype (conferenceroom or hotelroom) and room Object as input params
  *
  * returns Observable containing the updated Hotelroom or Conferenceroom entry
  */
  public updateRoom(id: number, room: Conferenceroom | Hotelroom, roomType: string): Observable<Hotelroom|Conferenceroom>
  {
    console.log(room);

    if (roomType === "HOTELROOM") {

      return this.http.put<Hotelroom>(`${this.hotelRoomBaseUrl}${id}`, room)
        .pipe(
          map(
            (res) => {
              return res;
            }
          )
        )
    } else {

      return this.http.put<Conferenceroom>(`${this.conferenceRoomBaseUrl}${id}`, room)
        .pipe(
          map(
            (res) => {
              return res;
            }
          )
        )
    }
  }
}
