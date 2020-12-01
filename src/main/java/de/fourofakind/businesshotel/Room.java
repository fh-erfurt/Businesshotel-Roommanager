package de.fourofakind.businesshotel;

public class Room {


    public Room(Category category, int areaInSqrMetre, int roomNo) {
        Category = category;
        this.areaInSqrMetre = areaInSqrMetre;
        this.roomNo = roomNo;
    }

    public Category getCategory() {
        return Category;
    }

    public void setCategory(Category category) {
        Category = category;
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

    public boolean isUsed() {
        return isUsed;
    }

    public void setUsed(boolean used) {
        isUsed = used;
    }

    private Category Category;

    private int areaInSqrMetre;
    private int roomNo;
    private boolean isUsed;



}
