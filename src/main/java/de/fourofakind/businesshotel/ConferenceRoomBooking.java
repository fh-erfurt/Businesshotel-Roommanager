package de.fourofakind.businesshotel;

public class ConferenceRoomBooking extends Booking{

    /**
     * This class extends the Booking to the kind of room that has been booked, in this case to a conferenceRoom
     */

    public ConferenceRoomBooking(TimeFrame timeFrame, DateFrame dateFrame, String bookingDate,
                                 ConferenceRoomBooking conferenceRoomBooking, String roomCategory,String specialWishes, float pricing, int empNo, boolean isBusinessCustomer,
                                 TimeFrame timeframe) {
        super(timeFrame, dateFrame, bookingDate, conferenceRoomBooking,roomCategory ,specialWishes, pricing, empNo, isBusinessCustomer);
        this.timeframe = timeframe;
    }



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
