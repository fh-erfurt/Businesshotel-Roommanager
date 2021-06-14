package de.fourofakind.businesshotel.server.controllers;

import de.fourofakind.businesshotel.server.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Transactional
@RequestMapping("/customer")
public class CustomerController
{

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerController(CustomerRepository customerRepository)
    {
        this.customerRepository=customerRepository;
    }
}
