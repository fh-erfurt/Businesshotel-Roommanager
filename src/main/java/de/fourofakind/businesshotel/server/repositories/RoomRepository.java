package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.rooms.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
/**
 * <p>This repository represents the detailed specified information of an room. It holds its size, its number, the category and
 * most important the price of each room</p>
 */
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "room", path="room")
public interface RoomRepository extends JpaRepository<Room,Integer>
{
    List<Room> findAllByRoomNo (@Param("RoomNo") Integer roomNo);
}
