package de.fourofakind.businesshotel.server.entities.customers;

import de.fourofakind.businesshotel.server.entities.rooms.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * class to store the requierements of a booking that will be stored in an ArrayList for processing by employee
 */
@Entity(name="BookingRequest")
@Table(name="booking_request")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class BookingRequest {

    //Attributes
    @Id
    @GeneratedValue
    private Integer bookingRequestID;
    private Integer customerID;
    private Date startDate;
    private Date endDate;
    private Room.Category roomCategory;
    private String specialWishes;
    private boolean isBusinessCustomer;

    //Constructor
    public BookingRequest (Integer customerID, Date startDate, Date endDate, Room.Category roomCategory, String specialWishes, boolean isBusinessCustomer) {}

    //Setter/Getter
    //managed by Lombok
}