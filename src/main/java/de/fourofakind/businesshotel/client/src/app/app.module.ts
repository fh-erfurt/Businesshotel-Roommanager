import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from "@angular/material/tabs";

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';

import { RoomComponent } from './components/room/room.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BookingManagementComponent } from './components/booking-management/booking-management.component';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { CustomerManagementComponent } from './components/customer-management/customer-management.component';
import { RoomManagementComponent } from './components/room-management/room-management.component';
import { EmployeeComponent } from './components/employee/employee.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMatDatetimePickerModule, NgxMatTimepickerModule} from "@angular-material-components/datetime-picker";
import {NgbPaginationModule, NgbAlertModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { TestLoginComponent } from './loginExample/test-login/test-login.component';
import { RegistrationComponent } from './components/registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    EmployeeComponent,
    LoginComponent,
    DashboardComponent,
    MainComponent,
    NavigationComponent,
    BookingManagementComponent,
    EmployeeManagementComponent,
    CustomerManagementComponent,
    RoomManagementComponent,
    EmployeeComponent,
    FooterComponent,
    TestLoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
    MatTabsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbNavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
