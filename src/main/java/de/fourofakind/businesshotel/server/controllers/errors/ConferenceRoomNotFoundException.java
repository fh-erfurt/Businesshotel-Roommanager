package de.fourofakind.businesshotel.server.controllers.errors;

public class ConferenceRoomNotFoundException extends RuntimeException
{
    public ConferenceRoomNotFoundException (String message)
    {
        super(message);
    };

}
