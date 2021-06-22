package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.rooms.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "room", path="room")
public interface RoomRepository extends JpaRepository<Room,Integer>
{
}
