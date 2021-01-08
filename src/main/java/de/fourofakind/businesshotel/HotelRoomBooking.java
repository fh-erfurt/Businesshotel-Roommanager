package de.fourofakind.businesshotel;

public class HotelRoomBooking extends Booking{
    public HotelRoomBooking (int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String roomCategory, String specialWishes,
                             float pricing, int empNo, IsBusinessCustomer isBusinessCustomer)
    {
        super(bookingNo, roomNo, timeFrame, dateFrame, roomCategory, specialWishes, pricing, empNo, isBusinessCustomer);
    }

    /**
     * This class extends the Booking to the kind of room that has been booked, in this case to a Hotelroom.
     */



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
