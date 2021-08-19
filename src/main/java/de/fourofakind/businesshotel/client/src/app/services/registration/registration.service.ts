import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from "../login/login.service";
import {Accountdetail} from "../accountdetails/accountdetail";
import {AccountdetailsService} from "../accountdetails/accountdetails.service";
import {ContactdataService} from "../contactdata/contactdata.service";
import {Contactdata} from "../contactdata/contactdata";
import {Customer} from "../customer/customer";
import {CustomerService} from "../customer/customer.service";

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

/**
 * Service for registration (Save, Get)
 * Consumes accountdetails REST-APIs
 */
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

  /**
   * calls save userdata functions
   *
   * @param accountDetail accountDetail to store
   * @param contactData contactData to store
   * @param customer customer to store
   */

    register = (
      accountDetail: Accountdetail,
      contactData: Contactdata,
      customer: Customer) =>
    {

      return new Promise((resolve, reject) => {
        this.loginService.getAccount(accountDetail.username).subscribe((data: Accountdetail | null)=>{
          if (data) {
            reject(errors.unavailableUsername)
          } else {
            reject(errors.missingDataBaseConnection)
          }
        }, (error)=>{

          this.accountDetail = accountDetail
          this.contactData = contactData

          this.saveAccountDetail(this.accountDetail)
            .then(success => {
              this.saveContactData(this.contactData)
                .then(success => {

                  customer.accountID = this.accountDetail.accountID
                  customer.contactDataID = this.contactData.contactDataID

                  this.saveCustomer(customer)
                    .then(customerID => {

                      resolve(customerID)
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

  /**
   * saves accountDetail
   *
   * @param accountDetail accountDetail to store
   */

  saveAccountDetail = (accountDetail: Accountdetail) => {
    return new Promise((resolve, reject) => {

      this.accountdetailsService.save(accountDetail)
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

            reject(errors.saveAccountDetailsFailed)

          });
    })

  }

  /**
   * saves contactData
   *
   * @param contactData contactData to store
   */

  saveContactData = (contactData: Contactdata) => {

    return new Promise((resolve, reject) => {

      this.contactDataService.save(contactData)
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
            reject(errors.saveContactDataFailed)
          });
    })
  }

  /**
   * saves customer
   *
   * @param customer customer to store
   */

  saveCustomer = (customer: Customer) => {

    return new Promise((resolve, reject) => {

      this.customer = customer

      this.customerService.save(this.customer)
        .subscribe((data) =>
          {
            if(data.customerID) {
              this.customer.customerID=data.customerID;
              localStorage.setItem('user', this.accountDetail.username);
              localStorage.setItem('userID', String(this.accountDetail.accountID));
              localStorage.setItem('customerID', String(data.customerID));
              resolve(data.customerID)
            } else {
              reject(errors.saveCustomerStatusUnknown)
            }
          },
          (error)=>
          {

            reject(errors.saveCustomerFailed)

          });
      }
    )

  }

}
