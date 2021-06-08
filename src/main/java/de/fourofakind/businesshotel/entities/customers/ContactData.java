package de.fourofakind.businesshotel.entities.customers;

//

import de.fourofakind.businesshotel.entities.employees.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * object to store personal data of customer
 */

@Entity(name="ContactData")
@Table(name="contact_data")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ContactData {

    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer contactDataID;
    private String firstName;
    private String lastName;
    private String streetName;
    private String streetNumber;
    private String postalCode;
    private String cityName;
    private String phoneNumber;
    private String mailAddress;
    private String paymentCredentials;

    //Mapping
    @OneToMany(mappedBy = "contactData")
    private List<Customer> customers;

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


}
