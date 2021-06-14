
package de.fourofakind.businesshotel;
/*
import de.fourofakind.businesshotel.entities.common.AccountDetails;
import de.fourofakind.businesshotel.entities.common.Role;
import de.fourofakind.businesshotel.entities.rooms.Room;
import de.fourofakind.businesshotel.entities.rooms.HotelRoom;
import de.fourofakind.businesshotel.entities.rooms.ConferenceRoom;
import de.fourofakind.businesshotel.repositories.ConferenceRoomRepository;
import de.fourofakind.businesshotel.repositories.HotelRoomRepository;
import de.fourofakind.businesshotel.entities.employees.Employee;
import de.fourofakind.businesshotel.repositories.AccountDetailsRepository;
import de.fourofakind.businesshotel.repositories.EmployeeRepository;
import de.fourofakind.businesshotel.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Sort;
*/

/*
import de.fourofakind.businesshotel.employees.Employee;
import de.fourofakind.businesshotel.server.rooms.ConferenceRoom;
import de.fourofakind.businesshotel.server.rooms.HotelRoom;
import de.fourofakind.businesshotel.server.rooms.Room;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static de.fourofakind.businesshotel.common.StartingClass.RoomAdministrator;
import static de.fourofakind.businesshotel.common.StartingClass.Rooms;
import static org.junit.jupiter.api.Assertions.*;

*/

//import de.fourofakind.businesshotel.entities.common.Role;

/**
 * <p>All tests refering to the Room, from the check if it is created correctly to the check of the changes made</p>
 */


/*@SpringBootApplication
public class RoomTestClass {

    //Setup for Tests



   /* @Bean
    public void Initialization(){
        return args-> {
            HotelRoom Hinterzimmer = new HotelRoom(1, Room.Category.SINGLE, 60, 4, true, true, false, true, 90);
            HotelRoomRepository.save(Hinterzimmer);
        };

    }*/


/**
     * <p>
     * The following two tests are designed to check if the created room, Hotel- or Conferenceroom is actually an instance of the abstract class
     * Room.
     * </p>
     */

/*
    @Test
    public void IsCreatedHotelRoomInstanceOfRoom()
    {

        //assertNotNull(newHotelRoom, "Should give createdHotelroom as Instance of Room");
    }
*/
   /* @Test
    public void IsCreatedConferenceRoomInstanceOfRoom()
    {
        assertNotNull(newConferenceRoom, "Should give createdConferenceroom as Instance of Room");
    }



/**
     * <p>These tests checks if the created room has been created correctly with all its data given</p>
     *//*

    @Test
    public void shouldGiveHotelRoomDetailsWhenSuccessful()
    {

        assertEquals(1, newHotelRoom.getRoomNo(), "Should give Set RoomNo of Object HotelRoom");
        assertEquals(Room.Category.DOUBLE, newHotelRoom.getCategory(), "Should give Set Category of Object HotelRoom");
        assertEquals(60, newHotelRoom.getAreaInSqrMetre(), "Should give true if the area is the same set earlier for the Room");
        assertEquals(2, newHotelRoom.getBedCount(), "Should give set bedcount at creation");
        assertTrue(newHotelRoom.hasSpeedLAN(), "Should tell if SpeedLan present");
        assertTrue(newHotelRoom.hasTV(), "Should tell if TV is present");
        assertFalse(newHotelRoom.hasKitchen(), "Should tell if Kitchen is present in Room");
        assertTrue(newHotelRoom.hasCoffeemaker(), "Should tell if Coffeemaker is present");

    }

    @Test
    public void shouldGiveConferenceRoomDetailsWhenSuccessful()
    {
        assertEquals(2, newConferenceRoom.getRoomNo(), "Should give Set RoomNo of Object HotelRoom");
        assertEquals(Room.Category.BIGGROUP, newConferenceRoom.getCategory(), "Should give Set Category of Object HotelRoom");
        assertEquals(45, newConferenceRoom.getAreaInSqrMetre(), "Should give true if the area is the same set earlier for the Room");
        assertEquals(12, newConferenceRoom.getMaxAmountOfParticipants(), "Should give maximum Participants for the specified room");
        assertEquals(1, newConferenceRoom.getAmountOfBeamer(), "Should tell the amount of Beamers inside the room");
        assertFalse(newConferenceRoom.hasTV(), "Should tell if TV is present");
        assertTrue(newConferenceRoom.hasScreen(), "Should tell if a Screen is present in Room");
        assertFalse(newConferenceRoom.hasComputer(), "Should tell if Computer is inside the room");

    }

    */
/**
     * <p>This test checks if the room is set correctly as "occupied", according to the data it has been set with</p>
     *//*

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
    }



    */
/**
     * <p>Checks if the room is deleted the right way from the rooms list. One test is with the needed rights the other without, to test
     * if the "role-check" is working</p>
     *//*

    @Test
    public void DeleteRoomsTestWithAdminRight()
    {
        System.out.println("Is Employee a RoomAdmin: " + Mitarbeiter1.getGivenRole().isEnabledToManageRooms());
        assertEquals(2, Rooms.get(2).getRoomNo(),"Room No. 2 should be on second position if created");
        Mitarbeiter1.deleteRoom(2);
        assertNull(Rooms.get(2), "Room No. 2 Should be Empty if deleted");
    }
    */
/**
     * <p>
     * This test purpose is to check if an employee that is not allowed to delete a room is actually unable to do so.
     * The role of the employee has to be "RoomAdministrator", if it is any different admin or someone without rights it should throw an
     * IllegalCallerException
     * </p>
     *//*


    @Test
    public void DeleteRoomTestWithoutAdminRight()
    {
        //Make Mitarbeiter1 a employee without the right to delete rooms

        Mitarbeiter1.setGivenRole(null);


        assertThrows(IllegalCallerException.class, ()-> Mitarbeiter1.deleteRoom(2),"Should pass if error is thrown because employee has no rights" +
                " to delete a Room");
    }

    */
/**
     * <p>Checks if the room contains the correct data after it has been changed by a employee. Test is performed with admin rights and once
     * without those right, to see if a error is thrown</p>
     *//*

    @Test
    public void changeRoomDetailsWithAdminRights()
    {
        ArrayList<String> toBeChangedList = new ArrayList<>();
        toBeChangedList.add("areaInSqrMetre");
        toBeChangedList.add("pricePerUnit");
        toBeChangedList.add("hasKitchen");

        ArrayList<Object> changedValues = new ArrayList<>();
        changedValues.add(100);
        changedValues.add(120.0f);
        changedValues.add(true);

        boolean changesMade = Mitarbeiter1.changeRoomDetails(1, toBeChangedList, changedValues);

        assertTrue(changesMade,"Should give true if the changes were set to the room");
    }

    @Test
    public void changeRoomDetailsWithoutAdminRights()
    {
        Mitarbeiter1.setGivenRole(null);
        ArrayList<String> toBeChangedList = new ArrayList<>();
        toBeChangedList.add("areaInSqrMetre");
        toBeChangedList.add("pricePerUnit");
        toBeChangedList.add("hasKitchen");

        ArrayList<Object> changedValues = new ArrayList<>();
        changedValues.add(100);
        changedValues.add(120.0);
        changedValues.add(true);

        assertThrows(IllegalCallerException.class, ()-> Mitarbeiter1.changeRoomDetails(1, toBeChangedList, changedValues),"Should throw an " +
                "error to pass, ´cause the employee has no right to change a detail of the room");
    }
}























*/










