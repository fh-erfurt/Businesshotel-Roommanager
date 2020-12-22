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
      EmployeeList.add(Employee1);
      Employee Employee2=new Employee("Laura Müller");
      EmployeeList.add(Employee2);
      Employee Employee3=new Employee("Bärbel Schäfer");
      EmployeeList.add(Employee3);
      Employee Employee4=new Employee("Torsten Hillmann");
      EmployeeList.add(Employee4);
      Employee Employee5=new Employee("Sigrid Alster");
      EmployeeList.add(Employee5);
      //Example TimeFrame & DateFrame
      TimeFrame zwoelfBisMittag= new TimeFrame("zwölf","mittag");
      DateFrame Heute=new DateFrame("Heute","Heute");
      Category Suite= new Category();
      Room TestRoom = new Room(Suite,20,1);

      RoomList.add(TestRoom);

      //Example Booking including BookingList entry
      Employee1.createBooking(1,zwoelfBisMittag,Heute,"egal","Jacuzzi",5.03f, false);
      Employee1.changeBooking(1,0,null,null,
              null,0.0f, false);
      Employee1.deleteBooking(1);
    }
}
