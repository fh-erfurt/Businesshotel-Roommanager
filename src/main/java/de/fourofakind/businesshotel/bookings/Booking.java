package de.fourofakind.businesshotel.bookings;

import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;
import de.fourofakind.businesshotel.rooms.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
/**
 * <p>This is our main class - Every action that is made from an employee or customer will interact with this class.
 * All information about the Bookingdetails and the Booking itself interacts with this class to. For Java1 only the Employee will be able to alter the
 * information of a booking</p>
 */

@Entity(name="Booking")
@Table(name="booking")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public abstract class Booking {

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

    public Booking(int bookingNo, int customerID ,int roomNo, TimeFrame timeFrame, DateFrame dateFrame, Room.Category roomCategory,
                   String specialWishes, int empNo, boolean isBusinessCustomer) {
        DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime currentDateTime = LocalDateTime.now();
        this.bookingNo = bookingNo;
        this.customerID = customerID;
        this.roomNo = roomNo;
        this.timeFrame = timeFrame;
        this.dateFrame = dateFrame;
        this.bookingDate = dateTimeFormat.format(currentDateTime);
        this.roomCategory = roomCategory;
        this.specialWishes = specialWishes;
        this.empNo = empNo;
        this.isBusinessCustomer = isBusinessCustomer;
    }

    //Getter/Setter
    public TimeFrame getTimeFrame()
    {
        return timeFrame;
    }
    public void setTimeFrame(TimeFrame timeFrame) {
        this.timeFrame = timeFrame;
    }
    public String getBookingDate() {
        return bookingDate;
    }
    public Room.Category getRoomCategory() {
        return roomCategory;
    }
    public String getSpecialWishes() {
        return specialWishes;
    }
    public float getPricing() {
        return pricing;
    }
    public int getEmpNo() {
        return empNo;
    }
    public boolean isBusinessCustomer() {
        return this.isBusinessCustomer;
    }
    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }
    public void setSpecialWishes(String specialWishes) {
        this.specialWishes = specialWishes;
    }
    public void setEmpNo(int empNo) {
        this.empNo = empNo;
    }
    public void setBusinessCustomer(boolean businessCustomer) {
        isBusinessCustomer = businessCustomer;
    }
    public DateFrame getDateFrame() {
        return dateFrame;
    }
    public void setDateFrame(DateFrame dateFrame) {
        this.dateFrame = dateFrame;
    }
    public int getBookingNo() {
        return bookingNo;
    }
    public void setBookingNo(int bookingNo) {
        this.bookingNo = bookingNo;
    }
    public int getRoomNo() {
        return roomNo;
    }
    public void setRoomNo(int roomNo) {
        this.roomNo = roomNo;
    }
    public String getChangeDate ()
    {
        return changeDate;
    }
    public void setChangeDate (String changeDate)
    {
        this.changeDate = changeDate;
    }
    public int getCustomerID ()
    {
        return customerID;
    }
    public void setCustomerID (int customerID)
    {
        this.customerID = customerID;
    }

    //Attributes
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer bookingNo;

    private int roomNo;
    private float pricing;
    private int empNo;
    private DateFrame dateFrame;
    private TimeFrame timeFrame;
    private String bookingDate;
    private final Room.Category roomCategory;
    private String specialWishes;
    private int customerID;
    private String changeDate;
    private boolean isBusinessCustomer;
}
