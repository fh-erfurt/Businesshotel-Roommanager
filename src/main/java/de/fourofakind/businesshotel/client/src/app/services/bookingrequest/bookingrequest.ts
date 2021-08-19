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
  bookingrequest: Bookingrequest[];
}

export interface Bookingrequest {
  bookingRequestID?:number;
  customerID: number;
  startDate: Date;
  endDate: Date;
  bookingtype: string;
  roomCategory: string;
  specialWishes?: any;
  _links?: BookingRequestLinks;
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


export interface Self {
  href: string;
}

export interface HotelRoom {
  href: string;
}

export interface ConferenceRoom {
  href: string;
}

export interface Room {
  href: string;
}

export interface Bookings {
  href: string;
}

export interface Links {
  self: Self;
  hotelRoom: HotelRoom[];
  conferenceRoom: ConferenceRoom;
  room: Room;
  bookings: Bookings;
}

export interface Hotelroom {
  roomNo: number;
  pricePerUnit: number;
  category: string;
  areaInSqrMetre: number;
  roomType: string;
  bedCount: number;
  hasSpeedLAN: boolean;
  hasTV: boolean;
  hasKitchen: boolean;
  hasCoffeemaker: boolean;
  _links: Links;
}

export interface Self2 {
  href: string;
}

export interface ConferenceRoom2 {
  href: string;
}

export interface Bookings2 {
  href: string;
}

export interface Room2 {
  href: string;
}

export interface HotelRoom2 {
  href: string;
}

export interface Links2 {
  self: Self2;
  conferenceRoom: ConferenceRoom2[];
  bookings: Bookings2;
  room: Room2;
  hotelRoom: HotelRoom2;
}

export interface Conferenceroom {
  roomNo: number;
  pricePerUnit: number;
  category: string;
  areaInSqrMetre: number;
  roomType: string;
  maxAmountOfParticipants: number;
  amountOfWhiteboards: number;
  amountOfBeamer: number;
  hasScreen: boolean;
  hasComputer: boolean;
  amountOfTV: number;
  _links: Links2;
}

export interface Embedded {
  hotelroom: Hotelroom[];
  conferenceroom: Conferenceroom[];
}

export interface Self3 {
  href: string;
}

export interface Profile {
  href: string;
}

export interface Search {
  href: string;
}

export interface Links3 {
  self: Self3;
  profile: Profile;
  search: Search;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface RootObject {
  _embedded: Embedded;
  _links: Links3;
  page: Page;
}
