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
  bookingrequest!: Bookingrequest[];
}

export class Bookingrequest {
  customerID!: number;
  startDate!: Date;
  endDate!: Date;
  bookingtype!: string;
  roomCategory!: string;
  specialWishes?: any;
  _links!: BookingRequestLinks;
}

export class BookingRequestLinks {
  self!: Self;
  bookingRequest!: BookingRequestSelf;
  customer!: Customer;
}

export class Self {
  href!: string;
}

export class BookingRequestSelf {
  href!: string;
}
export class Customer {
  href!: string;
}
