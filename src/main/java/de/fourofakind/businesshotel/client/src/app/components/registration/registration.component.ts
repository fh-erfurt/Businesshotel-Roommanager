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
import {errors, RegistrationService} from "../../services/registration/registration.service";
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

  dataSuccessfullySaved: boolean = false
  unavailableUsername: boolean = false
  errorMessage: string = ""

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
      username: ['', Validators.required],
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
      .then(success => {
        this.dataSuccessfullySaved = true
        this.unavailableUsername = false
        window.location.href = "";
      })
      .catch(error => {
        this.dataSuccessfullySaved = false
        console.log("catch Fehler: ", error)

        switch (error) {
          case errors.unavailableUsername:
            this.errorMessage = "Username bereits vergeben"
            this.unavailableUsername = true
            break
          case errors.saveCustomerStatusUnknown:
            this.errorMessage = "Fehler: Sichern Ihrer Nutzerdaten unvollständig"
            break
          case errors.saveAccountDetailsStatusUnknown:
            this.errorMessage = "Fehler: Sichern Ihrer Nutzerdaten unvollständig"
            break
          case errors.saveContactDataStatusUnknown:
            this.errorMessage = "Fehler: Sichern Ihrer Nutzerdaten unvollständig"
            break
          case errors.saveCustomerFailed:
            this.errorMessage = "Fehler: Ihre Nutzerdaten konnten nicht gespeichert werden"
            break
          case errors.saveAccountDetailsFailed:
            this.errorMessage = "Fehler: Ihre Nutzerdaten konnten nicht gespeichert werden"
            break
          case errors.saveContactDataFailed:
            this.errorMessage = "Fehler: Ihre Nutzerdaten konnten nicht gespeichert werden"
            break
          case errors.missingDataBaseConnection:
            this.errorMessage = "Es besteht keine Verbindung zur Datenbankt"
            break
          default:
            break;
        }

        if (error !== errors.success && error !== errors.unavailableUsername) {
          alert(this.errorMessage)
        }



      })
  }

}
