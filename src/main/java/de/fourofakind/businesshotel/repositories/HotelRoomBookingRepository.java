package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.bookings.HotelRoomBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "hotelroombooking", path="hotelroombooking")
@Repository
public interface HotelRoomBookingRepository extends JpaRepository<HotelRoomBooking,Integer>
{

}
