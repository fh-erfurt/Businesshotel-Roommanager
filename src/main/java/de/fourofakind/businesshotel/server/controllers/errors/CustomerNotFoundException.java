package de.fourofakind.businesshotel.server.controllers.errors;

public class CustomerNotFoundException extends RuntimeException
{
    public CustomerNotFoundException (String message)
    {
        super(message);
    };

}
