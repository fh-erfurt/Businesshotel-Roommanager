import { Component, OnInit } from '@angular/core';
import {Employee} from "../../services/employee/employee";
import {Accountdetail} from "../../services/accountdetails/accountdetail";
import {AccountdetailsService} from "../../services/accountdetails/accountdetails.service";
import {EmployeeService} from "../../services/employee/employee.service";
import {isNumeric} from "rxjs/internal-compatibility";
import {Alert} from "../../app.component";
import {BookingService} from "../../services/booking/booking.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit {

  constructor(private accountdetailsService: AccountdetailsService,
              private employeeService: EmployeeService,
              private bookingService: BookingService)
  {

  }

  ngOnInit()
  {

  }

  onSubmit()
  {

  }

  isChecked:boolean = false;
  firstName!:string;
  lastName!:string;
  password!:string;
  repeatedPassword!:string;
  empNo!:number;
  empName!:string;
  username!:string;
  passwordsAreEqual!:boolean;
  givenRole!:string;
  foundEmployee!:Employee | null;
  accountID!:number;
  usernameAlreadyExists:boolean=false;
  isSubmitAllowed:boolean=false;

  alerts:Alert[]=[];

  allowSubmit()
  {
    this.isSubmitAllowed = true;
  }

  addAlertForXSeconds(alert:Alert, seconds:number)
  {
    this.alerts.push(alert);
    setTimeout(()=>this.alerts=this.alerts.filter(entry=>entry!=alert),seconds*1000);
  }

  validateRepeatedPassword(){
    this.passwordsAreEqual = this.repeatedPassword == this.password;
  }

  validateUsername()
  {
    this.accountdetailsService.getAccountdetailsByUsername(this.username)
      .subscribe(
        (data=>
        {
          this.usernameAlreadyExists = true;
        }),
        (error)=>
        {
          this.usernameAlreadyExists=false;
        })
  }

  addAccount(_callback:Function)
  {
    console.log(this.username);

    let newAccount: Accountdetail =
      {
        username: this.username,
        passwordHash: this.password,
      }

     this.accountdetailsService.save(newAccount)
       .subscribe((data)=>
       {
         if(data.accountID) this.accountID=data.accountID;
         _callback();
       },
       (error)=>
       {
         this.addAlertForXSeconds(new Alert('danger',"Fehler beim Anlegen des Accounts"),5);
       });
  }


  addOrUpdateEmployee(addsNewEmployee:boolean, addOrUpdateEmployeeForm:NgForm)
  {
    this.foundEmployee=null;

    let newEmployee: Employee =
      {
        empName: this.firstName + " " + this.lastName,
        givenRole: this.givenRole,
        accountID: this.accountID,
      };

    if(addsNewEmployee) {
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
    }
    else
    {
      this.employeeService.updateEmployee(this.empNo,newEmployee)
        .subscribe(
          (data)=>
          {
            this.addAlertForXSeconds(new Alert('success',"Mitarbeiter erfolgreich geändert"),5);
            addOrUpdateEmployeeForm.resetForm()
          },
          (error)=>
          {
            this.addAlertForXSeconds(new Alert('danger',"Fehler beim Ändern des Mitarbeiters"),5);
          }
        );
    }
  }


  addOrUpdateEmployeeAndDetails(addsNewEmployee:boolean, addOrUpdateEmployeeForm:NgForm)
  {
    if(addsNewEmployee) this.addAccount(()=>this.addOrUpdateEmployee(addsNewEmployee,addOrUpdateEmployeeForm));
    else this.addOrUpdateEmployee(addsNewEmployee,addOrUpdateEmployeeForm)
  }


  submitSearch(intoFormular:boolean){
    this.foundEmployee=null;
    this.employeeService.getEmployee(this.empNo)
      .subscribe(data=>
    {
      this.foundEmployee=data;
      if(intoFormular)
      {
        this.firstName=data.empName.substring(0, data.empName.lastIndexOf(" "));
        this.lastName=data.empName.substring(data.empName.lastIndexOf(" "));
        this.givenRole=data.givenRole;
        this.accountID=data.accountID;
      }
    },
      (error)=>
      {
        this.addAlertForXSeconds(new Alert('danger',"Kein Mitarbeiter mit dieser Mitarbeiternummer vorhanden"),5);
      })
  }

  deleteEmployee(deleteEmployeeForm: NgForm)
  {

    this.employeeService.delete(this.empNo)
      .subscribe(
        (data)=>
        {
          this.addAlertForXSeconds(new Alert('success',"Mitarbeiter erfolgreich gelöscht"),5);
          deleteEmployeeForm.resetForm();
        },
        (error)=>
        {
          this.addAlertForXSeconds(new Alert('danger',"Kein Mitarbeiter mit dieser Mitarbeiternummer vorhanden"),5);
        }
      );
  }

  patchBookings(_callback:Function)
  {

    let bookingNoOfEmployee:number[]=[];
    this.bookingService.getBookingsByEmpNo(this.empNo)
      .subscribe((data)=>
      {
        console.log(data);
        data.forEach((data)=>{if(data && data.bookingNo) {bookingNoOfEmployee.push(data.bookingNo)}})
        console.log(bookingNoOfEmployee)
        if(bookingNoOfEmployee.length>0)
        {
          let currentIdx=0;
          bookingNoOfEmployee.forEach((bookingNo)=>
          {
            currentIdx++;
            this.bookingService.patchBookingsAtEmployeeDelete(bookingNo).subscribe(()=>
            {

              if(currentIdx<=bookingNoOfEmployee.length) {_callback()}
            },
            (error)=>
            {
              this.addAlertForXSeconds(new Alert('danger',"Abbruch: Fehler beim Patchen der Buchungen"),5);
            });
          })

        }
        else _callback();
      })

  }

  deleteEmployeeAndDetails(deleteEmployeeForm: NgForm)
  {


    this.foundEmployee=null;
    this.patchBookings(()=>this.deleteEmployee(deleteEmployeeForm));

  }
}
