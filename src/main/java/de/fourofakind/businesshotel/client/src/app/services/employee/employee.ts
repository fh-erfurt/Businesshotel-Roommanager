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
// export interface Links {
//   "size": 20,
//   "totalElements": 4,
//   "totalPages": 1,
//   "number": 0
// }

// export interface Embedded {
//   // key: string;
//   value: Value
// }


export interface Embedded {
  employee: Employee[];
}

export interface Employee {
  empName: string;
  givenRole: string;
  accountID: number;
  _links: EmpLinks;
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

