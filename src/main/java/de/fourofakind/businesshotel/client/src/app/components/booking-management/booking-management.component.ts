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

    {provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['LL', 'DD.MM.YYYY' ],
        },
        display: {
          dateInput: 'DD-MM-YYYY',
        }
      }
    },
  ],
})


export class BookingManagementComponent implements OnInit {

  constructor(private bookingService: BookingService,
              private roomService: RoomService,
              private roleService: RoleService)
  {}

  ngOnInit()
  {

  }


  private readonly department:string="booking-management";

  //formdata
  booking!: Booking;
  bookingNo!: number;
  bookingType!: string;
  bookings: Booking[] = [];
  calculatedPricing!: number;
  customerID!: number;
  endDate!: string;
  endTime!: string;
  endTimestamp!: Date;
  foundBooking!: Booking | null;
  isChecked: boolean = false;
  occupationChecked: boolean = false;
  pricePerUnit!: number;
  roomNo!: number;
  rooms!: Room[];
  specialWishes!: string;
  startDate!: string;
  startTime!: string;
  startTimestamp!: Date;
  today: Date = new Date();

  //errors
  startDateError:boolean=false;
  endDateInPastError:boolean=false;
  endDateBeforeStartDateError:boolean=false;


  alerts:Alert[]=[];


  /*
  * alert Object and seconds to display the alert as input params
  * produces alert for x seconds dsiplayed on the right side of the management tab
  */
  addAlertForXSeconds(alert:Alert, seconds:number)
  {
    this.alerts.push(alert);
    setTimeout(()=>this.alerts=this.alerts.filter(entry=>entry!=alert),seconds*1000);
  }

  validateDate()
  {
    // console.log(this.startDate)
    // console.log(new Date(this.startDate+"T00:00:00"))
    // console.log(new Date(this.startDate+"T00:00:00").getTime())
    // console.log(parseDate(this.endDate).getMilliseconds())

    if(this.startTime&&this.startDate&&this.endDate&&this.endTime)
    {
      this.startTimestamp=parseDate(this.startDate+"T"+this.startTime)
      this.endTimestamp=parseDate(this.endDate+"T"+this.endTime)

      this.startDateError = this.startTimestamp.getTime() <= this.today.getTime();

      this.endDateInPastError = this.endTimestamp.getTime() <= this.today.getTime();

      this.endDateBeforeStartDateError = this.endTimestamp.getTime() < this.startTimestamp.getTime();
    }


  }

  getPricePerUnit(_callback:Function)
  {
    this.roomService.getRoom(this.roomNo).subscribe(data=>
    {
      this.pricePerUnit=data.pricePerUnit;
      _callback();
    })
  }

  calculatePricing(_callback:Function)
  {
    let timeDifferenceInMilliseconds=this.endTimestamp.getTime()-this.startTimestamp.getTime()
    let divisorToConvertFromMSInDays=1000 * 60 * 60 * 24;
    let divisorToConvertFromMSInHours=60 * 60 * 1000;

    if(this.bookingType==="hotelRoom")
    {
      let pricePerNight:number;
      pricePerNight=this.pricePerUnit

      let timeDifferenceInDays=Math.floor(timeDifferenceInMilliseconds / divisorToConvertFromMSInDays);
      if (timeDifferenceInDays==0) timeDifferenceInDays=1;
      this.calculatedPricing=timeDifferenceInDays*pricePerNight;
      _callback();
    }
    else
    {
      let pricePerHour:number;
      pricePerHour=this.pricePerUnit

      let timeDifferenceInHours=Math.ceil(timeDifferenceInMilliseconds/divisorToConvertFromMSInHours);
      this.calculatedPricing=timeDifferenceInHours*pricePerHour;
      _callback();
    }
  }

  prepareAndInsertBooking(addsNewBooking:boolean,addOrUpdateBookingForm:NgForm)
  {
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

    if (addsNewBooking)
    {
      this.bookingService.save(newOrUpdatedBooking, this.bookingType)
        .subscribe((data) =>
          {
            this.addAlertForXSeconds(new Alert('success', "Buchung erfolgreich angelegt"), 5);
            addOrUpdateBookingForm.resetForm();
          },
          (error) =>
          {
            this.addAlertForXSeconds(new Alert('danger', "Fehler beim Anlegen der Buchung"), 5);
          });
    }
    else
    {
      this.bookingService.updateBooking(this.bookingNo, newOrUpdatedBooking)
        .subscribe((data) =>
          {
            this.addAlertForXSeconds(new Alert('success', "Buchung erfolgreich geändert"), 5);
            addOrUpdateBookingForm.resetForm();
            this.foundBooking = null;
          },
          (error) =>
          {
            this.addAlertForXSeconds(new Alert('danger', "Fehler beim Ändern der Buchung"), 5);
          });
    }
  }



