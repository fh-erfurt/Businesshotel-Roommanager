package de.fourofakind.businesshotel;

public class HotelRoomBooking extends Booking{


    public HotelRoomBooking(int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String bookingDate, HotelRoomBooking hotelRoomBooking, String roomCategory, String specialWishes, float pricing, int empNo, boolean isBusinessCustomer) {
        super(bookingNo, roomNo, timeFrame, dateFrame, bookingDate, hotelRoomBooking, roomCategory, specialWishes, pricing, empNo, isBusinessCustomer);
    }

    public HotelRoomBooking(int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String bookingDate, HotelRoomBooking hotelRoomBooking, ConferenceRoomBooking conferenceRoomBooking, String specialWishes, float pricing, int empNo, boolean isBusinessCustomer) {
        super(bookingNo, roomNo, timeFrame, dateFrame, bookingDate, hotelRoomBooking, conferenceRoomBooking, specialWishes, pricing, empNo, isBusinessCustomer);
    }

    public int getPricing(int nights)
    {
        //hier wird dann noch eine Logik implementiert, die den Preis berechnet.

        return nights;
    }
}
