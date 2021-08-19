import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Employee} from './employee';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for employee management (Save, Get, Update, Delete) of employee and customers
 * Consumes employee REST-API
 */
export class EmployeeService {

  private readonly baseUrl:string;

  constructor(private http: HttpClient) {
    this.baseUrl="http://localhost:8081/employee/"
  }

  /**
  * returns all employees
  */
  public getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.baseUrl}`).pipe(
      map((result: any) => {
        return result._embedded.employee;
      })
    )
  }


  /**
   * returns employee associated with empNo
   *
   * @param id empNo to be searched for
   */
  public getEmployee(id:number): Observable<Employee>
  {
    return this.http.get<Employee>(`${this.baseUrl}${id}`).pipe(
      map((result:any) =>{
        return result;
      })
    )
  }


  /**
   * returns employee associated with accountID
   *
   * @param id accountID to be searched for
   */
  public getEmployeeByAccountID(id:number): Observable<Employee>
  {
    return this.http.get<Employee>(`${this.baseUrl}search/findEmployeeByAccountID?account_id=${id}`).pipe(
      map((result:any) =>{
        return result;
      })
    )
  }


  /**
   * returns Observable containing the newly added Employee entry
   *
   * @param employee data to be inserted
   */
  public save(employee: Employee): Observable<Employee>
  {

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


  /**
   * returns empty Observable after deleting the Employee entry
   *
   * @param id empNo of employee to be deleted
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


  /**
   * returns Observable containing the updated Employee entry
   *
   * @param id empNo of employee to be updated
   * @param employee data to be updated
   */
  public updateEmployee(id: number, employee: Employee): Observable<Employee>
  {

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






