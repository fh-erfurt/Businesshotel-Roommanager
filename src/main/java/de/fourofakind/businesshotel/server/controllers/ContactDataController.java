package de.fourofakind.businesshotel.server.controllers;

import de.fourofakind.businesshotel.server.repositories.ContactDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Transactional
@RequestMapping("/contactdata")
public class ContactDataController
{

    private final ContactDataRepository contactDataRepository;

    @Autowired
    public ContactDataController(ContactDataRepository contactDataRepository)
    {
        this.contactDataRepository=contactDataRepository;
    }
}
