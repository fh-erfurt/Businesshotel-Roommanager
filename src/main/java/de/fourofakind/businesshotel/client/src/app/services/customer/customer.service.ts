import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Customer} from "./customer";


@Injectable({
  providedIn: 'root'
})
/**
 * Service for customer management (Save, Get, Update, Delete)
*
 * Consumes customer REST-API
 */
export class CustomerService {

  lastInsertedID: number | undefined;
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8081/customer/";
    this.lastInsertedID = 0;
  }

  /**
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


  /**
   * returns customer associated with customerID
   *
   * @param id customerID to be searched for
   */
  public getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}${id}`).pipe(
      map((result: any) => {
        //console.log(result);
        return result;
      })
    )
  }


  /**
   * returns customer associated with accountID
   *
   * @param id accountID to be searched for
   */
  public getCustomerByAccountID(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}search/findCustomerByAccountID?account_id=${id}`).pipe(
      map((result: any) => {
        //console.log(result);
        return result;
      })
    )
  }


  /**
   * returns Observable containing the newly added Customer entry
   *
   * @param customer data to be inserted
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


  /**
   * returns empty Observable after deleting the Customer entry
   *
   * @param id customerID of customer to be deleted
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


  /**
   * returns Observable containing the updated Customer entry
   *
   * @param id customerID of customer to be updated
   * @param customer data to be updated
   */
  public updateCustomer(id: number, customer: Customer): Observable<Customer> {
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
