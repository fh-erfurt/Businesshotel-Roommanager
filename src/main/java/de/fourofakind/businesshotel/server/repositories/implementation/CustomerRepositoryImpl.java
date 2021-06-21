package de.fourofakind.businesshotel.server.repositories.implementation;

import de.fourofakind.businesshotel.server.entities.customers.Customer;
import de.fourofakind.businesshotel.server.repositories.custom.CustomerRepositoryCustom;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class CustomerRepositoryImpl implements CustomerRepositoryCustom
{
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Customer> findByFirstNameAndLastName (String firstName, String lastName)
    {
        Query query= entityManager.createNativeQuery("Select cd.*, c.payment_method, c.is_business_customer FROM customer c join contact_data cd on c.contact_data_id = cd.contact_data_id where cd.first_name =?" + "and cd.last_name=?",Customer.class);
        query.setParameter(1,firstName);
        query.setParameter(2,lastName);

        return query.getResultList();
    };
}
