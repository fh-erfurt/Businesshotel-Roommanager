import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


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
    RoomManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
