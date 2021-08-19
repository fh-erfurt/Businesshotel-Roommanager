import {Component, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {BookingService} from "../../services/booking/booking.service";
import {Booking} from "../../services/booking/booking";
import {formatDate} from "@angular/common";
import {RoomService} from "../../services/room/room.service";
import {Room} from "../../services/room/room";
import {parseDate} from "ngx-bootstrap/chronos";
import {Alert} from "../../app.component";
import {NgForm} from "@angular/forms";
import {RoleService} from "../../services/role/role.service";


@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['LL', 'DD.MM.YYYY'],
        },
        display: {
          dateInput: 'DD-MM-YYYY',
        }
      }
    },
  ],
})

/**
* Component for Management (Add, Update, Get, Delete) of Bookings
*
* consumes form data and calls corresponding services
*/
export class BookingManagementComponent implements OnInit {

  //form data
  bookingNo!: number;
  bookingType!: string;
  customerID!: number;
  endDate!: string;
  endTime!: string;
  roomNo!: number;
  specialWishes!: string;
  startDate!: string;
  startTime!: string;

  //helper variables
  booking!: Booking;
  bookings: Booking[] = [];
  calculatedPricing!: number;
  endTimestamp!: Date;
  foundBooking!: Booking | null;
  isChecked: boolean = false;
  occupationChecked: boolean = false;
  pricePerUnit!: number;
  rooms!: Room[];
  startTimestamp!: Date;
  today: Date = new Date();

  //custom errors
  startDateError: boolean = false;
  endDateInPastError: boolean = false;
  endDateBeforeStartDateError: boolean = false;
  alerts: Alert[] = [];

  private readonly department: string = "booking-management";

  constructor(private bookingService: BookingService,
              private roomService: RoomService,
              private roleService: RoleService) {
  }

