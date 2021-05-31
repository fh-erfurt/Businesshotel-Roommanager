package de.fourofakind.businesshotel;

import de.fourofakind.businesshotel.bookings.ConferenceRoomBooking;
import de.fourofakind.businesshotel.bookings.HotelRoomBooking;
import de.fourofakind.businesshotel.rooms.ConferenceRoom;
import de.fourofakind.businesshotel.rooms.HotelRoom;
import de.fourofakind.businesshotel.rooms.Room;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.*;

public class BookingTestClass {
    /**
     * <p>
     * Test everything not trivial refering to the Booking. But first as a Setup create instances of different classes used in the test cases, so
     * we have something to actually work with (e.g.Rooms, Bookings and Employees)
     * </p>
     */

    //SettingUP START



    public static HotelRoom SmallSuite = new HotelRoom (20, HotelRoom.Category.SINGLE,17,2,false,false,true,true,550);
    public static HotelRoom BigSuite = new HotelRoom (10, HotelRoom.Category.DOUBLE,5,2,true,true,false,true,60);
    public static ConferenceRoom NVidiaShowRoom = new ConferenceRoom(12, Room.Category.BIGGROUP,55,20,2,1,true,true,false,15);

    TimeFrame coffeeMeeting = new TimeFrame("15:00","16:45");
    TimeFrame hotelStandardTime = new TimeFrame("08:00", "18:00");
    DateFrame date = new DateFrame("10.12.2020","11.12.2020");

    ConferenceRoomBooking ConferenceBooking = new ConferenceRoomBooking(4,12,BigSuite.getRoomNo(), coffeeMeeting,date, Room.Category.BIGGROUP,"Luxury",400,
            true);
    HotelRoomBooking HotelBooking = new HotelRoomBooking(5,12,SmallSuite.getRoomNo(),hotelStandardTime,date, Room.Category.SUITE, "wakeup call every 6 " +
            "AM",
            110,false);

    //SettingUP END
    /**
     * <p>
     * The following two tests are designed to check if the createdBooking, Hotel- or Conferenceroom is actually an instance of the abstract class
     * Booking.
     * </p>
     */

    @Test
    public void shouldGiveConferenceInstance()
    {
        //Then
        assertNotNull(ConferenceBooking, "Should pass if ConferenceBooking is an instance of Booking");
    }

    @Test
    public void shouldGiveHotelInstance()
    {
        //Then
        assertNotNull(HotelBooking, "Should pass if ConferenceBooking is an instance of Booking");
    }
    /**
     * <p>
     * This tests checks whether the calculated price for the given Booking is calculated correctly. Since there are a lot of conversions needed
     * for the Dateformat.
     * </p>
     */
    @Test
    public void isHotelRoomPricingCalculatedCorrectly()
    {
        float priceToPay = HotelBooking.calculatePricing(SmallSuite.getPricePerUnit());  //#TODO get the room from the Booking not just as roomNo.
        assertEquals(550.0,priceToPay,"Should calculate the Price for the Booking for the Room and the days it is used");
    }
    /**
     * <p>
     * This tests checks whether the calculated price for the given Booking is calculated correctly. Since there are a lot of conversions needed
     * for the Timeformat.
     * </p>
     */
    @Test
    public void isConferenceRoomPricingCalculatedCorrectly()
    {
        float priceToPay = ConferenceBooking.calculatePricing(NVidiaShowRoom.getPricePerUnit());
        assertEquals(26.25,priceToPay,"Should calculate the Price for the Booking for the Room and the hours it is used");
    }

    /**
     * <p>
     * This tests checks if all Bookingdetails have been set correctly as given in the create-Method
     * </p>
     */
    @Test
    public void shouldGiveAllBookingDetailsForConferenceRoomBooking()
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
        float pricing = ConferenceBooking.calculatePricing(NVidiaShowRoom.getPricePerUnit());
        int empNo = ConferenceBooking.getEmpNo();
        boolean isBusinessCustomer = ConferenceBooking.isBusinessCustomer();

