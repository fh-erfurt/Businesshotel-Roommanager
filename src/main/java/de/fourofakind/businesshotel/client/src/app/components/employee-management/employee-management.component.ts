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
  accountID!:number | undefined;
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


  async createAccount(newAccount:Accountdetails)
  {
    await this.accountdetailsService.save(newAccount);
    return 1;
  }

  async generateUsername()
  {
    let rawUsername = this.firstName.trim().replace(" ", ".") + "." + this.lastName.trim().replace(" ", ".");
    var username = rawUsername.toLowerCase();
    console.log("zeile 87:",this.username);

    await this.accountdetailsService.getAccountdetailsByUsername(username).subscribe(
      (accountDetails) =>
      {
        if (accountDetails)
        {
            console.log(username[username.length - 1]);
            if(isNaN(parseInt(username[username.length - 1])))
            {
              username = username + "1";
            }
            else
            {
              let numberSuffix=parseInt(username[username.length - 1])+1;
              username = username + numberSuffix;
            }

            console.log("zeile 96:", username);
        }
        else
          console.log("keine accountDetails angekommen");
      },
      (error =>
      {
        console.log("username kann so bleiben");
      }),
    );

    return username;
  }

  async addEmployee()
  {

    await this.generateUsername().then((username:string)=>
    {
      this.username=username;

      let newAccount: Accountdetails =
        {
          username: username,
          passwordHash: this.password, //TODO:passwort hashen

        }
      console.log(newAccount);
      this.createAccount(newAccount).then(() =>
      {
          if (this.accountdetailsService.lastInsertedID)
          {
            this.accountID = this.accountdetailsService.lastInsertedID;
            let newEmployee: Employee =
              {
                empName: this.firstName + " " + this.lastName,
                givenRole: this.givenRole,
                accountID: this.accountID,
              };
            this.employeeService.save(newEmployee);
            console.log("Employee delivered");

          }
        console.log(this.accountID);

      })

    })
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
