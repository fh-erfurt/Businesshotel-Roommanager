package de.fourofakind.businesshotel.server.entities.rooms;

import de.fourofakind.businesshotel.server.entities.bookings.Booking;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * <p>
 * The class room holds all vital information of the rooms, its size, its category and roomnumber,
 * i can also tell whether a room is occupied or not. It stores the dates and times a room is occupied in a list.
 * Its the superclass of Hotelroom and ConferenceRoom
 * </p>
 */
@Entity(name="Room")
@Table(name="room")
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Room {

    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="room_no")
    private Integer roomNo;
    private float pricePerUnit;
    @Enumerated(EnumType.STRING)
    private Category category;
    private int areaInSqrMetre;

        //Mapping

    @OneToOne
    @JoinColumn(name="room_no", referencedColumnName= "room_no")
    private HotelRoom hotelRoom;
    @OneToOne
    @JoinColumn(name="room_no", referencedColumnName= "room_no")
    private ConferenceRoom conferenceRoom;
    @ManyToMany
    @JoinTable(
            name="room_has_booking",
            joinColumns = @JoinColumn(name="room_no",referencedColumnName="room_no"),
            inverseJoinColumns = @JoinColumn(name="booking_id",referencedColumnName = "booking_no")
    )
    private List<Booking> bookings;

    //Fields
    public enum Category
    {
        SINGLE, DOUBLE, SUITE, BIGGROUP, SMALLGROUP
    }

    //Constructor
    public Room(int roomNo, int areaInSqrMetre, float pricePerUnit) {
        this.areaInSqrMetre = areaInSqrMetre;
        this.roomNo = roomNo;
        this.pricePerUnit = pricePerUnit;
    }

    //Getter/Setter

    //managed by lombok




}
