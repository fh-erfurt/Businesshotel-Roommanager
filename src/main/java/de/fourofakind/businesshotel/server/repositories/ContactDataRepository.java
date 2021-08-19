package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.customers.ContactData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * <p>This repository represents the ContactData. It contains all information necessary to locate and contact a customer or employee.
 * Additionally the payment-credentials for the customer are also stored here.</p>
 */
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "contactdata", path = "contactdata")
public interface ContactDataRepository extends JpaRepository<ContactData, Integer>
{

}
