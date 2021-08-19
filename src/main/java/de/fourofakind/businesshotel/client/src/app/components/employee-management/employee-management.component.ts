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
*
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
   * produces alert for x seconds displayed on the right side of the management tab
   *
   * @param alert contains message and alert type (danger or success)
   * @param seconds seconds to display the alert
   *
   */
  addAlertForXSeconds(alert: Alert, seconds: number) {
    this.alerts.push(alert);
    setTimeout(() => this.alerts = this.alerts.filter(entry => entry != alert), seconds * 1000);
  }

  /**
  *
  * checks password and repeatedPassword for equality
  */
  validateRepeatedPassword() {
    this.passwordsAreEqual = this.repeatedPassword == this.password;
  }

  /**
  * checks for employees rights to do this transaction
  *
  * checks if username already exists
  */
  validateUsername() {
    if (this.roleService.checkRights(this.department)) {
      this.accountdetailsService.getAccountdetailsByUsername(this.username)
        .subscribe(
          (data => {
            this.usernameAlreadyExists = true;
          }),
          (error) => {
            this.usernameAlreadyExists = false

            this.isSubmitAllowed = true;
          })
    } else alert("Benötigte Rechte nicht vorhanden")
  }


  //###################################################################################################################
  //ADD | UPDATE ######################################################################################################
  //###################################################################################################################


  /**
   *
   * checks password and repeatedPassword for equality
   *
   * @param _callback to ensure a controlled function sequence
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
   * adds or updates employee with form data
   *
   * @param addsNewEmployee decides if an Employee is added or an existing employee is updated
   * @param addOrUpdateEmployeeForm needed for form resetting after update/add
   *
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
   * checks for employees rights to do this transaction
   *
   * calls addAccount for adding new Employees or addOrUpdateEmployee for updating an Employee
   *
   * @param addsNewEmployee decides if an Employee is added or an existing Employee is updated
   * @param addOrUpdateEmployeeForm needed for form resetting after update/add
   *
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
   * checks for employees rights to do this transaction
   *
   * searches for employee associated with the form data
   *
   * @param intoFormular decides if search result should be filled into the form
   *
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
   * deletes employee associated with the form data
   *
   * @param deleteEmployeeForm for resetting the form after deletion
   *
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
   * calls patchBookingsAtEmployeeDelete from bookingService for each booking associated with the empNo provided in the form
   *
   * @param _callback to ensure controlled function sequence
   *
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
   * checks for employees rights to do this transaction
   *
   * calls patchBookings before calling deleteEmployee
   *
   * @param deleteEmployeeForm for resetting the form after deletion
   *
   */
  deleteEmployeeAndDetails(deleteEmployeeForm: NgForm) {

    if (this.roleService.checkRights(this.department)) {
      this.foundEmployee = null;
      this.patchBookings(() => this.deleteEmployee(deleteEmployeeForm));
    } else alert("Benötigte Rechte nicht vorhanden")
  }
}
