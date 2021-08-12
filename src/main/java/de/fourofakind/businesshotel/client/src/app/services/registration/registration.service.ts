import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {LoginService} from "../login/login.service";
import {Employee} from "../employee/employee";
import {map} from "rxjs/operators";
import {Accountdetail} from "../accountdetails/accountdetail";
import {AccountdetailsService} from "../accountdetails/accountdetails.service";
import {ContactdataService} from "../contactdata/contactdata.service";
import {Contactdata} from "../contactdata/contactdata";
import {Alert} from "../../app.component";
import {Customer} from "../customer/customer";


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = "http://localhost:8081/accountdetails/search/findAccountDetailsByUsername"
  private accountDetail: Accountdetail
  private contactData: Contactdata
  private customer: Customer

  constructor(private http: HttpClient,
              private loginService: LoginService,
              private accountdetailsService: AccountdetailsService,
              private contactDataService: ContactdataService)
  {
    this.accountDetail = {
      passwordHash: "password",
      username: "username",
    };

    this.contactData = {
      firstName: "firstName",
      lastName: "lastName",
      phone: "phoneNumber",
      mailAddress: "emailaddress"
    }

    this.customer = {
      isBusinessCustomer: false
    }
  }


  register(lastName: string,
           firstName: string,
           companyName: string,
           emailaddress: string,
           phoneNumber: string,
           username: string,
           password: string,
           passwordVerify: string) {

    this.loginService.getAccount(username).subscribe((data: Accountdetail | null)=>{
      if (data) {
        alert("Username schon vergeben")
      }
    }, (error)=>{
      this.accountDetail = {
        passwordHash: password,
        username: username,
      };
      this.contactData = {
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
        mailAddress: emailaddress
      }

      this.saveAccountDetail(
        ()=>this.saveContactDate(
          ()=>this.saveCustomer()
        )
      )

    })
  }

  saveAccountDetail(_callback:Function) {
    this.accountdetailsService.save(this.accountDetail)
      .subscribe((data)=>
        {
          if(data.accountID) {
            this.accountDetail.accountID = data.accountID;
            _callback
          }
        },
        (error)=>
        {
          // this.addAlertForXSeconds(new Alert('danger',"Fehler beim Anlegen des Accounts"),5);
        });
  }
  saveContactDate(_callback:Function) {
    this.contactDataService.save(this.contactData)
      .subscribe((data)=>
        {
          if(data.contactDataID) {
            this.contactData.contactDataID=data.contactDataID;
          }
        },
        (error)=>
        {
          // this.addAlertForXSeconds(new Alert('danger',"Fehler beim Anlegen des Accounts"),5);
        });
  }
  saveCustomer() {
    this.customer.accountID = this.accountDetail.accountID
    this.customer.contactDataID = this.contactData.contactDataID

  }

}
