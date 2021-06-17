package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.employees.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "employee", path="employee")
@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Integer>
{

}
