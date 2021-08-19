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
   * returns ContactData associated with contactDataID
   *
   * @param id contactdataID to be searched for
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
   * returns Observable containing the newly added contactdata entry
   *
   * @param contactdata contactdata to be inserted
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
   * returns empty Observable after deleting the Contactdata entry
   *
   * @param id contactdataID of contactdata to be deleted
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
   * returns Observable containing the updated contactData entry
   *
   * @param id contactdataID of contactdata to be updated
   * @param contactdata contactdata to be updated
   */
  public updateContactdata(id: number, contactdata: Contactdata): Observable<Contactdata>
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
