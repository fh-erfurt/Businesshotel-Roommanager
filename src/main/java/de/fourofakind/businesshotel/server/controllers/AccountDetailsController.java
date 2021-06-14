package de.fourofakind.businesshotel.server.controllers;

import de.fourofakind.businesshotel.server.repositories.AccountDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Transactional
@RequestMapping("/accountdetails")
public class AccountDetailsController
{

    private final AccountDetailsRepository accountDetailsRepository;

    @Autowired
    public AccountDetailsController (AccountDetailsRepository accountDetailsRepository)
    {
        this.accountDetailsRepository=accountDetailsRepository;
    }
}
