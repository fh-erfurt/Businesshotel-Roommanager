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

    public ContactData getContactData() {
        return this.contactData;
    }

    public void setPaymentMethod (paymentMethods paymentMethod)
    {
        this.paymentMethod = paymentMethod;
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


}
