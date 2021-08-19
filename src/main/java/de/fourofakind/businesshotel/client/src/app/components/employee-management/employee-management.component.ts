import {Component, OnInit} from '@angular/core';
import {Employee} from "../../services/employee/employee";
import {Accountdetail} from "../../services/accountdetails/accountdetail";
import {AccountdetailsService} from "../../services/accountdetails/accountdetails.service";
import {EmployeeService} from "../../services/employee/employee.service";
import {Alert} from "../../app.component";
import {BookingService} from "../../services/booking/booking.service";
import {NgForm} from "@angular/forms";
import {RoleService} from "../../services/role/role.service";

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})

/**
* Component for Management (Add, Update, Get, Delete) of Employees
* consumes form data and calls corresponding services
*/
export class EmployeeManagementComponent implements OnInit {

  //form data
  firstName!: string;
  lastName!: string;
  password!: string;
  repeatedPassword!: string;
  empNo!: number;
  empName!: string;
  username!: string;
  givenRole!: string;

  //helper variables
  isChecked: boolean = false;
  passwordsAreEqual!: boolean;
  foundEmployee!: Employee | null;
  accountID!: number;
  usernameAlreadyExists: boolean = false;
  isSubmitAllowed: boolean = false;
  alerts: Alert[] = [];

  private readonly department: string = "employee-management";

  constructor(private accountdetailsService: AccountdetailsService,
              private employeeService: EmployeeService,
              private bookingService: BookingService,
              private roleService: RoleService) {

  }

  ngOnInit() {

  }

  //###################################################################################################################
  //HELPER ############################################################################################################
  //###################################################################################################################

  /**
  * alert Object and seconds to display the alert as input params
  *
  * produces alert for x seconds dsiplayed on the right side of the management tab
  */
  addAlertForXSeconds(alert: Alert, seconds: number) {
    this.alerts.push(alert);
    setTimeout(() => this.alerts = this.alerts.filter(entry => entry != alert), seconds * 1000);
  }

  /**
  * function without input params
  *
  * checks password and repeatedPassword for equality
  */
  validateRepeatedPassword() {
    this.passwordsAreEqual = this.repeatedPassword == this.password;
  }

  /**
  * function without input params
  *
  * checks if username already exists
  */
  validateUsername() {
    this.accountdetailsService.getAccountdetailsByUsername(this.username)
      .subscribe(
        (data => {
          this.usernameAlreadyExists = true;
        }),
        (error) => {
          this.usernameAlreadyExists = false;
          this.isSubmitAllowed = true;
        })
  }


  //###################################################################################################################
  //ADD | UPDATE ######################################################################################################
  //###################################################################################################################

  /**
  * function with callback function as input param for a controlled function sequence
  *
  * checks password and repeatedPassword for equality
  */
  addAccount(_callback: Function) {
    console.log(this.username);

    let newAccount: Accountdetail =
      {
        username: this.username,
        passwordHash: this.password,
      }

    this.accountdetailsService.save(newAccount)
      .subscribe((data) => {
          if (data.accountID) this.accountID = data.accountID;
          _callback();
        },
        (error) => {
          this.addAlertForXSeconds(new Alert('danger', "Fehler beim Anlegen des Accounts"), 5);
        });
  }

  /**
  * function with boolean and ngForm as input params
  *
  * boolean decides if an Employee is added or an existing employee ist updated
  *
  * ngForm for form resetting after update/add
  *
  * adds or updates employee with form data
  */
  addOrUpdateEmployee(addsNewEmployee: boolean, addOrUpdateEmployeeForm: NgForm) {
    this.foundEmployee = null;

    let newEmployee: Employee =
      {
        empName: this.firstName + " " + this.lastName,
        givenRole: this.givenRole,
        accountID: this.accountID,
      };

    if (addsNewEmployee) {
      this.employeeService.save(newEmployee)
        .subscribe(
          (data) => {
            this.addAlertForXSeconds(new Alert('success', "Mitarbeiter erfolgreich angelegt"), 5);
            addOrUpdateEmployeeForm.resetForm()
          },
          (error) => {
            this.addAlertForXSeconds(new Alert('danger', "Fehler beim Anlegen des Mitarbeiters"), 5);
          }
        );
    } else {
      this.employeeService.updateEmployee(this.empNo, newEmployee)
        .subscribe(
          (data) => {
            this.addAlertForXSeconds(new Alert('success', "Mitarbeiter erfolgreich geändert"), 5);
            addOrUpdateEmployeeForm.resetForm()
          },
          (error) => {
            this.addAlertForXSeconds(new Alert('danger', "Fehler beim Ändern des Mitarbeiters"), 5);
          }
        );
    }
  }

