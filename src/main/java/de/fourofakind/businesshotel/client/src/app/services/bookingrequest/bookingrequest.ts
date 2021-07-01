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
  bookingrequest: Bookingrequest[];
}

export interface Bookingrequest {
  customerID: number;
  startDate: Date;
  endDate: Date;
  bookingtype: string;
  roomCategory: string;
  specialWishes?: any;
  _links: BookingRequestLinks;
}

export interface BookingRequestLinks {
  self: Self;
  bookingRequest: BookingRequestSelf;
  customer: Customer;
}

export interface Self {
  href: string;
}

export interface BookingRequestSelf {
  href: string;
}
export interface Customer {
  href: string;
}
