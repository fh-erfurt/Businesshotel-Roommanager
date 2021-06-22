package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.common.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "role", path="role")
public interface RoleRepository extends JpaRepository<Role,String>
{

}
