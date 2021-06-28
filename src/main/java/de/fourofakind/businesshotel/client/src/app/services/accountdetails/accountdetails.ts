import {EmployeeSelf} from "../employee/employee";

export interface RawData {
  _embedded: Embedded;
  // _links!: Links;
  page: Page;
}

export class Page {
  size!: number;
  totalElements!: number;
  totalPages!: number;
  number!: number
}

export class Embedded {
  accountdetail!: Accountdetails[];
}

export class Accountdetails {
  username!:string;
  password_hash!:string;
  _links!:AccountDetailsLinks;
}

export class AccountDetailsLinks {
  self!: Self;
  accountDetails!: AccountDetailsSelf;
  customer!: Customer;
  employee!: Employee;
}

export class Self {
  href!: string;
}

export class AccountDetailsSelf {
  href!: string;
}

export class Customer {
  href!: string;
}

export class Employee {
  href!: string;
}



