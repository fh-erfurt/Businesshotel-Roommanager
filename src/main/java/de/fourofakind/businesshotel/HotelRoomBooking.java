package de.fourofakind.businesshotel;

public class HotelRoomBooking extends Booking{
    /**
     * This class extends the Booking to the kind of room that has been booked, in this case to a Hotelroom.
     */

    public HotelRoomBooking(int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String bookingDate, HotelRoomBooking hotelRoomBooking, String roomCategory, String specialWishes, float pricing, int empNo, boolean isBusinessCustomer) {
        super(bookingNo, roomNo, timeFrame, dateFrame, bookingDate, hotelRoomBooking, roomCategory, specialWishes, pricing, empNo, isBusinessCustomer);
    }

    public HotelRoomBooking(int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String bookingDate, HotelRoomBooking hotelRoomBooking, ConferenceRoomBooking conferenceRoomBooking, String specialWishes, float pricing, int empNo, boolean isBusinessCustomer) {
        super(bookingNo, roomNo, timeFrame, dateFrame, bookingDate, hotelRoomBooking, conferenceRoomBooking, specialWishes, pricing, empNo, isBusinessCustomer);
    }
    /**
     * Later on, here will be a method that calculates the price for the conference room, this is done by taking the hours
     * the room is being booked multiplied by the price per hour. Maybe some special stuff like a beamer or else will be added
     * to the calulation.
     */
    public int getPricing(int nights)
    {


        return nights;
    }
}
