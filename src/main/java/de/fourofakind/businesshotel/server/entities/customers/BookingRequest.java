package de.fourofakind.businesshotel.server.entities.customers;

import de.fourofakind.businesshotel.server.entities.rooms.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

/**
 * class to store the requierements of a booking that will be stored in an ArrayList for processing by employee
 */
@Entity(name = "BookingRequest")
@Table(name = "booking_request")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class BookingRequest
{

    //Attributes
    @Id
    @GeneratedValue
    @Column(name = "booking_request_id")
    private Integer bookingRequestID;
    @Column(name = "customer_id")
    private Integer customerID;
    private Date startDate;
    private Date endDate;
    @Enumerated(EnumType.STRING)
    @Column(name = "booking_type")
    private BookingType bookingtype;
    @Enumerated(EnumType.STRING)
    private Room.Category roomCategory;
    private String specialWishes;

    //Mappings
    @ManyToOne(optional = false)
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    private Customer customer;


    public BookingRequest (Integer customerID, Date startDate, Date endDate, Room.Category roomCategory, String specialWishes)
    {
        this.customerID = customerID;
        this.startDate = startDate;
        this.endDate = endDate;
        this.roomCategory = roomCategory;
        this.specialWishes = specialWishes;
    }

    //Constructor

    //Fields
    public enum BookingType
    {
        ConferenceRoomBooking, HotelRoomBooking,
    }


    //Setter/Getter
    //managed by Lombok
}