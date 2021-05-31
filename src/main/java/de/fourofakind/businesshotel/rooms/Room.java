package de.fourofakind.businesshotel.rooms;

import de.fourofakind.businesshotel.common.FullDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;

/**
 * <p>
 * The class room holds all vital information of the rooms, its size, its category and roomnumber,
 * i can also tell whether a room is occupied or not. It stores the dates and times a room is occupied in a list.
 * Its the superclass of Hotelroom and ConferenceRoom
 * </p>
 */
@Entity(name="Room")
@Table(name="room")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
abstract public class Room {

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
    public void setRoomAsFreeToList(FullDate fullDate)
    {
        this.roomOccupationList.remove(fullDate);
    }
    public ArrayList<FullDate> getRoomOccupiedAtList ()
    {
        return roomOccupationList;
    }
    public void setRoomAsOccupiedToList (FullDate fullDate)
    {
        this.roomOccupationList.add(fullDate);
    }
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
    private ArrayList<FullDate> roomOccupationList = new ArrayList<FullDate>();

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer roomNo;

    private Category category;
    private int areaInSqrMetre;
    public enum Category {
        SINGLE, DOUBLE, SUITE, BIGGROUP, SMALLGROUP
    }
}
