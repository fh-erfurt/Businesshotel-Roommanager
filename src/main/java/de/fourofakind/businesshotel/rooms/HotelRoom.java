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

    public int getBedCount () {
        return bedCount;
    }

    public void setBedCount(int bedCount) {
        this.bedCount = bedCount;
    }

    private int bedCount;

    private boolean hasSpeedLAN;
    private boolean hasTV;
    private boolean hasKitchen;
    private boolean hasCoffeemaker;

    public DateFrame getDateframe ()
    {
        return dateframe;
    }

    public void setDateframe (DateFrame dateframe)
    {
        this.dateframe = dateframe;
    }

    private DateFrame dateframe;


}