  /**
    * function with boolean and ngForm as input params
  *
    * boolean decides if an Employee is added or an existing employee is updated
  *
    * ngForm for form resetting after update/add
  *
    *
    * checks for employees rights to do this transaction
  *
    * call addAccount for new Employees or addOrUpdateEmployee for updating an Employee
    */
  addOrUpdateEmployeeAndDetails(addsNewEmployee: boolean, addOrUpdateEmployeeForm: NgForm) {
    if (this.roleService.checkRights(this.department)) {
      if (addsNewEmployee) this.addAccount(() => this.addOrUpdateEmployee(addsNewEmployee, addOrUpdateEmployeeForm));
      else this.addOrUpdateEmployee(addsNewEmployee, addOrUpdateEmployeeForm)
    } else alert("Benötigte Rechte nicht vorhanden")
  }


  //###################################################################################################################
  //GET ###############################################################################################################
  //###################################################################################################################

  /**
  * function with boolean as input param
  *
  * boolean decides if search result should be filled into the form
  *
  * searches for employee associated with the form data
  */
  submitSearch(intoFormular: boolean) {
    if (this.roleService.checkRights(this.department)) {
      this.foundEmployee = null;
      this.employeeService.getEmployee(this.empNo)
        .subscribe(data => {
            this.foundEmployee = data;
            if (intoFormular) {
              this.firstName = data.empName.substring(0, data.empName.lastIndexOf(" "));
              this.lastName = data.empName.substring(data.empName.lastIndexOf(" "));
              this.givenRole = data.givenRole;
              this.accountID = data.accountID;
            }
          },
          (error) => {
            this.addAlertForXSeconds(new Alert('danger', "Kein Mitarbeiter mit dieser Mitarbeiternummer vorhanden"), 5);
          })
    } else alert("Benötigte Rechte nicht vorhanden")
  }


  //###################################################################################################################
  //DELETE ############################################################################################################
  //###################################################################################################################

  /**
  * ngForm as input param
  *
  * ngForm for resetting the form after deletion
  *
  * deletes employee associated with the form data
  */
  deleteEmployee(deleteEmployeeForm: NgForm) {

    this.employeeService.delete(this.empNo)
      .subscribe(
        (data) => {
          this.addAlertForXSeconds(new Alert('success', "Mitarbeiter erfolgreich gelöscht"), 5);
          deleteEmployeeForm.resetForm();
        },
        (error) => {
          this.addAlertForXSeconds(new Alert('danger', "Kein Mitarbeiter mit dieser Mitarbeiternummer vorhanden"), 5);
        }
      );

  }

  /**
  * callback function as input param to ensure controlled function sequence
  *
  * calls patchBookingsAtEmployeeDelete from bookingService for each booking associated with the empNo provided in the form
  */
  patchBookings(_callback: Function) {

    let bookingNoOfEmployee: number[] = [];
    this.bookingService.getBookingsByEmpNo(this.empNo)
      .subscribe((data) => {
        console.log(data);
        data.forEach((data) => {
          if (data && data.bookingNo) {
            bookingNoOfEmployee.push(data.bookingNo)
          }
        })
        console.log(bookingNoOfEmployee)
        if (bookingNoOfEmployee.length > 0) {
          let currentIdx = 0;
          bookingNoOfEmployee.forEach((bookingNo) => {
            currentIdx++;
            this.bookingService.patchBookingsAtEmployeeDelete(bookingNo).subscribe(() => {

                if (currentIdx <= bookingNoOfEmployee.length) {
                  _callback()
                }
              },
              (error) => {
                this.addAlertForXSeconds(new Alert('danger', "Abbruch: Fehler beim Patchen der Buchungen"), 5);
              });
          })

        } else _callback();
      })

  }

  /**
  * ngForm as input param
  *
  * ngForm for resetting the form after deletion
  *
  * calls patchBookings before calling deleteEmployee
  */
  deleteEmployeeAndDetails(deleteEmployeeForm: NgForm) {

    if (this.roleService.checkRights(this.department)) {
      this.foundEmployee = null;
      this.patchBookings(() => this.deleteEmployee(deleteEmployeeForm));
    } else alert("Benötigte Rechte nicht vorhanden")
  }
}
