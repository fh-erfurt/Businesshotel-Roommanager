package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.bookings.HotelRoomBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * <p>This repository specifies the booking for a hotel room a little further. As we provide two types of booking,
 * there is a difference on certain aspects of the booking which are necessary to seperate. There are options that are
 * necessary for a conferenceroom but obsolete for an hotelroom. Furthermore a hotelroom can be booked for several days
 * in one booking, so that the hour of the booking is not important, but the date is. </p>
 */
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "hotelRoomBooking", path = "hotelRoomBooking")
public interface HotelRoomBookingRepository extends JpaRepository<HotelRoomBooking, Integer>
{

}
