package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.bookings.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "booking", path="booking")
public interface BookingRepository extends JpaRepository<Booking,Integer>
{
    List<Booking> findByCustomerID (@Param("customerID") Integer customerID);
    List<Booking> findByEmpNo (@Param("empNo") Integer empNo);
}
