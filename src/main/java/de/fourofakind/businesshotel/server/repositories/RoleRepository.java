package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.common.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * <p>Represents the roles within the roommanager. There are roles for specialized manager like roommanager. The roles are used
 * to determine what an employee is allowed to see, add, edit and delete within the system. Some roles like the "Hotelleiter" has
 * the right to see, add, edit and delete on every management-area provided by the system.</p>
 */
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "role", path = "role")
public interface RoleRepository extends JpaRepository<Role, String>
{

}
