package de.fourofakind.businesshotel;

public class Room {
    /**
     * <p>
     * The class room holds all vital information of the rooms, its size, its category and roomnumber,
     * i can also tell whether a room is occupied or not.
     * </p>
     */

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

    /**
     * introduced the RoomStatus here so we can later get an info about whether the room is occupied or not
     *
     **/

    public int roomstatus getRoomStatus() {
        return roomstatus;
    }

    public void setroomstatus(RoomStatus roomstatus) {
        this.roomstatus = roomstatus;
    }

    public void setUsed(boolean used) {
        isUsed = used;
    }

    private Category Category;

    private int areaInSqrMetre;
    private int roomNo;
    private String isUsed = "Room is occupied";
    private String isNotUsed = "Room is free";



}