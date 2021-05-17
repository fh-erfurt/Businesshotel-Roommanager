package de.fourofakind.businesshotel.storages;

import de.fourofakind.businesshotel.rooms.HotelRoom;
import org.springframework.data.repository.CrudRepository;

public interface HotelRoomRepository extends CrudRepository<HotelRoom,Integer>
{}
