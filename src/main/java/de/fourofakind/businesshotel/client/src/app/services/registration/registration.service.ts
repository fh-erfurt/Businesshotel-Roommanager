import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {LoginService} from "../login/login.service";
import {Accountdetail} from "../accountdetails/accountdetail";
import {AccountdetailsService} from "../accountdetails/accountdetails.service";
import {ContactdataService} from "../contactdata/contactdata.service";
import {Contactdata} from "../contactdata/contactdata";
import {Customer} from "../customer/customer";
import {CustomerService} from "../customer/customer.service";

// enum errors {
//   unaviableUsername = "username already in use",
//   saveCustomerStatusUnknown = "customer possibly not saved (no customerID returned)",
//   saveAccountDetailsStatusUnknown = "accountDetails possibly not saved (no accountDetailsID returned)",
//   saveContactDataStatusUnknown = "contactData possibly not saved (no contactDataID returned)",
//   saveCustomerFailed = "customer not saved",
//   saveAccountDetailsFailed = "accountDetails not saved",
//   saveContactDataFailed = "contactData not saved"
// }

export enum errors {
  unavailableUsername = "unavailableUsername",
  saveCustomerStatusUnknown = "saveCustomerStatusUnknown",
  saveAccountDetailsStatusUnknown = "saveAccountDetailsStatusUnknown",
  saveContactDataStatusUnknown = "saveContactDataStatusUnknown",
  saveCustomerFailed = "saveCustomerFailed",
  saveAccountDetailsFailed = "saveAccountDetailsFailed",
  saveContactDataFailed = "saveContactDataFailed",
  missingDataBaseConnection = "missingDataBaseConnection",
  success = "success"
}


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


  register = (
    lastName: string,
    firstName: string,
    companyName: string,
    emailaddress: string,
    phoneNumber: string,
    username: string,
    password: string,
    passwordVerify: string,
    isBusinessCustomer: boolean) =>
  {

    return new Promise((resolve, reject) => {
      this.loginService.getAccount(username).subscribe((data: Accountdetail | null)=>{
        if (data) {
          reject(errors.unavailableUsername)
        } else {
          reject(errors.missingDataBaseConnection)
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

        this.saveAccountDetail()
          .then(success => {
            this.saveContactData()
              .then(success => {
                this.saveCustomer(isBusinessCustomer)
                  .then(success => {
                    console.log("then(success => {})")
                    resolve(success)
                  })
                  .catch(error => {
                    reject(error)
                  })
              })
              .catch(error => {
                reject(error)
              })
          })
          .catch(error => {
            reject(error)
          })
      })
    })
  }

  saveAccountDetail = () => {
    return new Promise((resolve, reject) => {
      console.log("saveAccountDetail")
      this.accountdetailsService.save(this.accountDetail)
        .subscribe((data)=>
          {
            if(data.accountID) {
              this.accountDetail.accountID = data.accountID;
              resolve(errors.success)
            } else {
              reject(errors.saveAccountDetailsStatusUnknown)
            }
          },
          (error)=>
          {
            console.log("accountDetailError: ", error)
            reject(errors.saveAccountDetailsFailed)
            // this.addAlertForXSeconds(new Alert('danger',"Fehler beim Anlegen des Accounts"),5);
          });
    })

  }
  saveContactData = () => {

    return new Promise((resolve, reject) => {
      console.log("saveContactDate")
      this.contactDataService.save(this.contactData)
        .subscribe((data)=>
          {
            if(data.contactDataID) {
              this.contactData.contactDataID=data.contactDataID;
              resolve(errors.success)
            } else {
              reject(errors.saveContactDataStatusUnknown)
            }
          },
          (error)=>
          {
            console.log("contactDataError: ", error)
            reject(errors.saveContactDataFailed)
            // this.addAlertForXSeconds(new Alert('danger',"Fehler beim Anlegen des Accounts"),5);
          });
    })


  }
  saveCustomer = (isBusinessCustomer: boolean) => {

    return new Promise((resolve, reject) => {
      this.customer.accountID = this.accountDetail.accountID
      this.customer.contactDataID = this.contactData.contactDataID
      this.customer.isBusinessCustomer = isBusinessCustomer

      this.customerService.save(this.customer)
        .subscribe((data) =>
          {
            if(data.customerID) {
              this.customer.customerID=data.customerID;
              localStorage.setItem('user', this.accountDetail.username);
              localStorage.setItem('userID', String(this.customer.customerID));
              resolve(data.customerID)
            } else {
              reject(errors.saveCustomerStatusUnknown)
            }
          },
          (error)=>
          {
            console.log("customerError: ", error)
            reject(errors.saveCustomerFailed)
            // this.addAlertForXSeconds(new Alert('danger',"Fehler beim Anlegen des Accounts"),5);
          });
      }
    )



  }

}
