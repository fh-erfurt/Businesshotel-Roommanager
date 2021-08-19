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
  role: Role[];
}

export interface Role {
  enabledToManageCustomerData: boolean;
  enabledToManageBookings: boolean;
  enabledToManageRooms: boolean;
  _links: RoleLinks;
}

export interface RoleLinks {
  self: Self;
  role: RoleSelf;
  employee: Employee;
}

export interface Self {
  href: string;
}

export interface RoleSelf {
  href: string;
}

export interface Employee {
  href: string;
}
