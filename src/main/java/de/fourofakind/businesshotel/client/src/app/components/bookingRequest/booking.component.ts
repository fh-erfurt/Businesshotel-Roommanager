import {AfterViewInit, Component, HostListener, OnInit, SimpleChanges} from '@angular/core';
import {environment} from "../../../environments/environment";
import {BookingrequestService} from "../../services/bookingrequest/bookingrequest.service";
import {RootObject} from "../../services/bookingrequest/bookingrequest";
import {ActivatedRoute, ParamMap } from '@angular/router';
import {RoomService} from "../../services/room/room.service";
import {Room} from "../../services/room/room";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {formatDate} from "@angular/common";
import {BookingCalendar} from "./booking-calendar.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {BookingService} from "../../services/booking/booking.service";
import {errors, RegistrationService} from "../../services/registration/registration.service";
import {Booking, BookingLinks} from "../../services/booking/booking";
import {validateEmail, validateIban, validatePhoneNumber} from "../../services/registration/helpers.validator";
import {Contactdata} from "../../services/contactdata/contactdata";
import {ContactdataService} from "../../services/contactdata/contactdata.service";
import {CustomerService} from "../../services/customer/customer.service";
import {Customer} from "../../services/customer/customer";
import {Accountdetail} from "../../services/accountdetails/accountdetail";
import {AccountdetailsService} from "../../services/accountdetails/accountdetails.service";
import {Alert} from "../../app.component";

