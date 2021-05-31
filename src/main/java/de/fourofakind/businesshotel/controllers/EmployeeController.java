package de.fourofakind.businesshotel.controllers;

import de.fourofakind.businesshotel.entities.employees.Employee;
import de.fourofakind.businesshotel.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Transactional
@RequestMapping("/employee")
public class EmployeeController
{
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeController(EmployeeRepository employeeRepository)
    {
        this.employeeRepository=employeeRepository;
    }

//    @GetMapping(path="/{id}")
//    ResponseEntity<Employee> findById(@PathVariable(value="id") Integer empNo)
//    {
//        return ResponseEntity.ok(this.employeeRepository.findById(empNo));
//    }
}
