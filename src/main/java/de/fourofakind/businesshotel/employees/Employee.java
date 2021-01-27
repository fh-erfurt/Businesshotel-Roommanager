package de.fourofakind.businesshotel.employees;

import de.fourofakind.businesshotel.bookings.Booking;
import de.fourofakind.businesshotel.bookings.ConferenceRoomBooking;
import de.fourofakind.businesshotel.bookings.HotelRoomBooking;
import de.fourofakind.businesshotel.common.DateFrame;
import de.fourofakind.businesshotel.common.Role;
import de.fourofakind.businesshotel.common.TimeFrame;
import de.fourofakind.businesshotel.customers.BookingRequest;
import de.fourofakind.businesshotel.customers.ContactData;
import de.fourofakind.businesshotel.customers.Customer;
import de.fourofakind.businesshotel.rooms.ConferenceRoom;
import de.fourofakind.businesshotel.rooms.HotelRoom;
import de.fourofakind.businesshotel.rooms.Room;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.NoSuchElementException;

import static de.fourofakind.businesshotel.common.StartingClass.*;


/**
 * This is our main actor in our application for now. It maintains Bookings and Rooms and interacts with Customers.
 */

public class Employee
{
    DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
    LocalDateTime currentDateTime = LocalDateTime.now();    //simple implementation of the current datetime, won't be present when working with a
    // database

    public Employee (String empName) //Employee without any Rights
    {
        this.givenRole = null;
        this.empNo = Employees.size();
        this.empName = empName;
    }

    public Employee (String empName, Role givenRole)
    {
        this.givenRole = givenRole;
        this.empNo = Employees.size();
        this.empName = empName;
    }



    /**
     * <p>Implementation of the Employee's ability to create Bookings for Customers
     * uses getEmpNo to automatically add the employee's number and always the current date to ensure the right date is stored to bookingDate.
     * Role BookingManager is needed.
     * </p>
     *
     * @param roomNo             Number of the Room which is used as well as its position inside Rooms
     * @param timeFrame          the time span in which the corresponding room will be used;
     *                           should contain fixed time spans for hotel rooms and variable time spans for conference rooms
     * @param dateFrame          the date span for one or multiple days, of which a room is blocked;
     *                           should allow variable date spans for both types of rooms as a conference room could be used for a congress for multiple days
     *                           and a hotel room can be used for one or multiple nights
     * @param bookingType        indicates if the booking is a HotelRoomBooking or a ConferenceRoomBooking
     * @param roomCategory       Description of the time of room, should be Suite, Single Room or Double Room for hotel rooms or Little Group or Big Group
     *                           for conference rooms
     * @param specialWishes      contains any special wishes made by a customer, could be an extra bed, room service or wake up service in the morning
     * @param isBusinessCustomer marks the booking to be requested by a business customer or for personal use;
     *                           important for generation of bills and taxes to be used
     * @return returns the Booking created just now
     */
    public Booking createBooking (int roomNo, TimeFrame timeFrame, DateFrame dateFrame, Booking.BookingType bookingType, Room.Category roomCategory, String specialWishes, boolean isBusinessCustomer)
    {
        if (this.getGivenRole()==BookingsManager) //checks for Rights to manage Bookings
        {
            int bookingNo = Bookings.size();

            Booking createdBooking = null;

            if (bookingType == Booking.BookingType.HotelRoomBooking)
            {
                createdBooking = new HotelRoomBooking(bookingNo, roomNo, timeFrame, dateFrame, roomCategory, specialWishes, this.getEmpNo(), isBusinessCustomer);
            }
            if (bookingType == Booking.BookingType.ConferenceRoomBooking)
            {
                createdBooking = new ConferenceRoomBooking(bookingNo, roomNo, timeFrame, dateFrame, roomCategory, specialWishes, this.getEmpNo(), isBusinessCustomer);
            }

            Rooms.get(roomNo).setUsed(true);
            Bookings.add(createdBooking);
            return createdBooking;
        }
        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
    }


