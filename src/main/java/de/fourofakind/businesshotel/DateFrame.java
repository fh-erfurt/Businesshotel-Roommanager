package de.fourofakind.businesshotel;
/**
 * <p>
 * @DateFrame is a value-class that stores the starting date of a booking and its ending date.
 * Setter/Getter for the DateFrame to set or maybe reset the TimeFrame of booking.
 * The format of the startDate and the endDate must be as follows: dd.mm.yyyy e.g.(15.03.2020)
 * Consider to add some sort of error-detection into input-phase.
 * </p>
 */

public class DateFrame {

    public DateFrame(String startDate, String endDate)
    {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }


    private String startDate;
    private String endDate;
}
