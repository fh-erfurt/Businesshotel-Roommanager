package de.fourofakind.businesshotel;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class BookingTestClass {

@BeforeEach
public void setUp(){
    int Ball = 3;
};




    @Test
    public void shouldGiveAllBookingDetails()
    {
        //Given
        setUp();
        ArrayList<Booking> BookingList= new ArrayList<>();
        ArrayList<Room> RoomList = new ArrayList<>();

        Room SmallSuite = new Room (20,"Suite",17);
        Room BigSuite = new Room (10, "Suite",5);
        RoomList.add(SmallSuite);
        RoomList.add(BigSuite);

        Employee JohnDo = new Employee("John Do");
        TimeFrame coffeeMeeting = new TimeFrame("15:00","16:00");
        DateFrame date = new DateFrame("10.12.2020","10.12.2020");

        //Booking newBooking = new Booking();
        Booking createdBooking = new ConferenceRoomBooking(4,BigSuite.getRoomNo(), coffeeMeeting,date,BigSuite.getCategory(),"Luxury",180.05f,400,
                Booking.IsBusinessCustomer.TRUE);
        Booking testBooking = new HotelRoomBooking(4,SmallSuite.getRoomNo(),coffeeMeeting,date, SmallSuite.getCategory(), "wakeup call every 6 AM",
                160.5f,110,Booking.IsBusinessCustomer.FALSE);

            //Die Klasse Room gibt keinen String als Antwort auf GetCategory() (eigentlich sollte SmallSuite.getCategory() den String liefern,
            //  da muss noch erweitert werden. bzw. gekürzt, daher die Übergabe eines String von Hand!!!!

        //When
        //get everything from created Booking

        int bookingNumber = createdBooking.getBookingNo();
        int roomNumber = createdBooking.getRoomNo();
        String timeFrameStart = createdBooking.getTimeFrame().getStartTime();
        String timeFrameEnd = createdBooking.getTimeFrame().getEndTime();
        String dateFrameStart = createdBooking.getDateFrame().getStartDate();
        String dateFrameEnd = createdBooking.getDateFrame().getEndDate();
        String roomCategory = createdBooking.getRoomCategory();
        String specialWishes = createdBooking.getSpecialWishes();
        float pricing = createdBooking.getPricing();
        int empNo = createdBooking.getEmpNo();
        Booking.IsBusinessCustomer isBusinessCustomer = createdBooking.isBusinessCustomer();

        //Then



        assertEquals(4,bookingNumber,"If the BookingNo of the createdBooking equals the given Number it should pass!");
        assertEquals(10,roomNumber,"If the BookingNo of the createdBooking equals the given Number it should pass!");







    }


 // (int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String bookingDate, String roomCategory, String specialWishes, float pricing, int empNo, boolean isBusinessCustomer) {










}
