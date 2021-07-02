import {Component, Input, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {BookingService} from "../../services/booking/booking.service";
import {Booking, ConferenceRoomBooking, HotelRoomBooking, RawData} from "../../services/booking/booking";
import {formatDate} from "@angular/common";
import {RoomService} from "../../services/room/room.service";
import {Room} from "../../services/room/room";



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
  foundBooking!:Booking;
  bookings:Booking[]=[];
  hotelRoomBookings!:Booking[];
  conferenceRoomBookings!:Booking[];

  constructor(private bookingService: BookingService, private roomService: RoomService) {
  }

  ngOnInit() {

      this.bookingService.getConferenceRoomBookings().subscribe(data=>
      {
        //console.log(data);
        // console.log(...data);

        this.bookings.push(...data);

        // console.log(this.bookings);
      })

    this.bookingService.getHotelRoomBookings().subscribe(data=>
    {
      // console.log(data);
      // console.log(...data);

      this.bookings.push(...data);

      for (let i=0; i<this.bookings.length;i++)
      {
        this.bookings[i].startDate=formatDate(this.bookings[i].startDate,"dd.MM.yyyy HH:mm:ss","de",);
        this.bookings[i].endDate=formatDate(this.bookings[i].endDate,"dd.MM.yyyy HH:mm:ss","de",);
      }
    })




  }

  setStartDate(event:any){
    this.startDate=event.target.value;
    console.log(this.startDate);
  }

  setStartTime(event:any){
    this.startDate=event.target.value;
    console.log(this.startTime);
  }

  setEndDate(event:any){
    this.endDate=event.target.value;
    console.log(this.endDate);
  }

  setEndTime(event:any){
    this.endTime=event.target.value;
    console.log(this.endTime);
  }

  setBookingNo(event:any){
    this.bookingNo=event.target.value;
    console.log(this.bookingNo);
  }

  setCustomerID(event:any){
    this.customerID=event.target.value;
    console.log(this.customerID);
  }

  setSpecialWishes(event:any){
    this.specialWishes=event.target.value;
    console.log(this.specialWishes);
  }


  addBooking(){

    this.bookingNo=this.bookings.length+1;

     let newBooking:Booking =
      {
        bookingNo:this.bookingNo,
        customerID:this.customerID,
        roomNo:this.roomNo,
        startDate:this.startDate+this.startTime,
        endDate:this.endDate+this.endTime,
        empNo:1,
        pricing:1.00,
        specialWishes:this.specialWishes,
      };

    this.bookingService.save(newBooking);
  }

  getValidRooms()
  {
    if (this.bookingType=="hotelRoom")
    {
      this.roomService.getHotelRooms().subscribe(data=> {
        console.log(data);
        this.rooms=data;
        console.log(this.rooms);
      })
    }
    else
    {
      this.roomService.getConferenceRooms().subscribe(data=> {
        console.log(data);
        this.rooms=data;
        console.log(this.rooms);
      })
    }
  }

  submitSearch(){

    console.log(this.bookingNo);

    this.bookingService.getBooking(this.bookingNo).subscribe(data=>
    {
      data.startDate=formatDate(data.startDate,"dd.MM.yyyy HH:mm:ss","de","GMT+2");
      data.endDate=formatDate(data.endDate,"dd.MM.yyyy HH:mm:ss","de","GMT+2");
      this.foundBooking=data;
    })

  }
}
