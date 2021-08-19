import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room/room.service';
import { Room } from '../../services/room/room';
import { environment} from "../../../environments/environment";
import { HostListener } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})

export class RoomComponent implements OnInit {

  buttonDisabled = false;
  screenHeight: number = 0;
  screenWidth: number = 0;
  hotelRooms: Room[] = new Array(0);
  conferenceRooms: Room[] = new Array(0);
  currency: string = "$"
  numberOfRowsOfHotelRooms = new Array(1);
  numberOfRowsOfConferenceRooms = new Array(1);

  numbersOfColsOfHotelRooms = new Array(3);
  numbersOfColsOfConferenceRooms = new Array(3);

  cardWidth = 286
  cardHeight = 302

  constructor(private roomService: RoomService, private router: Router) {
    // this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getWindowSize(event?: any) {
    this.calcNumbersOfColsOfHotelRooms()
    this.calcNumbersOfColsOfConferenceRooms()
  }


  calcNumbersOfColsOfHotelRooms(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    const numberOfColsLenght = Math.round((this.screenWidth - 44) / this.cardWidth) - (((this.screenWidth - 44) / this.cardWidth) === 0 ? 0 : 1);

    if (numberOfColsLenght <= this.hotelRooms.length) {
      this.numbersOfColsOfHotelRooms.length = numberOfColsLenght;
    } else {
      if (numberOfColsLenght <= 5 || this.hotelRooms.length < 5) {
        this.numbersOfColsOfHotelRooms.length = this.hotelRooms.length
      } else {
        this.numbersOfColsOfHotelRooms.length = 5
      }
    }
  }

  calcNumbersOfColsOfConferenceRooms(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    const numberOfColsLenght = Math.round((this.screenWidth - 44) / this.cardWidth) - (((this.screenWidth - 44) / this.cardWidth) === 0 ? 0 : 1);



    if (numberOfColsLenght <= this.conferenceRooms.length && this.conferenceRooms.length > 5 ) {
      this.numbersOfColsOfConferenceRooms.length = numberOfColsLenght;
    } else {
      if (numberOfColsLenght <= 5 || this.conferenceRooms.length < 5) {
        this.numbersOfColsOfConferenceRooms.length = this.conferenceRooms.length
      } else {
        this.numbersOfColsOfConferenceRooms.length = 5
      }
    }
  }



  ngOnInit(): void {
    this.currency = environment.currency
    this.roomService.getHotelRooms()
      .subscribe((data: Room[])=>{
        this.hotelRooms = data;
        // this.numberOfRowsOfHotelRooms.length = this.hotelRooms.length % this.numbersOfCols.length
        //
        //
        //
        //
        //
        //
        //
        //
        //
        //   + (this.hotelRooms.length % this.numbersOfColsOfHotelRooms.length === 0 ? 0 : 1))

        this.numberOfRowsOfHotelRooms.length =
          Math.round(this.hotelRooms.length / this.numbersOfColsOfHotelRooms.length)
          + (this.hotelRooms.length % this.numbersOfColsOfHotelRooms.length === 0 ? 0 : 1)

        this.calcNumbersOfColsOfHotelRooms();

    })
    this.roomService.getConferenceRooms()
      .subscribe((data: Room[])=>{
        this.conferenceRooms = data;
        // this.numberOfRowsOfConferenceRooms.length = this.conferenceRooms.length % this.numbersOfCols.length

        this.numberOfRowsOfConferenceRooms.length =
          Math.round(this.conferenceRooms.length / this.numbersOfColsOfConferenceRooms.length)
          + (this.conferenceRooms.length % this.numbersOfColsOfConferenceRooms.length == 0 ? 0 : 1)

        this.calcNumbersOfColsOfConferenceRooms();
    })
  }

  public getHotelRoom(index: number) {
    if (this.hotelRooms !== undefined && this.hotelRooms.length > index) {
      return this.hotelRooms[index]
    } else {

      return this.hotelRooms[0]
    }
  }
  public getConferenceRoom(index: number) {
    if (this.conferenceRooms !== undefined && this.conferenceRooms.length > index) {
      return this.conferenceRooms[index]
    } else {

      return this.conferenceRooms[0]
    }
  }
}
