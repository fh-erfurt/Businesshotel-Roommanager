package de.fourofakind.businesshotel.storages;

import de.fourofakind.businesshotel.bookings.ConferenceRoomBooking;
import org.springframework.data.repository.CrudRepository;

public interface ConferenceRoomBookingRepository extends CrudRepository<ConferenceRoomBooking,Integer>
{

}
