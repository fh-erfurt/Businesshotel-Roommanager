package de.fourofakind.businesshotel.customers;

import de.fourofakind.businesshotel.common.DateFrame;

public class BookingRequest {

    public BookingRequest (int customerID, DateFrame dateFrame) {
        this.customerID = customerID;
        this.dateFrame = dateFrame;
    }

    private int customerID;
    private DateFrame dateFrame;
}