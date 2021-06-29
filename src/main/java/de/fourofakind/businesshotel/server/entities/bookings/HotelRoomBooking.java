package de.fourofakind.businesshotel.server.entities.bookings;

import de.fourofakind.businesshotel.server.entities.customers.Customer;
import de.fourofakind.businesshotel.server.entities.employees.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.time.temporal.ChronoUnit;
import java.util.Locale;
import java.util.Date;


/**
 * This class extends the Booking to the kind of room that has been booked, in this case to a Hotelroom.
 */

@Entity(name="HotelRoomBooking")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@DiscriminatorValue("HotelRoomBooking")
public class HotelRoomBooking extends Booking
{
    //Attributes
    private float pricing;


    //Constructor

    public HotelRoomBooking (Integer bookingNo, Integer roomNo, float pricing, Integer empNo, Date startDate, Date endDate, String specialWishes, Integer customerID, Customer customer,
                             Employee employee)
    {
        super(bookingNo, roomNo, pricing, empNo, startDate, endDate, specialWishes, customerID, customer, employee);
    }

    //Getter/Setter
    //managed by Lombok

}
