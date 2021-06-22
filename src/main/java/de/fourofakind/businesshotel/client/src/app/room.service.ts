import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Room } from './room';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = "http://localhost:8081/room"

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]>{
    return this.http.get<Room[]>(`${this.baseUrl}`)
  }

}
