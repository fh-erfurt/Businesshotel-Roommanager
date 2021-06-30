import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import {RootObject} from "../../services/login/login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getAccountDetails().subscribe((data: RootObject)=> {
      console.log(data)
    })
  }

}
