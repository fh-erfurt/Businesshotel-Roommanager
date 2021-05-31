package de.fourofakind.businesshotel.controllers;


import de.fourofakind.businesshotel.repositories.BookingRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Transactional
@RequestMapping("/booking")
public class BookingRequestController
{
    private final BookingRequestRepository bookingRequestRepository;

    @Autowired
    public BookingRequestController (BookingRequestRepository bookingRequestRepository)
    {
        this.bookingRequestRepository=bookingRequestRepository;
    }
}
