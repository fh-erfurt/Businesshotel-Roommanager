package de.fourofakind.businesshotel.bookings;

import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;
import de.fourofakind.businesshotel.rooms.Room;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

public class HotelRoomBooking extends Booking
{

    /**
 * This class extends the Booking to the kind of room that has been booked, in this case to a Hotelroom.
 */

    public HotelRoomBooking (int bookingNo, int customerID,int roomNo, TimeFrame timeFrame, DateFrame dateFrame, Room.Category roomCategory,
                             String specialWishes, int empNo, boolean isBusinessCustomer)
    {
        super(bookingNo, customerID ,roomNo, timeFrame, dateFrame, roomCategory, specialWishes, empNo, isBusinessCustomer);
        this.pricing=this.calculatePricing(pricing = 0.0f); //TODO: braucht noch Pflege
    }





    /**
     * Later on, here will be a method that calculates the price for the conference room, this is done by taking the hours
     * the room is being booked multiplied by the price per hour. Maybe some special stuff like a beamer or else will be added
     * to the calulation.
     */
    public float calculatePricing(float roomPricePerUnit)
    {
            DateTimeFormatter germanFormatter = DateTimeFormatter.ofLocalizedDate(
            FormatStyle.MEDIUM).withLocale(Locale.GERMAN);

            String startDate = getDateFrame().getStartDate();
            String endDate = getDateFrame().getEndDate();

            LocalDate dateStart = LocalDate.parse(startDate, germanFormatter);
            LocalDate dateEnd = LocalDate.parse(endDate, germanFormatter);

            long nightsSpent = ChronoUnit.DAYS.between(dateStart,dateEnd);


            float price = nightsSpent * roomPricePerUnit;   //#TODO Preis verweis auf den Room

        return price;
    }

    public float getPricing ()
    {
        return pricing;
    }


    private float pricing;

}
