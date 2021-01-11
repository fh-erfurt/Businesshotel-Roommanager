package de.fourofakind.businesshotel;

import de.fourofakind.businesshotel.bookings.Booking;
import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;
import de.fourofakind.businesshotel.employees.Employee;
import de.fourofakind.businesshotel.rooms.Room;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static de.fourofakind.businesshotel.common.StartingClass.*;

public class EmployeeTestClass
{

    TimeFrame zwoelfBisMittag= new TimeFrame("zwölf","mittag");
    DateFrame Heute=new DateFrame("Heute","Heute");
    Room TestRoom1 = new Room(1,"Single Room",15);
    Room TestRoom2 = new Room(2,"Suite",40);
    Room TestRoom3 = new Room(3,"Double Room",20);
    Room TestRoom4 = new Room(4,"Big Group",50);




    @Test
    public void shouldOutputEmployeeNameWhenSuccessful()
    {
        //Given
        Employees.add(null); //EmployeeNo beginning at 1

        Employee MaxMustermann = new Employee("Max Mustermann");
        Employees.add(MaxMustermann);

        //When
        String result = Employees.get(Employees.indexOf(MaxMustermann)).getEmpName();

        //Then
        assertEquals("Max Mustermann",result,"If an Employee named Max Mustermann is created by its Constructor it should Output the Name");
    }

    @Test
    public void shouldOutputEmployeeNumberWhenSuccessful()
    {
        //Given
        Employees.add(null); //EmployeeNo beginning at 1

        Employee MaxMustermann = new Employee("Max Mustermann");
        Employees.add(MaxMustermann);

        //When
        int result = Employees.get(Employees.indexOf(MaxMustermann)).getEmpNo();

        //Then
        assertEquals(1,result,"If an Employee is created by its Constructor as the first Employee ever, it should output '1' as its Employee Number, because the " +
                "arraylist is starting at 1 and contains no other Employees ");
    }



    @Test
    public void shouldOutputAllBookingDetailsIfSuccesful()
    {
        //Given

        Rooms.add(null); //Rooms beginning at 1
        Rooms.add(TestRoom1);
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);
        Employees.add(MaxMustermann);

        Booking resultBooking= MaxMustermann.createBooking(1,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking,"egal","Jacuzzi",5.03f,
                Booking.IsBusinessCustomer.FALSE);



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

        String expectedResult="RoomNo: 1, StartTime: zwölf, EndTime: mittag, StartDate: Heute, EndDate: Heute, RoomCategory: egal, SpecialWishes: Jacuzzi, Pricing: 5" +
                ".03, IsBusinessCustomer?: FALSE";


        //Then
        assertEquals(expectedResult,result,"If the Booking is created according to the details, all details will be told.");
    }

    @Test
    public void shouldChangeBookingDataIfSuccesful()
    {
        //Given

        Rooms.add(null); //Rooms beginning at 1
        Rooms.add(TestRoom1);
        Bookings.add(null); //Bookings beginning at 1
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);

        Booking testBooking= MaxMustermann.createBooking(1,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking,"egal","Jacuzzi",5.03f, Booking.IsBusinessCustomer.FALSE);
        Bookings.add(testBooking);



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
        MaxMustermann.changeBooking(1,0,null,null,"Premium Internet",0.0f, Booking.IsBusinessCustomer.NULL);


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


        assertNotEquals(resultBeforeChanges,resultAfterChanges,"If the Booking is changed according to the parameters given, specialWishes should be changed to Premium" +
                " Internet.");
    }
    @Test
    public void shouldDeleteBookingIfSuccesful()
    {
        //Given

        Rooms.add(null); //Rooms beginning at 1
        Rooms.add(TestRoom1);
        Rooms.add(TestRoom2);
        Rooms.add(TestRoom3);
        Rooms.add(TestRoom4);
        Bookings.add(null); //Bookings beginning at 1
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);

        Booking testBooking1 = MaxMustermann.createBooking(1,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking,"Single Room","Jacuzzi",5.03f,
                Booking.IsBusinessCustomer.FALSE);
        Bookings.add(testBooking1);
        Booking testBooking2 = MaxMustermann.createBooking(2,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking,"Suite","extra child bed",10.03f,
                Booking.IsBusinessCustomer.FALSE);
        Bookings.add(testBooking2);
        Booking testBooking3 = MaxMustermann.createBooking(3,zwoelfBisMittag,Heute, Booking.BookingType.HotelRoomBooking,"Double Room","TV",7.03f,
                Booking.IsBusinessCustomer.FALSE);
        Bookings.add(testBooking3);
        Booking testBooking4 = MaxMustermann.createBooking(4,zwoelfBisMittag,Heute, Booking.BookingType.ConferenceRoomBooking,"Big Group","Beamer",5.03f,
                Booking.IsBusinessCustomer.TRUE);
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
}
