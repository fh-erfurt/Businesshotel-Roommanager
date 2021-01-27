package de.fourofakind.businesshotel.bookings;

import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;
import de.fourofakind.businesshotel.rooms.Room;
import java.text.DateFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

public class ConferenceRoomBooking extends Booking
{
    /**
     * This class extends the Booking to the kind of room that has been booked, in this case to a conferenceRoom
     */

    public ConferenceRoomBooking (int bookingNo, int customerID, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, Room.Category roomCategory,
                                  String specialWishes, int empNo, boolean isBusinessCustomer)
    {
        super(bookingNo, customerID, roomNo, timeFrame, dateFrame, roomCategory, specialWishes, empNo, isBusinessCustomer);
        this.pricing=calculatePricing();
    }




    /**
     * This method calculates the price for the conference room, to do so, it uses the start and endtime given as timeframe from the Booking.
     * Since TimeFrames contains the starting and ending time as string it is needed to be converted, to use it as a Date, which is needed for the
     * calendar to extract the hours and minutes from the given date. The price is set for each hour, the customer has to pay at least for an hour.
     * After an hour the price can be calculated sharp for every minute if necessary. Therefore the minutes are divided by 60 and added to each
     * start and endtime.
     */
    public float calculatePricing()
    {
            String startTime = getTimeFrame().getStartTime();
            String endTime = getTimeFrame().getEndTime();

            DateFormat format = new SimpleDateFormat("hh:mm");
            Date timeStart = null;
            Date timeEnd = null;
            try
            {
                timeStart = format.parse(startTime);
                timeEnd = format.parse(endTime);
            }
            catch (ParseException pe)
            {
                pe.printStackTrace();
            }
        Calendar calendarStart = Calendar.getInstance();
        calendarStart.setTime(timeStart);
        Calendar calendarEnd = Calendar.getInstance();
        calendarEnd.setTime(timeEnd);

        int hourStart = calendarStart.get(Calendar.HOUR);
        float minuteStart = calendarStart.get(Calendar.MINUTE);

        int hourEnd =   calendarEnd.get(Calendar.HOUR);
        float minuteEnd = calendarEnd.get(Calendar.MINUTE);

        float usageHours = hourEnd+(minuteEnd/60)-(hourStart+(minuteStart/60));
        float price = 0.0f;
        if(usageHours<1)
        {
            price = 12; //#TODO Referenz zum RoomPrice;
        }
        else
        {
            price = usageHours * 12;   //#TODO Preis Verweis auf den Room
        }
            return price;
    }

    public float getPricing ()
    {
        return pricing;
    }

    private float pricing;


}
