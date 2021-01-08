package de.fourofakind.businesshotel;

public class Room {
    /**
     * <p>
     * The class room holds all vital information of the rooms, its size, its category and roomnumber,
     * i can also tell whether a room is occupied or not.
     * </p>
     */

    public Room(int roomNo, String category, int areaInSqrMetre) {
        this.category = category;
        this.areaInSqrMetre = areaInSqrMetre;
        this.roomNo = roomNo;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
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

    public boolean isUsed() {
        return isUsed;
    }

    public void setUsed(boolean used) {
        isUsed = used;
    }

    private int roomNo;
    private String category;
    private int areaInSqrMetre;


  
    private boolean isUsed;



}
