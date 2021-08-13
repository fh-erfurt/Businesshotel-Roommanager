import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {LoginService} from "../login/login.service";
import {Accountdetail} from "../accountdetails/accountdetail";
import {AccountdetailsService} from "../accountdetails/accountdetails.service";
import {ContactdataService} from "../contactdata/contactdata.service";
import {Contactdata} from "../contactdata/contactdata";
import {Customer} from "../customer/customer";
import {CustomerService} from "../customer/customer.service";


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
              private contactDataService: ContactdataService,
              private customerService: CustomerService)
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
           passwordVerify: string,
           isBusinessCustomer: boolean) {

    this.loginService.getAccount(username).subscribe((data: Accountdetail | null)=>{
      if (data) {
        alert("Username schon vergeben")
      }
    }, (error)=>{
      console.log("Kein User mit diesem Namen")
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
          ()=>this.saveCustomer(isBusinessCustomer)
        )
      )

    })
  }

  saveAccountDetail(_callback:Function) {
    console.log("saveAccountDetail")
    this.accountdetailsService.save(this.accountDetail)
      .subscribe((data)=>
        {
          if(data.accountID) {
            this.accountDetail.accountID = data.accountID;
            _callback()
          }
        },
        (error)=>
        {
          console.log("saveAccountDetail ERROR")
          // this.addAlertForXSeconds(new Alert('danger',"Fehler beim Anlegen des Accounts"),5);
        });
  }
  saveContactDate(_callback:Function) {
    console.log("saveContactDate")
    this.contactDataService.save(this.contactData)
      .subscribe((data)=>
        {
          if(data.contactDataID) {
            this.contactData.contactDataID=data.contactDataID;
            _callback()
          }
        },
        (error)=>
        {
          console.log("saveContactDate ERROR")
          // this.addAlertForXSeconds(new Alert('danger',"Fehler beim Anlegen des Accounts"),5);
        });
  }
  saveCustomer(isBusinessCustomer: boolean) {
    console.log("saveCustomer")
    this.customer.accountID = this.accountDetail.accountID
    this.customer.contactDataID = this.contactData.contactDataID
    this.customer.isBusinessCustomer = isBusinessCustomer

    this.customerService.save(this.customer)
      .subscribe((data)=>
        {
          console.log("saveCustomer SUCCESS")
        },
        (error)=>
        {
          console.log("saveContactDate ERROR")
          // this.addAlertForXSeconds(new Alert('danger',"Fehler beim Anlegen des Accounts"),5);
        });

  }

}
