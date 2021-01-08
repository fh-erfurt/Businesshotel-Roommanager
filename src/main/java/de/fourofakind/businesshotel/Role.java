package de.fourofakind.businesshotel;

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

    public void setEnabledToManageRooms (boolean enabledToManageRooms)
    {
        isEnabledToManageRooms = enabledToManageRooms;
    }

    public boolean isEnabledToManageBookings ()
    {
        return isEnabledToManageBookings;
    }

    public void setEnabledToManageBookings (boolean enabledToManageBookings)
    {
        isEnabledToManageBookings = enabledToManageBookings;
    }

    public boolean isEnabledToManageCustomerData ()
    {
        return isEnabledToManageCustomerData;
    }

    public void setEnabledToManageCustomerData (boolean enabledToManageCustomerData)
    {
        isEnabledToManageCustomerData = enabledToManageCustomerData;
    }

    private boolean isEnabledToManageRooms;
    private boolean isEnabledToManageBookings;
    private boolean isEnabledToManageCustomerData;
}
