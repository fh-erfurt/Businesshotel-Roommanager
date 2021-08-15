import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Employee, RawData} from './employee';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly baseUrl:string;

  constructor(private http: HttpClient) {
    this.baseUrl="http://localhost:8081/employee/"
  }

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

  public getEmployeeByAccountID(id:number): Observable<Employee>
  {
    return this.http.get<Employee>(`${this.baseUrl}search/findEmployeeByAccountID?account_id=${id}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result;
      })
    )
  }

  public save(employee: Employee): Observable<Employee>
  {
    console.log(employee);

    return this.http.post<Employee>(this.baseUrl, employee)
      .pipe(
        map(
          (res)=>
          {
            return res;
          }
        )
      )
  }

  public delete(id: number) : Observable<Employee>
  {
    return this.http.delete<Employee>(`${this.baseUrl}${id}`)
      .pipe(
        map(
          (res)=>
          {
            return res;
          }
        )
      )
  }

  public updateEmployee(id: number, employee: Employee)
  {
    console.log(employee);

    return this.http.put<Employee>(`${this.baseUrl}${id}`, employee)
      .pipe(
        map(
          (res)=>
          {
            return res;
          }
        )
      )
  }

}






