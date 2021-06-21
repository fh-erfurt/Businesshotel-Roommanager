import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.sass']
})
export class EmployeeComponent implements OnInit {

  employees!: Employee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getRooms().subscribe((data: Employee[])=>{
      console.log(data);
      this.employees = data;
    })
  }

}