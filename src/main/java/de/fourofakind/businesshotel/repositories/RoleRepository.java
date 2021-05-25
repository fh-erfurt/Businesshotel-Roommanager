package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.common.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,String>
{

}
