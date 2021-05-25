package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.rooms.ConferenceRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConferenceRoomRepository extends JpaRepository<ConferenceRoom,Integer>
{

}
