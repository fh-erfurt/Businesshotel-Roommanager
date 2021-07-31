import { Component, OnInit } from '@angular/core';
import {Employee} from "../../services/employee/employee";
import {Accountdetails} from "../../services/accountdetails/accountdetails";
import {AccountdetailsService} from "../../services/accountdetails/accountdetails.service";
import {EmployeeService} from "../../services/employee/employee.service";
import {throwError} from "rxjs";
import {isNumeric} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit {



  isChecked:boolean = false;
  firstName!:string;
  lastName!:string;
  password!:string;
  repeatedPassword!:string;
  empNo:number=0;
  empName!:string;
  username!:string;
  passwordsAreEqual!:boolean;
  givenRole!:string;
  foundEmployee!:Employee;
  accountID!:number;
  searchSuccessful:boolean=false;
  searchForFillInSuccessful:boolean=false;
  lastFoundEmployee!:Employee;
  searchButtonPressed:boolean=false;
  fillInButtonPressed:boolean=false;
  usernameAlreadyExists:boolean=false;

  constructor(private accountdetailsService: AccountdetailsService, private employeeService: EmployeeService) {

  }

  ngOnInit()
  {

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
       });
  }

  getUsername(_callback:Function)
  {
    var username = this.firstName.trim().replace(" ", ".") + "." + this.lastName.trim().replace(" ", ".");
    username = username.toLowerCase();

    this.username=username;

    this.accountdetailsService.getAccountdetailsByUsername(username).subscribe(
      (data)=>
      {
        this.modifyUsernameIfAlreadyExists(username);
        _callback();
      },
    (error)=>
    {
      if (error.status === 404) _callback();
    }
    )
  }

  modifyUsernameIfAlreadyExists(username:string)
  {
    let modifiedUsername;
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
    return;
  }

  addEmployee()
  {
    let newEmployee: Employee =
      {
        empName: this.firstName + " " + this.lastName,
        givenRole: this.givenRole,
        accountID: this.accountID,
      };
    this.employeeService.save(newEmployee);
  }


  addEmployeeAndDetails()
  {
    this.getUsername(()=>this.addAccount(()=>this.addEmployee()));

  }





  submitSearch(){
    this.searchButtonPressed=true;
    console.log(this.empNo);
    this.searchSuccessful=false;
    this.employeeService.getEmployee(this.empNo).subscribe(data=>
    {

      this.lastFoundEmployee=this.foundEmployee;
      this.foundEmployee=data;

      if(this.lastFoundEmployee!==this.foundEmployee)
      {
        this.searchSuccessful=true;
      }


    })

  }

  loadEmployeeInfoToFormular()
  {
    this.searchForFillInSuccessful=false;
    this.fillInButtonPressed=true;
    this.employeeService.getEmployee(this.empNo).subscribe(data=>
    {
      this.firstName=data.empName.substring(0, data.empName.lastIndexOf(" "));
      this.lastName=data.empName.substring(data.empName.lastIndexOf(" "));
      this.givenRole=data.givenRole;
      this.accountID=data.accountID;
      this.searchForFillInSuccessful=true;
    });
  }

  deleteEmployee()
  {
    this.employeeService.delete(this.empNo);

  }

  changeEmployee()
  {
    //TODO:Logik implementieren
  }
}
