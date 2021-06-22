package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.bookings.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "booking", path="booking")
public interface BookingRepository extends JpaRepository<Booking,Integer>
{

}
