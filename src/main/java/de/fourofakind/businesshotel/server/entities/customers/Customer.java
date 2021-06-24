package de.fourofakind.businesshotel.server.entities.customers;

import de.fourofakind.businesshotel.server.entities.bookings.Booking;
import de.fourofakind.businesshotel.server.entities.common.AccountDetails;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.util.List;

/**
 * customer class manages every methode done by the customer and its personal data
 */

@Entity(name="Customer")
@Table(name="customer")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Customer
{

    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="customer_id")
    private Integer customerID;
    @Column(name="contact_data_id")
    private Integer contactDataID;
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
    @Column(name="is_business_customer")
    private boolean isBusinessCustomer;
    private Integer account_id;

    //Fields
    public enum PaymentMethod
    {
        debit, paypal, bill
    }


    //Mappings
    @OneToOne
    @JoinColumn(name="account_id",insertable = false,updatable = false)
    private AccountDetails accountDetails;
    @ManyToOne(optional = false)
    @JoinColumn(name="contact_data_id", insertable = false,updatable = false)
    private ContactData contactData;
    @OneToMany(mappedBy = "customer")
    private List<Booking> bookings;




    //Constructors
    public Customer (Integer contactDataID, PaymentMethod paymentMethod, boolean isBusinessCustomer, Integer account_id, AccountDetails accountDetails, ContactData contactData, List<Booking> bookings)
    {
        this.contactDataID = contactDataID;
        this.paymentMethod = paymentMethod;
        this.isBusinessCustomer = isBusinessCustomer;
        this.account_id = account_id;
        this.accountDetails = accountDetails;
        this.contactData = contactData;
        this.bookings = bookings;
    }

    //Setter/Getter
    //managed by Lombok


}
