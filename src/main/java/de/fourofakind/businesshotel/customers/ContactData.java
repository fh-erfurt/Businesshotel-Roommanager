package de.fourofakind.businesshotel.customers;

//

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * object to store personal data of customer
 */

@Entity
public class ContactData {

//    public enum attributes
//    {
//        firstName, lastName, streetName, streetNumber, postalCode, cityName, mailAddress
//    }

    public ContactData(String firstName, String lastName, String streetName, String streetNumber, String postalCode, String cityName, String mailAddress)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.postalCode = postalCode;
        this.cityName = cityName;
        this.mailAddress = mailAddress;
    }

    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }

    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }

    public void setStreetName(String address)
    {
        this.streetName = address;
    }
    public void setStreetNumber(String address)
    {
        this.streetNumber = address;
    }
    public void setPostalCode(String address)
    {
        this.postalCode = address;
    }
    public void setCityName(String address)
    {
        this.cityName = address;
    }

    public void setMailAddress(String mailAddress)
    {
        this.mailAddress = mailAddress;
    }

    public void setPhoneNumber(String phoneNumber)
    {
        this.phoneNumber = phoneNumber;
    }

    public void setPaymentCredentials (String paymentCredentials)
    {
        this.paymentCredentials = paymentCredentials;
    }

    public String getFirstName()
    {
        return firstName;
    }

    public String getLastName()
    {
        return lastName;
    }

    public String getStreetName()
    {
        return streetName;
    }
    public String getStreetNumber()
    {
        return streetNumber;
    }
    public String getPostalCode()
    {
        return postalCode;
    }
    public String getCityName()
    {
        return cityName;
    }

    public String getEmailAddress ()
    {
        return mailAddress;
    }

    public String getPhoneNumber()
    {
        return phoneNumber;
    }

    public String getPaymentCredentials ()
    {
        return paymentCredentials;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer contactDataId;
    private String firstName;
    private String lastName;
    private String streetName;
    private String streetNumber;
    private String postalCode;
    private String cityName;
    private String phoneNumber;
    private String mailAddress;
    private String paymentCredentials;
}
