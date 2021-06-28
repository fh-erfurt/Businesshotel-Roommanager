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
  conferenceRoomBookings!: ConferenceRoomBooking[];
  hotelRoomBookings!: HotelRoomBooking[];
}

export class ConferenceRoomBooking {
  roomNo!: number;
  pricing!: number;
  empNo!: number;
  startDate!: Date;
  endDate!: Date;
  specialWishes!: string;
  customerID!: number;
  _links!: ConferenceRoomBookingLinks;
}

export class HotelRoomBooking {
  roomNo!: number;
  pricing!: number;
  empNo!: number;
  startDate!: Date;
  endDate!: Date;
  specialWishes!: string;
  customerID!: number;
  _links!: HotelRoomBookingLinks;
}

export class ConferenceRoomBookingLinks {
  self!: Self;
  conferenceRoomBooking!: ConferenceRoomBookingSelf;
  customer!: Customer;
  employee!: Employee;
}

export class HotelRoomBookingLinks {
  self!: Self;
  conferenceRoomBooking!: HotelRoomBookingSelf;
  customer!: Customer;
  employee!: Employee;
}

export class Self {
  href!: string;
}

export class ConferenceRoomBookingSelf {
  href!: string;
}

export class HotelRoomBookingSelf {
  href!: string;
}

export class Customer {
  href!: string;
}

export class Employee {
  href!: string;
}


