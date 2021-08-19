export interface Self {
  href: string;
}

export interface AccountDetails {
  href: string;
}

export interface Customer {
  href: string;
}

export interface Employee {
  href: string;
}

export interface Links {
  self: Self;
  accountDetails: AccountDetails;
  customer: Customer;
  employee: Employee;
}

export interface Accountdetail {
  accountID: number;
  username: string;
  passwordHash: string;

}

export interface Embedded {
  accountdetails: Accountdetail[];
}

export interface Self2 {
  href: string;
}

export interface Profile {
  href: string;
}

export interface Links2 {
  self: Self2;
  profile: Profile;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface RootObject {
  _embedded: Embedded;
  _links: Links2;
  page: Page;
}
