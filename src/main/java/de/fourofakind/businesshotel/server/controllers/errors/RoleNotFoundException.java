package de.fourofakind.businesshotel.server.controllers.errors;

public class RoleNotFoundException extends RuntimeException
{
    public RoleNotFoundException (String message)
    {
        super(message);
    };

}
