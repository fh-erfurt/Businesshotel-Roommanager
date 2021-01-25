package de.fourofakind.businesshotel;

import de.fourofakind.businesshotel.bookings.Booking;
import de.fourofakind.businesshotel.bookings.ConferenceRoomBooking;
import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;
import de.fourofakind.businesshotel.customers.Customer;
import de.fourofakind.businesshotel.customers.BookingRequest;
import de.fourofakind.businesshotel.employees.Employee;
import de.fourofakind.businesshotel.rooms.ConferenceRoom;
import de.fourofakind.businesshotel.rooms.HotelRoom;
import de.fourofakind.businesshotel.rooms.Room;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static de.fourofakind.businesshotel.common.StartingClass.*;

/**
 * <p>Test Class to test all of the Employee's abilities</p>
 */
public class EmployeeTestClass
{
    //Dummy entries for each static List to secure all lists index=objectNo relations
    TimeFrame NullTimeFrame=new TimeFrame("","");
    DateFrame NullDateFrame=new DateFrame("","");
    ConferenceRoom NullRoom= new ConferenceRoom(0, ConferenceRoom.Category.SMALLGROUP,0,0,0,0,false,false,false); //present to
    ConferenceRoomBooking NullBooking= new ConferenceRoomBooking(0,0,NullTimeFrame,NullDateFrame,Room.Category.SINGLE,"",0,false);
    Employee NullEmployee = new Employee("");


    //example instances of different classes used in the test cases
    TimeFrame zwoelfBisMittag= new TimeFrame("zwölf","mittag");
    DateFrame Heute=new DateFrame("Heute","Heute");
    HotelRoom TestRoom1 = new HotelRoom (1, HotelRoom.Category.SINGLE,50,4,true,false,false,true);
    HotelRoom TestRoom2 = new HotelRoom(2, HotelRoom.Category.SUITE,40,2,false,false,true,false);
    HotelRoom TestRoom3 = new HotelRoom(3, HotelRoom.Category.SINGLE,20,1,true,false,true,false);
    ConferenceRoom TestRoom4 = new ConferenceRoom(4, ConferenceRoom.Category.BIGGROUP,60,24,3,2,true,true,true);


    /**
     * <p>Test of the Employee Constructor to ensure correct function of the constructor and storing of an employee in the 'Employees' list</p>
     */
    @Test
    public void shouldOutputEmployeeNameWhenSuccessful()
    {
        //Given
        Employees.add(NullEmployee); //EmployeeNo beginning at 1

        Employee MaxMustermann = new Employee("Max Mustermann");
        Employees.add(MaxMustermann);

        //When
        String result = Employees.get(Employees.indexOf(MaxMustermann)).getEmpName();

        //Then
        assertEquals("Max Mustermann",result,"If an Employee named Max Mustermann is created by its Constructor it should Output the Name");
    }

    /**
     * <p>Second Test of the Employee Constructor to ensure correct function of the constructor and storing of an employee in the 'Employees' list</p>
     */
    @Test
    public void shouldOutputEmployeeNumberWhenSuccessful()
    {
        //Given
        Employees.add(NullEmployee); //EmployeeNo beginning at 1

        Employee MaxMustermann = new Employee("Max Mustermann");
        Employees.add(MaxMustermann);

        //When
        int result = Employees.get(Employees.indexOf(MaxMustermann)).getEmpNo();

        //Then
        assertEquals(1,result,"If an Employee is created by its Constructor as the first Employee ever, it should output '1' as its Employee Number, because the " +
                "arraylist is starting at 1 and contains no other Employees ");
    }


    /**
     * <p>Test of an Employee's ability to create a booking according to given parameters and storing it into the 'Bookings' list
     * Prove of the function's reliability is given by putting out all of the booking's details </p>
     */
    @Test
    public void shouldOutputAllBookingDetailsIfSuccesful()
    {
        //Given

        Rooms.add(NullRoom); //Rooms beginning at 1
        Rooms.add(TestRoom1);
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);

        Booking resultBooking= MaxMustermann.createBooking(1,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking,Room.Category.SINGLE,"Jacuzzi",false);



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

