package de.fourofakind.businesshotel.server.controllers.errors;

public class BookingRequestNotFoundException extends RuntimeException
{
    public BookingRequestNotFoundException (String message)
    {
        super(message);
    };

}
