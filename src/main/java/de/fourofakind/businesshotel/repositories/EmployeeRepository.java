package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.employees.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "employee", path="employee")
@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Integer>
{

}
