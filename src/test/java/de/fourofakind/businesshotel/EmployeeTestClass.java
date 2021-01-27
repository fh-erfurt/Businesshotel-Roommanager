package de.fourofakind.businesshotel;

import de.fourofakind.businesshotel.bookings.Booking;
import de.fourofakind.businesshotel.bookings.ConferenceRoomBooking;
import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.FullDate;
import de.fourofakind.businesshotel.common.TimeFrame;
import de.fourofakind.businesshotel.customers.BookingRequest;
import de.fourofakind.businesshotel.customers.Customer;
import de.fourofakind.businesshotel.employees.Employee;
import de.fourofakind.businesshotel.rooms.ConferenceRoom;
import de.fourofakind.businesshotel.rooms.HotelRoom;
import de.fourofakind.businesshotel.rooms.Room;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static de.fourofakind.businesshotel.common.StartingClass.*;
import static org.junit.jupiter.api.Assertions.*;

/**
 * <p>Test Class to test all of the Employee's abilities</p>
 */
public class EmployeeTestClass
{
    //Dummy entries for each static List to secure all lists index=objectNo relations
    TimeFrame NullTimeFrame = new TimeFrame("", "");
    DateFrame NullDateFrame = new DateFrame("", "");
    ConferenceRoom NullRoom = new ConferenceRoom(0, ConferenceRoom.Category.SMALLGROUP, 0, 0, 0, 0, false, false, false,0.0f); //present to
    ConferenceRoomBooking NullBooking = new ConferenceRoomBooking(0, 0, 0,NullTimeFrame, NullDateFrame, Room.Category.SINGLE, "", 0, false);
    Employee NullEmployee = new Employee("");

    //(int bookingNo, int customerID, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, Room.Category roomCategory,
    //String specialWishes, int empNo, boolean isBusinessCustomer)


    //example instances of different classes used in the test cases
    TimeFrame zwoelfBisMittag = new TimeFrame("zwölf", "mittag");
    DateFrame Heute = new DateFrame("Heute", "Heute");
    HotelRoom TestRoom1 = new HotelRoom(1, HotelRoom.Category.SINGLE, 50, 4, true, false, false, true,90.5f);
    HotelRoom TestRoom2 = new HotelRoom(2, HotelRoom.Category.SUITE, 40, 2, false, false, true, false, 80f);
    HotelRoom TestRoom3 = new HotelRoom(3, HotelRoom.Category.SINGLE, 20, 1, true, false, true, false, 65);
    ConferenceRoom TestRoom4 = new ConferenceRoom(4, ConferenceRoom.Category.BIGGROUP, 60, 24, 3, 2, true, true, true, 15);


    /**
     * <p>Test of the Employee Constructor to ensure correct function of the constructor and storing of an employee in the 'Employees' list</p>
     */
    @Test
    public void shouldOutputEmployeeNameWhenSuccessful ()
    {
        //Given
        Employees.add(NullEmployee); //EmployeeNo beginning at 1

        Employee MaxMustermann = new Employee("Max Mustermann");
        Employees.add(MaxMustermann);

        //When
        String result = Employees.get(Employees.indexOf(MaxMustermann)).getEmpName();

        //Then
        assertEquals("Max Mustermann", result, "If an Employee named Max Mustermann is created by its Constructor it should Output the Name");
    }

    /**
     * <p>Second Test of the Employee Constructor to ensure correct function of the constructor and storing of an employee in the 'Employees' list</p>
     */
    @Test
    public void shouldOutputEmployeeNumberWhenSuccessful ()
    {
        //Given
        Employees.add(NullEmployee); //EmployeeNo beginning at 1

        Employee MaxMustermann = new Employee("Max Mustermann");
        Employees.add(MaxMustermann);

        //When
        int result = Employees.get(Employees.indexOf(MaxMustermann)).getEmpNo();

        //Then
        assertEquals(1, result, "If an Employee is created by its Constructor as the first Employee ever, it should output '1' as its Employee Number, because the " + "arraylist is starting at 1 and contains no other Employees ");
    }


    /**
     * <p>Test of an Employee's ability to create a booking according to given parameters and storing it into the 'Bookings' list
     * Prove of the function's reliability is given by putting out all of the booking's details </p>
     */
    @Test
    public void shouldOutputAllBookingDetailsIfSuccesful ()
    {
        //Given

        Rooms.add(NullRoom); //Rooms beginning at 1
        Rooms.add(TestRoom1);
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);

        Booking resultBooking = MaxMustermann.createBooking(1, 4,zwoelfBisMittag, Heute, Booking.BookingType.HotelRoomBooking, Room.Category.SINGLE,
                "Jacuzzi", false);


