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
  conferenceRoomBookings: ConferenceRoomBooking[];
  hotelRoomBookings: HotelRoomBooking[];
}

export interface ConferenceRoomBooking {
  roomNo: number;
  pricing: number;
  empNo: number;
  startDate: Date;
  endDate: Date;
  specialWishes: string;
  customerID: number;
  _links: ConferenceRoomBookingLinks;
}

export interface HotelRoomBooking {
  roomNo: number;
  pricing: number;
  empNo: number;
  startDate: Date;
  endDate: Date;
  specialWishes: string;
  customerID: number;
  _links: HotelRoomBookingLinks;
}

export interface ConferenceRoomBookingLinks {
  self: Self;
  conferenceRoomBooking: ConferenceRoomBookingSelf;
  customer: Customer;
  employee: Employee;
}

export interface HotelRoomBookingLinks {
  self: Self;
  conferenceRoomBooking: HotelRoomBookingSelf;
  customer: Customer;
  employee: Employee;
}

export interface Self {
  href: string;
}

export interface ConferenceRoomBookingSelf {
  href: string;
}

export interface HotelRoomBookingSelf {
  href: string;
}

export interface Customer {
  href: string;
}

export interface Employee {
  href: string;
}


