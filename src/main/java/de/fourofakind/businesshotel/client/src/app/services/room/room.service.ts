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
  * returns all hotelrooms
  */
  public getHotelRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.hotelRoomBaseUrl}`).pipe(
      map((result: any) => {
        return result._embedded.hotelroom;
      })
    )
  }

  /**
  * returns all conferencerooms
  */
  public getConferenceRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.conferenceRoomBaseUrl}`).pipe(
      map((result: any) => {
        return result._embedded.conferenceroom;
      })
    )
  }



  /**
   * returns room associated with roomNo
   *
   * @param id roomNo to be searched for
   */
  public getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}${id}`).pipe(
      map((result: any) => {
        return result;
      })
    )
  }



  /**
   * returns hotelRoom associated with roomNo
   *
   * @param id roomNo to be searched for
   */
  public getHotelRoom(id: number): Observable<Hotelroom> {
    return this.http.get<Hotelroom>(`${this.hotelRoomBaseUrl}${id}`).pipe(
      map((result: any) => {
        return result;
      })
    )
  }



  /**
   * returns conferenceRoom associated with roomNo
   *
   * @param id roomNo to be searched for
   */
  public getConferenceRoom(id: number): Observable<Conferenceroom> {
    return this.http.get<Conferenceroom>(`${this.conferenceRoomBaseUrl}${id}`).pipe(
      map((result: any) => {
        return result;
      })
    )
  }


  /**
   * returns Observable containing the newly added Hotelroom or Conferenceroom entry
   *
   * @param room data to be inserted
   * @param roomType roomtype to be inserted
   */
  public save(room: Conferenceroom | Hotelroom, roomType: string): Observable<Hotelroom|Conferenceroom>
  {

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
   * returns empty Observable after deleting the Room entry
   *
   * @param id roomNo of room to be deleted
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
   * returns Observable containing the updated Hotelroom or Conferenceroom entry
   *
   * @param id roomNo of room to be updated
   * @param room data to be updated
   * @param roomType roomtype of room to be updated
   */
  public updateRoom(id: number, room: Conferenceroom | Hotelroom, roomType: string): Observable<Hotelroom|Conferenceroom>
  {

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
