package de.fourofakind.businesshotel.rooms;

import de.fourofakind.businesshotel.common.DateFrame;

import java.util.ArrayList;



public class HotelRoom extends Room
{

    public enum Category {
        SINGLE, DOUBLE, SUITE
    }

    public HotelRoom (int roomNo, Category category, int areaInSqrMetre, int bedCount, boolean hasSpeedLAN, boolean hasTV, boolean hasKitchen,
                      boolean hasCoffeemaker)
    {
        super(roomNo, areaInSqrMetre);
        this.category = category;
        this.bedCount = bedCount;
        this.hasSpeedLAN = hasSpeedLAN;
        this.hasTV = hasTV;
        this.hasKitchen = hasKitchen;
        this.hasCoffeemaker = hasCoffeemaker;
    }


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

    private int bedCount;
    private boolean hasSpeedLAN;
    private boolean hasTV;
    private boolean hasKitchen;
    private boolean hasCoffeemaker;

    private DateFrame dateframe;
    public DateFrame getDateframe ()
    {
        return dateframe;
    }

    public Category getCategory ()
    {
        return category;
    }

    public void setCategory (Category category)
    {
        this.category = category;
    }

    private Category category;

    public void setDateframe (DateFrame dateframe)
    {
        this.dateframe = dateframe;
    }




}
