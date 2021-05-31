package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.common.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "role", path="role")
@Repository
public interface RoleRepository extends JpaRepository<Role,String>
{

}
