/*import { MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule } from '@angular/material@7.3.2';
  ->ging nicht mehr daher
  die Aufteilung hier drunter*/

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingManagementComponent } from './booking-management/booking-management.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { RoomManagementComponent } from './room-management/room-management.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BookingManagementComponent,
    EmployeeManagementComponent,
    CustomerManagementComponent,
    RoomManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
