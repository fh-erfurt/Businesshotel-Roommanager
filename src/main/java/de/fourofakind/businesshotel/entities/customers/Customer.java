package de.fourofakind.businesshotel.entities.customers;

import de.fourofakind.businesshotel.entities.rooms.Room;
import de.fourofakind.businesshotel.repositories.BookingRequestRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.util.Date;

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

    public enum paymentMethods
    {
        debit, paypal, bill
    }

    public Customer (int customerID, Integer contactDataID, paymentMethods paymentMethod)
    {

        this.customerID = customerID;
        this.contactDataID = contactDataID;
        this.paymentMethod = paymentMethod;
    }

    public int getCustomerID ()
    {
        return this.customerID;
    }

    public paymentMethods getPaymentMethod ()
    {
        return this.paymentMethod;
    }

    public void setCustomerID (Integer customerID)
    {
        this.customerID = customerID;
    }

    /**
     * <p> generates new bookingRequest and add ist to BookingRequests list
     * </p>
     *
     * @param startDate for start of booking
     * @param endDate for end of booking
     * @param roomCategory for type of booking
     * @param specialWishes for extra wishes
     */

//    public void sendBookingRequest (Date startDate, Date endDate, Room.Category roomCategory,
//                                    String specialWishes)
//    {
//        //setup database request here
//        BookingRequest newRequest = new BookingRequest(this.customerID, startDate, endDate, roomCategory, specialWishes, this.isBusinessCustomer);
//        BookingRequestRepository.save(newRequest);
//    }


    public void setPaymentMethod (String paymentMethod)
    {
        switch(paymentMethod) {
            case "debit":
                this.paymentMethod = paymentMethods.debit;
            case "paypal":
                this.paymentMethod = paymentMethods.paypal;
            case "bill":
                this.paymentMethod = paymentMethods.bill;

        }

    }


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer customerID;
    private Integer contactDataID;
    private paymentMethods paymentMethod;
    private boolean isBusinessCustomer;


}
