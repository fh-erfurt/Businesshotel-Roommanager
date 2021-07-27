import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Employee, RawData} from './employee';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8081/employee/"
  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<RawData>{
    return this.http.get<RawData>(`${this.baseUrl}`)
  }

  public getEmployee(id:number): Observable<Employee>
  {
    return this.http.get<Employee>(`${this.baseUrl}${id}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result;
      })
    )
  }

  public save(employee: Employee) {
    console.log(employee);

    this.http.post<Employee>(this.baseUrl, employee)
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
          console.log("Post call => Employee creation successful");
        }
      )
  }

  public delete(id: number) {
    this.http.delete<Employee>(`${this.baseUrl}${id}`)
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
          console.log("Post call => Employee deletion successful");
        }
      )
  }
}






