package de.fourofakind.businesshotel;

//
public class PaymentDetails {

    public void setIBAN(String IBAN) {
        this.IBAN = IBAN;
    }

    public void setPaypal(Boolean paypal) {
        this.paypal = paypal;
    }

    public void setBill(Boolean bill) {
        this.bill = bill;
    }

    private String IBAN = "";
    private Boolean paypal = false;
    private Boolean bill = false;
}
