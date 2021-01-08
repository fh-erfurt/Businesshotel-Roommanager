package de.fourofakind.businesshotel;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static de.fourofakind.businesshotel.StartingClass.*;

public class EmployeeTestClass
{

    TimeFrame zwoelfBisMittag= new TimeFrame("zwölf","mittag");
    DateFrame Heute=new DateFrame("Heute","Heute");
    Room TestRoom = new Room(1,"Suite",20);



    @Test
    public void shouldOutputEmployeeNameWhenSuccessful()
    {
        //Given
        Employee MaxMustermann = new Employee("Max Mustermann");

        //When
        String result = MaxMustermann.getEmpName();

        //Then
        assertEquals("Max Mustermann",result,"If an Employee named Max Mustermann is created by its Constructor it should Output the Name");
    }

    @Test
    public void shouldOutputEmployeeNumberWhenSuccessful()
    {
        //Given
        Employee MaxMustermann = new Employee("Max Mustermann");
        EmployeeList.add(null); //EmployeeNo beginning at 1

        //When
        int result = MaxMustermann.getEmpNo();

        //Then
        assertEquals(0,result,"If an Employee is created by its Constructor as the first Employee ever, it should output '1' as its Employee Number, because the " +
                "arraylist is starting at 1 and contains no other Employees ");
    }



    @Test
    public void shouldOutputAllBookingDetailsIfSuccesful()
    {
        //Given

        RoomList.add(null); //RoomList beginning at 1
        RoomList.add(TestRoom);
        Employee MaxMustermann = new Employee("Max Mustermann");
        MaxMustermann.setGivenRole(BookingsManager);

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

        RoomList.add(null); //RoomList beginning at 1
        RoomList.add(TestRoom);
        BookingList.add(null); //BookingList beginning at 1
        Employee MaxMustermann = new Employee("Max Mustermann");

        Booking testBooking= MaxMustermann.createBooking(1,zwoelfBisMittag,Heute,"egal","Jacuzzi",5.03f, Booking.IsBusinessCustomer.FALSE);
        BookingList.add(testBooking);



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

        RoomList.add(null); //RoomList beginning at 1
        RoomList.add(TestRoom);
        BookingList.add(null); //BookingList beginning at 1
        Employee MaxMustermann = new Employee("Max Mustermann");

        Booking testBooking= MaxMustermann.createBooking(1,zwoelfBisMittag,Heute,"egal","Jacuzzi",5.03f, Booking.IsBusinessCustomer.FALSE);
        BookingList.add(testBooking);



        //When

        //Before Deletion
        String bookingListBeforeDeletion = ""; //is filled with all Bookings of BookingList before Booking No1 is deleted
        for (Booking booking : BookingList)
        {
            if (booking==null)bookingListBeforeDeletion +="Dummy";
            else bookingListBeforeDeletion += booking.toString();
        }

        //Actual Deletion
        MaxMustermann.deleteBooking(1);


        //After Deletion
        String bookingListAfterDeletion = ""; //is filled with all Bookings of BookingList after Booking No1 is deleted
        for (Booking booking : BookingList)
        {
            if (booking==null)bookingListAfterDeletion +="Dummy";
            else bookingListAfterDeletion += booking.toString();
        }

        //Then

        assertNotEquals(bookingListBeforeDeletion,bookingListAfterDeletion,"If the Booking No 1 is deleted, only the null booking should be left.");
    }
}
