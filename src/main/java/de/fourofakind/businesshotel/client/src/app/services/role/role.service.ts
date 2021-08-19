import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
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


  /**
   * returns Boolean which approves the employees rights or denies the transaction
   *
   * @param department department to be checked for
   */
  public checkRights(department: string):Boolean
  {
    let givenRole=localStorage.getItem('givenRole');
    return (this.departmentAndRoles.get(department)===givenRole || givenRole==="Hotelleiter")

  }
}
