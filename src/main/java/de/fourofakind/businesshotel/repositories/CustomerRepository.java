package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.entities.customers.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "customer", path="customer")
@Repository
public interface CustomerRepository extends JpaRepository<Customer,Integer>
{

}
