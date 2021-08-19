import {Injectable, OnInit} from "@angular/core";
import {RoomService} from "../../services/room/room.service";
import {FormBuilder} from "@angular/forms";
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {formatDate} from "@angular/common";
import {BehaviorSubject, Observable} from "rxjs";
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

type dateTimeSpan = {
  startDate: Date,
  endDate: Date
}

@Injectable({
  providedIn: 'root'
})
export class BookingCalendar implements OnInit {

  // datePicker
  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate | null = null;
  public toDate: NgbDate | null = null;
  unavailableDateRanges: dateTimeSpan[] = new Array(0)
  isBookedByCustomerRanges: dateTimeSpan[] = new Array(0)

  public selectedFromDate: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null)
  public selectedToDate: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null)

  public selectedFromDate$: Observable<Date | null> = this.selectedFromDate.asObservable();
  public selectedToDate$: Observable<Date | null> = this.selectedToDate.asObservable();


  public dateIsUnavailableObservableReason: BehaviorSubject<string> = new BehaviorSubject<string>("")
  public dateIsUnavailableObservable$: Observable<string> = this.dateIsUnavailableObservableReason.asObservable();

  private dateIsUnavailable: boolean = false

  private dateInUnavailableRange = false
  public isConferenceRoom = false
  public model!: NgbDateStruct;

  constructor(
      private calendar: NgbCalendar,
      public formatter: NgbDateParserFormatter)
  {
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 3);
    this.selectedFromDate.next(this.fromDate ? new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day) : null);
    this.selectedToDate.next(this.toDate ? new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day) : null);
    this.dateIsUnavailableObservableReason.next("")
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  onDateSelection(date: NgbDate) {

    this.dateIsUnavailable = false
    this.dateIsUnavailableObservableReason.next("")

    this.dateInUnavailableRange = false

    this.unavailableDateRanges.forEach( (unavailableDateRange) => {

      let startDate = new NgbDate(
        unavailableDateRange.startDate.getUTCFullYear(),
        unavailableDateRange.startDate.getUTCMonth() + 1,
        unavailableDateRange.startDate.getUTCDate()
      )
      let endDate = new NgbDate(
        unavailableDateRange.endDate.getUTCFullYear(),
        unavailableDateRange.endDate.getUTCMonth() + 1,
        unavailableDateRange.endDate.getUTCDate()
      )

      if (date.equals(startDate) || date.equals(endDate) || (date.after(startDate) && date.before(endDate))) {
        console.log("unavailable")
        this.dateIsUnavailable = true
        this.dateIsUnavailableObservableReason.next("unavailable")
      }
      if (this.fromDate?.before(startDate) && !this.isConferenceRoom) {
          if (date.after(endDate) && !this.toDate) {
            console.log("Nope Sorry")
            this.dateIsUnavailable = true
            this.dateIsUnavailableObservableReason.next("unavailableRange")
          }
      }
    });

    this.isBookedByCustomerRanges.forEach( (isBookedByCustomerRange) => {

      let startDate = new NgbDate(
        isBookedByCustomerRange.startDate.getUTCFullYear(),
        isBookedByCustomerRange.startDate.getUTCMonth() + 1,
        isBookedByCustomerRange.startDate.getUTCDate()
      )
      let endDate = new NgbDate(
        isBookedByCustomerRange.endDate.getUTCFullYear(),
        isBookedByCustomerRange.endDate.getUTCMonth() + 1,
        isBookedByCustomerRange.endDate.getUTCDate()
      )

      if (date.equals(startDate) || date.equals(endDate) || (date.after(startDate) && date.before(endDate))) {
        console.log("unavailable")
        this.dateIsUnavailable = true
        this.dateIsUnavailableObservableReason.next("bookedByCustomer")
      }
      if (this.fromDate?.before(startDate) && !this.isConferenceRoom) {
        if (date.after(endDate) && !this.toDate) {
          console.log("Nope Sorry")
          this.dateIsUnavailable = true
          this.dateIsUnavailableObservableReason.next("inRangeOfbookedByCustomer")
        }
      }
    });



    if (!this.dateIsUnavailable && !this.dateInUnavailableRange) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;
        this.selectedFromDate.next(this.fromDate ? new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day) : null);

      } else if (this.fromDate && !this.toDate && date.after(this.fromDate) && !this.isConferenceRoom) {
        this.toDate = date;
        this.selectedToDate.next(this.toDate ? new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day) : null);

      } else if (date.equals(this.fromDate)) {
        this.fromDate = null
        this.toDate = null;
        this.selectedFromDate.next(null);
        this.selectedToDate.next(null);

      } else {
        this.toDate = null;
        this.fromDate = date;

        this.selectedToDate.next(null);
        this.selectedFromDate.next(this.fromDate ? new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day) : null);
      }


    }


  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate) && !this.isConferenceRoom;
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate) && !this.isConferenceRoom;
  }

  isSingle(date: NgbDate) {
    return date.equals(this.fromDate) && !this.toDate;
  }

  isRange(date: NgbDate) {
    return (date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date)) && !this.isConferenceRoom;
  }

  isStart(date: NgbDate) {
    return (this.fromDate && date.equals(this.fromDate)) && !this.isConferenceRoom && (this.isInside(date) || this.isHovered(date) || this.hoveredDate?.after(this.fromDate) || this.toDate) ;
  }

  isEnd(date: NgbDate) {
    return ((this.toDate && date.equals(this.toDate)) || (this.hoveredDate === date && date.after(this.fromDate) && !this.toDate)) && !this.isConferenceRoom;
  }

  isUnavailable(date: NgbDate) {
    var unavailable = false

    this.unavailableDateRanges.forEach( (unavailableDateRange) => {

      let startDate = new NgbDate(
        unavailableDateRange.startDate.getUTCFullYear(),
        unavailableDateRange.startDate.getUTCMonth() + 1,
        unavailableDateRange.startDate.getUTCDate()
      )
      let endDate = new NgbDate(
        unavailableDateRange.endDate.getUTCFullYear(),
        unavailableDateRange.endDate.getUTCMonth() + 1,
        unavailableDateRange.endDate.getUTCDate()
      )

      if (date.equals(startDate) || date.equals(endDate) || (date.after(startDate) && date.before(endDate))) {

        unavailable = true
      }

    });

    return unavailable
  }

  isBookedByCustomer(date: NgbDate) {
    var unavailable = false
    this.isBookedByCustomerRanges.forEach( (isBookedByCustomerRange) => {
      let startDate = new NgbDate(
        isBookedByCustomerRange.startDate.getUTCFullYear(),
        isBookedByCustomerRange.startDate.getUTCMonth() + 1,
        isBookedByCustomerRange.startDate.getUTCDate()
      )
      let endDate = new NgbDate(
        isBookedByCustomerRange.endDate.getUTCFullYear(),
        isBookedByCustomerRange.endDate.getUTCMonth() + 1,
        isBookedByCustomerRange.endDate.getUTCDate()
      )

      if (date.equals(startDate) || date.equals(endDate) || (date.after(startDate) && date.before(endDate))) {
        unavailable = true
      }

    });

    return unavailable
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {

  }

}
