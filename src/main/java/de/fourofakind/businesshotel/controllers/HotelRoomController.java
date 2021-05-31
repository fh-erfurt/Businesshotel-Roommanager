package de.fourofakind.businesshotel.controllers;

import de.fourofakind.businesshotel.repositories.HotelRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
