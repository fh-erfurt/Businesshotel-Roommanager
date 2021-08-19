import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Contactdata} from "./contactdata";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for contactdata management (Save, Get, Update, Delete) of customers
 * Consumes contactdata REST-API
 */
export class ContactdataService {

  lastInsertedID:number | undefined;
  private readonly baseUrl:string;

  constructor(private http: HttpClient)
  {
    this.baseUrl="http://localhost:8081/contactdata/";
  }

  /**
  * function without params
  * returns all ContactData entries
  */
  public getAllContactdata(): Observable<Contactdata>{
    return this.http.get<Contactdata>(`${this.baseUrl}`).pipe(
      map((result:any) =>{
        console.log(result);
        return result._embedded.contactdata;
      })
    )
  }

  /**
  * contactDataID as input param
  * returns ContactData associated with contactDataID
  */
  public getContactdata(id:number): Observable<Contactdata>{
    return this.http.get<Contactdata>(`${this.baseUrl}${id}`).pipe(
      map((result:any) =>{
        console.log(result);
        return result;
      })
    )
  }

  /**
  * contactdata as input param
  * returns Observable containing the newly added contactdata entry
  */
  public save(contactdata: Contactdata):Observable<Contactdata>
  {
    console.log(contactdata);

    return this.http.post<Contactdata>(this.baseUrl, contactdata)
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
  * contactdataID as input param
  * returns empty Observable after deleting the Contactdata entry
  */
  public delete(id: number):Observable<Contactdata>
  {
    return this.http.delete<Contactdata>(`${this.baseUrl}${id}`)
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
  * contactDataID and contactdata Object as input params
  * returns Observable containing the updated contactData entry
  */
  public updateContactdata(id: number, contactdata: Contactdata)
  {
    console.log(contactdata);

    return this.http.put<Contactdata>(`${this.baseUrl}${id}`, contactdata)
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
