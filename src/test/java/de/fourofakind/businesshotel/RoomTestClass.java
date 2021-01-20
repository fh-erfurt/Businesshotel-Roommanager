package de.fourofakind.businesshotel;

import de.fourofakind.businesshotel.bookings.Booking;
import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.TimeFrame;
import de.fourofakind.businesshotel.employees.Employee;
import de.fourofakind.businesshotel.rooms.HotelRoom;
import de.fourofakind.businesshotel.rooms.Room;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static de.fourofakind.businesshotel.common.StartingClass.*;

public class RoomTestClass
{

    //Setup for Tests
    Employee Mitarbeiter1 = new Employee("Mitarbeiter1");
    Room newHotelRoom = Mitarbeiter1.createHotelRoom(7,"",60,2,true,true,false,true);
    Room newConferenceRoom = Mitarbeiter1.createConferenceRoom(14,"",45,12,2,1,true,false,false);
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
        boolean roomNo = Rooms.get(0).getRoomNo()==7 ? true : false;
        boolean category = Rooms.get(0).getCategory()=="" ? true : false;
        boolean area = Rooms.get(0).getAreaInSqrMetre()==60 ? true : false;

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
