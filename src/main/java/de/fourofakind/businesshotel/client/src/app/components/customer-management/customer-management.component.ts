import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../services/customer/customer.service';
import {AccountdetailsService} from "../../services/accountdetails/accountdetails.service";
import {ContactdataService} from "../../services/contactdata/contactdata.service";
import {Customer} from "../../services/customer/customer";
import {Accountdetail} from "../../services/accountdetails/accountdetail";
import {Contactdata} from "../../services/contactdata/contactdata";
import {BookingService} from "../../services/booking/booking.service";
import {BookingrequestService} from "../../services/bookingrequest/bookingrequest.service";
import {Alert} from "../../app.component";
import {NgForm} from "@angular/forms";
import {RoleService} from "../../services/role/role.service";

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})

/**
* Component for Management (Add, Update, Get, Delete) of Customers
* consumes form data and calls corresponding services
*/
export class CustomerManagementComponent implements OnInit {

  //form data

  //ContactData
  firstName!: string;
  lastName!: string;
  streetName!: string;
  streetNumber!: string;
  postalCode!: string;
  cityName!: string;
  phone!: string;
  mailAddress!: string;
  paymentCredentials!: string;

  //Customer
  accountID!: number;
  customerID!: number;
  contactDataID!: number;
  isBusinessCustomer!: boolean;
  paymentMethod!: string;

  //Accountdetails
  password!: string;
  repeatedPassword!: string;
  username!: string;
  usernameAlreadyExists: boolean = false;

  //helper variables
  emailRegex: RegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  phoneRegex: RegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  ibanRegex: RegExp = /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/;
  isChecked: boolean = false;
  labelPosition: 'before' | 'after' = 'before';
  foundCustomer!: Customer | null;
  foundAccountdetails!: Accountdetail | null;
  foundContactData!: Contactdata | null;
  alerts: Alert[] = [];
  paymentMethods = new Map
  ([
    ["paypal", "PayPal"],
    ["debit", "EC-Karte"],
    ["bill", "Rechnung"]
  ]);

  private readonly department: string = "customer-management";

  constructor(private customerService: CustomerService,
              private accountdetailsService: AccountdetailsService,
              private contactdataService: ContactdataService,
              private bookingService: BookingService,
              private bookingRequestService: BookingrequestService,
              private roleService: RoleService) {

  }

  ngOnInit(): void {
  }

  //###################################################################################################################
  //HELPER ############################################################################################################
  //###################################################################################################################


  /**
  * alert Object and seconds to display the alert as input params
  *
  * produces alert for x seconds displayed on the right side of the management tab
  */
  addAlertForXSeconds(alert: Alert, seconds: number) {
    this.alerts.push(alert);
    setTimeout(() => this.alerts = this.alerts.filter(entry => entry != alert), seconds * 1000);
  }

  validateUsername() {
    if (this.roleService.checkRights(this.department)) {
      this.accountdetailsService.getAccountdetailsByUsername(this.username)
        .subscribe(
          (data => {
            this.usernameAlreadyExists = true;
          }),
          (error) => {
            this.usernameAlreadyExists = false;
          })
    } else alert("Benötigte Rechte nicht vorhanden")
  }

  //###################################################################################################################
  //ADD | UPDATE ######################################################################################################
  //###################################################################################################################


  addContactData(_callback: Function) {

    let newContactData: Contactdata =
      {
        cityName: this.cityName,
        firstName: this.firstName,
        lastName: this.lastName,
        mailAddress: this.mailAddress,
        phone: this.phone,
        postalCode: this.postalCode,
        streetName: this.streetName,
        streetNumber: this.streetNumber,
        paymentCredentials: this.paymentCredentials
      }

    this.contactdataService.save(newContactData)
      .subscribe((res) => {
          if (res.contactDataID) this.contactDataID = res.contactDataID

          _callback();
        },
        (error) => {
          this.addAlertForXSeconds(new Alert('danger', "Fehler beim Erstellen der Kontaktdaten"), 5);
        }
      );
  }

  addCustomer() {

    let newOrUpdatedCustomer: Customer =
      {
        isBusinessCustomer: this.isBusinessCustomer,
        paymentMethod: this.paymentMethod,
        contactDataID: this.contactDataID,
        accountID: this.accountID,
      }

    this.customerService.save(newOrUpdatedCustomer)
      .subscribe((res) => {
          this.addAlertForXSeconds(new Alert('success', "Kunde erfolgreich angelegt"), 5);
        },
        (error) => {
          this.addAlertForXSeconds(new Alert('danger', "Fehler beim Erstellen des Kunden"), 5);
        });
  }

