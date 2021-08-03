import { Component, OnInit } from '@angular/core';
import {Employee} from "../../services/employee/employee";
import {Accountdetails} from "../../services/accountdetails/accountdetails";
import {AccountdetailsService} from "../../services/accountdetails/accountdetails.service";
import {EmployeeService} from "../../services/employee/employee.service";
import {isNumeric} from "rxjs/internal-compatibility";
import {Alert} from "../../app.component";
import {BookingService} from "../../services/booking/booking.service";

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

  alerts:Alert[]=[];

  addAlertForXSeconds(alert:Alert, seconds:number)
  {
    this.alerts.push(alert);
    setTimeout(()=>this.alerts=this.alerts.filter(entry=>entry!=alert),seconds*1000);
  }

  validateRepeatedPassword(){
    this.passwordsAreEqual = this.repeatedPassword == this.password;
  }

  addAccount(_callback:Function)
  {
    console.log(this.username);

    let newAccount: Accountdetails =
      {
        username: this.username,
        passwordHash: this.password, //TODO:passwort hashen
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

  getUsername(_callback:Function, username:string, addsNewEmployee:boolean)
  {
    this.accountdetailsService.getAccountdetailsByUsername(username)
      .subscribe(
      (data)=> {
        if (data.username == username) {
          this.modifyUsernameIfAlreadyExists(username,addsNewEmployee);
          _callback();
        }
      },
    (error)=>
      {
        if (error.status === 404) _callback();
      }
    )
  }

  modifyUsernameIfAlreadyExists(username:string,addsNewEmployee:boolean)
  {
    let modifiedUsername;
    console.log(username[username.length - 1])
    console.log(isNumeric(parseInt(username[username.length - 1])))
    if(isNumeric(parseInt(username[username.length - 1])))
    {
      let newIndex=parseInt(username[username.length - 1])+1;
      modifiedUsername=username.substring(0, username.length - 1)+newIndex;
      console.log(modifiedUsername);
    }
    else
    {
      modifiedUsername=username+"1";
      console.log(modifiedUsername);
    }
    if(modifiedUsername) this.username=modifiedUsername;
    this.getUsername(()=>this.addAccount(()=>this.addOrUpdateEmployee(addsNewEmployee)),modifiedUsername,addsNewEmployee);
    return;
  }

  addOrUpdateEmployee(addsNewEmployee:boolean)
  {
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
          },
          (error)=>
          {
            this.addAlertForXSeconds(new Alert('danger',"Fehler beim Ändern des Mitarbeiters"),5);
          }
        );
    }
  }


  addOrUpdateEmployeeAndDetails(addsNewEmployee:boolean)
  {
    var username = this.firstName.trim().replace(" ", ".") + "." + this.lastName.trim().replace(" ", ".");
    username = username.toLowerCase();

    this.username=username;
    this.getUsername(()=>this.addAccount(()=>this.addOrUpdateEmployee(addsNewEmployee)),username,addsNewEmployee);

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

  deleteEmployee()
  {

    this.employeeService.delete(this.empNo)
      .subscribe(
        (data)=>
        {
          this.addAlertForXSeconds(new Alert('success',"Mitarbeiter erfolgreich gelöscht"),5);
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
        if(bookingNoOfEmployee)
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

  deleteEmployeeAndDetails()
  {
    this.foundEmployee=null;

    this.patchBookings(()=>this.deleteEmployee());
  }
}
