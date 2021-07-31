package de.fourofakind.businesshotel.server.entities.customers;

//

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="contact_data_id")
    private Integer contactDataID;
    private String firstName;
    private String lastName;
    private String streetName;
    private String streetNumber;
    private String postalCode;
    private String cityName;
    private String phone;
    private String mailAddress;
    private String paymentCredentials;

    //Mappings
    @OneToMany(mappedBy = "contactData")
    private List<Customer> customers;

    //Constructors
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

    //Setter/Getter
    //managed by Lombok


}
