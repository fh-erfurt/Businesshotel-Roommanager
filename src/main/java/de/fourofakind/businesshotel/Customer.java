package de.fourofakind.businesshotel;


public class Customer {

    enum paymentMethods {
        debit, paypal, bill
    }

    public Customer(int customerID, ContactDetails contactDetails, paymentMethods paymentMethod) {
        this.customerID = customerID;
        this.contactDetails = contactDetails;
        changePaymentMethod(paymentMethod);
    }

    public int              getCustomerID() {
        return this.customerID;
    }
    public paymentMethods   getPaymentMethod() {
        return paymentMethod;
    }

    public void             setCustomerID(Integer customerID) {
        this.customerID = customerID;
    }
    public void             sendBookingRequest(DateFrame dateFrame, int customerID) {

    }
    public void             changePaymentMethod(paymentMethods paymentMethod) {
        this.paymentMethod = paymentMethod;
    }


    private int             customerID;
    protected               ContactDetails contactDetails;
    private                 paymentMethods paymentMethod;


}
