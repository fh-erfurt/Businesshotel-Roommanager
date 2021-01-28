package de.fourofakind.businesshotel;

import de.fourofakind.businesshotel.bookings.Booking;
import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;
import de.fourofakind.businesshotel.customers.BookingRequest;
import de.fourofakind.businesshotel.customers.Customer;
import de.fourofakind.businesshotel.employees.Employee;
import de.fourofakind.businesshotel.rooms.Room;
import org.junit.jupiter.api.Test;

import static de.fourofakind.businesshotel.common.StartingClass.*;

/**
 * <p>Test Class to test all of the Customer's abilities</p>
 */
public class CustomerTestClass
{

    /**
     * <p>Test of an Customer's ability to send a booking request, wich will be saved in bookingRequests ArrayList</p>
     */
    @Test
    void sendBookingRequest() {

        Employee testEmployee = new Employee("Bill Gates", CustomerRelationshipManager);
        testEmployee.createCustomer("Tom", "Hanks", "Tom-Hanks-Street", "13", "19025", "Tom-Hanks-Haußen", "tomhengst@gmail.com", Customer.paymentMethods.paypal, "");

        Customer loadedCustomer = Customers.get(0);

        TimeFrame selectedTimeFrame = new TimeFrame("10.00", "16.30");
        DateFrame selectedDateFrame = new DateFrame("01.02.2021", "01.02.2021");
        Room.Category roomCategory = Room.Category.SINGLE;
        String specialWishes = "Schoko-Kirschkuchen";

        loadedCustomer.sendBookingRequest(selectedTimeFrame, selectedDateFrame, roomCategory, specialWishes);


        BookingRequest loadedBookingRequest = BookingRequests.get(0);

        System.out.println(loadedBookingRequest.getCustomerID());
        System.out.println(loadedBookingRequest.getTimeFrame().getStartTime());
        System.out.println(loadedBookingRequest.getTimeFrame().getEndTime());
        System.out.println(loadedBookingRequest.getDateFrame().getStartDate());
        System.out.println(loadedBookingRequest.getDateFrame().getEndDate());


        Room.Category loadedCategory = loadedBookingRequest.getRoomCategory();

        switch (loadedCategory)
        {
            case SINGLE:
                System.out.println("SINGLE");
                break;
            case DOUBLE:
                System.out.println("DOUBLE");
                break;
            case SUITE:
                System.out.println("SUITE");
                break;
            case BIGGROUP:
                System.out.println("BIGGROUP");
                break;
            case SMALLGROUP:
                System.out.println("SMALLGROUP");
                break;
        }

        System.out.println(loadedBookingRequest.getSpecialWishes());
    }

}
