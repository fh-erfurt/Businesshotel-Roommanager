package de.fourofakind.businesshotel.storages;

import de.fourofakind.businesshotel.customers.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer,Integer>
{}
