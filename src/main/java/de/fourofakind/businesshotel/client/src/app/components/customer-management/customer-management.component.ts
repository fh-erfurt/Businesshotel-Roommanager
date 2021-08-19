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
*
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
   * produces alert for x seconds displayed on the right side of the management tab
   *
   * @param alert contains message and alert type (danger or success)
   * @param seconds seconds to display the alert
   *
   */
  addAlertForXSeconds(alert: Alert, seconds: number) {
    this.alerts.push(alert);
    setTimeout(() => this.alerts = this.alerts.filter(entry => entry != alert), seconds * 1000);
  }

  /**
   * checks for employees rights to do this transaction
   *
   *
   * checks if username already exists
   */
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

  /**
   *
   * adds new contactdata according to form data
   *
   * calls addCustomer after successful adding contact data entry
   * @param _callback to ensure controlled function sequence
   */
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

  /**
   *
   * adds new customer according to form data
   */
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

  /**
   * checks for employees rights to do this transaction
   *
   * adds or updates Customer with form data
   *
   * @param addsNewCustomer decides if a Customer is added or an existing Customer is updated
   * @param addOrUpdateCustomerForm needed for form resetting after update/add
   */
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

  /**
   * searches for customer entry associated with the form data
   *
   * calls searchForAccountdetails and searchForContactData after successful retrieving a customer
   * @param intoFormular decides if search result should be filled into the form
   * @param _callback1 to ensure controlled function sequence
   * @param _callback2 to ensure controlled function sequence
   */
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

  /**
   * searches for accountdetails associated with the form data
   *
   * @param intoFormular decides if search result should be filled into the form
   */
  searchForAccountdetails(intoFormular: boolean) {
    this.accountdetailsService.getAccountdetails(this.accountID).subscribe(data => {
        this.foundAccountdetails = data;
        if (intoFormular) this.username = data.username;
      },
      (error) => {
        this.addAlertForXSeconds(new Alert('danger', "Kein Account für diesen Kunden vorhanden"), 5);
      });
  }

  /**
   * searches for contactdata associated with the form data
   * @param intoFormular decides if search result should be filled into the form
   */
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

  /**
   * checks for employees rights to do this transaction
   *
   *  calls searchForCustomer to start the funciton sequence for retrieving a customer and its associated account and contact data
   *
   * @param intoFormular decides if search result should be filled into the form
   */
  submitSearch(intoFormular: boolean) {
    if (this.roleService.checkRights(this.department)) {
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

  /**
   * deletes customer entry associated with the form data
   *
   * @param deleteCustomerForm for resetting the form after deletion
   */
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

  /**
   * calls patchBookingsAtCustomerDelete for each booking associated with the customer via bookingService
   *
   * @param _callback to ensure controlled function sequence
   */
  patchBookings(_callback: Function) {

    let bookingNoOfCustomer: number[] = [];
    this.bookingService.getBookingsByCustomerID(this.customerID)
      .subscribe((data) => {
        data.forEach((data) => {
          if (data && data.bookingNo) {
            bookingNoOfCustomer.push(data.bookingNo)
          }
        })
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

  /**
   * calls patchBookingRequestsAtCustomerDelete for each bookingRequest associated with the customer via bookingRequestService
   *
   * @param _callback to ensure controlled function sequence
   */
  patchBookingRequests(_callback: Function) {
    let bookingRequestIDsOfCustomer: number[] = [];
    this.bookingRequestService.getBookingRequestIDsByCustomerID(this.customerID)
      .subscribe((data) => {
        data.forEach((data) => {
          if (data && data.bookingRequestID) {
            bookingRequestIDsOfCustomer.push(data.bookingRequestID)
          }
        })
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

  /**
   * checks for employees rights to do this transaction
   *
   * calls patchBookings to start the function sequence for deleting a custoemr and its associated account and contact data
   *
   * @param deleteCustomerForm for resetting the form after deletion
   */
  deleteCustomerAndDetails(deleteCustomerForm: NgForm) {
    if (this.roleService.checkRights(this.department)) {
      this.foundCustomer = null;
      this.foundAccountdetails = null;
      this.foundContactData = null;

      this.patchBookings(() => this.patchBookingRequests(() => this.deleteCustomer(deleteCustomerForm)));
    } else alert("Benötigte Rechte nicht vorhanden")

  }
}
