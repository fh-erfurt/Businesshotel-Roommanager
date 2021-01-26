package de.fourofakind.businesshotel.rooms;

import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;

public class ConferenceRoom extends Room
{

//    public enum Category {
//        BIGGROUP, SMALLGROUP
//    }

    public ConferenceRoom (int roomNo, Room.Category category, int areaInSqrMetre, int maxAmountOfParticipants, int amountOfWhiteboards,
                           int amountOfBeamer, boolean hasScreen, boolean hasComputer, boolean hasTV)
    {
        super(roomNo, areaInSqrMetre);
        this.category = category;
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





    public int getAmountOfWhiteboards ()
    {
        return amountOfWhiteboards;
    }

    public void setAmountOfWhiteboards (int amountOfWhiteboards)
    {
        this.amountOfWhiteboards = amountOfWhiteboards;
    }

    public int getAmountOfBeamer ()
    {
        return amountOfBeamer;
    }

    public void setAmountOfBeamer (int amountOfBeamer)
    {
        this.amountOfBeamer = amountOfBeamer;
    }

    public boolean hasScreen ()
    {
        return hasScreen;
    }

    public void setHasScreen (boolean hasScreen)
    {
        this.hasScreen = hasScreen;
    }

    public boolean hasComputer ()
    {
        return hasComputer;
    }

    public void setHasComputer (boolean hasComputer)
    {
        this.hasComputer = hasComputer;
    }

    public boolean hasTV ()
    {
        return hasTV;
    }

    public void setHasTV (boolean hasTV)
    {
        this.hasTV = hasTV;
    }

    public Room.Category getCategory ()
    {
        return category;
    }

    public void setCategory (Room.Category category)
    {
        this.category = category;
    }

    private int maxAmountOfParticipants;
    private int amountOfWhiteboards;
    private int amountOfBeamer;

    private boolean hasScreen;
    private boolean hasComputer;
    private boolean hasTV;

    private Room.Category category;



}
