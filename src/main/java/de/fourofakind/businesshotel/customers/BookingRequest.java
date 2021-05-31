package de.fourofakind.businesshotel.customers;

import de.fourofakind.businesshotel.rooms.Room;

import java.util.Date;

/**
 * class to store the requierements of a booking that will be stored in an ArrayList for processing by employee
 */

public class BookingRequest {

    public BookingRequest (int customerID, Date startDate, Date endDate, Room.Category roomCategory,
                           String specialWishes, boolean isBusinessCustomer) {
        this.customerID = customerID;
        this.startDate = startDate;
        this.endDate = endDate;
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

    public Date getStartDate ()
    {
        return startDate;
    }

    public void setStartDate (Date startDate)
    {
        this.startDate = startDate;
    }

    public Date getEndDate ()
    {
        return endDate;
    }

    public void setEndDate (Date endDate)
    {
        this.endDate = endDate;
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

    private int customerID;
    private Date startDate;
    private Date endDate;
    private Room.Category roomCategory;
    private String specialWishes;
    private boolean isBusinessCustomer;
}