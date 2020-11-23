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

    public void setEmpNo(int EmpNo) {
        this.EmpNo = EmpNo;
    }

    public String getEmpName() {
        return EmpName;
    }

    public void setEmpName(String EmpName) {
        this.EmpName = EmpName;
    }

    private int EmpNo;
    private String EmpName;
}
