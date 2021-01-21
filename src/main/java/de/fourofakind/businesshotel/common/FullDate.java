package de.fourofakind.businesshotel.common;



public class FullDate
{
    public FullDate(DateFrame dateFrame , TimeFrame timeFrame)
    {
        this.dateFrame = dateFrame;
        this.timeFrame = timeFrame;
    }

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


    private TimeFrame timeFrame;
    private DateFrame dateFrame;


}
