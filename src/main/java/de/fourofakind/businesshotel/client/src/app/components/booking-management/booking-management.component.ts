import {Component, Input, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {BookingService} from "../../services/booking/booking.service";
import {Booking, ConferenceRoomBooking, HotelRoomBooking, RawData} from "../../services/booking/booking";



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

  booking!:Booking;
  embeddedData!:RawData;
  bookingsData!:RawData;
  hotelRoomBookings!:HotelRoomBooking[];
  conferenceRoomBookings!:ConferenceRoomBooking[];

  constructor(private bookingService: BookingService) {
  }

  ngOnInit() {
    this.bookingService.getAllBookings().subscribe(data=>
    {
      console.log(data);
      this.embeddedData=data as RawData;
      this.bookingsData=this.embeddedData as RawData;
      this.hotelRoomBookings = this.bookingsData._embedded.hotelRoomBookings;
      this.conferenceRoomBookings = this.bookingsData._embedded.conferenceRoomBookings;
    })

    this.bookingService.getBooking(1).subscribe(data=>
    {

    })
  }
}
