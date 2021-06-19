package de.fourofakind.businesshotel.server.entities.bookings;


import de.fourofakind.businesshotel.server.entities.customers.Customer;
import de.fourofakind.businesshotel.server.entities.employees.Employee;
import de.fourofakind.businesshotel.server.entities.rooms.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * <p>This is our main class - Every action that is made from an employee or customer will interact with this class.
 * All information about the Bookingdetails and the Booking itself interacts with this class to. For Java1 only the Employee will be able to alter the
 * information of a booking</p>
 */



@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity(name="booking")
@Table(name="booking")
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="booking_type",discriminatorType=DiscriminatorType.STRING)
public abstract class Booking {

    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="booking_no")
    private Integer bookingNo;
    private Integer roomNo;
    private float pricing;
    @Column(name="emp_no")
    private Integer empNo;
    private Date startDate;
    private Date endDate;
    private String bookingDate;
    private String roomCategory;
    private String specialWishes;
    @Column(name="customer_id")
    private Integer customerID;
    @Column(name="is_business_customer")
    private boolean isBusinessCustomer;

    //Mapping
    @ManyToOne(optional = false)
    @JoinColumn(name="customer_id",referencedColumnName = "customer_id")
    private Customer customer;
    @ManyToOne(optional = false)
    @JoinColumn(name="emp_no", insertable = false,updatable = false)
    private Employee employee;


    //Fields
    public enum BookingType
    {
        ConferenceRoomBooking,
        HotelRoomBooking,
    }

    /**
     * <p>
     * The Booking class is an abstract class because it is the blueprint for the Conference- and the HotelroomBooking which are the different types
     * of rooms. Maybe later there will be even other types of what you can make a booking of, in this case we will have to add a enum to BookingType
     * and a class to this new Booking only.
     * </p>
     */

    //Constructors

    public Booking(int bookingNo, int customerID ,int roomNo, Date startDate, Date endDate, Room.Category roomCategory,
                   String specialWishes, int empNo, boolean isBusinessCustomer) {
        DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime currentDateTime = LocalDateTime.now();
        this.bookingNo = bookingNo;
        this.customerID = customerID;
        this.roomNo = roomNo;
        this.startDate = startDate;
        this.endDate = endDate;
        this.bookingDate = dateTimeFormat.format(currentDateTime);
        this.roomCategory = roomCategory.toString();
        this.specialWishes = specialWishes;
        this.empNo = empNo;
        this.isBusinessCustomer = isBusinessCustomer;
    }

    //Getter/Setter
    //managed by Lombok

}
