import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RawData } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8081/employee/"
  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<RawData>{
    return this.http.get<RawData>(`${this.baseUrl}`)
  }
}






