package de.fourofakind.businesshotel.server.repositories;

import de.fourofakind.businesshotel.server.entities.bookings.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RepositoryRestResource(collectionResourceRel = "booking", path="booking")
public interface BookingRepository extends JpaRepository<Booking,Integer>
{
    List<Booking> findByCustomerID (@Param("customerID") Integer customerID);
    List<Booking> findByEmpNo (@Param("empNo") Integer empNo);
    List<Booking> findByRoomNo (@Param("roomNo") Integer roomNo);
    List<Booking> findByStartDateIsBetweenOrEndDateIsBetweenOrStartDateBeforeAndEndDateAfter
            (@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)@Param("startDate") Date startDateFirstCondition,
             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)@Param("endDate") Date endDateFirstCondition,
             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)@Param("startDate") Date startDateSecondCondition,
             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)@Param("endDate") Date endDateSecondCondition,
             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)@Param("startDate") Date startDateThirdCondition,
             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)@Param("endDate") Date endDateThirdCondition);
}
