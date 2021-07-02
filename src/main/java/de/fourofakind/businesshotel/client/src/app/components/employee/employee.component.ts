import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import {Employee, RawData} from '../../services/employee/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeesData!: RawData;
  employeesAsString!: any;


  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: RawData)=>{
      console.log("Pustekuchen");
      console.log(data);
      console.log("Pustekuchen");
      this.employeesData = data as RawData;

    // this.employeesAsString = data.keys;

    // this.employeesAsString = JSON.stringify(this.testData);
    // this.employeesData = JSON.parse(this.employeesAsString)

    // console.log(this.employeesAsString);
    // console.log("Pustekuchen");
    // console.log(this.employeesData);
    // console.log("Pustekuchen");

    })
  }

}






