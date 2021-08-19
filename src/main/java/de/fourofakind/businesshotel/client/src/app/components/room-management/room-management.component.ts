import {Component, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {RoomService} from "../../services/room/room.service";
import {Room} from "../../services/room/room";
import {Hotelroom} from "../../services/hotelroom/hotelroom";
import {Conferenceroom} from "../../services/conferenceroom/conferenceroom";
import {Alert} from "../../app.component";
import {NgForm} from "@angular/forms";
import {RoleService} from "../../services/role/role.service";


@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['LL', 'DD.MM.YYYY'],
        },
        display: {
          dateInput: 'DD-MM-YYYY',
        }
      }
    },
  ],
})

/**
* Component for Management (Add, Update, Get, Delete) of Rooms
* consumes form data and calls corresponding services
*/
export class RoomManagementComponent implements OnInit {



  //form data

  //common
  roomNo!: number;
  areaInSqrMetre!: number;
  category!: string;
  pricePerUnit!: number;
  roomType!: string;
  //hotelRoom
  bedCount!: number;
  hasSpeedLAN!: boolean;
  hasTV!: boolean;
  hasKitchen!: boolean;
  hasCoffeemaker!: boolean;
  //conferenceRoom
  maxAmountOfParticipants!: number;
  amountOfWhiteboards!: number;
  amountOfBeamer!: number;
  hasScreen!: boolean;
  hasComputer!: boolean;
  amountOfTV!: number;

  //helper variables
  isChecked: boolean = false;
  labelPosition: "before" | "after" = "before";
  foundHotelroom!: Hotelroom | null;
  foundConferenceroom!: Conferenceroom | null;
  foundRoom!: Room | null
  alerts: Alert[] = [];

  hotelRoomCategories = new Map
  ([
    ["SINGLE", "Einzelzimmer"],
    ["DOUBLE", "Doppelzimmer"],
    ["SUITE", "Suite"]
  ]);
  conferenceRoomCategories = new Map
  ([
    ["SMALLGROUP", "Konferenzzimmer"],
    ["BIGGROUP", "Konferenzsaal"]
  ]);
  hotelRoomAttributes = new Map
  ([
    ["Bettenanzahl", ""],
    ["Highspeed Internet vorhanden", ""],
    ["Fernseher vorhanden", ""],
    ["Küchenzeile vorhanden", ""],
    ["Kaffeemaschine vorhanden", ""],
  ])
  conferenceRoomAttributes = new Map
  ([
    ["Maximale Teilnehmeranzahl", ""],
    ["Anzahl Whiteboards", ""],
    ["Anzahl Beamer", ""],
    ["Projektionsfläche vorhanden", ""],
    ["Computer vorhanden", ""],
    ["Anzahl Bildschirme", ""],
  ])

  private readonly department: string = "room-management";

  constructor(private roomService: RoomService,
              private roleService: RoleService)
  {}

  ngOnInit() {

  }

  //###################################################################################################################
  //HELPER ############################################################################################################
  //###################################################################################################################

  /**
  * alert Object and seconds to display the alert as input params
  *
  * produces alert for x seconds dsiplayed on the right side of the management tab
  */
  addAlertForXSeconds(alert: Alert, seconds: number) {
    this.alerts.push(alert);
    setTimeout(() => this.alerts = this.alerts.filter(entry => entry != alert), seconds * 1000);
  }

  //###################################################################################################################
  //ADD | UPDATE ######################################################################################################
  //###################################################################################################################


  addOrUpdateRoom(addsNewRoom: boolean, insertOrUpdateRoomForm: NgForm) {
    if (this.roleService.checkRights(this.department)) {
      this.foundRoom = null;
      this.foundConferenceroom = null;
      this.foundHotelroom = null;
      let newOrUpdatedRoom: Hotelroom | Conferenceroom
      if (this.roomType == "HOTELROOM") {
        newOrUpdatedRoom =
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
      } else {
        newOrUpdatedRoom =
          {
            amountOfBeamer: this.amountOfBeamer,
            amountOfTV: this.amountOfTV,
            amountOfWhiteboards: this.amountOfWhiteboards,
            areaInSqrMetre: this.areaInSqrMetre,
            category: this.category,
            hasComputer: this.hasComputer,
            hasScreen: this.hasScreen,
            maxAmountOfParticipants: this.maxAmountOfParticipants,
            pricePerUnit: this.pricePerUnit,
            roomType: this.roomType,
          };
      }

      if (addsNewRoom) {
        this.roomService.save(newOrUpdatedRoom, this.roomType)
          .subscribe((data) => {
              this.addAlertForXSeconds(new Alert('success', "Raum erfolgreich angelegt"), 5);
              insertOrUpdateRoomForm.resetForm();
            },
            (error) => {
              this.addAlertForXSeconds(new Alert('danger', "Fehler beim Anlegen des Raums"), 5);

            });
      } else {

        this.roomService.updateRoom(this.roomNo, newOrUpdatedRoom, this.roomType)
          .subscribe((data) => {
              this.addAlertForXSeconds(new Alert('success', "Raum erfolgreich geändert"), 5);
              insertOrUpdateRoomForm.resetForm();
            },
            (error) => {
              this.addAlertForXSeconds(new Alert('danger', "Fehler beim Ändern des Raums"), 5);

            });
      }
    } else alert("Benötigte Rechte nicht vorhanden")
  }