        String expectedResult="RoomNo: 1, StartTime: zwölf, EndTime: mittag, StartDate: Heute, EndDate: Heute, RoomCategory: Room.Category.SINGLE, SpecialWishes: Jacuzzi, Pricing: 0.0, IsBusinessCustomer?: false";


        //Then
        assertEquals(expectedResult,result,"If the Booking is created according to the details, all details will be told.");
    }

    /**
     *<p>Test of an Employee's ability to change a booking according to given parameters
     * Prove of the function's reliability is given by putting out all of the booking's details before and after the change and comparing them</p>
     */
    @Test
    public void shouldChangeBookingDataIfSuccesful()
    {
        //Given

        Rooms.add(NullRoom); //Rooms beginning at 1
        Rooms.add(TestRoom1);
        Bookings.add(NullBooking); //Bookings beginning at 1
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);

        Booking testBooking= MaxMustermann.createBooking(1,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking,Room.Category.SINGLE,"Jacuzzi", false);
        Bookings.add(testBooking);
        int bookingNoOfBookingToBeChanged= testBooking.getBookingNo();


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
        ArrayList<String> toBeChangedValues =new ArrayList<>();
        ArrayList<Object> changedValues =new ArrayList<>();
        toBeChangedValues.add("specialWishes");
        changedValues.add("Premium Internet");
        try
        {
            MaxMustermann.changeBooking(bookingNoOfBookingToBeChanged,toBeChangedValues, changedValues);
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
        assertNotEquals(resultBeforeChanges,resultAfterChanges,"If the Booking is changed according to the parameters given, specialWishes should be changed to Premium"
                        + " Internet.");
    }

    /**
     *<p>Test of an Employee's ability to delete a booking according to given bookingNo and storing it into the 'Bookings' list
     * Prove of the function's reliability is given by putting out all of the booking's details </p>
     */
    @Test
    public void shouldDeleteBookingIfSuccesful()
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

        Booking testBooking1 = MaxMustermann.createBooking(1,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking, Room.Category.SINGLE,"Jacuzzi",
                false);
        Bookings.add(testBooking1);
        Booking testBooking2 = MaxMustermann.createBooking(2,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking,Room.Category.SUITE,"extra child bed",
                false);
        Bookings.add(testBooking2);
        Booking testBooking3 = MaxMustermann.createBooking(3,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking,Room.Category.DOUBLE,"TV",
                false);
        Bookings.add(testBooking3);
        Booking testBooking4 = MaxMustermann.createBooking(4,zwoelfBisMittag,Heute, Booking.BookingType.ConferenceRoomBooking,Room.Category.BIGGROUP,"Beamer",
                true);
        Bookings.add(testBooking4);


        //When

        //Before Deletion
        StringBuilder bookingListBeforeDeletion = new StringBuilder(); //is filled with all Bookings of Bookings before Booking No1 is deleted
        for (Booking booking : Bookings)
        {
            if (booking==null) bookingListBeforeDeletion.append("Null, ");
            else bookingListBeforeDeletion.append(booking.toString()+", ");
        }

        //Actual Deletion
        MaxMustermann.deleteBooking(1);


        //After Deletion
        StringBuilder bookingListAfterDeletion = new StringBuilder(); //is filled with all Bookings of Bookings after Booking No1 is deleted
        for (Booking booking : Bookings)
        {
            if (booking==null) bookingListAfterDeletion.append("Null, ");
            else bookingListAfterDeletion.append(booking.toString()+", ");
        }

        //Then

        assertNotEquals(bookingListBeforeDeletion.toString(), bookingListAfterDeletion.toString(),"If the Booking No 1 is deleted, only the null booking should be left.");
    }

    /**
     *
     */
    @Test
    void findBooking ()
    {
        //Given
        Rooms.add(NullRoom); //Rooms beginning at 1
        Bookings.add(NullBooking); //Bookings beginning at 1
        Rooms.add(TestRoom1);
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);

        Booking testBooking1 = MaxMustermann.createBooking(1,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking, Room.Category.SINGLE,"Jacuzzi",
                false);
        Bookings.add(testBooking1);

        //When

        Booking foundBookingByBookNo=MaxMustermann.findBooking(Bookings.indexOf(testBooking1),0,0,null,null,"",null).get(0); //search by bookingNo
        Booking foundBookingByRoomNoPlusTimeAndDate=MaxMustermann.findBooking(0,1,0,Heute,zwoelfBisMittag,"",null).get(0); //search by RoomNo, TimeFrame and DateFrame
        Booking expectedBooking=testBooking1;

        //Then
        assertTrue(foundBookingByBookNo.equals(expectedBooking) && foundBookingByRoomNoPlusTimeAndDate.equals(expectedBooking),
                "If working correctly, both search Methods should give the same result and therefore both should exactly be the same booking created in preparation to this test.");
    }

    /**
     *
     */
    @Test
    void showAllBookings ()
    {
        //Given
        Rooms.add(NullRoom); //Rooms beginning at 1
        Rooms.add(TestRoom1);
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);
        Employees.add(MaxMustermann);
        System.out.println("Before createBooking");
        MaxMustermann.createBooking(1,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking,Room.Category.SINGLE,"Jacuzzi",false);
        //MaxMustermann.createBooking(2,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking,"egal","Meerblick",true);
        System.out.println("After createBooking");
        //When
        StringBuilder ExpectedOutput = new StringBuilder();
        ExpectedOutput.append("Buchung Nummer: 0, ");
        ExpectedOutput.append("Raum: 1, ");
        ExpectedOutput.append("von zwölf bis mittag, ");
        ExpectedOutput.append("von Heute bis Heute, ");
        ExpectedOutput.append("Raum-Kategorie: Room.Category.SINGLE, ");
        ExpectedOutput.append("Besondere Wünsche: Jacuzzi, ");
        ExpectedOutput.append("erstellt durch Mitarbeiter Nummer 0, ");
        ExpectedOutput.append("Business Kunde? false; ");

        System.out.println(ExpectedOutput);
        StringBuilder ActualOutput= MaxMustermann.showAllBookings();
        System.out.println(ActualOutput);

        //Then
        //System.out.println(ExpectedOutput.getClass().getName());
