import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RegistrationService} from "../../services/registration/registration.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  username!: string;
  password!: string;

  title = 'appBootstrap';


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      companyName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordVerify: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.registrationService.register(this.f.lastName.value,
                                      this.f.firstName.value,
                                      this.f.companyName.value,
                                      this.f.emailAddress.value,
                                      this.f.phoneNumber.value,
                                      this.f.username.value,
                                      this.f.password.value,
                                      this.f.passwordVerify.value)


  }

}
