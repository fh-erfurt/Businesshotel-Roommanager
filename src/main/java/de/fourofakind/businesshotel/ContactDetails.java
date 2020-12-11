package de.fourofakind.businesshotel;

//
public class ContactDetails {

    enum contactDetails {
        firstName, lastName, address, phoneNumber, mailAddress, iban
    }

    public ContactDetails(String firstName, String lastName, String address, String mailAddress) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.mailAddress = mailAddress;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setMailAddress(String mailAddress) {
        this.mailAddress = mailAddress;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getAddress() {
        return address;
    }

    public String getMailAddress() {
        return mailAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getIban() {
        return iban;
    }

    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private String mailAddress;
    private String iban ;
}
