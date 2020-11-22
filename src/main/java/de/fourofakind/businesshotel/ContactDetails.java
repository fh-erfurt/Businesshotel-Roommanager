package de.fourofakind.businesshotel;

public class ContactDetails {

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setMailAddress(String mailAddress) {
        this.mailAddress = mailAddress;
    }

    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private String mailAddress;
}
