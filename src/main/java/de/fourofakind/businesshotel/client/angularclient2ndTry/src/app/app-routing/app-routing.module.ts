import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RoomComponent } from '../room/room.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MainComponent } from '../main/main.component';
import { RouterModule, Routes } from '@angular/router';

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
