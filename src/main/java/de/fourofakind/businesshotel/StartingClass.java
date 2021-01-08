package de.fourofakind.businesshotel;

import java.util.ArrayList;

class StartingClass
{

    //"Storages"
    public static ArrayList<Booking> BookingList= new ArrayList<>();
    public static ArrayList<Room> RoomList = new ArrayList<>();
    public static ArrayList<Employee> EmployeeList= new ArrayList<>();
    public static ArrayList<BookingRequest> bookingRequests = new ArrayList<>();


    public static void main(String[] args)
    {
    //ensures Lists beginning at 1 instead of 0
    BookingList.add(null); // BookingNo beginning at 1
    RoomList.add(null); //RoomNo beginning at 1
    EmployeeList.add(null); //EmployeeNo beginning at 1

    bookingRequests.add(null);


    //Customer
        ContactDetails contactDetail = new ContactDetails("Olaf", "Schubert", "Olaf-Schubert-Straße", "014F", "12345", "Olafsruhe", "bundesolaf@gmail.de");
        Customer customer = new Customer(0, contactDetail, Customer.paymentMethods.bill);
        DateFrame bookingDateFrame = new DateFrame("2021-01-03", "2021-01-06");
        customer.sendBookingRequest(bookingDateFrame);

    //Births

      Employee Employee1=new Employee("Herbert Schmidt");
      EmployeeList.add(Employee1);
      Employee Employee2=new Employee("Laura Müller");
      EmployeeList.add(Employee2);
      Employee Employee3=new Employee("Bärbel Schäfer");
      EmployeeList.add(Employee3);
      Employee Employee4=new Employee("Torsten Hillmann");
      EmployeeList.add(Employee4);
      Employee Employee5=new Employee("Sigrid Alster");
      EmployeeList.add(Employee5);
      //Example TimeFrame & DateFrame
      TimeFrame zwoelfBisMittag= new TimeFrame("zwölf","mittag");
      DateFrame Heute=new DateFrame("Heute","Heute");
      Room TestRoom = new Room(1,"Suite",20);

      RoomList.add(TestRoom);

      //Example Booking including BookingList entry
      Employee1.createBooking(1,zwoelfBisMittag,Heute,"egal","Jacuzzi",5.03f, Booking.IsBusinessCustomer.FALSE);
      Employee1.changeBooking(1,0,null,null,
              null,0.0f, Booking.IsBusinessCustomer.NULL);
      Employee1.deleteBooking(1);
    }
}
