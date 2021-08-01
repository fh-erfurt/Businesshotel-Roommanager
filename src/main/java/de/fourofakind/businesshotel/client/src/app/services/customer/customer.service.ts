import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Customer} from "./customer";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  lastInsertedID: number | undefined;
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8081/customer/";
    this.lastInsertedID = 0;
  }

  public getCustomers(): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}`).pipe(
      map((result: any) => {
        //console.log(result);
        return result._embedded.customer;
      })
    )
  }


  public getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}${id}`).pipe(
      map((result: any) => {
        //console.log(result);
        return result;
      })
    )
  }


  public save(customer: Customer): Observable<Customer> {
    console.log(customer);

    return this.http.post<Customer>(this.baseUrl, customer)
      .pipe(
        map(
          (res) => {
            return res;
          }
        )
      )

  }

  public delete(id: number): Observable<Customer> {
    return this.http.delete<Customer>(`${this.baseUrl}${id}`)
      .pipe(
        map(
          (res) => {
            return res;
          }
        )
      )
  }

  public updateCustomer(id: number, customer: Customer) {
    console.log(customer);

    return this.http.put<Customer>(`${this.baseUrl}${id}`, customer)
      .pipe(
        map(
          (res) => {
            return res;
          }
        )
      )
  }

}
