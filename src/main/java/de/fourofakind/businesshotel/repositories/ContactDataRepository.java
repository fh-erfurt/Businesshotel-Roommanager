package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.customers.ContactData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactDataRepository extends JpaRepository<ContactData,Integer>
{

}
