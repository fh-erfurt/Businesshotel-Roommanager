package de.fourofakind.businesshotel;


import java.util.ArrayList;

class StartKlasse {



    public static void main(String[] args)
    {
        ArrayList<Booking> BookingList= new ArrayList<>();

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
      Booking completeBooking= Employee1.createBooking(1,1,zwoelfBisMittag,Heute,"Heute",
              "egal","Jacuzzi",5.03f,Employee1.getEmpNo(), false);
      BookingList.add(completeBooking);
    }
}
