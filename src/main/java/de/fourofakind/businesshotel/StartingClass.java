package de.fourofakind.businesshotel;


import java.lang.reflect.Array;
import java.util.ArrayList;

class StartingClass
{

    public static ArrayList<Booking> BookingList= new ArrayList<>();
    public static ArrayList<Room> RoomList = new ArrayList<>();


    public static void main(String[] args)
    {
    BookingList.add(null); // Buchungsnummern beginnen ab 1
    RoomList.add(null); //Raumnummer beginnen ab 1

    //Buchungen zum Listen füllen



    //Geburten

      Employee Employee1=new Employee(1,"Herbert Schmidt");
      Employee Employee2=new Employee( 2, "Laura Müller");
      Employee Employee3=new Employee( 3, "Bärbel Schäfer");
      Employee Employee4=new Employee(4,"Torsten Hillmann");
      Employee Employee5=new Employee(5,"Sigrid Alster");

      //Beispiel TimeFrame & DateFrame
      TimeFrame zwoelfBisMittag= new TimeFrame("zwölf","mittag");
      DateFrame Heute=new DateFrame("Heute","Heute");

      //Beispielbuchung und zugehöriger BookingList - Eintrag
      Employee1.createBooking(0,1,zwoelfBisMittag,Heute,"egal","Jacuzzi",5.03f, false);
      Employee1.changeBooking(0,0,null,null,
              null,0.0f, false);
      Employee1.deleteBooking(0);
    }
}
