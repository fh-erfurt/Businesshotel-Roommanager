import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from '../login/login.component';
import {RoomComponent} from '../room/room.component';
import {MainComponent} from '../main/main.component';
import {RouterModule, Routes} from '@angular/router';
import {BookingManagementComponent} from "../booking-management/booking-management.component";
import {CustomerManagementComponent} from "../customer-management/customer-management.component";
import {RoomManagementComponent} from "../room-management/room-management.component";
import {EmployeeManagementComponent} from "../employee-management/employee-management.component";

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full'},
  { path: 'login',component: LoginComponent},
  { path: 'rooms', component: RoomComponent},
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
