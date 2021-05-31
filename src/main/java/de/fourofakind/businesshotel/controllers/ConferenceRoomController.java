package de.fourofakind.businesshotel.controllers;

import de.fourofakind.businesshotel.repositories.ConferenceRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Transactional
@RequestMapping("/room")
public class ConferenceRoomController
{

    private final ConferenceRoomRepository conferenceRoomRepository;

    @Autowired
    public ConferenceRoomController (ConferenceRoomRepository conferenceRoomRepository)
    {
        this.conferenceRoomRepository=conferenceRoomRepository;
    }
}
