import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import {Employee, RawData} from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeesData!: RawData;
  employeesAsString!: any;

  testData = {
    "_embedded": {
      "employee": [
        {
          "empName": "Peter Quistgard",
          "givenRole": "BuchungsManager",
          "accountID": 3,
          "_links": {
            "self": {
              "href": "http://localhost:8081/employee/1"
            },
            "employee": {
              "href": "http://localhost:8081/employee/1"
            },
            "bookings": {
              "href": "http://localhost:8081/employee/1/bookings"
            },
            "role": {
              "href": "http://localhost:8081/employee/1/role"
            },
            "accountDetails": {
              "href": "http://localhost:8081/employee/1/accountDetails"
            }
          }
        },
        {
          "empName": "Malignes Rau",
          "givenRole": "Hotelleiter",
          "accountID": 7,
          "_links": {
            "self": {
              "href": "http://localhost:8081/employee/2"
            },
            "employee": {
              "href": "http://localhost:8081/employee/2"
            },
            "bookings": {
              "href": "http://localhost:8081/employee/2/bookings"
            },
            "role": {
              "href": "http://localhost:8081/employee/2/role"
            },
            "accountDetails": {
              "href": "http://localhost:8081/employee/2/accountDetails"
            }
          }
        },
        {
          "empName": "Silikaten Muh",
          "givenRole": "Kundenverwalter",
          "accountID": 8,
          "_links": {
            "self": {
              "href": "http://localhost:8081/employee/3"
            },
            "employee": {
              "href": "http://localhost:8081/employee/3"
            },
            "bookings": {
              "href": "http://localhost:8081/employee/3/bookings"
            },
            "role": {
              "href": "http://localhost:8081/employee/3/role"
            },
            "accountDetails": {
              "href": "http://localhost:8081/employee/3/accountDetails"
            }
          }
        },
        {
          "empName": "Juri Juhu",
          "givenRole": "Raumverwalter",
          "accountID": 9,
          "_links": {
            "self": {
              "href": "http://localhost:8081/employee/4"
            },
            "employee": {
              "href": "http://localhost:8081/employee/4"
            },
            "bookings": {
              "href": "http://localhost:8081/employee/4/bookings"
            },
            "role": {
              "href": "http://localhost:8081/employee/4/role"
            },
            "accountDetails": {
              "href": "http://localhost:8081/employee/4/accountDetails"
            }
          }
        }
      ]
    },
    "_links": {
      "self": {
        "href": "http://localhost:8081/employee/"
      },
      "profile": {
        "href": "http://localhost:8081/profile/employee"
      },
      "search": {
        "href": "http://localhost:8081/employee/search"
      }
    },
    "page": {
      "size": 20,
      "totalElements": 4,
      "totalPages": 1,
      "number": 0
    }
  };

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {this.employeeService.getEmployees().subscribe((data: RawData)=>{
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






