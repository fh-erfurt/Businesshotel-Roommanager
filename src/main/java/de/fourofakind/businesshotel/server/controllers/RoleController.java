package de.fourofakind.businesshotel.server.controllers;

import de.fourofakind.businesshotel.server.controllers.errors.EmployeeNotFoundException;
import de.fourofakind.businesshotel.server.entities.employees.Employee;
import de.fourofakind.businesshotel.server.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Transactional
@RequestMapping("/role")
public class RoleController
{

    private final RoleRepository roleRepository;

    @Autowired
    public RoleController(RoleRepository roleRepository)
    {
        this.roleRepository=roleRepository;
    }





}
