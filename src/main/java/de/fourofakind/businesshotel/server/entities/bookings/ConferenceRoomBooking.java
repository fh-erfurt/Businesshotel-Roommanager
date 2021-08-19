package de.fourofakind.businesshotel.server.entities.bookings;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 * This class extends the Booking to the kind of room that has been booked, in this case to a conferenceRoom
 */

@Entity(name = "ConferenceRoomBooking")
@AllArgsConstructor
@Setter
@Getter
@DiscriminatorValue("ConferenceRoomBooking")
public class ConferenceRoomBooking extends Booking
{

    //Constructor
    //managed by Lombok


    //Setter/Getter
    //managed by Lombok


}
