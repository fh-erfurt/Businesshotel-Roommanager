import {Component, Input, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {RoomService} from "../../services/room/room.service";
import {formatDate} from "@angular/common";
import {parseDate} from "ngx-bootstrap/chronos";
import {Room} from "../../services/room/room";
import {Hotelroom} from "../../services/hotelroom/hotelroom";
import {Conferenceroom} from "../../services/conferenceroom/conferenceroom";



@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss'],
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




export class RoomManagementComponent implements OnInit {

  isChecked:boolean = false;
  customerID!:number;
  roomNo!:number;
  startDate!:string;
  startTime!:string;
  rooms!:Room[];
  endDate!:string;
  endTime!:string;
  room!:Room;

  minDateStart!:string;
  minDateEnd!:string;
  startTimestamp!:Date;
  endTimestamp!:Date;
  calculatedPricing!:number;


  labelPosition:"before"| "after" ="before";
  foundHotelroom!:Hotelroom | null;
  foundConferenceroom!:Conferenceroom | null;
  foundRoom!:Room | null
  //common
  areaInSqrMetre!:number;
  category!:string;
  pricePerUnit!: number;
  roomType!:string;
  //hotelRoom
  bedCount!:number;
  hasSpeedLAN!:boolean;
  hasTV!:boolean;
  hasKitchen!:boolean;
  hasCoffeemaker!:boolean;
  //conferenceRoom
  maxAmountOfParticipants!:number;
  amountOfWhiteboards!:number;
  amountOfBeamer!:number;
  hasScreen!:boolean;
  hasComputer!:boolean;
  amountOfTV!:number;



  hotelRoomCategories=new Map
  ([
    ["SINGLE","Einzelzimmer"],
    ["DOUBLE","Doppelzimmer"],
    ["SUITE","Suite"]
  ]);


  conferenceRoomCategories=new Map
  ([
      ["SMALLGROUP","Konferenzzimmer"],
      ["BIGGROUP","Konferenzsaal"]
  ]);

  hotelRoomAttributes=new Map
  ([
    ["Bettenanzahl",""],
    ["Highspeed Internet vorhanden",""],
    ["Fernseher vorhanden",""],
    ["Küchenzeile vorhanden",""],
    ["Kaffeemaschine vorhanden",""],
  ])

  conferenceRoomAttributes=new Map
  ([
    ["Maximale Teilnehmeranzahl",""],
    ["Anzahl Whiteboards",""],
    ["Anzahl Beamer",""],
    ["Projektionsfläche vorhanden",""],
    ["Computer vorhanden",""],
    ["Anzahl Bildschirme",""],
  ])

  constructor(private roomService: RoomService) {
  }

  ngOnInit() {

  }



  addOrUpdateRoom(addsNewRoom:boolean)
  {
    if(this.roomType=="HOTELROOM")
    {
      let newOrUpdatedRoom:Hotelroom =
        {
          areaInSqrMetre: this.areaInSqrMetre,
          bedCount: this.bedCount,
          category: this.category,
          hasCoffeemaker: this.hasCoffeemaker,
          hasKitchen: this.hasKitchen,
          hasSpeedLAN: this.hasSpeedLAN,
          hasTV: this.hasTV,
          pricePerUnit: this.pricePerUnit,
          roomType: this.roomType

        };

      if(addsNewRoom)
      {
        this.roomService.save(newOrUpdatedRoom,this.roomType);
      }
      else
      {
        this.roomService.updateRoom(this.roomNo, newOrUpdatedRoom, this.roomType);
      }

    }
    else
    {

      let newOrUpdatedRoom:Conferenceroom =
        {
          amountOfBeamer:this.amountOfBeamer,
          amountOfTV:this.amountOfTV,
          amountOfWhiteboards:this.amountOfWhiteboards,
          areaInSqrMetre:this.areaInSqrMetre,
          category:this.category,
          hasComputer:this.hasComputer,
          hasScreen:this.hasScreen,
          maxAmountOfParticipants:this.maxAmountOfParticipants,
          pricePerUnit:this.pricePerUnit,
          roomType:this.roomType,
        };

      if(addsNewRoom)
      {
        this.roomService.save(newOrUpdatedRoom,this.roomType);
      }
      else
      {
        this.roomService.updateRoom(this.roomNo, newOrUpdatedRoom, this.roomType);
      }

    }


  }

  submitSearch()
  {
    this.foundRoom=null;
    console.log(this.roomNo);

    this.roomService.getRoom(this.roomNo).subscribe(data=>
    {
      this.foundRoom = data;
      this.roomType=data.roomType;

      if(data.roomType=="HOTELROOM")
      {
        this.roomService.getHotelRoom(this.roomNo).subscribe(data=>
        {
          this.foundHotelroom=data;
          this.foundConferenceroom=null;
          this.hotelRoomAttributes.set("Bettenanzahl",data.bedCount.toString());
          this.hotelRoomAttributes.set("Highspeed Internet vorhanden",data.hasSpeedLAN?"Ja":"Nein");
          this.hotelRoomAttributes.set("Fernseher vorhanden",data.hasTV?"Ja":"Nein");
          this.hotelRoomAttributes.set("Küchenzeile vorhanden",data.hasKitchen?"Ja":"Nein");
          this.hotelRoomAttributes.set("Kaffeemaschine vorhanden",data.hasCoffeemaker?"Ja":"Nein");
        })

      }
      else
      {
        this.roomService.getConferenceRoom(this.roomNo).subscribe(data=>
        {
          this.foundConferenceroom=data;
          this.foundHotelroom=null;
          this.conferenceRoomAttributes.set("Maximale Teilnehmeranzahl",data.maxAmountOfParticipants.toString())
          this.conferenceRoomAttributes.set("Anzahl Whiteboards",data.amountOfWhiteboards.toString())
          this.conferenceRoomAttributes.set("Anzahl Beamer",data.amountOfBeamer.toString())
          this.conferenceRoomAttributes.set("Projektionsfläche vorhanden",data.hasScreen?"Ja":"Nein")
          this.conferenceRoomAttributes.set("Computer vorhanden",data.hasComputer?"Ja":"Nein")
          this.conferenceRoomAttributes.set("Anzahl Bildschirme",data.amountOfTV.toString())
        })
      }

    })



  }

  loadRoomInfoToFormular()
  {


    this.foundRoom=null;
    this.roomService.getRoom(this.roomNo).subscribe(data=>
    {
      this.foundRoom = data;

      if(data.roomType=="HOTELROOM")
      {
        this.roomService.getHotelRoom(this.roomNo).subscribe(data=>
        {

          this.areaInSqrMetre=data.areaInSqrMetre;
          this.category=data.category;
          this.pricePerUnit=data.pricePerUnit;
          this.roomType=data.roomType;
          this.bedCount=data.bedCount;
          this.hasSpeedLAN=data.hasSpeedLAN;
          this.hasTV=data.hasTV;
          this.hasKitchen=data.hasKitchen;
          this.hasCoffeemaker=data.hasCoffeemaker;
        })
      }
      else
      {
        this.roomService.getConferenceRoom(this.roomNo).subscribe(data=>
        {
          this.areaInSqrMetre=data.areaInSqrMetre;
          this.category=data.category;
          this.pricePerUnit=data.pricePerUnit;
          this.roomType=data.roomType;
          this.maxAmountOfParticipants=data.maxAmountOfParticipants;
          this.amountOfWhiteboards=data.amountOfWhiteboards;
          this.amountOfBeamer=data.amountOfBeamer;
          this.hasScreen=data.hasScreen;
          this.hasComputer=data.hasComputer;
          this.amountOfTV=data.amountOfTV;
        })
      }
    });
  }

  deleteRoom()
  {
    this.foundRoom=null;
    this.foundConferenceroom=null;
    this.foundHotelroom=null;
    this.roomService.delete(this.roomNo);
  }

}
