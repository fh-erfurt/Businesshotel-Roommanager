package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.customers.BookingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "bookingrequest", path="bookingrequest")
public interface BookingRequestRepository extends JpaRepository<BookingRequest,Integer>
{

}