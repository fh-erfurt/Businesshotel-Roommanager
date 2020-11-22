package de.fourofakind.businesshotel;

public class Customer {
    public static void main(String[] args) {
        System.out.println("lol");
    }

    public void setCustomerID(Integer customerID) {
        this.customerID = customerID;
    }

    public void setContactDetails(ContactDetails contactDetails) {
        this.contactDetails = contactDetails;
    }

    public void setPaymentMethod(PaymentDetails paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    private Integer customerID;

    private ContactDetails contactDetails;

    private PaymentDetails paymentMethod;


}
