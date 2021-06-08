package de.fourofakind.businesshotel.entities.employees;

import de.fourofakind.businesshotel.entities.bookings.Booking;
import de.fourofakind.businesshotel.entities.bookings.ConferenceRoomBooking;
import de.fourofakind.businesshotel.entities.bookings.HotelRoomBooking;
import de.fourofakind.businesshotel.entities.common.Role;
import de.fourofakind.businesshotel.entities.customers.ContactData;
import de.fourofakind.businesshotel.entities.customers.Customer;
import de.fourofakind.businesshotel.entities.rooms.ConferenceRoom;
import de.fourofakind.businesshotel.entities.rooms.HotelRoom;
import de.fourofakind.businesshotel.entities.rooms.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.Date;



/**
 * This is the main actor in our application for now. It maintains Bookings and Rooms and interacts with Customers. Employees can acquire several roles and there fore inherit rights to do different
 * tasks each. Later there will be different employee specializations for different jobs inside the company using the software.
 */
@Entity(name="Employee")
@Table(name="employee")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Employee
{
    //Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer empNo;
    private String empName;
    private String givenRole;
    @Column(name="account_id") private Integer accountID;

    public Employee (String empName, int accountID) //Employee without any Rights
    {
        this.givenRole = null;
        this.empName = empName;
    }

    public Employee (String empName, String givenRole, int accountID)
    {
        this.givenRole = givenRole;
        this.empName = empName;
    }



    /**
     * <p>Implementation of the Employee's ability to create Bookings for Customers
     * uses getEmpNo to automatically add the employee's number and always the current date to ensure the right date is stored to bookingDate.
     * Role BookingManager is needed.
     * </p>
     *
     * @param roomNo             Number of the Room which is used as well as its position inside Rooms
     * @param startOfPeriod          the time span in which the corresponding room will be used;
     *                           should contain fixed time spans for hotel rooms and variable time spans for conference rooms
     * @param endofPeriod          the date span for one or multiple days, of which a room is blocked;
     *                           should allow variable date spans for both types of rooms as a conference room could be used for a congress for multiple days
     *                           and a hotel room can be used for one or multiple nights
     * @param bookingType        indicates if the booking is a HotelRoomBooking or a ConferenceRoomBooking
     * @param roomCategory       Description of the time of room, should be Suite, Single Room or Double Room for hotel rooms or Little Group or Big Group
     *                           for conference rooms
     * @param specialWishes      contains any special wishes made by a customer, could be an extra bed, room service or wake up service in the morning
     * @param isBusinessCustomer marks the booking to be requested by a business customer or for personal use;
     *                           important for generation of bills and taxes to be used
     * @return                   the Booking created just now
     * @throws IllegalCallerException if the employee does not inherit the role BookingManager
     **/
//    public Booking createBooking (int roomNo, int customerID, Date startOfPeriod, Date endofPeriod, Booking.BookingType bookingType,
//                                  Room.Category roomCategory, String specialWishes, boolean isBusinessCustomer) throws IllegalCallerException
//    {
//        if (this.getGivenRoleName()=="BookingsManager") //checks for Rights to manage Bookings
//        {
//
//
//            Booking createdBooking = null;
//
//            if (bookingType == Booking.BookingType.HotelRoomBooking)
//            {
//                createdBooking = new HotelRoomBooking(customerID, roomNo, startOfPeriod, endofPeriod, roomCategory, specialWishes,
//                        this.getEmpNo(), isBusinessCustomer);
//            }
//            if (bookingType == Booking.BookingType.ConferenceRoomBooking)
//            {
//                createdBooking = new ConferenceRoomBooking(customerID, roomNo, startOfPeriod, endofPeriod, roomCategory, specialWishes,
//                        this.getEmpNo(),
//                        isBusinessCustomer);
//            }
//
//            //Rooms.get(roomNo).setRoomAsOccupiedToList(new FullDate(dateFrame,timeFrame));
//            Bookings.add(createdBooking);
//            return createdBooking;
//        }
//        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
//    }


    /**
     *<p>Implementation of the Employee's ability to change one or multiple attributes of a Booking
     *same params as createBooking, but some can be null-like values, if they should not be changed.
     * Role BookingManager is needed.</p>
     * @param bookingNo                 Number of the Booking as well as its position inside Bookings
     * @param toBeChangedAttributes         contains all attributes named by string, that need to be changed inside the Booking object
     * @param changedValues             contains all values for the attributes named in toBeChangedAttributes, which need to be casted to the right datatype before setting them in the Booking object
     * @throws IllegalArgumentException if the amount of arguments is too few for the amount of values to be changed
     * @throws IllegalCallerException   if the employee does not inherit the role BookingManager
     */
//    public boolean changeBooking (int bookingNo, ArrayList<String> toBeChangedAttributes, ArrayList<Object> changedValues) throws IllegalArgumentException, IllegalCallerException
//    {
//        currentDateTime = LocalDateTime.now(); //gets current date for the changeDate attribute of booking, if any change occures
//        if (this.getGivenRole().toString()=="BookingsManager" && toBeChangedAttributes.size() != 0) //checks for Rights to manage Bookings
//        {
//            if(toBeChangedAttributes.size()== changedValues.size())  //checks if the amount in the list of attributes, that shall be changed, matches the amount of values given in the changedValues list
//            {
//                Booking toBeChangedBooking = Booking.save(bookingNo); //"loads" the to be changed Booking into the function to work with the object
//                boolean changeHappened = false;
//
//                for (int amountOfChangedValues = 0; amountOfChangedValues < toBeChangedAttributes.size(); amountOfChangedValues++)
//                {
//                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("roomNo"))  //checks, which attribute is going to be changed to determine the correct datatype to be casted to
//                    {
//                        toBeChangedBooking.setRoomNo((Integer) changedValues.get(amountOfChangedValues)); //casts the value for the attribute, given as an object inside changedValues and sets it inside the Booking object
//                        changeHappened = true;
//                    }
//                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("startDate")) //checks, which attribute is going to be changed to determine the correct datatype to be casted to
//                    {
//                        toBeChangedBooking.setStartDate((Date) changedValues.get(amountOfChangedValues)); //casts the value for the attribute, given as an object inside changedValues and sets it inside the Booking object
//                        changeHappened = true;
//                    }
//                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("endDate")) //checks, which attribute is going to be changed to determine the correct datatype to be casted to
//                    {
//                        toBeChangedBooking.setEndDate((Date) changedValues.get(amountOfChangedValues)); //casts the value for the attribute, given as an object inside changedValues and sets it inside the Booking object
//                        changeHappened = true;
//                    }
//                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("specialWishes")) //checks, which attribute is going to be changed to determine the correct datatype to be casted to
//                    {
//                        toBeChangedBooking.setSpecialWishes((String) changedValues.get(amountOfChangedValues)); //casts the value for the attribute, given as an object inside changedValues and sets it inside the Booking object
//                        changeHappened = true;
//                    }
//                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("isBusinessCustomer")) //checks, which attribute is going to be changed to determine the correct datatype to be casted to
//                    {
//                        toBeChangedBooking.setBusinessCustomer((Boolean) changedValues.get(amountOfChangedValues));  //casts the value for the attribute, given as an object inside changedValues and sets it inside the Booking object
//                        changeHappened = true;
//                    }
//
//                    if (changeHappened) //check if a change actually occured
//                    {
//                        toBeChangedBooking.setChangeDate(currentDateTime.toString()); //sets the changeDate of Booking to the current Date
//                        return true;
//                    }
//
//                }
//            }
//            else throw new IllegalArgumentException("There are too few arguments given. Both List must contain the same amount of params.");
//        }
//        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
//        return false;
//    }


    /**
     * <p>Implementation of the Employee's ability to delete a Booking by its booking number
     * does not use the remove method of the ArrayList to keep the relation of the position of a booking in Bookings  to its bookingNo.
     * Role BookingManager is needed.</p>
     *
     * @param bookingNo Number of the Booking as well as its position inside Bookings
     * @throws IllegalCallerException if the employee does not inherit the role BookingManager
     */
//    public void deleteBooking (int bookingNo) throws IllegalCallerException
//    {
//        if (this.getGivenRole()==BookingsManager) //checks for Rights to manage Bookings
//        {
//            int roomNumberOfRoomToBeFree = Bookings.get(bookingNo).getRoomNo();
//            Date startOfPeriod=Bookings.get(bookingNo).getStartDate();
//            Date endOfPeriod=Bookings.get(bookingNo).getEndDate();
//            //Rooms.get(roomNumberOfRoomToBeFree).setRoomAsFreeToList(new FullDate(dateFrame,timeFrame));
//
//            Bookings.set(bookingNo, null);    //instead of remove() to keep the relation of the position of a booking in Bookings to its bookingNo
//        }
//        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
//    }


    /**
     * <p>Implementation of the Employee's ability to change attributes of a room to save details of real world changes to the room
     * does not change the number of a room or its use case (hotel room or conference room).
     * Role RoomAdministrator is needed.</p>
     * @param roomNo                       Number of the room which is to be changed; provides the index of the room inside Rooms
     * @param toBeChangedAttributes        contains all values named by string, that need to be changed
     * @param changedValues                contains all changed Values, needs to be casted to the right datatype
     * @throws IllegalCallerException      if the employee does not inherit the role RoomAdministrator
     */
//    public boolean changeRoomDetails (int roomNo, ArrayList<String> toBeChangedAttributes, ArrayList<Object> changedValues) throws IllegalCallerException
//    {
//        boolean changeHappened = false;
//
//        if (this.getGivenRole()==RoomAdministrator && toBeChangedAttributes.size() != 0) //checks for Rights to manage Rooms
//        {
//            if(toBeChangedAttributes.size()== changedValues.size())
//            {
//                Room toBeChangedRoom = Rooms.get(roomNo);
//
//                for (int amountOfChangedValues = 0; amountOfChangedValues < toBeChangedAttributes.size(); amountOfChangedValues++)
//                {
//                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("category"))
//                    {
//                        toBeChangedRoom.setCategory((Room.Category)changedValues.get(amountOfChangedValues));
//                    }
//                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("areaInSqrMetre"))
//                    {
//                        toBeChangedRoom.setAreaInSqrMetre((Integer)changedValues.get(amountOfChangedValues));
//                    }
//                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("pricePerUnit"))
//                    {
//                        toBeChangedRoom.setPricePerUnit((Float)changedValues.get(amountOfChangedValues));
//                    }
//
//                    if (toBeChangedRoom instanceof HotelRoom)
//                    {
//                        HotelRoom toBeChangedHotelRoom = (HotelRoom) toBeChangedRoom;
//                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("bedCount"))
//                        {
//                            toBeChangedHotelRoom.setBedCount((Integer)changedValues.get(amountOfChangedValues));
//                            changeHappened = true;
//                        }
//                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasSpeedLAN"))
//                        {
//                            toBeChangedHotelRoom.setHasSpeedLAN((Boolean)changedValues.get(amountOfChangedValues));
//                            changeHappened = true;
//                        }
//                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasTV"))
//                        {
//                            toBeChangedHotelRoom.setHasTV((Boolean)changedValues.get(amountOfChangedValues));
//                            changeHappened = true;
//                        }
//                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasKitchen"))
//                        {
//                            toBeChangedHotelRoom.setHasKitchen((Boolean)changedValues.get(amountOfChangedValues));
//                            changeHappened = true;
//                        }
//                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasCoffeemaker"))
//                        {
//                            toBeChangedHotelRoom.setHasCoffeemaker((Boolean)changedValues.get(amountOfChangedValues));
//                            changeHappened = true;
//                        }
//                    }
//                    else if (toBeChangedRoom instanceof ConferenceRoom)
//                    {
//                        ConferenceRoom toBeChangedConferenceRoom = (ConferenceRoom) toBeChangedRoom;
//                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("maxAmountOfParticipants"))
//                        {
//                            toBeChangedConferenceRoom.setMaxAmountOfParticipants((Integer)changedValues.get(amountOfChangedValues));
//                            changeHappened = true;
//                        }
//                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("amountOfWhiteboards"))
//                        {
//                            toBeChangedConferenceRoom.setAmountOfWhiteboards((Integer)changedValues.get(amountOfChangedValues));
//                            changeHappened = true;
//                        }
//                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("amountOfBeamer"))
//                        {
//                            toBeChangedConferenceRoom.setAmountOfBeamer((Integer)changedValues.get(amountOfChangedValues));
//                            changeHappened = true;
//                        }
//                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasScreen"))
//                        {
//                            toBeChangedConferenceRoom.setHasScreen((Boolean)changedValues.get(amountOfChangedValues));
//                            changeHappened = true;
//                        }
//                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasComputer"))
//                        {
//                            toBeChangedConferenceRoom.setHasComputer((Boolean)changedValues.get(amountOfChangedValues));
//                            changeHappened = true;
//                        }
//                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasTV"))
//                        {
//                            toBeChangedConferenceRoom.setHasTV((Boolean)changedValues.get(amountOfChangedValues));
//                            changeHappened = true;
//                        }
//                        return changeHappened;
//                    }
//                }
//            }
//        }
//        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
//        return changeHappened;
//    }

    /**
     * <p>Implementation of the Employee's ability to create a conference room. Creates a new room according to the given details and adds it to the roomList.
     * Role RoomAdministrator is needed.</p>
     *
     * @param roomNo                    Number of the room, that is created according to real world; index of the rumber in Rooms
     * @param category                  category of the room, depending on if it is a hotel room (suite, single room, double room) or conference room (big group, small group)
     * @param areaInSqrMetre            area of the room in square metres
     * @param maxAmountOfParticipants   maximal amount of people allowed in the room according to current corona guidelines, later depending on amount of seats
     * @param amountOfWhiteboards       tells how many Whiteboards are in the room
     * @param amountOfBeamer            tells how many beamers are in the room
     * @param hasScreen                 tells whether there is a screen for the presentation of data
     * @param hasComputer               tells whether there is a computer in the room
     * @param hasTV                     tells whether there is a TV in the room
     * @return                          ConferenceRoom created
     * @throws IllegalCallerException   if the employee does not inherit the role RoomAdministrator
     */
//    public ConferenceRoom createConferenceRoom (int roomNo, ConferenceRoom.Category category, int areaInSqrMetre, int maxAmountOfParticipants,
//                                                int amountOfWhiteboards, int amountOfBeamer, boolean hasScreen, boolean hasComputer, boolean hasTV, float pricePerUnit) throws IllegalCallerException
//    {
//        if (this.getGivenRole()==RoomAdministrator) //checks for Rights to manage Rooms
//        {
//            ConferenceRoom newRoom = new ConferenceRoom(roomNo, category, areaInSqrMetre, maxAmountOfParticipants, amountOfWhiteboards,amountOfBeamer,
//                    hasScreen,hasComputer,hasTV,pricePerUnit);
//            Rooms.add(newRoom);
//            return newRoom;
//        }
//        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
//    }

    /**
     * <p>Implementation of the Employee's ability to create a hotel room. Creates a new room according to the given details and adds it to the roomList.
     * Role RoomAdministrator is needed.</p>
     *
     * @param roomNo            Number of the room, that is created according to real world; index of the rumber in Rooms
     * @param category          category of the room, depending on if it is a hotel room (suite, single room, double room) or conference room (big group, small group)
     * @param areaInSqrMetre    area of the room in square metres
     * @param bedCount          amount of beds in the hotel room
     * @param hasSpeedLAN       tells if the room has a SpeedLan Connection avaiable
     * @param hasTV             tells if the room has a TV
     * @param hasKitchen        tells if there is a kitchen to cook in the room
     * @param hasCoffeemaker    tells if there is a Coffeemaker in the room
     * @return                  HotelRoom created
     * @throws IllegalCallerException if the employee does not inherit the role RoomAdministrator
     */
//    public HotelRoom createHotelRoom (int roomNo, HotelRoom.Category category, int areaInSqrMetre, int bedCount, boolean hasSpeedLAN, boolean hasTV,
//                                      boolean hasKitchen, boolean hasCoffeemaker, float pricePerUnit) throws IllegalCallerException
//    {
//        if (this.getGivenRole()==RoomAdministrator) //checks for Rights to manage Rooms
//        {
//            HotelRoom newRoom = new HotelRoom(roomNo, category, areaInSqrMetre, bedCount,hasSpeedLAN,hasTV,hasKitchen,hasCoffeemaker, pricePerUnit);
//            Rooms.add(newRoom);
//            return newRoom;
//        }
//        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
//    }
//

    /**
     * <p>Implementation of the Employee's ability to delete a room entirely. Ensures that unsuable rooms are deleted from the Rooms and can not be used for
     * bookings. Reasons could be a fusion of two or multiple rooms or the purpose of a room has changed entirely.
     * Role RoomAdministrator is needed.</p>
     *
     * @param roomNo    number of the room to be deleted
     * @throws IllegalCallerException if the employee does not inherit the role RoomAdministrator
     */
//    public void deleteRoom (int roomNo) throws IllegalCallerException
//    {
//        if (this.getGivenRole()==RoomAdministrator) //checks for Rights to manage Rooms
//        {
//            System.out.println("incoming");
//            Rooms.set(roomNo, null);
//        }
//        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
//
//    }


    /**
     * <p>Implementation of the Employee's ability to search for a booking by several parameters given. Will later be much more efficient if based on database actions.
     * It is possible to search only by EmpNo to determine an Employee's work rate, to search only by bookingNo, which should always return only one booking and to search by a RoomNo and a dateframe and
     * a timeframe, when the room should be used. In the last case there are used even further defined parameters like bookingDate or roomCategory, but only if given. Not all Parameters have to be set
     * to use the function, not known information should be given with "null" or 0, depending on the data type.</p>
     * @param BookingNo             number of the booking to be searched for as well as its position in Bookings
     * @param RoomNo                number of the room which is documented in the booking to be searched for
     * @param empNo                 number of the employee that created the booking to be searched for
     * @param startOfPeriod             dateframe of the booking to be searched for
     * @param endOfPeriod             timeframe of the booking to be searched for
     * @param bookingDate           date of the booking to be searched for
     * @param roomCategory          category of the room which is documented in the booking to be searched for
     * @return                      all resulting Booking that match the search criteria
     */
//    public ArrayList<Booking> findBooking (int BookingNo, int RoomNo, int empNo, Date startOfPeriod, Date endOfPeriod, String bookingDate, Room.Category roomCategory)
//    {
//
//        ArrayList<Booking> searchResults = new ArrayList<>();
//        Booking wantedBooking;
//        int indexOfBookingList=1;
//
//        if (BookingNo!=0) //if BookingNo is given, only one item could be found
//        {
//            searchResults.add(Bookings.get(BookingNo));
//            return searchResults;
//        }
//
//        else if (RoomNo!=0 && startOfPeriod !=null && endOfPeriod!=null) //if the Room Number a well as the time frame and date frame of the room being used is given, there
//        // should be only one item found
//        // more secure if additional search params like roomCategory or BookingDate are given
//
//        {
//
//            if(indexOfBookingList< Bookings.size())
//            {
//                wantedBooking= Bookings.get(1);
//                while (wantedBooking.getRoomNo()!=RoomNo && indexOfBookingList< Bookings.size())
//                {
//                    if (wantedBooking.getStartDate().equals(startOfPeriod) )
//                    {
//                        if (wantedBooking.getEndDate().equals(endOfPeriod))
//                        {
//                            if(wantedBooking.getRoomCategory().equals(roomCategory)) //only triggered if roomCategory is given
//                            {
//                                if(wantedBooking.getBookingDate().equals(bookingDate)) //only triggered if booking Date is given
//                                {
//                                    wantedBooking = Bookings.get(indexOfBookingList);
//                                }
//                                else if (bookingDate==null)                            //if booking Date is not given, the resulting booking of the past parameters is
//                                {                                                      // added
//                                    wantedBooking = Bookings.get(indexOfBookingList);
//                                }
//
//                            }
//                            else if (roomCategory==null)                               //if roomCategory is not given, the method will continue searching with the
//                            // BookingDate, if provided
//                            {
//                                if(wantedBooking.getBookingDate().equals(bookingDate))
//                                {
//                                    wantedBooking = Bookings.get(indexOfBookingList);
//                                }
//                                else if (bookingDate==null)                            //if bookingDate is also not provided, only the booking referring to the past
//                                // searching params will be added as a result
//                                {
//                                    wantedBooking = Bookings.get(indexOfBookingList);
//                                }
//                            }
//
//
//                        }
//                    }
//
//                    indexOfBookingList++;
//                }
//
//                searchResults.add(Bookings.get(indexOfBookingList));
//            }
//        }
//
//        else if (empNo!=0)  //if only the empNo is given, there will be between zero and a lot of entries found; useful to rate an employee's work rate
//        {
//            if(indexOfBookingList< Bookings.size())
//            {
//                wantedBooking= Bookings.get(1);
//                while (wantedBooking.getEmpNo() != empNo && indexOfBookingList < Bookings.size())
//                {
//                    wantedBooking = Bookings.get(indexOfBookingList);
//                    indexOfBookingList++;
//                }
//                searchResults.add(Bookings.get(indexOfBookingList));
//            }
//        }
//
//        return searchResults;
//    }


    /**
     * <p>The implementation of a Listing feature, to analyze all Bookings. For now the function does not need any arguments, later it will be further developed to change the given view by several
     * aspects needed</p>
     * @return all Bookings inside Bookings
     */
//    public StringBuilder showAllBookings ()
//    {
//
//        StringBuilder allBookings = new StringBuilder();
//
//        for (Booking bookingEntry : Bookings)
//        {
//            allBookings.append("Buchung Nummer: ");
//            allBookings.append(bookingEntry.getBookingNo());
//            allBookings.append(", ");
//            allBookings.append("Raum: ");
//            allBookings.append(bookingEntry.getRoomNo());
//            allBookings.append(", ");
//            allBookings.append("von ");
//            allBookings.append(bookingEntry.getStartDate());
//            allBookings.append(" bis ");
//            allBookings.append(bookingEntry.getEndDate());
//            allBookings.append(", ");
//            allBookings.append("Raum-Kategorie: ");
//            allBookings.append(bookingEntry.getRoomCategory());
//            allBookings.append(", ");
//            allBookings.append("Besondere Wünsche: ");
//            allBookings.append(bookingEntry.getSpecialWishes());
//            allBookings.append(", ");
//            allBookings.append("erstellt durch Mitarbeiter Nummer ");
//            allBookings.append(bookingEntry.getEmpNo());
//            allBookings.append(", ");
//            allBookings.append("Business Kunde? ");
//            allBookings.append(bookingEntry.isBusinessCustomer());
//            allBookings.append("; ");
//        }
//
//        return allBookings;
//    }


    /**
     * <p>The implementation of an autonomous management of customer requests, based on whether or not a suitable room is free at the time given.</p>
     * @throws IllegalCallerException in case of someone using the function without the BookingsManager Role and its inherited Rights to manage bookings
     * @throws NoSuchElementException if there is no room of the wanted category at all
     */
//    public void manageBookingRequests () throws IllegalCallerException, NoSuchElementException
//    {
//        if(this.getGivenRole()==BookingsManager)
//        {
//
//            for (BookingRequest bookingRequest : BookingRequests)
//            {
//                Booking.BookingType bookingType = switch (bookingRequest.getRoomCategory())
//                        {
//                            case SUITE, SINGLE, DOUBLE -> Booking.BookingType.HotelRoomBooking;
//                            case SMALLGROUP, BIGGROUP -> Booking.BookingType.ConferenceRoomBooking;
//                        };
//                for (Room room :Rooms)
//                {
//                    for (de.fourofakind.businesshotel.common.FullDate FullDate: room.getRoomOccupiedAtList())
//                    {
//                        if(room.getCategory().equals(bookingRequest.getRoomCategory()))
//                        {
//                            if (FullDate.getDateFrame().equals(bookingRequest.getDateFrame()))
//                            {
//                                DeclinedBookingRequests.add(bookingRequest);
//                                BookingRequests.remove(bookingRequest);
//                                break;
//                            } else if (FullDate.getTimeFrame().equals(bookingRequest.getTimeFrame()))
//                            {
//                                DeclinedBookingRequests.add(bookingRequest);
//                                BookingRequests.remove(bookingRequest);
//                                break;
//                            } else
//                            {
//                                this.createBooking(room.getRoomNo(), bookingRequest.getCustomerID(), bookingRequest.getTimeFrame(),
//                                        bookingRequest.getDateFrame(),
//                                        bookingType, bookingRequest.getRoomCategory(),
//                                        bookingRequest.getSpecialWishes(), bookingRequest.getIsBusinessCustomer());
//                                BookingRequests.remove(bookingRequest);
//                            }
//                        }
//                        else throw new NoSuchElementException("There is no Room of this type present at all");
//                    }
//                }
//            }
//        }
//        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
//    }

    /**
     * <p>The implementation of the Employee's ability to create a customer by given parameters. The customer will be added to an ArrayList</p>
     * @param firstName         first name of the customer
     * @param lastName          last name of the customer
     * @param streetName        name of street where the customer lives
     * @param streetNumber      street number of the customer
     * @param postalCode        postalcode of the customer
     * @param cityName          name of the city where the customer lives
     * @param mailAddress       selected emailaddress by the customer for contact
     * @param paymentMethod     selected paymentmethod of the customer
     * @param iban              optional paymentDataCredentials of the customer
     * @return                        Customer created
     * @throws IllegalCallerException in case of someone using the function without the CustomerRelationshipManager Role and its inherited rights to manage customers
     */
//    public Customer createCustomer (String firstName, String lastName, String streetName, String streetNumber, String postalCode, String cityName, String mailAddress,
//                                    Customer.paymentMethods paymentMethod, String iban) throws IllegalCallerException
//    {
//        if (this.getGivenRole().toString()=="CustomerRelationshipManager")
//        {
//            int customerID = Customers.size();
//
//            ContactData contactData = new ContactData(firstName, lastName, streetName, streetNumber, postalCode, cityName, mailAddress);
//
//            if (paymentMethod == Customer.paymentMethods.debit)
//            {
//                contactData.setPaymentCredentials(iban);
//            }
//
//            Customer newCustomer = new Customer(customerID, contactData, paymentMethod);
//
//            Customers.add(newCustomer);
//            return newCustomer;
//        }
//        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
//    }



    /**
     * <p>The implementation of the Employee's ability to change a customer by given customerID and key and value of the new customers property.</p>
     * @param customerID    id to find the target customer in customers ArrayList
     * @param key           key of the property to be changed
     * @param value         new value of the property to be changed
     * @throws IllegalCallerException in case of someone using the function without the CustomerRelationshipManager Role and its inherited rights to manage customers
     */
//    public boolean changeCustomer (int customerID, String key, String value) throws IllegalCallerException
//    {
//        boolean changeHappened = false;
//        if (this.getGivenRole()==CustomerRelationshipManager)
//        {
//
//            Customer fetchedCustomer = Customers.get(customerID);
//            ContactData fetchedContactData = fetchedCustomer.getContactData();
//
//            switch (key)
//            {
//                case "firstName":
//                    fetchedContactData.setFirstName(value);
//                case "lastName":
//                    fetchedContactData.setLastName(value);
//                case "streetName":
//                    fetchedContactData.setStreetName(value);
//                case "streetNumber":
//                    fetchedContactData.setStreetNumber(value);
//                case "postalCode":
//                    fetchedContactData.setPostalCode(value);
//                case "cityName":
//                    fetchedContactData.setCityName(value);
//                case "mailAddress":
//                    fetchedContactData.setMailAddress(value);
//                case "paymentMethod":
//                    fetchedCustomer.setPaymentMethod(value);
//                case "iban":
//                    fetchedContactData.setPaymentCredentials(value);
//
//                    changeHappened = true;
//            }
//
//            Customers.set(customerID, fetchedCustomer);
//            return changeHappened;
//        }
//        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
//    }


    /**
     * <p>The implementation of the Employee's ability to delete a customer from customers ArrayList by given customerID.</p>
     * @param customerID  id to select the customer to be deleted
     * @throws IllegalCallerException in case of someone using the function without the CustomerRelationshipManager Role and its inherited rights to manage customers
     */
//    public void deleteCustomer (int customerID) throws IllegalCallerException
//    {
//        if (this.getGivenRole()==CustomerRelationshipManager)
//        {
////            Customers.set(customerID, null);
//            Customers.remove(customerID);
//
//
//        }
//        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
//    }


    //Setter/Getter
    //Generated by Lombok




}
