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
  customer!: Customer[];
}

export class Customer {
  contactDataID!: number;
  paymentMethod!: string;
  account_id!: number;
  businessCustomer!: boolean;
  _links!: CustomerLinks;
}

export class CustomerLinks {
  self!: Self;
  customer!: CustomerSelf;
  contactData!: ContactData;
  bookings!: Bookings;
  accountDetails!: AccountDetails;
}

export class Self {
  href!: string;
}

export class CustomerSelf {
  href!: string;
}

export class ContactData {
  href!: string;
}

export class Bookings {
  href!: string;
}

export class AccountDetails {
  href!: string;
}
