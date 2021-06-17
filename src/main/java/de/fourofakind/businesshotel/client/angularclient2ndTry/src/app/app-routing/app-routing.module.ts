import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RoomComponent } from '../room/room.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MainComponent } from '../main/main.component';
import { RouterModule, Routes } from '@angular/router';
import {BookingManagementComponent} from "../../../../angularclient/src/app/booking-management/booking-management.component";
import {CustomerManagementComponent} from "../../../../angularclient/src/app/customer-management/customer-management.component";
import {RoomManagementComponent} from "../../../../angularclient/src/app/room-management/room-management.component";
import {EmployeeManagementComponent} from "../../../../angularclient/src/app/employee-management/employee-management.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'rooms',
    component: RoomComponent
  },
  { path: 'management/booking', component: BookingManagementComponent},
  { path: 'management/customer', component: CustomerManagementComponent},
  { path: 'management/room', component: RoomManagementComponent},
  { path: 'management/employee', component: EmployeeManagementComponent},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
