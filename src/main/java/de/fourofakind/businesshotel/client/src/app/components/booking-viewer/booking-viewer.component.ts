import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BookingService} from "../../services/booking/booking.service";
import {Booking, ViewerFriendlyBooking} from "../../services/booking/booking";
import {Observable} from "rxjs";
import {NgbdSortableHeader, SortEvent} from '../../services/bookingViewerService/sortable.directive';
import {BookingViewerService} from "../../services/bookingViewerService/booking-viewer.service";
import {RoomService} from "../../services/room/room.service";
import {Room} from "../../services/room/room";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-booking-viewer',
  templateUrl: './booking-viewer.component.html',
  styleUrls: ['./booking-viewer.component.scss']
})

/**
 * Component for displaying (Get) of Bookings
 *
 * consumes form data and calls corresponding services
 */
export class BookingViewerComponent implements OnInit {

  public isLoggedIn: boolean = false


  viewerFriendlyBookings$: Observable<ViewerFriendlyBooking[]>;
  total$: Observable<number>;
  bookings: Booking[] = []
  rooms: Room[] = []

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> | undefined;

  constructor(private bookingService: BookingService,
              public bookingViewerService: BookingViewerService,
              private roomService: RoomService)
  {
    this.viewerFriendlyBookings$ = bookingViewerService.bookings$;
    this.total$ = bookingViewerService.total$;
  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('user') ? true : false

    if (this.isLoggedIn && localStorage.getItem("customerID")) {

      const customerID = Number(localStorage.getItem("customerID"))

      this.roomService.getHotelRooms()
        .subscribe((data: Room[])=>{
          this.rooms = this.rooms.concat(data)

          this.roomService.getConferenceRooms()
            .subscribe((data: Room[])=>{
              this.rooms = this.rooms.concat(data)

              this.bookingService.getBookingsByCustomerID(customerID)
                .subscribe((result: Booking[]) => {

                  if (result) {

                    this.bookings = result


                    result.forEach((value, index) => {


                      const room: Room | undefined = this.rooms.find(room => room.roomNo === value.roomNo);

                      if (room) {
                        const startDateTime = new Date(value.startDate)
                        const endDateTime = new Date(value.endDate)

                        endDateTime.setDate(endDateTime.getDate() + 1)

                        const timeDiff = new Date(endDateTime).getTime() - startDateTime.getTime();
                        const units = room.roomType === "CONFERENCEROOM" ? timeDiff / (1000 * 3600) : timeDiff / (1000 * 3600 * 24) + 1;

                        const startDateTimeLabel = room.roomType === "CONFERENCEROOM" ? formatDate(startDateTime, "dd.MM.yyyy HH:mm", "de") : formatDate(startDateTime, "dd.MM.yyyy", "de")
                        const endDateTimeLabel = room.roomType === "CONFERENCEROOM" ? formatDate(startDateTime, "dd.MM.yyyy HH:mm", "de") : formatDate(endDateTime, "dd.MM.yyyy", "de")

                        const viewerFriendlyBooking: ViewerFriendlyBooking = {
                          bookingNo: value.bookingNo ?? 1,
                          areaInSqrMetre: room.areaInSqrMetre,
                          category: room.category,
                          roomType: room.roomType === "CONFERENCEROOM" ? "Konferenzraum" : "Hotelzimmer",
                          pricing: Number((Math.round(value.pricing * 100) / 100).toFixed(2)),
                          units: units,
                          startDate: startDateTimeLabel,
                          endDate: endDateTimeLabel,
                          specialWishes: value.specialWishes,
                        }
                        this.bookingViewerService.bookings.push(viewerFriendlyBooking)
                      }


                    })
                  }
                }, error => {

                })
            }, error => {

            })
        }, error => {

        })
    }

  }


  onSort({column, direction}: SortEvent) {
    // resetting other headers
    if (this.headers) {
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
    }

    this.bookingViewerService.sortColumn = column;
    this.bookingViewerService.sortDirection = direction;


  }

}