        //Then
        assertEquals(4,bookingNumber,"If the BookingNo of the ConferenceBooking equals the given Number it should pass!");
        assertEquals(10,roomNumber,"If the RoomNo of the ConferenceBooking equals the given Number it should pass!");
        assertEquals("15:00",timeFrameStart,"If the TimeFrame to Start of the ConferenceBooking equals the given Time it should pass!");
        assertEquals("16:45",timeFrameEnd,"If the TimeFrame to End  of the ConferenceBooking equals the given Time it should pass!");
        assertEquals("10.12.2020",dateFrameStart,"If the DateFrame of the ConferenceBooking equals the given Date to Start it should pass!");
        assertEquals("11.12.2020",dateFrameEnd,"If the DateFrame of the ConferenceBooking equals the given Date it should pass!");
        assertEquals("Luxury",specialWishes,"If the wishes are the same as set earlier in ConferenceBooking it should pass!");
        assertEquals(26.25,pricing,"If the pricing is calculated right, it should pass this test");
        assertEquals(400,empNo,"If the empNo of the ConferenceBooking equals the given Number of the Employee it should pass!");
        assertTrue(isBusinessCustomer, "Should give true for isBusinesCustomer");
    }

    @Test
    public void shouldGiveAllBookingDetailsForHotelRoomBooking()
    {
        //When
        //get everything from created Booking
        int bookingNumber = HotelBooking.getBookingNo();
        int roomNumber = HotelBooking.getRoomNo();
        String timeFrameStart = HotelBooking.getTimeFrame().getStartTime();
        String timeFrameEnd = HotelBooking.getTimeFrame().getEndTime();
        String dateFrameStart = HotelBooking.getDateFrame().getStartDate();
        String dateFrameEnd = HotelBooking.getDateFrame().getEndDate();
        String specialWishes = HotelBooking.getSpecialWishes();
        float pricing = HotelBooking.calculatePricing(BigSuite.getPricePerUnit());
        int empNo = HotelBooking.getEmpNo();
        boolean isBusinessCustomer = HotelBooking.isBusinessCustomer();

        //Then
        assertEquals(5,bookingNumber,"If the BookingNo of the ConferenceBooking equals the given Number it should pass!");
        assertEquals(20,roomNumber,"If the RoomNo of the ConferenceBooking equals the given Number it should pass!");
        assertEquals("08:00",timeFrameStart,"If the TimeFrame to Start of the ConferenceBooking equals the given Time it should pass!");
        assertEquals("18:00",timeFrameEnd,"If the TimeFrame to End  of the ConferenceBooking equals the given Time it should pass!");
        assertEquals("10.12.2020",dateFrameStart,"If the DateFrame of the ConferenceBooking equals the given Date to Start it should pass!");
        assertEquals("11.12.2020",dateFrameEnd,"If the DateFrame of the ConferenceBooking equals the given Date it should pass!");
        assertEquals("wakeup call every 6 AM",specialWishes,"If the wishes are the same as set earlier in ConferenceBooking it should pass!");
        assertEquals(60.0,pricing,"If the pricing is calculated right, it should pass this test");
        assertEquals(110,empNo,"If the empNo of the ConferenceBooking equals the given Number of the Employee it should pass!");
        assertFalse(isBusinessCustomer, "Should give true for isBusinesCustomer");
    }

    /**
     * <p>
     * This tests checks if the BookingDate which is created at the very moment the Booking-Instance is created, equals the currenttime.
     * </p>
     */
    @Test
    public void shouldGiveCorrectCurrentBookingDate()
    {
        DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime currentDateTime = LocalDateTime.now();
        String currentBookingTimeDate = dateTimeFormat.format(currentDateTime);
        String BookingDate = ConferenceBooking.getBookingDate();
        System.out.println(BookingDate);
        assertEquals(currentBookingTimeDate,BookingDate,"Is the Date of Booking the day the test is run? If yes than it should pass!");
    }










}
