import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  // displayNavItems: boolean = true
  isEmployee: boolean = false
  isLoggedIn: boolean = false

  constructor() { }

  ngOnInit(): void {
    console.log(localStorage.getItem("user"))
    console.log(localStorage.getItem("empNo"))


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
    window.location.href = "";
  }

}
