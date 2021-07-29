package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.bookings.ConferenceRoomBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "conferenceRoomBooking", path="conferenceRoomBooking")
public interface ConferenceRoomBookingRepository extends JpaRepository<ConferenceRoomBooking,Integer>
{

}
