package de.fourofakind.businesshotel.bookings;

import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;

public class HotelRoomBooking extends Booking
{

    /**
 * This class extends the Booking to the kind of room that has been booked, in this case to a Hotelroom.
 */

    public HotelRoomBooking (int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String roomCategory, String specialWishes, int empNo, IsBusinessCustomer isBusinessCustomer)
    {
        super(bookingNo, roomNo, timeFrame, dateFrame, roomCategory, specialWishes, empNo, isBusinessCustomer);
        this.pricing=this.calculatePricing(0); //TODO: braucht noch Pflege
    }





    /**
     * Later on, here will be a method that calculates the price for the conference room, this is done by taking the hours
     * the room is being booked multiplied by the price per hour. Maybe some special stuff like a beamer or else will be added
     * to the calulation.
     */
    public float calculatePricing(int nights)
    {
            //TODO:Algorithmus

        return 0.0f;
    }

    public float getPricing ()
    {
        return pricing;
    }


    private float pricing;

}
