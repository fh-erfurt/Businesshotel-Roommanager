package de.fourofakind.businesshotel;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

import static de.fourofakind.businesshotel.StartingClass.BookingList;
import static de.fourofakind.businesshotel.StartingClass.RoomList;


/**
 * This is our main actor in our application for now. It maintains Bookings and Rooms and interacts with Customers.
 *
 */

public class Employee
{
    DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime currentDateTime = LocalDateTime.now();    //simple implementation of the current datetime, won't be present when working with a
                                                            // database

    public Employee(int empNo, String empName) {
        this.empNo = empNo;
        this.empName = empName;
    }

    /**
    * <p>Implementation of the Employee's ability to create Bookings for Customers
    * uses getEmpNo to automatically add the employee's number and always the current date to ensure the right date is stored to bookingDate
    * </p>
    * @param bookingNo Number of the Booking as well as its position inside BookingList
    * @param roomNo Number of the Room which is used as well as its position inside RoomList
    * @param timeFrame the time span in which the corresponding room will be used;
    *                  should contain fixed time spans for hotel rooms and variable time spans for conference rooms
    * @param dateFrame the date span for one or multiple days, of which a room is blocked;
    *                  should allow variable date spans for both types of rooms as a conference room could be used for a congress for multiple days
    *                  and a hotel room can be used for one or multiple nights
    * @param roomCategory Description of the time of room, should be Suite, Single Room or Double Room for hotel rooms or Little Group or Big Group
    *                     for conference rooms
    * @param specialWishes contains any special wishes made by a customer, could be an extra bed, room service or wake up service in the morning
    * @param pricing is bound to the room and the amount of time it is used for;
    *                will be generated when creating a booking by the corresponding getPricing method of the Booking class
    * @param isBusinessCustomer marks the booking to be requested by a business customer or for personal use;
    *                           important for generation of bills and taxes to be used

    */
    public void createBooking(int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame, String roomCategory,
                              String specialWishes, float pricing, boolean isBusinessCustomer)
    {
      String bookingDate=dateTimeFormat.format(currentDateTime);
      Booking createdBooking= new Booking(bookingNo, roomNo, timeFrame, dateFrame, bookingDate, roomCategory,
              specialWishes, pricing, this.getEmpNo(), isBusinessCustomer);
      RoomList.get(roomNo).setUsed(true);
      BookingList.add(createdBooking);
    }


    /**
     * <p>Implementation of the Employee's ability to change one or multiple attributes of a Booking
     * same params as createBooking, but some can be null-like values, if they should not be changed</p>
     * @param bookingNo Number of the Booking as well as its position inside BookingList
     * @param roomNo Number of the Room which is used as well as its position inside RoomList
     * @param timeFrame the time span in which the corresponding room will be used;
     *                  should contain fixed time spans for hotel rooms and variable time spans for conference rooms
     * @param dateFrame the date span for one or multiple days, of which a room is blocked;
     *                  should allow variable date spans for both types of rooms as a conference room could be used for a congress for multiple days
     *                  and a hotel room can be used for one or multiple nights
     * @param specialWishes contains any special wishes made by a customer, could be an extra bed, room service or wake up service in the morning
     * @param pricing is bound to the room and the amount of time it is used for;
     *                will be generated when creating a booking by the corresponding getPricing method of the Booking class
     * @param isBusinessCustomer marks the booking to be requested by a business customer or for personal use;
     *                           important for generation of bills and taxes to be used
     *
     *
     */
    public void changeBooking(int bookingNo, int roomNo, TimeFrame timeFrame, DateFrame dateFrame,
                              String specialWishes, float pricing, boolean isBusinessCustomer)
    {
        Booking toBeChangedBooking= BookingList.get(bookingNo);
        if (roomNo!=0) toBeChangedBooking.setRoomNo(roomNo);
        if (timeFrame!=null) toBeChangedBooking.setTimeFrame(timeFrame);
        if (dateFrame!=null) toBeChangedBooking.setDateFrame(dateFrame);
        if (specialWishes!=null) toBeChangedBooking.setSpecialWishes(specialWishes);
        if (pricing!=0.0f) toBeChangedBooking.setPricing(pricing);
        toBeChangedBooking.setBusinessCustomer(isBusinessCustomer); //

    }


    /**
     * <p>Implementation of the Employee's ability to delete a Booking by its booking number
     * does not use the remove method of the ArrayList to keep the relation of the position of a booking in BookingList  to its bookingNo </p>
     * @param bookingNo Number of the Booking as well as its position inside BookingList
     */
    public void deleteBooking(int bookingNo)
    {

        int roomNumberOfRoomToBeFree= BookingList.get(bookingNo).getRoomNo();
        Room roomToBeFree =RoomList.get(roomNumberOfRoomToBeFree);
        roomToBeFree.setUsed(false);
        BookingList.set(bookingNo,null);    //instead of remove() to keep the relation of the position of a booking in BookingList  to its bookingNo

    }

    /**
     * <p>Implementation of the Employee's ability to change attributes of a room to save details of real world changes to the room
     * does not change the number of a room or its use case (hotel room or conference room)</p>
     * @param roomNo Number of the room which is to be changed;
     *               provides the index of the room inside RoomList
     */
    public void changeRoomDetails(int roomNo, Category category, int areaInSqrMetre)
    {
        Room toBeChangedRoom=RoomList.get(roomNo);
        if (category!=null) toBeChangedRoom.setCategory(category);
        if (areaInSqrMetre!=0) toBeChangedRoom.setAreaInSqrMetre(areaInSqrMetre);

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
