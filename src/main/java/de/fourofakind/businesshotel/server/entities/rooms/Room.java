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
@DiscriminatorColumn(name = "room_type")
public class Room {

    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="room_no")
    private Integer roomNo;
    @Column(name="price_per_unit")
    private float pricePerUnit;
    @Enumerated(EnumType.STRING)
    private Category category;
    @Column(name="area_in_sqr_metre")
    private int areaInSqrMetre;
    @Enumerated(EnumType.STRING)
    @Column(name="room_type")
    private RoomType roomType;

    //Mappings
    @OneToOne
    @JoinColumn(name="room_no", referencedColumnName="hotel_room_id",insertable = false,updatable = false)
    private HotelRoom hotelRoom;
    @OneToOne
    @JoinColumn(name="room_no", referencedColumnName="conference_room_id",insertable = false,updatable = false)
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

    public enum RoomType
    {
        HOTELROOM, CONFERENCEROOM
    }

    //Constructor

    public Room (float pricePerUnit, Category category, int areaInSqrMetre, RoomType roomType)
    {
        this.pricePerUnit = pricePerUnit;
        this.category = category;
        this.areaInSqrMetre = areaInSqrMetre;
        this.roomType = roomType;
    }


    //Getter/Setter
    //managed by lombok




}
