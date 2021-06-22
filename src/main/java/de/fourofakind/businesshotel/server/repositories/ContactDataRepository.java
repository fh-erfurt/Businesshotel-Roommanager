package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.customers.ContactData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "contactdata", path="contactdata")
public interface ContactDataRepository extends JpaRepository<ContactData,Integer>
{

}
