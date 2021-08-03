import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {BookingrequestService} from "../../services/bookingrequest/bookingrequest.service";
import {RootObject} from "../../services/bookingrequest/bookingrequest";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {RoomService} from "../../services/room/room.service";
import {Room} from "../../services/room/room";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbCalendar, NgbDate, NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  rooms!: RootObject;
  currency!: string;
  roomID?: string | null
  pricesLabel: string = "Preis pro Nacht"
  unitLabel: string = "Nächte"
  form!: FormGroup;

  // datePicker
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;


  // timePicker
  time: NgbTimeStruct = {hour: 8, minute: 0, second: 0};
  hourStep = 1;
  minuteStep = 15;


  selectedRoom: Room = {roomNo: 0,
    areaInSqrMetre: 0,
    category: "NOCAT",
    pricePerUnit: 0,
    updatedAt: "",
    createdAt: "",
    roomType: "NOTYPE"
  }


  constructor(private bookingrequestService: BookingrequestService,
              private route: ActivatedRoute,
              private roomService: RoomService,
              private formBuilder: FormBuilder,
              private calendar: NgbCalendar)
  {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      unitCount: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id:number = Number((params.get('roomID')))

      this.roomService.getRoom(id)
        .subscribe((data: Room)=> {
          this.selectedRoom = data;

          if (data.roomType === "CONFERENCEROOM") {
            this.pricesLabel = "Preis pro Stunde"
            this.unitLabel = "Stunden"
          } else {
            this.pricesLabel = "Preis pro Nacht"
            this.unitLabel = "nächte"
          }
          console.log(this.selectedRoom)
        })
    })

    this.currency = environment.currency

    this.bookingrequestService.getRooms()
      .subscribe((data: RootObject)=>{
      console.log(this.currency);
      this.rooms = data as RootObject;
    })

  }

  // getSelectedRoom() {
  //   if (this.selectedRoom) {
  //     return this.selectedRoom
  //   } else {
  //
  //
  //   }
  // }

}
