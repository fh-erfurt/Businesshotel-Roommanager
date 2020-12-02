package de.fourofakind.businesshotel;

public class ConferenceRoomBooking extends Booking{


    public ConferenceRoomBooking(TimeFrame timeFrame, DateFrame dateFrame, String bookingDate, ConferenceRoomBooking conferenceRoomBooking, String roomCategory,String specialWishes, float pricing, int empNo, boolean isBusinessCustomer, TimeFrame timeframe) {
        super(timeFrame, dateFrame, bookingDate, conferenceRoomBooking,roomCategory ,specialWishes, pricing, empNo, isBusinessCustomer);
        this.timeframe = timeframe;
    }

    public ConferenceRoomBooking(TimeFrame timeFrame, DateFrame dateFrame, String bookingDate, HotelRoomBooking hotelRoomBooking, ConferenceRoomBooking conferenceRoomBooking, String specialWishes, float pricing, int empNo, boolean isBusinessCustomer, TimeFrame timeframe) {
        super(timeFrame, dateFrame, bookingDate, hotelRoomBooking, conferenceRoomBooking, specialWishes, pricing, empNo, isBusinessCustomer);
        this.timeframe = timeframe;
    }

    public TimeFrame getTimeframe() {
        return timeframe;
    }

    public void setTimeframe(TimeFrame timeframe) {
        this.timeframe = timeframe;
    }

    public float getPricing(float hours)
    {
    //hier wird dann noch eine Logik implementiert, die den Preis berechnet.

    return hours;
    }


    private TimeFrame timeframe;

}
