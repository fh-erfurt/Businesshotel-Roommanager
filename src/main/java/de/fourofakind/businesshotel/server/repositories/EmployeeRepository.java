package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.employees.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
/**
 * <p>This repository holds information on the employee. The name is stored here, and more important the given-role of the employee.
 * The role defines what information within the roommanager-program the employee is allowed to see and edit.
 * The referenced account-id is also represented within this repository.
 * </p>
 */

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "employee", path="employee")
public interface EmployeeRepository extends JpaRepository<Employee,Integer>
{
    Employee findEmployeeByEmpNo (@Param("empno") Integer empNo);
    Employee findEmployeeByAccountID (@Param("account_id") Integer empNo);
}