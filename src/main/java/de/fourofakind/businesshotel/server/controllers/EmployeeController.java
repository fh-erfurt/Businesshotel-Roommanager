package de.fourofakind.businesshotel.server.controllers;

import de.fourofakind.businesshotel.server.controllers.errors.EmployeeNotFoundException;
import de.fourofakind.businesshotel.server.entities.employees.Employee;
import de.fourofakind.businesshotel.server.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Transactional
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/employee")
public class EmployeeController
{

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeController(EmployeeRepository employeeRepository)
    {
        this.employeeRepository=employeeRepository;
    }

    @GetMapping(path="/all")
    ResponseEntity<List<Employee>> findAll()
    {
        return ResponseEntity.ok(this.employeeRepository.findAll());
    }

    @GetMapping(path="/{id}")
    ResponseEntity<Employee> findById (@PathVariable(value="id") Integer empNo)
    {
        return ResponseEntity.ok(this.employeeRepository.findById(empNo).orElseThrow(()->new EmployeeNotFoundException("No Employee with empNo "+empNo+" found")));
    }
}
