package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.rooms.HotelRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRoomRepository extends JpaRepository<HotelRoom,Integer>
{

}
