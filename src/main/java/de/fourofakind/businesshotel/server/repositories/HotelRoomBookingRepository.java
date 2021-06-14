package de.fourofakind.businesshotel.server.repositories;


import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "hotelroombooking", path="hotelroombooking")
@Repository
public interface HotelRoomBookingRepository extends BookingRepository
{

}
