package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.bookings.HotelRoomBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRoomBookingRepository extends JpaRepository<HotelRoomBooking,Integer>
{

}
