import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees!: Employee[];
  employeesAsString!: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {this.employeeService.getEmployees().subscribe((data: Employee[])=>{
    console.log(data);
    this.employees = data;
    this.employeesAsString = data.keys;
  
  })
  }

}






