package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.customers.BookingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "bookingrequest", path="bookingrequest")
@Repository
public interface BookingRequestRepository extends JpaRepository<BookingRequest,Integer>
{

}