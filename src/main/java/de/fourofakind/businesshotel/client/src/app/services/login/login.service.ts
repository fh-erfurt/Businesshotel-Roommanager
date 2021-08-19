import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Accountdetail} from "./login";
import {map} from "rxjs/operators";
import * as bcrypt from 'bcryptjs';
import {EmployeeService} from "../employee/employee.service";
import {Employee} from "../employee/employee";
import {CustomerService} from "../customer/customer.service";
import {Customer} from "../customer/customer";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  accountDetail!: Accountdetail;
  equalPassword: boolean = true

  private baseUrl = "http://localhost:8081/accountdetails/"
  constructor(private http: HttpClient,
              private employeeService: EmployeeService,
              private customerService: CustomerService) { }

  public getAccount(username: string): Observable<Accountdetail | null>{

    return this.http.get<Accountdetail>(`${this.baseUrl}search/findByUsername?username=${username}`).pipe(
      map((result:any) =>{


        let account: Accountdetail;
        if(result.accountID)
        {

          account = {
            accountID: result.accountID,
            passwordHash: result.passwordHash,
            username: result.username,
          };

          return account;
        } else {

          return null;
        }
      })
    )
  }

  hashPassword = (password: string) => {
    return new Promise((resolve, reject) => {
      const saltRounds = 10;

      try{
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        });
      }
      catch(e){

        // Handle exceptions
      }
    });
  };

  login = (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      this.getAccount(username)
        .subscribe((data: Accountdetail | null)=>{

        if (data !== null) {
          this.accountDetail = data as Accountdetail

          bcrypt.compare(password, this.accountDetail.passwordHash, (err, result) => {
            if (err) {
              reject("something unexpected happened: " + err)
            }
            if (result) {





              localStorage.setItem('user', username);
              localStorage.setItem('userID', String(this.accountDetail.accountID));

              this.employeeService.getEmployeeByAccountID(data.accountID)
                .subscribe((data: Employee) => {
                  if (data) {
                    localStorage.setItem('empNo', String(data.empNo));
                    localStorage.setItem('givenRole', String(data.givenRole));
                  } else {

                  }
                  resolve("Success: " + result)

                }, (error)=>{
                  resolve("Success: " + error)
                })


              this.customerService.getCustomerByAccountID(this.accountDetail.accountID)
                .subscribe((data: Customer) => {
                  if (data) {
                    localStorage.setItem('customerID', String(data.customerID));
                  } else {

                  }

                }, (error)=>{

                })




            } else {
              reject("wrong password")
            }
          });
        } else {

        }

      }, (error)=>{
        reject("username not found")
      })
    })
  }
}
