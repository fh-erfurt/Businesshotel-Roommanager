package de.fourofakind.businesshotel;

//
public class Customer {

    public void setCustomerID(Integer customerID) {
        this.customerID = customerID;
    }

    public void setContactDetails(ContactDetails contactDetails) {
        this.contactDetails = contactDetails;
    }

    public void setPaymentMethod(PaymentDetails paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    private int customerID;

    private ContactDetails contactDetails;

    private PaymentDetails paymentMethod;


}