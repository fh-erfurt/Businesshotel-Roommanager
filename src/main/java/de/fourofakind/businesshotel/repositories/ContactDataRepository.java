package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.entities.customers.ContactData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "contactdata", path="contactdata")
@Repository
public interface ContactDataRepository extends JpaRepository<ContactData,Integer>
{

}