  addOrUpdateCustomerAndDetails(addsNewCustomer: boolean, addOrUpdateCustomerForm: NgForm) {
    if (this.roleService.checkRights(this.department)) {
      if (addsNewCustomer) {
        this.addContactData(() => this.addCustomer());
      } else {
        let newOrUpdatedAccount: Accountdetail =
          {
            passwordHash: this.password,
            username: this.username
          }
        let newOrUpdatedContactData: Contactdata =
          {
            cityName: this.cityName,
            firstName: this.firstName,
            lastName: this.lastName,
            mailAddress: this.mailAddress,
            phone: this.phone,
            postalCode: this.postalCode,
            streetName: this.streetName,
            streetNumber: this.streetNumber,
            paymentCredentials: this.paymentCredentials
          }
        let newOrUpdatedCustomer: Customer =
          {
            isBusinessCustomer: this.isBusinessCustomer,
            paymentMethod: this.paymentMethod,
            contactDataID: this.contactDataID,
            accountID: this.accountID,
          }
        this.contactdataService.updateContactdata(this.contactDataID, newOrUpdatedContactData)
          .subscribe((res) => {
              this.addAlertForXSeconds(new Alert('success', "Kontaktdaten erfolgreich geändert"), 5);
              this.customerService.updateCustomer(this.customerID, newOrUpdatedCustomer)
                .subscribe((res) => {
                    this.addAlertForXSeconds(new Alert('success', "Kunde erfolgreich geändert"), 5);
                    this.accountdetailsService.updateUsername(this.accountID, this.username)
                      .subscribe((res) => {
                          this.addAlertForXSeconds(new Alert('success', "Nutzernamen erfolgreich geändert"), 5);
                          this.foundCustomer = null;
                          if (!this.password) addOrUpdateCustomerForm.resetForm()
                        },
                        (error) => {
                          this.addAlertForXSeconds(new Alert('danger', "Fehler beim Ändern des Nutzernamen"), 5);
                        });
                  },
                  (error) => {
                    this.addAlertForXSeconds(new Alert('danger', "Fehler beim Ändern des Kunden"), 5);
                  });
            },
            (error) => {
              this.addAlertForXSeconds(new Alert('danger', "Fehler beim Ändern der Kontaktdaten"), 5);
            });


        if (this.password) this.accountdetailsService.updateAccountdetails(this.accountID, newOrUpdatedAccount)
          .subscribe((res) => {
              this.addAlertForXSeconds(new Alert('success', "Passwort erfolgreich geändert"), 5);
              addOrUpdateCustomerForm.resetForm()
            },
            (error) => {
              this.addAlertForXSeconds(new Alert('danger', "Fehler beim Ändern des Passworts"), 5);
            });
      }
    } else alert("Benötigte Rechte nicht vorhanden")
  }

  //###################################################################################################################
  //GET ###############################################################################################################
  //###################################################################################################################


  searchForCustomer(intoFormular: boolean, _callback1: Function, _callback2: Function) {
    this.customerService.getCustomer(this.customerID).subscribe(data => {
        this.foundCustomer = data;
        if (data.accountID) this.accountID = data.accountID
        if (data.contactDataID) this.contactDataID = data.contactDataID

        if (intoFormular) {
          if (data.contactDataID) this.contactDataID = data.contactDataID
          this.isBusinessCustomer = data.isBusinessCustomer
          this.paymentMethod = data.paymentMethod ? data.paymentMethod : ""
        }

        _callback1();
        _callback2();
      },
      (error) => {
        this.addAlertForXSeconds(new Alert('danger', "Kein Kunde mit dieser Kundennummer vorhanden"), 5);
      });
  }

  searchForAccountdetails(intoFormular: boolean) {
    this.accountdetailsService.getAccountdetails(this.accountID).subscribe(data => {
        this.foundAccountdetails = data;
        if (intoFormular) this.username = data.username;
      },
      (error) => {
        this.addAlertForXSeconds(new Alert('danger', "Kein Account für diesen Kunden vorhanden"), 5);
      });
  }

