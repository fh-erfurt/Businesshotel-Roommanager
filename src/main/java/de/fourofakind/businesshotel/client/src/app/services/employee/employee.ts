export interface RawData {
  _embedded: Embedded;

  page: Page;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number
}













export interface Embedded {
  employee: Employee[];
}

export interface Employee {
  empNo?: number;
  empName: string;
  givenRole: string;
  accountID: number;
  _links?: EmpLinks;
}

export interface EmpLinks {
  self: Self;
  employee: EmployeeSelf;
  accountDetails: AccountDetails;
  bookings: Bookings;
  role: Role;
}

export interface Self {
  href: string;
}

export interface EmployeeSelf {
  href: string;
}
export interface AccountDetails {
  href: string;
}
export interface Bookings {
  href: string;
}
export interface Role {
  href: string;
}

