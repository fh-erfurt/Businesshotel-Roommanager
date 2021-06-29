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
@PrimaryKeyJoinColumn(name = "conference_room_id")
public class ConferenceRoom extends Room
{
    //Attribues
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="conference_room_id")
    private Integer confereneRoomID;
    @Column(name="max_amount_of_participants")
    private int maxAmountOfParticipants;
    @Column(name="amount_of_whiteboards")
    private int amountOfWhiteboards;
    @Column(name="amount_of_beamer")
    private int amountOfBeamer;
    @Column(name="has_screen")
    private boolean hasScreen;
    @Column(name="has_computer")
    private boolean hasComputer;
    @Column(name="amount_of_tv")
    private int amountOfTV;
    private Room.Category category;


    //Mapping
    @OneToOne(mappedBy = "conferenceRoom",optional = false)
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
    //managed by Lombok


}
