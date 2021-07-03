import { Component, OnInit } from '@angular/core';
import {RootObject} from "../../services/room/room";
import {RoomService} from "../../services/room/room.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  rooms!: RootObject;
  currency!: string;
  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.currency = environment.currency

    this.roomService.getRooms().subscribe((data: RootObject)=>{
      console.log(this.currency);
      this.rooms = data as RootObject;
    })
  }

}
