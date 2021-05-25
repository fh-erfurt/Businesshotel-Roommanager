package de.fourofakind.businesshotel.rooms;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * <p>
 * The class Conferenceroom extends the Room Class and its methods
 * It is used to specify the Room as a ConferenceRoom and sets its specific attributes like the price per hour.
 * </p>
 */
@Entity(name="ConferenceRoom")
@Table(name="conferenceroom")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ConferenceRoom extends Room
{

    public ConferenceRoom (int roomNo, Room.Category category, int areaInSqrMetre, int maxAmountOfParticipants, int amountOfWhiteboards,
                           int amountOfBeamer, boolean hasScreen, boolean hasComputer, boolean hasTV,float pricePerUnit)
    {
        super(roomNo, areaInSqrMetre,pricePerUnit);
        this.category = category;
        this.maxAmountOfParticipants = maxAmountOfParticipants;
        this.amountOfWhiteboards = amountOfWhiteboards;
        this.amountOfBeamer = amountOfBeamer;
        this.hasScreen = hasScreen;
        this.hasComputer = hasComputer;
        this.hasTV= hasTV;
    }

    //Getter/Setter

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

    //Attribues

    private int maxAmountOfParticipants;
    private int amountOfWhiteboards;
    private int amountOfBeamer;
    private boolean hasScreen;
    private boolean hasComputer;
    private boolean hasTV;
    private Room.Category category;



}
