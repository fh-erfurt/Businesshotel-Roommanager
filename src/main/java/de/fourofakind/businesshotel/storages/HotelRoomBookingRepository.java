package de.fourofakind.businesshotel.storages;

import de.fourofakind.businesshotel.bookings.HotelRoomBooking;
import org.springframework.data.repository.CrudRepository;

public interface HotelRoomBookingRepository extends CrudRepository<HotelRoomBooking,Integer>
{}
