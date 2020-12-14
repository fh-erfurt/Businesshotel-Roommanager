package de.fourofakind.businesshotel;

public class HotelRoom extends Room{

    public HotelRoom(Category category, int areaInSqrMetre, int roomNo) {
        super(category, areaInSqrMetre, roomNo);
    }

    public int getBedCount() {
        return bedCount;
    }

    public void setBedCount(int bedCount) {
        this.bedCount = bedCount;
    }

    private int bedCount;
}
