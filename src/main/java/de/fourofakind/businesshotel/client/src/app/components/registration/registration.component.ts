import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup, FormGroupDirective, NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RegistrationService} from "../../services/registration/registration.service";
import {ErrorStateMatcher} from "@angular/material/core";
import {MustMatch} from "../../services/registration/must-match.validator";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;

  submitted = false;
  isBusinessCustomer: boolean = false
  equalPassword: boolean = true

  title = 'appBootstrap';


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private registrationService: RegistrationService
  ) { }


  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      phoneNumber: [''],
      username: [''],
      password: ['', [Validators.required, Validators.minLength(10)]],
      passwordVerify:  ['',Validators.required]
    }, {
      validators: MustMatch('password', 'passwordVerify')
    });
  }

  get f() { return this.registerForm.controls; }

  toggleIsBusinessCustomer() {
    this.isBusinessCustomer = !this.isBusinessCustomer

    if (this.isBusinessCustomer) {
      this.registerForm.addControl('companyName', new FormControl('', Validators.required));
    } else {
      this.registerForm.removeControl("companyName")
    }
  }

  submit() {
    console.log("submit:", this.submitted)
    this.submitted = true;

    console.log("form: ", this.registerForm)


    if (this.registerForm.invalid) {
      console.log("form invalid")
      return;
    }

    if (this.f.password.value !== this.f.passwordVerify.value) {
      this.submitted = false
      this.equalPassword = false
    } else {
      this.equalPassword = true
    }

    var companyName = ""

    if (this.isBusinessCustomer) {
      companyName = this.f.companyName.value
    }

    this.registrationService.register(
      this.f.lastName.value,
      this.f.firstName.value,
      companyName,
      this.f.emailAddress.value,
      this.f.phoneNumber.value,
      this.f.username.value,
      this.f.password.value,
      this.f.passwordVerify.value,
      this.isBusinessCustomer
    )
  }

}
