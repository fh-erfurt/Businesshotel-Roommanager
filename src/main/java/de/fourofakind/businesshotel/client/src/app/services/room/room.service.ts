import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Room } from './room';
import {map} from "rxjs/operators";
import {Hotelroom} from "../hotelroom/hotelroom";
import {Conferenceroom} from "../conferenceroom/conferenceroom";


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private readonly baseUrl:string;
  private readonly hotelRoomBaseUrl:string;
  private readonly conferenceRoomBaseUrl:string;

  constructor(private http: HttpClient)
  {
    this.baseUrl="http://localhost:8081/room/";
    this.hotelRoomBaseUrl="http://localhost:8081/hotelroom/";
    this.conferenceRoomBaseUrl="http://localhost:8081/conferenceroom/";
  }

  public getHotelRooms(): Observable<Room[]>{
    return this.http.get<Room[]>(`${this.hotelRoomBaseUrl}`).pipe(
      map((result:any) =>{
        console.log(result);
        return result._embedded.hotelroom;
      })
    )
  }

  public getConferenceRooms(): Observable<Room[]>{
    return this.http.get<Room[]>(`${this.conferenceRoomBaseUrl}`).pipe(
      map((result:any) =>{
        console.log(result);
        return result._embedded.conferenceroom;
      })
    )
  }

  public getRoom(id:number): Observable<Room>{
    return this.http.get<Room>(`${this.baseUrl}${id}`).pipe(
      map((result:any) =>{
        return result;
      })
    )
  }

  public getHotelRoom(id:number): Observable<Hotelroom>{
    return this.http.get<Hotelroom>(`${this.hotelRoomBaseUrl}${id}`).pipe(
      map((result:any) =>{
        console.log(result);
        return result;
      })
    )
  }

  public getConferenceRoom(id:number): Observable<Conferenceroom>{
    return this.http.get<Conferenceroom>(`${this.conferenceRoomBaseUrl}${id}`).pipe(
      map((result:any) =>{
        console.log(result);
        return result;
      })
    )
  }

  public save(room:Conferenceroom | Hotelroom, roomType:string)
  {
    console.log(room);

    if (roomType === "HOTELROOM")
    {

      this.http.post<Hotelroom>(this.hotelRoomBaseUrl, room)
        .subscribe(
          (val) =>
          {
            console.log("Post call => successful value returned in body: ", val);
          },

          response =>
          {
            console.log("Post call => error in: ", response);
          },
          () =>
          {
            console.log("Post call => room creation successful");
          }
        )
    }
    else
    {

      this.http.post<Conferenceroom>(this.conferenceRoomBaseUrl, room)
        .subscribe(
          (val) =>
          {
            console.log("Post call => successful value returned in body: ", val);
          },

          response =>
          {
            console.log("Post call => error in: ", response);
          },
          () =>
          {
            console.log("Post call => room creation successful");
          }
        )

    }
  }


  public delete(id: number) {

    this.getRoom(id).subscribe(
      data=>
      {
        if(data.roomType=="HOTELROOM")
        {
          this.http.delete<Hotelroom>(`${this.hotelRoomBaseUrl}${id}`)
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
                console.log("Post call => hotelroom deletion successful");
              }
            )
        }
        else
        {
          this.http.delete<Conferenceroom>(`${this.conferenceRoomBaseUrl}${id}`)
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
                console.log("Post call => conferenceroom deletion successful");
              }
            )
        }
      }
    )

  }



  public updateRoom(id: number, room:Conferenceroom | Hotelroom, roomType:string) {
    console.log(room);

    if (roomType === "HOTELROOM")
    {

      this.http.put<Hotelroom>(`${this.hotelRoomBaseUrl}${id}`, room)
        .subscribe(
          (val) =>
          {
            console.log("Post call => successful value returned in body: ", val);
          },

          response =>
          {
            console.log("Post call => error in: ", response);
          },
          () =>
          {
            console.log("Post call => room update successful");
          }
        )
    }
    else
    {

      this.http.put<Conferenceroom>(`${this.conferenceRoomBaseUrl}${id}`, room)
        .subscribe(
          (val) =>
          {
            console.log("Post call => successful value returned in body: ", val);
          },

          response =>
          {
            console.log("Post call => error in: ", response);
          },
          () =>
          {
            console.log("Post call => room update successful");
          }
        )

    }


  }


}
