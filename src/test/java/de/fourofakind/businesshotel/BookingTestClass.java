package de.fourofakind.businesshotel;

import de.fourofakind.businesshotel.bookings.Booking;
import de.fourofakind.businesshotel.bookings.ConferenceRoomBooking;
import de.fourofakind.businesshotel.bookings.HotelRoomBooking;
import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;
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

    public static Room SmallSuite = new Room (20,"Suite",17);
    public static Room BigSuite = new Room (10, "Suite",5);

    TimeFrame coffeeMeeting = new TimeFrame("15:00","16:00");
    DateFrame date = new DateFrame("10.12.2020","10.12.2020");

    //Booking newBooking = new Booking();
    Booking ConferenceBooking = new ConferenceRoomBooking(4,BigSuite.getRoomNo(), coffeeMeeting,date,BigSuite.getCategory(),"Luxury",180.05f,400,
            Booking.IsBusinessCustomer.TRUE);
    Booking HotelBooking = new HotelRoomBooking(4,SmallSuite.getRoomNo(),coffeeMeeting,date, SmallSuite.getCategory(), "wakeup call every 6 AM",
            160.5f,110,Booking.IsBusinessCustomer.FALSE);




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
        String roomCategory = ConferenceBooking.getRoomCategory();
        String specialWishes = ConferenceBooking.getSpecialWishes();
        float pricing = ConferenceBooking.getPricing();
        int empNo = ConferenceBooking.getEmpNo();
        Booking.IsBusinessCustomer isBusinessCustomer = ConferenceBooking.isBusinessCustomer();

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
