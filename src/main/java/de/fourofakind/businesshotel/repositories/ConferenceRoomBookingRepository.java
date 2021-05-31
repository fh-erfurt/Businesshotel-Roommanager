package de.fourofakind.businesshotel.repositories;


import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "conferenceroombooking", path="conferenceroombooking")
@Repository
public interface ConferenceRoomBookingRepository extends BookingRepository
{

}
