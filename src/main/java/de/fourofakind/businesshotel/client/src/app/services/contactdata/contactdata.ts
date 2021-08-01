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
  contactdata: Contactdata[];
}

export interface Contactdata {
  contactDataID?:number;
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  cityName: string;
  phone: string;
  mailAddress: string;
  paymentCredentials?: string;
  _links?: ContactDataLinks;
}

export interface ContactDataLinks {
  self: Self;
  contactData: ContactDataSelf;
  customers: Customers;
}

export interface Self {
  href: string;
}

export interface ContactDataSelf {
  href: string;
}

export interface Customers {
  href: string;
}
