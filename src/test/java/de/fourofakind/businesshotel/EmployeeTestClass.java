package de.fourofakind.businesshotel;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class EmployeeTestClass
{
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

        //When
        int result = MaxMustermann.getEmpNo();

        //Then
        assertEquals(0,result,"If an Employee is created by its Constructor as the first Employee ever, it should output '0' as its Employee Number, because the " +
                "arraylist is starting at 0 ");
    }



    @Test
    public void shouldOutputAllBookingDetailsIfSuccesful()
    {
        //Given
        ArrayList<Booking> BookingList= new ArrayList<>();
        ArrayList<Room> RoomList = new ArrayList<>();
        Category Suite = new Category();
        Room NullRoom = new Room (Suite,0,0);
        RoomList.add(NullRoom);
        Room TestRoom= new Room(Suite, 20, 1);
        RoomList.add(TestRoom);
        Employee MaxMustermann = new Employee("Max Mustermann");
        TimeFrame zwoelfBisMittag= new TimeFrame("zwölf","mittag");
        DateFrame Heute=new DateFrame("Heute","Heute");

        Booking resultBooking= MaxMustermann.createBooking(1,zwoelfBisMittag,Heute,"egal","Jacuzzi",5.03f, false);



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
                ".03, IsBusinessCustomer?: false";


        //Then
        assertEquals(expectedResult,result,"If the Booking is created according to the details, all details will be told.");
    }

}
