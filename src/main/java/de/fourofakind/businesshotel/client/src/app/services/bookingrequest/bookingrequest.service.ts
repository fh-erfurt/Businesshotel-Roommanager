import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {RootObject} from "../room/room";



@Injectable({
  providedIn: 'root'
})
export class BookingrequestService {

  private baseUrl = "http://localhost:8081/room"

  constructor(private http: HttpClient) { }

  getRooms(): Observable<RootObject>{
    return this.http.get<RootObject>(`${this.baseUrl}`)
  }

}
