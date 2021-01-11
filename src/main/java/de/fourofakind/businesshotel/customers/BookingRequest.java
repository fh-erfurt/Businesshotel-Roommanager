package de.fourofakind.businesshotel.customers;

import de.fourofakind.businesshotel.bookings.Booking;
import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;

public class BookingRequest {

    public BookingRequest (int customerID, TimeFrame timeFrame, DateFrame dateFrame, String roomCategory,
                           String specialWishes, Booking.IsBusinessCustomer isBusinessCustomer) {
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

    public String getRoomCategory ()
    {
        return roomCategory;
    }

    public void setRoomCategory (String roomCategory)
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

    public Booking.IsBusinessCustomer getIsBusinessCustomer ()
    {
        return isBusinessCustomer;
    }

    public void setIsBusinessCustomer (Booking.IsBusinessCustomer isBusinessCustomer)
    {
        this.isBusinessCustomer = isBusinessCustomer;
    }

    private int customerID;
    private TimeFrame timeFrame;
    private DateFrame dateFrame;
    private String roomCategory;
    private String specialWishes;
    private Booking.IsBusinessCustomer isBusinessCustomer;
}