  searchForContactData(intoFormular: boolean) {
    this.contactdataService.getContactdata(this.contactDataID).subscribe(data => {
        this.foundContactData = data;
        if (intoFormular) {
          this.firstName = data.firstName
          this.lastName = data.lastName
          this.streetName = data.streetName ? data.streetName : ""
          this.streetNumber = data.streetNumber ? data.streetNumber : ""
          this.postalCode = data.postalCode ? data.postalCode : ""
          this.cityName = data.cityName ? data.cityName : ""
          this.phone = data.phone ? data.phone : ""
          this.mailAddress = data.mailAddress
          if (data.paymentCredentials) this.paymentCredentials = data.paymentCredentials
        }
      },
      (error) => {
        this.addAlertForXSeconds(new Alert('danger', "Keine Kontaktdaten für diesen Kunden vorhanden"), 5);
      });
  }

  submitSearch(intoFormular: boolean) {
    if (this.roleService.checkRights(this.department)) {
      console.log(this.customerID);
      this.foundCustomer = null;
      this.foundAccountdetails = null;
      this.foundContactData = null;

      if (this.customerID != 1) {
        this.searchForCustomer(intoFormular, () => this.searchForAccountdetails(intoFormular), () => this.searchForContactData(intoFormular))
      }
    } else alert("Benötigte Rechte nicht vorhanden")

  }

  //###################################################################################################################
  //DELETE ############################################################################################################
  //###################################################################################################################


  deleteCustomer(deleteCustomerForm: NgForm) {
    this.customerService.delete(this.customerID)
      .subscribe((res) => {
          this.addAlertForXSeconds(new Alert('success', "Kunde erfolgreich gelöscht"), 5);
          this.foundCustomer = null;
          deleteCustomerForm.resetForm();
        },
        (error) => {
          this.addAlertForXSeconds(new Alert('danger', "Fehler beim Löschen des Kunden"), 5);
        });
  }

  patchBookings(_callback: Function) {

    let bookingNoOfCustomer: number[] = [];
    this.bookingService.getBookingsByCustomerID(this.customerID)
      .subscribe((data) => {
        console.log(data);
        data.forEach((data) => {
          if (data && data.bookingNo) {
            bookingNoOfCustomer.push(data.bookingNo)
          }
        })
        console.log(bookingNoOfCustomer)
        if (bookingNoOfCustomer.length > 0) {
          let currentIdx = 0;
          bookingNoOfCustomer.forEach((bookingNo) => {
            currentIdx++;
            this.bookingService.patchBookingsAtCustomerDelete(bookingNo).subscribe(() => {
                if (currentIdx <= bookingNoOfCustomer.length) _callback();
              },
              (error) => {
                this.addAlertForXSeconds(new Alert('danger', "Abbruch: Fehler beim Patchen der Buchungen"), 5);
              });
          })

        } else _callback();
      })

  }

  patchBookingRequests(_callback: Function) {
    let bookingRequestIDsOfCustomer: number[] = [];
    this.bookingRequestService.getBookingRequestIDsByCustomerID(this.customerID)
      .subscribe((data) => {
        console.log(data);
        data.forEach((data) => {
          if (data && data.bookingRequestID) {
            bookingRequestIDsOfCustomer.push(data.bookingRequestID)
          }
        })
        console.log(bookingRequestIDsOfCustomer)
        if (bookingRequestIDsOfCustomer.length) {
          let currentIdx = 0;
          bookingRequestIDsOfCustomer.forEach((bookingRequestID) => {
            currentIdx++;
            this.bookingRequestService.patchBookingRequestsAtCustomerDelete(bookingRequestID)
              .subscribe(() => {
                  if (currentIdx == bookingRequestIDsOfCustomer.length - 1) _callback();
                },
                (error) => {
                  this.addAlertForXSeconds(new Alert('danger', "Abbruch: Fehler beim Patchen der Buchungsanfragen"), 5);
                });

          })
        } else _callback();
      })
  }

  deleteCustomerAndDetails(deleteCustomerForm: NgForm) {
    if (this.roleService.checkRights(this.department)) {
      this.foundCustomer = null;
      this.foundAccountdetails = null;
      this.foundContactData = null;

      this.patchBookings(() => this.patchBookingRequests(() => this.deleteCustomer(deleteCustomerForm)));
    } else alert("Benötigte Rechte nicht vorhanden")

  }
}
