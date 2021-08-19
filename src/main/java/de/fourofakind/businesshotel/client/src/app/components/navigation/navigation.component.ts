import { Component, OnInit } from '@angular/core';
import {RoleService} from "../../services/role/role.service";
import {Role} from "../../services/role/role";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

/**
 * Component for Management (Add, Update, Get, Delete) of Navigation
 *
 * consumes form data and calls corresponding services
 */
export class NavigationComponent implements OnInit {


  isEmployee: boolean = false
  isLoggedIn: boolean = false
  isBookingManager: boolean = false
  isHotelManager: boolean = false
  isCustomerManager: boolean = false
  isEmployeeManager: boolean = false
  isRoommangaer: boolean = false

  roles: Role[] = []

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {

    if (localStorage.getItem("givenRole")) {
      const role = localStorage.getItem("givenRole")

      switch (role) {
        case "Buchungsmanager":
          this.isBookingManager = true;
          break
        case "Hotelleiter":
          this.isHotelManager = true;
          break
        case "Kundenmanager":
          this.isCustomerManager = true;
          break
        case "Personalmanager":
          this.isEmployeeManager = true;
          break
        case "Raummanager":
          this.isRoommangaer = true;
          break
        default:
          break;

      }
    }

    if (localStorage.getItem("user")) {
      this.isLoggedIn = true
      if (localStorage.getItem("empNo")) {
        this.isEmployee = true
      } else {
        this.isEmployee = false
      }
    } else {
      this.isLoggedIn = false
    }
  }

  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('userID')
    localStorage.removeItem('empNo')
    localStorage.removeItem('givenRole')
    window.location.href = "";
  }

}
