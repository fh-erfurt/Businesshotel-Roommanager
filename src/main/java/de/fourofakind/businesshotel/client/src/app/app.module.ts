import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {MatTabsModule} from "@angular/material/tabs";
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import {registerLocaleData} from '@angular/common';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {AppComponent} from './app.component';

import {RoomComponent} from './components/room/room.component';
import {LoginComponent} from './components/login/login.component';
import {MainComponent} from './components/main/main.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {BookingManagementComponent} from './components/booking-management/booking-management.component';
import {EmployeeManagementComponent} from './components/employee-management/employee-management.component';
import {CustomerManagementComponent} from './components/customer-management/customer-management.component';
import {RoomManagementComponent} from './components/room-management/room-management.component';
import {EmployeeComponent} from './components/employee/employee.component';
import {BookingViewerComponent} from "./components/booking-viewer/booking-viewer.component";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {NgbAlertModule, NgbNavModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FooterComponent} from './components/footer/footer.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {BookingComponent} from './components/bookingRequest/booking.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from "@angular/material/icon";
import { NgbdSortableHeader } from './services/bookingViewerService/sortable.directive';
import {DecimalPipe} from '@angular/common';



registerLocaleData(localeDe, localeDeExtra);


@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    EmployeeComponent,
    LoginComponent,
    MainComponent,
    NavigationComponent,
    BookingManagementComponent,
    EmployeeManagementComponent,
    CustomerManagementComponent,
    RoomManagementComponent,
    EmployeeComponent,
    FooterComponent,
    RegistrationComponent,
    BookingComponent,
    BookingViewerComponent,
    NgbdSortableHeader,
  ],
  imports: [
    NgbModule,
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
    NgbAlertModule,
    NgbNavModule,
    MatGridListModule,
    NgbPaginationModule,
    NgbAlertModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "de" },
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
