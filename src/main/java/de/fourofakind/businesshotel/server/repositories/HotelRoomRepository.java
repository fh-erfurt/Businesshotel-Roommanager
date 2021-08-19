package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.rooms.HotelRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * <p>This repository represents the detailed specified information of an hotelroom. There are certain information that are necessary
 * for the hotelroom like is there a kitchen and how many beds are avaiable. These information are only relevant for hotelrooms and its users.</p>
 */
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "hotelroom", path = "hotelroom")
public interface HotelRoomRepository extends JpaRepository<HotelRoom, Integer>
{

}
