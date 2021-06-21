package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.rooms.ConferenceRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(collectionResourceRel = "conferenceroom", path="conferenceroom")
@Repository
public interface ConferenceRoomRepository extends JpaRepository<ConferenceRoom,Integer>
{

}
