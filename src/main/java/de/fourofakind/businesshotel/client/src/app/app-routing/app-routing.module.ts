import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from '../components/login/login.component';
import {RoomComponent} from '../components/room/room.component';
import {EmployeeComponent} from '../components/employee/employee.component';
import {MainComponent} from '../components/main/main.component';
import {RouterModule, Routes} from '@angular/router';
import {BookingManagementComponent} from "../components/booking-management/booking-management.component";
import {CustomerManagementComponent} from "../components/customer-management/customer-management.component";
import {RoomManagementComponent} from "../components/room-management/room-management.component";
import {EmployeeManagementComponent} from "../components/employee-management/employee-management.component";
import {RegistrationComponent} from "../components/registration/registration.component";
import {BookingComponent} from "../components/bookingRequest/booking.component";
import {BookingViewerComponent} from "../components/booking-viewer/booking-viewer.component";

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full'},
  { path: 'login',component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'rooms', component: RoomComponent},
  { path: 'management/booking', component: BookingManagementComponent},
  { path: 'management/customer', component: CustomerManagementComponent},
  { path: 'management/room', component: RoomManagementComponent},
  { path: 'management/employee', component: EmployeeManagementComponent},
  { path: 'employees', component: EmployeeComponent},
  { path: 'booking/:roomID', component: BookingComponent},
  { path: 'bookings', component: BookingViewerComponent}

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