type dateTimeSpan = {
  startDate: Date,
  endDate: Date
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  rooms!: RootObject;
  currency!: string;
  roomID?: string | null
  roomNumber: number
  pricesLabel: string = "Preis pro Nacht"
  fullPriceLabel: string = "0,-€"
  unitLabel: string = "Nächte"
  startDateTimeLabel: string = "Datum: bitte wählen"
  endDateTimeLabel: string = ""
  timeLabel: string = "Uhrzeit:"
  bookingForm!: FormGroup;
  existingBookings: Booking[] = new Array(0);
  unavailableDates: dateTimeSpan[] = new Array(0)
  buttonDisabled = false;
  isConferenceRoom = false;
  submitted = false
  isMobileDevice = false
  isBusinessCustomer: boolean = false
  dataSuccessfullySaved: boolean = false
  isLoggedIn: boolean = false
  dateSelected: boolean = false
  timeSelected: boolean = false
  pageDidLoad: boolean = false
  dateUnavailable: boolean = false

  errorMessage: string = ""

  paymentCredentialsLabel: string = ""
  paymentCredentialsErrorLabel: string = ""
  paymentCredentialsNameLabel: string = ""

  booking: Booking
  contactData: Contactdata
  customer: Customer
  accountDetails: Accountdetail

  public selectedFromDate: Date | null
  public selectedToDate: Date | null
  private calendarSubscription!: Subscription;
  private timePickerSubscription!: Subscription

  alerts:Alert[]=[];

  // timePicker
  // public startTime: BehaviorSubject<NgbTimeStruct> = new BehaviorSubject<NgbTimeStruct>({hour: 8, minute: 0, second: 0})
  // public startTime$: Observable<NgbTimeStruct> = this.startTime.asObservable();
  _startTime: NgbTimeStruct = {hour: 8, minute: 0, second: 0}
  startHourStep = 1;
  startMinuteStep = 15;

  // public endTime: BehaviorSubject<NgbTimeStruct> = new BehaviorSubject<NgbTimeStruct>({hour: 14, minute: 0, second: 0})
  // public endTime$: Observable<NgbTimeStruct> = this.startTime.asObservable();
  _endTime: NgbTimeStruct = {hour: 14, minute: 0, second: 0}
  endHourStep = 1;
  endMinuteStep = 15;

  get startTime() {
    const startTime = new Date(1970, 1, 1,  this._startTime.hour, this._startTime.minute)
    return formatDate(startTime, "HH:mm", "de")
  }
  get endTime() {
    const endTime = new Date(1970, 1, 1,  this._endTime.hour, this._endTime.minute)
    return formatDate(endTime, "HH:mm", "de")
  }


  addAlertForXSeconds(alert:Alert, seconds:number)
  {
    this.alerts.push(alert);
    setTimeout(()=>this.alerts.pop(),seconds*1000);
  }

  selectedRoom: Room = {roomNo: 0,
    areaInSqrMetre: 0,
    category: "NOCAT",
    pricePerUnit: 0,
    updatedAt: "",
    createdAt: "",
    roomType: "NOTYPE"
  }



  private screenHeight: number = 0;
  private screenWidth: number = 0;

  constructor(private bookingrequestService: BookingrequestService,
              private route: ActivatedRoute,
              private roomService: RoomService,
              private formBuilder: FormBuilder,
              public bookingCalendar: BookingCalendar,
              private bookingService: BookingService,
              private registrationService: RegistrationService,
              private contactDataService: ContactdataService,
              private customerService: CustomerService,
              private accountDetailsService: AccountdetailsService)
  {
    this.roomNumber = 0

    this.booking = {
      roomNo: 0,
      pricing: 0,
      empNo: 0,
      startDate: "",
      endDate: "",
      specialWishes: "",
      customerID: 0
    }

    this.contactData = {
      firstName: "",
      lastName: "",
      mailAddress: ""
    }

    this.customer = {
      isBusinessCustomer: false
    }

    this.accountDetails = {
      passwordHash: "",
      username: "",
    };

    this.selectedFromDate = bookingCalendar.fromDate ?
      new Date(bookingCalendar.fromDate.year,
        bookingCalendar.fromDate.month - 1,
        bookingCalendar.fromDate.day,
        this._startTime.hour,
        this._startTime.minute)
      : null;

    this.selectedToDate = bookingCalendar.toDate ?
      new Date(bookingCalendar.toDate.year,
        bookingCalendar.toDate.month - 1,
        bookingCalendar.toDate.day,
        this._endTime.hour,
        this._endTime.minute)
      : null;



    // this.dateLabel = "Datum: "
    //   + (this.selectedFromDate ? formatDate(this.selectedFromDate, "dd.MM.yyyy", "de") : "")
    //   + (this.selectedToDate ? " bis " + formatDate(this.selectedToDate, "dd.MM.yyyy", "de") : "")

    // this.timeLabel = "Uhrzeit: "
    //   + (this.selectedFromDate ? formatDate(this.selectedFromDate, "hh:mm:ss", "de") : "")
    //   + (this.selectedToDate ? "Uhr bis " + formatDate(this.selectedToDate, "hh.mm.ss", "de") + "Uhr" : "")

  }



  @HostListener('window:resize', ['$event'])
  getWindowSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 1300) {
      this.isMobileDevice = true
    } else {
      this.isMobileDevice = false
    }
  }

  toggleIsBusinessCustomer() {
    this.isBusinessCustomer = !this.isBusinessCustomer

    if (this.isBusinessCustomer) {
      this.bookingForm.addControl('companyName', new FormControl('', Validators.required));
    } else {
      this.bookingForm.removeControl("companyName")
    }
  }

  ngOnDestroy() {
    this.selectedFromDate = null
    this.selectedToDate = null
  }

  ngOnInit(): void {

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        const id:number = Number((params.get('roomID')))

        this.roomNumber = id

        this.roomService.getRoom(id)
          .subscribe((data: Room)=> {
            this.selectedRoom = data;

            if (data.roomType === "CONFERENCEROOM") {
              this.pricesLabel = "Preis pro Stunde"
              this.unitLabel = "Stunden"
              this.isConferenceRoom = true
              this.bookingCalendar.isConferenceRoom = true
            } else {
              this.pricesLabel = "Preis pro Nacht"
              this.unitLabel = "nächte"
              this.isConferenceRoom = false
              this.bookingCalendar.isConferenceRoom = false
            }
          })
      })

    this.isLoggedIn = localStorage.getItem('user') ? true : false

    if (this.isLoggedIn) {
      this.bookingForm = this.formBuilder.group({
        specialWishes: [''],
        streetName: ['', Validators.required],
        streetNumber: ['', Validators.required],
        postalCode: ['', Validators.required],
        cityName: ['', Validators.required],
        paymentMethod: ['', Validators.required]
      }, {
        validators: [validateIban()]
      });
    } else {
      this.bookingForm = this.formBuilder.group({
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        emailAddress: ['', Validators.required],
        phoneNumber: '',
        specialWishes: [''],
        streetName: ['', Validators.required],
        streetNumber: ['', Validators.required],
        postalCode: ['', Validators.required],
        cityName: ['', Validators.required],
        paymentMethod: ['', Validators.required]
      }, {
        validators: [validateEmail(), validatePhoneNumber(), validateIban()]
      });
    }

    if (this.isLoggedIn) {
      this.customerService.getCustomerByAccountID(Number(localStorage.getItem('userID')))
        .subscribe(result => {
          if (result) {
            this.customer = result

            this.accountDetailsService.getAccountdetails(result.accountID ? result.accountID : 1)
              .subscribe(result => {
                if (result) {
                  this.accountDetails = result
                }
              }, error => {

              })

            this.contactDataService.getContactdata(result.contactDataID ? result.contactDataID : 1)
              .subscribe(result => {
                if (result) {
                  this.contactData = result

                  console.log("CustomerResult: ", result)

                  if (result.streetName) {
                    console.log("removeControl")
                    this.bookingForm.removeControl("streetName")
                  }
                  if (result.streetNumber) {
                    this.bookingForm.removeControl("streetNumber")
                  }
                  if (result.postalCode) {
                    this.bookingForm.removeControl("postalCode")
                  }
                  if (result.cityName) {
                    this.bookingForm.removeControl("cityName")
                  }
                  if (result.paymentCredentials) {
                    this.bookingForm.removeControl("paymentCredentials")
                  }
                  if (result.paymentCredentials) {
                    this.bookingForm.removeControl("paymentMethod")
                  }

                  this.pageDidLoad = true

                }
              }, error => {

              })
          }

        }, errors => {

        })
      // this.contactDataService.getContactdata()
    } else {
      this.pageDidLoad = true
    }

    this.getWindowSize()

    this.calendarSubscription = this.bookingCalendar.selectedFromDate$
      .subscribe(selectedFromDate => this.updateDateTimeLabel(selectedFromDate, undefined));

    this.calendarSubscription = this.bookingCalendar.selectedToDate$
      .subscribe(selectedToDate => this.updateDateTimeLabel(undefined, selectedToDate));

    this.calendarSubscription = this.bookingCalendar.dateIsUnavailableObservable$
      .subscribe(dateIsUnavailableObservable => {
        if (dateIsUnavailableObservable === "unavailable") {
          if (this.alerts.length < 1) {
            this.addAlertForXSeconds(new Alert('danger', "Gewähltes Datum ist nicht verfügbar"), 3);
          }
        } else if (dateIsUnavailableObservable === "unavailableRange") {
          if (this.alerts.length < 1) {
            this.addAlertForXSeconds(new Alert('danger', "Gewählter Zeitraum nicht verfügbar"), 3);
          }
        }
      })


    this.bookingService.getBookings()
      .subscribe((data: Booking[])=>{
        this.existingBookings = data;
        data.forEach( (booking) => {

          if (booking.roomNo === this.selectedRoom.roomNo) {
            const startDate = new Date(booking.startDate)
            const endDate = new Date(booking.endDate)

            let newDateTimeSpan: dateTimeSpan = {startDate:  new Date(startDate.setDate(startDate.getDate() + 1)), endDate: new Date(endDate.setDate(endDate.getDate() + 1))}
            this.bookingCalendar.unavailableDateRanges.push(newDateTimeSpan)
            console.log("Date: ", formatDate(new Date(booking.startDate), "dd.MM.yyyy", "de"), " bis ", formatDate(new Date(booking.endDate), "dd.MM.yyyy", "de"))
          }

        });

        // let newDateTimeSpan = {startDate: new Date("2021-08-10"), endDate: new Date("2021-08-13")}
        // this.bookingCalendar.unavailableDateRanges.push(newDateTimeSpan)
        // newDateTimeSpan = {startDate: new Date("2021-08-21"), endDate: new Date("2021-08-30")}
        // this.bookingCalendar.unavailableDateRanges.push(newDateTimeSpan)
        // newDateTimeSpan = {startDate: new Date("2021-08-17"), endDate: new Date("2021-08-17")}
        // this.bookingCalendar.unavailableDateRanges.push(newDateTimeSpan)

        // console.log(this.unavailableDates)
      })



    this.currency = environment.currency

    this.bookingrequestService.getRooms()
      .subscribe((data: RootObject)=>{
        this.rooms = data as RootObject;
      })

  }

  paymentMethodChanged() {
    console.log("paymentMethod change")


    if (this.f.paymentMethod.value === "debit" || this.f.paymentMethod.value === "paypal")
    {
      this.bookingForm.addControl('paymentCredentials', new FormControl('', Validators.required));

      if (this.f.paymentMethod.value === "debit")
      {
        this.paymentCredentialsLabel = "Iban *"
        this.paymentCredentialsErrorLabel = "Ungültiges Iban-Format"
        this.paymentCredentialsNameLabel = "iban"
      }
      else if (this.f.paymentMethod.value === "paypal")
      {
        this.paymentCredentialsLabel = "Paypal-Daten *"
        this.paymentCredentialsErrorLabel = "Ungültiges Email-Format"
        this.paymentCredentialsNameLabel = "emailAddress"
      }
    } else {
      this.bookingForm.removeControl("paymentCredentials")
    }

  }

  updateDateTimeLabel(selectedFromDate?: Date | null, selectedToDate?: Date | null) {

    if (selectedFromDate != undefined) {
      this.selectedFromDate = selectedFromDate
    } else if (!selectedFromDate && !selectedToDate) {
      this.selectedFromDate = null
    } else {
      this.selectedFromDate = this.selectedFromDate
    }

    // this.selectedFromDate = selectedFromDate != undefined ? selectedFromDate : this.selectedFromDate
    this.selectedToDate = selectedToDate ? selectedToDate : null

    console.log("selectedFromDate: ", selectedFromDate)
    console.log("selectedToDate: ", selectedToDate)

    // this.selectedFromDate = selectedFromDate ?? null
    // this.selectedToDate = selectedToDate ?? null

    const startDateTime = this.selectedFromDate ? this.selectedFromDate : new Date
    const endDateTime = this.selectedToDate ? this.selectedToDate : startDateTime

    if (selectedFromDate || selectedToDate) {
      const timeDiff = endDateTime.getTime() - startDateTime.getTime();
      const units = this.isConferenceRoom ? timeDiff / (1000 * 3600) : timeDiff / (1000 * 3600 * 24) + 1;
      const fullPrice = this.selectedRoom.pricePerUnit * units

      this.fullPriceLabel = fullPrice + ",-€"
    } else {
      this.fullPriceLabel = "0,-€"
    }

    const displayStartDateTime = new Date(startDateTime)
    const displayEndDateTime = new Date(endDateTime)

    if (this.selectedFromDate) {
      this.dateSelected = true
    } else {
      this.dateSelected = false
    }

    if (!this.isConferenceRoom)
    {
      this.startDateTimeLabel =
        (this.selectedFromDate ? "Anreise: "
          + formatDate(startDateTime,
            "dd.MM.yyyy", "de")
          : "Datum: bitte wählen")

      this.endDateTimeLabel =
        (this.selectedToDate ? " Abreise: "
          + formatDate(displayEndDateTime.setDate(endDateTime.getDate() + 1), "dd.MM.yyyy", "de")
          : (this.selectedFromDate ? " Abreise: "
            + formatDate(displayStartDateTime.setDate(startDateTime.getDate() + 1),
              "dd.MM.yyyy", "de")
            : "" ))
    } else {
      this.startDateTimeLabel =
        (this.selectedFromDate ? "Datum: bitte wählen"
          + formatDate(startDateTime,
            "dd.MM.yyyy", "de")
          : "Datum: bitte wählen")

      this.endDateTimeLabel = ""
    }



  }

  get f() { return this.bookingForm.controls; }

  generateBooking(customerID: number): Booking {
    console.log("generateBooking")
    const startDateTime = new Date(this.selectedFromDate ? this.selectedFromDate : new Date)

    const placeHolderDateTime = new Date(this.selectedToDate ? this.selectedToDate : startDateTime)
    var endDateTime = new Date(this.selectedToDate ? placeHolderDateTime.setDate(this.selectedToDate.getDate()) : placeHolderDateTime.setDate(startDateTime.getDate()))

    if (this.isConferenceRoom) {
      endDateTime = new Date(startDateTime)

      startDateTime.setHours(
        this._startTime.hour,
        this._startTime.minute
      )

      endDateTime.setHours(
        this._endTime.hour,
        this._endTime.minute
      )
    }

    const timeDiff = endDateTime.getTime() - startDateTime.getTime();
    const units = this.isConferenceRoom ? timeDiff / (1000 * 3600) : timeDiff / (1000 * 3600 * 24);

    const fullPrice = this.selectedRoom.pricePerUnit * units

    const booking: Booking = {
      roomNo: this.selectedRoom.roomNo,
      pricing: fullPrice,
      empNo: 1,
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      specialWishes: this.f.specialWishes.value,
      customerID: Number(customerID)
    }

    return booking
  }


  generateContactData(): Contactdata {
    console.log("generateContactData")

    if (this.isLoggedIn) {
      const contactData: Contactdata = {
        firstName: this.contactData.firstName,
        lastName: this.contactData.lastName,
        mailAddress: this.contactData.mailAddress,
        phone: this.contactData.phone,
        streetName: this.contactData.streetName ?? this.f.streetName.value,
        streetNumber: this.contactData.streetNumber ?? this.f.streetNumber.value,
        postalCode: this.contactData.postalCode ?? this.f.postalCode.value,
        cityName: this.contactData.cityName ?? this.f.cityName.value,
        paymentCredentials: this.contactData.paymentCredentials ?? this.f.paymentCredentials.value
      }
      return contactData
    } else {
      const contactData: Contactdata = {
        firstName: this.f.firstName.value,
        lastName: this.f.lastName.value,
        phone: this.f.phoneNumber.value,
        mailAddress: this.f.emailAddress.value,
        streetName: this.f.streetName.value,
        streetNumber: this.f.streetNumber.value,
        postalCode: this.f.postalCode.value,
        cityName: this.f.cityName.value,
        paymentCredentials: this.f.paymentCredentials ? this.f.paymentCredentials.value : null
      }
      return contactData
    }


  }

  generateCustomer(_callBack: Function) {
    console.log("generateCustomer")
    console.log()

    this.contactData = this.generateContactData()

    this.customer.paymentMethod = this.customer.paymentMethod ?? this.f.paymentMethod.value
    console.log("paymentMethod: ", this.customer.paymentMethod)


    if (this.isLoggedIn) {
      console.log("loggedIn")
      console.log()
      console.log("contactData: ", this.contactData)
      console.log("customer: ", this.customer)
      this.contactDataService.updateContactdata(this.customer.contactDataID ?? 1, this.contactData)
        .subscribe(result => {
          console.log("contactDataServiceResult: ", result)

          this.customerService.updateCustomer(this.customer.customerID ?? 1, this.customer)
            .subscribe(result => {
              console.log("customerServiceResult: ", result)
              _callBack()
            }, error => {

            })

        }, error => {

        })


    } else {
      console.log("not loggedIn")
      console.log()

      this.customer.isBusinessCustomer = this.isBusinessCustomer

      const autogeneratedUserPassword = Math.random().toString(36).slice(-8)

      const firstNameLength = this.f.firstName.value.length
      const lastNameLength = this.f.lastName.value.length
      const autogeneratedUserName = this.f.firstName.value.slice(0, Math.round(firstNameLength/2)) + (Math.floor(1000 + Math.random() * 9000)) +  this.f.lastName.value.slice(0, Math.round(lastNameLength/2))

      this.accountDetails = {
        passwordHash: autogeneratedUserPassword,
        username: autogeneratedUserName,
      };

      console.log("accountDetails: ", this.accountDetails)
      console.log("contactData: ", this.contactData)
      console.log("customer: ", this.customer)

      this.registrationService.register(
        this.accountDetails,
        this.contactData,
        this.customer
      )
        .then(customerID => {
          this.dataSuccessfullySaved = true

          this.customer.customerID = Number(customerID)

          console.log("customerSaved: ", customerID)

          alert("Ihr Username lautet: " + this.accountDetails.username + "\n" + "Ihr Passwort lautet: " + autogeneratedUserPassword)

          _callBack()

          // window.location.href = "";
        })
        .catch(error => {
          this.dataSuccessfullySaved = false
          console.log("catch Fehler: ", error)

          switch (error) {
            case errors.unavailableUsername:
              this.errorMessage = "Username bereits vergeben"
              break
            case errors.saveCustomerStatusUnknown:
              this.errorMessage = "Fehler: Sichern Ihrer Nutzerdaten unvollständig"
              break
            case errors.saveAccountDetailsStatusUnknown:
              this.errorMessage = "Fehler: Sichern Ihrer Nutzerdaten unvollständig"
              break
            case errors.saveContactDataStatusUnknown:
              this.errorMessage = "Fehler: Sichern Ihrer Nutzerdaten unvollständig"
              break
            case errors.saveCustomerFailed:
              this.errorMessage = "Fehler: Ihre Nutzerdaten konnten nicht gespeichert werden"
              break
            case errors.saveAccountDetailsFailed:
              this.errorMessage = "Fehler: Ihre Nutzerdaten konnten nicht gespeichert werden"
              break
            case errors.saveContactDataFailed:
              this.errorMessage = "Fehler: Ihre Nutzerdaten konnten nicht gespeichert werden"
              break
            case errors.missingDataBaseConnection:
              this.errorMessage = "Es besteht keine Verbindung zur Datenbankt"
              break
            default:
              break;
          }

          if (error !== errors.success && error !== errors.unavailableUsername) {
            alert(this.errorMessage)
          }
        })
    }

  }

  submit() {
    this.submitted = true;
    console.log("submit")


    if (this.selectedFromDate) {
      this.dateSelected = true
    } else {
      console.log("no selectedFromDate")
      return;
    }

    if (this.isConferenceRoom) {
      if ( this._startTime && this._endTime) {
        this.timeSelected = true
      } else {
        console.log("no startTime")
        return;
      }
    }

    if (this.bookingForm.invalid) {
      console.log("no bookingForm")
      return;
    }

    console.log("no return")

    this.generateCustomer(()=>{

      console.log("callback")

      const customerID = this.customer.customerID ?? 1
      const bookingType = this.isConferenceRoom ? "conferenceRoom" : "hotelRoom"

      this.booking = this.generateBooking(customerID)

      this.bookingService.save(this.booking, bookingType)
        .subscribe(result => {
            console.log("bookingService result: ", result)
            this.startDateTimeLabel = "Datum: bitte wählen"
            this.endDateTimeLabel = ""
            this.selectedFromDate = null
            this.selectedToDate = null
            this._startTime = {hour: 8, minute: 0, second: 0}
            this._startTime = {hour: 14, minute: 0, second: 0}
            this.isLoggedIn = localStorage.getItem('user') ? true : false

            window.location.reload()
            // window.location.href = "";

          },
          (error)=>
          {
            console.log("bookingService: ", error)
            // this.addAlertForXSeconds(new Alert('danger',"Fehler beim Anlegen des Accounts"),5);
          })
    })
  }
}
