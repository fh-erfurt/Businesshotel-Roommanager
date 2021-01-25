package de.fourofakind.businesshotel;

import de.fourofakind.businesshotel.bookings.Booking;
import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.FullDate;
import de.fourofakind.businesshotel.common.TimeFrame;
import de.fourofakind.businesshotel.employees.Employee;
import de.fourofakind.businesshotel.rooms.ConferenceRoom;
import de.fourofakind.businesshotel.rooms.HotelRoom;
import de.fourofakind.businesshotel.rooms.Room;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static de.fourofakind.businesshotel.common.StartingClass.*;

public class RoomTestClass
{

    //Setup for Tests
    Employee Mitarbeiter1 = new Employee("Mitarbeiter1",RoomAdministrator);
    Room NullRoom = Mitarbeiter1.createHotelRoom(0, HotelRoom.Category.SINGLE,60,2,true,true,false,true);
    Room newHotelRoom = Mitarbeiter1.createHotelRoom(1, HotelRoom.Category.DOUBLE,60,2,true,true,false,true);
    Room newConferenceRoom = Mitarbeiter1.createConferenceRoom(2, ConferenceRoom.Category.BIGGROUP,45,12,2,1,true,false,false);
    DateFrame christmasHoliday = new DateFrame("23.12.2021", "27.12.2021");
    DateFrame newYearsEveHoliday = new DateFrame("30.12.2021", "02.01.2022");
    TimeFrame fromEightToTen = new TimeFrame("08:00", "22:00");
    FullDate dateOfOccupationChristmas = new FullDate( christmasHoliday, fromEightToTen);
    FullDate dateOfOccupationNewYear = new FullDate( newYearsEveHoliday, fromEightToTen);

    @Test
    public void IsCreatedHotelRoomInstanceOfRoom()
    {
        assertTrue(newHotelRoom instanceof Room,"Should give createdHotelroom as Instance of Room");
    }

    @Test
    public void IsCreatedConferenceRoomInstanceOfRoom()
    {
        assertTrue(newConferenceRoom instanceof Room,"Should give createdConferenceroom as Instance of Room");
    }

    @Test
    public void shouldGiveHotelRoomDetailsWhenSuccessful()
    {
        Rooms.add(newHotelRoom);
        assertTrue(Rooms.get(0).getRoomNo()==7, "Should be 7 as the room was created with this RoomNo");
        //assertTrue(Rooms.get() ? true : false, "Should give the Category of the Room as it is set");
        assertTrue(Rooms.get(0).getAreaInSqrMetre()==60 ? true : false, "Should give true if the area is the same set earlier for the Room");
        //still impossible to access the methods of its child

    }

    @Test
    public void shouldGiveRoomOccupationDetails()
    {
    newHotelRoom.setRoomAsOccupiedToList(dateOfOccupationChristmas);
    newHotelRoom.setRoomAsOccupiedToList(dateOfOccupationNewYear);
    ArrayList<FullDate> results = newHotelRoom.getRoomOccupiedAtList();
    results.forEach((Date -> System.out.println(Date.getDateFrame().getStartDate())));
    String StartDate = results.get(0).getDateFrame().getStartDate();
    String EndDate = results.get(0).getDateFrame().getEndDate();
    String StartTime = results.get(0).getTimeFrame().getStartTime();
    String EndTime = results.get(0).getTimeFrame().getEndTime();

    System.out.println("Dates stored in List: " + results.size());

    assertEquals(2,results.size(),"Should give 2 cause there are 2 Dates saved to the List");
    assertEquals("23.12.2021" , StartDate, "Should give StartDate equal to ensure the used-status right to the room");
    assertEquals("27.12.2021" , EndDate, "Should give EndDate equal to ensure the used-status right to the room");
    assertEquals("08:00" , StartTime, "Should give Starttime equal to ensure the used-status right to the room");
    assertEquals("22:00" , EndTime, "Should give EndTime equal to ensure the used-status right to the room");

        //assertEquals(expectedResult,result,"If the Booking is created according to the details, all details will be told.");
    }

    @Test
    public void DeleteRoomsTest()
    {
        Rooms.forEach(room -> System.out.print(room.getRoomNo()));
        int roomsBeforeDeletion = Rooms.size();
        System.out.println();
        System.out.println("RoomCountBefore: "+ roomsBeforeDeletion);
        System.out.println("Is Employee a RoomAdmin: " + Mitarbeiter1.getGivenRole().isEnabledToManageRooms());

        Mitarbeiter1.deleteRoom(2);
        int roomsAfterDeletion = Rooms.size();
        System.out.println("RoomCountAfter: " + roomsAfterDeletion);
        Rooms.forEach(room -> System.out.print(room.getRoomNo()));








    }





    //wie in der Gruppe besprochen,: sinnvolle Tests für Employee.createRoom(), Employee.deleteRoom() und Employee.changeRoomDetails() erstellen,
    //am besten in einer RoomTestClass



    /*Rooms.add(newConferenceRoom);
        System.out.println(Rooms.get(0).getAreaInSqrMetre());

    //int result = Rooms.get(Rooms.indexOf()).getRoomNo();

        for(int i = 0; i < Rooms.size(); i++)
    {
        System.out.println(Rooms.get(i).getRoomNo());
    }

    //System.out.println(Rooms.size());*/






























}
