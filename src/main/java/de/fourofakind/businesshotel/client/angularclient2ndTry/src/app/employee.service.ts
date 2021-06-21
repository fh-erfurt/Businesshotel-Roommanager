import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8081/employee/1002"

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.baseUrl}`)
  }

}



