package de.fourofakind.businesshotel;

public class Employee
{
    public void createBooking(int RoomNo, String StartDate, String EndDate, int EmpNo, String TimeFrame)
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
        return EmpNo;
    }

    public void setEmpNo(int empNo) {
        EmpNo = empNo;
    }

    public String getEmpName() {
        return EmpName;
    }

    public void setEmpName(String empName) {
        EmpName = empName;
    }

    private int EmpNo;
    private String EmpName;
}
