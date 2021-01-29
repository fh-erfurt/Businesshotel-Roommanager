package de.fourofakind.businesshotel.common;

/**
 * <p>This class implements an early version of a right management system. Currently there are 4 roles an actor of the system can inherit- three of which inherit one right each and the fourth
 * inheriting all rights, e.g. for administritative reasons. There will be more role models later which should be given by special personal.</p>
 */
public class Role
{
    public Role (boolean isEnabledToManageRooms, boolean isEnabledToManageBookings, boolean isEnabledToManageCustomerData)
    {
        this.isEnabledToManageRooms = isEnabledToManageRooms;
        this.isEnabledToManageBookings = isEnabledToManageBookings;
        this.isEnabledToManageCustomerData = isEnabledToManageCustomerData;
    }

    public boolean isEnabledToManageRooms ()
    {
        return isEnabledToManageRooms;
    }

    public boolean isEnabledToManageBookings ()
    {
        return isEnabledToManageBookings;
    }

    public boolean isEnabledToManageCustomerData ()
    {
        return isEnabledToManageCustomerData;
    }



    private final boolean isEnabledToManageRooms;
    private final boolean isEnabledToManageBookings;
    private final boolean isEnabledToManageCustomerData;
}
