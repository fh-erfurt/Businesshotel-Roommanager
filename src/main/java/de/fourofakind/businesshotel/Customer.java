package de.fourofakind.businesshotel;

import static de.fourofakind.businesshotel.StartingClass.*;

/**
 * customer class manages every methode done by the customer and its personal data
 */

public class Customer
{

    enum paymentMethods
    {
        debit, paypal, bill
    }

    public Customer (int customerID, ContactDetails contactDetails, paymentMethods paymentMethod)
    {
        this.customerID = customerID;
        this.contactDetails = contactDetails;
        changePaymentMethod(paymentMethod);
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
     * <p> generates new bookingRequest and add ist to bookingRequests list
     * </p>
     *
     * @param dateFrame for date of booking
     */

    public void sendBookingRequest (DateFrame dateFrame)
    {
        // setup database request here
        int customerID = this.customerID;
        BookingRequest newRequest = new BookingRequest(customerID, dateFrame);
        bookingRequests.add(newRequest);
    }

    public void changePaymentMethod (paymentMethods paymentMethod)
    {
        this.paymentMethod = paymentMethod;
    }


    private int customerID;
    protected ContactDetails contactDetails;
    private paymentMethods paymentMethod;


}