  //###################################################################################################################
  //GET ###############################################################################################################
  //###################################################################################################################

  submitSearch(intoFormular: boolean) {
    if (this.roleService.checkRights(this.department)) {

      this.foundRoom = null;
      this.roomService.getRoom(this.roomNo).subscribe(data => {
          this.foundRoom = data;

          if (data.roomType == "HOTELROOM") {
            this.roomService.getHotelRoom(this.roomNo).subscribe(data => {
              this.foundHotelroom = data;
              this.foundConferenceroom = null;

              if (intoFormular) {
                this.areaInSqrMetre = data.areaInSqrMetre;
                this.category = data.category;
                this.pricePerUnit = data.pricePerUnit;
                this.roomType = data.roomType;
                this.bedCount = data.bedCount;
                this.hasSpeedLAN = data.hasSpeedLAN;
                this.hasTV = data.hasTV;
                this.hasKitchen = data.hasKitchen;
                this.hasCoffeemaker = data.hasCoffeemaker;
              } else {
                this.hotelRoomAttributes.set("Bettenanzahl", data.bedCount.toString());
                this.hotelRoomAttributes.set("Highspeed Internet vorhanden", data.hasSpeedLAN ? "Ja" : "Nein");
                this.hotelRoomAttributes.set("Fernseher vorhanden", data.hasTV ? "Ja" : "Nein");
                this.hotelRoomAttributes.set("Küchenzeile vorhanden", data.hasKitchen ? "Ja" : "Nein");
                this.hotelRoomAttributes.set("Kaffeemaschine vorhanden", data.hasCoffeemaker ? "Ja" : "Nein");

              }

            })
          } else {
            this.roomService.getConferenceRoom(this.roomNo).subscribe(data => {

              this.foundConferenceroom = data;
              this.foundHotelroom = null;

              if (intoFormular) {
                this.areaInSqrMetre = data.areaInSqrMetre;
                this.category = data.category;
                this.pricePerUnit = data.pricePerUnit;
                this.roomType = data.roomType;
                this.maxAmountOfParticipants = data.maxAmountOfParticipants;
                this.amountOfWhiteboards = data.amountOfWhiteboards;
                this.amountOfBeamer = data.amountOfBeamer;
                this.hasScreen = data.hasScreen;
                this.hasComputer = data.hasComputer;
                this.amountOfTV = data.amountOfTV;
              } else {
                this.conferenceRoomAttributes.set("Maximale Teilnehmeranzahl", data.maxAmountOfParticipants.toString())
                this.conferenceRoomAttributes.set("Anzahl Whiteboards", data.amountOfWhiteboards.toString())
                this.conferenceRoomAttributes.set("Anzahl Beamer", data.amountOfBeamer.toString())
                this.conferenceRoomAttributes.set("Projektionsfläche vorhanden", data.hasScreen ? "Ja" : "Nein")
                this.conferenceRoomAttributes.set("Computer vorhanden", data.hasComputer ? "Ja" : "Nein")
                this.conferenceRoomAttributes.set("Anzahl Bildschirme", data.amountOfTV.toString())

              }
            })
          }
        },
        (error) => {
          this.addAlertForXSeconds(new Alert('danger', "Kein Raum mit dieser Raumnummer vorhanden"), 5);

        });
    } else alert("Benötigte Rechte nicht vorhanden")
  }

  //###################################################################################################################
  //DELETE ############################################################################################################
  //###################################################################################################################

  deleteRoom(deleteRoomForm: NgForm) {
    if (this.roleService.checkRights(this.department)) {
      this.foundRoom = null;
      this.foundConferenceroom = null;
      this.foundHotelroom = null;
      this.roomService.delete(this.roomNo)
        .subscribe(
          (data) => {
            this.addAlertForXSeconds(new Alert('success', "Raum erfolgreich gelöscht"), 5);
            deleteRoomForm.resetForm();
          },
          (error) => {
            this.addAlertForXSeconds(new Alert('danger', "Fehler beim Löschen des Raums"), 5);
          }
        );

    } else alert("Benötigte Rechte nicht vorhanden")
  }

}
