package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.rooms.HotelRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "hotelroom", path="hotelroom")
@Repository
public interface HotelRoomRepository extends JpaRepository<HotelRoom,Integer>
{

}
