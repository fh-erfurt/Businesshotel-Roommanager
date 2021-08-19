package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.bookings.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;
import java.util.List;

/**
 * <p>This repository represents the detailed information of a booking. A booking has a lot of information that is has to
 * provide in order to make the manager work. We provide two types of booking: conferenceroom and hotelroom. They differ from
 * the options possible in the booking and the booking rules for time and date. It stores by which employee the booking
 * was made, which customer booked which room from a startdate to an enddate. The start- and enddate can also only be a time,
 * like hours, but only in case the booking is made for a conferenceroom. Specialwishes like lots of Cola are also added to the booking</p>
 */
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "booking", path = "booking")
public interface BookingRepository extends JpaRepository<Booking, Integer>
{
    List<Booking> findByCustomerID (@Param("customerID") Integer customerID);

    List<Booking> findByEmpNo (@Param("empNo") Integer empNo);

    List<Booking> findByRoomNo (@Param("roomNo") Integer roomNo);

    /**
     * <p>This Function is used to find all bookings within a given frame to ensure there are no doubled bookings on a room possible</p>
     */
    List<Booking> findByStartDateIsBetweenOrEndDateIsBetweenOrStartDateBeforeAndEndDateAfter (@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) @Param("startDate") Date startDateFirstCondition,
                                                                                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) @Param("endDate") Date endDateFirstCondition,
                                                                                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) @Param("startDate") Date startDateSecondCondition,
                                                                                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) @Param("endDate") Date endDateSecondCondition,
                                                                                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) @Param("startDate") Date startDateThirdCondition,
                                                                                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) @Param("endDate") Date endDateThirdCondition);
}
