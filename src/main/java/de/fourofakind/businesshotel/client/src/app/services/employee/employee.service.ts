import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Employee, RawData} from './employee';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
/*
 * Service for employee management (Save, Get, Update, Delete) of employee and customers
 * Consumes employee REST-API
 */
export class EmployeeService {

  private readonly baseUrl:string;

  constructor(private http: HttpClient) {
    this.baseUrl="http://localhost:8081/employee/"
  }

  /*
  * function without params
  * returns all employees
  */
  public getEmployees(): Observable<RawData>{
    return this.http.get<RawData>(`${this.baseUrl}`)
  }

  /*
  * empNo as input param
  * returns employee associated with empNo
  */
  public getEmployee(id:number): Observable<Employee>
  {
    return this.http.get<Employee>(`${this.baseUrl}${id}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result;
      })
    )
  }

  /*
  * accountID as input param
  * returns employee associated with accountID
  */
  public getEmployeeByAccountID(id:number): Observable<Employee>
  {
    return this.http.get<Employee>(`${this.baseUrl}search/findEmployeeByAccountID?account_id=${id}`).pipe(
      map((result:any) =>{
        //console.log(result);
        return result;
      })
    )
  }

  /*
  * employee as input param
  * returns Observable containing the newly added Employee entry
  */
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

  /*
  * empNo as input param
  * returns empty Observable after deleting the Employee entry
  */
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

  /*
  * empNo and employee Object as input params
  * returns Observable containing the updated Employee entry
  */
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






