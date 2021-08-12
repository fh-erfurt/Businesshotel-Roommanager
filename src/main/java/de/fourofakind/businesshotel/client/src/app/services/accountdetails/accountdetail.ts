import {EmployeeSelf} from "../employee/employee";
import {Links} from "../login/login";

export interface RawData {
  _embedded: Embedded;
  // _links: Links;
  page: Page;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number
}

export interface Embedded {
  accountdetail: Accountdetail[];
}

export interface Accountdetail {
  accountID?: number;
  username:string;
  passwordHash:string;
  _links?:AccountDetailsLinks;
}

export interface AccountDetailsLinks {
  self: Self;
  accountDetails: AccountDetailsSelf;
  customer: Customer;
  employee: Employee;
}

export interface Self {
  href: string;
}

export interface AccountDetailsSelf {
  href: string;
}

export interface Customer {
  href: string;
}

export interface Employee {
  href: string;
}



