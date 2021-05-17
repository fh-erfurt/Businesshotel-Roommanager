package de.fourofakind.businesshotel.customers;

import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;
import de.fourofakind.businesshotel.rooms.Room;

/**
 * class to store the requierements of a booking that will be stored in an ArrayList for processing by employee
 */

public class BookingRequest {

    public BookingRequest (int customerID, TimeFrame timeFrame, DateFrame dateFrame, Room.Category roomCategory,
                           String specialWishes, boolean isBusinessCustomer) {
        this.customerID = customerID;
        this.timeFrame = timeFrame;
        this.dateFrame = dateFrame;
        this.roomCategory = roomCategory;
        this.specialWishes = specialWishes;
        this.isBusinessCustomer = isBusinessCustomer;
    }

    public int getCustomerID ()
    {
        return customerID;
    }

    public void setCustomerID (int customerID)
    {
        this.customerID = customerID;
    }

    public TimeFrame getTimeFrame ()
    {
        return timeFrame;
    }

    public void setTimeFrame (TimeFrame timeFrame)
    {
        this.timeFrame = timeFrame;
    }

    public DateFrame getDateFrame ()
    {
        return dateFrame;
    }

    public void setDateFrame (DateFrame dateFrame)
    {
        this.dateFrame = dateFrame;
    }

    public Room.Category getRoomCategory ()
    {
        return roomCategory;
    }

    public void setRoomCategory (Room.Category roomCategory)
    {
        this.roomCategory = roomCategory;
    }

    public String getSpecialWishes ()
    {
        return specialWishes;
    }

    public void setSpecialWishes (String specialWishes)
    {
        this.specialWishes = specialWishes;
    }

    public boolean getIsBusinessCustomer ()
    {
        return isBusinessCustomer;
    }

    public void setIsBusinessCustomer (boolean isBusinessCustomer)
    {
        this.isBusinessCustomer = isBusinessCustomer;
    }

    private Integer customerID;
    private TimeFrame timeFrame;
    private DateFrame dateFrame;
    private Room.Category roomCategory;
    private String specialWishes;
    private boolean isBusinessCustomer;
}