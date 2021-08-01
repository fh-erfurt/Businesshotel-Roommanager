import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import {AccountdetailsService} from "../../services/accountdetails/accountdetails.service";
import {ContactdataService} from "../../services/contactdata/contactdata.service";
import {Customer} from "../../services/customer/customer";
import {Accountdetails} from "../../services/accountdetails/accountdetails";
import {Contactdata} from "../../services/contactdata/contactdata";
import {BookingService} from "../../services/booking/booking.service";
import {BookingrequestService} from "../../services/bookingrequest/bookingrequest.service";
import {Alert} from "../../app.component";

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {

  constructor(private customerService: CustomerService,
              private accountdetailsService: AccountdetailsService,
              private contactdataService: ContactdataService,
              private bookingService: BookingService,
              private bookingRequestService: BookingrequestService,)
  {

  }

  ngOnInit(): void {
  }

  isChecked:boolean=false;
  labelPosition:'before' | 'after'='before';
  foundCustomer!:Customer | null;
  foundAccountdetails!: Accountdetails| null;
  foundContactData!: Contactdata | null;

  //ContactData
  firstName!:string;
  lastName!:string;
  streetName!:string;
  streetNumber!:string;
  postalCode!:string;
  cityName!:string;
  phone!:string;
  mailAddress!:string;
  paymentCredentials!:string;
  //Customer
  accountID!:number;
  customerID!:number;
  contactDataID!:number;
  isBusinessCustomer:boolean=false;
  paymentMethod!:string;
  //Accountdetails
  password!:string;
  repeatedPassword!:string;
  username!:string;

  alerts:Alert[]=[];

  paymentMethods=new Map
  ([
    ["paypal","PayPal"],
    ["debit","EC-Karte"],
    ["bill","Rechnung"]
  ]);

  addAlertForXSeconds(alert:Alert, seconds:number)
  {
    this.alerts.push(alert);
    setTimeout(()=>this.alerts=this.alerts.filter(entry=>entry!=alert),seconds*1000);
  }


  addAccount(_callback:Function)
  {
    let newOrUpdatedAccount:Accountdetails=
      {
        passwordHash: this.password,
        username: this.username
      }
    console.log(this);
    this.accountdetailsService.save(newOrUpdatedAccount)
      .subscribe((res)=>
      {
        if(res.accountID) this.accountID=res.accountID
        _callback();
      },
      (error)=>
      {
        this.addAlertForXSeconds(new Alert('danger',"Fehler beim Erstellen des Accounts"),5);
      }
      )
    console.log(this);
    console.log(this.accountID);
  }

  addContactData(_callback:Function)
  {

    let newOrUpdatedContactData:Contactdata=
      {
        cityName: this.cityName,
        firstName: this.firstName,
        lastName: this.lastName,
        mailAddress: this.mailAddress,
        phone: this.phone,
        postalCode: this.postalCode,
        streetName: this.streetName,
        streetNumber: this.streetNumber,
        paymentCredentials:this.paymentCredentials
      }

    this.contactdataService.save(newOrUpdatedContactData)
      .subscribe((res)=>
      {
        if(res.contactDataID) this.contactDataID=res.contactDataID

        _callback();
      },
      (error)=>
      {
        this.addAlertForXSeconds(new Alert('danger',"Fehler beim Erstellen der Kontaktdaten"),5);
      }
        );
  }

  addCustomer()
  {
    console.log(this.accountID);
    console.log(this.contactDataID);

    let newOrUpdatedCustomer:Customer=
      {
        isBusinessCustomer: this.isBusinessCustomer,
        paymentMethod: this.paymentMethod,
        contactDataID:this.contactDataID,
        accountID:this.accountID,
      }

    console.log(newOrUpdatedCustomer);
    this.customerService.save(newOrUpdatedCustomer)
      .subscribe((res)=>
      {
        this.addAlertForXSeconds(new Alert('success',"Kunde erfolgreich angelegt"),5);
      },
        (error)=>
        {
          this.addAlertForXSeconds(new Alert('danger',"Fehler beim Erstellen des Kunden"),5);
        });
  }


  addOrUpdateCustomerAndDetails(addsNewCustomer:boolean)
  {

    var username = this.firstName.trim().replace(" ", ".") + "." + this.lastName.trim().replace(" ", ".");
    this.username = username.toLowerCase();

    if(addsNewCustomer)
    {
      this.addAccount(()=>this.addContactData(()=>this.addCustomer()));
    }
    else
    {
      let newOrUpdatedAccount:Accountdetails=
        {
          passwordHash: this.password,
          username: this.username
        }
      let newOrUpdatedContactData:Contactdata=
        {
          cityName: this.cityName,
          firstName: this.firstName,
          lastName: this.lastName,
          mailAddress: this.mailAddress,
          phone: this.phone,
          postalCode: this.postalCode,
          streetName: this.streetName,
          streetNumber: this.streetNumber,
          paymentCredentials:this.paymentCredentials
        }
      let newOrUpdatedCustomer:Customer=
        {
          isBusinessCustomer: this.isBusinessCustomer,
          paymentMethod: this.paymentMethod,
          contactDataID:this.contactDataID,
          accountID:this.accountID,
        }
      this.contactdataService.updateContactdata(this.contactDataID, newOrUpdatedContactData)
        .subscribe((res)=>
        {
          this.addAlertForXSeconds(new Alert('success',"Kontaktdaten erfolgreich geändert"),5);
        },
        (error)=>
        {
          this.addAlertForXSeconds(new Alert('danger',"Fehler beim Ändern der Kontaktdaten"),5);
        });
      this.customerService.updateCustomer(this.customerID, newOrUpdatedCustomer)
        .subscribe((res)=>
        {
          this.addAlertForXSeconds(new Alert('success',"Kunde erfolgreich geändert"),5);
        },
        (error)=>
        {
          this.addAlertForXSeconds(new Alert('danger',"Fehler beim Ändern des Kunden"),5);
        });
      this.accountdetailsService.updateUsername(this.accountID,this.username)
        .subscribe((res)=>
        {
          this.addAlertForXSeconds(new Alert('success',"Nutzernamen erfolgreich geändert"),5);
        },
        (error)=>
        {
          this.addAlertForXSeconds(new Alert('danger',"Fehler beim Ändern des Nutzernamen"),5);
        });
      if(this.password) this.accountdetailsService.updateAccountdetails(this.accountID, newOrUpdatedAccount)
        .subscribe((res)=>
        {
          this.addAlertForXSeconds(new Alert('success',"Passwort erfolgreich geändert"),5);
        },
        (error)=>
        {
          this.addAlertForXSeconds(new Alert('danger',"Fehler beim Ändern des Passworts"),5);
        });
    }

  }

  searchForCustomer(intoFormular:boolean,_callback1:Function, _callback2:Function)
  {
    this.customerService.getCustomer(this.customerID).subscribe(data=>
    {
      this.foundCustomer = data;
      if(data.accountID) this.accountID=data.accountID
      if(data.contactDataID) this.contactDataID=data.contactDataID

      if(intoFormular)
      {
        if(data.contactDataID)this.contactDataID=data.contactDataID
        this.isBusinessCustomer=data.isBusinessCustomer
        this.paymentMethod=data.paymentMethod
      }

      _callback1();
      _callback2();
    },
    (error)=>
    {
      this.addAlertForXSeconds(new Alert('danger',"Kein Kunde mit dieser Kundennummer vorhanden"),5);
    });
  }


  searchForAccountdetails(intoFormular:boolean)
  {
    this.accountdetailsService.getAccountdetails(this.accountID).subscribe(data=>
    {
      this.foundAccountdetails = data;
      if(intoFormular) this.username=data.username;
    },
    (error)=>
    {
      this.addAlertForXSeconds(new Alert('danger',"Kein Account für diesen Kunden vorhanden"),5);
    });
  }


  searchForContactData(intoFormular:boolean)
  {
    this.contactdataService.getContactdata(this.contactDataID).subscribe(data=>
    {
      this.foundContactData = data;
      if(intoFormular)
      {
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.streetName = data.streetName
        this.streetNumber = data.streetNumber
        this.postalCode = data.postalCode
        this.cityName = data.cityName
        this.phone = data.phone
        this.mailAddress = data.mailAddress
        if (data.paymentCredentials) this.paymentCredentials = data.paymentCredentials
      }
    },
    (error)=>
    {
      this.addAlertForXSeconds(new Alert('danger',"Keine Kontaktdaten für diesen Kunden vorhanden"),5);
    });
  }

  submitSearch(intoFormular:boolean)
  {
    console.log(this.customerID);
    this.foundCustomer=null;
    this.foundAccountdetails=null;
    this.foundContactData=null;

    if(this.customerID!=1)
    {
      this.searchForCustomer(intoFormular,()=>this.searchForAccountdetails(intoFormular),()=>this.searchForContactData(intoFormular))
    }

  }


  deleteCustomer()
  {
    this.customerService.delete(this.customerID)
      .subscribe((res)=>
      {
        this.addAlertForXSeconds(new Alert('success',"Kunde erfolgreich gelöscht"),5);
      },
      (error)=>
      {
        this.addAlertForXSeconds(new Alert('danger',"Fehler beim Löschen des Kunden"),5);
      });
  }

  patchBookings(_callback:Function)
  {

    let bookingNoOfCustomer:number[]=[];
    this.bookingService.getBookingsByCustomerID(this.customerID)
      .subscribe((data)=>
      {
        console.log(data);
        data.forEach((data)=>{if(data && data.bookingNo) {bookingNoOfCustomer.push(data.bookingNo)}})
        console.log(bookingNoOfCustomer)
        if(bookingNoOfCustomer)
        {
          let currentIdx=0;
          bookingNoOfCustomer.forEach((bookingNo)=>
          {
            currentIdx++;
            this.bookingService.patchBookingsAtCustomerDelete(bookingNo).subscribe(()=>
            {
              if(currentIdx==bookingNoOfCustomer.length-1) _callback();
            },
            (error)=>
            {
              this.addAlertForXSeconds(new Alert('danger',"Abbruch: Fehler beim Patchen der Buchungen"),5);
            });
          })

        }
        else _callback();
      })

  }
  patchBookingRequests(_callback:Function)
  {
    let bookingRequestIDsOfCustomer:number[]=[];
    this.bookingRequestService.getBookingRequestIDsByCustomerID(this.customerID)
      .subscribe((data)=>
      {
        console.log(data);
        data.forEach((data)=>{if(data && data.bookingRequestID) {bookingRequestIDsOfCustomer.push(data.bookingRequestID)}})
        console.log(bookingRequestIDsOfCustomer)
        if(bookingRequestIDsOfCustomer.length)
        {
          let currentIdx=0;
          bookingRequestIDsOfCustomer.forEach((bookingRequestID)=>
          {
            currentIdx++;
            this.bookingRequestService.patchBookingRequestsAtCustomerDelete(bookingRequestID)
              .subscribe(()=>
              {
                if(currentIdx==bookingRequestIDsOfCustomer.length-1) _callback();
              },
              (error)=>
              {
                this.addAlertForXSeconds(new Alert('danger',"Abbruch: Fehler beim Patchen der Buchungsanfragen"),5);
              });

          })
        }
        else _callback();
      })
  }


  deleteCustomerAndDetails()
  {
    this.foundCustomer=null;
    this.foundAccountdetails=null;
    this.foundContactData=null;

    this.patchBookings(()=>this.patchBookingRequests(()=>this.deleteCustomer()));


  }
}