  addOrUpdateBooking(addsNewBooking:boolean, addOrUpdateBookingForm:NgForm)
  {
    if (this.roleService.checkRights(this.department))
    {
      this.startTimestamp=parseDate(this.startDate+"T"+this.startTime)
      this.endTimestamp=parseDate(this.endDate+"T"+this.endTime)
      this.getPricePerUnit(()=>this.calculatePricing(()=>this.prepareAndInsertBooking(addsNewBooking,addOrUpdateBookingForm)))
    }
    else alert("Benötigte Rechte nicht vorhanden")
  }

  filterRoomsByOccupation(isBookingChange:boolean)
  {
    console.log(this.startDate, this.endDate);
    let startTimestamp=this.startDate+"T"+this.startTime+":00.000%2b02:00"
    let endTimestamp=this.endDate+"T"+this.endTime+":00.000%2b02:00"

    this.bookingService.getBookingsByStartDateAndEndDate(startTimestamp, endTimestamp).subscribe(data=>
    {
      console.log(this.rooms);
      data.forEach((booking:Booking) =>
      {
        if(isBookingChange) this.rooms=this.rooms.filter(room=> room.roomNo!==booking.roomNo || room.roomNo===this.roomNo)
        else this.rooms=this.rooms.filter(room=> room.roomNo!==booking.roomNo)
      })
      console.log(this.rooms);
      if(!isBookingChange) this.occupationChecked=true;
    })
  }

  getValidRooms(isBookingChange: boolean, _callback?: Function)
  {
    if (this.bookingType=="hotelRoom")
    {
      this.roomService.getHotelRooms().subscribe(data=> {
        console.log(data);
        this.rooms=data;
        console.log(this.rooms);
        this.filterRoomsByOccupation(isBookingChange);
        if(_callback) _callback();

      })
    }
    else
    {
      this.roomService.getConferenceRooms().subscribe(data=> {
        console.log(data);
        this.rooms=data;
        console.log(this.rooms);
        this.filterRoomsByOccupation(isBookingChange);
        if(_callback) _callback();
      })
    }

  }

  submitSearch(intoFormular:boolean)
  {
    if (this.roleService.checkRights(this.department))
    {
      this.foundBooking=null;
      this.getBookingType(()=>this.getValidRooms(intoFormular, () => this.getBookingData(intoFormular)))
    }
    else alert("Benötigte Rechte nicht vorhanden")
  }

  getBookingType(_callback:Function)
  {
    this.bookingService.getBooking(this.bookingNo).subscribe(data=>
    {
      if(data._links?.hotelRoomBooking) this.bookingType="hotelRoom";
      else if(data._links?.conferenceRoomBooking) this.bookingType="conferenceRoom";
      _callback();
    },
      (error)=>
      {
        this.addAlertForXSeconds(new Alert('danger',"Keine Buchungen zu dieser Buchungsnummer vorhanden"),5);

      })
  }

  getBookingData(intoFormular:boolean)
  {

    this.foundBooking=null;
    console.log(this.rooms);

    this.bookingService.getBooking(this.bookingNo).subscribe(data=>
    {
      this.foundBooking=data;
      this.foundBooking.startDate=formatDate(data.startDate,"yyyy-MM-dd HH:mm:ss","de");
      this.foundBooking.endDate=formatDate(data.endDate,"yyyy-MM-dd HH:mm:ss","de");

      if(intoFormular)
      {
        data.startDate=formatDate(data.startDate,"yyyy-MM-dd HH:mm:ss","de");
        data.endDate=formatDate(data.endDate,"yyyy-MM-dd HH:mm:ss","de");
        this.customerID=data.customerID;
        this.roomNo=data.roomNo;
        this.startDate=formatDate(data.startDate,"yyyy-MM-dd","de");
        this.startTime=formatDate(data.startDate,"HH:mm","de");
        this.endDate=formatDate(data.endDate,"yyyy-MM-dd","de");
        this.endTime=formatDate(data.endDate,"HH:mm","de");
        this.specialWishes=data.specialWishes
        this.filterRoomsByOccupation(true);
      }

    },
      (error)=>
      {
        this.addAlertForXSeconds(new Alert('danger',"Keine Buchungen zu dieser Buchungsnummer vorhanden"),5);
      });
    return;
  }



  deleteBooking(deleteBookingForm:NgForm)
  {
    if (this.roleService.checkRights(this.department))
    {
      this.bookingService.delete(this.bookingNo)
        .subscribe(
          (data)=>
          {
            this.addAlertForXSeconds(new Alert('success',"Buchung erfolgreich gelöscht"),5);
            deleteBookingForm.resetForm()
            this.foundBooking=null;
          },

        (error)=>
        {
          this.addAlertForXSeconds(new Alert('danger',"Fehler beim Löschen der Buchung"),5);
        }
          )
    }
    else alert("Benötigte Rechte nicht vorhanden")
  }

}
