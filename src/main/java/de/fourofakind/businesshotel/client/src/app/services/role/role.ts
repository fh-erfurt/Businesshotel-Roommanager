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
  role!: Role[];
}

export class Role {
  enabledToManageCustomerData!: boolean;
  enabledToManageBookings!: boolean;
  enabledToManageRooms!: boolean;
  _links!: RoleLinks;
}

export class RoleLinks {
  self!: Self;
  role!: RoleSelf;
  employee!: Employee;
}

export class Self {
  href!: string;
}

export class RoleSelf {
  href!: string;
}

export class Employee {
  href!: string;
}
