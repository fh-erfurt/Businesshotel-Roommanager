package de.fourofakind.businesshotel.server.controllers;

import de.fourofakind.businesshotel.server.repositories.HotelRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@Transactional
@RequestMapping("/room")
public class HotelRoomController
{

    private final HotelRoomRepository hotelroomRepository;

    @Autowired
    public HotelRoomController (HotelRoomRepository hotelroomRepository)
    {
        this.hotelroomRepository=hotelroomRepository;
    }
}
