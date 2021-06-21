package de.fourofakind.businesshotel.server.repositories.stock;

import de.fourofakind.businesshotel.server.entities.rooms.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "room", path="room")
@Repository
public interface RoomRepository extends JpaRepository<Room,Integer>
{
}
