import {Component, HostListener, OnInit, SimpleChanges} from '@angular/core';
import {environment} from "../../../environments/environment";
import {BookingrequestService} from "../../services/bookingrequest/bookingrequest.service";
import {RootObject} from "../../services/bookingrequest/bookingrequest";
import {ActivatedRoute, ParamMap } from '@angular/router';
import {RoomService} from "../../services/room/room.service";
import {Room} from "../../services/room/room";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {formatDate} from "@angular/common";
import {BookingCalendar} from "./booking-calendar.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {BookingService} from "../../services/booking/booking.service";
import {Booking} from "../../services/booking/booking";

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
  timeLabel: string = "Uhrzeit:"
  form!: FormGroup;
  bookings: Booking[] = new Array(0);
  unavailableDates: dateTimeSpan[] = new Array(0)
  buttonDisabled = false;
  isConferenceRoom = false;
  submitted = false

  private selectedFromDate: Date | null
  private selectedToDate: Date | null
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
              private bookingService: BookingService)
  {
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

    this.dateLabel = "Datum: "
      + (this.selectedFromDate ? formatDate(this.selectedFromDate, "dd.MM.yyyy", "de") : "Datum Wählen")
      + (this.selectedToDate ? " bis " + formatDate(this.selectedToDate, "dd.MM.yyyy", "de") : "")

    // this.timeLabel = "Uhrzeit: "
    //   + (this.selectedFromDate ? formatDate(this.selectedFromDate, "hh:mm:ss", "de") : "Datum Wählen")
    //   + (this.selectedToDate ? "Uhr bis " + formatDate(this.selectedToDate, "hh.mm.ss", "de") + "Uhr" : "")

  }

  get f() { return this.form.controls; }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
/*
    this.registrationService.register(this.f.lastName.value,
      this.f.firstName.value,
      this.f.companyName.value,
      this.f.emailAddress.value,
      this.f.phoneNumber.value,
      this.f.username.value,
      this.f.password.value,
      this.f.passwordVerify.value)
*/

  }

  @HostListener('window:resize', ['$event'])
  getWindowSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  updateDateTimeLabel(selectedFromDate?: Date | null, selectedToDate?: Date | null) {
    this.selectedFromDate = selectedFromDate!=undefined ? selectedFromDate : this.selectedFromDate
    this.selectedToDate = selectedToDate ? selectedToDate : null

    this.selectedFromDate?.setHours(
      this._startTime.hour,
      this._startTime.minute
    )

    this.selectedToDate?.setHours(
      this._endTime.hour,
      this._endTime.minute
    )

    this.dateLabel = "Datum: "
      + (this.selectedFromDate ? formatDate(this.selectedFromDate, "dd.MM.yyyy", "de") : "Datum Wählen")
      + (this.selectedToDate ? " bis " + formatDate(this.selectedToDate, "dd.MM.yyyy", "de") : "")

    this.timeLabel = "Uhrzeit: "
      + (this.selectedFromDate ? formatDate(this.selectedFromDate, "hh:mm:ss", "de") : "Datum Wählen")
      + (this.selectedToDate ? "Uhr bis " + formatDate(this.selectedToDate, "hh.mm.ss", "de") + "Uhr" : "")
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      companyName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordVerify: ['', Validators.required]
    });

    this.calendarSubscription = this.bookingCalendar.selectedFromDate$
      .subscribe(selectedFromDate => this.updateDateTimeLabel(selectedFromDate, undefined));

    this.calendarSubscription = this.bookingCalendar.selectedToDate$
      .subscribe(selectedToDate => this.updateDateTimeLabel(undefined, selectedToDate));


    this.form = this.formBuilder.group({
      unitCount: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.bookingService.getBookings()
      .subscribe((data: Booking[])=>{
        this.bookings = data;
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

  // getSelectedRoom() {
  //   if (this.selectedRoom) {
  //     return this.selectedRoom
  //   } else {
  //
  //
  //   }
  // }

}
