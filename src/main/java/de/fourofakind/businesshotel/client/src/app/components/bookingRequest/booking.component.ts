import {Component, HostListener, OnInit, SimpleChanges} from '@angular/core';
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
import {MustMatch, ValidateEmail} from "../../services/registration/helpers.validator";


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
  pricesLabel: string = "Preis pro Nacht"
  unitLabel: string = "Nächte"
  dateLabel: string = "Datum:"
  startDateTimeLabel: string = "Datum:"
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

  errorMessage: string = ""

  booking: Booking

  public selectedFromDate: Date | null
  public selectedToDate: Date | null
  private calendarSubscription!: Subscription;
  private timePickerSubscription!: Subscription

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
              private registrationService: RegistrationService)
  {
    this.booking = {
      roomNo: 0,
      pricing: 0,
      empNo: 0,
      startDate: "",
      endDate: "",
      specialWishes: "",
      customerID: 0
    }

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

  toggleIsBusinessCustomer() {
    this.isBusinessCustomer = !this.isBusinessCustomer

    if (this.isBusinessCustomer) {
      this.bookingForm.addControl('companyName', new FormControl('', Validators.required));
    } else {
      this.bookingForm.removeControl("companyName")
    }
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

  ngOnInit(): void {

    this.isLoggedIn = localStorage.getItem('user') ? true : false

    if (this.isLoggedIn) {
      this.bookingForm = this.formBuilder.group({
        specialWishes: ''
      });
    } else {
      this.bookingForm = this.formBuilder.group({
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        emailAddress: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        specialWishes: ''
        // ,
        // username: ['', Validators.required],
        // password: ['', Validators.required],
        // passwordVerify: ['', Validators.required],
        // unitCount: ['', Validators.required],
        // startDate: ['', Validators.required],
        // endDate: ['', Validators.required]
      }, {
        validators: ValidateEmail()
      });
    }

    this.getWindowSize()

    this.calendarSubscription = this.bookingCalendar.selectedFromDate$
      .subscribe(selectedFromDate => this.updateDateTimeLabel(selectedFromDate, undefined));

    this.calendarSubscription = this.bookingCalendar.selectedToDate$
      .subscribe(selectedToDate => this.updateDateTimeLabel(undefined, selectedToDate));


    this.bookingService.getBookings()
      .subscribe((data: Booking[])=>{
        this.existingBookings = data;
        data.forEach( (booking) => {

          // let newDateTimeSpan = {startDate: new Date(booking.startDate), endDate: new Date(booking.endDate)}
          // this.unavailableDates.push(newDateTimeSpan)
          // console.log("Date: ", formatDate(new Date(booking.startDate), "dd.MM.yyyy", "de"), " bis ", formatDate(new Date(booking.endDate), "dd.MM.yyyy", "de"))

        });

        let newDateTimeSpan = {startDate: new Date("2021-08-10"), endDate: new Date("2021-08-13")}
        this.bookingCalendar.unavailableDateRanges.push(newDateTimeSpan)
        newDateTimeSpan = {startDate: new Date("2021-08-21"), endDate: new Date("2021-08-30")}
        this.bookingCalendar.unavailableDateRanges.push(newDateTimeSpan)
        newDateTimeSpan = {startDate: new Date("2021-08-17"), endDate: new Date("2021-08-17")}
        this.bookingCalendar.unavailableDateRanges.push(newDateTimeSpan)
      })

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        const id:number = Number((params.get('roomID')))

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

    this.currency = environment.currency

    this.bookingrequestService.getRooms()
      .subscribe((data: RootObject)=>{
        this.rooms = data as RootObject;
      })

  }

  updateDateTimeLabel(selectedFromDate?: Date | null, selectedToDate?: Date | null) {
    this.selectedFromDate = selectedFromDate!=undefined ? selectedFromDate : this.selectedFromDate
    this.selectedToDate = selectedToDate ? selectedToDate : null

    const startDateTime = this.selectedFromDate ? this.selectedFromDate : new Date
    const endDateTime = this.selectedToDate ? this.selectedToDate : startDateTime

    const displayStartDateTime = new Date()
    const displayEndDateTime = new Date()



    if (!this.isConferenceRoom)
    {
      this.startDateTimeLabel =
        (this.selectedFromDate ? "Anreise: "
          + formatDate(startDateTime,
            "dd.MM.yyyy", "de")
          : "Datum: ")

      this.endDateTimeLabel =
        (this.selectedToDate ? " Abreise: "
          + formatDate(displayEndDateTime.setDate(endDateTime.getDate() + 1), "dd.MM.yyyy", "de")
          : (this.selectedFromDate ? " Abreise: "
            + formatDate(displayStartDateTime.setDate(startDateTime.getDate() + 1),
              "dd.MM.yyyy", "de")
            : "" ))
    } else {
      this.startDateTimeLabel =
        (this.selectedFromDate ? "Datum: "
          + formatDate(startDateTime,
            "dd.MM.yyyy", "de")
          : "Datum: ")

      this.endDateTimeLabel = ""
    }


    this.dateLabel =
      (this.selectedFromDate ? "Anreise: "
        + formatDate(startDateTime, "dd.MM.yyyy", "de")
        : "Datum: ")
      + (this.selectedToDate ? " Abreise: "
        + formatDate(displayEndDateTime.setDate(endDateTime.getDate() + 1), "dd.MM.yyyy", "de")
        : (this.selectedFromDate ? " Abreise: " + formatDate(displayStartDateTime.setDate(startDateTime.getDate() + 1), "dd.MM.yyyy", "de") : "" ))

    this.timeLabel = "Uhrzeit: "
      + (this.selectedFromDate ? formatDate(this.selectedFromDate, "hh:mm:ss", "de") : "")
      + (this.selectedToDate ? "Uhr bis " + formatDate(this.selectedToDate, "hh.mm.ss", "de") + "Uhr" : "")
  }

  get f() { return this.bookingForm.controls; }

  generateBooking(customerID: number) {
    console.log("generateBooking")
    const startDateTime = new Date(this.selectedFromDate ? this.selectedFromDate : new Date)


    const placeHolderDateTime = new Date(this.selectedToDate ? this.selectedToDate : startDateTime)
    // const endDateTime = new Date(this.selectedToDate ? this.selectedToDate : startDateTime)
    var endDateTime = new Date(this.selectedToDate ? placeHolderDateTime.setDate(this.selectedToDate.getDate() + 1) : placeHolderDateTime.setDate(startDateTime.getDate() + 1))


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

    console.log("startDateTime: ", startDateTime)

    this.booking = {
      roomNo: this.selectedRoom.roomNo,
      pricing: this.selectedRoom.pricePerUnit * units,
      empNo: 1,
      // startDate: formatDate(startDateTime, "yyyy-MM-ddTHH:mm", "de"),
      // endDate: formatDate(endDateTime, "yyyy-MM-ddTHH:mm", "de"),
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      // startDate: new Date(startDateTime.setDate(startDateTime.getDate() + 1)).toISOString(),
      // endDate: new Date(endDateTime.setDate(endDateTime.getDate() + 1)).toISOString(),
      specialWishes: this.f.specialWishes.value,
      customerID: Number(customerID)
    }

    console.log("this.booking: ",  this.booking)
    console.log("this.booking: ",  JSON.stringify(this.booking))
    console.log("startDateTime: ",  JSON.stringify(startDateTime.toISOString()))
  }

  submit() {
    this.submitted = true;
    console.log("submit")


    if (this.bookingForm.invalid) {
      return;
    }

    const customerID = Number(localStorage.getItem('userID') ? localStorage.getItem('userID') : 0)

    var bookingType = "hotelRoom"

    if (this.isConferenceRoom) {
      bookingType = "conferenceRoom"
    }


    if (this.isLoggedIn) {

      console.log("isLoggedIn")

      const customerID = Number(localStorage.getItem('userID') ? localStorage.getItem('userID') : 0)
      this.generateBooking(customerID)
      this.bookingService.save(this.booking, bookingType)

    } else {
      var companyName = ""

      if (this.isBusinessCustomer) {
        companyName = this.f.companyName.value
      }

      const randomgeneratedUserPassword = Math.random().toString(36).slice(-8)

      const generatedUserName = this.f.firstName.value.slice(0, 4) + this.f.lastName.value.slice(0, 4)

      this.registrationService.register(
        this.f.lastName.value,
        this.f.firstName.value,
        companyName,
        this.f.emailAddress.value,
        this.f.phoneNumber.value,
        generatedUserName,
        randomgeneratedUserPassword,
        randomgeneratedUserPassword,
        this.isBusinessCustomer
      )
        .then(success => {

          alert("customerID: " + success)
          this.dataSuccessfullySaved = true

          this.generateBooking(Number(success))

          this.bookingService.save(this.booking, bookingType)
            .subscribe(result => {
              console.log("bookingService result: ", result)
            },(error)=>
              {
                console.log("bookingService: ", error)
                // this.addAlertForXSeconds(new Alert('danger',"Fehler beim Anlegen des Accounts"),5);
              })

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



}
