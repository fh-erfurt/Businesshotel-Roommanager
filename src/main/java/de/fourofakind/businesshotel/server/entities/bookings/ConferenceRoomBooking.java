package de.fourofakind.businesshotel.server.entities.bookings;

import de.fourofakind.businesshotel.server.entities.rooms.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import java.util.Date;

/**
 * This class extends the Booking to the kind of room that has been booked, in this case to a conferenceRoom
 */

@Entity(name="ConferenceRoomBooking")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@DiscriminatorValue("ConferenceRoom")
public class ConferenceRoomBooking extends Booking
{
    public ConferenceRoomBooking (int bookingNo, int customerID, int roomNo, Date startDate, Date endDate, Room.Category roomCategory,
                                  String specialWishes, int empNo, boolean isBusinessCustomer)
    {
        super(bookingNo, customerID, roomNo, startDate, endDate, roomCategory, specialWishes, empNo, isBusinessCustomer);
        //this.pricing=calculatePricing(pricing=0.0f);
    }





    /**<p>
     * This method calculates the price for the conference room, to do so, it uses the start and endtime given as timeframe from the Booking.
     * Since TimeFrames contains the starting and ending time as string it is needed to be converted, to use it as a Date, which is needed for the
     * calendar to extract the hours and minutes from the given date. The price is set for each hour, the customer has to pay at least for an hour.
     * After an hour the price can be calculated sharp for every minute if necessary. Therefore the minutes are divided by 60 and added to each
     * start and endtime.</p>
     * @param roomPricePerUnit  Price per Unit refers to the cost of an hour renting the conferenceRoom. In this case an Unit equals an hour
     *                          The price per Unit is saved in the room object itself;
     *
     */
//    public float calculatePricing(float roomPricePerUnit)
//    {
//        Date startTime = getStartDate();
//        Date endTime = getEndDate();
//
//        DateFormat format = new SimpleDateFormat("hh:mm");
//        Date timeStart = null;
//        Date timeEnd = null;
//        try
//        {
//            timeStart = format.parse(startTime);
//            timeEnd = format.parse(endTime);
//        }
//        catch (ParseException pe)
//        {
//            pe.printStackTrace();
//        }
//        Calendar calendarStart = Calendar.getInstance();
//        assert timeStart != null;
//        calendarStart.setTime(timeStart);
//        Calendar calendarEnd = Calendar.getInstance();
//        assert timeEnd != null;
//        calendarEnd.setTime(timeEnd);
//
//        int hourStart = calendarStart.get(Calendar.HOUR);
//        float minuteStart = calendarStart.get(Calendar.MINUTE);
//
//        int hourEnd =   calendarEnd.get(Calendar.HOUR);
//        float minuteEnd = calendarEnd.get(Calendar.MINUTE);
//
//        float usageHours = hourEnd+(minuteEnd/60)-(hourStart+(minuteStart/60));
//        float price = 0.0f;
//        if(usageHours<1)
//        {
//            price = 12; //#TODO Referenz zum RoomPrice;
//        }
//        else
//        {
//            price = usageHours * roomPricePerUnit;   //#TODO Preis Verweis auf den Room
//        }
//        return price;
//    }

    public float getPricing ()
    {
        return pricing;
    }

    private float pricing;


}