        //When
        String result = "RoomNo: " + resultBooking.getRoomNo();
        result += ", StartTime: " + resultBooking.getTimeFrame().getStartTime();
        result += ", EndTime: " + resultBooking.getTimeFrame().getEndTime();
        result += ", StartDate: " + resultBooking.getDateFrame().getStartDate();
        result += ", EndDate: " + resultBooking.getDateFrame().getEndDate();
        result += ", RoomCategory: " + resultBooking.getRoomCategory();
        result += ", SpecialWishes: " + resultBooking.getSpecialWishes();
        result += ", Pricing: " + resultBooking.getPricing();
        result += ", IsBusinessCustomer?: " + resultBooking.isBusinessCustomer();

        String expectedResult = "RoomNo: 1, StartTime: zwölf, EndTime: mittag, StartDate: Heute, EndDate: Heute, RoomCategory: SINGLE, SpecialWishes: Jacuzzi, Pricing: 0.0, IsBusinessCustomer?: false";


        //Then
        assertEquals(expectedResult, result, "If the Booking is created according to the details, all details will be told.");
    }

    /**
     * <p>Test of an Employee's ability to change a booking according to given parameters
     * Prove of the function's reliability is given by putting out all of the booking's details before and after the change and comparing them</p>
     */
    @Test
    public void shouldChangeBookingDataIfSuccesful ()
    {
        //Given

        Rooms.add(NullRoom); //Rooms beginning at 1
        Rooms.add(TestRoom1);
        Bookings.add(NullBooking); //Bookings beginning at 1
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);

        Booking testBooking = MaxMustermann.createBooking(1, 4,zwoelfBisMittag, Heute, Booking.BookingType.HotelRoomBooking, Room.Category.SINGLE,
                "Jacuzzi", false);
        Bookings.add(testBooking);
        int bookingNoOfBookingToBeChanged = testBooking.getBookingNo();


        //When

        //Before Change
        String resultBeforeChanges = "RoomNo: " + testBooking.getRoomNo();
        resultBeforeChanges += ", StartTime: " + testBooking.getTimeFrame().getStartTime();
        resultBeforeChanges += ", EndTime: " + testBooking.getTimeFrame().getEndTime();
        resultBeforeChanges += ", StartDate: " + testBooking.getDateFrame().getStartDate();
        resultBeforeChanges += ", EndDate: " + testBooking.getDateFrame().getEndDate();
        resultBeforeChanges += ", RoomCategory: " + testBooking.getRoomCategory();
        resultBeforeChanges += ", SpecialWishes: " + testBooking.getSpecialWishes();
        resultBeforeChanges += ", Pricing: " + testBooking.getPricing();
        resultBeforeChanges += ", IsBusinessCustomer?: " + testBooking.isBusinessCustomer();

        //Actual Change
        ArrayList<String> toBeChangedValues = new ArrayList<>();
        ArrayList<Object> changedValues = new ArrayList<>();
        toBeChangedValues.add("specialWishes");
        changedValues.add("Premium Internet");
        try
        {
            MaxMustermann.changeBooking(bookingNoOfBookingToBeChanged, toBeChangedValues, changedValues);
        }
        catch (IllegalArgumentException e)
        {
            System.out.println(e.getMessage());
        }


        //After Change
        String resultAfterChanges = "RoomNo: " + testBooking.getRoomNo();
        resultAfterChanges += ", StartTime: " + testBooking.getTimeFrame().getStartTime();
        resultAfterChanges += ", EndTime: " + testBooking.getTimeFrame().getEndTime();
        resultAfterChanges += ", StartDate: " + testBooking.getDateFrame().getStartDate();
        resultAfterChanges += ", EndDate: " + testBooking.getDateFrame().getEndDate();
        resultAfterChanges += ", RoomCategory: " + testBooking.getRoomCategory();
        resultAfterChanges += ", SpecialWishes: " + testBooking.getSpecialWishes();
        resultAfterChanges += ", Pricing: " + testBooking.getPricing();
        resultAfterChanges += ", IsBusinessCustomer?: " + testBooking.isBusinessCustomer();


        //Then
        assertNotEquals(resultBeforeChanges, resultAfterChanges, "If the Booking is changed according to the parameters given, specialWishes should be changed to Premium" + " Internet.");
    }

    /**
     * <p>Test of an Employee's ability to delete a booking according to given bookingNo and storing it into the 'Bookings' list
     * Prove of the function's reliability is given by putting out all of the booking's details </p>
     */
    @Test
    public void shouldDeleteBookingIfSuccesful ()
    {
        //Given

        Rooms.add(NullRoom); //Rooms beginning at 1
        Rooms.add(TestRoom1);
        Rooms.add(TestRoom2);
        Rooms.add(TestRoom3);
        Rooms.add(TestRoom4);
        Bookings.add(NullBooking); //Bookings beginning at 1
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);

        Booking testBooking1 = MaxMustermann.createBooking(1, 4,zwoelfBisMittag, Heute, Booking.BookingType.HotelRoomBooking, Room.Category.SINGLE,
                "Jacuzzi", false);
        Bookings.add(testBooking1);
        Booking testBooking2 = MaxMustermann.createBooking(2, 3,zwoelfBisMittag, Heute, Booking.BookingType.HotelRoomBooking, Room.Category.SUITE,
                "extra child bed", false);
        Bookings.add(testBooking2);
        Booking testBooking3 = MaxMustermann.createBooking(3, 2,zwoelfBisMittag, Heute, Booking.BookingType.HotelRoomBooking, Room.Category.DOUBLE,
                "TV", false);
        Bookings.add(testBooking3);
        Booking testBooking4 = MaxMustermann.createBooking(4, 2,zwoelfBisMittag, Heute, Booking.BookingType.ConferenceRoomBooking,
                Room.Category.BIGGROUP, "Beamer", true);
        Bookings.add(testBooking4);


        //When

        //Before Deletion
        StringBuilder bookingListBeforeDeletion = new StringBuilder(); //is filled with all Bookings of Bookings before Booking No1 is deleted
        for (Booking booking : Bookings)
        {
            if (booking == null) bookingListBeforeDeletion.append("Null, ");
            else bookingListBeforeDeletion.append(booking.toString() + ", ");
        }

        //Actual Deletion
        MaxMustermann.deleteBooking(1);


        //After Deletion
        StringBuilder bookingListAfterDeletion = new StringBuilder(); //is filled with all Bookings of Bookings after Booking No1 is deleted
        for (Booking booking : Bookings)
        {
            if (booking == null) bookingListAfterDeletion.append("Null, ");
            else bookingListAfterDeletion.append(booking.toString() + ", ");
        }

        //Then

        assertNotEquals(bookingListBeforeDeletion.toString(), bookingListAfterDeletion.toString(), "If the Booking No 1 is deleted, only the null booking should be left.");
    }

    /**
     * <p>Test of an Employee's ability to search for a booking according to given bookingNo or RoomNo+DateFrame+TimeFrame
     * Prove of the function's reliability is given by comparing the results of each search parameter combination and the testbooking just added in the test</p>
     */
    @Test
    void findBooking () //only works as a single test, seems to interfere with other tests, which is kind of strange behaviour
    {
        //Given
        Rooms.add(NullRoom); //Rooms beginning at 1
        Bookings.add(NullBooking); //Bookings beginning at 1
        Rooms.add(TestRoom1);
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);

        Booking testBooking1 = MaxMustermann.createBooking(1, 2,zwoelfBisMittag, Heute, Booking.BookingType.HotelRoomBooking, Room.Category.SINGLE,
                "Jacuzzi", false);
        Bookings.add(testBooking1);

        //When

        Booking foundBookingByBookNo = MaxMustermann.findBooking(Bookings.indexOf(testBooking1), 0, 0, null, null, "", null).get(0); //search by bookingNo
        Booking foundBookingByRoomNoPlusTimeAndDate = MaxMustermann.findBooking(0, 1, 0, Heute, zwoelfBisMittag, "", null).get(0); //search by RoomNo, TimeFrame and DateFrame

        //Then
        assertTrue(foundBookingByBookNo.equals(testBooking1) && foundBookingByRoomNoPlusTimeAndDate.equals(testBooking1), "If working correctly, both search Methods should give the same result and therefore both should exactly be the same booking created in preparation to this test.");
    }

    /**
     *<p>Test of an Employee's ability to show all bookings e.g. for analysis
     * Prove of the function's reliability is given by comparing the results of the function showAllBookings and the handmade expectedOutput StringBuilder object</p>
     */
    @Test
    void showAllBookings () //only working as a single test, seems like a bug, but no reason for NullPointerException found
    {
        //Given
        Rooms.add(NullRoom); //Rooms beginning at 1
        Rooms.add(TestRoom1);
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);
        Employees.add(MaxMustermann);
        MaxMustermann.createBooking(1, 14,zwoelfBisMittag, Heute, Booking.BookingType.HotelRoomBooking, Room.Category.SINGLE, "Jacuzzi", false);


        //When
        StringBuilder ExpectedOutput = new StringBuilder();
        ExpectedOutput.append("Buchung Nummer: 0, ");
        ExpectedOutput.append("Raum: 1, ");
        ExpectedOutput.append("von zwölf bis mittag, ");
        ExpectedOutput.append("von Heute bis Heute, ");
        ExpectedOutput.append("Raum-Kategorie: SINGLE, ");
        ExpectedOutput.append("Besondere Wünsche: Jacuzzi, ");
        ExpectedOutput.append("erstellt durch Mitarbeiter Nummer 0, ");
        ExpectedOutput.append("Business Kunde? false; ");

        System.out.println(ExpectedOutput);
        StringBuilder ActualOutput = MaxMustermann.showAllBookings();
        System.out.println(ActualOutput);

        //Then


        //assertEquals(ExpectedOutput, ActualOutput,"As only one Booking is added to the Bookings list, there should be only one real booking and the nullbooking returned."); //always false negative because of a strange bug, which returns both output aren't the same, but they obsivously are, if consulting the console output
        assertEquals(ActualOutput.length(), ExpectedOutput.length(), "Should have the same length");
        assertEquals(ExpectedOutput.compareTo(ActualOutput), 0, "As only one Booking is added to the Bookings list, there should be only one real booking and the nullbooking" + "returned.");
    }


    /**
     *<p>Test of the implemnetation an autonomous management of customer requests, based on whether or not a suitable room is free at the time given.</p>
     */
    @Test
    void manageBookingRequests ()
    {
        //Given
        Rooms.add(NullRoom); //Rooms beginning at 1
        Rooms.add(TestRoom1);
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(CustomerRelationshipManager);
        Employee PeterMustermann = new Employee("Peter Mustermann");
        PeterMustermann.setGivenRole(BookingsManager);
        FullDate BlockedTiming = new FullDate(Heute, zwoelfBisMittag);
        TestRoom1.setRoomAsOccupiedToList(BlockedTiming);

        Customer TestCustomer = MaxMustermann.createCustomer("Mannig", "faltige", "Möglichkeiten", "für", "kreative", "Namen", "gehen einem irgendwann", Customer.paymentMethods.paypal, "aus");

        //When

        ArrayList<BookingRequest> BookingRequestsBeforeRequest = new ArrayList<>(BookingRequests);
        System.out.println(BookingRequests);
        TestCustomer.sendBookingRequest(zwoelfBisMittag, Heute, Room.Category.SINGLE, "");
        System.out.println(BookingRequests);
        ArrayList<BookingRequest> BookingRequestsAfterRequest = new ArrayList<>(BookingRequests);

        System.out.println(BookingRequests);
        PeterMustermann.manageBookingRequests();
        System.out.println(BookingRequests);
        ArrayList<BookingRequest> DeclinedRequestsAfterRequestManagement = new ArrayList<>(DeclinedBookingRequests);
        System.out.println(BookingRequests);

        //Then
        assertNotEquals(BookingRequestsBeforeRequest, BookingRequestsAfterRequest, "If the test is succesful, the bookingRequests list should now have one entry instead of none");
        assertNotEquals(BookingRequestsAfterRequest, DeclinedRequestsAfterRequestManagement, "If the test is succesful, the bookingRequests list should now have no entry instead of one");
        //does not work because manageBookingRequests seems to not access the same arraylists BookingRequests and DeclinedBookingRequests as Customer or does not delete the request
    }

    /**
     *<p>Test of the implementation of Roles as a right management tool
     * Prove of the function's reliability is given by a successful creation of a customer without an exception</p>
     */
    @Test
    void TestRightManagementIfRoleGiven ()
    {
        //Given
        Employee MaxMustermann = new Employee("Max Mustermann");

        //When
        MaxMustermann.setGivenRole(CustomerRelationshipManager);

        //Then
        assertNotNull(MaxMustermann.createCustomer("Mannig", "faltige", "Möglichkeiten", "für", "kreative", "Namen",
                "gehen einem irgendwann", Customer.paymentMethods.paypal, "aus"), "If the calling Employee inherits the CustomerRelationshipManager Role, the test will succeed and the Customer will be created");
    }


    /**
     *<p>Test of the implementation of Roles as a right management tool
     * Prove of the function's reliability is given by a not successful creation of a customer, but with the throw of an IllegalCallerException</p>
     */
    @Test
    void TestRightManagementIfNoRoleGiven ()
    {
        //Given
        Employee MaxMustermann = new Employee("Max Mustermann");

        String Fail=null;

        //When
        MaxMustermann.setGivenRole(null);
        try
        {
            MaxMustermann.createCustomer("Mannig", "faltige", "Möglichkeiten", "für", "kreative", "Namen",
                    "gehen einem irgendwann", Customer.paymentMethods.paypal, "aus");
        }
        catch (IllegalCallerException e)
        {
            Fail=e.getMessage();
        }
        //Then
        assertTrue(Fail.contains("The caller does not inherit the Rights to do this"),"If the calling Employee does not inherit the CustomerRelationshipManager Role, the test will fail and the Customer won't be created");
    }


    //support function to output Customers ArrayList
    void outputCustomer ()
    {
        for (Customer customer : Customers)
        {
            System.out.println("id: " + String.valueOf(customer.getCustomerID()));
            System.out.println("firstName: " + customer.getContactData().getFirstName());
            System.out.println("lastName: " + customer.getContactData().getLastName());
            System.out.println("street: " + customer.getContactData().getStreetName());
            System.out.println("streetNumber: " + customer.getContactData().getStreetNumber());
            System.out.println("postalCode: " + customer.getContactData().getPostalCode());
            System.out.println("City: " + customer.getContactData().getCityName());
            System.out.println("emailAddress: " + customer.getContactData().getEmailAddress());

            Customer.paymentMethods paymentMethod = customer.getPaymentMethod();

            switch (paymentMethod)
            {
                case bill:
                    System.out.println("paymentmethod: bill");
                    break;
                case paypal:
                    System.out.println("paymentmethod: paypal");
                    break;
                case debit:
                    System.out.println("paymentmethod: debit");
                    break;
            }

            System.out.println("paymentCredentials: " + customer.getContactData().getPaymentCredentials());
            System.out.println();
        }
    }

    @Test
    void createCustomer ()
    {
        System.out.println();
        System.out.println("createCustomer");
        System.out.println();
        Employee testEmployee = new Employee("Bill Gates", CustomerRelationshipManager);

//        testTemployee.setGivenRole();

        testEmployee.createCustomer("Tom", "Hanks", "Tom-Hanks-Street", "13", "19025", "Tom-Hanks-Haußen", "tomhengst@gmail.com", Customer.paymentMethods.paypal, "");

        testEmployee.createCustomer("Billie", "Eilish", "Iwo Street", "5", "65198", "Billiefeld", "badguy@t-online.de", Customer.paymentMethods.bill, "");

        testEmployee.createCustomer("Andrew Lloyd", "Webber", "Musical Straße", "72", "51984", "Frankfurt", "starlightexpress@web.de", Customer.paymentMethods.debit, "DE19763248624679159875");

        outputCustomer();
    }

    @Test
    void changeCustomer ()
    {
        createCustomer();
        System.out.println();
        System.out.println("changeCustomer");
        System.out.println();

//
        Employee testEmployee = new Employee("Bill Gates", CustomerRelationshipManager);

        testEmployee.changeCustomer(1, "firstName", "Billie Eilish Pirate Baird");
        testEmployee.changeCustomer(1, "lastName", "O’Connell");

//        for(Customer elem : Customers)
        System.out.println("id: " + String.valueOf(Customers.get(1).getCustomerID()));
        System.out.println("firstName: " + Customers.get(1).getContactData().getFirstName());
        System.out.println("lastName: " + Customers.get(1).getContactData().getLastName());
        System.out.println("street: " + Customers.get(1).getContactData().getStreetName());
        System.out.println("streetNumber: " + Customers.get(1).getContactData().getStreetNumber());
        System.out.println("postalCode: " + Customers.get(1).getContactData().getPostalCode());
        System.out.println("City: " + Customers.get(1).getContactData().getCityName());
        System.out.println("emailAddress: " + Customers.get(1).getContactData().getEmailAddress());

        Customer.paymentMethods paymentMethod = Customers.get(1).getPaymentMethod();

        switch (paymentMethod)
        {
            case bill:
                System.out.println("paymentmethod: bill");
                break;
            case paypal:
                System.out.println("paymentmethod: paypal");
                break;
            case debit:
                System.out.println("paymentmethod: debit");
                break;
        }

//        outputCustomer();


    }

    @Test
    void deleteCustomer ()
    {

        createCustomer();
        System.out.println();
        System.out.println("deleteCustomer");
        System.out.println();

        Employee testEmployee = new Employee("Bill Gates", CustomerRelationshipManager);

        testEmployee.deleteCustomer(0);

        outputCustomer();
    }
}
