import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";

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
  bookingData=
    {
      customerID:"",
    };



  constructor() { }

  ngOnInit(): void {
  }

}
