package de.fourofakind.businesshotel.common;

import de.fourofakind.businesshotel.bookings.Booking;
import de.fourofakind.businesshotel.customers.BookingRequest;
import de.fourofakind.businesshotel.customers.Customer;
import de.fourofakind.businesshotel.employees.Employee;
import de.fourofakind.businesshotel.rooms.Room;

import java.util.ArrayList;


/**
 * A class acting as the shared storage of the projet for now, will be exchanged with an external database later in Java2
 */
public class StartingClass
{

    //"Storages"
    public static ArrayList<Booking> Bookings = new ArrayList<>();
    public static ArrayList<Room> Rooms = new ArrayList<>();
    public static ArrayList<Employee> Employees = new ArrayList<>();
    public static ArrayList<BookingRequest> BookingRequests = new ArrayList<>();
    public static ArrayList<Customer> Customers = new ArrayList<>();
    public static ArrayList<BookingRequest> DeclinedBookingRequests = new ArrayList<>();

    //Define Roles
    public static Role GodLikeAdmin = new Role(true,true,true); // for later admin-like rights
    public static Role RoomAdministrator = new Role(true,false,false);
    public static Role BookingsManager = new Role(false,true,false);
    public static Role CustomerRelationshipManager = new Role(false,false,true);

}
