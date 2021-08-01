import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import {AccountdetailsService} from "../../services/accountdetails/accountdetails.service";
import {ContactdataService} from "../../services/contactdata/contactdata.service";
import {Customer} from "../../services/customer/customer";
import {Accountdetails} from "../../services/accountdetails/accountdetails";
import {Contactdata} from "../../services/contactdata/contactdata";
import {BookingService} from "../../services/booking/booking.service";
import {BookingrequestService} from "../../services/bookingrequest/bookingrequest.service";

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


  paymentMethods=new Map
  ([
    ["paypal","PayPal"],
    ["debit","EC-Karte"],
    ["bill","Rechnung"]
  ]);

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
        else console.log("keine accountID angekommen");

        _callback();
      })
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
        else console.log("keine accountID angekommen");

        _callback();
      });
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
    this.customerService.save(newOrUpdatedCustomer);
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
      this.contactdataService.updateContactdata(this.contactDataID, newOrUpdatedContactData).subscribe((res)=>console.log(res));
      this.customerService.updateCustomer(this.customerID, newOrUpdatedCustomer).subscribe((res)=>console.log(res));
      this.accountdetailsService.updateUsername(this.accountID,this.username)
      if(this.password) this.accountdetailsService.updateAccountdetails(this.accountID, newOrUpdatedAccount).subscribe((res)=>console.log(res));
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
    })
  }


  searchForAccountdetails(intoFormular:boolean)
  {
    this.accountdetailsService.getAccountdetails(this.accountID).subscribe(data=>
    {
      this.foundAccountdetails = data;
      if(intoFormular) this.username=data.username;
    })
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
    })
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
        console.log(res);
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
          bookingNoOfCustomer.forEach((bookingNo)=>
          {
            this.bookingService.patchBookingsAtCustomerDelete(bookingNo).subscribe(()=>console.log("noice"));
          })
          _callback();
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
