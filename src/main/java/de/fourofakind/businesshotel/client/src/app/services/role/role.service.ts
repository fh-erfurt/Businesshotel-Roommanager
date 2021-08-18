import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  departmentAndRoles=new Map
  ([
    ["booking-management","Buchungsmanager"],
    ["customer-management","Kundenmanager"],
    ["employee-management","Personalmanager"],
    ["room-management","Raummanager"],
  ]);

  public checkRights(department: string)
  {
    let givenRole=localStorage.getItem('givenRole');
    return (this.departmentAndRoles.get(department)===givenRole || givenRole==="Hotelleiter")

  }
}
