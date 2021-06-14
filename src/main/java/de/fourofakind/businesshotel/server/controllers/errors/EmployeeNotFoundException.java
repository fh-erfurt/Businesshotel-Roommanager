package de.fourofakind.businesshotel.server.controllers.errors;

public class EmployeeNotFoundException extends RuntimeException
{
    public EmployeeNotFoundException (String message)
    {
        super(message);
    };

}
