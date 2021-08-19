import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup, Validators
} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {errors, RegistrationService} from "../../services/registration/registration.service";
import {checkPasswordMatch, validateEmail, validatePhoneNumber} from "../../services/registration/helpers.validator";
import {Accountdetail} from "../../services/accountdetails/accountdetail";
import {Customer} from "../../services/customer/customer";
import {Contactdata} from "../../services/contactdata/contactdata";


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
      validators: [checkPasswordMatch('password', 'passwordVerify'), validateEmail(), validatePhoneNumber()]
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

    var companyName = ""

    if (this.isBusinessCustomer) {
      companyName = this.f.companyName.value
    }

    const accountDetails: Accountdetail = {
      passwordHash: this.f.password.value,
      username: this.f.username.value,
    };

    const contactData: Contactdata = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      phone: this.f.phoneNumber.value,
      mailAddress: this.f.emailAddress.value
    }

    const customer: Customer = {
      isBusinessCustomer: this.isBusinessCustomer
    }

    this.registrationService.register(
      accountDetails,
      contactData,
      customer
    )
      .then(customerID => {
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
