import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/*
 * Service for role management (check for a Role needed for a department) of employee
 */
export class RoleService {

  constructor() { }

  departmentAndRoles=new Map
  ([
    ["booking-management","Buchungsmanager"],
    ["customer-management","Kundenmanager"],
    ["employee-management","Personalmanager"],
    ["room-management","Raummanager"],
  ]);

  /*
  * relevant department as input param
  * returns Boolean which approves the employees rights or denies the transaction
  */
  public checkRights(department: string)
  {
    let givenRole=localStorage.getItem('givenRole');
    return (this.departmentAndRoles.get(department)===givenRole || givenRole==="Hotelleiter")

  }
}
