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

  public selectedFromDate: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null)
  public selectedToDate: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null)

  public selectedFromDate$: Observable<Date | null> = this.selectedFromDate.asObservable();
  public selectedToDate$: Observable<Date | null> = this.selectedToDate.asObservable();

  private dateIsUnavailable = false
  private dateInUnaviableRange = false
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
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  onDateSelection(date: NgbDate) {

    this.dateIsUnavailable = false
    this.dateInUnaviableRange = false
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
        console.log("unaviable")
        this.dateIsUnavailable = true
      }
      if (this.fromDate?.before(startDate) && !this.isConferenceRoom) {
          if (date.after(endDate) && !this.toDate) {
            console.log("Nope Sorry")
            this.dateIsUnavailable = true
          }
      }
    });

    if (!this.dateIsUnavailable && !this.dateInUnaviableRange) {
      if (!this.fromDate && !this.toDate) {
        this.fromDate = date;

      } else if (this.fromDate && !this.toDate && date.after(this.fromDate) && !this.isConferenceRoom) {
        this.toDate = date;

      } else {
        this.toDate = null;
        this.fromDate = date;
      }
      this.selectedFromDate.next(new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day));
      this.selectedToDate.next(this.toDate ? new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day) : null);
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

  ngOnInit(): void {
  }

}
