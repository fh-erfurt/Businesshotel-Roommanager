package de.fourofakind.businesshotel.customers;

import de.fourofakind.businesshotel.bookings.Booking;
import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;

import static de.fourofakind.businesshotel.common.StartingClass.*;

/**
 * customer class manages every methode done by the customer and its personal data
 */

public class Customer
{

    public enum paymentMethods
    {
        debit, paypal, bill
    }

    public Customer (int customerID, ContactData contactData, paymentMethods paymentMethod)
    {

        this.customerID = customerID;
        this.contactData = contactData;
        this.paymentMethod = paymentMethod;
    }

    public int getCustomerID ()
    {
        return this.customerID;
    }

    public paymentMethods getPaymentMethod ()
    {
        return this.paymentMethod;
    }

    public void setCustomerID (Integer customerID)
    {
        this.customerID = customerID;
    }

    /**
     * <p> generates new bookingRequest and add ist to BookingRequests list
     * </p>
     *
     * @param timeFrame for time of booking
     * @param dateFrame for date of booking
     * @param roomCategory for type of booking
     * @param specialWishes for extra wishes
     */

    public void sendBookingRequest (TimeFrame timeFrame, DateFrame dateFrame, String roomCategory,
                                    String specialWishes)
    {
        // setup database request here
        BookingRequest newRequest = new BookingRequest(this.customerID, timeFrame, dateFrame, roomCategory, specialWishes, this.isBusinessCustomer);
        BookingRequests.add(newRequest);
    }

    public ContactData getContactData() {
        return this.contactData;
    }

    public void setPaymentMethod (paymentMethods paymentMethod)
    {
        this.paymentMethod = paymentMethod;
    }

    public void setIsBusinessCustomer(Booking.IsBusinessCustomer isBusinessCustomer) {
        this.isBusinessCustomer = isBusinessCustomer;
    }

    public void setPaymentMethod (String paymentMethod)
    {
        switch(paymentMethod) {
            case "debit":
                this.paymentMethod = paymentMethods.debit;
            case "paypal":
                this.paymentMethod = paymentMethods.paypal;
            case "bill":
                this.paymentMethod = paymentMethods.bill;

        }

    }


    private int customerID;
    private ContactData contactData;
    private paymentMethods paymentMethod;
    private Booking.IsBusinessCustomer isBusinessCustomer;


}
