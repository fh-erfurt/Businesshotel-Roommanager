package de.fourofakind.businesshotel;

public class Employee
{

    public Employee(int empNo, String empName) {
        this.empNo = empNo;
        this.empName = empName;
    }

    public Booking createBooking(int BookingNo, int RoomNo, TimeFrame timeFrame, DateFrame dateFrame, String bookingDate, String roomCategory, String specialWishes, float pricing, int empNo, boolean isBusinessCustomer)
    {
        Booking completeBooking =new Booking(timeFrame, dateFrame, bookingDate, roomCategory, specialWishes,pricing, empNo,isBusinessCustomer);
        return completeBooking;
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
