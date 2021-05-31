package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.bookings.ConferenceRoomBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "conferenceroombooking", path="conferenceroombooking")
@Repository
public interface ConferenceRoomBookingRepository extends JpaRepository<ConferenceRoomBooking,Integer>
{

}
