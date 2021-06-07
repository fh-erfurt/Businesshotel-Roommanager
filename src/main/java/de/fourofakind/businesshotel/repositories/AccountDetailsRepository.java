package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.entities.common.AccountDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "accountdetails", path="accountdetails")
@Repository
public interface AccountDetailsRepository  extends JpaRepository<AccountDetails,Integer>
{}
