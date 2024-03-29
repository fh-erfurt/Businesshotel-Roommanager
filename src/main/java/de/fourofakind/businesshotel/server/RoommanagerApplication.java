package de.fourofakind.businesshotel.server;


import de.fourofakind.businesshotel.server.entities.bookings.Booking;
import de.fourofakind.businesshotel.server.entities.bookings.ConferenceRoomBooking;
import de.fourofakind.businesshotel.server.entities.bookings.HotelRoomBooking;
import de.fourofakind.businesshotel.server.entities.common.AccountDetails;
import de.fourofakind.businesshotel.server.entities.customers.BookingRequest;
import de.fourofakind.businesshotel.server.entities.customers.ContactData;
import de.fourofakind.businesshotel.server.entities.customers.Customer;
import de.fourofakind.businesshotel.server.entities.employees.Employee;
import de.fourofakind.businesshotel.server.entities.rooms.ConferenceRoom;
import de.fourofakind.businesshotel.server.entities.rooms.HotelRoom;
import de.fourofakind.businesshotel.server.entities.rooms.Room;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.mapping.RepositoryDetectionStrategy;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;


@SpringBootApplication
public class RoommanagerApplication
{
    public static void main (String[] args)
    {
        SpringApplication.run(RoommanagerApplication.class, args);
    }

    @Bean
    public RepositoryRestConfigurer repositoryRestConfigurer ()
    {
        return RepositoryRestConfigurer.withConfig(config -> {
            config.exposeIdsFor(Booking.class, ConferenceRoomBooking.class, HotelRoomBooking.class, AccountDetails.class, BookingRequest.class, ContactData.class, Customer.class, Employee.class, Room.class, HotelRoom.class, ConferenceRoom.class);
        });
    }

    @Bean
    public RepositoryDetectionStrategy repositoryDetectionStrategy ()
    {
        return RepositoryDetectionStrategy.RepositoryDetectionStrategies.ANNOTATED;
    }


}
