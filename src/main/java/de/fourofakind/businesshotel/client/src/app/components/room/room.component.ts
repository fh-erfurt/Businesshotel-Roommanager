import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room/room.service';
import { Room } from '../../services/room/room';
import { environment} from "../../../environments/environment";
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})

export class RoomComponent implements OnInit {

  screenHeight: number = 0;
  screenWidth: number = 0;
  hotelRooms: Room[] = new Array(0);
  conferenceRooms: Room[] = new Array(0);
  currency: string = "$"
  numberOfRowsOfHotelRooms = new Array(1);
  numberOfRowsOfConferenceRooms = new Array(1);
  numbersOfColsOfHotelRooms = new Array(3);
  numbersOfColsOfConferenceRooms = new Array(3);

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    // console.log(this.screenHeight, this.screenWidth);
    console.log("screenWidth: ", this.screenWidth);

    const numberOfColsLenght = Math.round((this.screenWidth - 44) / 330) - (((this.screenWidth - 44) / 330) === 0 ? 0 : 1);
    console.log(numberOfColsLenght);
    console.log(this.numberOfRowsOfHotelRooms.length);
    console.log(this.numbersOfColsOfConferenceRooms.length);

    if (numberOfColsLenght < this.numberOfRowsOfHotelRooms.length) {
      this.numbersOfColsOfHotelRooms.length = numberOfColsLenght;
    } else {
      this.numbersOfColsOfHotelRooms.length = this.numberOfRowsOfHotelRooms.length
    }

    if (numberOfColsLenght < this.numberOfRowsOfConferenceRooms.length) {
      this.numbersOfColsOfConferenceRooms.length = numberOfColsLenght;
    } else {
      this.numbersOfColsOfConferenceRooms.length = this.numberOfRowsOfConferenceRooms.length
    }

    console.log(this.numbersOfColsOfConferenceRooms.length);
  }

  constructor(private roomService: RoomService) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.currency = environment.currency
    this.roomService.getHotelRooms()
      .subscribe((data: Room[])=>{
        this.hotelRooms = data;
        // this.numberOfRowsOfHotelRooms.length = this.hotelRooms.length % this.numbersOfCols.length
        this.numberOfRowsOfHotelRooms.length = Math.round(this.hotelRooms.length / this.numbersOfColsOfHotelRooms.length) + (this.hotelRooms.length % this.numbersOfColsOfHotelRooms.length === 0 ? 0 : 1)
    })
    this.roomService.getConferenceRooms()
      .subscribe((data: Room[])=>{
        this.conferenceRooms = data;
        // this.numberOfRowsOfConferenceRooms.length = this.conferenceRooms.length % this.numbersOfCols.length

        this.numberOfRowsOfConferenceRooms.length = Math.round(this.conferenceRooms.length / this.numbersOfColsOfConferenceRooms.length) + (this.conferenceRooms.length % this.numbersOfColsOfConferenceRooms.length == 0 ? 0 : 1)
    })
  }

  getHotelRoom(index: number) {
    if (this.hotelRooms !== undefined && this.hotelRooms.length > index) {
      return this.hotelRooms[index]
    } else {
      console.log("else")
      return this.hotelRooms[0]
    }
  }
  getConferenceRoom(index: number) {
    if (this.conferenceRooms !== undefined && this.conferenceRooms.length > index) {
      return this.conferenceRooms[index]
    } else {
      console.log("else")
      return this.conferenceRooms[0]
    }
  }


}
