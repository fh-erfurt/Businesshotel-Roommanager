package de.fourofakind.businesshotel;

/**
 * This is our main class. Every action that is made from an employee or customer will interact with this class.
 * All information about the Bookingdetails and the Booking itself interacts with this class to.
 */




public class Booking {

    /**
     * <p>
     * The Booking class has many overloaded methods to ensure it can be called with different types of rooms, like conference room or a hotel room.
     * This is necessary because a hotelroom requires a date only, but a conference room requires a specific time and date.
     * </p>
     */
    public Booking() {}
    public Booking(int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String bookingDate, String roomCategory, String specialWishes, float pricing, int empNo, boolean isBusinessCustomer) {
        this.BookingNo = bookingNo;
        this.RoomNo = roomNo;
        this.timeFrame = timeFrame;
        this.dateFrame = dateFrame;
        this.bookingDate = bookingDate;
        this.roomCategory = roomCategory;
        this.specialWishes = specialWishes;
        this.pricing = pricing;
        this.empNo = empNo;
        this.isBusinessCustomer = isBusinessCustomer;
    }

    public Booking(int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String bookingDate, ConferenceRoomBooking conferenceRoomBooking,String roomCategory, String specialWishes, float pricing, int empNo, boolean isBusinessCustomer) {
        this.BookingNo = bookingNo;
        this.RoomNo = roomNo;
        this.timeFrame = timeFrame;
        this.dateFrame = dateFrame;
        this.bookingDate = bookingDate;
        this.conferenceRoomBooking = conferenceRoomBooking;
        this.roomCategory = roomCategory;
        this.specialWishes = specialWishes;
        this.pricing = pricing;
        this.empNo = empNo;
        this.isBusinessCustomer = isBusinessCustomer;
    }

    public Booking(int bookingNo, int roomNo,TimeFrame timeFrame, DateFrame dateFrame, String bookingDate, HotelRoomBooking hotelRoomBooking,String roomCategory ,String specialWishes, float pricing, int empNo, boolean isBusinessCustomer) {
        this.BookingNo = bookingNo;
        this.RoomNo = roomNo;
        this.timeFrame = timeFrame;
        this.dateFrame = dateFrame;
        this.roomCategory = roomCategory;
        this.bookingDate = bookingDate;
        this.hotelRoomBooking = hotelRoomBooking;
        this.specialWishes = specialWishes;
        this.pricing = pricing;
        this.empNo = empNo;
        this.isBusinessCustomer = isBusinessCustomer;
    }
    public Booking(int bookingNo, int roomNo,TimeFrame timeFrame, DateFrame dateFrame, String bookingDate,HotelRoomBooking hotelRoomBooking,
                   ConferenceRoomBooking conferenceRoomBooking , String specialWishes, float pricing, int empNo, boolean isBusinessCustomer) {

        this();

    }

    public TimeFrame getTimeFrame() {
        return timeFrame;
    }
    public void setTimeFrame(TimeFrame timeFrame) {
        this.timeFrame = timeFrame;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public String getRoomCategory() {
        return roomCategory;
    }

    public String getSpecialWishes() {
        return specialWishes;
    }

    public float getPricing() {
        return pricing;
    }

    public int getEmpNo() {
        return empNo;
    }

    public boolean isBusinessCustomer() {
        return isBusinessCustomer;
    }


    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public void setRoomCategory(String roomCategory) {
        this.roomCategory = roomCategory;
    }

    public void setSpecialWishes(String specialWishes) {
        this.specialWishes = specialWishes;
    }

    public void setPricing(float pricing) {
        this.pricing = pricing;
    }

    public void setEmpNo(int empNo) {
        this.empNo = empNo;
    }

    public void setBusinessCustomer(boolean businessCustomer) {
        isBusinessCustomer = businessCustomer;
    }

    private TimeFrame timeFrame;

    public DateFrame getDateFrame() {
        return dateFrame;
    }

    public void setDateFrame(DateFrame dateFrame) {
        this.dateFrame = dateFrame;
    }

    private DateFrame dateFrame;
    private String bookingDate;
    private String roomCategory;
    private String specialWishes;
    private ConferenceRoomBooking conferenceRoomBooking;
    private HotelRoomBooking hotelRoomBooking;

    public int getBookingNo() {
        return BookingNo;
    }

    public void setBookingNo(int bookingNo) {
        BookingNo = bookingNo;
    }

    public int getRoomNo() {
        return RoomNo;
    }

    public void setRoomNo(int roomNo) {
        RoomNo = roomNo;
    }

    private int BookingNo;
    private int RoomNo;

    private float pricing;
    private int empNo;

    private boolean isBusinessCustomer;




}
