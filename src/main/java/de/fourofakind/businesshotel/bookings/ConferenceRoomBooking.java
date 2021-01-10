package de.fourofakind.businesshotel.bookings;

import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;

public class ConferenceRoomBooking extends Booking
{
    /**
     * This class extends the Booking to the kind of room that has been booked, in this case to a conferenceRoom
     */

    public ConferenceRoomBooking (int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String roomCategory, String specialWishes,
                                  float pricing, int empNo, IsBusinessCustomer isBusinessCustomer)
    {
        super(bookingNo, roomNo, timeFrame, dateFrame, roomCategory, specialWishes, pricing, empNo, isBusinessCustomer);
    }




    /**
     * Later on, here will be a method that calculates the price for the conference room, this is done by taking the hours
     * the room is being booked multiplied by the price per hour. Maybe some special stuff like a beamer or else will be added
     * to the calulation.
     */
    public float getPricing(float hours)
    {
    //hier wird dann noch eine Logik implementiert, die den Preis berechnet.

    return hours;
    }




}
