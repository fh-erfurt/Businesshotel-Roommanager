import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Contactdata} from "./contactdata";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContactdataService {

  lastInsertedID:number | undefined;
  private readonly baseUrl:string;

  constructor(private http: HttpClient)
  {
    this.baseUrl="http://localhost:8081/contactdata/";
  }

  public getAllContactdata(): Observable<Contactdata>{
    return this.http.get<Contactdata>(`${this.baseUrl}`).pipe(
      map((result:any) =>{
        console.log(result);
        return result._embedded.contactdata;
      })
    )
  }

  public getContactdata(id:number): Observable<Contactdata>{
    return this.http.get<Contactdata>(`${this.baseUrl}${id}`).pipe(
      map((result:any) =>{
        console.log(result);
        return result;
      })
    )
  }


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
