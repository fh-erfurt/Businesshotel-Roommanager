package de.fourofakind.businesshotel.repositories;

import de.fourofakind.businesshotel.bookings.ConferenceRoomBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConferenceRoomBookingRepository extends JpaRepository<ConferenceRoomBooking,Integer>
{

}
