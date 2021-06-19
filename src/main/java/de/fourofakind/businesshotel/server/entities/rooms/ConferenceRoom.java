package de.fourofakind.businesshotel.server.entities.rooms;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

/**
 * <p>
 * The class Conferenceroom extends the Room Class and its methods
 * It is used to specify the Room as a ConferenceRoom and sets its specific attributes like the price per hour.
 * </p>
 */
@Entity(name="ConferenceRoom")
@Table(name="conference_room")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@PrimaryKeyJoinColumn(name = "room_no")
public class ConferenceRoom extends Room
{
    //Attribues

    private int maxAmountOfParticipants;
    private int amountOfWhiteboards;
    private int amountOfBeamer;
    private boolean hasScreen;
    private boolean hasComputer;
    private int amountOfTV;
    private Room.Category category;

    //Mapping

    @Column(name="room_no")
    private Integer roomNo;
    @OneToOne(mappedBy = "conferenceRoom")
    private Room room;


    //Constructors
    public ConferenceRoom (int roomNo, Room.Category category, int areaInSqrMetre, int maxAmountOfParticipants, int amountOfWhiteboards,
                           int amountOfBeamer, boolean hasScreen, boolean hasComputer, int amountOfTV,float pricePerUnit)
    {
        super(roomNo, areaInSqrMetre,pricePerUnit);
        this.category = category;
        this.maxAmountOfParticipants = maxAmountOfParticipants;
        this.amountOfWhiteboards = amountOfWhiteboards;
        this.amountOfBeamer = amountOfBeamer;
        this.hasScreen = hasScreen;
        this.hasComputer = hasComputer;
        this.amountOfTV= amountOfTV;
    }

    //Getter/Setter

    public Room.Category getCategory ()
    {
        return category;
    }
    public void setCategory (Room.Category category)
    {
        this.category = category;
    }




}
