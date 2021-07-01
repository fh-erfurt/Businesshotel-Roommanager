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
  conferenceroom: Conferenceroom[];
}

export interface Conferenceroom {
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
  _links: ConferenceroomLinks;
}

export interface ConferenceroomLinks {
  self: Self;
  conferenceRoom: ConferenceRoomSelf;
  room: Room;
  hotelRoom: HotelRoom;
  bookings: Bookings;
}
export interface Self {
  href: string;
}

export interface ConferenceRoomSelf {
  href: string;
}

export interface Room {
  href: string;
}

export interface HotelRoom {
  href: string;
}

export interface Bookings {
  href: string;
}
