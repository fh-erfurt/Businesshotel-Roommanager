package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.rooms.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "room", path="room")
public interface RoomRepository extends JpaRepository<Room,Integer>
{
    List<Room> findAllByRoomNo (@Param("RoomNo") Integer roomNo); //-> liefert Liste von Customers, die erst auseinadner gebaut werden muss
    //Room findFirstByContactData_FirstNameAndContactData_LastName (@Param("firstName") String firstName,@Param("lastName") String lastName); //->liefert Koji Kondo inklusive einiger Daten

}


    //List<Rooom> findByContactData_FirstNameAndContactData_LastName (@Param("firstName") String firstName, @Param("lastName") String lastName); //-> liefert Liste von Customers, die erst auseinadner gebaut werden muss
    //Room findFirstByContactData_FirstNameAndContactData_LastName (@Param("firstName") String firstName,@Param("lastName") String lastName); //->liefert Koji Kondo inklusive einiger Daten
