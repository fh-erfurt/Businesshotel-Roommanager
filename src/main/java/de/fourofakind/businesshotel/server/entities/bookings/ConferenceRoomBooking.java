package de.fourofakind.businesshotel.server.entities.bookings;

import de.fourofakind.businesshotel.server.entities.customers.Customer;
import de.fourofakind.businesshotel.server.entities.employees.Employee;
import de.fourofakind.businesshotel.server.entities.rooms.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import java.util.Date;

/**
 * This class extends the Booking to the kind of room that has been booked, in this case to a conferenceRoom
 */

@Entity(name="ConferenceRoomBooking")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@DiscriminatorValue("ConferenceRoomBooking")
public class ConferenceRoomBooking extends Booking
{
    //Attributes
    private float pricing;

    //Constructor
    public ConferenceRoomBooking (Integer bookingNo, Integer roomNo, float pricing, Integer empNo, Date startDate, Date endDate, String specialWishes, Integer customerID, Customer customer,
                                  Employee employee)
    {
        super(bookingNo, roomNo, pricing, empNo, startDate, endDate, specialWishes, customerID, customer, employee);
    }

    //Setter/Getter
    //managed by Lombok



}
