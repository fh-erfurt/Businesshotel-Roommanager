package de.fourofakind.businesshotel.common;

/**
 * <p>
 * This value class implements a "FullDate" as an combination of a timeFrame and a Dateframe, that is used for the RoomOccupationList to be able to
 * check on what date and time a room cannot be booked because its already occupied. This is used for both the conference room and the hotel room,
 * even if a conference room only expects a certain time it now can be fed additionally with a Start and Enddate
 * </p>
 */

public class FullDate
{
    public FullDate(DateFrame dateFrame , TimeFrame timeFrame)
    {
        this.dateFrame = dateFrame;
        this.timeFrame = timeFrame;
    }

    //Getter/Setter

    public DateFrame getDateFrame ()
    {
        return dateFrame;
    }
    public void setDateFrame (DateFrame dateFrame)
    {
        this.dateFrame = dateFrame;
    }
    public TimeFrame getTimeFrame ()
    {
        return timeFrame;
    }
    public void setTimeFrame (TimeFrame timeFrame)
    {
        this.timeFrame = timeFrame;
    }

    //Attributes

    private TimeFrame timeFrame;
    private DateFrame dateFrame;


}