  ngOnInit() {

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
  * checks if dates are neither in the past nor the endtime is before the starttime
  */
  validateDate() {
    
    if (this.startTime && this.startDate && this.endDate && this.endTime) {
      this.startTimestamp = parseDate(this.startDate + "T" + this.startTime)
      this.endTimestamp = parseDate(this.endDate + "T" + this.endTime)

      this.startDateError = this.startTimestamp.getTime() <= this.today.getTime();

      this.endDateInPastError = this.endTimestamp.getTime() <= this.today.getTime();

      this.endDateBeforeStartDateError = this.endTimestamp.getTime() < this.startTimestamp.getTime();
    }


  }

  /**
   * retrieves pricePerUnit associated with roomNo in current form data
   *
   * @param _callback to ensure a controlled function sequence
   *
   */
  getPricePerUnit(_callback: Function) {
    this.roomService.getRoom(this.roomNo).subscribe(data => {
      this.pricePerUnit = data.pricePerUnit;
      _callback();
    })
  }

  /**
   * calculates the pricing depending on the time period given in form data and the pricePerUnit of the wanted room
   *
   * @param _callback to ensure a controlled function sequence
   *
   */
  calculatePricing(_callback: Function) {
    let timeDifferenceInMilliseconds = this.endTimestamp.getTime() - this.startTimestamp.getTime()
    let divisorToConvertFromMSInDays = 1000 * 60 * 60 * 24;
    let divisorToConvertFromMSInHours = 60 * 60 * 1000;

    if (this.bookingType === "hotelRoom") {
      let pricePerNight: number;
      pricePerNight = this.pricePerUnit

      let timeDifferenceInDays = Math.floor(timeDifferenceInMilliseconds / divisorToConvertFromMSInDays);
      if (timeDifferenceInDays == 0) timeDifferenceInDays = 1;
      this.calculatedPricing = timeDifferenceInDays * pricePerNight;
      _callback();
    } else {
      let pricePerHour: number;
      pricePerHour = this.pricePerUnit

      let timeDifferenceInHours = Math.ceil(timeDifferenceInMilliseconds / divisorToConvertFromMSInHours);
      this.calculatedPricing = timeDifferenceInHours * pricePerHour;
      _callback();
    }
  }

  /**
   * filters roomNos of rooms that are already occupied during parts of or the whole time period wished to be booked
   *
   * @param isBookingChange decides if the current chosen roomNo should be displayed (if booking should be changed) or not
   *
   */
  filterRoomsByOccupation(isBookingChange: boolean) {
    
    let startTimestamp = this.startDate + "T" + this.startTime + ":00.000%2b02:00"
    let endTimestamp = this.endDate + "T" + this.endTime + ":00.000%2b02:00"

    this.bookingService.getBookingsByStartDateAndEndDate(startTimestamp, endTimestamp).subscribe(data => {
      
      data.forEach((booking: Booking) => {
        if (isBookingChange) this.rooms = this.rooms.filter(room => room.roomNo !== booking.roomNo || room.roomNo === this.roomNo)
        else this.rooms = this.rooms.filter(room => room.roomNo !== booking.roomNo)
      })
      
      if (!isBookingChange) this.occupationChecked = true;
    })
  }

  /**
   * gets all rooms valid for the chosen bookingType
   *
   * @param isBookingChange for call of filterRoomsByOccupation
   * @param _callback to ensure a controlled function sequence
   *
   */
  getValidRooms(isBookingChange: boolean, _callback?: Function) {
    if (this.bookingType == "hotelRoom") {
      this.roomService.getHotelRooms().subscribe(data => {
        this.rooms = data;
        this.filterRoomsByOccupation(isBookingChange);
        if (_callback) _callback();

      })
    } else {
      this.roomService.getConferenceRooms().subscribe(data => {
        this.rooms = data;
        this.filterRoomsByOccupation(isBookingChange);
        if (_callback) _callback();
      })
    }

  }

  //###################################################################################################################
  //ADD | UPDATE ######################################################################################################
  //###################################################################################################################



  /**
   * adds a new Booking or updates an existing booking according to form data
   *
   * @param addsNewBooking decides if a Booking is added or an existing Booking is updated
   * @param addOrUpdateBookingForm for form resetting after update/add
   *
   */
  prepareAndInsertBooking(addsNewBooking: boolean, addOrUpdateBookingForm: NgForm) {
    let newOrUpdatedBooking: Booking =
      {
        customerID: this.customerID,
        roomNo: this.roomNo,
        startDate: this.startDate + "T" + this.startTime + "+02:00",
        endDate: this.endDate + "T" + this.endTime + "+02:00",
        empNo: parseInt(<string>localStorage.getItem('empNo')),
        pricing: this.calculatedPricing,
        specialWishes: this.specialWishes,
      };

    if (addsNewBooking) {
      this.bookingService.save(newOrUpdatedBooking, this.bookingType)
        .subscribe((data) => {
            this.addAlertForXSeconds(new Alert('success', "Buchung erfolgreich angelegt"), 5);
            addOrUpdateBookingForm.resetForm();
          },
          (error) => {
            this.addAlertForXSeconds(new Alert('danger', "Fehler beim Anlegen der Buchung"), 5);
          });
    } else {
      this.bookingService.updateBooking(this.bookingNo, newOrUpdatedBooking)
        .subscribe((data) => {
            this.addAlertForXSeconds(new Alert('success', "Buchung erfolgreich geändert"), 5);
            addOrUpdateBookingForm.resetForm();
            this.foundBooking = null;
          },
          (error) => {
            this.addAlertForXSeconds(new Alert('danger', "Fehler beim Ändern der Buchung"), 5);
          });
    }
  }


  /**
   * checks for employees rights to do this transaction
   *
   * calls  getPricePerUnit to start the add/update function sequence
   *
   * @param addsNewBooking decides if a Booking is added or an existing Booking is updated
   * @param addOrUpdateBookingForm for form resetting after update/add
   */
  addOrUpdateBooking(addsNewBooking: boolean, addOrUpdateBookingForm: NgForm) {
    if (this.roleService.checkRights(this.department)) {
      this.startTimestamp = parseDate(this.startDate + "T" + this.startTime)
      this.endTimestamp = parseDate(this.endDate + "T" + this.endTime)
      this.getPricePerUnit(() => this.calculatePricing(() => this.prepareAndInsertBooking(addsNewBooking, addOrUpdateBookingForm)))
    } else alert("Benötigte Rechte nicht vorhanden")
  }

  //###################################################################################################################
  //GET ###############################################################################################################
  //###################################################################################################################


  /**
   * starts search function sequence by calling getBookingType
   *
   * @param intoFormular decides if search result should be filled into the form
   */
  submitSearch(intoFormular: boolean) {
    if (this.roleService.checkRights(this.department)) {
      this.foundBooking = null;
      this.getBookingType(() => this.getValidRooms(intoFormular, () => this.getBookingData(intoFormular)))
    } else alert("Benötigte Rechte nicht vorhanden")
  }


  /**
   * retrieves correct bookingType for the given bookingNo and calls getBookingData afterwards
   *
   * @param _callback to ensure controlled function sequence
   */
  getBookingType(_callback: Function) {
    this.bookingService.getBooking(this.bookingNo).subscribe(data => {
        if (data._links?.hotelRoomBooking) this.bookingType = "hotelRoom";
        else if (data._links?.conferenceRoomBooking) this.bookingType = "conferenceRoom";
        _callback();
      },
      (error) => {
        this.addAlertForXSeconds(new Alert('danger', "Keine Buchungen zu dieser Buchungsnummer vorhanden"), 5);

      })
  }


  /**
   * searches for employee associated with the form data
   *
   * @param intoFormular decides if search result should be filled into the form
   */
  getBookingData(intoFormular: boolean) {

    this.foundBooking = null;

    this.bookingService.getBooking(this.bookingNo).subscribe(data => {
        this.foundBooking = data;
        this.foundBooking.startDate = formatDate(data.startDate, "yyyy-MM-dd HH:mm:ss", "de");
        this.foundBooking.endDate = formatDate(data.endDate, "yyyy-MM-dd HH:mm:ss", "de");

        if (intoFormular) {
          data.startDate = formatDate(data.startDate, "yyyy-MM-dd HH:mm:ss", "de");
          data.endDate = formatDate(data.endDate, "yyyy-MM-dd HH:mm:ss", "de");
          this.customerID = data.customerID;
          this.roomNo = data.roomNo;
          this.startDate = formatDate(data.startDate, "yyyy-MM-dd", "de");
          this.startTime = formatDate(data.startDate, "HH:mm", "de");
          this.endDate = formatDate(data.endDate, "yyyy-MM-dd", "de");
          this.endTime = formatDate(data.endDate, "HH:mm", "de");
          this.specialWishes = data.specialWishes
          this.filterRoomsByOccupation(true);
        }

      },
      (error) => {
        this.addAlertForXSeconds(new Alert('danger', "Keine Buchungen zu dieser Buchungsnummer vorhanden"), 5);
      });
    return;
  }

  //###################################################################################################################
  //DELETE ############################################################################################################
  //###################################################################################################################


  /**
   * deletes booking associated with the form data
   *
   * @param deleteBookingForm for resetting the form after deletion
   */
  deleteBooking(deleteBookingForm: NgForm) {
    if (this.roleService.checkRights(this.department)) {
      this.bookingService.delete(this.bookingNo)
        .subscribe(
          (data) => {
            this.addAlertForXSeconds(new Alert('success', "Buchung erfolgreich gelöscht"), 5);
            deleteBookingForm.resetForm()
            this.foundBooking = null;
          },

          (error) => {
            this.addAlertForXSeconds(new Alert('danger', "Fehler beim Löschen der Buchung"), 5);
          }
        )
    } else alert("Benötigte Rechte nicht vorhanden")
  }

}
