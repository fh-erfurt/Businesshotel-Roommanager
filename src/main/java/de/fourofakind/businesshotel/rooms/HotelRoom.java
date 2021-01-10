package de.fourofakind.businesshotel.rooms;

public class HotelRoom extends Room
{

    public HotelRoom (int roomNo, String category, int areaInSqrMetre, int bedCount)
    {
        super(roomNo, category, areaInSqrMetre);
        this.bedCount = bedCount;
    }

    public int getBedCount () {
        return bedCount;
    }

    public void setBedCount(int bedCount) {
        this.bedCount = bedCount;
    }

    private int bedCount;
}
