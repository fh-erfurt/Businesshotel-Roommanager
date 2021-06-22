package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.rooms.HotelRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "hotelroom", path="hotelroom")
public interface HotelRoomRepository extends JpaRepository<HotelRoom,Integer>
{

}
