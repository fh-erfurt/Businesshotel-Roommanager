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
  contactdata!: Contactdata[];
}

export class Contactdata {
  firstName!: string;
  lastName!: string;
  streetName!: string;
  streetNumber!: string;
  postalCode!: string;
  cityName!: string;
  phone!: string;
  mailAddress!: string;
  paymentCredentials?: any;
  _links!: ContactDataLinks;
}

export class ContactDataLinks {
  self!: Self;
  contactData!: ContactDataSelf;
  customers!: Customers;
}

export class Self {
  href!: string;
}

export class ContactDataSelf {
  href!: string;
}

export class Customers {
  href!: string;
}
