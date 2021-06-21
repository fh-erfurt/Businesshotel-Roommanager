package de.fourofakind.businesshotel.server.entities.bookings;

import de.fourofakind.businesshotel.server.entities.rooms.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.time.temporal.ChronoUnit;
import java.util.Locale;
import java.util.Date;


/**
 * This class extends the Booking to the kind of room that has been booked, in this case to a Hotelroom.
 */

@Entity(name="HotelRoomBooking")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@DiscriminatorValue("HotelRoom")
public class HotelRoomBooking extends Booking
{
    //Attributes
    private float pricing;


    //Constructor
    public HotelRoomBooking (int bookingNo, int customerID,int roomNo, Date startDate, Date endDate, Room.Category roomCategory,
                             String specialWishes, int empNo, boolean isBusinessCustomer)
    {
        super(bookingNo, customerID ,roomNo, startDate, endDate, roomCategory, specialWishes, empNo, isBusinessCustomer);
        this.pricing=this.calculatePricing(pricing = 0.0f);
    }

    //Getter/Setter
    public float getPricing ()
    {
        return pricing;
    }

    /**<p>
     * This method calculates the price for the hotel room, to do so, it uses the start and enddate given as dateframe from the Booking.
     * Since Dateframes contain the starting and ending date as string it needs to be converted, to use it as a Date, which is needed for the
     * calculation to count the days from one date to the other date. The customer has to pay at least for an day.
     *
     *@param roomPricePerUnit  Price per Unit refers to the cost of a day renting the HotelRoom. In this case an Unit equals a day
     *                         The price per Unit is saved in the room object itself;
     *</p>
     */



    //Methods
    public float calculatePricing(float roomPricePerUnit)
    {
        DateTimeFormatter germanFormatter = DateTimeFormatter.ofLocalizedDate(
                FormatStyle.MEDIUM).withLocale(Locale.GERMAN);

//            String startDate = getDateFrame().getStartDate();
//            String endDate = getDateFrame().getEndDate();

        Date startDate = getStartDate();
        Date endDate = getEndDate();

//            LocalDate dateStart = LocalDate.parse(startDate, germanFormatter);
//            LocalDate dateEnd = LocalDate.parse(endDate, germanFormatter);

        LocalDate dateStart = convertToLocalDateViaInstant(startDate);
        LocalDate dateEnd = convertToLocalDateViaInstant(endDate);

        long nightsSpent = ChronoUnit.DAYS.between(dateStart,dateEnd);


        return nightsSpent * roomPricePerUnit;
    }

    public LocalDate convertToLocalDateViaInstant(Date dateToConvert) {
        return dateToConvert.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }


}
