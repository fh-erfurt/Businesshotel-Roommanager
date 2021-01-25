package de.fourofakind.businesshotel.rooms;
import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.FullDate;
import de.fourofakind.businesshotel.common.TimeFrame;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.ArrayList;


abstract public class Room {
    /**
     * <p>
     * The class room holds all vital information of the rooms, its size, its category and roomnumber,
     * i can also tell whether a room is occupied or not.
     * </p>
     */

    public Room(int roomNo, int areaInSqrMetre) {
//        this.category = category;
        this.areaInSqrMetre = areaInSqrMetre;
        this.roomNo = roomNo;
    }

//    public String getCategory() {
//        return category;
//    }

//    public void setCategory(String category) {
//        this.category = category;
//    }

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

    public ArrayList<FullDate> getRoomOccupiedAtList ()
    {
        return roomOccupationList;
    }

    public void setRoomAsOccupiedToList (FullDate fullDate)
    {
        this.roomOccupationList.add(fullDate);

    }

    private ArrayList<FullDate> roomOccupationList = new ArrayList<FullDate>();
    private int roomNo;
//    private String category;
    private int areaInSqrMetre;
    private boolean isUsed;



}
