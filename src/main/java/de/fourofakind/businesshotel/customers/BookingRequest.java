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

    private int customerID;
    private TimeFrame timeFrame;
    private DateFrame dateFrame;
    private String roomCategory;
    private String specialWishes;
    private Booking.IsBusinessCustomer isBusinessCustomer;
}