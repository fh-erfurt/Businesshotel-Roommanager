package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.common.AccountDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "accountdetails", path="accountdetails")
public interface AccountDetailsRepository  extends JpaRepository<AccountDetails,Integer>
{}
