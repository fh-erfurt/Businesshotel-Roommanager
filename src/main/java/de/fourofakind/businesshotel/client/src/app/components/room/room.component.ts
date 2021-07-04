import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room/room.service';
import { Room } from '../../services/room/room';
import { environment} from "../../../environments/environment";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  hotelRooms!: Room[];
  conferenceRooms!: Room[];
  currency: string = "$"
  numberOfRowsOfHotelRooms = new Array(1);
  numberOfRowsOfConferenceRooms = new Array(1);
  numbersOfCols = new Array(3);

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.currency = environment.currency
    this.roomService.getHotelRooms().subscribe((data: Room[])=>{
      console.log(data);
      this.hotelRooms = data;
      this.numberOfRowsOfHotelRooms.length = this.hotelRooms.length % this.numbersOfCols.length
    })
    this.roomService.getConferenceRooms().subscribe((data: Room[])=>{
      console.log(data);
      this.conferenceRooms = data;
      this.numberOfRowsOfConferenceRooms.length = this.conferenceRooms.length % this.numbersOfCols.length
    })
  }

  getHotelRoom(index: number) {
    if (this.hotelRooms.length > index) {
      return this.hotelRooms[index]
    } else {
      return this.hotelRooms[0]
    }
  }
  getConferenceRoom(index: number) {
    if (this.conferenceRooms.length > index) {
      return this.conferenceRooms[index]
    } else {
      return this.conferenceRooms[0]
    }
  }


}
