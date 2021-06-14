package de.fourofakind.businesshotel.server.controllers.errors;

public class AccountDetailsNotFoundException extends RuntimeException
{
    public AccountDetailsNotFoundException (String message)
    {
        super(message);
    };

}
