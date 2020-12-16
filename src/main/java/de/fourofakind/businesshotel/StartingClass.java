package de.fourofakind.businesshotel;

import java.util.ArrayList;

class StartingClass
{

    public static ArrayList<Booking> BookingList= new ArrayList<>();
    public static ArrayList<Room> RoomList = new ArrayList<>();
    public static ArrayList<Employee> EmployeeList= new ArrayList<>();


    public static void main(String[] args)
    {
    BookingList.add(null); // BookingNo beginning at 1
    RoomList.add(null); //RoomNo beginning at 1
    EmployeeList.add(null); //EmployeeNo beginning at 1

    //Buchungen zum Listen füllen



    //Births

      Employee Employee1=new Employee("Herbert Schmidt");
      Employee Employee2=new Employee("Laura Müller");
      Employee Employee3=new Employee("Bärbel Schäfer");
      Employee Employee4=new Employee("Torsten Hillmann");
      Employee Employee5=new Employee("Sigrid Alster");

      //Example TimeFrame & DateFrame
      TimeFrame zwoelfBisMittag= new TimeFrame("zwölf","mittag");
      DateFrame Heute=new DateFrame("Heute","Heute");

      //Example Booking including BookingList entry
      Employee1.createBooking(1,zwoelfBisMittag,Heute,"egal","Jacuzzi",5.03f, false);
      Employee1.changeBooking(0,0,null,null,
              null,0.0f, false);
      Employee1.deleteBooking(0);
    }
}
