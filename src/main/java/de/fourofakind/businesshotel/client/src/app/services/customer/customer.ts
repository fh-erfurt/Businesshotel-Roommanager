import {EmployeeSelf} from "../employee/employee";

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
  customer: Customer[];
}

export interface Customer {
  contactDataID: number;
  paymentMethod: string;
  account_id: number;
  businessCustomer: boolean;
  _links: CustomerLinks;
}

export interface CustomerLinks {
  self: Self;
  customer: CustomerSelf;
  contactData: ContactData;
  bookings: Bookings;
  accountDetails: AccountDetails;
}

export interface Self {
  href: string;
}

export interface CustomerSelf {
  href: string;
}

export interface ContactData {
  href: string;
}

export interface Bookings {
  href: string;
}

export interface AccountDetails {
  href: string;
}
