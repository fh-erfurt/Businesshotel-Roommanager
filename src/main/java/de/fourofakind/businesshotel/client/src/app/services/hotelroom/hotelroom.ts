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
  hotelroom: Hotelroom[];
}

export interface Hotelroom {
  pricePerUnit: number;
  category: string;
  areaInSqrMetre: number;
  roomType: string;
  bedCount: number;
  hasSpeedLAN: boolean;
  hasTV: boolean;
  hasKitchen: boolean;
  hasCoffeemaker: boolean;
  _links: HotelroomLinks;
}

export interface HotelroomLinks {
  self: Self;
  hotelRoom: HotelRoomSelf;
  bookings: Bookings;
  conferenceRoom: ConferenceRoom;
  room: Room;
}

export interface Self {
  href: string;
}

export interface HotelRoomSelf {
  href: string;
}

export interface Bookings {
  href: string;
}

export interface ConferenceRoom {
  href: string;
}

export interface Room {
  href: string;
}
