import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from "@angular/material/tabs";

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';

import { RoomComponent } from './room/room.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BookingManagementComponent } from './booking-management/booking-management.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { RoomManagementComponent } from './room-management/room-management.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { EmployeeComponent } from './employee/employee.component';



@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    LoginComponent,
    DashboardComponent,
    MainComponent,
    NavigationComponent,
    BookingManagementComponent,
    EmployeeManagementComponent,
    CustomerManagementComponent,
    RoomManagementComponent,
    EmployeeComponent
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
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
