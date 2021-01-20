package de.fourofakind.businesshotel.rooms;

import de.fourofakind.businesshotel.common.DateFrame;

public class HotelRoom extends Room
{

    public HotelRoom (int roomNo, String category, int areaInSqrMetre, int bedCount, boolean hasSpeedLAN, boolean hasTV, boolean hasKitchen,
                      boolean hasCoffeemaker)
    {
        super(roomNo, category, areaInSqrMetre);
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

    private int bedCount;

    public boolean isHasSpeedLAN ()
    {
        return hasSpeedLAN;
    }

    public void setHasSpeedLAN (boolean hasSpeedLAN)
    {
        this.hasSpeedLAN = hasSpeedLAN;
    }

    public boolean isHasTV ()
    {
        return hasTV;
    }

    public void setHasTV (boolean hasTV)
    {
        this.hasTV = hasTV;
    }

    public boolean isHasKitchen ()
    {
        return hasKitchen;
    }

    public void setHasKitchen (boolean hasKitchen)
    {
        this.hasKitchen = hasKitchen;
    }


    public boolean isHasCoffeemaker ()
    {
        return hasCoffeemaker;
    }

    public void setHasCoffeemaker (boolean hasCoffeemaker)
    {
        this.hasCoffeemaker = hasCoffeemaker;
    }

    private boolean hasSpeedLAN;
    private boolean hasTV;
    private boolean hasKitchen;
    private boolean hasCoffeemaker;
    private DateFrame dateframe;

    public DateFrame getDateframe ()
    {
        return dateframe;
    }

    public void setDateframe (DateFrame dateframe)
    {
        this.dateframe = dateframe;
    }




}
