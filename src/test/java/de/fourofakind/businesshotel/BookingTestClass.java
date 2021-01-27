package de.fourofakind.businesshotel;

import de.fourofakind.businesshotel.bookings.Booking;
import de.fourofakind.businesshotel.bookings.ConferenceRoomBooking;
import de.fourofakind.businesshotel.bookings.HotelRoomBooking;
import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;
import de.fourofakind.businesshotel.rooms.ConferenceRoom;
import de.fourofakind.businesshotel.rooms.HotelRoom;
import de.fourofakind.businesshotel.rooms.Room;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class BookingTestClass {

    //SettingUP START

    ArrayList<Booking> BookingList= new ArrayList<>();
    ArrayList<Room> RoomList = new ArrayList<>();

    public static HotelRoom SmallSuite = new HotelRoom (20, HotelRoom.Category.SINGLE,17,2,false,false,true,true,550);
    public static HotelRoom BigSuite = new HotelRoom (10, HotelRoom.Category.DOUBLE,5,2,true,true,false,true,60);
    public static ConferenceRoom NVidiaShowRoom = new ConferenceRoom(12, Room.Category.BIGGROUP,55,20,2,1,true,true,false,15);

    TimeFrame coffeeMeeting = new TimeFrame("15:00","16:45");
    DateFrame date = new DateFrame("10.12.2020","11.12.2020");

    //Booking newBooking = new Booking();
    ConferenceRoomBooking ConferenceBooking = new ConferenceRoomBooking(4,12,BigSuite.getRoomNo(), coffeeMeeting,date, Room.Category.BIGGROUP,"Luxury",400,
            true);
    HotelRoomBooking HotelBooking = new HotelRoomBooking(4,12,SmallSuite.getRoomNo(),coffeeMeeting,date, Room.Category.SUITE, "wakeup call every 6 AM",
            110,false);

    @Test
    public void isHotelRoomPricingCalculatedCorrectly()
    {
        float priceToPay = HotelBooking.calculatePricing(SmallSuite.getPricePerUnit());  //#TODO get the room from the Booking not just as roomNo.
        assertEquals(550.0,priceToPay,"Should calculate the Price for the Booking for the Room and the days it is used");
    }

    @Test
    public void isConferenceRoomPricingCalculatedCorrectly()
    {
        float priceToPay = ConferenceBooking.calculatePricing(NVidiaShowRoom.getPricePerUnit());
        assertEquals(26.25,priceToPay,"Should calculate the Price for the Booking for the Room and the hours it is used");
    }


    //SettingUP END

    @Test
    public void shouldGiveAllBookingDetails()
    {

        //When
        //get everything from created Booking
        int bookingNumber = ConferenceBooking.getBookingNo();
        int roomNumber = ConferenceBooking.getRoomNo();
        String timeFrameStart = ConferenceBooking.getTimeFrame().getStartTime();
        String timeFrameEnd = ConferenceBooking.getTimeFrame().getEndTime();
        String dateFrameStart = ConferenceBooking.getDateFrame().getStartDate();
        String dateFrameEnd = ConferenceBooking.getDateFrame().getEndDate();
        String specialWishes = ConferenceBooking.getSpecialWishes();
        float pricing = ConferenceBooking.getPricing();
        int empNo = ConferenceBooking.getEmpNo();
        boolean isBusinessCustomer = ConferenceBooking.isBusinessCustomer();

        //Then
        assertEquals(4,bookingNumber,"If the BookingNo of the ConferenceBooking equals the given Number it should pass!");
    }

    @Test
    public void shouldGiveConferenceRoomNo()
    {
        //When
        int roomNumber = ConferenceBooking.getRoomNo();
        //Then
        assertEquals(10,roomNumber,"If the BookingNo of the ConferenceBooking equals the given Number it should pass!");
    }

    @Test
    public void shouldGiveHotelRoomNo()
    {
        //When
        int roomNumber = HotelBooking.getRoomNo();
        //Then
        assertEquals(20,roomNumber,"If the BookingNo of the ConferenceBooking equals the given Number it should pass!");
    }

    @Test
    public void shouldGiveConferenceInstance()
    {
        //Then
        assertTrue(ConferenceBooking instanceof Booking,"Should pass if ConferenceBooking is an instance of Booking");
    }

    @Test
    public void shouldGiveHotelInstance()
    {
        //Then
        assertTrue(HotelBooking instanceof Booking,"Should pass if ConferenceBooking is an instance of Booking");
    }

    @Test
    public void shouldGiveCorrectBookingDate()
    {
        DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime currentDateTime = LocalDateTime.now();
        String currentBookingTimeDate = dateTimeFormat.format(currentDateTime);
        String BookingDate = ConferenceBooking.getBookingDate();
        System.out.println(BookingDate);
        assertEquals(currentBookingTimeDate,BookingDate,"Is the Date of Booking the day the test is run? If yes than it should pass!");
    }










}
