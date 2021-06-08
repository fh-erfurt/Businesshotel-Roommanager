package de.fourofakind.businesshotel.entities.rooms;

import de.fourofakind.businesshotel.entities.bookings.Booking;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
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
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
abstract public class Room {

    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer roomNo;

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

    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }
    public int getAreaInSqrMetre() {
        return areaInSqrMetre;
    }
    public void setAreaInSqrMetre(int areaInSqrMetre) {
        this.areaInSqrMetre = areaInSqrMetre;
    }
    public int getRoomNo() {
        return roomNo;
    }
    public void setRoomNo(int roomNo) {
        this.roomNo = roomNo;
    }
//    public void setRoomAsFreeToList (Date fullDate)
//    {
//        this.roomOccupationList.remove(fullDate);
//    }
//    public ArrayList<Date> getRoomOccupiedAtList ()
//    {
//        return roomOccupationList;
//    }
//    public void setRoomAsOccupiedToList (Date fullDate)
//    {
//        this.roomOccupationList.add(fullDate);
//    }
    public float getPricePerUnit ()
    {
        return pricePerUnit;
    }
    public void setPricePerUnit (float pricePerUnit)
    {
        this.pricePerUnit = pricePerUnit;
    }

    //Attributes

    private float pricePerUnit;
//    private ArrayList<Date> roomOccupationList = new ArrayList<Date>();


}
