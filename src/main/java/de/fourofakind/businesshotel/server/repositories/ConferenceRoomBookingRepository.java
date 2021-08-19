package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.bookings.ConferenceRoomBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
/**
 * <p>This repository specifies the booking for a conference room a little further. As we provide two types of booking,
 * there is a difference on certain aspects of the booking which are necessary to seperate. There are options that are
 * necessary for a conferenceroom but obsolete for an hotelroom. Furthermore a conferenceroom can be booked only for a day
 * in one booking, so the hour of the booking is important. </p>
 */
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "conferenceRoomBooking", path="conferenceRoomBooking")
public interface ConferenceRoomBookingRepository extends JpaRepository<ConferenceRoomBooking,Integer>
{

}
