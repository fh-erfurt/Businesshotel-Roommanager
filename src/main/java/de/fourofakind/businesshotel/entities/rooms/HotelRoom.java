package de.fourofakind.businesshotel.entities.rooms;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

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
public class HotelRoom extends Room
{

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

    public int getBedCount ()
    {
        return bedCount;
    }
    public void setBedCount (int bedCount)
    {
        this.bedCount = bedCount;
    }
    public boolean hasSpeedLAN ()
    {
        return hasSpeedLAN;
    }
    public void setHasSpeedLAN (boolean hasSpeedLAN)
    {
        this.hasSpeedLAN = hasSpeedLAN;
    }
    public boolean hasTV ()
    {
        return hasTV;
    }
    public void setHasTV (boolean hasTV)
    {
        this.hasTV = hasTV;
    }
    public boolean hasKitchen ()
    {
        return hasKitchen;
    }
    public void setHasKitchen (boolean hasKitchen)
    {
        this.hasKitchen = hasKitchen;
    }
    public boolean hasCoffeemaker ()
    {
        return hasCoffeemaker;
    }
    public void setHasCoffeemaker (boolean hasCoffeemaker)
    {
        this.hasCoffeemaker = hasCoffeemaker;
    }
    public Room.Category getCategory ()
    {
        return category;
    }
    public void setCategory (Room.Category category)
    {
        this.category = category;
    }

    //Attributes

    private int bedCount;
    private boolean hasSpeedLAN;
    private boolean hasTV;
    private boolean hasKitchen;
    private boolean hasCoffeemaker;
    private Room.Category category;

}
