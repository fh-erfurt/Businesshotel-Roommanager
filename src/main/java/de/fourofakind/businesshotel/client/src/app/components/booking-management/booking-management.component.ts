import {Component, Input, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {BookingService} from "../../services/booking/booking.service";
import {Booking, ConferenceRoomBooking, HotelRoomBooking, RawData} from "../../services/booking/booking";
import {formatDate} from "@angular/common";
import {RoomService} from "../../services/room/room.service";
import {Room} from "../../services/room/room";
import {parseDate} from "ngx-bootstrap/chronos";



@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
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

  isChecked:boolean = false;
  customerID!:number;
  bookingNo!:number;
  startDate!:string;
  startTime!:string;
  specialWishes!:string;
  roomNo!:number;
  rooms!:Room[];
  endDate!:string;
  endTime!:string;
  bookingType!:string;
  booking!:Booking;
  foundBooking!:Booking | null;
  bookings:Booking[]=[];
  hotelRoomBookings!:Booking[];
  conferenceRoomBookings!:Booking[];
  minDateStart!:string;
  minDateEnd!:string;
  startTimestamp!:Date;
  endTimestamp!:Date;
  calculatedPricing!:number;
  pricePerUnit!: number;


  constructor(private bookingService: BookingService, private roomService: RoomService) {
  }

  ngOnInit()
  {

      let today;

      if(new Date().getMonth().toString().length==1)
      {
        today=new Date().getFullYear()+"-0"+new Date().getMonth()+"-"+new Date().getDate();
      }
      else
      {
        today=new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();
      }

      console.log(today);
      this.minDateStart= today;
      this.minDateEnd= today;

      this.bookingService.getBookings().subscribe((data)=>
      {
        this.bookings=data;
        for (let i=0; i<this.bookings.length;i++)
        {
          this.bookings[i].startDate=formatDate(this.bookings[i].startDate,"dd.MM.yyyy HH:mm:ss","de",);
          this.bookings[i].endDate=formatDate(this.bookings[i].endDate,"dd.MM.yyyy HH:mm:ss","de",);
        }
      })
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

  prepareAndInsertBooking(addsNewBooking:boolean)
  {
    console.log(this.calculatedPricing);
    let newOrUpdatedBooking:Booking =
      {
        customerID:this.customerID,
        roomNo:this.roomNo,
        startDate:this.startDate+"T"+this.startTime+"+01:00",
        endDate:this.endDate+"T"+this.endTime+"+01:00",
        empNo:1, //TODO:Muss noch ersetzt werden
        pricing:this.calculatedPricing,
        specialWishes:this.specialWishes,
      };

    if(addsNewBooking)
    {
      this.bookingService.save(newOrUpdatedBooking,this.bookingType).subscribe((data)=>console.log(data));
    }
    else
    {
      this.bookingService.updateBooking(this.bookingNo, newOrUpdatedBooking).subscribe((data)=>console.log(data));
    }

  }


  addOrUpdateBooking(addsNewBooking:boolean)
  {
    this.startTimestamp=parseDate(this.startDate+"T"+this.startTime)
    this.endTimestamp=parseDate(this.endDate+"T"+this.endTime)
    this.getPricePerUnit(()=>this.calculatePricing(()=>this.prepareAndInsertBooking(addsNewBooking)))
  }


  getValidRooms(_callback?:Function)
  {
    if (this.bookingType=="hotelRoom")
    {
      this.roomService.getHotelRooms().subscribe(data=> {
        console.log(data);
        this.rooms=data;
        console.log(this.rooms);
        if(_callback) _callback();
      })
    }
    else
    {
      this.roomService.getConferenceRooms().subscribe(data=> {
        console.log(data);
        this.rooms=data;
        console.log(this.rooms);
        if(_callback) _callback();
      })
    }
  }



  submitSearch()
  {

    this.foundBooking=null;
    console.log(this.bookingNo);

    this.bookingService.getBooking(this.bookingNo).subscribe(data=>
    {
      data.startDate=formatDate(data.startDate,"dd.MM.yyyy HH:mm:ss","de");
      data.endDate=formatDate(data.endDate,"dd.MM.yyyy HH:mm:ss","de");
      this.foundBooking=data;
    })

  }

  getBookingType(_callback:Function)
  {
    this.bookingService.getBooking(this.bookingNo).subscribe(data=>
    {
      if(data._links?.hotelRoomBooking) this.bookingType="hotelRoom";
      else if(data._links?.conferenceRoomBooking) this.bookingType="conferenceRoom";
      _callback();
    })
  }

  getBookingData()
  {
    this.foundBooking=null;
    console.log(this.rooms);
    this.bookingService.getBooking(this.bookingNo).subscribe(data=>
    {
      this.foundBooking=data;
      data.startDate=formatDate(data.startDate,"yyyy-MM-dd HH:mm:ss","de");
      data.endDate=formatDate(data.endDate,"yyyy-MM-dd HH:mm:ss","de");
      this.customerID=data.customerID;
      this.roomNo=data.roomNo;
      this.startDate=formatDate(data.startDate,"yyyy-MM-dd","de");
      this.startTime=formatDate(data.startDate,"HH:mm","de");
      this.endDate=formatDate(data.endDate,"yyyy-MM-dd","de");
      this.endTime=formatDate(data.endDate,"HH:mm","de");
      this.specialWishes=data.specialWishes
    });
    return;
  }

  loadBookingInfoToFormular()
  {
    this.getBookingType(()=>this.getValidRooms(()=>this.getBookingData()))
  }

  deleteBooking()
  {
    this.bookingService.delete(this.bookingNo);
  }

}
