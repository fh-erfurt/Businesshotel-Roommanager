package de.fourofakind.businesshotel.server.repositories;


import de.fourofakind.businesshotel.server.entities.common.AccountDetails;
import de.fourofakind.businesshotel.server.entities.customers.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "customer", path="customer")
public interface CustomerRepository extends JpaRepository<Customer,Integer>
{

    List<Customer> findByContactData_FirstNameAndContactData_LastName (@Param("firstName") String firstName,@Param("lastName") String lastName); //-> liefert Liste von Customers, die erst auseinadner gebaut werden muss
    Customer findFirstByContactData_FirstNameAndContactData_LastName (@Param("firstName") String firstName,@Param("lastName") String lastName); //->liefert Koji Kondo inklusive einiger Daten
    Customer findCustomerByAccountID (@Param("account_id") Integer account_id);

}
