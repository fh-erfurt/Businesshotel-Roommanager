package de.fourofakind.businesshotel.server.entities.rooms;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

/**
 * <p>
 * The class HotelRoom extends the Room Class and its methods
 * It is used to specify the Room as a Hotelroom and sets its specific attributes like the price per night
 * Since you cannot create an instance of the Room-class itself the employee can only create instances of the Hotelroom or the ConferenceRoom
 * instead.
 * </p>
 */
@Entity(name="HotelRoom")
@Table(name="hotel_room")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@DiscriminatorValue("HOTELROOM")
@PrimaryKeyJoinColumn(name = "hotel_room_id")
public class HotelRoom extends Room
{

    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="hotel_room_id")
    private Integer hotelRoomID;
    @Column(name="bed_count")
    private int bedCount;
    @Column(name="has_speed_lan")
    private boolean hasSpeedLAN;
    @Column(name="has_tv")
    private boolean hasTV;
    @Column(name="has_kitchen")
    private boolean hasKitchen;
    @Column(name="has_coffeemaker")
    private boolean hasCoffeemaker;
    private Room.Category category;

    //Mappings
    @JsonIgnore
    @OneToOne(mappedBy = "hotelRoom",optional = false)
    private Room room;

    //Constructors
    public HotelRoom (int roomNo, Room.Category category, int areaInSqrMetre, int bedCount, boolean hasSpeedLAN, boolean hasTV, boolean hasKitchen,
                      boolean hasCoffeemaker,float pricePerUnit)
    {
        super(roomNo, areaInSqrMetre,pricePerUnit);
        this.category = category;
        this.bedCount = bedCount;
        this.hasSpeedLAN = hasSpeedLAN;
        this.hasTV = hasTV;
        this.hasKitchen = hasKitchen;
        this.hasCoffeemaker = hasCoffeemaker;
    }

    //Getter/Setter
    //managed by Lombok



}
