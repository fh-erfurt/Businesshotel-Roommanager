package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.entities.bookings.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "booking", path="booking")
@Repository
public interface BookingRepository extends JpaRepository<Booking,Integer>
{

}
