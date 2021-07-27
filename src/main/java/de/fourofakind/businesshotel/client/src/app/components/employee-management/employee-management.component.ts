import { Component, OnInit } from '@angular/core';
import {Employee} from "../../services/employee/employee";
import {Accountdetails} from "../../services/accountdetails/accountdetails";
import {AccountdetailsService} from "../../services/accountdetails/accountdetails.service";
import {EmployeeService} from "../../services/employee/employee.service";

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

  constructor(private accountdetailsService: AccountdetailsService, private employeeService: EmployeeService) {
  }

  ngOnInit()
  {

  }

  setFirstName(event:any){
    this.firstName=event.target.value;
    console.log(this.firstName);
  }

  setLastName(event:any){
    this.lastName=event.target.value;
    console.log(this.lastName);
  }

  setPassword(event:any){
    this.password=event.target.value;
    console.log(this.password);
  }

  setRepeatedPassword(event:any){
    this.repeatedPassword=event.target.value;
    console.log(this.repeatedPassword);
  }

  validateRepeatedPassword(){
    this.passwordsAreEqual = this.repeatedPassword == this.password;
  }

  setEmpNo(event:any){
    this.empNo=event.target.value;
    console.log(this.empNo);
  }

  setGivenRole(role:string){
    this.givenRole=role;
    console.log(this.givenRole);
  }


  addEmployee(){

    this.username=this.firstName.trim().replace(" ", ".")+"."+this.lastName.trim().replace(" ", ".");
    this.username=this.username.toLowerCase();
    console.log(this.username);


    let newAccount:Accountdetails=
      {
        username: this.username,
        passwordHash: this.password, //TODO:passwort hashen

      }
    console.log(newAccount);
    let accountID:any=this.accountdetailsService.save(newAccount);


    console.log(accountID);

    if(accountID)
    {
      let newEmployee:Employee =
        {
          empName:this.firstName+" "+this.lastName,
          givenRole:this.givenRole,
          accountID:accountID,
        };
      this.employeeService.save(newEmployee);
    }

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
