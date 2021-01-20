package de.fourofakind.businesshotel.rooms;

import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;

public class ConferenceRoom extends Room
{

    public ConferenceRoom (int roomNo, String category, int areaInSqrMetre, int maxAmountOfParticipants, int amountOfWhiteboards,
                           int amountOfBeamer, boolean hasScreen, boolean hasComputer, boolean hasTV)
    {
        super(roomNo, category, areaInSqrMetre);
        this.maxAmountOfParticipants = maxAmountOfParticipants;
        this.amountOfWhiteboards = amountOfWhiteboards;
        this.amountOfBeamer = amountOfBeamer;
        this.hasScreen = hasScreen;
        this.hasComputer = hasComputer;
        this.hasTV= hasTV;
    }

    public int getMaxAmountOfParticipants () {
        return maxAmountOfParticipants;
    }

    public void setMaxAmountOfParticipants(int maxAmountOfParticipants) {
        this.maxAmountOfParticipants = maxAmountOfParticipants;
    }

    private int maxAmountOfParticipants;
    private int amountOfWhiteboards;
    private int amountOfBeamer;
    private boolean hasScreen;
    private boolean hasComputer;
    private boolean hasTV;
    private DateFrame dateFrame;
    private TimeFrame timeFrame;

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






}
