package de.fourofakind.businesshotel;

public class ConferenceRoomBooking extends Booking{


    public ConferenceRoomBooking (int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, BookingType bookingType, String roomCategory,
                                  String specialWishes, float pricing, int empNo, IsBusinessCustomer isBusinessCustomer)
    {
        super(bookingNo, roomNo, timeFrame, dateFrame, bookingType, roomCategory, specialWishes, pricing, empNo, isBusinessCustomer);

    }

    /**
     * This class extends the Booking to the kind of room that has been booked, in this case to a conferenceRoom
     */




    public TimeFrame getTimeframe() {
        return timeframe;
    }

    public void setTimeframe(TimeFrame timeframe) {
        this.timeframe = timeframe;
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


    private TimeFrame timeframe;

}
