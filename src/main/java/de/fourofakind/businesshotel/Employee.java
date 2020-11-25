package de.fourofakind.businesshotel;

public class Employee
{
    Booking BookingList[];

    public Employee(int empNo, String empName) {
        this.empNo = empNo;
        this.empName = empName;
    }

    public void createBooking(int BookingNo, int RoomNo, TimeFrame timeFrame, DateFrame dateFrame, String bookingDate, String roomCategory, String specialWishes, float pricing, int empNo, boolean isBusinessCustomer)
    {
        BookingList[BookingNo]=new Booking(timeFrame, dateFrame, bookingDate, roomCategory, specialWishes,pricing, empNo,isBusinessCustomer);
    }
    public void changeBooking(int BookingNo)
    {

    }
    public void deleteBooking(int BookingNo)
    {

    }
    public void changeRoomDetails(int RoomNo)
    {

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
