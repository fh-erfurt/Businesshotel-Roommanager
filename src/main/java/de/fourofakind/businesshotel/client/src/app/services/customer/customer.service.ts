import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Customer} from "./customer";


@Injectable({
  providedIn: 'root'
})
/*
 * Service for customer management (Save, Get, Update, Delete)
 * Consumes customer REST-API
 */
export class CustomerService {

  lastInsertedID: number | undefined;
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8081/customer/";
    this.lastInsertedID = 0;
  }

  /*
  * function without params
  * returns all customers
  */
  public getCustomers(): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}`).pipe(
      map((result: any) => {
        //console.log(result);
        return result._embedded.customer;
      })
    )
  }


  /*
  * customerID as input param
  * returns customer associated with customerID
  */
  public getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}${id}`).pipe(
      map((result: any) => {
        //console.log(result);
        return result;
      })
    )
  }

  /*
  * accountID as input param
  * returns customer associated with accountID
  */
  public getCustomerByAccountID(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}search/findCustomerByAccountID?account_id=${id}`).pipe(
      map((result: any) => {
        //console.log(result);
        return result;
      })
    )
  }

  /*
  * customer as input param
  * returns Observable containing the newly added Customer entry
  */
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

  /*
  * customerID as input param
  * returns empty Observable after deleting the Customer entry
  */
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

  /*
  * customerID and customer Object as input params
  * returns Observable containing the updated Customer entry
  */
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
