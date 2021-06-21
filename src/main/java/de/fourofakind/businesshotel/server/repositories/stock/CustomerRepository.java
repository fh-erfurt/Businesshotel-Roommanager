package de.fourofakind.businesshotel.server.repositories.stock;


import de.fourofakind.businesshotel.server.entities.customers.Customer;
import de.fourofakind.businesshotel.server.repositories.custom.CustomerRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "customer", path="customer")
public interface CustomerRepository extends JpaRepository<Customer,Integer>, CustomerRepositoryCustom
{

}
