import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.sass']
})
export class EmployeeComponent implements OnInit {

  employees!: Employee[];
  mitarbeiter!: Employee ;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[])=>{
      console.log(data);
      this.employees = data;


    ;  
    })
  }

  
}