    /**
     *<p>Implementation of the Employee's ability to change one or multiple attributes of a Booking
     *same params as createBooking, but some can be null-like values, if they should not be changed.
     * Role BookingManager is needed.</p>
     * @param bookingNo                 Number of the Booking as well as its position inside Bookings
     * @param toBeChangedAttributes         contains all values named by string, that need to be changed
     * @param changedValues             contains all changed Values, needs to be casted to the right datatype
     * @throws IllegalArgumentException
     */
    public boolean changeBooking (int bookingNo, ArrayList<String> toBeChangedAttributes, ArrayList<Object> changedValues) throws IllegalArgumentException
    {
        currentDateTime = LocalDateTime.now();
        if (this.getGivenRole()==BookingsManager && toBeChangedAttributes.size() != 0) //checks for Rights to manage Bookings
        {
            if(toBeChangedAttributes.size()== changedValues.size())
            {
                Booking toBeChangedBooking = Bookings.get(bookingNo); //"loads" the to be changed Booking into the function to work with the object
                boolean changeHappened = false;

                for (int amountOfChangedValues = 0; amountOfChangedValues < toBeChangedAttributes.size(); amountOfChangedValues++)
                {
                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("roomNo"))
                    {
                        toBeChangedBooking.setRoomNo((Integer) changedValues.get(amountOfChangedValues));
                        changeHappened = true;
                    }
                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("timeFrame"))
                    {
                        toBeChangedBooking.setTimeFrame((TimeFrame) changedValues.get(amountOfChangedValues));
                        changeHappened = true;
                    }
                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("dateFrame"))
                    {
                        toBeChangedBooking.setDateFrame((DateFrame) changedValues.get(amountOfChangedValues));
                        changeHappened = true;
                    }
                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("specialWishes"))
                    {
                        toBeChangedBooking.setSpecialWishes((String) changedValues.get(amountOfChangedValues));
                        changeHappened = true;
                    }
                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("isBusinessCustomer"))
                    {
                        toBeChangedBooking.setBusinessCustomer((Boolean) changedValues.get(amountOfChangedValues));
                        changeHappened = true;
                    }

                    if (changeHappened)
                    {
                        toBeChangedBooking.setChangeDate(currentDateTime.toString());
                        return true;
                    }

                }
            }
            else throw new IllegalArgumentException("There are too few arguments given. Both List must contain the same amount of params.");
        }
        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
        return false;
    }


    /**
     * <p>Implementation of the Employee's ability to delete a Booking by its booking number
     * does not use the remove method of the ArrayList to keep the relation of the position of a booking in Bookings  to its bookingNo.
     * Role BookingManager is needed.</p>
     *
     * @param bookingNo Number of the Booking as well as its position inside Bookings
     */
    public void deleteBooking (int bookingNo)
    {
        if (this.getGivenRole()==BookingsManager) //checks for Rights to manage Bookings
        {
            int roomNumberOfRoomToBeFree = Bookings.get(bookingNo).getRoomNo();
            Room roomToBeFree = Rooms.get(roomNumberOfRoomToBeFree);
            roomToBeFree.setUsed(false);
            Bookings.set(bookingNo, null);    //instead of remove() to keep the relation of the position of a booking in Bookings to its bookingNo
        }
        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
    }


    /**
     * <p>Implementation of the Employee's ability to change attributes of a room to save details of real world changes to the room
     * does not change the number of a room or its use case (hotel room or conference room).
     * Role RoomAdministrator is needed.</p>
     * @param roomNo                       Number of the room which is to be changed; provides the index of the room inside Rooms
     * @param toBeChangedAttributes        contains all values named by string, that need to be changed
     * @param changedValues                contains all changed Values, needs to be casted to the right datatype
     */
    public boolean changeRoomDetails (int roomNo, ArrayList<String> toBeChangedAttributes, ArrayList<Object> changedValues)
    {
        boolean changeHappened = false;

        if (this.getGivenRole()==RoomAdministrator && toBeChangedAttributes.size() != 0) //checks for Rights to manage Rooms
        {
            if(toBeChangedAttributes.size()== changedValues.size())
            {
                Room toBeChangedRoom = Rooms.get(roomNo);

                for (int amountOfChangedValues = 0; amountOfChangedValues < toBeChangedAttributes.size(); amountOfChangedValues++)
                {
//                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("category"))
//                    {
//                        toBeChangedRoom.setCategory((String)changedValues.get(amountOfChangedValues));
//                    }
                    if (toBeChangedAttributes.get(amountOfChangedValues).equals("areaInSqrMetre"))
                    {
                        toBeChangedRoom.setAreaInSqrMetre((Integer)changedValues.get(amountOfChangedValues));
                    }

                    if (toBeChangedRoom instanceof HotelRoom)
                    {
                        HotelRoom toBeChangedHotelRoom = (HotelRoom) toBeChangedRoom;
                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("bedCount"))
                        {
                            toBeChangedHotelRoom.setBedCount((Integer)changedValues.get(amountOfChangedValues));
                            changeHappened = true;
                        }
                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasSpeedLAN"))
                        {
                            toBeChangedHotelRoom.setHasSpeedLAN((Boolean)changedValues.get(amountOfChangedValues));
                            changeHappened = true;
                        }
                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasTV"))
                        {
                            toBeChangedHotelRoom.setHasTV((Boolean)changedValues.get(amountOfChangedValues));
                            changeHappened = true;
                        }
                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasKitchen"))
                        {
                            toBeChangedHotelRoom.setHasKitchen((Boolean)changedValues.get(amountOfChangedValues));
                            changeHappened = true;
                        }
                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasCoffeemaker"))
                        {
                            toBeChangedHotelRoom.setHasCoffeemaker((Boolean)changedValues.get(amountOfChangedValues));
                            changeHappened = true;
                        }
                    }
                    else if (toBeChangedRoom instanceof ConferenceRoom)
                    {
                        ConferenceRoom toBeChangedConferenceRoom = (ConferenceRoom) toBeChangedRoom;
                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("maxAmountOfParticipants"))
                        {
                            toBeChangedConferenceRoom.setMaxAmountOfParticipants((Integer)changedValues.get(amountOfChangedValues));
                            changeHappened = true;
                        }
                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("amountOfWhiteboards"))
                        {
                            toBeChangedConferenceRoom.setAmountOfWhiteboards((Integer)changedValues.get(amountOfChangedValues));
                            changeHappened = true;
                        }
                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("amountOfBeamer"))
                        {
                            toBeChangedConferenceRoom.setAmountOfBeamer((Integer)changedValues.get(amountOfChangedValues));
                            changeHappened = true;
                        }
                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasScreen"))
                        {
                            toBeChangedConferenceRoom.setHasScreen((Boolean)changedValues.get(amountOfChangedValues));
                            changeHappened = true;
                        }
                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasComputer"))
                        {
                            toBeChangedConferenceRoom.setHasComputer((Boolean)changedValues.get(amountOfChangedValues));
                            changeHappened = true;
                        }
                        if (toBeChangedAttributes.get(amountOfChangedValues).equals("hasTV"))
                        {
                            toBeChangedConferenceRoom.setHasTV((Boolean)changedValues.get(amountOfChangedValues));
                            changeHappened = true;
                        }
                        return changeHappened;
                    }
                }
            }
        }
        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
        return changeHappened;
    }

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
     */
    public ConferenceRoom createConferenceRoom (int roomNo, ConferenceRoom.Category category, int areaInSqrMetre, int maxAmountOfParticipants,
                                                int amountOfWhiteboards,
                                      int amountOfBeamer, boolean hasScreen, boolean hasComputer, boolean hasTV)
    {
        if (this.getGivenRole()==RoomAdministrator) //checks for Rights to manage Rooms
        {
            ConferenceRoom newRoom = new ConferenceRoom(roomNo, category, areaInSqrMetre, maxAmountOfParticipants, amountOfWhiteboards,amountOfBeamer,
                    hasScreen,hasComputer,hasTV);
            Rooms.add(newRoom);
            return newRoom;
        }
        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
    }

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
     */
    public HotelRoom createHotelRoom (int roomNo, HotelRoom.Category category, int areaInSqrMetre, int bedCount, boolean hasSpeedLAN, boolean hasTV,
                                 boolean hasKitchen,
                                 boolean hasCoffeemaker) throws IllegalCallerException
    {
        if (this.getGivenRole()==RoomAdministrator) //checks for Rights to manage Rooms
        {
            HotelRoom newRoom = new HotelRoom(roomNo, category, areaInSqrMetre, bedCount,hasSpeedLAN,hasTV,hasKitchen,hasCoffeemaker);
            Rooms.add(newRoom);
            return newRoom;
        }
        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
    }


    /**
     * <p>Implementation of the Employee's ability to delete a room entirely. Ensures that unsuable rooms are deleted from the Rooms and can not be used for
     * bookings. Reasons could be a fusion of two or multiple rooms or the purpose of a room has changed entirely.
     * Role RoomAdministrator is needed.</p>
     *
     * @param roomNo    number of the room to be deleted
     */
    public void deleteRoom (int roomNo) throws IllegalCallerException
    {
        if (this.getGivenRole()==RoomAdministrator) //checks for Rights to manage Rooms
        {
            System.out.println("incoming");
            Rooms.set(roomNo, null);
        }
        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");

    }


    /**
     * <p>Implementation of the Employee's ability to search for a booking by several parameters given. Will later be much more efficient if based on database actions.
     * It is possible to search only by EmpNo to determine an Employee's work rate, to search only by bookingNo, which should always return only one booking and to search by a RoomNo and a dateframe and
     * a timeframe, when the room should be used. In the last case there are used even further defined parameters like bookingDate or roomCategory, but only if given. Not all Parameters have to be set
     * to use the function, not known information should be given with "null" or 0, depending on the data type.</p>
     * @param BookingNo             number of the booking to be searched for as well as its position in Bookings
     * @param RoomNo                number of the room which is documented in the booking to be searched for
     * @param empNo                 number of the employee that created the booking to be searched for
     * @param dateFrame             dateframe of the booking to be searched for
     * @param timeFrame             timeframe of the booking to be searched for
     * @param bookingDate           date of the booking to be searched for
     * @param roomCategory          category of the room which is documented in the booking to be searched for
     * @return  returns all resulting Booking that match the search criteria
     */
    public ArrayList<Booking> findBooking (int BookingNo, int RoomNo, int empNo, DateFrame dateFrame, TimeFrame timeFrame, String bookingDate, Room.Category roomCategory)
    {

        ArrayList<Booking> searchResults = new ArrayList<>();
        Booking wantedBooking=null;
        int indexOfBookingList=1;

        if (BookingNo!=0) //if BookingNo is given, only one item could be found
        {
            searchResults.add(Bookings.get(BookingNo));
            return searchResults;
        }

        else if (RoomNo!=0 && dateFrame!=null && timeFrame!=null) //if the Room Number a well as the time frame and date frame of the room being used is given, there
                                                                  // should be only one item found
                                                                  // more secure if additional search params like roomCategory or BookingDate are given

        {

            if(indexOfBookingList< Bookings.size())
            {
                wantedBooking= Bookings.get(1);
                while (wantedBooking.getRoomNo()!=RoomNo && indexOfBookingList< Bookings.size())
                {
                    if (wantedBooking.getDateFrame().equals(dateFrame) )
                    {
                        if (wantedBooking.getTimeFrame().equals(timeFrame))
                        {
                            if(wantedBooking.getRoomCategory().equals(roomCategory)) //only triggered if roomCategory is given
                            {
                                if(wantedBooking.getBookingDate().equals(bookingDate)) //only triggered if booking Date is given
                                {
                                    wantedBooking = Bookings.get(indexOfBookingList);
                                }
                                else if (bookingDate==null)                            //if booking Date is not given, the resulting booking of the past parameters is
                                {                                                      // added
                                    wantedBooking = Bookings.get(indexOfBookingList);
                                }

                            }
                            else if (roomCategory==null)                               //if roomCategory is not given, the method will continue searching with the
                                                                                       // BookingDate, if provided
                            {
                                if(wantedBooking.getBookingDate().equals(bookingDate))
                                {
                                    wantedBooking = Bookings.get(indexOfBookingList);
                                }
                                else if (bookingDate==null)                            //if bookingDate is also not provided, only the booking referring to the past
                                                                                       // searching params will be added as a result
                                {
                                    wantedBooking = Bookings.get(indexOfBookingList);
                                }
                            }


                        }
                    }

                    indexOfBookingList++;
                }

            searchResults.add(Bookings.get(indexOfBookingList));
            }
        }

        else if (empNo!=0)  //if only the empNo is given, there will be between zero and a lot of entries found; useful to rate an employee's work rate
        {
            if(indexOfBookingList< Bookings.size())
            {
                wantedBooking= Bookings.get(1);
                while (wantedBooking.getEmpNo() != empNo && indexOfBookingList < Bookings.size())
                {
                    wantedBooking = Bookings.get(indexOfBookingList);
                    indexOfBookingList++;
                }
                searchResults.add(Bookings.get(indexOfBookingList));
            }
        }

        return searchResults;
    }


    /**
     * <p>The implementation of a Listing feature, to analyze all Bookings. For now the function does not need any arguments, later it will be further developed to change the given view by several
     * aspects needed</p>
     * @return all Bookings inside Bookings
     */
    public StringBuilder showAllBookings ()
    {

        StringBuilder allBookings = new StringBuilder();

        for (Booking bookingEntry : Bookings)
        {
            allBookings.append("Buchung Nummer: ");
            allBookings.append(bookingEntry.getBookingNo());
            allBookings.append(", ");
            allBookings.append("Raum: ");
            allBookings.append(bookingEntry.getRoomNo());
            allBookings.append(", ");
            allBookings.append("von ");
            allBookings.append(bookingEntry.getTimeFrame().getStartTime());
            allBookings.append(" bis ");
            allBookings.append(bookingEntry.getTimeFrame().getEndTime());
            allBookings.append(", ");
            allBookings.append("von ");
            allBookings.append(bookingEntry.getDateFrame().getStartDate());
            allBookings.append(" bis ");
            allBookings.append(bookingEntry.getDateFrame().getEndDate());
            allBookings.append(", ");
            allBookings.append("Raum-Kategorie: ");
            allBookings.append(bookingEntry.getRoomCategory());
            allBookings.append(", ");
            allBookings.append("Besondere Wünsche: ");
            allBookings.append(bookingEntry.getSpecialWishes());
            allBookings.append(", ");
            allBookings.append("erstellt durch Mitarbeiter Nummer ");
            allBookings.append(bookingEntry.getEmpNo());
            allBookings.append(", ");
            allBookings.append("Business Kunde? ");
            allBookings.append(bookingEntry.isBusinessCustomer());
            allBookings.append("; ");
        }

        return allBookings;
    }


    /**
     * <p>The implementation of an autonomous management of customer requests, based on whether or not a suitable room is free at the time given.</p>
     * @throws IllegalCallerException in case of someone using the function without the BookingsManager Role and its inherited Rights to manage bookings
     * @throws IllegalArgumentException in case of a booking being neither a HotelRoomBooking nor a onferenceRoomBooking, which should never occur
     */
    public void manageBookingRequests () throws NoSuchElementException
    {
        if(this.getGivenRole()==BookingsManager)
        {

            for (BookingRequest bookingRequest : BookingRequests)
            {
                Booking.BookingType bookingType = switch (bookingRequest.getRoomCategory())
                        {
                            case SUITE, SINGLE, DOUBLE -> Booking.BookingType.HotelRoomBooking;
                            case SMALLGROUP, BIGGROUP -> Booking.BookingType.ConferenceRoomBooking;
                        };
                for (Room room :Rooms)
                {
                    for (de.fourofakind.businesshotel.common.FullDate FullDate: room.getRoomOccupiedAtList())
                    {
                        if(room.getCategory().equals(bookingRequest.getRoomCategory()))
                        {
                            if (FullDate.getDateFrame().equals(bookingRequest.getDateFrame()))
                            {
                                DeclinedBookingRequests.add(bookingRequest);
                                BookingRequests.remove(bookingRequest);
                                break;
                            } else if (FullDate.getTimeFrame().equals(bookingRequest.getTimeFrame()))
                            {
                                DeclinedBookingRequests.add(bookingRequest);
                                BookingRequests.remove(bookingRequest);
                                break;
                            } else
                            {
                                this.createBooking(room.getRoomNo(), bookingRequest.getTimeFrame(), bookingRequest.getDateFrame(), bookingType, bookingRequest.getRoomCategory(),
                                        bookingRequest.getSpecialWishes(), bookingRequest.getIsBusinessCustomer());
                                BookingRequests.remove(bookingRequest);
                            }
                        }
                        else throw new NoSuchElementException("There is no Room of this type present at all");
                    }
                }
            }
        }
        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
    }




    /**
     * <p></p>
     * @param firstName
     * @param lastName
     * @param streetName
     * @param streetNumber
     * @param postalCode
     * @param cityName
     * @param mailAddress
     * @param paymentMethod
     * @param iban
     * @throws IllegalCallerException in case of someone using the function without the CustomerRelationshipManager Role and its inherited rights to manage customers
     */
    public Customer createCustomer (String firstName, String lastName, String streetName, String streetNumber, String postalCode, String cityName, String mailAddress,
                                Customer.paymentMethods paymentMethod, String iban) throws IllegalCallerException
    {
        if (this.getGivenRole()==CustomerRelationshipManager)
        {
            int customerID = Customers.size();

            ContactData contactData = new ContactData(firstName, lastName, streetName, streetNumber, postalCode, cityName, mailAddress);

            if (paymentMethod == Customer.paymentMethods.debit)
            {
                contactData.setPaymentCredentials(iban);
            }

            Customer newCustomer = new Customer(customerID, contactData, paymentMethod);

            Customers.add(newCustomer);
            return newCustomer;
        }
        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
    }



    /**
     * <p></p>
     * @param customerID
     * @param key
     * @param value
     * @throws IllegalCallerException in case of someone using the function without the CustomerRelationshipManager Role and its inherited rights to manage customers
     */
    public boolean changeCustomer (int customerID, String key, String value) throws IllegalCallerException
    {
        boolean changeHappened = false;
        if (this.getGivenRole()==CustomerRelationshipManager)
        {

            Customer fetchedCustomer = Customers.get(customerID);
            ContactData fetchedContactData = fetchedCustomer.getContactData();

            switch (key)
            {
                case "firstName":
                    fetchedContactData.setFirstName(value);changeHappened = true;
                case "lastName":
                    fetchedContactData.setLastName(value);changeHappened = true;
                case "streetName":
                    fetchedContactData.setStreetName(value);changeHappened = true;
                case "streetNumber":
                    fetchedContactData.setStreetNumber(value);changeHappened = true;
                case "postalCode":
                    fetchedContactData.setPostalCode(value);changeHappened = true;
                case "cityName":
                    fetchedContactData.setCityName(value);changeHappened = true;
                case "mailAddress":
                    fetchedContactData.setMailAddress(value);changeHappened = true;
                case "paymentMethod":
                    fetchedCustomer.setPaymentMethod(value);changeHappened = true;
                case "iban":
                    fetchedContactData.setPaymentCredentials(value);changeHappened = true;
            }

            Customers.set(customerID, fetchedCustomer);
            return changeHappened;
        }
        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
    }


    /**
     * <p></p>
     * @param customerID
     * @throws IllegalCallerException in case of someone using the function without the CustomerRelationshipManager Role and its inherited rights to manage customers
     */
    public void deleteCustomer (int customerID) throws IllegalCallerException
    {
        if (this.getGivenRole()==CustomerRelationshipManager)
        {
//            Customers.set(customerID, null);
            Customers.remove(customerID);


        }
        else throw new IllegalCallerException("The caller does not inherit the Rights to do this");
    }




    public int getEmpNo ()
    {
        return empNo;
    }

    public void setEmpNo (int empNo)
    {
        this.empNo = empNo;
    }

    public String getEmpName ()
    {
        return empName;
    }

    public void setEmpName (String empName)
    {
        this.empName = empName;
    }

    public Role getGivenRole ()
    {
        return givenRole;
    }

    public void setGivenRole (Role givenRole)
    {
        this.givenRole = givenRole;
    }

    private int empNo;
    private String empName;
    private Role givenRole;
}
