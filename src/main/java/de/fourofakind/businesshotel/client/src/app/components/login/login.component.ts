import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LoginService } from '../../services/login/login.service';
import {RootObject} from "../../services/login/login";

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  username!: string;
  password!: string;

  @ViewChild('someInput') usernameInput!: ElementRef;
  @ViewChild('someInput') passwordInpu!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  submit() {
    this.submitted = true;

    this.loginService.login(this.f.username.value, this.f.password.value)

  }

  login() {
    localStorage.setItem('user', "loggedIn");
    // window.open("","_top")
    window.location.href = "";
  }

}
