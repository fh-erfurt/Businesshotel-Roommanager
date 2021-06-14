package de.fourofakind.businesshotel.server.controllers.errors;

public class BookingNotFoundException extends RuntimeException
{
    public BookingNotFoundException (String message)
    {
        super(message);
    };

}
