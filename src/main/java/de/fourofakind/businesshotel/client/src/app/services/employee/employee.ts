

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
// export class Links {
//   "size": 20,
//   "totalElements": 4,
//   "totalPages": 1,
//   "number": 0
// }

// export class Embedded {
//   // key!: string;
//   value!: Value
// }


export class Embedded {
  employee!: Employee[];
}

export class Employee {
  empName!: string;
  givenRole!: string;
  accountID!: number;
  _links!: EmpLinks;
}

export class EmpLinks {
  self!: Self;
  employee!: EmployeeC;
  accountDetails!: AccountDetails;
  bookings!: Bookings;
  role!: Role;
}

export class Self {
  href!: string;
}

export class EmployeeC {
  href!: string;
}
export class AccountDetails {
  href!: string;
}
export class Bookings {
  href!: string;
}
export class Role {
  href!: string;
}

