package de.fourofakind.businesshotel;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

import static de.fourofakind.businesshotel.StartKlasse.BookingList;
import static de.fourofakind.businesshotel.StartKlasse.RoomList;

public class Employee
{
    DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime currentDateTime = LocalDateTime.now();

    public Employee(int empNo, String empName) {
        this.empNo = empNo;
        this.empName = empName;
    }

    public void createBooking(int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String roomCategory,
                              String specialWishes, float pricing, boolean isBusinessCustomer)
    {
      String bookingDate=dateTimeFormat.format(currentDateTime);
      Booking createdBooking= new Booking(bookingNo, roomNo, timeFrame, dateFrame, bookingDate, roomCategory,
              specialWishes, pricing, this.getEmpNo(), isBusinessCustomer);
      RoomList.get(roomNo).setUsed(true);
      BookingList.add(createdBooking);
    }
    public void changeBooking(int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String roomCategory,
                              String specialWishes, float pricing, boolean isBusinessCustomer)
    {
        Booking toBeChangedBooking= BookingList.get(0);
        if (bookingNo!=0) toBeChangedBooking.setBookingNo(bookingNo);
        if (roomNo!=0) toBeChangedBooking.setRoomNo(roomNo);
        if (timeFrame!=null) toBeChangedBooking.setTimeFrame(timeFrame);
        if (dateFrame!=null) toBeChangedBooking.setDateFrame(dateFrame);
        if (roomCategory!=null) toBeChangedBooking.setRoomCategory(roomCategory);
        if (specialWishes!=null) toBeChangedBooking.setSpecialWishes(specialWishes);
        if (pricing!=0.0f) toBeChangedBooking.setPricing(pricing);
        toBeChangedBooking.setBusinessCustomer(isBusinessCustomer); //

    }
    public void deleteBooking(int BookingNo)
    {

        int roomNumberOfRoomToBeFree= BookingList.get(BookingNo).getRoomNo();
        Room roomToBeFree =RoomList.get(roomNumberOfRoomToBeFree);
        roomToBeFree.setUsed(false);
        BookingList.set(BookingNo,null);    //Vorerst als Ersatz für das Remove, damit die Position innerhalb der Liste
                                            // mit der Buchungsnummer übereinstimmt

    }
    public void changeRoomDetails(int RoomNo, String category, int AreaInSqrMetre)
    {
        Room toBeChangedRoom=RoomList.get(RoomNo);
        if (category!=null) toBeChangedRoom.setCategory(category);
        if (AreaInSqrMetre!=0) toBeChangedRoom.setAreaInSqrMetre(AreaInSqrMetre);

    }

    public int getEmpNo()
    {
        return empNo;
    }

    public void setEmpNo(int empNo) {
        this.empNo = empNo;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    private int empNo;
    private String empName;
}
