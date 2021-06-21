package de.fourofakind.businesshotel.server.repositories.custom;

import de.fourofakind.businesshotel.server.entities.customers.Customer;

import java.util.List;


public interface CustomerRepositoryCustom
{
    List<Customer> findByFirstNameAndLastName (String firstName, String lastName);
}
