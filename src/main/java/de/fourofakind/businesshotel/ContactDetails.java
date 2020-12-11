package de.fourofakind.businesshotel;

//
public class ContactDetails {

    enum contactDetails {
        firstName, lastName, address, phoneNumber, mailAddress, iban
    }

    public ContactDetails(String firstName, String lastName, String streetName, String streetNumber, String postalCode, String cityName, String mailAddress) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.postalCode = postalCode;
        this.cityName = cityName;
        this.mailAddress = mailAddress;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setStreetName(String address) {
        this.streetName = address;
    }
    public void setStreetNumber(String address) {
        this.streetNumber = address;
    }
    public void setPostalCode(String address) {
        this.postalCode = address;
    }
    public void setCityName(String address) {
        this.cityName = address;
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

    public String getStreetName() {
        return streetName;
    }
    public String getStreetNumber() {
        return streetNumber;
    }
    public String getPostalCode() {
        return postalCode;
    }
    public String getCityName() {
        return cityName;
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
    private String streetName;
    private String streetNumber;
    private String postalCode;
    private String cityName;
    private String phoneNumber;
    private String mailAddress;
    private String iban ;
}
