package de.fourofakind.businesshotel;

public class Employee
{
    public void createBooking(int RoomNo, DateFrame dateFrame, int EmpNo, TimeFrame timeFrame)
    {

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
