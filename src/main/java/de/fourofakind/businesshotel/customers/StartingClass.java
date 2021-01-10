package de.fourofakind.businesshotel.customers;

import de.fourofakind.businesshotel.bookings.Booking;
import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;
import de.fourofakind.businesshotel.customers.BookingRequest;
import de.fourofakind.businesshotel.customers.ContactData;
import de.fourofakind.businesshotel.customers.Customer;
import de.fourofakind.businesshotel.customers.Role;
import de.fourofakind.businesshotel.employees.Employee;
import de.fourofakind.businesshotel.rooms.Room;

import java.util.ArrayList;

public class StartingClass
{

    //"Storages"
    public static ArrayList<Booking> Bookings = new ArrayList<>();
    public static ArrayList<Room> Rooms = new ArrayList<>();
    public static ArrayList<Employee> Employees = new ArrayList<>();
    public static ArrayList<BookingRequest> BookingRequests = new ArrayList<>();
    public static ArrayList<Customer> Customers = new ArrayList<>();

    //Define Roles
    public static Role GodLikeAdmin = new Role(true,true,true);
    public static Role RoomAdministrator = new Role(true,false,false);
    public static Role BookingsManager = new Role(false,true,false);
    public static Role CustomerRelationshipManager = new Role(false,false,true);

    public static void main(String[] args)
    {
    //ensures Lists beginning at 1 instead of 0
    Bookings.add(null); // BookingNo beginning at 1
    Rooms.add(null); //RoomNo beginning at 1
    Employees.add(null); //EmployeeNo beginning at 1
    Customers.add(null); //Customers beginning at 1


    //Customer
        ContactData contactDetail = new ContactData("Olaf", "Schubert", "Olaf-Schubert-Straße", "014F", "12345", "Olafsruhe", "bundesolaf@gmail.de");
        Customer customer = new Customer(0, contactDetail, Customer.paymentMethods.bill);
        DateFrame bookingDateFrame = new DateFrame("2021-01-03", "2021-01-06");
        customer.sendBookingRequest(bookingDateFrame);

    //Births

      Employee Employee1=new Employee("Herbert Schmidt");
      Employees.add(Employee1);
      Employee Employee2=new Employee("Laura Müller");
      Employees.add(Employee2);
      Employee Employee3=new Employee("Bärbel Schäfer");
      Employees.add(Employee3);
      Employee Employee4=new Employee("Torsten Hillmann");
      Employees.add(Employee4);
      Employee Employee5=new Employee("Sigrid Alster");
      Employees.add(Employee5);
      //Example TimeFrame & DateFrame
      TimeFrame zwoelfBisMittag= new TimeFrame("zwölf","mittag");
      DateFrame Heute=new DateFrame("Heute","Heute");
      Room TestRoom = new Room(1,"Suite",20);

      Rooms.add(TestRoom);

      //Example Booking including Bookings entry
      Employee1.createBooking(1,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking,"egal","Jacuzzi",5.03f, Booking.IsBusinessCustomer.FALSE);
      Employee1.changeBooking(1,0,null,null,
              null,0.0f, Booking.IsBusinessCustomer.NULL);
      Employee1.deleteBooking(1);
    }
}
