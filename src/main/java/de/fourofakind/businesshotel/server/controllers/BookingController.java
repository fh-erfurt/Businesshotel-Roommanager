package de.fourofakind.businesshotel.server.controllers;

import de.fourofakind.businesshotel.server.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Transactional
@RequestMapping("/booking")
public class BookingController
{
    private final BookingRepository bookingRepository;

    @Autowired
    public BookingController(BookingRepository bookingRepository)
    {
        this.bookingRepository=bookingRepository;
    }
}
