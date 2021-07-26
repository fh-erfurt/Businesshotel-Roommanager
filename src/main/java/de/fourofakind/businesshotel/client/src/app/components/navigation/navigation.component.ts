import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  displayNavItems: boolean = true

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem("user") === null) {
      this.displayNavItems = false;
      document.getElementById('searchfield')
    }
  }

  logout() {
    localStorage.removeItem('user')
    window.location.href = "";
  }

}
