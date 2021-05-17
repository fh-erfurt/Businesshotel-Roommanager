package de.fourofakind.businesshotel.storages;

import de.fourofakind.businesshotel.employees.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee,Integer>
{}
