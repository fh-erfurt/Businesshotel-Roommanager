import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {BookingrequestService} from "../../services/bookingrequest/bookingrequest.service";
import {RootObject} from "../../services/bookingrequest/bookingrequest";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  rooms!: RootObject;
  currency!: string;
  constructor(private bookingrequestService: BookingrequestService) { }

  ngOnInit(): void {
    this.currency = environment.currency

    this.bookingrequestService.getRooms().subscribe((data: RootObject)=>{
      console.log(this.currency);
      this.rooms = data as RootObject;
    })
  }

}
