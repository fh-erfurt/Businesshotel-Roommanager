package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.rooms.ConferenceRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
/**
 * <p>This repository represents the detailed specified information of an conferenceRoom. There are certain information that are necessary
 * for the conferenceRoom like the amount of beamers or screens. These information are only relevant for conferencerooms and its users.</p>
 */
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "conferenceroom", path="conferenceroom")
public interface ConferenceRoomRepository extends JpaRepository<ConferenceRoom,Integer>
{

}
