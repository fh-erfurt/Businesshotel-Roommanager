package de.fourofakind.businesshotel.server.controllers.errors;

public class ContactDataNotFoundException extends RuntimeException
{
    public ContactDataNotFoundException (String message)
    {
        super(message);
    };

}