//        /assertEquals(ExpectedOutput.toString(), ActualOutput.toString(),"As only one Booking is added to the Bookings list, there should be only " +
           // "one booking returned.");

        assertEquals(ExpectedOutput, ActualOutput,"As only one Booking is added to the Bookings list, there should be only one real booking and the nullbooking returned.");
        assertTrue(ExpectedOutput.length()==ActualOutput.length(), "Should have the same length");
        assertTrue(ExpectedOutput.compareTo(ActualOutput)==0,"As only one Booking is added to the Bookings list, there should be only one real booking and the nullbooking" +
                "returned.");
    }


    /**
     *
     */
    @Test
    void manageBookingRequests ()
    {
        //Given
        Rooms.add(NullRoom); //Rooms beginning at 1
        Rooms.add(TestRoom1);
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);
        Customer TestCustomer= MaxMustermann.createCustomer("Mannig","faltige","Möglichkeiten","für","kreative","Namen","gehen einem irgendwann", Customer.paymentMethods.paypal,"aus");

        //When

        ArrayList<BookingRequest> BookingRequestsBefore = BookingRequests;

        TestCustomer.sendBookingRequest(zwoelfBisMittag,Heute,Room.Category.SUITE,"");


        ArrayList<BookingRequest> BookingRequestsAfter = BookingRequests;

        //Then
        assertNotEquals(BookingRequestsBefore,BookingRequestsAfter);

    }




    @Test
    void createCustomer ()
    {


        Employee testTemployee = new Employee("Bill Gates", CustomerRelationshipManager);

//        testTemployee.setGivenRole();

        testTemployee.createCustomer("Tom",
                                    "Hanks",
                                    "Tom-Hanks-Street",
                                    "13", "19025",
                                    "Tom-Hanks-Haußen",
                                    "tomhengst@gmail.com",
                                    Customer.paymentMethods.bill,
                                    "");

        testTemployee.createCustomer("Billie",
                                    "Eilish",
                                    "Iwo Street",
                                    "5", "65198",
                                    "Billiefeld",
                                    "badguy@t-online.de",
                                    Customer.paymentMethods.paypal,
                                    "");

        for(Customer elem : Customers)
            System.out.println("FirstName: " + elem.getContactData().getFirstName());
    }

    @Test
    void changeCustomer ()
    {
    }

    @Test
    void deleteCustomer ()
    {
    }
}
