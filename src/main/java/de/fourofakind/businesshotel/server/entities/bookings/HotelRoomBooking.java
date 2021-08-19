package de.fourofakind.businesshotel.server.entities.bookings;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;


/**
 * This class extends the Booking to the kind of room that has been booked, in this case to a Hotelroom.
 */

@Entity(name = "HotelRoomBooking")
@AllArgsConstructor
@Setter
@Getter
@DiscriminatorValue("HotelRoomBooking")
public class HotelRoomBooking extends Booking
{

    //Constructor
    //managed by Lombok


    //Getter/Setter
    //managed by Lombok

}
