package de.fourofakind.businesshotel.controllers;

import de.fourofakind.businesshotel.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
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
