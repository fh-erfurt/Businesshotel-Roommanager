package de.fourofakind.businesshotel.storages;

import de.fourofakind.businesshotel.customers.ContactData;
import org.springframework.data.repository.CrudRepository;

public interface ContactDataRepository extends CrudRepository<ContactData,Integer>
{}
