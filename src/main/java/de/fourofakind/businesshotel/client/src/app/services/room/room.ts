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
  conferenceroom: Conferenceroom[];
}

export interface Room {
  room_no: number;
  room_name: string;
  area_in_sqr_metre: number;
  category: string;
  price_per_unit: number;
  updated_at: string;
  created_at: string;

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
  conferenceRoom: ConferenceRoomSelf[];
  room: Room;
  hotelRoom: HotelRoom;
  bookings: Bookings;
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
  hotelRoom: HotelRoomSelf[];
  bookings: Bookings;
  conferenceRoom: ConferenceRoom;
  room: Room;
}

export interface HotelRoomSelf {
  href: string;
}

export interface HotelRoom {
  href: string;
}

export interface ConferenceRoom {
  href: string;
}

export interface ConferenceRoomSelf {
  href: string;
}

export interface Room {
  href: string;
}

export interface Self {
  href: string;
}

export interface Bookings {
  href: string;
}
