package de.fourofakind.businesshotel.common;
/**
 * <p>
 * @TimeFrame is a value-class that stores the starting time of a booking and its ending time.
 * Setter/Getter for the TimeFrame to set or maybe reset the TimeFrame of booking.
 * The format of the startTime and the endTime must be as following: HH:HH e.g.(12:30)
 * Consider to add some sort of error-detection into input-phase.
 * </p>
 */


public class TimeFrame {

    public TimeFrame(String startTime, String endTime)
    {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    //Getter/Setter

    public String getStartTime() {
        return startTime;
    }
    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }
    public String getEndTime() {
        return endTime;
    }
    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    //Attributes

    private String startTime;
    private String endTime;
}
